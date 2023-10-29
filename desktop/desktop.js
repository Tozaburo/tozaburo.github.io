// clock
var tsec = 61;
var cmin = 0;
var chour = 0;

setInterval(() => {
    timeChanged();
}, 1);

function timeChanged() {
    if (tsec != new Date().getMilliseconds()) {
        replacetime();
        tsec = new Date().getMilliseconds();
    }
}

function gradient(step1, step2) {
    return "hsl(" + String(cmin * 6 + (chour * 15 - cmin * 6) / (step1 - 1) * step2) + " 85% 75%)";
}

function replacetime() {
    var now = new Date();

    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    // var hour = 12;
    // var min = 34;
    // var sec = 56;


    var shour = String(hour);
    var smin = String(min);
    var ssec = String(sec);

    if (shour.length == 1) {
        shour = "0" + shour;
    }

    if (smin.length == 1) {
        smin = "0" + smin;
    }

    if (ssec.length == 1) {
        ssec = "0" + ssec;
    }

    var result = shour + " : " + smin + " : " + ssec;

    document.querySelector("#time").innerHTML = result;

    var csec = ssec;

    cmin = min + sec / 60;

    chour = hour + cmin / 60;


    var g = [gradient(10, 0), gradient(10, 1), gradient(10, 2), gradient(10, 3), gradient(10, 4), gradient(10, 5), gradient(10, 6), gradient(10, 7), gradient(10, 8), gradient(10, 9)]

    var backgroundhm = `radial-gradient(circle at top right, ${g[0]} 0% 10%, ${g[1]} 10% 20%, ${g[2]} 20% 30%, ${g[3]} 30% 40%, ${g[4]} 40% 50%, ${g[5]} 50% 60%, ${g[6]} 60% 70%, ${g[7]} 70% 80%, ${g[8]} 80% 90%, ${g[9]} 90% 100%`;

    document.body.style.background = backgroundhm;
}

document.addEventListener("keydown", keydownEvent, false);

var fontW = 200;

var show = 0;

function keydownEvent(event) {
    if (event.code === "KeyB") {
        if (fontW == 200) {
            fontW = 700;
        } else {
            fontW = 200;
        }
        document.getElementById("time").style.fontWeight = fontW;
    }

    if (event.code === "KeyS") {
        if (show == 1) {
            show = 0;
        } else {
            show = 1;
        }
        document.getElementById("time").style.fontWeight = fontW;
    }
}
// clock end

// emoji
var endpoint = "https://emojihub.yurace.pro/api/random";

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        object = data;
        var htmlCode = String(object.htmlCode[0]);
        emojiName = String(object.name);
        document.querySelector("#emoji").innerHTML = htmlCode;
        document.querySelector("#emoji-description").innerHTML = emojiName;
    });