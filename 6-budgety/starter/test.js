var Expense = function(id, description, value) {
	this.id = id;
	this.description = description;
	this.value = value;
};

var ex = new Expense(1, 2, 3);
console.log(ex);