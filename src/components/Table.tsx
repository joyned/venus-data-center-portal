import styled from "styled-components";
import { color, text } from "./ui/variables";

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

`;

export const TableHead = styled.thead`
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    color: ${text.default};
    font-weight: bold;
    text-align: left;
    padding: 10px;
`

export const TableTh = styled.th`
    padding: 10px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    color: ${text.default};
    font-weight: bold;
    text-align: left;
    font-size: 18px;
`;

export const TableBody = styled.tbody`
    font-size: 16px;
    color: ${text.default};
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: ${localStorage.getItem("theme") === "dark" ? color.primary : "#f2f2f2"};
    }
    &:hover {
        background-color: ${localStorage.getItem("theme") === "dark" ? color.primary : "#f2f2f2"};
    }
`;

export const TableCell = styled.td`
    padding: 10px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: ${text.default};
    text-align: left;
    &:last-child {
        border-right: none;
    }
`;

export const TableCaption = styled.caption`
    font-size: 20px;
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: left;
    padding: 10px;
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const TableFooter = styled.tfoot`
    font-size: 16px;
    color: #333;
    padding: 10px;
    border-top: 1px solid #ddd;
`;