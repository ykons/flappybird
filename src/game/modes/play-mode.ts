import { config, WORLD_WIDTH } from "../utils/const";
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
import { SensorsListener } from "../core/interfaces/sensors-listener";

export class PlayMode implements GameMode {
  layers: Array<Layer>;
  gameListeners: Array<GameListener>;
  sensorsListeners: Array<SensorsListener>;
  private commands: Array<any>;
  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new ObstacleLayer(),
      new PlayerLayer(),
      new MetricsLayer(),
    ];
    this.commands = [];
    this.gameListeners = [];
    this.sensorsListeners = [];
    gameState.players.forEach((player) => this.addSensorsListener(player));
    this.startFly();
  }

  addGameListener(observer: GameListener) {
    this.gameListeners.push(observer);
  }

  addSensorsListener(observer: SensorsListener) {
    this.sensorsListeners.push(observer);
  }

  startFly() {
    gameState.players.forEach((player) => player.startFly());
  }

  getNextPipeGapAhead(): Array<number> {
    let x = WORLD_WIDTH;
    let y = 0;
    gameState.obstacles.forEach((obstacle) => {
      if (
        obstacle instanceof FloorPipe &&
        obstacle.x + obstacle.width >
          gameState.players[0].x + gameState.players[0].width &&
        obstacle.x < x
      ) {
        [x, y] = [obstacle.x, obstacle.y];
      }
    });
    return [x, y - config.PIPES_GAP_SPACE / 2];
  }

  notifyNextPipeGapListeners() {
    const [gapX, gapY] = this.getNextPipeGapAhead();
    this.sensorsListeners.forEach((observer) =>
      observer.notifyNextPipeGap(gapX, gapY)
    );
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
    gameState.players.forEach((player) =>
      this.commands.push(new JumpCommand(player))
    );
  }

  checkCollision(player: SmartBird) {
    const obstacles = [gameState.floor, ...gameState.obstacles];
    obstacles.forEach((obj) => {
      if (collisionDetection(player, obj)) {
        player.died = true;
      }
    });
  }

  notifyGameOverListeners() {
    this.gameListeners.forEach((observer) => observer.notifyGameOver());
  }

  removeDiedPlayers() {
    gameState.players = gameState.players.filter((player) => {
      return !player.died;
    });
  }

  checkGameOver() {
    this.removeDiedPlayers();
    if (gameState.players.length === 0) {
      this.notifyGameOverListeners();
      return true;
    }
    return false;
  }

  update(deltaTime: number) {
    if (this.checkGameOver()) return;
    while (this.commands.length > 0) this.commands.shift().run();
    this.removeOldObstacle();
    this.createNewObstacle();
    gameState.floor.update(deltaTime);
    gameState.obstacles.forEach((obstacle) => obstacle.update(deltaTime));
    gameState.players.forEach((player) => {
      player.update(deltaTime);
      this.checkCollision(player);
    });
    this.notifyNextPipeGapListeners();
  }

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
