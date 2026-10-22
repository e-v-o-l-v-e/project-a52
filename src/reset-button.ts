import { KAPLAYCtx } from "kaplay";

export function setupResetButton(k: KAPLAYCtx) {
    const btn = k.add([
        k.rect(160, 40, { radius: 8 }),
        k.pos(20, 20),
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
        console.debug("grid reset: removed " + blocks.length + " blocks");
    });
}