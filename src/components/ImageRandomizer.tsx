import { Box, Paper, Typography, Divider, Button, LinearProgress, Tooltip } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { motion } from "framer-motion";
import { useRandomizer } from "@/hooks/useRandomizer";
import { ImageDisplay } from "./ImageDisplay";
import { ImageUploader } from "./ImageUploader";
import { ImageGallery } from "./ImageGallery";
import { useTranslation } from "react-i18next";

export function ImageRandomizer() {
    const {
        images,
        currentImage,
        isRolling,
        totalRolls,
        cyclesCompleted,
        remainingPool,
        cycleProgress,
        addImages,
        removeImage,
        roll,
    } = useRandomizer();

    const seen = images.length - remainingPool.length;

    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 320px" },
                gap: 3,
                maxWidth: 880,
                mx: "auto",
                px: { xs: 2, sm: 3 },
                py: 4,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <ImageDisplay
                    currentImage={currentImage}
                    isRolling={isRolling}
                    hasImages={images.length > 0}
                />

                {images.length > 0 && (
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <ShuffleIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                                <Typography variant="caption" color="text.secondary">
                                    {t("cycle")} {cyclesCompleted + 1}
                                </Typography>
                            </Box>
                            <Tooltip title={`${remainingPool.length} ${t("images_left")}`} arrow>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ cursor: "default" }}
                                >
                                    {seen} / {images.length}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={cycleProgress * 100}
                            sx={{ borderRadius: 99, height: 4 }}
                        />
                    </Box>
                )}

                <Button
                    onClick={roll}
                    disabled={images.length === 0 || isRolling}
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={
                        isRolling ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
                            >
                                <CasinoIcon />
                            </motion.div>
                        ) : (
                            <CasinoIcon />
                        )
                    }
                    sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
                >
                    {isRolling ? t("rolling") : t("roll")}
                </Button>

                {totalRolls > 0 && (
                    <Typography variant="caption" color="text.disabled" align="center">
                        {totalRolls} {t("rolls")} · {cyclesCompleted} {t("cycles_completed")}
                    </Typography>
                )}
            </Box>

            {/* Right */}
            <Paper
                elevation={0}
                sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                    height: "fit-content",
                }}
            >
                <ImageUploader onUpload={addImages} />
                <Divider />
                <ImageGallery images={images} onRemove={removeImage} />
            </Paper>
        </Box>
    );
}
