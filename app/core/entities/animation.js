import { config, context as ctx, sprites } from "../../utils/const.js";

export class Animation {
  constructor(animationSpritesCoordinates, width, height, animationSpeed) {
    this.animationSpritesCoordinates = animationSpritesCoordinates;
    this.animationSpeed = animationSpeed;
    this.width = width;
    this.height = height;
    this.currentFrame = 0;
    this.frame = 0;
  }

  update() {
    if (this.frame == this.animationSpeed - 1)
      this.currentFrame =
        (this.currentFrame + 1) % this.animationSpritesCoordinates.length;
    this.frame = (this.frame + 1) % this.animationSpeed;
  }

  draw(x, y) {
    ctx.drawImage(
      sprites,
      this.animationSpritesCoordinates[this.currentFrame].x,
      this.animationSpritesCoordinates[this.currentFrame].y,
      this.width,
      this.height,
      x,
      y,
      this.width,
      this.height
    );
  }
}
