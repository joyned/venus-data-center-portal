import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ButtonConfirm from "../components/ButtonConfirm";
import FormItem from "../components/FormItem";
import Input from "../components/Input";
import { useLoading } from "../components/Loading";
import Panel from "../components/Panel";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import Toast from "../components/Toast";
import DatabaseConnectorModel from "../models/DatabaseConnectorModel";
import EngineModel from "../models/EngineModel";
import { QueryTypeModel } from "../models/QueyrTypeModel";
import { findConnectorById, saveConnector, testConnection } from "../services/ConnectorService";
import { findAllEngines } from "../services/EngineService";
import Span from "../components/RequiredLabel";

const helpTemplate = () => {
    return (
        <>
            <p>This article helps you creating your conector.</p>
            <p><strong>For SQL Connector:</strong></p>
            <ul>
                <li><strong>Host:</strong> Address for your database;</li>
                <li><strong>Port:</strong> Port for your database;</li>
                <li><strong>User:</strong> Username for your database;</li>
                <li><strong>Password:</strong> Password for your database;</li>
                <li><strong>Engine:</strong> The database type. We only support those who are shown on the list;</li>
                <li><strong>Test Query:</strong> Write a query to run and test the connection;</li>
            </ul>
            <p><strong>For REST Connector:</strong></p>
            <ul>
                <li><strong>URL:</strong> The full URL for your API;</li>
                <li><strong>Method:</strong> HTTP method;</li>
                <li><strong>Headers:</strong> The headers to send to API. Write multiple headers separating with comma;</li>
                <li><strong>Parameters:</strong> For path/query parameters, use dollar symbol ($) to identify. This parameters will be converted to filters for the connector.</li>
            </ul>
        </>
    )
}

const options: QueryTypeModel[] = [
    {
        value: 'sql',
        label: 'SQL'
    },
    {
        value: 'rest',
        label: 'REST'
    }
];

const httpMethods = [
    {
        value: 'get',
        name: 'GET'
    },
    {
        value: 'post',
        name: 'POST'
    },
    {
        value: 'put',
        name: 'PUT'
    },
    {
        value: 'delete',
        name: 'DELETE'
    }
]

export default function ConnectorPageForm() {
    const params = useParams();
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const toastRef = useRef<any>(null);

    const [selectedOption, setSelectedOption] = useState<QueryTypeModel | undefined>(undefined);
    const [databaseOptions, setDatabaseOptions] = useState<EngineModel[] | undefined>(undefined);

    const [id, setId] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dbHost, setDbHost] = useState<string>('');
    const [dbPort, setDbPort] = useState<number>();
    const [dbDatabase, setDbDatabase] = useState<string>('');
    const [dbUser, setDbUser] = useState<string>('');
    const [dbPassword, setDbPassword] = useState<string>('');
    const [dbEngine, setDbEngine] = useState<EngineModel | undefined>(undefined);
    const [dbTestConnection, setDbTestConnection] = useState<string>('');

    const [restUrl, setRestUrl] = useState<string>('');
    const [restMethod, setRestMethod] = useState<any>('');
    const [restHeaders, setRestHeaders] = useState<string>('');

    useEffect(() => {
        const id = params.id;
        if (id && id !== "0") {
            setLoading(true);
            findConnectorById(id).then((data) => {
                setId(data.id);
                setName(data.name);
                setDescription(data.description);

                if (data.host) {
                    setDbHost(data.host);
                    setSelectedOption(options[0]);
                    findAllEngines().then((data) => {
                        setDatabaseOptions(data);
                    });
                }
                if (data.port) {
                    setDbPort(data.port);
                }
                if (data.database) {
                    setDbDatabase(data.database);
                }
                if (data.username) {
                    setDbUser(data.username);
                }
                if (data.password) {
                    setDbPassword(data.password);
                }
                if (data.engine) {
                    setDbEngine(data.engine);
                }
                if (data.testQuery) {
                    setDbTestConnection(data.testQuery);
                }
                if (data.url) {
                    setRestUrl(data.url);
                }
                if (data.method) {
                    setSelectedOption(options[1]);
                    setRestMethod(httpMethods[httpMethods.findIndex((e) => e.name === data.method)]);
                }
                if (data.headers) {
                    setRestHeaders(data.headers);
                }
            }).finally(() => setLoading(false));
        }
    }, [params.id, setLoading])

    const handleCancelYes = (e: any) => {
        e.preventDefault();
        navigate('/connector');
    }

    const onQueryTypeSelect = (obj: any) => {
        setSelectedOption(obj);
        if (obj.value === 'sql') {
            setLoading(true);
            findAllEngines().then((data) => {
                setDatabaseOptions(data);
                setLoading(false);
            })
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!selectedOption) {
            return;
        }

        let connector: any = undefined;

        if (selectedOption?.value === 'sql') {
            connector = {
                id: id,
                name: name,
                description: description,
                host: dbHost,
                port: dbPort,
                database: dbDatabase,
                username: dbUser,
                password: dbPassword,
                engine: dbEngine,
                testQuery: dbTestConnection
            }

        } else if (selectedOption?.value === 'rest') {
            connector = {
                id: id,
                name: name,
                description: description,
                url: restUrl,
                method: restMethod,
                headers: restHeaders
            }
        }

        setLoading(true);

        saveConnector(connector).then(() => {
            setLoading(false);
            toastRef.current?.showSuccess('Success', 'Connector saved.');
            navigate('/connector')
        }).catch(error => {
            console.log(error);
            toastRef.current?.showError('Error', 'Error on save connector.');
            setLoading(false)
        });
    }

    const onTestConnection = () => {
        setLoading(true);
        const connector: DatabaseConnectorModel = {
            name: name,
            description: description,
            host: dbHost,
            port: dbPort,
            database: dbDatabase,
            username: dbUser,
            password: dbPassword,
            engine: dbEngine,
            testQuery: dbTestConnection,
            type: ""
        }

        testConnection(connector).then(() => {
            setLoading(false);
            toastRef.current?.showSuccess('Success', 'Connection test success.');
        }).catch((error) => {
            setLoading(false);
            toastRef.current?.showError('Error', `Connection test failed. ${error.data.message}`);
        })
    }

    return (
        <Panel title="Connector" subtitle="Connectors are used to handle data extraction." help={helpTemplate}>
            <Toast ref={toastRef}></Toast>
            <form onSubmit={onSubmit}>
                <FormItem>
                    <Span required>Name</Span>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required></Input>
                </FormItem>
                <FormItem>
                    <Span>Description</Span>
                    <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required></Input>
                </FormItem>
                <FormItem>
                    <Span required>Type</Span>
                    <Select options={options} value={selectedOption} optionLabel="label" style={{ marginBottom: '20px' }}
                        onChange={(value: any) => onQueryTypeSelect(value)}
                    ></Select>
                </FormItem>
                {selectedOption?.value === 'sql' ? (
                    <>
                        <FormItem>
                            <Span required>Host</Span>
                            <Input type="text" value={dbHost} onChange={(e) => setDbHost(e.target.value)}></Input>
                        </FormItem>
                        <FormItem>
                            <Span>Port</Span>
                            <Input type="number" value={dbPort} onChange={(e) => setDbPort(e.target.value)}></Input>
                        </FormItem>
                        <FormItem>
                            <Span required>Database</Span>
                            <Input type="text" value={dbDatabase} onChange={(e) => setDbDatabase(e.target.value)}></Input>
                        </FormItem>
                        <FormItem>
                            <Span required>User</Span>
                            <Input type="text" value={dbUser} onChange={(e) => setDbUser(e.target.value)}></Input>
                        </FormItem>
                        <FormItem>
                            <Span required>Password</Span>
                            <Input type="password" value={dbPassword} onChange={(e) => setDbPassword(e.target.value)}></Input>
                        </FormItem>
                        <FormItem>
                            <Span required>Engine</Span>
                            <Select options={databaseOptions} value={dbEngine} optionLabel="name" onChange={(e) => setDbEngine(e)}></Select>
                        </FormItem>
                        <FormItem>
                            <Span required>Test Query</Span>
                            <TextArea value={dbTestConnection} onChange={(e) => setDbTestConnection(e.target.value)}></TextArea>
                        </FormItem>
                        <Button type="button" label="Test Connection" onClick={() => onTestConnection()}></Button>
                    </>
                ) : null}
                {selectedOption?.value === 'rest' ? (
                    <>
                        <FormItem>
                            <Span required>URL</Span>
                            <Input type="text" value={restUrl} onChange={(e) => setRestUrl(e.target.value)}></Input>
                        </FormItem>
                        <FormItem>
                            <Span required>Method</Span>
                            <Select options={httpMethods} value={restMethod} onChange={(e) => setRestMethod(e)}></Select>
                        </FormItem>
                        <FormItem>
                            <Span>Headers</Span>
                            <TextArea value={restHeaders} onChange={(e) => setRestHeaders(e.target.value)}></TextArea>
                        </FormItem>
                    </>
                ) : null}
                <Button type="submit" label="Save"></Button>
                <ButtonConfirm label="Cancel" callback={handleCancelYes} transparent></ButtonConfirm>
            </form>
        </Panel>
    )
}