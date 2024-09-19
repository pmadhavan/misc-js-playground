console.log('Car..');

class Car {
  constructor(carName, engine) {
    this.carNeme = carName;
    this.engine = engine;
  }
  startEngine() {
    this.engine.start();
  }
}

class Engine {
  constructor(type) {
    this.engineType = type;
  }

  start() {
    console.log(`Engine type: ${this.engineType} of car: ${this.carName} started`);
  }
}
