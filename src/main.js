import kaplay from "kaplay";
import { enableDragCamera } from "./camera";

const k = kaplay();

k.loadRoot("./");
k.loadSprite("bean", "sprites/bean.png");

k.add([k.pos(120, 80), k.sprite("bean")]);

k.onMousePress("right", () => addKaboom(k.toWorld(k.mousePos())));

enableDragCamera(k);
