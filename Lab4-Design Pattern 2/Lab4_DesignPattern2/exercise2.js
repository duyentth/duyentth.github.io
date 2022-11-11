/**
 * Implement Decorator pattern to add a logger to any object (additional class is needed). 
 * A logger method will log a message to the console.
 */

class User {
    constructor(fname, lname) {
        this.fname = fname;
        this.lname = lname;
    }
}

class DecoratedUser {
    constructor(user, city, state) {
        this.user = user;
        this.city = city;
        this.state = state;
    }
    logger() {
        console.log (`${this.user.fname} ${this.user.lname} lives in ${this.city}, ${this.state}`);
    }
}

const user = new User("Kelly", "Le");

const decorated = new DecoratedUser(user, "Fairfield", "Iowa");
decorated.logger();