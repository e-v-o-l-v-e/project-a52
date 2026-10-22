import { KAPLAYCtx } from "kaplay";

export let tile_size = 64;


export function infiniteGrid(k: KAPLAYCtx, size = tile_size, gridColor = null) {
  const color = gridColor || k.rgb(60, 60, 75);
  tile_size = size; // in case the use passes a different value

  k.onDraw(() => {
    // get camera informations
    const camPos = k.getCamPos();
    const camScale = k.getCamScale();

    // get screen size, so we don't draw in the void 
    // outside of the player's visible realm
    const screenWidth = k.width();
    const screenHeight = k.height();

    const worldLeft = camPos.x - (screenWidth / 2) / camScale.x;
    const worldRight = camPos.x + (screenWidth / 2) / camScale.x;
    const worldTop = camPos.y - (screenHeight / 2) / camScale.y;
    const worldBottom = camPos.y + (screenHeight / 2) / camScale.y;

    // only draw visible lines
    const startX = Math.floor(worldLeft / size) * size;
    const endX = Math.ceil(worldRight / size) * size;
    const startY = Math.floor(worldTop / size) * size;
    const endY = Math.ceil(worldBottom / size) * size;

    // vertical lines
    for (let x = startX; x <= endX; x += size) {
      k.drawLine({
        p1: k.vec2(x, worldTop),
        p2: k.vec2(x, worldBottom),
        width: 1 / camScale.x, // keep lines clean no mather the zoom level
        color: color,
      });
    }

    // horizontal lines
    for (let y = startY; y <= endY; y += size) {
      k.drawLine({
        p1: k.vec2(worldLeft, y),
        p2: k.vec2(worldRight, y),
        width: 1 / camScale.y,
        color: color,
      });
    }
  });
}
