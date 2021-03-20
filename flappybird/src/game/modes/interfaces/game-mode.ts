import { GameListener } from "../../core/interfaces/game-listener";

export interface GameMode {
  addGameListener(observer: GameListener): void;
  processInput(event: Event): void;
  update(deltaTime: number): void;
  render(): void;
}
