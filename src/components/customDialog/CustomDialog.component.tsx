import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface CustomDialogProps {
    title: string;
    text: string;
    isOpen: boolean;
    onAccept: () => void;
    onCancel: () => void;
}

export const CustomDialog = ({ title, text, isOpen, onAccept, onCancel }: CustomDialogProps) => {

    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onAccept} autoFocus>
                    Aceptar
                </Button>
                <Button onClick={onCancel}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    )
}

