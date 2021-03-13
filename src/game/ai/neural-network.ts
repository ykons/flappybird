import * as tf from "@tensorflow/tfjs";

export class NeuralNetwork {
  model: tf.Sequential;
  constructor(
    private readonly inputNodes: number,
    private readonly hiddenNodes: number,
    private readonly outputNodes: number
  ) {
    this.model = this.createModel();
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
    model.add(
      tf.layers.dense({ units: this.outputNodes, activation: "softmax" })
    );
    return model;
  }

  predict(sensors: Array<number>): Array<number> {
    return tf.tidy(() => {
      const inputs = tf.tensor(sensors);
      const predict = this.model.predict(
        inputs.reshape([1, this.inputNodes])
      ) as tf.Tensor;
      const output = predict.arraySync() as Array<Array<number>>;
      return output.pop();
    });
  }
}
