import styled from "styled-components";

export enum MessagePanelType {
    INFO = '#007bff',
    SUCCESS = '#28a745',
    WARNING = '#ffc107',
    ERROR = '#dc3545'
}

const MessagePanel = styled.div`
    padding: 15px;
    border-radius: 3px;
    text-align: center;
    margin: 15px 0;
    color: white;
`;


export default function Message(props: { message?: string, type?: MessagePanelType }) {
    return (
        <>
            {props.message && (
                <MessagePanel style={{ backgroundColor: props.type || MessagePanelType.INFO }}>
                    {props.message}
                </MessagePanel>
            )}
        </>
    )
}