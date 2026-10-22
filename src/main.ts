import kaplay from "kaplay";
import { enableDragCamera } from "./camera";
import { infiniteGrid } from "./grid.ts";
import { placePoly } from "./tetromino.ts";
import { createNextTetrominosUI } from "./next-tetrominos.ts";

export const k = kaplay({
  background: [255, 255, 255],
});
k.loadRoot("./");

infiniteGrid(k);
enableDragCamera(k);

k.onMousePress("right", () => {
  placePoly(k, k.toWorld(k.mousePos()));
});


createNextTetrominosUI(k)
