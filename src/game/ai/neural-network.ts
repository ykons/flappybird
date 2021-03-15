import * as tf from "@tensorflow/tfjs";

export class NeuralNetwork {
  inputWeights: tf.Tensor;
  outputWeights: tf.Tensor;
  model: tf.Sequential;
  constructor(
    private readonly inputNodes: number,
    private readonly hiddenNodes: number,
    private readonly outputNodes: number
  ) {
    this.inputWeights = tf.randomNormal([this.inputNodes, this.hiddenNodes]);
    this.outputWeights = tf.randomNormal([this.hiddenNodes, this.outputNodes]);
    tf.setBackend("cpu");
  }

  createModel() {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        inputShape: [this.inputNodes],
        units: this.hiddenNodes,
        activation: "sigmoid",
      })
    );
    model.add(tf.layers.dense({ units: this.outputNodes }));
    return model;
  }

  dispose() {
    this.inputWeights.dispose();
    this.outputWeights.dispose();
    this.model?.dispose();
  }

  predict(sensors: Array<number>): Array<number> {
    let output;
    tf.tidy(() => {
      let inputLayer = tf.tensor(sensors, [1, this.inputNodes]);
      let hiddenLayer = inputLayer.matMul(this.inputWeights).sigmoid();
      let outputLayer = hiddenLayer.matMul(this.outputWeights).sigmoid();
      output = outputLayer.dataSync();
    });
    return output;
  }

  clone() {
    let clonie = new NeuralNetwork(
      this.inputNodes,
      this.hiddenNodes,
      this.outputNodes
    );
    clonie.dispose();
    clonie.inputWeights = tf.clone(this.inputWeights);
    clonie.outputWeights = tf.clone(this.outputWeights);
    return clonie;
  }
}
