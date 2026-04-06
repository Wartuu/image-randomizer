import { Box, Typography, IconButton, Tooltip, Collapse } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { UploadedImage } from "@/hooks/useRandomizer";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    images: UploadedImage[];
    onRemove: (id: string) => void;
}

export function ImageGallery({ images, onRemove }: Props) {
    const [expanded, setExpanded] = useState(true);
    const { t } = useTranslation();

    if (images.length === 0) return null;

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    cursor: "pointer",
                    userSelect: "none",
                }}
                onClick={() => setExpanded((v) => !v)}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, color: "text.secondary", letterSpacing: "0.08em" }}
                    >
                        {t("image_pool")}
                    </Typography>
                    <Box sx={{ px: 0.75, py: 0.1, borderRadius: 99, bgcolor: "primary.main" }}>
                        <Typography sx={{ fontSize: "0.6rem", color: "white", fontWeight: 700 }}>
                            {images.length}
                        </Typography>
                    </Box>
                </Box>
                <IconButton size="small" sx={{ p: 0.25 }}>
                    {expanded ? (
                        <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                    ) : (
                        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                    )}
                </IconButton>
            </Box>

            <Collapse in={expanded}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
                        gap: 1,
                    }}
                >
                    <AnimatePresence initial={false}>
                        {images.map((img) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                layout
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        aspectRatio: "1 / 1",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        "&:hover .delete-btn": { opacity: 1 },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={img.url}
                                        alt={img.name}
                                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <Box
                                        className="delete-btn"
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            bgcolor: "rgba(0,0,0,0.5)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            opacity: 0,
                                            transition: "opacity 0.15s",
                                        }}
                                    >
                                        <Tooltip title="Remove" placement="top">
                                            <IconButton
                                                size="small"
                                                onClick={() => onRemove(img.id)}
                                                sx={{
                                                    color: "white",
                                                    bgcolor: "rgba(0,0,0,0.4)",
                                                    "&:hover": { bgcolor: "error.dark" },
                                                }}
                                            >
                                                <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Box>
            </Collapse>
        </Box>
    );
}
