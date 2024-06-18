import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading, { useLoading } from "../components/Loading";
import Menu from "../components/Menu";
import { body, mobile } from "../components/ui/variables";
import MenuItem from "../models/MenuItem";
import { getDashboardPagesFromCookiesWithMostAccessLimit3 } from "../services/CookieService";

const MainLayoutContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${body.backgroundColorLight};
    min-width: 100vw;
    min-height: 100vh;
`

const PageContainer = styled.div`
    padding: 20px;
    margin-top: 70px;
    width: 100%;

    @media (max-width: ${mobile.starts}) {
        padding: 10px;
    }
`;

const menu: MenuItem[] = [
    {
        name: 'Home',
        url: '/home'
    },
    {
        name: 'Dashboard',
        subMenu: [
            {
                name: 'View All',
                url: '/dashboard'
            },
            {
                name: 'Create',
                url: '/dashboard/edit/0'
            }
        ]
    },
    {
        name: 'Settings',
        subMenu: [
            {
                name: 'Connector',
                url: '/connector'
            },
            {
                name: 'Users',
                url: '/user'
            }
        ]
    }
]

export default function MainLayout(props: { children: ReactElement | ReactElement[] }) {
    const { loading } = useLoading();

    useEffect(() => {
        const dash = getDashboardPagesFromCookiesWithMostAccessLimit3();
    }, [])

    return (
        <Loading isLoading={loading}>
            <MainLayoutContainer>
                <Menu items={menu}></Menu>
                <PageContainer>
                    {props.children}
                </PageContainer>
            </MainLayoutContainer>
        </Loading>
    )
}