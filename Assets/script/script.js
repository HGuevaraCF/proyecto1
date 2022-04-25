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
var helpScreen = $('#helpScreen');
var Screens = $('.screen');



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

$('.sbBtn').on('click', function() {
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
        case 'sbHelpBtn':
            helpScreen.show();
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
function AddExpense(category, date, description, place, amount) {
    var expenseRow = $('<tr>');
    var expenseCategory = $('<td>').text(category)
    var expenseDate = $('<td>').text(date);
    var expenseDescription = $('<td>').text(description);
    var expensePlace = $('<td>').text(place);
    var expenseAmount = $('<td>').text(amount);
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
    console.log("asigno variables");

    AddExpense(expenseCategorySubmit, expenseDateSubmit, expenseDescriptionSubmit, expensePlaceSubmit, expenseAmountSubmit);
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
    Screens.hide();
    addExpenseScreen.show();
})

