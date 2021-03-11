import { gameState } from "../core/state/game-state";
import { BackgroundLayer } from "../layers/background-layer";
import { FloorLayer } from "../layers/floor-layer";
import { PlayerLayer } from "../layers/player-layer";
import { GetReady } from "./ui/get-ready";

export class ReadyMode {
  private layers: Array<any>;
  private observers: Array<any>;
  constructor() {
    gameState.restart();
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new PlayerLayer(),
      new GetReady(),
    ];
    this.observers = [];
  }

  addObserver(mode) {
    this.observers.push(mode);
  }

  processInput(event) {
    this.observers.forEach((observer) => observer.notifyStartGame());
  }

  update(deltaTime) {
    gameState.floor.update(deltaTime);
    gameState.player.update(deltaTime);
  }

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
