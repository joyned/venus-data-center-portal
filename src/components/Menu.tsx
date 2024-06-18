import { FaAngleDown, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuItem from "../models/MenuItem";
import { color } from './ui/variables';

const MenuComponent = styled.div`
    background-color: ${color.primary};
    position: fixed;
    width: 100%;
    padding: 10px;
    color: white;
    z-index: 9999;
`;

const MenuNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

const MenuNavItems = styled.div`
    display: flex;
    gap: 25px;
    justify-content: flex-start;
    width: 100%;
`;

const MenuNavLogo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    img {
        width: 40px;
    }
`;

const MenuNavItemSubMenu = styled.div`
    position: relative;

    &:hover {
        cursor: pointer;
    }
`;

const MenuNavItemSubMenuList = styled.div`
    display: none;
    position: absolute;
    top: 20px;
    right: 0;
    background-color: ${color.primary};
    padding: 10px;
    width: 110px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    z-index: 99999;
`

const MenuNavItemSubMenuListItem = styled.div`
    padding: 10px 5px;
`

const MenuNavItem = styled.div`
    display: flex;
    gap: 10px;
    cursor: pointer;

    &:hover ${MenuNavItemSubMenuList} {
        display: block;
    }
`;

const MenuNavItemUser = styled.div`
    font-size: 30px;
`

export default function Menu(props: { items: MenuItem[] }) {
    const navigate = useNavigate();

    return (
        <MenuComponent>
            <MenuNav>
                <MenuNavLogo onClick={() => navigate('/home')}>
                    <img src="/logo512.png" alt="" />
                    <span>Venus Data Center</span>
                </MenuNavLogo>
                <MenuNavItems>
                    {props.items.map((item, index) => (
                        <MenuNavItem key={index}>
                            {item.name}
                            {item.subMenu && (
                                <MenuNavItemSubMenu>
                                    <FaAngleDown></FaAngleDown>
                                    <MenuNavItemSubMenuList>
                                        {item.subMenu.map((subItem, subIndex) => (
                                            <MenuNavItemSubMenuListItem key={subIndex} onClick={() => navigate(subItem.url || '')}>{subItem.name}
                                            </MenuNavItemSubMenuListItem>
                                        ))}
                                    </MenuNavItemSubMenuList>
                                </MenuNavItemSubMenu>
                            )}
                        </MenuNavItem>
                    ))}
                </MenuNavItems>
                <MenuNavItemUser>
                    <FaUserCircle></FaUserCircle>
                </MenuNavItemUser>
            </MenuNav>
        </MenuComponent>
    )
}