import { config, canvas } from "../../utils/const.js";
import { Background } from "../entities/background.js";
import { Floor } from "../entities/floor.js";
import { FloorPipe } from "../entities/floor-pipe.js";
import { SkyPipe } from "../entities/sky-pipe.js";
import { Player } from "../entities/player.js";
import { LiveScore } from "../../ui/live-score.js";
import { GameOverScreen } from "../../ui/game-over-screen.js";
import { GetReady } from "../../ui/get-ready.js";
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
    this.tickTime = 0;
    this.frame = 0;
    this.score = 0;
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.state = GameState.READY;
    this.layerBackground = [];
    this.layerObstacle = [];
    this.layerForward = [];
    this.layerGameOver = [];
    this.player = {};
    this.floor = {};
    this.liveScore = {};
  }
  restart() {
    this.player = new Player();
    this.floor = new Floor();
    this.liveScore = new LiveScore();
    this.tickTime = 0;
    this.frame = 0;
    this.score = 0;
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.state = GameState.READY;
    this.layerBackground = [new Background()];
    this.layerObstacle = [];
    this.layerPlayer = [this.player];
    this.layerForward = [this.floor];
    this.layerGameOver = [new GameOverScreen()];
    this.layerGameStart = [new GetReady()];
  }
  tick(timestamp) {
    const delta = timestamp - this.tickTime;
    this.deltaTime = delta / 1000;
    this.tickTime = timestamp;
    this.elapsedTime += delta;
    this.frame++;
  }
  update() {
    if (this.isPlaying()) {
      this.removeOldObstacle();
      this.createNewObstacle();
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
    let _sprites = [
      ...this.layerBackground,
      ...this.layerObstacle,
      ...this.layerPlayer,
      ...this.layerForward,
    ];
    if (this.isPlaying()) _sprites.push(this.liveScore);
    if (this.isGameOver()) _sprites = [..._sprites, ...this.layerGameOver];
    if (this.isReady()) _sprites = [..._sprites, ...this.layerGameStart];
    return _sprites;
  }
  removeOldObstacle() {
    this.layerObstacle = this.layerObstacle.filter((sprite) => {
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
      this.layerObstacle.push(...this.createPairOfPipes());
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
