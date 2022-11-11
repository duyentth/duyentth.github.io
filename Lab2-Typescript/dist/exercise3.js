"use strict";
class Car {
    constructor(name, acceleration = 0) {
        this.name = name;
        this.acceleration = acceleration;
    }
    honk() {
        console.log(`${this.name} is saying: Tooooooooot!`);
    }
    accelerate(speed) {
        this.acceleration += speed;
    }
}
let car = new Car("BMW");
car.honk(); // BMW is saying: Toooooooooot!
console.log(car.acceleration); // 0
car.accelerate(60);
console.log(car.acceleration); //60
