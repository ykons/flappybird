import { config } from "../utils/const";
import { getRndInteger } from "../utils/utils";
import { clock } from "../utils/clock";
import { gameState } from "../core/state/game-state";
import { BackgroundLayer } from "../layers/background-layer";
import { FloorLayer } from "../layers/floor-layer";
import { ObstacleLayer } from "../layers/obstacle-layer";
import { PlayerLayer } from "../layers/player-layer";
import { MetricsLayer } from "../layers/metrics-layer";
import { JumpCommand } from "../commands/jump-command";
import { collisionDetection } from "../utils/utils";
import { SmartBird } from "../core/entities/smart-bird";
import { GameMode } from "./interfaces/game-mode";
import { GameListener } from "../core/interfaces/game-listener";
import { Layer } from "../layers/interfaces/layer";
import { FloorPipe } from "../core/entities/floor-pipe";
import { SkyPipe } from "../core/entities/sky-pipe";
import { Bird } from "../core/entities/bird";

export class PlayMode implements GameMode {
  layers: Array<Layer>;
  gameListeners: Array<GameListener>;
  commands: Array<any>;
  private player: Bird;
  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new ObstacleLayer(),
      new PlayerLayer(),
      new MetricsLayer(),
    ];
    this.player = gameState.players[0];
    this.commands = [];
    this.gameListeners = [];
    this.player.startFly();
  }

  addGameListener(observer: GameListener) {
    this.gameListeners.push(observer);
  }

  removeOldObstacle() {
    gameState.obstacles = gameState.obstacles.filter((sprite) => {
      return !sprite.isHidden();
    });
  }

  createPairOfPipes() {
    const floorPipeHeight = getRndInteger(
      config.PIPE_FLOOR_HEIGHT_MIN,
      config.PIPE_FLOOR_HEIGHT_MAX
    );
    return [new SkyPipe(floorPipeHeight), new FloorPipe(floorPipeHeight)];
  }

  createNewObstacle() {
    if (clock.frame % config.TIME_NEW_OBSTACLE == 0) {
      gameState.obstacles.push(...this.createPairOfPipes());
    }
  }

  processInput(event: Event) {
    this.commands.push(new JumpCommand(this.player));
  }

  checkCollision(player: SmartBird | Bird) {
    const obstacles = [gameState.floor, ...gameState.obstacles];
    obstacles.forEach((obj) => {
      if (collisionDetection(player, obj)) {
        player.died = true;
        if (player instanceof SmartBird) player.fitness -= 60;
      }
    });
  }

  notifyGameOverListeners() {
    this.gameListeners.forEach((observer) => observer.notifyGameOver());
  }

  checkGameOver() {
    if (this.player.died) {
      this.notifyGameOverListeners();
      return true;
    }
    return false;
  }

  update(deltaTime: number) {
    if (this.checkGameOver()) {
      return;
    }
    while (this.commands.length > 0) this.commands.shift().run();
    this.removeOldObstacle();
    this.createNewObstacle();
    gameState.floor.update(deltaTime);
    gameState.obstacles.forEach((obstacle) => obstacle.update(deltaTime));
    this.player.update(deltaTime);
    this.checkCollision(this.player);
  }

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
