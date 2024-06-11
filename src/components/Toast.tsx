import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { color } from './ui/variables';


export interface ToastMethods {
    show: (title: string, message: string) => void;
    showSuccess: (title: string, message: string) => void;
    showError: (title: string, message: string) => void;
    showWarn: (title: string, message: string) => void;
}

const ToastComponent = styled.div`
    background-color: ${color.primary};
    position: fixed;
    right: 0;
    top: 5em;
    width: 270px;
    padding: 15px;
    color: white;
    opacity: 0.8;
    border-radius: 5px 0 0 5px;
    cursor: pointer;

    h1 {
        margin: 0;
    }
`

const Toast: React.ForwardRefRenderFunction<ToastMethods, any> = (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [toastColor, setToastColor] = useState('');

    const timerRef = useRef<NodeJS.Timeout>();

    useImperativeHandle(ref, () => ({
        show: (title: string, message: string) => {
            setToastColor(color.primary)
            setTitle(title);
            setMessage(message);
            setIsVisible(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 10000);
        },
        showSuccess: (title: string, message: string) => {
            setToastColor(color.success);
            setTitle(title);
            setMessage(message);
            setIsVisible(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 10000);
        },
        showError: (title: string, message: string) => {
            setToastColor(color.danger);
            setTitle(title);
            setMessage(message);
            setIsVisible(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 10000);
        },
        showWarn: (title: string, message: string) => {
            setToastColor(color.warning);
            setTitle(title);
            setMessage(message);
            setIsVisible(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 10000);
        }
    }));

    const closeOnClick = () => {
        setIsVisible(false);
    }

    return (
        <>
            {isVisible && (
                <ToastComponent onClick={() => closeOnClick()} style={{ backgroundColor: toastColor }}>
                    <h3>{title}</h3>
                    <p>{message}</p>
                </ToastComponent>
            )}
        </>
    );
};

export default forwardRef(Toast);
