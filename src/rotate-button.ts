import { KAPLAYCtx } from "kaplay";
import { PANEL_X, PANEL_Y, PANEL_W, SLOT_H, rotateCurrent } from "./next-tetrominos";

export function setupRotationButton(k: KAPLAYCtx) {
  const size = 60;

  k.loadSprite("rotate", "sprites/refresh-cw.png");

  const btn = k.add([
    k.rect(size, size, { radius: 8 }),
    k.pos(PANEL_X + PANEL_W + 10, PANEL_Y + (SLOT_H - size) / 2),
    k.color(k.rgb(208, 209, 209)),
    k.outline(2),
    k.area(),
    k.fixed(),
    "button"
  ]);

  btn.add([
    k.sprite("rotate"),
    k.anchor("center"),
    k.pos(size / 2, size / 2),
  ]);

  btn.onClick(() => rotateCurrent(k));
}
