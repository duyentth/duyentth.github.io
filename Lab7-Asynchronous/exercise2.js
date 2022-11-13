/**
 * Create a method named removeDuplicatesAsync which works only for Array types
 *  and removes all duplicates for any array asynchornously. 
 * When you finish, test using the code below:
 */


Array.prototype.removeDuplicatesAsync = function () {
    let arr = this;
    new Promise( (resolve, reject) => {
        for ( let i = 0; i < arr.length - 1; i ++) {
            for( let j = i + 1; j < arr.length; j ++) {
                if ( arr[i] === arr[j]) {
                    arr.splice(j, 1);
                    j --;
                }
            }
        }
        resolve(arr);
    }). then (console.log);
}


//testing
console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
console.log(`end`);

// Output:
// start
// end
// [4, 1, 5, 7, 2, 3, 6]