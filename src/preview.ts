import { KAPLAYCtx, GameObj } from "kaplay";
import { tile_size } from "./grid";
import { getRandomPoly, placePoly, rotatePoly, Tetromino } from "./tetromino";
import { getNextTetromino } from "./next-tetrominos";

export function setupPlacementPreview(k: KAPLAYCtx) {
  let currentPoly: Tetromino = getNextTetromino(k);
  let previewContainer: GameObj | null = null;

  // render preview
  function renderPreview() {
    if (previewContainer) previewContainer.destroy();

    previewContainer = k.add([k.pos(0, 0)]);

    currentPoly.blocks.forEach((blockPos) => {
      previewContainer!.add([
        k.rect(tile_size, tile_size),
        k.pos(blockPos),
        k.color(currentPoly.color[0], currentPoly.color[1], currentPoly.color[2]),
        k.opacity(0.4),
        k.outline(2, k.rgb(255, 255, 255)),
      ]);
    });
  }

  renderPreview();

  // update preview position with snap
  k.onUpdate(() => {
    if (!previewContainer) return;

    const mouseWorld = k.toWorld(k.mousePos());
    const snapX = mouseWorld.x - (mouseWorld.x % tile_size);
    const snapY = mouseWorld.y - (mouseWorld.y % tile_size);

    previewContainer.pos = k.vec2(snapX, snapY);
  });

  // try placing current piece on right click
  k.onMousePress("right", () => {
    const mouseWorld = k.toWorld(k.mousePos());
    const placed = placePoly(k, mouseWorld, currentPoly);

    // advance to next piece only if placement succeeded
    if (placed) {
      currentPoly = getNextTetromino(k);
      renderPreview();
    }
  });

  k.onKeyPress("r", () => {
    rotatePoly(k, currentPoly);
    renderPreview();
  });
}
