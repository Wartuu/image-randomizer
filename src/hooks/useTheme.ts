import { useCallback, useEffect, useMemo, useState } from "react";
import getTheme from "@/theme/theme";

type ThemeMode = "light" | "dark";

const getInitialTheme = (): ThemeMode => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") return stored; // validate, not just cast
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function useTheme() {
    const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

    useEffect(() => {
        localStorage.setItem("theme", mode);
    }, [mode]);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                setMode(e.matches ? "dark" : "light");
            }
        };
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    const theme = useMemo(() => getTheme(mode), [mode]);
    const toggle = useCallback(() => setMode((m) => (m === "light" ? "dark" : "light")), []);

    return { mode, theme, toggle };
}
