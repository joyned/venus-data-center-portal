import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ConnectorPage from "./pages/ConnectorPage";
import ConnectorPageForm from "./pages/ConnectorPageForm";
import DashboardPage from "./pages/DashboardPage";
import DashboardPageForm from "./pages/DashboardPageForm";
import DashboardPageView from "./pages/DashboardPageView";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

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
    },
    {
        path: "/user",
        element: <MainLayout><UserPage /></MainLayout>
    }
]);
