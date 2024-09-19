console.log('Debounce..');

const sayHello = () => {
  console.log('Hello', this.name);
};

const amy = {
  name: 'Amy',
  speak: sayHello,
};

amy.speak();

class Car {
  constructor(name) {
    this.carName = name;
  }

  startEngine() {
    console.log(`Engine started for ${this.carName}`);
  }

  startLater() {
    setTimeout(() => {
      console.log(`Engine started for ${this.carName} after 2 secs`);
    }, 2000);
  }
}

const myCar = new Car('Tesla');
myCar.startEngine(); // Should log: "Engine started for Tesla"
myCar.startLater(); // Should log: "Engine started for Tesla" after 2 seconds
