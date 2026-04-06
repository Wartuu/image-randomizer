import type { ThemeOptions } from "@mui/material";

export const lightTheme: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: "#725188",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#675A6E",
            contrastText: "#FFFFFF",
        },
        info: {
            main: "#2B6CB0",
            contrastText: "#FFFFFF",
        },
        warning: {
            main: "#B45309",
            contrastText: "#FFFFFF",
        },
        error: {
            main: "#C62828",
            contrastText: "#FFFFFF",
        },
        success: {
            main: "#2D7A62",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#FFF7FD",
            paper: "#F4EBF3",
        },
        text: {
            primary: "#1E1A20",
            secondary: "#4B454D",
        },
        divider: "#CDC3CE",
    },
};
