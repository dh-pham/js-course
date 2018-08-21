// ES5
function funcES5(booleanVar) {
    if (booleanVar) {
        var year = 1996;
    }
    console.log('This year is ' + year);
}


// Lecture: Arrow function 2

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position +
            ' and it is ' + self.color;
            alert(str);
        });
    }
}

// box5.clickMe();

// ES6
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position +
            ' and it is ' + this.color;
            alert(str);
        });
    }
}

box6.clickMe();