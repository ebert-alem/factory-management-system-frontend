import { Alert, Snackbar } from "@mui/material"

interface CustomAlertProps {
    severity: "success" | "info" | "warning" | "error";
    text: string;
    isOpen: boolean;
    onClose: () => void;

}

export const CustomAlert = ({ severity, text, isOpen, onClose }: CustomAlertProps) => {

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
          {text}
        </Alert>
        </Snackbar>
    )
}

