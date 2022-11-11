/**
 * Implement Factory Method pattern to create two types of light bulbs: regular bulbs and energy saver bulbs.

Regular bulbs have a range of lumens between 50 and 100 and last for 1 year.
Energy saver bulbs have a range of lumens between 5 and 40 and last for 10 years and comes in multiple colors.
 */

class RegularBulb {
    constructor(lumenMin = 50, lumenMax = 100, age = 1) {
        this.lumenMin = lumenMin;
        this.lumenMax = lumenMax;
        this.age = age;
    }
}

class EnergyBulb {
    constructor(color,lumenMin = 5,lumenMax = 40, age =10) {
        this.lumenMin = lumenMin;
        this.lumenMax = lumenMax;
        this.age = age;
        this.color = color;
    }
}

class Factory {
    createBulb(type, color="") {
        let bulb;
        if (type === "regular") {
            bulb = new RegularBulb();
        } else if ( type === "energy") {
            bulb = new EnergyBulb(color);
        }
        return bulb;        
    }
}

const bulbs = [];
const factory = new Factory();

bulbs.push(factory.createBulb("regular"));
bulbs.push(factory.createBulb("energy", "red"));


for (let i = 0, len = bulbs.length; i < len; i++) {
    console.log(bulbs[i]);
}