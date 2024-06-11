import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ButtonConfirm from "../components/ButtonConfirm";
import { useLoading } from "../components/Loading";
import Panel from "../components/Panel";
import { Table, TableBody, TableCell, TableHead, TableRow, TableTh } from "../components/Table";
import DashboardModel from "../models/DashboardModel";
import { findAllDashboard } from "../services/DashboardService";

export default function DashboardPage() {
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [dashboards, setDashboards] = useState<DashboardModel[]>([]);

    useEffect(() => {
        setLoading(true);
        findAllDashboard().then((data) => {
            setDashboards(data);
        }).finally(() => setLoading(false));
    }, [setLoading])

    return (
        <Panel title="Dashboards" subtitle="List of all dashboards avaliable.">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableTh>Dashboard Name</TableTh>
                        <TableTh>Actions</TableTh>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dashboards && (
                        dashboards.map((dashboard) => {
                            return (
                                <TableRow key={dashboard.id}>
                                    <TableCell>{dashboard.name}</TableCell>
                                    <TableCell>
                                        <Button label="Open" onClick={() => navigate(`/dashboard/view/${dashboard.id}`)}></Button>
                                        <Button label="Edit" onClick={() => navigate(`/dashboard/edit/${dashboard.id}`)}></Button>
                                        <ButtonConfirm label="Delete" transparent></ButtonConfirm>
                                    </TableCell>
                                </TableRow>
                            )
                        }))}
                </TableBody>
            </Table>
            <Button label="Add Dashboard" onClick={() => navigate('/dashboard/edit/0')}></Button>
        </Panel >
    )
}