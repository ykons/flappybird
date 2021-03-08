import { gameState } from "../core/state/game-state.js";
import { BackgroundLayer } from "../layers/background-layer.js";
import { FloorLayer } from "../layers/floor-layer.js";
import { ObstacleLayer } from "../layers/obstacle-layer.js";
import { PlayerLayer } from "../layers/player-layer.js";
import { GameOver } from "./ui/game-over.js";

export class GameOverMode {
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
