import { Box, Button, CssBaseline, Divider, ThemeProvider, Typography } from "@mui/material";
import LanguageSelector from "@/components/LanguageSelector.tsx";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ThemeSelector from "@/components/ThemeSelector.tsx";
import { useTheme } from "@/hooks/useTheme.ts";
import { useTranslation } from "react-i18next";
import CasinoIcon from "@mui/icons-material/Casino";
import { ImageRandomizer } from "@/components/ImageRandomizer.tsx";
import { motion } from "framer-motion";

const App = () => {
    const { mode, theme, toggle } = useTheme();
    const { t } = useTranslation();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ position: "fixed", top: 14, left: 14 }}>
                <a href="https://ko-fi.com/M4M318UXVH" target="_blank">
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<CoffeeIcon />}
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{
                            borderRadius: "999px",
                            px: 2.5,
                            py: 1.2,
                            fontWeight: 600,
                            textTransform: "none",
                        }}
                    >
                        {t("donate")}
                    </Button>
                </a>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    top: 14,
                    right: 14,
                    zIndex: 9998,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.25,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "100px",
                    px: 1,
                    py: 0.5,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    backdropFilter: "blur(8px)",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                    },
                }}
            >
                <LanguageSelector />
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 0.75, height: 16, alignSelf: "center" }}
                />
                <ThemeSelector mode={mode} toggle={toggle} />
            </Box>

            <Box
                component="main"
                sx={{
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    pt: 8,
                    pb: 4,
                }}
            >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1,
                        }}
                    >
                        <CasinoIcon sx={{ fontSize: 32, color: "primary.main" }} />
                        <Typography variant="h4">{t("title")}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {t("subtitle")}
                    </Typography>
                </Box>

                <ImageRandomizer />
            </Box>
        </ThemeProvider>
    );
};

export default App;
