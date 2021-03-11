import { Background } from "../core/entities/background";

export class BackgroundLayer {
  private background: Background;
  constructor() {
    this.background = new Background();
  }

  render() {
    this.background.render();
  }
}
