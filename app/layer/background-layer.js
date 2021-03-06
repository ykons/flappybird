import { Background } from "../core/entities/background.js";

export class BackgroundLayer {
  constructor() {
    this.background = new Background();
  }
  render() {
    this.background.render();
  }
}
