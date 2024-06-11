import { useEffect, useRef, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ButtonConfirm from "../components/ButtonConfirm";
import FormItem from "../components/FormItem";
import Input from "../components/Input";
import { useLoading } from "../components/Loading";
import Panel from "../components/Panel";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import Toast from "../components/Toast";
import ConnectorModel from "../models/ConnectorModel";
import DashboardModel from "../models/DashboardModel";
import { findAllConnectors } from "../services/ConnectorService";
import { findDashboardById, saveDashboard } from "../services/DashboardService";
import MultipleInput from "../components/MultipleInput";
import Span from "../components/RequiredLabel";

export default function DashboardPageForm() {
    const params = useParams();
    const toast = useRef<any>(null);
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const [dashboardId, setDashboardId] = useState<string | undefined>(undefined);
    const [connectorOptions, setConnectorOptions] = useState<ConnectorModel[] | undefined>(undefined);
    const [selectedConnector, setSelectedConnector] = useState<ConnectorModel | undefined>(undefined);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [queryText, setQueryText] = useState('');

    const [usersWithPermission, setUsersWithPermission] = useState<string[]>([]);

    useEffect(() => {
        const id = params.id;
        setLoading(true);
        findAllConnectors().then((data) => {
            setConnectorOptions(data);
            if (id && id !== "0") {
                setLoading(true);
                setDashboardId(id);
                findDashboardById(id).then((data) => {
                    setName(data.name);
                    setDescription(data.description);
                    setQueryText(data.query);
                    setSelectedConnector(data.connector);
                }).finally(() => setLoading(false));
            }
        }).finally(() => setLoading(false));

    }, [params.id, setLoading])

    const onSubmit = (e: any) => {
        e.preventDefault();

        let dashboard: DashboardModel = {
            id: dashboardId,
            name: name,
            description: description,
            connector: selectedConnector,
            query: queryText
        }

        console.log(dashboard);
        saveDashboard(dashboard).then(() => {
            toast.current?.showSuccess('Success', 'Dashboard saved');
            navigate('/dashboard');
        }).catch((error) => {
            toast.current?.showError('Error', error.data.message);
        });
    }

    const helpTemplate = () => {
        return (
            <>
                <p>This article helps you creating your dashboard.</p>
                <p><strong>For SQL Connector:</strong></p>
                <span>
                    For parameters, use dollar symbol ($) to idenfity a parameter.
                    All parameters will be converted to a filter.
                </span>
                <p><strong>For REST Connector:</strong></p>
                <span>
                    If your request is a POST request, fill the QUERY with the request body.
                    Else, if you already identify the parameters on the connector for path parameters or query parameters, you don't need to do anything.
                    For parameters, use dollar symbol ($) to idenfity a parameter.
                    All parameters will be converted to a filter.
                </span>
            </>
        )
    }

    const handleCancelYes = (e: any) => {
        e.preventDefault();
        navigate('/dashboard');
    }

    const onAddUser = (value: string) => {
        setUsersWithPermission([...usersWithPermission, value]);
    }

    return (
        <>
            <Panel title={dashboardId ? 'Existing' : 'New Dashboard'} help={helpTemplate}>
                <Toast ref={toast}></Toast>
                <form onSubmit={onSubmit}>
                    <FormItem>
                        <Span required>Name</Span>
                        <Input required  type="text" value={name} onChange={(e) => setName(e.target.value)}></Input>
                    </FormItem>
                    <FormItem>
                        <span>Description</span>
                        <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></Input>
                    </FormItem>
                    <FormItem>
                        <Span required>Connector</Span>
                        <Select options={connectorOptions} value={selectedConnector} onChange={(value: any) => {
                            setSelectedConnector(value)
                        }}></Select>
                    </FormItem>
                    <FormItem>
                        <span>Query</span>
                        <TextArea value={queryText} onChange={(e) => setQueryText(e.target.value)}></TextArea>
                    </FormItem>
                    <Button type="button" label="Save"></Button>
                    <ButtonConfirm label="Cancel" callback={handleCancelYes} transparent></ButtonConfirm>
                </form>
            </Panel>
            <Panel title="Dashboard Permission">
                <FormItem>
                    <MultipleInput label="Users with access" value={usersWithPermission} onAdd={onAddUser}></MultipleInput>
                </FormItem>
            </Panel>
        </>
    )
}