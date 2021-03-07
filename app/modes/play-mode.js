import { gameState } from "../core/state/game-state.js";
import { BackgroundLayer } from "../layers/background-layer.js";
import { FloorLayer } from "../layers/floor-layer.js";
import { ObstacleLayer } from "../layers/obstacle-layer.js";
import { PlayerLayer } from "../layers/player-layer.js";
import { MetricsLayer } from "../layers/metrics-layer.js";
import { JumpCommand } from "../commands/jump-command.js";
import { collisionDetection } from "../utils/utils.js";

export class PlayMode {
  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new ObstacleLayer(),
      new PlayerLayer(),
      new MetricsLayer(),
    ];
    this.player = gameState.player;
    this.commands = [];
    this.observers = [];
  }

  addObserver(mode) {
    this.observers.push(mode);
  }

  checkCollision(sprites) {
    let detected = false;
    sprites.forEach((obj) => {
      if (collisionDetection(this.player, obj)) {
        detected = true;
      }
    });
    return detected;
  }

  processInput(event) {
    this.commands.push(new JumpCommand(this.player));
  }

  update(deltaTime) {
    while (this.commands.length > 0) this.commands.shift().run();
    gameState.update(deltaTime);
    if (this.checkCollision([gameState.floor, ...gameState.obstacles])) {
      this.player.died = true;
      this.observers.forEach((observer) => observer.notifyGameOver());
    }
  }

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
