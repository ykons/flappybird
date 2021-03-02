import { canvas } from "../utils/const.js";
import { GameObject } from "../core/models/game_object.js";

export class GetReady extends GameObject {
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
