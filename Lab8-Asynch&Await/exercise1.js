/**
 * 
 * create a new function named isPrimeAsync which use async&await keywords to resolve the isPrime function.
 */

const isPrime = num => new Promise( (resolve, reject) => {
    for ( let i = 2; i <= Math.sqrt(num); i ++) {
        if ( num % i === 0) {
            reject({prime: false});
        }
    }
    resolve ( { prime: num > 1});
});

const isPrimeAsync = async num => {
    let result;
    try {
        result = await isPrime(num);
    } catch (error) {
        result = error;
    } finally {
        console.log( result);
    }
};

//testing
console.log('start');
isPrimeAsync(1);
console.log('end');

// Output:
// start
// end
// { prime: true }