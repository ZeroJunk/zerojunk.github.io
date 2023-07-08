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
    },
    {
        "id": "B1",
        "type": "decision",
        "name": "The Book of Mommon commands that you pass. Do you pass?",
        "leftText": "OBEY MOMMON. MOMMON IS ONE. MOMMON IS ALL.",
        "rightText": "Nah fam, I'm passin' on passin'",
        "left": "B2",
        "right": "B3"
    },
    {
        "id": "B2",
        "type": "decision",
        "name": "You're trapped in a tunnel. Do you move to the left or right? It doesn't matter anyway.",
        "leftText": "To the left",
        "rightText": "To the right",
        "left": "B4",
        "right": "B5"
    },
    {
        "id": "B3",
        "type": "answer",
        "name": "You slide out...",
        "description": "I forgot to add plot I'll be back soon"
    },
    {
        "id": "B4",
        "type": "answer",
        "name": "You get eaten by a Beft from a Dr.Seuss book, who continues to move on to the left. Chomp.",
        "description": "Restart?"
    },
    {
        "id": "B5",
        "type": "answer",
        "name": "You get eaten in front of a beaten down traffic sign. Arf.",
        "description": "Restart?"
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
    } else {
        answer = false;
    }
}

function left () {
    if (answer) {
        setCookie("currentPage", currentPage.substring(0, 1) + "1", 30);
    } else {
        setCookie("currentPage", pageInfo.left, 30);
        // look for left page, go through options (search all of ti to find appropriate page)
    }
    location.reload();
}

function right () {
    if (answer) {
        // change current state, current page, and save the data to stage1 or something. advance current stage and variable  
        setCookie("currentStage", currentStage + 1, 30); 
        setCookie("stage" + currentStage, currentPage, 30);
        let alphaVal = currentPage.substring(0, 1).toLowerCase().charCodeAt(0) - 97 + 2; // increment by one
        alert(String.fromCharCode(alphaVal) + "1");
        setCookie("currentPage", String.fromCharCode(alphaVal) + "1", 30);
        if (alphaVal === 7) {
            alert("WE'RE DONE!");
        }
        
    } else {
        setCookie("currentPage", pageInfo.right, 30);
    }
    location.reload();
}

// need global array, the actual CYOA. 
handleData();
document.getElementById("objective").textContent = stagePrompt(currentStage);
document.getElementById("title").textContent = pageInfo.name;
document.getElementById("bottom-text").textContent = document.cookie;
if (answer) {
    document.getElementById("description").textContent = pageInfo.description;
    document.getElementById("left-button").textContent = "START OVER";
    document.getElementById("left-button").style.backgroundColor = "red";
    document.getElementById("right-button").textContent = "SAVE AND QUIT";
    document.getElementById("right-button").style.backgroundColor = "green";
} else {
    document.getElementById("left-button").textContent = pageInfo.leftText;
    document.getElementById("right-button").textContent = pageInfo.rightText;
}


/*during destination, left button is red start over, right button is green move on */