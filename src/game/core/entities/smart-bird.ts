import { NeuralNetwork } from "../../ai/neural-network";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../../utils/const";
import { SensorsListener } from "../interfaces/sensors-listener";
import { Bird } from "./bird";

export class SmartBird extends Bird implements SensorsListener {
  nextPipeGapXPosition: number;
  nextPipeGapYPosition: number;
  constructor(private brain?: NeuralNetwork) {
    super();
    if (!this.brain) {
      this.brain = new NeuralNetwork(3, 4, 2);
    }
  }

  restart() {
    this.brain = new NeuralNetwork(3, 4, 2);
    super.restart();
  }

  notifyNextPipeGap(x: number, y: number) {
    this.nextPipeGapXPosition = x;
    this.nextPipeGapYPosition = y;
  }

  think() {
    if (this.gliding) return;
    const sensors = [
      this.y / WORLD_HEIGHT,
      this.nextPipeGapXPosition / WORLD_WIDTH,
      this.nextPipeGapYPosition / WORLD_HEIGHT,
    ];
    const [jumpProb, noJumpProb] = this.brain.predict(sensors);
    if (jumpProb > noJumpProb) this.jump();
  }

  update(deltaTime: number) {
    this.think();
    super.update(deltaTime);
  }
}
