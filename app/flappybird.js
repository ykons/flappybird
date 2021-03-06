import { gameState } from "./core/state/game-state.js";
import { PlayMode } from "./mode/play-mode.js";
import { ReadyMode } from "./mode/ready-mode.js";
import { GameOverMode } from "./mode/gameover-mode.js";

class FlappyBird {
  constructor() {
    this.playMode = new PlayMode();
    this.readyMode = new ReadyMode();
    this.gameOverMode = new GameOverMode();
    this.running = true;
    this.deltaTime = 0;
    this.tickTime = 0;
    this.elapsedTime = 0;
    this.frame = 0;
  }

  tick(timestamp) {
    const delta = timestamp - this.tickTime;
    this.deltaTime = delta / 1000;
    this.tickTime = timestamp;
    this.elapsedTime += delta;
    this.frame++;
  }

  run(timestamp) {
    if (this.running) {
      this.tick(timestamp);
      gameState.tick(timestamp);
      this.playMode.update(this.deltaTime);
      this.playMode.render();
      // overlays
      if (gameState.isReady()) {
        this.readyMode.update(this.deltaTime);
        this.readyMode.render();
      }
      if (gameState.isGameOver()) {
        this.gameOverMode.update(this.deltaTime);
        this.gameOverMode.render();
      }
    }
  }
}

game = new FlappyBird();

function gameLoop(timestamp) {
  game.run(timestamp);
  window.requestAnimationFrame(gameLoop);
}
gameLoop(performance.now());
