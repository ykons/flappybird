import { gameState } from "../core/state/game-state";
import { BackgroundLayer } from "../layers/background-layer";
import { FloorLayer } from "../layers/floor-layer";
import { ObstacleLayer } from "../layers/obstacle-layer";
import { PlayerLayer } from "../layers/player-layer";
import { GameMode } from "./game-mode";
import { GameModeObserver } from "./game-mode-observer";
import { GameOver } from "./ui/game-over";

export class GameOverMode implements GameMode {
  layers: Array<any>;
  observers: Array<GameModeObserver>;
  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new ObstacleLayer(),
      new PlayerLayer(),
      new GameOver(gameState.player.score, gameState.player.bestScore),
    ];
    this.observers = [];
  }

  addObserver(mode) {
    this.observers.push(mode);
  }

  processInput(event) {
    this.observers.forEach((observer) => observer.notifyGetReady());
  }

  update(deltaTime) {}

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
