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
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9998,
                    paddingBottom: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    bgcolor: "background.paper",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    backdropFilter: "blur(8px)",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                    },
                }}
            >
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
                            px: { xs: 1.5, sm: 2.5 },
                            py: { xs: 0.8, sm: 1.2 },
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        }}
                    >
                        {t("donate")}
                    </Button>
                </a>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.25,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "100px",
                        px: 1,
                        py: 0.5,
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
            </Box>

            <Box
                component="main"
                sx={{
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    marginTop: "10",
                    pt: { xs: 9, sm: 10 },
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
