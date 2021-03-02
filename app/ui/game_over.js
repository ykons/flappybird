import { GameObject } from "../core/models/game_object.js";

export class GameOver extends GameObject {
  constructor() {
    super();
    this.spriteX = 134;
    this.spriteY = 153;
    this.width = 226;
    this.height = 200;
  }
}
