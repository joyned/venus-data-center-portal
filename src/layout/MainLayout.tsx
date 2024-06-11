import { ReactElement, useEffect, useState } from "react";
import { CiDark, CiSettings, CiViewList } from "react-icons/ci";
import { FaAngleDown, FaUserCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { MdConnectedTv, MdDarkMode, MdOutlineCreateNewFolder, MdOutlineDashboard } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import Loading, { useLoading } from "../components/Loading";
import { color, container, menu } from "../components/ui/variables";
import { getDashboardPagesFromCookiesWithMostAccessLimit3 } from "../services/CookieService";

const MainLayoutContainer = styled.div`
    display: flex;
    flex-direction: row;
    display: flex;
    flex-direction: row;
    background-color: ${container.backgroundColor};
    min-width: 100vw;
    min-height: 100vh;
`

const Menu = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    height: 100vh;
    width: 190px;
    background-color: ${menu.left};
    border-right: 1px solid ${menu.borderBottom};
`;

const MenuNav = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`

const TopMenu = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${menu.left};
    border-bottom: 1px solid ${menu.borderBottom};
    width: 100%;
    padding: 10px 25px;
`

const MenuItemSelect = styled.div`
`;

const MenuItemSelectItems = styled(MenuItemSelect)`
    top: -20px;
    background-color: ${menu.left};
    min-width: 160px;
    margin-top: 15px;
    z-index: 99;
    visibility: hidden;
    opacity: 0;
    max-height: 0;
    -webkit-transition: opacity 600ms, visibility 600ms;
            transition: opacity 600ms, visibility 600ms;
`;

const MenuItemSelectItemsItem = styled.div`
    color: ${menu.textColor};
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;

`

const MenuItem = styled.div`
    color: ${menu.textColor};
    cursor: pointer;
    padding: 20px 15px;
    border-bottom: 1px solid ${color.lightGrey};

    &:hover ${MenuItemSelectItems} {
        visibility: visible;
        opacity: 1;
        animation: fade 1s;
        max-height: 1000px;
    }
`

const MenuItemText = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: 400;
`

const PageContainer = styled.div`
    padding: 20px;
    margin-left: 240px;
    margin-top: 70px;
    width: 100%;
`;

const MenuLogo = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 5px;

    img {
        width: 40px;
    }

    span {
        font-size: medium;
        font-weight: 300;
        color: ${menu.textColor};
    }
`

const LeftItem = styled.div``;
const RightItem = styled.div`
    margin-right: 60px;
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
        cursor: pointer;
        font-size: x-large;
        color: ${menu.textColor};
    }

    input {
        margin: 0;
        padding: 7px;
        font-size: small;
    }
`;

export default function MainLayout(props: { children: ReactElement | ReactElement[] }) {
    const navigate = useNavigate();
    const { loading } = useLoading();
    const [actualTheme, setActualTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
        const dash = getDashboardPagesFromCookiesWithMostAccessLimit3();
        console.log(dash);
    }, [])

    const changeTheme = (e: any) => {
        e.preventDefault();
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }

        setActualTheme(localStorage.getItem('theme'));
        window.location.reload();
    }

    return (
        <Loading isLoading={loading}>
            <MainLayoutContainer>
                <Menu>
                    <MenuNav>
                        <MenuItem>
                            <MenuItemText onClick={() => navigate('/home')}>
                                <IoHomeOutline />
                                Home
                            </MenuItemText>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemText>
                                <MdOutlineDashboard />
                                Dashboards
                                <FaAngleDown />
                            </MenuItemText>
                            <MenuItemSelect>
                                <MenuItemSelectItems>
                                    <MenuItemSelectItemsItem onClick={() => navigate('/dashboard/view/0')}>
                                        <MenuItemText>
                                            <TbLayoutDashboard />
                                            Dashboard 1
                                        </MenuItemText>
                                    </MenuItemSelectItemsItem>
                                    <MenuItemSelectItemsItem onClick={() => navigate('/dashboard')}>
                                        <MenuItemText>
                                            <CiViewList />
                                            View All
                                        </MenuItemText>
                                    </MenuItemSelectItemsItem>
                                    <MenuItemSelectItemsItem onClick={() => navigate('/dashboard/edit/0')}>
                                        <MenuItemText>
                                            <MdOutlineCreateNewFolder />
                                            Create
                                        </MenuItemText>
                                    </MenuItemSelectItemsItem>
                                </MenuItemSelectItems>
                            </MenuItemSelect>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemText>
                                <CiSettings />
                                Settings
                                <FaAngleDown />
                            </MenuItemText>
                            <MenuItemSelect>
                                <MenuItemSelectItems>
                                    <MenuItemSelectItemsItem onClick={() => navigate('/connector')}>
                                        <MenuItemText>
                                            <MdConnectedTv />
                                            Connector
                                        </MenuItemText>
                                    </MenuItemSelectItemsItem>
                                    <MenuItemSelectItemsItem onClick={() => navigate('/user')}>
                                        <MenuItemText>
                                            <FiUsers />
                                            Users
                                        </MenuItemText>
                                    </MenuItemSelectItemsItem>
                                </MenuItemSelectItems>
                            </MenuItemSelect>
                        </MenuItem>
                    </MenuNav>
                </Menu>
                <TopMenu>
                    <LeftItem>
                        <MenuLogo>
                            <img src="/logo512.png" alt="" />
                            <span>Venus Data Center</span>
                        </MenuLogo>
                    </LeftItem>
                    <RightItem>
                        <Input type="text" placeholder="Search"></Input>
                        {actualTheme === 'dark' ? <MdDarkMode onClick={changeTheme} /> : <CiDark onClick={changeTheme} />}
                        <FaUserCircle></FaUserCircle>
                    </RightItem>
                </TopMenu>
                <PageContainer>
                    {props.children}
                </PageContainer>
            </MainLayoutContainer>
        </Loading>
    )
}