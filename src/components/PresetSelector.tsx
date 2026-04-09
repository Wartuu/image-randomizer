import { useMemo, useState } from "react";
import {
    Button,
    Menu,
    MenuItem,
    ListItemText,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { usePreset } from "@/hooks/usePreset";
import { useTranslation } from "react-i18next";
import { createAssetPacks } from "@/assets";

interface Props {
    addImages: (files: File[]) => void;
}

export function PresetSelector({ addImages }: Props) {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const { t } = useTranslation();
    const packs = useMemo(() => createAssetPacks(t), [t]);
    const { loadPack } = usePreset(packs, addImages);

    const handleLoad = async (packId: string) => {
        setLoadingId(packId);
        try {
            await loadPack(packId);
            setAnchor(null);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <>
            <Button
                variant="text"
                size="small"
                startIcon={<FormatListBulletedIcon fontSize="small" />}
                onClick={(e) => setAnchor(e.currentTarget)}
            >
                {t("usePreset")}
            </Button>

            <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
                slotProps={{
                    paper: { elevation: 2, sx: { minWidth: 200 } },
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ px: 2, pt: 1, pb: 0.5, display: "block" }}
                >
                    {t("packs")}
                </Typography>

                <Divider />

                {packs.map((pack) => {
                    const isLoading = loadingId === pack.id;

                    return (
                        <MenuItem
                            key={pack.id}
                            onClick={() => handleLoad(pack.id)}
                            disabled={loadingId !== null && !isLoading}
                        >
                            <ListItemText
                                primary={pack.label}
                                secondary={t("imagesCount", {
                                    count: pack.entries.length,
                                })}
                            />
                            {isLoading && <CircularProgress size={16} />}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
