// // ES5
// function funcES5(booleanVar) {
//     if (booleanVar) {
//         var year = 1996;
//     }
//     console.log('This year is ' + year);
// }


// // Lecture: Arrow function 2

// // ES5
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function() {
//         var self = this;
//         document.querySelector('.green').addEventListener('click', function() {
//             var str = 'This is box number ' + self.position +
//             ' and it is ' + self.color;
//             alert(str);
//         });
//     }
// }

// // box5.clickMe();

// // ES6
// var box6 = {
//     color: 'green',
//     position: 1,
//     clickMe: function() {
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = 'This is box number ' + this.position +
//             ' and it is ' + this.color;
//             alert(str);
//         });
//     }
// }

// box6.clickMe();

// Lecture: Spread operator:

// function addFourNumber(a, b, c, d) {
//     return a + b + c + d;
// }

// var sum1 = addFourNumber(18, 30, 12, 21);

// console.log(sum1);

// // ES5 
// var ages = [18, 30, 12, 21];
// var sum2 = addFourNumber.apply(null, ages);
// console.log(sum2);

// const arr1 = [2, 3, 4];
// const arr2 = [6, 7, 8];
// const arr3 = [...arr1, ...arr2];
// console.log(arr3);

// function isFullAge5() {
//     console.log(arguments);
//     var newArray = Array.from(arguments);
//     newArray.forEach(element => console.log(element));
// }

// isFullAge5(1, 2, 3);

// function PhamPerson(name, age, ho = "Pham") {
//     this.name = name;
//     this.age = age;
//     this.ho = ho;
// }

// var hien = new PhamPerson("Hien", 22);
// var long = new PhamPerson("Long", 22, "Trinh");

// Lecture: Maps:

// const question = new Map();
// question.set(1, 'hien_1');
// question.set(true, 'hien_true');

// question.forEach((value, key) => console.log(`value: ${value}, key: ${key}`));

// for ([key, value] of question.entries()) {
//     console.log(`value: ${value}, key: ${key}`)
// }

// var obj = {
//     1: 'hien_1',
//     true: 'hien_true'
// };


// Lecture: Classes

//ES5

// var Person5 = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// };

// Person5.prototype.caculateAges = function() {
//         var time_now = new Date();
//         var this_year = time_now.getFullYear();
//         return this_year - this.yearOfBirth;
// }

// var Athlete5 = function(name, yearOfBirth, job, medals) {
//     Person5.call(this, name, yearOfBirth, job);
//     this.medals = medals;
// }

// Athlete5.prototype = Object.create(Person5.prototype);

// var ath5 = new Athlete5("Hien", 1996, "student", 100);
// console.log(ath5.caculateAges());


// // ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    caculateAge () {
        var time_now = new Date();
        var this_year = time_now.getFullYear();
        return this_year - this.yearOfBirth;
    }

    static greeting() {
        console.log("hi!");
    }
}


class Athlete6 extends Person6 {
    constructor (name, yearOfBirth, job, medals) {
        super(name, yearOfBirth, job);
        this.medals = medals;
    }
}

var ath6 = new Athlete6("Hien", 1996, "student", 10);
console.log(ath6);


/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/


class SomeThing {
    constructor (name, buid_year) {
        this.name = name;
        this.buid_year = buid_year;
    }
    getName () {
        return this.name;
    }
    
    getBuildYear () {
        return this.buid_year;
    }

    caculateAge () {
        var this_year = new Date().getFullYear();
        return this_year - this.buid_year; 
    }
}


class Park extends SomeThing {
    constructor (name, build_year, number_of_trees) {
        super(name, build_year);
        this.number_of_trees = number_of_trees;
    }

    getTotalTrees() {
        return this.number_of_trees;
    }

    haveMoreThanMilionsTree() {
        return this.number_of_trees > 1000;
    }
}


class Streets extends SomeThing {
    constructor (name, build_year, length, size = 'nomarl') {
        super(name, build_year);
        this.length = length;
        this.size = size;
    }
}

class Town {
    constructor () {
        this.parks = [];
        this.streets = [];
    }

    addPark (park) {
        return this.parks.push(park);
    }

    addStreet (street) {
        return this.streets.push(street);
    }

    caculateTotalPark () {
        return this.parks.length;    
    }

    caculateTotalStreet () {
        return this.streets.length;
    }

    caculateTotalTree () {
        var sum_of_trees = 0;
        this.parks.forEach(ele => sum_of_trees += ele.getTotalTrees());  
        return sum_of_trees;
    }

    caculateTreeDensity() {
var park1 = new Park("park1", 1996, 100);
return (this.caculateTotalTree() / this.caculateTotalPark()).toFixed(2);
    }

    caculateTotalParkAge() {
        var sum_park_age = 0;
        this.parks.forEach(ele => sum_park_age += ele.caculateAge());
        return sum_park_age;
    }

    caculateAvgAgePark() {
        return (this.caculateTotalParkAge() / this.caculateTotalPark()).toFixed(2);
    }

    getParksMoreThanMilionTrees() {
        var parks = [];
        this.parks.forEach(ele => {
            if(ele.haveMoreThanMilionsTree()) { 
                parks.push(ele); 
            }
        });
        return parks;
    }

}

var park1 = new Park("park1", 1996, 100);
var park2 = new Park("park2", 1995, 101);
var park3 = new Park("park3", 1995, 1001);

var town1 = new Town();
town1.addPark(park1);
town1.addPark(park2);
town1.addPark(park3);

console.log(town1.caculateTreeDensity());
console.log(town1.caculateAvgAgePark());
console.log(town1.getParksMoreThanMilionTrees());