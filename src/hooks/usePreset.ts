import { useCallback } from "react";
import { cardGlob, tarotGlob, type AssetPack } from "@/assets";

const globByPack: Record<string, Record<string, () => Promise<{ default: string }>>> = {
    cards: cardGlob,
    tarot: tarotGlob,
};

async function packToFiles(pack: AssetPack): Promise<File[]> {
    const glob = globByPack[pack.id];

    const results = await Promise.allSettled(
        pack.entries.map(async ({ file, label }) => {
            const importer = glob[`./${pack.id}/${file}`];
            if (!importer) throw new Error(`No glob entry for ${file}`);

            const { default: url } = await importer();
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch ${url}`);

            const blob = await res.blob();
            const ext = file.split(".").pop()!;

            return new File([blob], `${label}.${ext}`, {
                type: blob.type,
            });
        }),
    );

    return results
        .filter((r): r is PromiseFulfilledResult<File> => r.status === "fulfilled")
        .map((r) => r.value);
}

export function usePreset(packs: AssetPack[], addImages: (files: File[]) => void) {
    const loadPack = useCallback(
        async (packId: string) => {
            const pack = packs.find((p) => p.id === packId);
            if (!pack) return;

            const files = await packToFiles(pack);
            addImages(files);
        },
        [packs, addImages],
    );

    return { loadPack };
}
