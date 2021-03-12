import {
  canvas,
  context as ctx,
  WORLD_WIDTH,
  WORLD_HEIGHT,
} from "./utils/const";
import { clock } from "./utils/clock";
import { GameListener } from "./core/interfaces/game-listener";
import { PlayMode } from "./modes/play-mode";
import { ReadyMode } from "./modes/ready-mode";
import { GameOverMode } from "./modes/gameover-mode";
import { GameMode } from "./modes/interfaces/game-mode";

class FlappyBird implements GameListener {
  private running: boolean;
  private activeMode: GameMode;
  constructor() {
    this.notifyGetReady();
    this.running = true;
  }

  notifyGetReady() {
    this.activeMode = new ReadyMode();
    this.activeMode.addObserver(this);
  }

  notifyNewGame() {
    this.activeMode = new PlayMode();
    this.activeMode.addObserver(this);
  }

  notifyGameOver() {
    this.activeMode = new GameOverMode();
    this.activeMode.addObserver(this);
  }

  processInput(event: Event) {
    this.activeMode.processInput(event);
  }

  clearCanvas() {
    ctx.fillStyle = "black"; // sky color
    ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
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
