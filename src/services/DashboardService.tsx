import { doDelete, doGet, doPost } from "./HttpService"

const findAllDashboard = () => {
    return doGet('/dashboard')
}

const findDashboardById = (id: string) => {
    return doGet(`/dashboard/${id}`)
}

const saveDashboard = (data: any) => {
    return doPost('/dashboard', data)
}

const deleteDashboard = (id: string) => {
    return doDelete(`/dashboard/${id}`)
}


export { findAllDashboard, findDashboardById, saveDashboard, deleteDashboard }