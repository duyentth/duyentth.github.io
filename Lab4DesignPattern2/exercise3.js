/**
 * Implement Strategy pattern to choose between different logging algorithms, choosing between:

console.info()
console.warn()
console.error()
console.table() accepts an array of objects
 */

class Info{
    logging(msg) {
        console.info(msg);
    }
}

class Warn{
    logging(msg) {
        console.warn(msg);
    }
}

class Error {
    logging(msg) {
        console.error(msg);
    }
}

class Table {
    logging(msg) {
        console.table(['table1', 'table2']);
    }
}

class Strategy {

    strategy = "";
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    logging(msg) {
        this.strategy.logging(msg);
    }
}

const strategy = new Strategy();

strategy.setStrategy(new Info());
strategy.logging('info....');

strategy.setStrategy(new Warn());
strategy.logging('warn....');

strategy.setStrategy(new Error());
strategy.logging('error....');

strategy.setStrategy(new Table());
strategy.logging(['table', 'table']);