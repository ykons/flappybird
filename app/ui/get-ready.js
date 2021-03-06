import { canvas } from "../utils/const.js";
import { SpriteObject } from "../core/entities/sprite-object.js";

export class GetReady extends SpriteObject {
  constructor() {
    super();
    this.spriteX = 134;
    this.spriteY = 0;
    this.width = 174;
    this.height = 152;
    this.x = canvas.width / 2 - 174 / 2;
    this.y = 100;
  }
}
