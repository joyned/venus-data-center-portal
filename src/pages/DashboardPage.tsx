import { useEffect, useRef, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ButtonConfirm from "../components/ButtonConfirm";
import { useLoading } from "../components/Loading";
import Panel from "../components/Panel";
import { ResponsiveTable, Table, TableBody, TableCell, TableHead, TableRow, TableTh } from "../components/Table";
import DashboardModel from "../models/DashboardModel";
import { incrementPageCounter } from "../services/CookieService";
import { deleteDashboard, findAllDashboard } from "../services/DashboardService";
import Toast from "../components/Toast";

export default function DashboardPage() {
    const navigate = useNavigate();
    const toast = useRef<any>(null);
    const { setLoading } = useLoading();
    const [dashboards, setDashboards] = useState<DashboardModel[]>([]);

    useEffect(() => {
        setLoading(true);
        findAllDashboard().then((data) => {
            setDashboards(data);
        }).finally(() => setLoading(false));
    }, [setLoading])

    const openDashboard = (dashboard: DashboardModel) => {
        const url = `/dashboard/view/${dashboard.id}`;
        incrementPageCounter(url);
        navigate(url);
    }

    const handleDelete = (dashboard: DashboardModel) => {
        if (dashboard.id) {
            setLoading(true);
            deleteDashboard(dashboard.id).then(() => {
                setDashboards(dashboards.filter(d => d.id !== dashboard.id));
                toast.current.show('Success', 'Dashboard deleted successfully.');
            }).catch(() => {
                toast.current.show('Error', 'Error deleting dashboard.', 'error');
            }).finally(() => setLoading(false));
        }
    }

    return (
        <Panel title="Dashboards" subtitle="List of all dashboards avaliable.">
            <Toast ref={toast}></Toast>
            <ResponsiveTable>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableTh><MdFavorite /></TableTh>
                            <TableTh>Dashboard Name</TableTh>
                            <TableTh>Actions</TableTh>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dashboards && (
                            dashboards.map((dashboard) => {
                                return (
                                    <TableRow key={dashboard.id}>
                                        <TableCell><MdFavoriteBorder style={{ cursor: "pointer" }} /></TableCell>
                                        <TableCell>{dashboard.name}</TableCell>
                                        <TableCell>
                                            <Button label="Open" onClick={() => openDashboard(dashboard)}></Button>
                                            <Button label="Edit" onClick={() => navigate(`/dashboard/edit/${dashboard.id}`)}></Button>
                                            <ButtonConfirm label="Delete" callback={() => handleDelete(dashboard)} transparent></ButtonConfirm>
                                        </TableCell>
                                    </TableRow>
                                )
                            }))}
                    </TableBody>
                </Table>
            </ResponsiveTable>
            <Button label="Add Dashboard" onClick={() => navigate('/dashboard/edit/0')}></Button>
        </Panel >
    )
}
