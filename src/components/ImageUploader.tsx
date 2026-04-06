import { useCallback, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "react-i18next";

interface Props {
    onUpload: (files: File[]) => void;
}

export function ImageUploader({ onUpload }: Props) {
    const [dragging, setDragging] = useState(false);
    const { t } = useTranslation();

    const handle = useCallback(
        (files: FileList | null) => {
            if (!files) return;
            const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
            if (imgs.length) onUpload(imgs);
        },
        [onUpload],
    );

    return (
        <Box
            component={motion.div}
            animate={{ borderColor: dragging ? "primary.main" : "divider" }}
            onDrop={(e: React.DragEvent) => {
                e.preventDefault();
                setDragging(false);
                handle(e.dataTransfer.files);
            }}
            onDragOver={(e: React.DragEvent) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            sx={{
                border: "2px dashed",
                borderColor: dragging ? "primary.main" : "divider",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                bgcolor: dragging ? "action.hover" : "transparent",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
            }}
        >
            <CloudUploadIcon
                sx={{ fontSize: 36, color: dragging ? "primary.main" : "text.disabled" }}
            />
            <Typography variant="body2" color="text.secondary">
                {dragging ? t("drag_images") : t("upload_subtitle")}
            </Typography>
            <Button component="label" variant="outlined" size="small">
                {t("upload_button")}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={(e) => handle(e.target.files)}
                />
            </Button>
        </Box>
    );
}
