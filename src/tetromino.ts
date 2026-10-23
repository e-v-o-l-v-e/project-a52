import { KAPLAYCtx, Vec2 } from "kaplay";
import { tile_size } from "./grid";

export interface Tetromino {
  colors: [number, number, number];
  blocks: Vec2[];
}

// polies is the plural of poly
export function getPolies(k: KAPLAYCtx): Tetromino[] {
  const V = (x: number, y: number) => k.vec2(x * tile_size, y * tile_size);

  const T: Tetromino = {
    colors: [60, 120, 255],
    blocks: [
      //            1  2  3 
      //           XXXXXXXXX
      //           XXXXXXXXX
      //              XXX
      //              XXX
      //               4
      V(-1, 0), // 1
      V(0, 0), // 2
      V(1, 0), // 3
      V(0, 1), // 4
    ],
  };

  const I: Tetromino = {
    colors: [0, 240, 240],
    blocks: [
      //            1  2  3  4
      //           XXXXXXXXXXXXX
      //           XXXXXXXXXXXXX
      V(-1, 0),
      V(0, 0),
      V(1, 0),
      V(2, 0),
    ],
  };

  const O: Tetromino = {
    colors: [240, 240, 0],
    blocks: [
      //           1 XXXXXX 2
      //             XXXXXX
      //             XXXXXX
      //           3 XXXXXX 4
      V(0, 0),
      V(1, 0),
      V(0, 1),
      V(1, 1),
    ],
  };

  const L: Tetromino = {
    colors: [240, 160, 0],
    blocks: [
      //        1 XXX
      //          XXX
      //        2 XXX
      //          XXX
      //        3 XXXXXXX
      //          XXXXXXX 4
      V(0, -1),
      V(0, 0),
      V(0, 1),
      V(1, 1),
    ],
  };

  const J: Tetromino = {
    colors: [0, 0, 240],
    blocks: [
      //           XXX 1
      //           XXX
      //           XXX 2
      //           XXX
      //        XXXXXX 3
      //      4 XXXXXX 
      V(0, -1),
      V(0, 0),
      V(0, 1),
      V(-1, 1),
    ],
  };

  const S: Tetromino = {
    colors: [0, 240, 0],
    blocks: [
      //             1    2
      //             XXXXXX
      //             XXXXXX
      //        2 XXXXXX
      //          XXXXXX 3
      V(0, 0),
      V(1, 0),
      V(-1, 1),
      V(0, 1),
    ],
  };

  const Z: Tetromino = {
    colors: [240, 0, 0],
    blocks: [
      //            1      2
      //             XXXXXX
      //             XXXXXX
      //                XXXXXX
      //                XXXXXX
      //               3      4
      V(-1, 0),
      V(0, 0),
      V(0, 1),
      V(1, 1),
    ],
  };

  return [T, I, O, L, J, S, Z];
}

export function getRandomPoly(k: KAPLAYCtx): Tetromino {
  const polies = getPolies(k);
  const rand = Math.floor(Math.random() * polies.length);
  return polies[rand];
}

export function placePoly(k: KAPLAYCtx, clickPos: Vec2, tetromino: Tetromino): boolean {
  console.log("placing random tetromino at " + clickPos);

  if (!placementAvailable(k, clickPos, tetromino)) {
    console.log("tetromino cannot be placed here because one cell or more is already occupied");
    return false;
  }

  const originCell = k.vec2(
    clickPos.x - (clickPos.x % tile_size),
    clickPos.y - (clickPos.y % tile_size)
  );

  // place tetromino
  const pieceParent = k.add([k.pos(originCell)]);
  tetromino.blocks.forEach((pos) => {
    pieceParent.add([
      k.rect(tile_size, tile_size),
      k.pos(pos),
      k.color(tetromino.colors[0], tetromino.colors[1], tetromino.colors[2]),
      k.outline(2, k.rgb(0, 0, 0)),
      k.area(),
      "block",
    ]);
  });

  return true;
}

export function placementAvailable(k: KAPLAYCtx, mousePos: Vec2, tetromino: Tetromino) {

  const originCell = k.vec2(
    mousePos.x - (mousePos.x % tile_size),
    mousePos.y - (mousePos.y % tile_size)
  );

  // where each block of the new piece would land
  const newBlockCells = tetromino.blocks.map((pos) => originCell.add(pos));


  // cells already taken
  const placedBlocks = k.get("block", { recursive: true });
  const takenCells = placedBlocks.map((block) => {
    const worldPos = block.worldPos()!;
    return k.vec2(
      worldPos.x - (worldPos.x % tile_size),
      worldPos.y - (worldPos.y % tile_size)
    );
  });

  // some(callback) returns true if any of the already
  // occupied cells would be overwritten by the new piece
  const occupied = newBlockCells.some((newCell) =>
    takenCells.some((occupiedCell) => newCell.eq(occupiedCell))
  );

  return !occupied;
}

export function rotatePoly(k: KAPLAYCtx, tetromino: Tetromino) {
  // y points down on screen, so (x, y) -> (-y, x) is clockwise
  const rotated = tetromino.blocks.map((b) => k.vec2(-b.y, b.x));
  tetromino.blocks = rotated;
}
