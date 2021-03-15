import { Sprite } from "../core/entities/sprite";

export function collisionDetection(obj1: Sprite, obj2: Sprite) {
  if (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  ) {
    return true;
  }
  return false;
}

export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomGaussian() {
  let y1, x1, x2, w;
  do {
    x1 = Math.random() * 2 - 1;
    x2 = Math.random() * 2 - 1;
    w = x1 * x1 + x2 * x2;
  } while (w >= 1);
  w = Math.sqrt((-2 * Math.log(w)) / w);
  y1 = x1 * w;

  return y1;
}
