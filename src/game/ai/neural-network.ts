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
    model.add(tf.layers.dense({ units: this.outputNodes }));
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

  clone(): NeuralNetwork {
    const cloneNN = new NeuralNetwork(
      this.inputNodes,
      this.hiddenNodes,
      this.outputNodes
    );
    const weights = this.model.getWeights();
    for (let i = 0; i < weights.length; i++) {
      weights[i] = weights[i].clone();
    }
    cloneNN.model.setWeights(weights);
    return cloneNN;
  }

  mutate(): NeuralNetwork {
    const cloneNN = new NeuralNetwork(
      this.inputNodes,
      this.hiddenNodes,
      this.outputNodes
    );
    const weights = this.model.getWeights();
    for (let i = 0; i < weights.length; i++) {
      let shape = weights[i].shape;
      let arr = weights[i].dataSync().slice();
      for (let j = 0; j < arr.length; j++) {
        if (Math.random() < 0.01) {
          let offset = 0.01;
          let newx = arr[j] + offset;
          arr[j] = newx;
        }
      }
      let newW = tf.tensor(arr, shape);
      weights[i] = newW;
    }
    cloneNN.model.setWeights(weights);
    this.model.dispose();

    return cloneNN;
  }
}
