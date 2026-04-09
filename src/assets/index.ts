import { type TFunction } from "i18next";

export interface AssetEntry {
    file: string;
    label: string;
}

export interface AssetPack {
    id: string;
    label: string;
    entries: AssetEntry[];
}

const SUIT_KEYS: Record<string, string> = {
    C: "cards.suits.clubs",
    D: "cards.suits.diamonds",
    H: "cards.suits.hearts",
    S: "cards.suits.spades",
};

const RANK_KEYS: Record<number, string> = {
    1: "cards.ranks.ace",
    11: "cards.ranks.jack",
    12: "cards.ranks.queen",
    13: "cards.ranks.king",
};

const rankLabel = (n: number, t: TFunction) => (RANK_KEYS[n] ? t(RANK_KEYS[n]) : String(n));

function buildCards(t: TFunction): AssetEntry[] {
    const suits = ["C", "D", "H", "S"];
    const entries: AssetEntry[] = [];

    for (const suit of suits) {
        for (let r = 1; r <= 13; r++) {
            entries.push({
                file: `${suit}-${r}.png`,
                label: t("cards.format", {
                    rank: rankLabel(r, t),
                    suit: t(SUIT_KEYS[suit]),
                }),
            });
        }
    }

    return entries;
}

export const cardGlob = import.meta.glob<{ default: string }>("./cards/*.png");
export const tarotGlob = import.meta.glob<{ default: string }>("./tarot/*.jpg");

export const createAssetPacks = (t: TFunction): AssetPack[] => [
    {
        id: "cards",
        label: t("pack-names.cards"),
        entries: buildCards(t),
    },
    {
        id: "tarot",
        label: t("pack-names.tarot"),
        entries: [
            { file: "00-TheFool.jpg", label: t("tarot.fool") },
            { file: "01-TheMagician.jpg", label: t("tarot.magician") },
            { file: "02-TheHighPriestess.jpg", label: t("tarot.highPriestess") },
            { file: "03-TheEmpress.jpg", label: t("tarot.empress") },
            { file: "04-TheEmperor.jpg", label: t("tarot.emperor") },
            { file: "05-TheHierophant.jpg", label: t("tarot.hierophant") },
            { file: "06-TheLovers.jpg", label: t("tarot.lovers") },
            { file: "07-TheChariot.jpg", label: t("tarot.chariot") },
            { file: "08-Strength.jpg", label: t("tarot.strength") },
            { file: "09-TheHermit.jpg", label: t("tarot.hermit") },
            { file: "10-WheelOfFortune.jpg", label: t("tarot.wheel") },
            { file: "11-Justice.jpg", label: t("tarot.justice") },
            { file: "12-TheHangedMan.jpg", label: t("tarot.hangedMan") },
            { file: "13-Death.jpg", label: t("tarot.death") },
            { file: "14-Temperance.jpg", label: t("tarot.temperance") },
            { file: "15-TheDevil.jpg", label: t("tarot.devil") },
            { file: "16-TheTower.jpg", label: t("tarot.tower") },
            { file: "17-TheStar.jpg", label: t("tarot.star") },
            { file: "18-TheMoon.jpg", label: t("tarot.moon") },
            { file: "19-TheSun.jpg", label: t("tarot.sun") },
            { file: "20-Judgement.jpg", label: t("tarot.judgement") },
            { file: "21-TheWorld.jpg", label: t("tarot.world") },
        ],
    },
];
