import { config, canvas, context as ctx, sprites } from "../../utils/const.js";
import { SpriteObject } from "./sprite-object.js";
import { gameState } from "../state/game-state.js";

export class FloorPipe extends SpriteObject {
  constructor(floorPipeHeight) {
    super();
    this.floorPipeHeight = floorPipeHeight;
    this.spriteX = 0;
    this.spriteY = 169;
    this.width = 52;
    this.height = floorPipeHeight;
    this.x = canvas.width;
    this.y = canvas.height - config.FLOOR_HEIGHT - floorPipeHeight;
    this.velocityX = config.VELOCITY_OBSTACLE;
    this.velocityY = 0;
  }
  isHidden() {
    return this.x + this.width < 0;
  }
  update(deltaTime) {
    if (!gameState.isPlaying()) return;
    this.x += this.velocityX * deltaTime;
  }
  render() {
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
