import { gameState } from "./core/state/game-state.js";
import { PlayMode } from "./mode/play-mode.js";
import { ReadyMode } from "./mode/ready-mode.js";

class FlappyBird {
  constructor() {
    this.playMode = new PlayMode();
    this.stateMode = new ReadyMode();
    this.mode = gameState.READY;
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
      // overlay
      if (gameState.isReady()) {
        this.stateMode.update(this.deltaTime);
        this.stateMode.render();
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
