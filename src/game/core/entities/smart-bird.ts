import * as tf from "@tensorflow/tfjs";
import { gameState } from "../state/game-state";
import { randomGaussian } from "../../utils/utils";
import { Bird } from "./bird";
import { NeuralNetwork } from "../../ai/neural-network";
import { SensorsListener } from "../interfaces/sensors-listener";

export class SmartBird extends Bird implements SensorsListener {
  brain: NeuralNetwork;
  nextPipeGapXPosition: number;
  nextPipeGapYPosition: number;
  fitness: number;
  parents: { id: number; score: number }[];
  constructor(public id: number = 0) {
    super();
    this.brain = new NeuralNetwork(2, 2, 1);
    this.fitness = 0;
  }

  restart() {}

  boundaryCheck() {
    if (this.y < 0) {
      this.died = true;
      this.y = 0;
      this.velocityY = 0;
    }
  }

  notifyNextPipeGap(x: number, y: number) {
    this.nextPipeGapXPosition = x;
    this.nextPipeGapYPosition = y;
  }

  clone() {
    let newBird = new SmartBird(this.id);
    newBird.brain.dispose();
    newBird.brain = this.brain.clone();
    return newBird;
  }

  dispose() {
    this.brain.dispose();
  }

  mutate() {
    function fn(x) {
      if (Math.random() < 0.05) {
        let offset = randomGaussian() * 0.5;
        let newX = x + offset;
        return newX;
      }
      return x;
    }

    let ih = this.brain.inputWeights.dataSync().map(fn);
    let ihShape = this.brain.inputWeights.shape;
    this.brain.inputWeights.dispose();
    this.brain.inputWeights = tf.tensor(ih, ihShape);

    let ho = this.brain.outputWeights.dataSync().map(fn);
    let hoShape = this.brain.outputWeights.shape;
    this.brain.outputWeights.dispose();
    this.brain.outputWeights = tf.tensor(ho, hoShape);
  }

  crossover(partner) {
    let parentA_in_dna = this.brain.inputWeights.dataSync();
    let parentA_out_dna = this.brain.outputWeights.dataSync();
    let parentB_in_dna = partner.brain.inputWeights.dataSync();
    let parentB_out_dna = partner.brain.outputWeights.dataSync();

    let mid = Math.floor(Math.random() * parentA_in_dna.length);
    let child_in_dna = [
      ...parentA_in_dna.slice(0, mid),
      ...parentB_in_dna.slice(mid, parentB_in_dna.length),
    ];
    let child_out_dna = [
      ...parentA_out_dna.slice(0, mid),
      ...parentB_out_dna.slice(mid, parentB_out_dna.length),
    ];

    let child = this.clone();
    let input_shape = this.brain.inputWeights.shape;
    let output_shape = this.brain.outputWeights.shape;

    child.brain.dispose();

    child.brain.inputWeights = tf.tensor(child_in_dna, input_shape);
    child.brain.outputWeights = tf.tensor(child_out_dna, output_shape);

    return child;
  }

  think() {
    if (this.died || this.gliding) return;
    this.fitness++;
    const sensors = [
      this.nextPipeGapXPosition - this.x,
      this.nextPipeGapYPosition - this.y,
    ];
    const [jumpProb] = this.brain.predict(sensors);
    if (jumpProb > 0.5) this.jump();
  }

  update(deltaTime: number) {
    this.think();
    super.update(deltaTime);
  }
}
