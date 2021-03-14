import { NeuralNetwork } from "../../ai/neural-network";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../../utils/const";
import { SensorsListener } from "../interfaces/sensors-listener";
import { Bird } from "./bird";
import { Sequential } from "@tensorflow/tfjs";

export class SmartBird extends Bird implements SensorsListener {
  nextPipeGapXPosition: number;
  nextPipeGapYPosition: number;
  fitness: number;
  constructor(public brain?: NeuralNetwork) {
    super();
    if (!this.brain || !(this.brain instanceof Sequential)) {
      this.brain = new NeuralNetwork(2, 2, 1);
    }
    this.fitness = 0;
  }

  notifyNextPipeGap(x: number, y: number) {
    this.nextPipeGapXPosition = x;
    this.nextPipeGapYPosition = y;
  }

  think() {
    if (this.gliding) return;
    const sensors = [
      this.nextPipeGapXPosition - this.x,
      this.nextPipeGapYPosition - this.y,
    ];
    const [jumpProb] = this.brain.predict(sensors);
    if (jumpProb > 0) this.jump();
  }

  update(deltaTime: number) {
    this.fitness++;
    this.think();
    super.update(deltaTime);
  }
}
