import { Layer } from "../layers/layer";
import { GameModeObserver } from "./game-mode-observer";

export interface GameMode {
  layers: Array<Layer>;
  observers: Array<GameModeObserver>;

  addObserver(mode);

  processInput(event);

  update(deltaTime);

  render();
}
