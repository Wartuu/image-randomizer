import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/image-randomizer/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes("node_modules/react")) {
                        return "react";
                    }
                    if (
                        id.includes("node_modules/@mui/material") ||
                        id.includes("node_modules/@mui/icons-material") ||
                        id.includes("node_modules/@emotion/react") ||
                        id.includes("node_modules/@emotion/styled")
                    ) {
                        return "mui";
                    }
                    if (
                        id.includes("node_modules/i18next") ||
                        id.includes("node_modules/react-i18next") ||
                        id.includes("node_modules/i18next-browser-languagedetector")
                    ) {
                        return "i18n";
                    }
                },
            },
        },
    },
});
