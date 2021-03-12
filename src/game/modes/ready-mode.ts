import { gameState } from "../core/state/game-state";
import { BackgroundLayer } from "../layers/background-layer";
import { FloorLayer } from "../layers/floor-layer";
import { Layer } from "../layers/layer";
import { PlayerLayer } from "../layers/player-layer";
import { GameMode } from "./game-mode";
import { GameModeObserver } from "./game-mode-observer";
import { GetReady } from "./ui/get-ready";

export class ReadyMode implements GameMode {
  layers: Array<Layer>;
  observers: Array<GameModeObserver>;
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

  addObserver(mode: GameModeObserver) {
    this.observers.push(mode);
  }

  processInput(event: Event) {
    this.observers.forEach((observer) => observer.notifyStartGame());
  }

  update(deltaTime: number) {
    gameState.floor.update(deltaTime);
    gameState.player.update(deltaTime);
  }

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
