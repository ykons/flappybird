import { GameOverScreen } from "../ui/game-over-screen.js";

export class GameOverMode {
  constructor() {
    this.objects = [new GameOverScreen()];
  }

  update(deltaTime) {}

  render() {
    this.objects.forEach((sprite) => sprite.render());
  }
}
