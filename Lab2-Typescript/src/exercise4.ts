class BaseObject {
    constructor(public width:number = 0, public length: number = 0){};
}
class Rectangle extends BaseObject {
    constructor(width: number, length: number) {
        super(width, length);
    }
    calcSize(): number {
        return this.width * this.length;
    }
}

let rectangle = new Rectangle(5, 2);
console.log(rectangle.calcSize());
