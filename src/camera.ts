import { KAPLAYCtx } from "kaplay";

export function enableDragCamera(k: KAPLAYCtx) {
  k.onUpdate(() => {
    if (k.isMouseDown("left")) {
      const delta = k.mouseDeltaPos();
      k.setCamPos(k.getCamPos().sub(delta));
    }
  });
}
