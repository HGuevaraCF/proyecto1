let collapsed = true;
var modalFrame = $('#defaultModal');
var openModalBtn = $('#expenseModalBtn');
var closeModalBtnX = $('#closeModalBtnX');
var closeModalBtnCancel = $('#closeModalBtnCancel');
var expenseDateInput = $('#expenseDate');
var expenseCategoryInput = $('#expenseCategory');
var expenseDescriptionInput = $('#expenseDescription');
var expensePlaceInput = $('#expensePlace');
var expenseAmountInput = $('#expenseAmount');
var expensesForm = $('#expenseForm');
var addExpenseBtn = $('#expenseSubmitBtn');
var expenseTableBody = $('#expenseTableBody');
var homeScreen = $('#homeScreen');
var dashboardScreen = $('#dashboardScreen');
var scanScreen = $('#scanScreen');
var addExpenseScreen = $('#addManualExpense');
var calendarScreen = $('#calendarScreen');
var financialScreen = $('#financialScreen');
var currencyScreen = $('#currencyScreen');
var Screens = $('.screen');

var groceriesTotalDisplay = $('#groceriesDetail');
var foodTotalDisplay = $('#foodDetail');
var transportTotalDisplay = $('#transportationDetail');
var utilitiesTotalDisplay = $('#utilitiesDetail');
var otherTotalDisplay = $('#otherDetail');
var totalDisplay = $('#totalDetail');




//-------------sidebar behaviour--------------//
function collapsibleSidebar() {
    if (collapsed) {
        document.getElementById("sidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        collapsed = false;
    } else if (!collapsed) {
        document.getElementById("sidebar").style.width = "0px";
        document.getElementById("main").style.marginLeft = "0px";
        collapsed = true;
    }

}

$('.sbBtn').on('click', function () {
    collapsibleSidebar();
    Screens.hide();
    var optionButton = $(this).attr('id');
    switch (optionButton) {
        case 'sbDashboardBtn':
            dashboardScreen.show();
            break;
        case 'sbScanBtn':
            scanScreen.show();
            break;
        case 'sbAddExpenseBtn':
            addExpenseScreen.show();
            break;
        case 'sbCalendarBtn':
            calendarScreen.show();
            break;
        case 'sbFinancialBtn':
            financialScreen.show();
            break;
        case 'sbCurrencyBtn':
            currencyScreen.show();
            break;
    }
});


//-----------Modal show/hide----------------------//
function modalFrameBehaviour() {
    var display = modalFrame.css("display");
    if (display == "block") {
        modalFrame.css('display', 'none');
        addExpenseScreen.css('filter', 'none');
    } else if (display == "none") {
        modalFrame.css('display', 'block');
        addExpenseScreen.css('filter', 'blur(3px)');
    }
}


//---------Add Expense from modal------------//
function AddExpense(category, date, description, place, amount,calendarID) {
    var expenseRow = $('<tr>').attr("idCurrentCounter",calendarID);
    var expenseCategory = $('<td>').addClass('Categorytd').text(category)
    var expenseDate = $('<td>').text(date);
    var expenseDescription = $('<td>').text(description);
    var expensePlace = $('<td>').text(place);
    var expenseAmount = $('<td>').addClass('amounttd').text(amount);
    var removeRowBtn = $('<td>').addClass('deleteRowBtn').text('X');

    expenseRow.append(expenseCategory, expenseDate, expenseDescription, expensePlace, expenseAmount, removeRowBtn);
    $('#expenseTableBody').append(expenseRow);
}

function expenseSubmit(event) {
    event.preventDefault();

    var expenseCategorySubmit = expenseCategoryInput.val();
    var expenseDateSubmit = expenseDateInput.val();
    var expenseDescriptionSubmit = expenseDescriptionInput.val();
    var expenseAmountSubmit = expenseAmountInput.val();
    var expensePlaceSubmit = expensePlaceInput.val();

    AddExpense(expenseCategorySubmit, expenseDateSubmit, expenseDescriptionSubmit, expensePlaceSubmit, expenseAmountSubmit,idCounter);
    createCalEvent(idCounter,expenseCategorySubmit,transformDate(expenseDateSubmit),expenseDescriptionSubmit,expenseAmountSubmit);
    idCounter++;
    localStorage.setItem("idStoredCounter",idCounter)
    localStorage.setItem('StoredCalendarExpenses',JSON.stringify(storedEvents));
    expensesForm[0].reset();
    modalFrameBehaviour();
}

//---------Delete Expense------------//
function deleteExpense(event) {
    var deleteBtn = $(event.target);
    deleteCalEvent(deleteBtn.parent('tr').attr("idCurrentCounter"))
    deleteBtn.parent('tr').remove();
}

//----------Sum Expenses------------//
function sumExpenses() {
    var amountGroc = 0;
    var amountFood = 0;
    var amountTransp = 0;
    var amountUti = 0;
    var amountOther = 0;
    $('#expenseTableBody tr').each(function () {
        var category = $(this).find('td:eq(0)').text();
        switch (category) {
            case "Groceries":
                amountGroc += parseInt($(this).find('td:eq(4)').text(), 10);
                break;
            case "Food":
                amountFood += parseInt($(this).find('td:eq(4)').text(), 10);
                break;
            case "Transportation":
                amountTransp += parseInt($(this).find('td:eq(4)').text(), 10);
                break;
            case "Utilities":
                amountUti += parseInt($(this).find('td:eq(4)').text(), 10);
                break;
            case "Other":
                amountOther += parseInt($(this).find('td:eq(4)').text(), 10);
                break;
        }
    });

    groceriesTotalDisplay.text(amountGroc);
    foodTotalDisplay.text(amountFood);
    transportTotalDisplay.text(amountTransp);
    utilitiesTotalDisplay.text(amountUti);
    otherTotalDisplay.text(amountOther);
    totalDisplay.text(amountGroc + amountFood + amountTransp + amountUti + amountOther);
}

//-----------------Local Store expenses--------------//
function storeExpenses(){
    localStorage.removeItem("Expenses");
    var expensesStorage = [];
    $('#expenseTableBody tr').each(function () {
        expensesStorage.push({
            Category: $(this).find('td:eq(0)').text(),
            Date: $(this).find('td:eq(1)').text(),
            Description: $(this).find('td:eq(2)').text(),
            Place: $(this).find('td:eq(3)').text(),
            Amount: $(this).find('td:eq(4)').text(),
            CalendarID: $(this).attr("idCurrentCounter"),
        });
    });
    localStorage.setItem("Expenses", JSON.stringify(expensesStorage));
}

//-------------------Youtube API-------------------//
let player = document.getElementById("player");

const API_KEY = 'AIzaSyAef2luYscByCqPUlmPrktuCaFsHkVgL08';
const playListId = 'PLaRCh1VgIzthPvpaXIsDwshR7tm4W-Y83';



function getAPIData() {
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&part=contentDetails, snippet&playlistId=${playListId}`)
        .then(res => res.json()).then(data => {

            showAPIdata(data);
        });
}


getAPIData();
function showAPIdata(data) {
    // console.log(data);
    var apiData = data.items.id;
    // console.log(apiData);
    var apiItemIndex = data.items;
    // console.log(apiItemIndex);

    for (i = 0; i <= apiItemIndex.length; i++) {
        // console.log(i);
        var vidID = data.items[i].contentDetails.videoId;
        var vidTitle = data.items[i].snippet.title;
        var vidOwner = data.items[i].snippet.videoOwnerChannelTitle;
        // console.log(vidTitle);
        var viddiv = document.createElement('div');
        viddiv.setAttribute('class', 'video-frame block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-700');
        var vidList = document.createElement('iframe');
        vidList.setAttribute('allowFullScreen', '');
        vidList.setAttribute('src', `https://www.youtube.com/embed/${vidID}`)
        vidList.setAttribute('title', `${vidTitle}`)
        vidList.setAttribute('width', '400');
        vidList.setAttribute('height', '300');
        vidList.setAttribute('id', 'video-player')
        var vidTitleDom = document.createElement('h2');
        vidTitleDom.innerHTML = `Title:${vidTitle} <br>Video Owner: ${vidOwner}`;
        // console.log(vidList);
        
        viddiv.appendChild(vidTitleDom);
        viddiv.appendChild(vidList);
        player.appendChild(viddiv);
    }

}

//-------------------Currency API-------------------//
var cripto = document.getElementById('cripto');
var ranking = document.getElementById('ranking');
var nameC = document.getElementById('name');
var priceCriptos = document.getElementById('priceCriptos');
var conversion = document.getElementById('conversion');

function getApiData (){
fetch(`https://api.coinpaprika.com/v1/tickers`)
	.then(response => response.json())
	.then(data => rankingCoinpaprika(data))
	.catch(err => console.error(err));

	
}

function rankingCoinpaprika (data){

	console.log(data);

	var total = 10_000;

	for (i = 0; i <= 9; i++) {
        var rank = data[i].rank;
        var nameCripto = data[i].name;
		var priceUSD = data[i].quotes.USD.price;

		var rankNumber = document.createElement('p');
        var nameEl = document.createElement('p');
		var priceEl = document.createElement('p');
		var conversionEl = document.createElement('p');
        
		ranking.appendChild(rankNumber);
        nameC.appendChild(nameEl);
		priceCriptos.appendChild(priceEl);
		conversion.appendChild(conversionEl);

		rankNumber.innerHTML = '#' + rank;
        nameEl.innerHTML = nameCripto;
		priceEl.innerHTML = '$ ' + priceUSD.toFixed(4);
		conversionEl.innerHTML = (total/priceUSD).toFixed(4);

    }
	
}

getApiData();

//-------------------Dashboard behauviour-------------------//
function createGraph() {
const BChart = document.getElementById("BarChart").getContext("2d");
const groceriesTotal = parseInt(groceriesTotalDisplay.text());
const foodTotal = parseInt(foodTotalDisplay.text());
const transportTotal = parseInt(transportTotalDisplay.text());
const utilitiesTotal = parseInt(utilitiesTotalDisplay.text());
const otherTotal = parseInt(otherTotalDisplay.text());
console.log(foodTotal);
const expensesData = [groceriesTotal, foodTotal, transportTotal, utilitiesTotal, otherTotal];
const myChart = new Chart(BChart, {
    type: "bar",
    responsive: true,
    data: {
        labels: ["groceries", "food", "transport", "utilities", "other" ],
        datasets: [{
            label: "Expenses",
            data: expensesData,
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
        },{
            type: 'line',
            label: 'Income',
            data: [50, 50, 50, 50],
        }
    ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const DChart = document.getElementById("DoughnutChart").getContext("2d");
const scndChart = new Chart(DChart, {
    type: "doughnut",
    responsive: true,
    data: {
        labels: ["groceries", "food", "transport", "utilities", "other" ],
        datasets: [{
            label: "Expenses",
            data: expensesData,
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
        }]
    },
    // options: {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // }
});

}

//-------------Buttons trigger---------------//
openModalBtn.on('click', modalFrameBehaviour);
closeModalBtnX.on('click', modalFrameBehaviour);
closeModalBtnCancel.on('click', modalFrameBehaviour);
expensesForm.on('submit', expenseSubmit);
expensesForm.on('submit', sumExpenses);
expensesForm.on('submit', storeExpenses);
expensesForm.on('submit', createGraph);
expenseTableBody.on('click', '.deleteRowBtn', deleteExpense);
expenseTableBody.on('click', '.deleteRowBtn', sumExpenses);
expenseTableBody.on('click', '.deleteRowBtn', storeExpenses);
expenseTableBody.on('click', '.deleteRowBtn', createGraph);


//--------Actions triggered when page loads----------//
$(document).ready(function () {
    Screens.hide(); // Hide all screens
    addExpenseScreen.show(); // Show home screen

    //------Check for local storage and prints it if it exists----//
    if(localStorage.getItem('Expenses') != null){
        let expeneses = JSON.parse(localStorage.getItem("Expenses"));
        expeneses.forEach(expense => {
            AddExpense(expense.Category, expense.Date, expense.Description, expense.Place, expense.Amount,expense.CalendarID);
        });
        sumExpenses(); 
    }
    createGraph();
})


// Calendar
if(localStorage.getItem("StoredCalendarExpenses") == null){
    var storedEvents = []
}else{
    var storedEvents = JSON.parse(localStorage.getItem("StoredCalendarExpenses"))
}

if(localStorage.getItem("idStoredCounter") == null){
    var idCounter = 1000;
}else{
    var idCounter = JSON.parse(localStorage.getItem("idStoredCounter")); 
}

$(document).ready(function() {
    $('#calendar').evoCalendar({
        theme: "Royal Navy",
        firstDayOfWeek: 1,
        language: "en",
        todayHighlight: true,
        calendarEvents: storedEvents
    })
})

function createCalEvent(event_id,event_name,event_date,event_description, event_amount) {
    $("#calendar").evoCalendar('addCalendarEvent', [{
        id: event_id,
        name: event_name,// Event badge (optional)
        date: event_date, // Date range
        description: event_description + " - Expense Total: " + event_amount, // Event description (optional)
        type: "event",
        color: "darkgreen" // Event custom color (optional)
        }
    ]);
}

function deleteCalEvent(idGiven) {
    $("#calendar").evoCalendar('removeCalendarEvent',parseInt(idGiven))
    for (i = 0; i < storedEvents.length; i++) {
        if (storedEvents[0].id == idGiven) {
            storedEvents.splice(i,1)
        }
    }
    localStorage.setItem('StoredCalendarExpenses',JSON.stringify(storedEvents));
}

function transformDate(date){
    var newDate = date.split("-")
    day = newDate[2]
    month = newDate[1]
    year = newDate[0]

    if (month == "01") {
        month = "January";
    }else if (month == "02"){
        month = "February";
    }else if (month == "03"){
        month = "March";
    }else if (month == "04"){
        month = "April";
    }else if (month == "05"){
        month = "May";
    }else if (month == "06"){
        month = "June";
    }else if (month == "07"){
        month = "July";
    }else if (month == "08"){
        month = "August";
    }else if (month == "09"){
        month = "September";
    }else if (month == "10"){
        month = "October";
    }else if (month == "11"){
        month = "November";
    }else if (month == "12"){
        month = "December";
    }

    return month +"/"+ day+"/"+year;
}