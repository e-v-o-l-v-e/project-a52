import { KAPLAYCtx } from "kaplay";
import type { GameObj, PosComp, FixedComp } from "kaplay";
import { Tetromino, getRandomPoly } from "./tetromino";
import { tile_size } from "./grid";

const PANEL_W = 100;
const PANEL_H = 300;
const PADDING = 10;
const NB_NEXT = 3;

export interface NextTetrominosUI {
    UI: GameObj<PosComp | FixedComp>;
    previews: GameObj<PosComp>;
    nextTetrominos: Tetromino[];
}


// Creates the Panel

export function createNextTetrominosUI(k: KAPLAYCtx): NextTetrominosUI {
    const UI = k.add([
        k.pos(20, 20),
        k.fixed(),
    ]);

    const panel = UI.add([
        k.rect(PANEL_W, PANEL_H, { radius: 16 }),
        k.color(k.rgb(208, 209, 209)),
        k.outline(2, k.rgb(61, 55, 55)),
        k.pos(0, 0),
        k.anchor("topleft"),
    ]);

    // Conteneur qu'on videra à chaque mise à jour
    const previews = panel.add([k.pos(0, 0)]);

    const nextUI: NextTetrominosUI = {
        UI,
        previews,
        nextTetrominos: Array.from({ length: NB_NEXT }, () => getRandomPoly(k)),
    };

    renderNextTetrominos(k, nextUI);
    return nextUI;
}

// Refreshes the shown tetrominos in the panel

export function renderNextTetrominos(k: KAPLAYCtx, nextUI: NextTetrominosUI) {
    const { previews, nextTetrominos } = nextUI;
    previews.removeAll();
    if (nextTetrominos.length === 0) return;

    const slotH = PANEL_H / nextTetrominos.length;
    const previewScale = (PANEL_W - 2 * PADDING) / (4 * tile_size);

    nextTetrominos.forEach((tetromino, i) => {
        const w = Math.max(...tetromino.blocks.map(b => b.x)) + tile_size;
        const h = Math.max(...tetromino.blocks.map(b => b.y)) + tile_size;

        const preview = previews.add([
            k.pos(
                (PANEL_W - w * previewScale) / 2,
                i * slotH + (slotH - h * previewScale) / 2,
            ),
            k.scale(previewScale),
        ]);

        const [r, g, b] = tetromino.color;
        tetromino.blocks.forEach(pos => {
            preview.add([
                k.rect(tile_size, tile_size),
                k.pos(pos),
                k.color(r, g, b),
                k.outline(2, k.rgb(0, 0, 0)),
            ]);
        });
    });
}

// Returns the next tetromino, removes it from the table, adds a new one and refreshes the panel

export function getNextTetromino(k: KAPLAYCtx, nextUI: NextTetrominosUI): Tetromino {
    const next_piece = nextUI.nextTetrominos[2]
    
    nextUI.nextTetrominos[2] = nextUI.nextTetrominos[1]

    nextUI.nextTetrominos[1] = nextUI.nextTetrominos[0]

    nextUI.nextTetrominos[0] = getRandomPoly(k)

    renderNextTetrominos(k, nextUI);

    return next_piece
}