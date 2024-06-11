import { ReactElement, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

export default function ButtonConfirm(props: {
    label?: string, icon?: ReactElement, confirmTitle?: string, confirmText?: string, transparent?: boolean,
    callback?: (e: any) => void
}) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleNo = (e: any) => {
        e.preventDefault();
        setShowConfirm(false);
    }

    return (
        <>
            <Button label={props.label} icon={props.icon} type="button" onClick={() => setShowConfirm(!showConfirm)} transparent={props.transparent}></Button>
            <Modal title={props.confirmText ?? 'Are you sure?'} open={showConfirm} onClose={() => setShowConfirm(false)}>
                <Button label="Yes" onClick={(e) => {
                    props.callback && props.callback(e)
                    setShowConfirm(false)
                }}></Button>
                <Button label="No" onClick={(e) => handleNo(e)} transparent></Button>
            </Modal>
        </>
    )
}