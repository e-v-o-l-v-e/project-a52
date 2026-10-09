import kaplay from "kaplay";
import { enableDragCamera } from "./camera";

const k = kaplay();

k.loadRoot("./");
k.loadSprite("bean", "sprites/bean.png");

k.add([k.pos(120, 80), k.sprite("bean")]);

k.onClick(() => k.addKaboom(k.mousePos()));

// start game
enableDragCamera();
