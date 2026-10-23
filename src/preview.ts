import { KAPLAYCtx, GameObj, ColorComp } from "kaplay";
import { tile_size } from "./grid";
import { getRandomPoly, placementAvailable, placePoly, rotatePoly, Tetromino } from "./tetromino";
import { getNextTetromino } from "./next-tetrominos";

const BLOCKED_COLORS = [255, 50, 50];

export function setupPlacementPreview(k: KAPLAYCtx) {
  let currentPoly: Tetromino = getNextTetromino(k);
  let previewContainer: GameObj | null = null;

  // render preview
  function renderPreview() {
    if (previewContainer) previewContainer.destroy();

    previewContainer = k.add([k.pos(0, 0)]);

    let colors = [];
    if (placementAvailable(k, k.toWorld(k.mousePos()), currentPoly)) {
      colors = currentPoly.colors;
    } else {
      colors = BLOCKED_COLORS;
    }

    currentPoly.blocks.forEach((blockPos) => {
      previewContainer!.add([
        k.rect(tile_size, tile_size),
        k.pos(blockPos),
        k.color(colors[0], colors[1], colors[2]),
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
    previewContainer.pos = k.vec2(
      mouseWorld.x - (mouseWorld.x % tile_size),
      mouseWorld.y - (mouseWorld.y % tile_size)
    );

    const [r, g, b] = placementAvailable(k, mouseWorld, currentPoly)
      ? currentPoly.colors
      : BLOCKED_COLORS;

    previewContainer.children.forEach((child) => {
      (child as GameObj<ColorComp>).color = k.rgb(r, g, b);
    });
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
