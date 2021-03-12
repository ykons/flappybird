import { context as ctx, sprites } from "../../utils/const";

export class Animation {
  private currentFrame: number;
  private frame: number;

  constructor(
    private readonly animationSpritesCoordinates,
    private readonly width: number,
    private readonly height: number,
    private readonly animationSpeed: number,
    private rotate: number = 0
  ) {
    this.currentFrame = 0;
    this.frame = 0;
  }

  update(rotate: number) {
    this.rotate = rotate;
    if (this.frame == this.animationSpeed - 1)
      this.currentFrame =
        (this.currentFrame + 1) % this.animationSpritesCoordinates.length;
    this.frame = (this.frame + 1) % this.animationSpeed;
  }

  draw(x: number, y: number) {
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
