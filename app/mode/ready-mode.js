import { GetReady } from "../ui/get-ready.js";

export class ReadyMode {
  constructor() {
    this.objects = [new GetReady()];
  }

  update(deltaTime) {}

  render() {
    this.objects.forEach((sprite) => sprite.render());
  }
}
