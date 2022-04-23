var groceriesExpensed = document.getElementById('expensed-groceries');
var restaurantsExpensed = document.getElementById('expensed-restaurants');
var transportationExpensed = document.getElementById('expensed-transportation');
var utilitiesExpensed = document.getElementById('expensed-utilities');
var submitButton = document.querySelectorAll('button');


var arrayKey = ['groceries', 'restaurants', 'transportation', 'utilities'];
var arrayInputs = [groceriesExpensed, restaurantsExpensed, transportationExpensed, utilitiesExpensed];
var arrayBtn = ['submit-groceries', 'submit-restaurants', 'submit-transportation', 'submit-utilities'];
var arrayGroceries =[];
var arrayRestaurants = [];
var arrayTransportation = [];
var arrayUtilities = [];

var arrayTotal = [arrayGroceries, arrayRestaurants, arrayTransportation, arrayUtilities];



function submitBtn (e){

    for (let i = 0; i < arrayBtn.length; i++) {

        if(arrayBtn[i] === e.target.id){

            sumExpenses(arrayBtn[i]);

        }
            
    }
}

function sumExpenses (expenses){

    for (let i = 0; i < arrayBtn.length; i++) {
        
        if (expenses === arrayBtn[i]) {

            arrayTotal[i].push(arrayInputs[i].value);

            
            localStorage.setItem(arrayKey[i], JSON.stringify(arrayTotal[i]));
            sumGroceries = parseFloat(groceriesExpensed.value);
            
            // console.log(arrayInputs[i].value);
            // console.log(arrayTotal[i]);
            // console.log(sumGroceries);
            sumSubtotals(expenses);

        }

        
    }       

}

function sumSubtotals(subtotalsCategories){

    for (let i = 0; i < arrayKey.length; i++) {

        if (subtotalsCategories === arrayBtn[i]) {
        var subtotals = parseFloat(JSON.parse(localStorage.getItem(arrayKey[i])));
        
        console.log(subtotals);
    }
}
    
}

for (let i = 0; i < 4; i++) {

    submitButton[i].addEventListener('click', submitBtn);
    
}




