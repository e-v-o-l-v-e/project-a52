// main.js
import kaplay from "kaplay";
import { enableDragCamera } from "./camera";
import { infiniteGrid } from "./grid.js";

const k = kaplay({
    background: [255, 255, 255],
});
k.loadRoot("./");

k.onMousePress("right", () => addKaboom(k.toWorld(k.mousePos())));

k.add([
    infiniteGrid(k, 64),
]);

enableDragCamera(k);
