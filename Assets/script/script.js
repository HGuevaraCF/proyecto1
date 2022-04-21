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