import ConnectorModel from "../models/ConnectorModel";
import DatabaseConnectorModel from "../models/DatabaseConnectorModel"
import { doDelete, doGet, doPost } from "./HttpService"

const findAllConnectors = (): Promise<ConnectorModel[]> => {
    return doGet('/connector');
}

const findConnectorById = (id: string): Promise<any> => {
    return doGet(`/connector/${id}`);
}

const saveConnector = (connector: DatabaseConnectorModel): Promise<any> => {
    return doPost('/connector', connector);
}

const deleteConnector = (id: string): Promise<any> => {
    return doDelete(`/connector/${id}`);
}

const testConnection = (connector: DatabaseConnectorModel): Promise<any> => {
    return doPost('/test-sql-connection', connector);
}

export { testConnection, saveConnector, findAllConnectors, findConnectorById, deleteConnector }