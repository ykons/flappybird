import { SmartBird } from "../core/entities/smart-bird";

export class GeneticAlgorithm {
  private population: Array<SmartBird>;
  constructor(private readonly populationSize: number) {
    this.population = [];
  }

  createNextGeneration(winner?: SmartBird) {
    let size = this.populationSize;
    this.population.length = 0;
    if (winner) {
      console.log(winner);
      const weights = winner.brain.model.getWeights();
      weights.forEach((w) => {
        console.log(w.dataSync().slice());
      });
    }
    while (size--) {
      this.population.push(new SmartBird(winner?.brain.clone().mutate()));
    }

    return this.population;
  }
}
