import "./style.css";
import { game, canvas } from "../game/flappybird";

function component(canvas) {
  const element = document.createElement("div");
  canvas.className = "game-canvas";
  element.appendChild(canvas);
  return element;
}

document.body.appendChild(component(canvas));
