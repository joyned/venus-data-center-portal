import { ReactElement } from "react";
import styled from "styled-components";

const FormItemComponent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

export default function FormItem(props: { children: ReactElement | ReactElement[] }) {
    return (
        <FormItemComponent>
            {props.children}
        </FormItemComponent>
    )
}