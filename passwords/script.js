var badPassword = document.getElementById("bad-password");
var month = document.getElementById("month");
var date = document.getElementById("date");
var color = document.getElementById("color");

var goodPassword = document.getElementById("good-password");
var texts = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*(){}[]_+"

function update() {
    badPassword.innerText = color.value + String(month.value) + String(date.value);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // 上限は除き、下限は含む
}

document.getElementById("month").addEventListener("input", () => {
    update();
});

document.getElementById("date").addEventListener("input", () => {
    update();
});

document.getElementById("color").addEventListener("input", () => {
    update();
});

setInterval(() => {
    var result = ""

    for (var n = 0; n < getRandomInt(10, 20); n++) {
        result += texts[getRandomInt(0, texts.length)]
    }

    goodPassword.innerText = result;
}, 1000)