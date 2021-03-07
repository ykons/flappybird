import { gameState } from "../core/state/game-state.js";
import { BackgroundLayer } from "../layer/background-layer.js";
import { FloorLayer } from "../layer/floor-layer.js";
import { ObstacleLayer } from "../layer/obstacle-layer.js";
import { PlayerLayer } from "../layer/player-layer.js";
import { MetricsLayer } from "../layer/metrics-layer.js";
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
