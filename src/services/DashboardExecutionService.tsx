import { doPost } from "./HttpService"

const executeDashboard = (dashboardId: string, parameters: any) => {
    return doPost(`/dashboard/execution/${dashboardId}`, parameters)
}

export { executeDashboard }