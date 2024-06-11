import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import FormItem from "../components/FormItem";
import Input from "../components/Input";
import { useLoading } from "../components/Loading";
import Panel from "../components/Panel";
import { Table, TableBody, TableCell, TableHead, TableRow, TableTh } from "../components/Table";
import DashboardModel from "../models/DashboardModel";
import { executeDashboard } from "../services/DashboardExecutionService";
import { findDashboardById } from "../services/DashboardService";
import { extractParameters } from "../services/FilterExtractorService";
import Toast from "../components/Toast";

export default function DashboardPageView() {
    const { setLoading } = useLoading();
    const params = useParams();
    const toast = useRef<any>(null);
    const [dashboard, setDashboard] = useState<DashboardModel | undefined>(undefined);
    const [filters, setFilters] = useState<{ name: string, parameter: string }[]>([]);
    const [result, setResult] = useState<any[]>([]);
    const [parameters, setParameters] = useState<any>({});

    useEffect(() => {
        setLoading(true);
        const id = params.id;
        if (id && id !== "0") {
            findDashboardById(id).then((data): void => {
                setDashboard(data);
                const extratedFilters = extractParameters(data.query);
                setFilters(extratedFilters)
                extratedFilters.map((filter) => setParameters({ ...parameters, [filter.parameter]: "" }))
                setLoading(false);
            })
        }
    }, [params.id, setLoading])

    const onFilter = (e: any) => {
        e.preventDefault();
        if (dashboard?.id) {
            setLoading(true);
            executeDashboard(dashboard?.id, parameters).then((data) => {
                setResult(data)
            }).catch((error) => {
                toast.current.showError("Error", error.data.message);
            }).finally(() => setLoading(false));
        }

    }

    const customParameters = (e: any, filterName: any) => {
        setParameters({ ...parameters, [filterName]: e.target.value })
    }

    return (
        <>
            <Toast ref={toast}></Toast>
            <Panel title="Filters">
                <form onSubmit={onFilter}>
                    {filters && filters.map((filter) => {
                        return (
                            <FormItem key={filter.parameter}>
                                <span>{filter.name}</span>
                                <Input type="text" onChange={(e) => customParameters(e, filter.parameter)}></Input>
                            </FormItem>
                        )
                    })}
                    <Button label="Search"></Button>
                    <Button type="reset" label="Clear Filters" transparent></Button>
                    <Button label="Export CSV" type="button" transparent></Button>
                </form>
            </Panel>
            <Panel title={dashboard?.name}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {result.length > 0 && Object.keys(result[0]).map((key) => {
                                return <TableTh key={key}>{key}</TableTh>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    {Object.keys(row).map((key) => {
                                        return <TableCell key={key}>{row[key]}</TableCell>
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Panel>
        </>
    )
}