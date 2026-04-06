import { IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

interface ThemePickerProps {
    mode: "light" | "dark";
    toggle: () => void;
}

const ThemeSelector = ({ mode, toggle }: ThemePickerProps) => {
    return (
        <IconButton
            component={motion.button}
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            size="small"
            sx={{
                color: "text.secondary",
                p: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ display: "flex" }}
                >
                    {mode === "light" ? (
                        <LightModeRoundedIcon sx={{ fontSize: 18 }} />
                    ) : (
                        <DarkModeRoundedIcon sx={{ fontSize: 18 }} />
                    )}
                </motion.div>
            </AnimatePresence>
        </IconButton>
    );
};

export default ThemeSelector;
