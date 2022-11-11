"use strict";
class BaseObject {
    constructor(width = 0, length = 0) {
        this.width = width;
        this.length = length;
    }
    ;
}
class Rectangle extends BaseObject {
    constructor(width, length) {
        super(width, length);
    }
    calcSize() {
        return this.width * this.length;
    }
}
let rectangle = new Rectangle(5, 2);
console.log(rectangle.calcSize());
