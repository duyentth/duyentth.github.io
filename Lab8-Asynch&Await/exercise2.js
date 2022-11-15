/**
 * Create a method named removeDuplicatesAsync 
 * which works only for Array types and removes all duplicates for any array asynchornously.
 */

Array.prototype.removeDuplicatesAsync = async function () {
    try {
       let result =  await removeDuplicate(this);
       console.log(result);
    } catch (error) {
        console.log(error);
    }
}

async function removeDuplicate( arr ) {
    if ( arr.length === 0 || arr.length === 1) {
        return arr;
    }
    for (let i = 0; i < arr.length - 1; i ++) {
        for ( let j = i + 1; j < arr.length; j ++){
            if ( arr[i] === arr[j] ) {
                arr.splice(j, 1);
                j --;
            } 
        }
    }    
    return arr;
} 


//testing
console.log(`start`);
//[1].removeDuplicatesAsync();
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync(); 

console.log(`end`);

// Output:
// start
// end
// [4, 1, 5, 7, 2, 3, 6]