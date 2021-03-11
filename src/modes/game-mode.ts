export interface GameMode {
  layers: Array<any>;
  observers: Array<any>;

  addObserver(mode);

  processInput(event);

  update(deltaTime);

  render();
}
