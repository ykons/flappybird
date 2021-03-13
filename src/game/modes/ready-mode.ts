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
  gameListeners: Array<GameListener>;
  constructor() {
    gameState.restart();
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new PlayerLayer(),
      new GetReady(),
    ];
    this.gameListeners = [];
  }

  addGameListener(observer: GameListener) {
    this.gameListeners.push(observer);
  }

  processInput(event: Event) {
    this.gameListeners.forEach((observer) => observer.requestStartGame());
  }

  updatePlayers(deltaTime: number) {
    gameState.players.forEach((player) => player.update(deltaTime));
  }

  update(deltaTime: number) {
    gameState.floor.update(deltaTime);
    this.updatePlayers(deltaTime);
  }

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
