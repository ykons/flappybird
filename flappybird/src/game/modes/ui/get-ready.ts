import { WORLD_WIDTH } from "../../utils/const";
import { Sprite } from "../../core/entities/sprite";

export class GetReady extends Sprite {
  constructor() {
    super();
    this.spriteX = 134;
    this.spriteY = 0;
    this.width = 174;
    this.height = 152;
    this.x = WORLD_WIDTH / 2 - 174 / 2;
    this.y = 100;
  }
}
