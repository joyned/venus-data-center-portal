import { ReactElement, useState } from "react";
import { MdHelp } from "react-icons/md";
import styled, { CSSProperties } from "styled-components";
import Modal from "./Modal";
import { color, panel, text } from "./ui/variables";

const Pnl = styled.div`
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${color.secondary};
    box-shadow: 0px 1px 2px 0px #1018288a;
    background-color: ${panel.backgroundColor};
    z-index: 1;
`

const PnlTitle = styled.h2`
    margin: 10px 0;
    color: ${text.default};
    display: flex;
    justify-content: space-between;
    color: ${panel.textColor};

    svg {
        cursor: pointer;
    }
`;

const PnlSubtitle = styled.div`
    color: ${text.default};
    margin-bottom: 20px;
    color: ${panel.textColor};
`

const PnlContent = styled.div`
    color: ${panel.textColor};
`;

export default function Panel(props: {
    children: ReactElement[] | ReactElement, title?: string, subtitle?: string, style?: CSSProperties,
    help?: any
}) {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <>
            <Pnl style={props.style}>
                {props.title &&
                    <PnlTitle>
                        {props.title}
                        {props.help && (<MdHelp onClick={() => setShowHelp(!showHelp)}></MdHelp>)}
                    </PnlTitle>}
                {props.subtitle && <PnlSubtitle>{props.subtitle}</PnlSubtitle>}
                <PnlContent>
                    {props.children}
                </PnlContent>
            </Pnl>
            {props.help && (
                <Modal title="Help" open={showHelp} onClose={() => { setShowHelp(false) }}>
                    {props.help()}
                </Modal>
            )}
        </>
    )
}