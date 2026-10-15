import kaplay from "kaplay";
import { enableDragCamera } from "./camera";
import { infiniteGrid } from "./grid.ts";

const k = kaplay({
  background: [255, 255, 255],
});
k.loadRoot("./");

k.onMousePress("right", () => k.addKaboom(k.toWorld(k.mousePos())));

infiniteGrid(k, 64);
enableDragCamera(k);
