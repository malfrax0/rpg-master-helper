import { SxProps } from "@mui/material";

export const sxHidden = <Theme extends Object = {}>(hidden: boolean, visibleDisplay: string = "block"): SxProps<Theme> => {
    return {
        display: hidden ? "none" : visibleDisplay
    }
}

const Utils = {

}

export default Utils;