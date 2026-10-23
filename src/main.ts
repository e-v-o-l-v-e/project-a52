import kaplay from "kaplay";
import { enableDragCamera } from "./camera";
import { infiniteGrid } from "./grid.ts";
import { setupResetButton } from "./reset-button.ts";
import { createNextTetrominosUI } from "./next-tetrominos.ts";
import { setupPlacementPreview } from "./preview";
import { setupRotationButton } from "./rotate-button.ts";

export const k = kaplay({
    background: [255, 255, 255],
});
k.loadRoot("./");

infiniteGrid(k);
enableDragCamera(k);

setupResetButton(k);
setupRotationButton(k);

createNextTetrominosUI(k)
setupPlacementPreview(k);
