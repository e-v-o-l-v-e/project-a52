import { KAPLAYCtx } from "kaplay";
import { resetQueue } from "./next-tetrominos";

export function setupResetButton(k: KAPLAYCtx) {
    const rec_width = 160;
    const rec_height = 40;

    const btn = k.add([
        k.rect(rec_width, rec_height, { radius: 8 }),
        k.pos(k.width() - rec_width - 20, 20),
        k.color(220, 50, 50),
        k.area(),
        k.fixed(),
    ]);

    btn.add([
        k.text("Reset", { size: 18 }),
        k.anchor("center"),
        k.pos(80, 20),
        k.color(255, 255, 255),
    ]);

    // clear all placed blocks
    btn.onClick(() => {
        const blocks = k.get("block", { recursive: true });
        blocks.forEach((block) => block.destroy());
        resetQueue(k)
        console.debug("grid reset: removed " + blocks.length + " blocks");
    });
}
