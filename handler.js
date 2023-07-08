var currentStage = 0; // from 1-6
var currentPage = 0;
var answer = false; // whether a choice has been made in the current stage

var options = [
    {
        "id": 1,
        "type": "decision",
        "name": "Do you want X or Y?",
        "leftText": "I'll go with X",
        "rightText": "I'll stick with Y",
        "left": 2,
        "right": 3
    }, 
    {
        "id": 2,
        "type": "answer",
        "name": "X",
        "description": "Yeah this is X"
    }, 
    {
        "id": 3,
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
    currentPage = parseInt(getCookie("currentPage"));
    if (options[currentPage-1].type === "answer") {
        answer = true;
        alert("This is an answer");
    } else {
        answer = false;
        alert("This is a question!");
    }
    alert(document.cookie);
}

function left () {

}

function right () {

}

// need global array, the actual CYOA. 

document.getElementById("objective").textContent = stagePrompt(stageType);

/*during destination, left button is red start over, right button is green move on */