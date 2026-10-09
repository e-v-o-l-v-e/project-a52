import kaplay from "kaplay";

const k = kaplay();

export function enableDragCamera() {
  let isDragging = false;

  k.onMousePress("left", () => {
    isDragging = true;
  });

  k.onMouseRelease("left", () => {
    isDragging = false;
  });

  k.onMouseMove(() => {
    if (!isDragging) return;
    const delta = k.mouseDeltaPos();
    k.setCamPos(k.getCamPos().sub(delta));
  });
}
