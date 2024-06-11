import ConnectorModel from "./ConnectorModel";

export default interface RestConnectorModel extends ConnectorModel {
    url?: string;
    method?: string;
    headers?: string;
}