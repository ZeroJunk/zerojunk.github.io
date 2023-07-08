function stagePrompt (stageNumber) {
    // stageNumber from 1-6.
    if (stageNumber == 1) {
        return "PICK YOUR MORNING CAFE DESTINATION.";
    } else if (stageNumber == 2) {
        return "PICK YOUR FIRST SIGHTSEEING DESTINATION.";
    } else if (stageNumber == 3) {
        return "PICK YOUR LUNCH DESTINATION";
    } else if (stageNumber == 4) {
        return "PICK YOUR SECOND SIGHTSEEING DESTINATION";
    } else if (stageNumber == 5) {
        return "PICK YOUR DINNER DESTINATION";
    } else if (stageNumber == 6) {
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
    
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var stageType = getCookie("stageNumber");


/*during destination, left button is red start over, right button is green move on */
