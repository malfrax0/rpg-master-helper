import { Button, LinearProgress, Typography } from "@mui/material";
import { orange, red } from "@mui/material/colors";

export enum PageErrorSeverity {
    WARNING,
    ERROR,
    CRITICAL
}

export type PageErrorProp = {
    error: string,
    severity: PageErrorSeverity
}

const SeverityToColor = {
    [PageErrorSeverity.WARNING]: orange[500],
    [PageErrorSeverity.ERROR]: red[500],
    [PageErrorSeverity.CRITICAL]: red[900]
}

export default function PageError(props: PageErrorProp) {
    return (
        <div className="block w-full h-full">
            <div className="flex items-center justify-center h-full w-full">
                <Typography color={SeverityToColor[props.severity]}>
                    {props.error}
                </Typography>
            </div>
        </div>
    )
}