
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


console.time("fb");
console.log(fibonacci(45));
console.timeEnd("fb");
