import { BackgroundLayer } from "../layer/background-layer.js";
import { FloorLayer } from "../layer/floor-layer.js";
import { ObstacleLayer } from "../layer/obstacle-layer.js";
import { PlayerLayer } from "../layer/player-layer.js";
import { GameOver } from "./ui/game-over.js";

export class GameOverMode {
  constructor(score) {
    this.score = score;
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new ObstacleLayer(),
      new PlayerLayer(),
      new GameOver(score),
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
