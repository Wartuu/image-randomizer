import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en_common from "@/data/locales/en/common.json";
import pl_common from "@/data/locales/pl/common.json";
import de_common from "@/data/locales/de/common.json";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

import PL from "country-flag-icons/react/3x2/PL";
import EN from "country-flag-icons/react/3x2/GB";
import DE from "country-flag-icons/react/3x2/DE";
import type { FlagComponent } from "country-flag-icons/react/3x2";

const resources = {
    en: { translation: en_common.translation },
    pl: { translation: pl_common.translation },
    de: { translation: de_common.translation },
};

export const flagMap: Record<string, FlagComponent> = {
    pl: PL,
    en: EN,
    de: DE,
};

i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: true,
        supportedLngs: ["en", "pl", "de"],

        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
