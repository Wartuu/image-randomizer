import type { ThemeOptions } from "@mui/material";

export const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: "#DFB8F7",
            contrastText: "#412356",
        },
        secondary: {
            main: "#D2C1D9",
            contrastText: "#382C3F",
        },
        info: {
            main: "#A8C8F8",
            contrastText: "#003061",
        },
        warning: {
            main: "#F5D6A0",
            contrastText: "#3A2400",
        },
        error: {
            main: "#FFB4AB",
            contrastText: "#690005",
        },
        background: {
            default: "#161217",
            paper: "#221E24",
        },
        text: {
            primary: "#E9E0E8",
            secondary: "#CDC3CE",
        },
        divider: "#4B454D",
    },
};
