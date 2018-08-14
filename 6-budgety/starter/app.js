
var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};	

	var data = {

		allItems: {
			exp: [],
			inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1,
		exp_perc: []
	};

	var caculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(cur) {
			sum += cur.value;
		});	
		data.totals[type] = sum;
		// console.log(data);
	};
	
	
	return {
		addItem: function(type, des, val) {
			var newItem, ID;

			// create new id
			if(data.allItems[type].length === 0) {
				ID = 0;
			} else {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}
			

			// create new item 'inc' or 'exp' type
			if(type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if(type === 'inc') {
				newItem = new Income(ID, des, val);
			}
			data.allItems[type].push(newItem);

			// return element
			return newItem;
		},

// 		delete item from allItems
		deleteItem: function(type, id) {
			data.allItems[type] = data.allItems[type].filter(e => e.id !== id);
			return data.allItems[type];
		},

		testing: function() {
			console.log(data);
		},

		caculateBudget: function() {
			// 1. caculate total income and outcome
			caculateTotal('exp');
			caculateTotal('inc');

			// 2. caculate the budget: income - outcome
			data.budget = data.totals.inc - data.totals.exp;

			// 3. caculate the percentage of income that we spent
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);	
			} else {
				data.percentage = -1;
			}

			// update exp_perc
			data.exp_perc = data.allItems.exp.map(function(ele) {
				if (data.totals.inc <= 0) {
					return -1;
				} else {
					return Math.round((ele.value / data.totals.inc) * 100);
				}
			});
			console.log('log: exp_perc ' + data.exp_perc);

		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage,
				exp_perc: data.exp_perc
			};
		}
	};
})();

var  UIController = (function() {

	var DOMstring = {
		type: '.add__type',
		des: '.add__description',
		value: '.add__value',
		add_btn: '.add__btn',
		income_list: '.income__list',
		expense_list: '.expenses__list',
		budget_value: '.budget__value',
		total_income: '.budget__income--value',
		total_expense: '.budget__expenses--value',
		exp_percentage: '.budget__expenses--percentage',
		month_title: '.budget__title--month',
		container: '.container',
		item_percentage: '.item__percentage'
	}
	return {
		getDOMstrings: function() {
			return DOMstring;
		},

		getInput: function() {
			return {
				type: document.querySelector(DOMstring.type).value,
				des: document.querySelector(DOMstring.des).value,
				val: parseFloat(document.querySelector(DOMstring.value).value)
			}
		},

		addListItem: function(obj, type, totalInc) {
			if (type === 'inc') {
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				// if (totalInc <= 0) {
				// 	html = html.replace('%percentage%', '...');	
				// } else {
				// 	html = html.replace('%percentage%', Math.round((obj.value / totalInc) * 100) + '%');	
				// }
			}
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			if (type === 'inc') {
				document.querySelector(DOMstring.income_list).insertAdjacentHTML('beforeend', newHtml);
			} else if (type === 'exp') {
				document.querySelector(DOMstring.expense_list).insertAdjacentHTML('beforeend', newHtml);
			}

		},

		clearFields: function() {
			var fields;
			fields = document.querySelectorAll(DOMstring.des + ', ' + DOMstring.value);
			fieldArr = Array.prototype.slice.call(fields);
			fieldArr.forEach(function(current, index, array) {
				current.value = "";
				current.description = "";
			});
		},
		displayBudget: function(obj) {
			var t, monthName, budget_str, selectorExpPercList;
			t = new Date();
			const monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
			];
			monthName = monthNames[t.getMonth()];

			// set current month
			document.querySelector(DOMstring.month_title).innerHTML = monthName + ', ' + t.getFullYear();

			// update budget

			document.querySelector(DOMstring.budget_value).innerHTML = obj.budget > 0 ? '+ ' + obj.budget : obj.budget;
			document.querySelector(DOMstring.total_income).innerHTML = '+ ' + obj.totalInc;
			document.querySelector(DOMstring.total_expense).innerHTML = '- ' + obj.totalExp;

			// set total exp percentage
			if (obj.percentage === -1) {
				document.querySelector(DOMstring.exp_percentage).innerHTML = '...';	
			} else {
				document.querySelector(DOMstring.exp_percentage).innerHTML = obj.percentage + '%';	
			}


			// update list expensive percentage 
			selectorExpPercList = document.querySelectorAll(DOMstring.item_percentage);
			console.log(selectorExpPercList);
			if (selectorExpPercList) {
				selectorExpPercList.forEach(function(ele, index) {
					if (obj.exp_perc[index] === -1) {
						ele.innerHTML = '...';
					} else {
						ele.innerHTML = obj.exp_perc[index] + '%';	
					}
				});	
			}
			

		}
	};

})();


var controller = (function(budgetCtrl, UICtrl) {

	var setupEvenListeners = function() {
		var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.add_btn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event) {
			if (event.keyCode == 13 || event.which == 13) {
				ctrlAddItem();
			}
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	};

	var updateBudget = function() {
		var budget;
		
		// 1. caculate budget
		budgetController.caculateBudget()
		
		// 2. return budget
		budget = budgetController.getBudget();

		// 3. display the budget on the UI
		// console.log(budget);
		UICtrl.displayBudget(budget);
	};
	

	var ctrlAddItem = function() {

		//1. get input data
		var input = UICtrl.getInput()

		if (input.des !== "" && !isNaN(input.val) && input.val > 0) {
			//2. add item to budget controller
			var result = budgetController.addItem(input.type, input.des, input.val);
			console.log(result);

			//3. add item to UI
			UIController.addListItem(result, input.type, budgetController.getBudget().totalInc);

			// 4. clear input
			UIController.clearFields();

			//5. caculate budget and update UI 
			updateBudget();
		}

		

	};

	var ctrlDeleteItem = function(event) {

		var itemId, arr, type, id, item;

		itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
		console.log('log: itemId = ' + itemId);
		arr = itemId.split('-');
		type = arr[0];
		id = parseInt(arr[1]);

		// remove from UI
		document.querySelector('#'+itemId).remove();

		// Update budget
		// 1. update allItems
		item = budgetController.deleteItem(type, id);
		console.log(item);

		// 2. recaculate budget
		budgetController.caculateBudget();


		// 3. display budget 
		UIController.displayBudget(budgetController.getBudget());
	};

	return {
		init: function() {
			console.log('init successfully!');
			
			// display budget
			UIController.displayBudget(budgetController.getBudget());

			// set event
			setupEvenListeners();
		}
	}
	
})(budgetController, UIController);


controller.init();

