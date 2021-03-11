import { Layer } from "./layer";
import { Background } from "../core/entities/background";

export class BackgroundLayer implements Layer {
  private background: Background;
  constructor() {
    this.background = new Background();
  }

  render() {
    this.background.render();
  }
}
