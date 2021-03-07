import { gameState } from "../core/state/game-state.js";
import { BackgroundLayer } from "../layers/background-layer.js";
import { FloorLayer } from "../layers/floor-layer.js";
import { ObstacleLayer } from "../layers/obstacle-layer.js";
import { PlayerLayer } from "../layers/player-layer.js";
import { MetricsLayer } from "../layers/metrics-layer.js";
import { JumpCommand } from "../commands/jump-command.js";

export class PlayMode {
  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new ObstacleLayer(),
      new PlayerLayer(),
      new MetricsLayer(),
    ];
    this.commands = [];
    this.observers = [];
  }

  addObserver(mode) {
    this.observers.push(mode);
  }

  processInput(event) {
    this.commands.push(new JumpCommand(gameState, gameState.player));
  }

  update(deltaTime) {
    if (gameState.player.died) {
      this.observers.forEach((observer) => observer.notifyGameOver());
      return;
    }
    while (this.commands.length > 0) this.commands.shift().run();
    gameState.update(deltaTime);
  }

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
