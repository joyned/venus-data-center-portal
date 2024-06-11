import ConnectorModel from "./ConnectorModel";
import EngineModel from "./EngineModel";

export default interface DatabaseConnectorModel extends ConnectorModel {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    schema?: string;
    engine?: EngineModel;
    testQuery?: string;
}