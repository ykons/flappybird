import { gameState } from "../core/state/game-state";
import { BackgroundLayer } from "../layers/background-layer";
import { FloorLayer } from "../layers/floor-layer";
import { Layer } from "../layers/interfaces/layer";
import { ObstacleLayer } from "../layers/obstacle-layer";
import { PlayerLayer } from "../layers/player-layer";
import { GameMode } from "./interfaces/game-mode";
import { GameListener } from "../core/interfaces/game-listener";
import { GameOver } from "./ui/game-over";

export class GameOverMode implements GameMode {
  layers: Array<Layer>;
  gameListeners: Array<GameListener>;
  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new ObstacleLayer(),
      new PlayerLayer(),
      new GameOver(gameState.getScore(), gameState.getBestScore()),
    ];
    this.gameListeners = [];
  }

  addGameListener(observer: GameListener) {
    this.gameListeners.push(observer);
  }

  processInput(event: Event) {
    this.gameListeners.forEach((observer) => observer.requestNewGame());
  }

  update(deltaTime: number) {}

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
