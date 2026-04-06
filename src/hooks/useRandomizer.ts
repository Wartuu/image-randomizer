import { useReducer, useCallback } from "react";

export interface UploadedImage {
    id: string;
    name: string;
    url: string;
}

interface State {
    images: UploadedImage[];
    currentImage: UploadedImage | null;
    remainingPool: string[];
    totalRolls: number;
    isRolling: boolean;
    cyclesCompleted: number;
}

type Action =
    | { type: "ADD_IMAGES"; images: UploadedImage[] }
    | { type: "REMOVE_IMAGE"; id: string }
    | { type: "ROLL_START" }
    | {
          type: "ROLL_RESULT";
          image: UploadedImage;
          remainingPool: string[];
          cyclesCompleted: number;
      };

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickNext(
    images: UploadedImage[],
    remaining: string[],
    lastId: string | null,
    cyclesCompleted: number,
): { image: UploadedImage; remainingPool: string[]; cyclesCompleted: number } {
    let pool = remaining.length > 0 ? remaining : null;
    let newCycles = cyclesCompleted;

    if (!pool) {
        let ids = shuffle(images.map((i) => i.id));
        // Prevent immediate repeat at cycle boundary
        if (lastId && ids[0] === lastId && ids.length > 1) {
            const swap = 1 + Math.floor(Math.random() * (ids.length - 1));
            [ids[0], ids[swap]] = [ids[swap], ids[0]];
        }
        pool = ids;
        newCycles = cyclesCompleted + 1;
    }

    const image = images.find((i) => i.id === pool![0])!;
    return { image, remainingPool: pool.slice(1), cyclesCompleted: newCycles };
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_IMAGES": {
            const updated = [...state.images, ...action.images];
            // Splice new images into random positions in the remaining pool
            const newIds = shuffle(action.images.map((i) => i.id));
            const pool = [...state.remainingPool];
            for (const id of newIds) {
                const at = Math.floor(Math.random() * (pool.length + 1));
                pool.splice(at, 0, id);
            }
            return { ...state, images: updated, remainingPool: pool };
        }
        case "REMOVE_IMAGE":
            return {
                ...state,
                images: state.images.filter((i) => i.id !== action.id),
                remainingPool: state.remainingPool.filter((id) => id !== action.id),
                currentImage: state.currentImage?.id === action.id ? null : state.currentImage,
            };
        case "ROLL_START":
            return { ...state, isRolling: true };
        case "ROLL_RESULT":
            return {
                ...state,
                isRolling: false,
                currentImage: action.image,
                remainingPool: action.remainingPool,
                cyclesCompleted: action.cyclesCompleted,
                totalRolls: state.totalRolls + 1,
            };
        default:
            return state;
    }
}

const INITIAL: State = {
    images: [],
    currentImage: null,
    remainingPool: [],
    totalRolls: 0,
    isRolling: false,
    cyclesCompleted: 0,
};

export function useRandomizer() {
    const [state, dispatch] = useReducer(reducer, INITIAL);

    const addImages = useCallback((files: File[]) => {
        const imgs: UploadedImage[] = files.map((f) => ({
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: f.name.replace(/\.[^/.]+$/, ""),
            url: URL.createObjectURL(f),
        }));
        dispatch({ type: "ADD_IMAGES", images: imgs });
    }, []);

    const removeImage = useCallback((id: string) => {
        dispatch({ type: "REMOVE_IMAGE", id });
    }, []);

    const roll = useCallback(() => {
        if (state.images.length === 0 || state.isRolling) return;
        dispatch({ type: "ROLL_START" });
        setTimeout(
            () => {
                const result = pickNext(
                    state.images,
                    state.remainingPool,
                    state.currentImage?.id ?? null,
                    state.cyclesCompleted,
                );
                dispatch({ type: "ROLL_RESULT", ...result });
            },
            500 + Math.random() * 300,
        );
    }, [state]);

    const cycleProgress =
        state.images.length > 0 ? 1 - state.remainingPool.length / state.images.length : 0;

    return { ...state, cycleProgress, addImages, removeImage, roll };
}
