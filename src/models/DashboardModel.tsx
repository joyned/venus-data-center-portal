export default interface DashboardModel {
    id: string | undefined;
    name: string;
    description: string;
    connector: any;
    query: string;
}