import styled from "styled-components"
import Input from "./Input"
import { useState } from "react";
import { color } from "./ui/variables";
import { IoIosRemoveCircle } from "react-icons/io";


const MultipleInputComponent = styled.div`
    display: flex;
    flex-direction: column;
`

const MultipleInputPanel = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const MultipleInputValuesPanel = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 15px 0;
`;

const MultipleInputValue = styled.div`
    background-color: ${color.primary};
    color: white;
    border-radius: 3px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
        cursor: pointer;
    }
`;

export default function MultipleInput(props: { value?: string[], label: string, onAdd?: (value: string) => void, onRemove?: (value: string) => void }) {
    const [values, setValues] = useState<string[]>(props.value || []);

    const onAddValue = (e: any) => {
        setValues([...values, e.target.value]);
        if (props.onAdd) {
            props.onAdd(e.target.value);
        }
        e.target.value = '';
    }

    const removeItemFromValues = (index: number) => {
        const removedValue = values[index];
        const newValues = values.filter((value, i) => i !== index);
        setValues(newValues);
        if (props.onRemove) {
            props.onRemove(removedValue);
        }
    }

    return (
        <MultipleInputComponent>
            <MultipleInputPanel>
                <span>{props.label}</span>
                <Input type="text" onKeyPress={(e) => {
                    e.key === "Enter" && onAddValue(e);
                }}></Input>
            </MultipleInputPanel>
            <MultipleInputValuesPanel>
                {values.map((value, index) => (
                    <MultipleInputValue key={index}>
                        {value}
                        <IoIosRemoveCircle onClick={() => removeItemFromValues(index)}></IoIosRemoveCircle>
                    </MultipleInputValue>
                ))}
            </MultipleInputValuesPanel>
        </MultipleInputComponent>
    )
}