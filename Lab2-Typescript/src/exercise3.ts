class Car {
    constructor(public name: string, public acceleration: number = 0) {
    }
    honk(): void {
        console.log(`${this.name} is saying: Tooooooooot!`);
    }
    accelerate(speed: number): void {
        this.acceleration += speed;
    }
}

let car = new Car("BMW");
car.honk(); // BMW is saying: Toooooooooot!
console.log(car.acceleration); // 0
car.accelerate(60);
console.log(car.acceleration);//60
