export default interface MenuItem {
    name: string;
    url?: string;
    subMenu?: MenuItem[];
}