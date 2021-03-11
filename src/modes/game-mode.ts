import { GameModeObserver } from "./game-mode-observer";

export interface GameMode {
  layers: Array<any>;
  observers: Array<GameModeObserver>;

  addObserver(mode);

  processInput(event);

  update(deltaTime);

  render();
}
