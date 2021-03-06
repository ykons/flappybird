import { GameOver } from "../ui/game-over.js";

export class GameOverMode {
  constructor() {
    this.objects = [new GameOver()];
  }

  update(deltaTime) {}

  render() {
    this.objects.forEach((sprite) => sprite.render());
  }
}
