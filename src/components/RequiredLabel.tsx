import styled from "styled-components"

const SpanComponent = styled.span`
    display: flex;
    gap: 5px;
`

const SpanRequired = styled(SpanComponent)`
    color: red;
`

export default function Span(props: { children?: any, required?: boolean }) {
    return (
        <SpanComponent>
            {props.children}
            {props.required && <SpanRequired>*</SpanRequired>}
        </SpanComponent>
    )
}