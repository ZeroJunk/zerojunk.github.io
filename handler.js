var currentStage = 0; // from 1-6
var currentPage = 0;
var answer = false; // whether a choice has been made in the current stage
var pageInfo;

var options = [
    {
        "id": "A1", // change to A1 or so. A means 1st stage card 
        "type": "decision",
        "name": "Do you want X or Y?",
        "leftText": "I'll go with X",
        "rightText": "I'll stick with Y",
        "left": "A2",
        "right": "A3"
    }, 
    {
        "id": "A2",
        "type": "answer",
        "name": "X",
        "description": "Yeah this is X"
    }, 
    {
        "id": "A3",
        "type": "answer",
        "name": "Y",
        "description": "So this is Y"
    }
]



function stagePrompt (stageNumber) {
    // stageNumber from 1-6.
    if (stageNumber === 1) {
        return "PICK YOUR MORNING CAFE DESTINATION.";
    } else if (stageNumber === 2) {
        return "PICK YOUR FIRST SIGHTSEEING DESTINATION.";
    } else if (stageNumber === 3) {
        return "PICK YOUR LUNCH DESTINATION";
    } else if (stageNumber === 4) {
        return "PICK YOUR SECOND SIGHTSEEING DESTINATION";
    } else if (stageNumber === 5) {
        return "PICK YOUR DINNER DESTINATION";
    } else if (stageNumber === 6) {
        return "PICK YOUR THIRD SIGHTSEEING DESTINATION";
    } else {
        return "PICK YOUR ... ???? MOMMA?";
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function removeCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// gets data 
function handleData () {
    currentStage = parseInt(getCookie("currentStage"));
    currentPage = getCookie("currentPage");
    pageInfo = options.find(pageInfo => pageInfo.id === currentPage);
    if (pageInfo.type === "answer") {
        answer = true;
        alert("This is an answer");
    } else {
        answer = false;
        alert("This is a question!");
    }
    alert(document.cookie);
}

function left () {
    if (answer) {
        // restart
        // change current page, need id system to be A1, A2, A3... for each stage
    } else {
        // look for left page, go through options (search all of ti to find appropriate page)
    }
}

function right () {
    if (answer) {
        // change current state, current page, and save the data to stage1 or something. advance current stage and variable  
    } else {
        // look for left page
    }
}

// need global array, the actual CYOA. 
handleData();
document.getElementById("objective").textContent = stagePrompt(currentStage);

/*during destination, left button is red start over, right button is green move on */