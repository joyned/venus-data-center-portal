import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ConnectorPage from "./pages/ConnectorPage";
import ConnectorPageForm from "./pages/ConnectorPageForm";
import DashboardPageForm from "./pages/DashboardPageForm";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardPageView from "./pages/DashboardPageView";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/home",
        element: <MainLayout><HomePage /></MainLayout>
    },
    {
        path: "/connector",
        element: <MainLayout><ConnectorPage /></MainLayout>
    },
    {
        path: "/connector/:id",
        element: <MainLayout><ConnectorPageForm /></MainLayout>
    },
    {
        path: "/dashboard",
        element: <MainLayout><DashboardPage /></MainLayout>
    },
    {
        path: "/dashboard/view/:id",
        element: <MainLayout><DashboardPageView /></MainLayout>
    },
    {
        path: "/dashboard/edit/:id",
        element: <MainLayout><DashboardPageForm /></MainLayout>
    }
]);
