let collapsed = true;
var modalFrame = $('#defaultModal');
var openModalBtn = $('#expenseModalBtn');
var closeModalBtnX = $('#closeModalBtnX')
var closeModalBtnCancel = $('#closeModalBtnCancel')
var expenseDateInput = $('#expenseDate');
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
var helpScreen = $('#helpScreen');



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

$('#sbHomeBtn').on('click', function (event) {
    homeScreen.show();
    dashboardScreen.hide();
    scanScreen.hide();
    addExpenseScreen.hide();
    calendarScreen.hide();
    financialScreen.hide();
    helpScreen.hide();
    collapsibleSidebar();
});

$('#sbDashboardBtn').on('click', function (event) {
    homeScreen.hide();
    dashboardScreen.show();
    scanScreen.hide();
    addExpenseScreen.hide();
    calendarScreen.hide();
    financialScreen.hide();
    helpScreen.hide();
    collapsibleSidebar();
});
$('#sbScanBtn').on('click', function (event) {
    homeScreen.hide();
    dashboardScreen.hide();
    scanScreen.show();
    addExpenseScreen.hide();
    calendarScreen.hide();
    financialScreen.hide();
    helpScreen.hide();
    collapsibleSidebar();
});
$('#sbAddExpenseBtn').on('click', function (event) {
    homeScreen.hide();
    dashboardScreen.hide();
    scanScreen.hide();
    addExpenseScreen.show();
    calendarScreen.hide();
    financialScreen.hide();
    helpScreen.hide();
    collapsibleSidebar();
});
$('#sbCalendarBtn').on('click', function (event) {
    homeScreen.hide();
    dashboardScreen.hide();
    scanScreen.hide();
    addExpenseScreen.hide();
    calendarScreen.show();
    financialScreen.hide();
    helpScreen.hide();
    collapsibleSidebar();
});
$('#sbFinancialBtn').on('click', function (event) {
    homeScreen.hide();
    dashboardScreen.hide();
    scanScreen.hide();
    addExpenseScreen.hide();
    calendarScreen.hide();
    financialScreen.show();
    helpScreen.hide();
    collapsibleSidebar();
});
$('#sbHelpBtn').on('click', function (event) {
    homeScreen.hide();
    dashboardScreen.hide();
    scanScreen.hide();
    addExpenseScreen.hide();
    calendarScreen.hide();
    financialScreen.hide();
    helpScreen.show();
    collapsibleSidebar();
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
function AddExpense(date, description, place, amount) {
    var expenseRow = $('<tr>');
    var expenseDate = $('<td>').text(date);
    var expenseDescription = $('<td>').text(description);
    var expensePlace = $('<td>').text(place);
    var expenseAmount = $('<td>').text(amount);
    var removeRowBtn = $('<td>').addClass('deleteRowBtn').text('X');

    expenseRow.append(expenseDate, expenseDescription, expensePlace, expenseAmount, removeRowBtn);
    $('#expenseTableBody').append(expenseRow);
}

function expenseSubmit(event) {
    event.preventDefault();

    var expenseDateSubmit = expenseDateInput.val();
    var expenseDescriptionSubmit = expenseDescriptionInput.val();
    var expenseAmountSubmit = expenseAmountInput.val();
    var expensePlaceSubmit = expensePlaceInput.val();
    console.log("asigno variables");

    AddExpense(expenseDateSubmit, expenseDescriptionSubmit, expensePlaceSubmit, expenseAmountSubmit);
    expensesForm[0].reset();
    modalFrameBehaviour();
}

//---------Delete Expense------------//
function deleteExpense(event) {
    var deleteBtn = $(event.target);
    deleteBtn.parent('tr').remove();
}

//-------------Buttons trigger---------------//
openModalBtn.on('click', modalFrameBehaviour);
closeModalBtnX.on('click', modalFrameBehaviour);
closeModalBtnCancel.on('click', modalFrameBehaviour);
expensesForm.on('submit', expenseSubmit);
expenseTableBody.on('click', '.deleteRowBtn', deleteExpense);


$(document).ready(function () {
    homeScreen.show();
    addExpenseScreen.hide();
    dashboardScreen.hide();
    scanScreen.hide();
    calendarScreen.hide();
    financialScreen.hide();
    helpScreen.hide();
})

