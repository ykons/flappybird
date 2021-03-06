import { config, canvas, context as ctx, sprites } from "../../utils/const.js";
import { GameObject } from "./game-object.js";
import { gameState } from "../state/game-state.js";

export class SkyPipe extends GameObject {
  constructor(floorPipeHeight) {
    super();
    this.floorPipeHeight = floorPipeHeight;
    this.spriteX = 52;
    this.spriteY =
      169 +
      400 -
      (canvas.height -
        config.FLOOR_HEIGHT -
        floorPipeHeight -
        config.PIPE_GAP_SPACE);
    this.width = 52;
    this.height =
      canvas.height -
      config.FLOOR_HEIGHT -
      floorPipeHeight -
      config.PIPE_GAP_SPACE;
    this.x = canvas.width;
    this.y = 0;
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
