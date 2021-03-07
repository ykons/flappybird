import { canvas, context as ctx } from "./utils/const.js";
import { clock } from "./utils/clock.js";
import { gameState } from "./core/state/game-state.js";
import { GameModeObserver } from "./modes/game-mode-observer.js";
import { PlayMode } from "./modes/play-mode.js";
import { ReadyMode } from "./modes/ready-mode.js";
import { GameOverMode } from "./modes/gameover-mode.js";

class FlappyBird extends GameModeObserver {
  constructor() {
    super();
    this.notifyGetReady();
    this.running = true;
  }

  notifyGetReady() {
    gameState.restart();
    this.activeMode = new ReadyMode();
    this.activeMode.addObserver(this);
  }

  notifyStartGame() {
    this.activeMode = new PlayMode();
    this.activeMode.addObserver(this);
  }

  notifyGameOver() {
    this.activeMode = new GameOverMode(gameState.player.score);
    this.activeMode.addObserver(this);
  }

  processInput(event) {
    this.activeMode.processInput(event);
  }

  clearCanvas() {
    ctx.fillStyle = "black"; // sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  run(timestamp) {
    if (this.running) {
      clock.tick(timestamp);
      this.clearCanvas();
      this.activeMode.update(clock.deltaTime);
      this.activeMode.render();
    }
  }
}

game = new FlappyBird();

canvas.addEventListener("mousedown", (event) => {
  if (!event.isTrusted) return;
  event.preventDefault();
  game.processInput(event);
});

function gameLoop(timestamp) {
  game.run(timestamp);
  window.requestAnimationFrame(gameLoop);
}

gameLoop(performance.now());
