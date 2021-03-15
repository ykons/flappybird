import {
  canvas,
  context as ctx,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "./utils/const";
import { clock } from "./utils/clock";
import { GameListener } from "./core/interfaces/game-listener";
import { PlayMode } from "./modes/play-mode";
import { GAPlayMode } from "./modes/ga-play-mode";
import { ReadyMode } from "./modes/ready-mode";
import { GameOverMode } from "./modes/gameover-mode";
import { GameMode } from "./modes/interfaces/game-mode";

class FlappyBird implements GameListener {
  private running: boolean;
  private activeMode: GameMode;
  constructor() {
    this.requestNewGame();
    this.running = true;
  }

  requestNewGame() {
    this.activeMode = new ReadyMode();
    this.activeMode.addGameListener(this);
  }

  requestStartGame() {
    this.activeMode = new GAPlayMode();
    this.activeMode.addGameListener(this);
  }

  notifyGameOver() {
    this.activeMode = new GameOverMode();
    this.activeMode.addGameListener(this);
  }

  processInput(event: Event) {
    this.activeMode.processInput(event);
  }

  clearCanvas() {
    ctx.fillStyle = "black"; // sky color
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  run(timestamp: number) {
    if (this.running) {
      clock.tick(timestamp);
      this.clearCanvas();
      this.activeMode.update(clock.deltaTime);
      this.activeMode.render();
    }
  }
}

const game = new FlappyBird();

canvas.addEventListener("mousedown", (event: Event) => {
  if (!event.isTrusted) return;
  event.preventDefault();
  game.processInput(event);
});

function gameLoop(timestamp: number) {
  game.run(timestamp);
  window.requestAnimationFrame(gameLoop);
}

gameLoop(performance.now());

export { game, canvas };
