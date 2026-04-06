import { createTheme, type ThemeOptions } from "@mui/material";
import { lightTheme } from "@/theme/lightTheme";
import { darkTheme } from "@/theme/darkTheme";

const shared: ThemeOptions = {
    typography: {
        fontFamily: "'DM Sans', sans-serif",
        h1: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
        h2: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
        h3: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
        h4: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*, *::before, *::after": {
                    transition:
                        "background-color 0.3s ease, color 0.2s ease, border-color 0.3s ease !important",
                },
            },
        },
    },
};

const getTheme = (mode: "light" | "dark") =>
    createTheme({ ...shared, ...(mode === "dark" ? darkTheme : lightTheme) });

export default getTheme;
