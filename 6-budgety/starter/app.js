
var budgetController = (function() {

	var x = 5;
	var add = function(a) {
		return x + a;
	}

	return {
		pubTest: function() {
			return add(5);
		},
		pubTest2: function() {
			console.log(add(10));
		}
	}
})();

var  UIController = (function() {

})();


var controller = (function(budgetCtrl, UICtrl) {

	var z = budgetCtrl.pubTest();
	return {
		anotherPublic: function() {
			console.log(z);
		}
	}
})(budgetController, UIController);


