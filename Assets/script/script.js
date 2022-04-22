let collapsed = true;

//-------------sidebar behaviour--------------//
    function collapsibleSidebar(){
        if(collapsed){
            document.getElementById("sidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
            collapsed = false;
        }else if(!collapsed){
            document.getElementById("sidebar").style.width = "0px";
            document.getElementById("main").style.marginLeft = "0px";
            collapsed = true;
        }
    }
//-----------Modal show----------------------//
    function toggleModal(modalID){
        document.getElementById(modalID).classList.toggle("hidden");
        document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
        document.getElementById(modalID).classList.toggle("flex");
        document.getElementById(modalID + "-backdrop").classList.toggle("flex");
    }

//---------Add Expense from modal------------//
    function AddExpense(date, name, amount) {
        
    }
