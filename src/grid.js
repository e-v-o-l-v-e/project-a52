const GRID_SIZE = 64;

export function infiniteGrid(k, size = GRID_SIZE, gridColor = null) {
    const color = gridColor || k.rgb(60, 60, 75);

    return {
        id: "infiniteGrid",
        draw() {
            const topLeft = k.toWorld(k.vec2(0, 0));
            const bottomRight = k.toWorld(k.vec2(k.width(), k.height()));

            const startX = Math.floor(topLeft.x / size) * size;
            const endX = Math.ceil(bottomRight.x / size) * size;

            const startY = Math.floor(topLeft.y / size) * size;
            const endY = Math.ceil(bottomRight.y / size) * size;

            for (let x = startX; x <= endX; x += size) {
                k.drawLine({
                    p1: k.vec2(x, startY),
                    p2: k.vec2(x, endY),
                    width: 1,
                    color: color,
                });
            }

            for (let y = startY; y <= endY; y += size) {
                k.drawLine({
                    p1: k.vec2(startX, y),
                    p2: k.vec2(endX, y),
                    width: 1,
                    color: color,
                });
            }
        },
    };
}