import { config, context as ctx, sprites } from "../../utils/const.js";

export class Animation {
  constructor(
    animationSpritesCoordinates,
    width,
    height,
    animationSpeed,
    rotate = 0
  ) {
    this.animationSpritesCoordinates = animationSpritesCoordinates;
    this.animationSpeed = animationSpeed;
    this.width = width;
    this.height = height;
    this.rotate = rotate;
    this.currentFrame = 0;
    this.frame = 0;
  }

  update(rotate) {
    this.rotate = rotate;
    if (this.frame == this.animationSpeed - 1)
      this.currentFrame =
        (this.currentFrame + 1) % this.animationSpritesCoordinates.length;
    this.frame = (this.frame + 1) % this.animationSpeed;
  }

  draw(x, y) {
    const spriteCenterX = x + this.width / 2;
    const spriteCenterY = y + this.height / 2;

    ctx.save();
    ctx.translate(spriteCenterX, spriteCenterY);
    ctx.rotate((this.rotate * Math.PI) / 180);
    ctx.translate(-1 * spriteCenterX, -1 * spriteCenterY);
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
    ctx.restore();
  }
}
