var groceriesExpensed = document.getElementById('expensed-groceries');
var restaurantsExpensed = document.getElementById('expensed-restaurants');
var transportationExpensed = document.getElementById('expensed-transportation');
var utilitiesExpensed = document.getElementById('expensed-utilities');
var submitButton = document.querySelector('button');

var getGroceries = parseFloat(localStorage.getItem('groceries'));
var getRestaurants = parseFloat(localStorage.getItem('restaurants'));
var getTransportation = parseFloat(localStorage.getItem('transportation'));
var getUtilities = parseFloat(localStorage.getItem('utilities'));
var accGroceries = isNaN(getGroceries) ? 0 : getGroceries;
var accRestaurants = isNaN(getRestaurants) ? 0 : getRestaurants;
var accTransportation = isNaN(getTransportation) ? 0 : getTransportation;
var accUtilities = isNaN(getUtilities) ? 0 : getUtilities;

function submitBtn (){

    sumExpenses();

    groceriesExpensed.value = '';
    restaurantsExpensed.value = '';
    transportationExpensed.value = '';
    utilitiesExpensed.value = '';

}


function sumExpenses (){

var inputGroceries = isNaN(parseFloat(groceriesExpensed.value)) ? 0 : parseFloat(groceriesExpensed.value);

accGroceries = accGroceries + inputGroceries;

var subtotalGroceries = accGroceries;

localStorage.setItem('groceries', subtotalGroceries.toFixed(2));



var inputRestaurants = isNaN(parseFloat(restaurantsExpensed.value)) ? 0 : parseFloat(restaurantsExpensed.value);

accRestaurants = accRestaurants + inputRestaurants;

var subtotalRestaurants = accRestaurants;

localStorage.setItem('restaurants', subtotalRestaurants.toFixed(2));


var inputTransportation = isNaN(parseFloat(transportationExpensed.value)) ? 0 : parseFloat(transportationExpensed.value);

accTransportation = accTransportation + inputTransportation;

var subtotalTransportation = accTransportation;

localStorage.setItem('transportation', subtotalTransportation.toFixed(2));


var inputUtilities = isNaN(parseFloat(utilitiesExpensed.value)) ? 0 : parseFloat(utilitiesExpensed.value);

accUtilities = accUtilities + inputUtilities;

var subtotalUtilities = accUtilities;

localStorage.setItem('utilities', subtotalUtilities.toFixed(2));

var total = subtotalGroceries + subtotalRestaurants + subtotalTransportation + subtotalUtilities;

localStorage.setItem('total', total.toFixed(2));

printSubtotalsAndTotal();

}

function printSubtotalsAndTotal (){

var printGroceries = document.getElementById('subtotal-groceries');
var printRestaurants = document.getElementById('subtotal-restaurants');
var printTransportation = document.getElementById('subtotal-transportation');
var printUtilities = document.getElementById('subtotal-utilities');
var printTotal = document.getElementById('total');

printGroceries.textContent = '$ ' + localStorage.getItem('groceries');
printRestaurants.textContent = '$ ' + localStorage.getItem('restaurants');
printTransportation.textContent = '$ ' + localStorage.getItem('transportation');
printUtilities.textContent = '$ ' + localStorage.getItem('utilities');
printTotal.textContent = '$ ' + localStorage.getItem('total');


}

    submitButton.addEventListener('click', submitBtn);





