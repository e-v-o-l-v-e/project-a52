import { KAPLAYCtx, Vec2 } from "kaplay";
import { tile_size } from "./grid";

export interface Tetromino {
  color: [number, number, number];
  blocks: Vec2[];
}

// polies is the plural of poly
export function getPolies(k: KAPLAYCtx): Tetromino[] {
  const V = (x: number, y: number) => k.vec2(x * tile_size, y * tile_size);

  const T: Tetromino = {
    color: [60, 120, 255],
    blocks: [
      //            1  2  3 
      //           XXXXXXXXX
      //           XXXXXXXXX
      //              XXX
      //              XXX
      //               4
      V(0, 0), // 1
      V(1, 0), // 2
      V(2, 0), // 3
      V(1, 1), // 4
    ],
  };

  const I: Tetromino = {
    color: [0, 240, 240],
    blocks: [
      //            1  2  3  4
      //           XXXXXXXXXXXXX
      //           XXXXXXXXXXXXX
      V(0, 0),
      V(1, 0),
      V(2, 0),
      V(3, 0),
    ],
  };

  const O: Tetromino = {
    color: [240, 240, 0],
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
    color: [240, 160, 0],
    blocks: [
      //        1 XXX
      //          XXX
      //        2 XXX
      //          XXX
      //        3 XXXXXXX
      //          XXXXXXX 4
      V(0, 0),
      V(0, 1),
      V(0, 2),
      V(1, 2),
    ],
  };

  const J: Tetromino = {
    color: [0, 0, 240],
    blocks: [
      //           XXX 1
      //           XXX
      //           XXX 2
      //           XXX
      //        XXXXXX 3
      //      4 XXXXXX 
      V(1, 0),
      V(1, 1),
      V(1, 2),
      V(0, 2),
    ],
  };

  const S: Tetromino = {
    color: [0, 240, 0],
    blocks: [
      //             1    2
      //             XXXXXX
      //             XXXXXX
      //        2 XXXXXX
      //          XXXXXX 3
      V(1, 0),
      V(2, 0),
      V(0, 1),
      V(1, 1),
    ],
  };

  const Z: Tetromino = {
    color: [240, 0, 0],
    blocks: [
      //            1      2
      //             XXXXXX
      //             XXXXXX
      //                XXXXXX
      //                XXXXXX
      //               3      4
      V(0, 0),
      V(1, 0),
      V(1, 1),
      V(2, 1),
    ],
  };

  return [T, I, O, L, J, S, Z];
}

export function getRandomPoly(k: KAPLAYCtx): Tetromino {
  const polies = getPolies(k);
  const rand = Math.floor(Math.random() * polies.length);
  return polies[rand];
}
export function placePoly(k: KAPLAYCtx, clickPos: Vec2) {
  console.log("placing random tetromino at " + clickPos);

  const originCell = k.vec2(
    clickPos.x - (clickPos.x % tile_size),
    clickPos.y - (clickPos.y % tile_size)
  );

  const newPiece = getRandomPoly(k);

  // where each block of the new piece would land
  const newBlockCells = newPiece.blocks.map((pos) => originCell.add(pos));

  // cells already taken
  const placedBlocks = k.get("block", { recursive: true });
  const takenCells = placedBlocks.map((block) => {
    const worldPos = block.worldPos()!;
    return k.vec2(
      worldPos.x - (worldPos.x % tile_size),
      worldPos.y - (worldPos.y % tile_size)
    );
  });

  // return true if any of the already occupied cells 
  // would be overwritten by the new piece
  const isBlocked = newBlockCells.some((newCell) =>
    takenCells.some((occupiedCell) => newCell.eq(occupiedCell))
  );

  if (isBlocked) {
    console.log("ALREADY SOMETHING THERE, BYE");
    return;
  }

  // place tetromino
  const pieceParent = k.add([k.pos(originCell)]);
  newPiece.blocks.forEach((pos) => {
    pieceParent.add([
      k.rect(tile_size, tile_size),
      k.pos(pos),
      k.color(newPiece.color[0], newPiece.color[1], newPiece.color[2]),
      k.outline(2, k.rgb(0, 0, 0)),
      k.area(),
      "block",
    ]);
  });
}
