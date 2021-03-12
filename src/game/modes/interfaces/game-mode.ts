import { Layer } from "../../layers/interfaces/layer";
import { GameListener } from "../../core/interfaces/game-listener";

export interface GameMode {
  layers: Array<Layer>;
  observers: Array<GameListener>;

  addObserver(observer: GameListener): void;

  processInput(event: Event): void;

  update(deltaTime: number): void;

  render(): void;
}
