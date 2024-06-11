import { ReactElement } from "react";
import { CiSettings, CiViewList } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { MdConnectedTv, MdOutlineCreateNewFolder, MdOutlineDashboard } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading, { useLoading } from "../components/Loading";
import { color } from "../components/ui/variables";

const MainLayoutContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Menu = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 20px;
    height: 100vh;
    width: 140px;
    background-color: ${color.primary};
`;

const MenuNav = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`

const TopMenu = styled.div`
    position: fixed;
    background-color: ${color.secondary};
    width: 100%;
    padding: 20px;
    margin-left: 180px;
`

const MenuItemSelect = styled.div`
    position: absolute;
    left: 80px;
`;

const MenuItemSelectItems = styled(MenuItemSelect)`
    top: -20px;
    background-color: ${color.primary};
    position: absolute;
    display: none;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;

const MenuItemSelectItemsItem = styled.div`
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;

`

const MenuItem = styled.div`
    color: white;
    cursor: pointer;

    &:hover ${MenuItemSelectItems} {
        display: block;
    }
`

const MenuItemText = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const PageContainer = styled.div`
    padding: 20px;
    margin-left: 180px;
    margin-top: 70px;
    width: 100%;
`;

const MenuLogo = styled.div`
    width: 100%;
    height: 100px;

    img {
        width: 125px;
    }
`

export default function MainLayout(props: { children: ReactElement | ReactElement[] }) {
    const navigate = useNavigate();
    const { loading } = useLoading();

    return (
        <Loading isLoading={loading}>
            <MainLayoutContainer>
                <Menu>
                    <MenuLogo>
                        <img src="/logo512.png" alt="" />
                    </MenuLogo>
                    <MenuNav>
                        <MenuItem>
                            <MenuItemText>
                                <IoHomeOutline />
                                Home
                            </MenuItemText>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemText>
                                <MdOutlineDashboard />
                                Dashboards
                                <FaAngleRight />
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
                                <FaAngleRight />
                            </MenuItemText>
                            <MenuItemSelect>
                                <MenuItemSelectItems>
                                    <MenuItemSelectItemsItem onClick={() => navigate('/connector')}>
                                        <MenuItemText>
                                            <MdConnectedTv />
                                            Connector
                                        </MenuItemText>
                                    </MenuItemSelectItemsItem>
                                    <MenuItemSelectItemsItem onClick={() => navigate('/users')}>
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
                    <MenuItem>Logout</MenuItem>
                </TopMenu>
                <PageContainer>
                    {props.children}
                </PageContainer>
            </MainLayoutContainer>
        </Loading>
    )
}