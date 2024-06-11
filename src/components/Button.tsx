import { CSSProperties, ReactElement } from "react";
import styled from "styled-components";
import { button, color } from "./ui/variables";

const Btn = styled.button<{ $isTransparent?: boolean }>`
    background-color: ${props => props.$isTransparent ? 'transparent' : color.primary};
    color: ${props => props.$isTransparent ? button.transparentColor : 'white'};
    border: 1px solid ${button.transparentColor};
    border-radius: 5px;
    margin-right: 10px;
`;

const BtnLabel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
`

const BtnIcon = styled.div`
`

const BtnText = styled.div`
`

export default function Button(props: { label?: string, icon?: ReactElement, onClick?: (event: any) => void, transparent?: boolean, type?: 'button' | 'submit' | 'reset', style?: CSSProperties }) {

    return (
        <Btn $isTransparent={props.transparent} onClick={props.onClick} style={{ width: props.icon ? '110px' : '' }}
            type={props.type ?? 'submit'}>
            <BtnLabel style={{ paddingRight: props.icon ? '13px' : '', gap: props.icon ? '7px' : '' }}>
                <BtnIcon>
                    {props.icon}
                </BtnIcon>
                <BtnText>{props.label}</BtnText>
            </BtnLabel>
        </Btn>
    )
}