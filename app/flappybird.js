import { gameState } from "./core/state/game-state.js";
import { PlayMode } from "./mode/playmode.js";

class FlappyBird {
  constructor() {
    this.playMode = new PlayMode();
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
    }
  }
}

game = new FlappyBird();

function gameLoop(timestamp) {
  game.run(timestamp);
  window.requestAnimationFrame(gameLoop);
}

gameLoop(performance.now());
