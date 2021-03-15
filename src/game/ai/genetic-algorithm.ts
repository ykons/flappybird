import { SmartBird } from "../core/entities/smart-bird";
import { GAPlayMode } from "../modes/ga-play-mode";

export class GeneticAlgorithm {
  species: Array<SmartBird>;
  generation: number;
  highScore: number;
  avgScore: number;
  fitness: number;
  progress: number;
  constructor(
    private readonly mode: GAPlayMode,
    private readonly populationSize: number
  ) {
    this.species = [];
    this.generation = 1;
    this.highScore = 0;
    this.avgScore = 0;
    this.fitness = 0;
    this.progress = 0;
  }

  initiate() {
    for (let i = 0; i < this.populationSize; i++) {
      const newBird = new SmartBird(i);
      this.species.push(newBird);
    }

    this.mode.addNextGenerationToGame(this.species);
  }

  pickOne() {
    let index = 0;
    let r = Math.random();
    while (r > 0) {
      r -= this.species[index].fitness;
      index += 1;
    }

    index -= 1;

    let selected = this.species[index].clone();
    return selected;
  }

  evolve() {
    // Store High Score
    this.generation += 1;
    let genHighscore = Math.max.apply(
      Math,
      this.species.map((o) => o.score)
    );
    this.highScore =
      genHighscore > this.highScore ? genHighscore : this.highScore;

    // Calculate Total Score of this Generation
    let totalScore = 0;
    this.species.forEach((specie) => {
      totalScore += specie.score;
    });

    // Assign Fitness to each creature
    this.progress = totalScore / this.populationSize - this.avgScore;
    this.avgScore = totalScore / this.populationSize;
    this.species.forEach((specie) => {
      specie.fitness = specie.score / totalScore;
    });

    // Store new generation temporarily in this array
    let newGeneration = [];

    // Breeding
    for (let i = 0; i < this.populationSize; i++) {
      let parentA = this.pickOne();
      let parentB = this.pickOne();
      let child = parentA.crossover(parentB);
      child.mutate();
      child.id = i;
      child.parents = [
        { id: parentA.id, score: this.species[parentA.id].score },
        { id: parentB.id, score: this.species[parentB.id].score },
      ];
      newGeneration.push(child);
    }

    // Kill Current Generation.
    // i.e. Remove their bodies from MatterJS World and dispose their brain
    this.species.forEach((specie) => {
      specie.dispose();
    });

    // Add new children to the current generation
    this.species = newGeneration;
    this.mode.addNextGenerationToGame(this.species);
  }
}
