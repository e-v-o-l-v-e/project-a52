import { KAPLAYCtx } from "kaplay";
import { rotatePoly } from "./tetromino";
import { justGetNextTetromino } from "./next-tetrominos";
import { setupPlacementPreview } from "./preview";

export function setupRotationButton(k: KAPLAYCtx) {
    const rec_width = 80;
    const rec_height = 80;

    k.loadSprite("rotate", "sprites/refresh-cw.png")

    const btn = k.add([
        k.rect(rec_width, rec_height, { radius: 8 }),
        k.pos(120,235),
        k.color(k.rgb(208, 209, 209)),
        k.outline(2),
        k.area(),
        k.fixed(),
    ]);

    btn.add([
        k.sprite("rotate"),
        k.anchor("center"),
        k.pos(40, 40),
        k.color(255, 255, 255),
    ]);

    btn.onClick(() => {
        rotatePoly(k, justGetNextTetromino(k));
        //
    });
}