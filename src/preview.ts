import { KAPLAYCtx, GameObj, ColorComp, AreaComp } from "kaplay";
import { tile_size } from "./grid";
import { placementAvailable, placeTetromino, Tetromino } from "./tetromino";
import { getCurrentTetromino, advanceTetromino, rotateCurrent } from "./next-tetrominos";

const BLOCKED_COLORS: [number, number, number] = [255, 50, 50];

export function setupPlacementPreview(k: KAPLAYCtx) {
  let previewContainer: GameObj | null = null;
  let renderedTetromino: Tetromino | null = null;
  let renderedBlocks: Tetromino["blocks"] | null = null;

  function renderPreview(tetromino: Tetromino) {
    previewContainer?.destroy();
    previewContainer = k.add([k.pos(0, 0)]);

    tetromino.blocks.forEach((blockPos) => {
      previewContainer!.add([
        k.rect(tile_size, tile_size),
        k.pos(blockPos),
        k.color(0, 0, 0), // real color set on update
        k.opacity(0.4),
        k.outline(2, k.rgb(255, 255, 255)),
      ]);
    });

    renderedTetromino = tetromino;
    renderedBlocks = tetromino.blocks;
  }

  const isOverButton = () =>
    k.get("button", { recursive: true }).some((b) => (b as GameObj<AreaComp>).isHovering());

  k.onUpdate(() => {

    const currentTetromino = getCurrentTetromino();

    if (currentTetromino !== renderedTetromino || currentTetromino.blocks !== renderedBlocks) renderPreview(currentTetromino);

    // hide the preview while the mouse is over a button
    const overButton = isOverButton();
    previewContainer!.hidden = overButton;
    if (overButton) return;

    const mouseWorld = k.toWorld(k.mousePos());
    previewContainer!.pos = k.vec2(
      mouseWorld.x - (mouseWorld.x % tile_size),
      mouseWorld.y - (mouseWorld.y % tile_size)
    );

    const [r, g, b] = placementAvailable(k, mouseWorld, currentTetromino) ? currentTetromino.colors : BLOCKED_COLORS;
    previewContainer!.children.forEach((child) => {
      (child as GameObj<ColorComp>).color = k.rgb(r, g, b);
    });
  });

  // right click: place the current piece, then move on to the next one
  k.onMousePress("right", () => {
    const placed = placeTetromino(k, k.toWorld(k.mousePos()), getCurrentTetromino());
    if (placed) advanceTetromino(k);   // the preview rebuilds itself next frame
  });

  k.onKeyPress("r", () => rotateCurrent(k));

}
