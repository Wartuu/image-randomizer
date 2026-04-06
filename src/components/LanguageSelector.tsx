import { Box, MenuItem, Select, Typography } from "@mui/material";
import { flagMap } from "@/i18n";
import { useTranslation } from "react-i18next";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const displayNames = new Intl.DisplayNames([i18n.language], { type: "language" });

    return (
        <Select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            variant="standard"
            disableUnderline
            size="small"
            MenuProps={{
                disableScrollLock: true,

                PaperProps: {
                    sx: {
                        mt: 1.5,
                        borderRadius: 2.5,
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        minWidth: 90,
                        backdropFilter: "blur(12px)",
                        overflow: "hidden",
                        p: 0.5,
                    },
                },
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                transformOrigin: { vertical: "top", horizontal: "left" },
            }}
            sx={{
                p: 0,
                "& .MuiInputBase-input": {
                    p: "4px !important",
                    lineHeight: 1,
                },
                "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.75,
                    py: 0.25,
                    px: 0.5,
                    "&:focus": { bgcolor: "transparent" },
                },
                "& .MuiSelect-icon": { display: "none" },
            }}
            renderValue={(code) => {
                const Flag = flagMap[code];
                return (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.75,
                        }}
                    >
                        {Flag && <Flag width={16} style={{ borderRadius: 1 }} />}
                        <Typography
                            variant="caption"
                            fontWeight={600}
                            letterSpacing={0.5}
                            sx={{ color: "text.primary" }}
                        >
                            {code.toUpperCase()}
                        </Typography>
                    </Box>
                );
            }}
        >
            {Object.keys(flagMap).map((code) => {
                const Flag = flagMap[code];
                const isSelected = i18n.language === code;
                return (
                    <MenuItem
                        key={code}
                        value={code}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1,
                            py: 0.875,
                            px: 1.25,
                            borderRadius: 1.5,
                            transition: "background 0.15s ease",
                            bgcolor: isSelected ? "action.selected" : "transparent",
                            "&:hover": { bgcolor: "action.hover" },
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                            {Flag && <Flag width={20} style={{ borderRadius: 3 }} />}
                            <Typography variant="body2" fontWeight={isSelected ? 600 : 400}>
                                {displayNames.of(code)}
                            </Typography>
                        </Box>
                        {isSelected && (
                            <CheckRoundedIcon
                                sx={{ fontSize: 15, color: "primary.main", opacity: 0.8 }}
                            />
                        )}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default LanguageSelector;
