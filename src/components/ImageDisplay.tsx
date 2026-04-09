import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CasinoIcon from "@mui/icons-material/Casino";
import type { UploadedImage } from "@/hooks/useRandomizer";
import { useTranslation } from "react-i18next";

interface Props {
    currentImage: UploadedImage | null;
    isRolling: boolean;
    hasImages: boolean;
}

export function ImageDisplay({ currentImage, isRolling, hasImages }: Props) {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "action.hover",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            {!currentImage && !isRolling && (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        color: "text.disabled",
                    }}
                >
                    <CasinoIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                    <Typography variant="body2" sx={{ opacity: 0.5 }}>
                        {hasImages ? t("roll_with_images") : t("roll_no_images")}
                    </Typography>
                </Box>
            )}

            <AnimatePresence>
                {isRolling && (
                    <motion.div
                        key="spinner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                        }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                        >
                            <CasinoIcon sx={{ fontSize: 52, color: "primary.main" }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {currentImage && !isRolling && (
                    <motion.div
                        key={currentImage.id}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 280, damping: 26 }}
                        style={{ position: "absolute", inset: 0 }}
                    >
                        <Box
                            component="img"
                            src={currentImage.url}
                            alt={currentImage.name}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block",
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                px: 2,
                                py: 1.25,
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{ color: "white", fontWeight: 600 }}
                                noWrap
                            >
                                {currentImage.name}
                            </Typography>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}
