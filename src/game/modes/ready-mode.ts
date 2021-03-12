import { gameState } from "../core/state/game-state";
import { BackgroundLayer } from "../layers/background-layer";
import { FloorLayer } from "../layers/floor-layer";
import { Layer } from "../layers/interfaces/layer";
import { PlayerLayer } from "../layers/player-layer";
import { GameMode } from "./interfaces/game-mode";
import { GameListener } from "../core/interfaces/game-listener";
import { GetReady } from "./ui/get-ready";

export class ReadyMode implements GameMode {
  layers: Array<Layer>;
  observers: Array<GameListener>;
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

  addObserver(observer: GameListener) {
    this.observers.push(observer);
  }

  processInput(event: Event) {
    this.observers.forEach((observer) => observer.requestStartGame());
  }

  update(deltaTime: number) {
    gameState.floor.update(deltaTime);
    gameState.player.update(deltaTime);
  }

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
