import { SmartBird } from "../core/entities/smart-bird";

export class GeneticAlgorithm {
  private population: Array<SmartBird>;
  constructor(private readonly populationSize: number) {
    this.population = [];
  }

  createNextGeneration(winner?: SmartBird) {
    let size = this.populationSize;
    this.population.length = 0;
    while (size--) {
      this.population.push(new SmartBird(winner?.brain.clone().mutate()));
    }

    return this.population;
  }
}
