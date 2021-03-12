import { gameState } from "../core/state/game-state";
import { BackgroundLayer } from "../layers/background-layer";
import { FloorLayer } from "../layers/floor-layer";
import { ObstacleLayer } from "../layers/obstacle-layer";
import { PlayerLayer } from "../layers/player-layer";
import { MetricsLayer } from "../layers/metrics-layer";
import { JumpCommand } from "../commands/jump-command";
import { collisionDetection } from "../utils/utils";
import { Bird } from "../core/entities/bird";
import { GameMode } from "./interfaces/game-mode";
import { GameListener } from "../core/interfaces/game-listener";
import { Layer } from "../layers/interfaces/layer";
import { SpriteObject } from "../core/entities/sprite-object";

export class PlayMode implements GameMode {
  layers: Array<Layer>;
  observers: Array<GameListener>;
  private player: Bird;
  private commands: Array<any>;
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
    gameState.player.startFly();
  }

  addObserver(observer: GameListener) {
    this.observers.push(observer);
  }

  checkCollision(sprites: Array<SpriteObject>) {
    let detected = false;
    sprites.forEach((obj) => {
      if (collisionDetection(this.player, obj)) {
        detected = true;
      }
    });
    return detected;
  }

  processInput(event: Event) {
    this.commands.push(new JumpCommand(this.player));
  }

  update(deltaTime: number) {
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
