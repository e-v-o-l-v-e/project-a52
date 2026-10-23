import { KAPLAYCtx } from "kaplay";
import type { GameObj, PosComp } from "kaplay";
import { Tetromino, getRandomTetromino, rotateTetromino } from "./tetromino";
import { tile_size } from "./grid";

export const PANEL_X = 20;
export const PANEL_Y = 20;
export const PANEL_W = 100;
export const SLOT_H = 100;            // height of one slot (current piece + each queued piece)
const PADDING = 10;
const NB_NEXT = 3;
const PANEL_H = SLOT_H * (NB_NEXT + 1);

interface PieceState {
  previews: GameObj<PosComp>;
  current: Tetromino;
  queue: Tetromino[];                 // queue[0] is the next piece
}

let state: PieceState;

function getState(): PieceState {
  if (!state) throw new Error("createNextTetrominosUI(k) must be called first");
  return state;
}

export function createNextTetrominosUI(k: KAPLAYCtx) {
  const UI = k.add([k.pos(PANEL_X, PANEL_Y), k.fixed()]);

  const panel = UI.add([
    k.rect(PANEL_W, PANEL_H, { radius: 16 }),
    k.color(k.rgb(208, 209, 209)),
    k.outline(2, k.rgb(61, 55, 55)),
    k.pos(0, 0),
    k.anchor("topleft"),
  ]);

  // separator between the current piece and the queue
  panel.add([
    k.rect(PANEL_W - 2 * PADDING, 2),
    k.color(k.rgb(61, 55, 55)),
    k.pos(PADDING, SLOT_H),
  ]);

  // emptied and refilled on every update
  const previews = panel.add([k.pos(0, 0)]);

  state = {
    previews,
    current: getRandomTetromino(k),
    queue: Array.from({ length: NB_NEXT }, () => getRandomTetromino(k)),
  };

  renderPanel(k);
}

// draws one piece centered in the slot starting at slotTop
function drawPiece(k: KAPLAYCtx, parent: GameObj, tetromino: Tetromino, slotTop: number) {
  // bounding box: offsets can be negative since (0, 0) is the pivot block
  const xs = tetromino.blocks.map((b) => b.x);
  const ys = tetromino.blocks.map((b) => b.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const w = Math.max(...xs) - minX + tile_size;
  const h = Math.max(...ys) - minY + tile_size;

  const scale = (PANEL_W - 2 * PADDING) / (4 * tile_size);

  const piece = parent.add([
    k.pos(
      (PANEL_W - w * scale) / 2,
      slotTop + (SLOT_H - h * scale) / 2,
    ),
    k.scale(scale),
  ]);

  const [r, g, b] = tetromino.colors;
  tetromino.blocks.forEach((pos) => {
    piece.add([
      k.rect(tile_size, tile_size),
      k.pos(pos.x - minX, pos.y - minY),   // shift so the shape starts at the piece's origin
      k.color(r, g, b),
      k.outline(2, k.rgb(0, 0, 0)),
    ]);
  });
}

function renderPanel(k: KAPLAYCtx) {
  const { previews, current, queue } = getState();
  previews.removeAll();

  drawPiece(k, previews, current, 0);
  queue.forEach((tetromino, i) => drawPiece(k, previews, tetromino, (i + 1) * SLOT_H));
}

export function getCurrentTetromino(): Tetromino {
  return getState().current;
}

// the queued piece becomes the current one, a new random piece joins the queue
export function advanceTetromino(k: KAPLAYCtx): Tetromino {
  const s = getState();
  s.current = s.queue.shift()!;
  s.queue.push(getRandomTetromino(k));
  renderPanel(k);
  return s.current;
}

export function rotateCurrent(k: KAPLAYCtx) {
  rotateTetromino(k, getState().current);
  renderPanel(k);
}

export function resetQueue(k: KAPLAYCtx) {
  const s = getState();
  s.current = getRandomTetromino(k);
  s.queue = Array.from({ length: NB_NEXT }, () => getRandomTetromino(k));
  renderPanel(k);
}
