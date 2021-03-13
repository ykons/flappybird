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