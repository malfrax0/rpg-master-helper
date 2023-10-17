import { createTheme } from "@mui/material";
import { grey, teal } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#03a9f4"
            
        },
        secondary: {
            main: "#607d8b"
        },
        info: {
            main: teal[400]
        },
        divider: grey[50]
    }
});

export default theme;