import { gameState } from "./core/state/game-state.js";
import { PlayMode } from "./mode/play-mode.js";
import { ReadyMode } from "./mode/ready-mode.js";
import { GameOverMode } from "./mode/gameover-mode.js";
import { clock } from "./utils/clock.js";

class FlappyBird {
  constructor() {
    this.playMode = new PlayMode();
    this.readyMode = new ReadyMode();
    this.gameOverMode = new GameOverMode();
    this.running = true;
  }

  run(timestamp) {
    if (this.running) {
      clock.tick(timestamp);
      this.playMode.update(clock.deltaTime);
      this.playMode.render();
      // overlays
      if (gameState.isReady()) {
        this.readyMode.update(clock.deltaTime);
        this.readyMode.render();
      }
      if (gameState.isGameOver()) {
        this.gameOverMode.update(clock.deltaTime);
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
