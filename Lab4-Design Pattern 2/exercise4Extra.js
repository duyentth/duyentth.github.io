/**
 * using recursion
 */
function fibonacci1(n) {
    let result = 1;
    if (n >= 2) {
        result = fibonacci1(n - 1) + fibonacci1(n - 2);
    }
    return result;
}


/**
 * using Module Pattern
 */
let fibonacci2 = (function () {
    let cache = new Map();
    return function f(n) {
        if (cache.has(n)) return cache.get(n);

        let result = 1;
        if (n >= 2) {
            result = f(n - 1) + f(n - 2);
            cache.set(n, result);
        }
        return result;

    }
})();

/**
 * using class
 */
class Fibo {
    cache = new Map();
    fibonacci(n) {
        if (this.cache.has(n)) return this.cache.get(n);
        let result = 1;
        if (n >= 2) {
            result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
            this.cache.set(n, result);
        }
        return result;
    }
}

let fibonacci3 = Fibo.prototype.fibonacci.bind(new Fibo());

/**
 * using global variable
 */

let cache2 = new Map();
function fibonacci4(n) {
    if (cache2.has(n)) return cache2.get(n);
    let result = 1;
    if ( n >= 2) {
        result = fibonacci4(n - 1) + fibonacci4(n - 2);
        cache2.set(n, result);
    }
    return result;
}



/**
 * memoized version with Object
 */
 let fibonacci = (function () {
    let cache = {};
    return function f(n) {
        if (cache[n]) return cache[n];
        let result = 1;
        if (n >= 2) {
            result = f(n - 1) + f(n - 2);
            cache[n] = result;
        }
        return result;

    }
})();


console.time("fisrt");
console.log(fibonacci1(45));
console.timeEnd("fisrt");

console.time("second");
console.log(fibonacci2(45));
console.timeEnd("second");

console.time("third");
console.log(fibonacci3(45));
console.timeEnd("third");

console.time("fourth");
console.log(fibonacci4(45));
console.timeEnd("fourth");

console.time("fifth");
console.log(fibonacci(45));
console.timeEnd("fifth");