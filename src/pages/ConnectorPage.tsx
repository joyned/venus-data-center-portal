import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ButtonConfirm from "../components/ButtonConfirm";
import { useLoading } from "../components/Loading";
import Panel from "../components/Panel";
import { ResponsiveTable, Table, TableBody, TableCell, TableHead, TableRow, TableTh } from "../components/Table";
import Toast from "../components/Toast";
import ConnectorModel from "../models/ConnectorModel";
import { deleteConnector, findAllConnectors } from "../services/ConnectorService";

export default function ConnectorPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const toast = useRef<any>();

    const [connectors, setConnectors] = useState<ConnectorModel[] | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        findAllConnectors().then((data) => {
            setConnectors(data);
        }).finally(() => setLoading(false));
    }, [setLoading]);

    const getConfirmText = (connector: ConnectorModel) => {
        return `Are you sure you want to delete the connector ${connector.name}?`;
    }

    const confirmDeleteConnector = (connector: ConnectorModel) => {
        if (connector.id) {
            setLoading(true);
            deleteConnector(connector.id).then(() => {
                findAllConnectors().then((data) => {
                    setConnectors(data);
                    toast.current?.showSuccess('Success', 'Connector deleted successfully.');
                }).finally(() => setLoading(false));
            });
        }
    }

    return (
        <Panel title="Connector" subtitle="Connectors are used to handle data extraction.">
            <Toast ref={toast}></Toast>
            <ResponsiveTable>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableTh>Connector Name</TableTh>
                            <TableTh>Connector Type</TableTh>
                            <TableTh>Actions</TableTh>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {connectors && connectors.map((connector) => {
                            return (
                                <TableRow key={connector.id}>
                                    <TableCell>{connector.name}</TableCell>
                                    <TableCell>{connector.type}</TableCell>
                                    <TableCell>
                                        <Button label="Edit" onClick={() => navigate(`/connector/${connector.id}`)}></Button>
                                        <ButtonConfirm confirmText={getConfirmText(connector)} confirmTitle={connector.name}
                                            callback={() => { confirmDeleteConnector(connector) }} label="Delete" transparent
                                        ></ButtonConfirm>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </ResponsiveTable>
            <Button label="Add Connector" onClick={() => navigate('/connector/0')}></Button>
        </Panel>
    )
}