import { config, canvas } from "../../utils/const.js";
import { Floor } from "../entities/floor.js";
import { FloorPipe } from "../entities/floor-pipe.js";
import { SkyPipe } from "../entities/sky-pipe.js";
import { Player } from "../entities/player.js";
import { getRndInteger } from "../../utils/utils.js";

class GameState {
  static get READY() {
    return "ready";
  }
  static get PLAYING() {
    return "playing";
  }
  static get GAMEOVER() {
    return "gameover";
  }
  constructor() {
    this.frame = 0;
    this.score = 0;
    this.state = GameState.READY;
    this.obstacles = [];
    this.player = {};
    this.floor = {};
  }
  restart() {
    this.player = new Player();
    this.floor = new Floor();
    this.frame = 0;
    this.score = 0;
    this.state = GameState.READY;
    this.obstacles = [];
    this.layerPlayer = [this.player];
  }
  tick(timestamp) {
    this.frame++;
  }
  update(deltaTime) {
    if (this.isPlaying()) {
      this.removeOldObstacle();
      this.createNewObstacle();
      this.floor.update(deltaTime);
      this.obstacles.forEach((obstacle) => obstacle.update(deltaTime));
    }
  }
  isReady() {
    return this.state === GameState.READY;
  }
  play() {
    this.state = GameState.PLAYING;
  }
  isPlaying() {
    return this.state === GameState.PLAYING;
  }
  gameOver() {
    this.state = GameState.GAMEOVER;
  }
  isGameOver() {
    return this.state === GameState.GAMEOVER;
  }
  getSprites() {
    let _sprites = [...this.layerPlayer];
    return _sprites;
  }
  removeOldObstacle() {
    this.obstacles = this.obstacles.filter((sprite) => {
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
    if (this.frame % config.TIME_NEW_OBSTACLE == 0) {
      this.obstacles.push(...this.createPairOfPipes());
    }
  }
}

const gameState = new GameState();

canvas.addEventListener("mousedown", (e) => {
  if (gameState.state == GameState.READY) gameState.play();
  if (gameState.state == GameState.PLAYING) gameState.player.jump();
  if (gameState.state == GameState.GAMEOVER) gameState.restart();
});

export { gameState };
