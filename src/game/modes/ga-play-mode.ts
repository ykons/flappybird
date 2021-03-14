import { config, WORLD_WIDTH } from "../utils/const";
import { gameState } from "../core/state/game-state";
import { collisionDetection } from "../utils/utils";
import { Bird } from "../core/entities/bird";
import { SmartBird } from "../core/entities/smart-bird";
import { FloorPipe } from "../core/entities/floor-pipe";
import { SensorsListener } from "../core/interfaces/sensors-listener";
import { GeneticAlgorithm } from "../ai/genetic-algorithm";
import { PlayMode } from "./play-mode";

export class GAPlayMode extends PlayMode {
  sensorsListeners: Array<SensorsListener>;
  private ga: GeneticAlgorithm;
  private theBestPlayer: SmartBird;
  constructor() {
    super();
    gameState.players.length = 0;
    this.ga = new GeneticAlgorithm(10);
    this.sensorsListeners = [];
    this.runNextGeneration();
  }

  addSensorsListener(observer: SensorsListener) {
    this.sensorsListeners.push(observer);
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

  processInput(event: Event) {}

  checkCollision(player: SmartBird | Bird) {
    const obstacles = [gameState.floor, ...gameState.obstacles];
    obstacles.forEach((obj) => {
      if (collisionDetection(player, obj)) {
        player.died = true;
        if (player instanceof SmartBird) player.fitness -= 60;
      }
    });
  }

  removeDiedPlayers() {
    gameState.players = gameState.players.filter((player) => {
      return !player.died;
    });
  }

  checkGameOver() {
    const alives = gameState.players.filter((player) => {
      return !player.died;
    });
    if (alives.length === 0) {
      // this.notifyGameOverListeners();
      return true;
    }
    return false;
  }

  runNextGeneration() {
    const players = gameState.players as Array<SmartBird>;
    const winner = players.reduce((acc, curVal) => {
      return curVal.fitness > acc.fitness ? curVal : acc;
    }, new SmartBird());
    if (!this.theBestPlayer || winner.fitness > this.theBestPlayer.fitness)
      this.theBestPlayer = winner;
    gameState.players = this.ga.createNextGeneration(this.theBestPlayer);
    gameState.players.forEach((player) => {
      this.addSensorsListener(player as SmartBird);
      player.startFly();
    });
    gameState.restart();
  }

  update(deltaTime: number) {
    if (this.checkGameOver()) {
      this.runNextGeneration();
      return;
    }
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
}
