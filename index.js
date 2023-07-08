function open1 () {
    document.getElementById("intro-stage-1").setAttribute("style", "display: block");
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
removeCookie("currentStage");
removeCookie("stage1");
removeCookie("stage2");
removeCookie("stage3");
removeCookie("stage4");
removeCookie("stage5");
removeCookie("stage6");
removeCookie("currentPage");
setCookie("currentStage", "1", 30); // current stage
setCookie("currentPage", "A1", 30)