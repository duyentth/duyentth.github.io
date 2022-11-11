

/**
 * Write an implementation for the Observer Pattern where observers have the following format: {'event': [observers]}
For example:

{
   'eat': [function1, function2],
   'study': [function3, function4, function5]
}
 */

/**
     * This Observable/Subject has two methods:
     * on(event, fn): register an observer

    emit(event, message): when this method is called, all observers should be invoked
     */
class Subject {
    constructor() {
        this.observerList = [];
        
    };
    
    on(event, func) {
        this.observerList.push({ev: event, fn: func});
    };

    
    emit(event, message) {
        this.observerList.forEach(ob => {
            if (ob.ev == event){
                if (ob.ev == 'specialEvent'){
                    ob.fn.id = 10;
                    ob.fn.name = 'khanh';
                    ob.fn.callBack(message);
                }
                else ob.fn(message);
            }
        });
    }

}

class Observer {
    constructor(){}
}
Observer.prototype.receiveEvent = function(msg){ console.log('observer 1 received message ' + msg);};
var observer1 = new Observer();

//observer1.receiveEvent = function(msg){ console.log('observer 1 received message ' + msg); }

var observer2 = new Observer();
observer2.fuck = function(msg){ console.log('observer 2 received message ' + msg);}


const subject = new Subject();
subject.on('eat', console.log); // register an observer
subject.on('study', console.log); // register an observer

function foo(msg) {
    console.log('foo: ' + msg);
}

function f(s){

}

subject.on('eat', foo);
subject.on('study', foo);

subject.on('eat', f);

subject.on('eat', observer1.receiveEvent);
subject.on('eat', observer2.fuck);

var obj = {
    id: 0,
    name: '',
    callBack: function(msg){
        console.log('got your ' + msg + ' with id ' + this.id + ' and name ' + this.name);
    }
}

subject.on('specialEvent', obj);

///

subject.emit('eat', 'Corn');
//output for Line above: subject.emit('eat', 'Corn');
// Corn
// foo: Corn
subject.emit('study', 'cs445');
subject.emit('specialEvent', 'my message');
//output for Line above: subject.emit('study', 'cs445');
// cs445
// foo: cs445





//
//[{'eat', console.log}, {'study', console.log}, {'eat', foo}, {'study', foo}];

//