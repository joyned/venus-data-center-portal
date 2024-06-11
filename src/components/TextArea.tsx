import styled from "styled-components";

const TextAreaComponent = styled.textarea`
    padding: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s, border 0.3s;
    &:focus {
        outline: none;
        border: 1px solid #0077cc;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
    }  
`;

export default function TextArea(props: { value?: any, onChange?: (event: any) => void, }) {
    return (
        <TextAreaComponent value={props?.value} onChange={props.onChange}></TextAreaComponent>
    )
}