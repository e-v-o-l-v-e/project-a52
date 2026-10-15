import { KAPLAYCtx, Vec2 } from "kaplay";

export function enableDragCamera(k: KAPLAYCtx) {
  k.setCamScale(1.5);

  k.onUpdate(() => {
    if (k.isMouseDown("left")) {
      const delta = k.mouseDeltaPos();
      console.debug("cam: moving from " + k.getCamPos());
      k.setCamPos(k.getCamPos().sub(delta.scale(1 / k.getCamScale().y)));
    }
  });

  // zoom control
  k.onScroll((delta) => {
    const currentZoom = k.getCamScale();
    const newZoom = k.getCamScale().add(delta.y / (k.getCamScale().y > 1 ? 300 : 3000));

    console.debug("cam: zooming from " + currentZoom + " to " + newZoom + " via a delta of " + delta.y);

    if (newZoom.y > 0.35 && newZoom.y < 3.5) k.setCamScale(newZoom);
  });
}
