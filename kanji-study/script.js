// var
var page = [];
var currentSection = "top";
var level = 0;
var levelList = ["10", "9", "8", "7", "6", "5", "4", "3", "準2", "2", "準1", "1"];
var doneD = false;
var random = 0;
var done = 0;

// localStorage
function storageData() {
    // Daliy Question
    if (localStorage.getItem("doneD") == null) {
        localStorage.setItem("doneD", "false");
    }
    doneD = JSON.parse(localStorage.getItem("doneD").toLowerCase());

    // Goal
    if (localStorage.getItem("goal") == null) {
        localStorage.setItem("goal", "10");
    }

    if (localStorage.getItem("level") == null) {
        showSection("level");
        document.querySelectorAll(".level-button").forEach(function (element) {
            element.addEventListener('click', function () {
                level = this.dataset.level;
                console.log(levelList[level]);
                localStorage.setItem("level", String(level));
                showSection("top");
            });
        });
    } else {
        level = Number(localStorage.getItem("level"));
        if (localStorage.getItem("level") == null) {
            showSection("level");
            document.querySelectorAll(".level-button").forEach(function (element) {
                element.addEventListener('click', function () {
                    level = this.dataset.level;
                    console.log(levelList[level]);
                    localStorage.setItem("level", String(level));
                    showSection("top");
                    storageData();
                });
            });
        }
        showSection("top");
        if (!doneD) {
            document.querySelector("#question-n-a").innerHTML = "今日の学習があります！";
            document.querySelector("#dashboard").innerHTML += `<a onclick="dq();" class="flexB">デイリー学習</a>`;
        }
        document.querySelector("#dashboard").innerHTML += `<a onclick="review();" class="flexB">見直し</a>`;
        document.querySelector("#dashboard").innerHTML += `<input type="number" class="flexB" id="goal" oninput="goalChange()">`;
        document.querySelector("#goal").value = Number(localStorage.getItem("goal"));
        if (doneD == true) {
            document.querySelector("#question-n-a").innerHTML = "今日はおしまいです！<br>おつかれ様でした！";
        }
    }
}

function showSection(id) {
    page.push(id);
    if (currentSection === id) return;
    document.getElementById(currentSection).classList.add('hidden');
    document.getElementById(currentSection).style.display = "none";
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).style.display = "flex";
    currentSection = id;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function dq() {
    done = 0;
    showSection("question");
    nextKanji(done);
}

function nextKanji() {
    done += 1;
    random = getRandomIntInclusive(0, kanji[level].length - 1);
    var randomKanji = kanji[level][random][0];

    document.querySelector("#random-kanji").innerHTML = randomKanji;
    if (Array.isArray(kanji[level][random][3])) {
        document.querySelector("#on").innerHTML = kanji[level][random][3].join("・");
    } else {
        document.querySelector("#on").innerHTML = kanji[level][random][3];
    }

    if (Array.isArray(kanji[level][random][4])) {
        document.querySelector("#kun").innerHTML = kanji[level][random][4].join("・");
    } else {
        document.querySelector("#kun").innerHTML = kanji[level][random][4];
    }
    document.querySelector("#done").innerHTML = String(done) + "/" + String(localStorage.getItem("goal"));
    document.querySelector("#kanjipedia").href = `https://www.kanjipedia.jp/search?k=${randomKanji}&kt=1&sk=leftHand`;
    document.querySelector("#zi").href = "https://zi.tools/zi/" + randomKanji;
    document.querySelector("#description").value = localStorage.getItem(String(level) + "," + String(random));
}

function inputChange() {
    localStorage.setItem(String(level) + "," + String(random), document.querySelector("#description").value)
}

function goalChange() {
    localStorage.setItem("goal", document.querySelector("#goal").value)
}

function review() {
    showSection("review");
    var htmlKanji = "";
    var memoed = 0;
    for (var n = 0; n < kanji[level].length; n++) {
        if (localStorage.getItem(String(level) + "," + String(n)) == null || localStorage.getItem(String(level) + "," + String(n)) == "") {
            htmlKanji += `<a onclick="showKanji(${n});" class="blue flexB">${kanji[level][n][0]}</a>`
        } else {
            htmlKanji += `<a onclick="showKanji(${n});" class="green flexB">${kanji[level][n][0]}</a>`
            memoed += 1;
        }
    }
    document.querySelector("#kanji-list").innerHTML += htmlKanji;
    document.querySelector("#memoed").innerHTML = memoed + "/" + kanji[level].length;
    document.querySelector("#kanji-list").style.gridTemplateRows = `repeat(${Math.ceil(kanji[level].length / 8)}, 1fr)`;
}

function showKanji(index) {
    showSection("review-kanji");

    var randomKanji = kanji[level][index][0];

    document.querySelector("#review-kanji-kanji").innerHTML = randomKanji;
    if (Array.isArray(kanji[level][index][3])) {
        document.querySelector("#review-kanji-on").innerHTML = kanji[level][index][3].join("・");
    } else {
        document.querySelector("#review-kanji-on").innerHTML = kanji[level][index][3];
    }

    if (Array.isArray(kanji[level][index][4])) {
        document.querySelector("#review-kanji-kun").innerHTML = kanji[level][index][4].join("・");
    } else {
        document.querySelector("#review-kanji-kun").innerHTML = kanji[level][index][4];
    }
    document.querySelector("#review-kanji-kanjipedia").href = `https://www.kanjipedia.jp/search?k=${randomKanji}&kt=1&sk=leftHand`;
    document.querySelector("#review-kanji-zi").href = "https://zi.tools/zi/" + randomKanji;
    document.querySelector("#review-kanji-description").value = localStorage.getItem(String(level) + "," + String(index));
}


// script
document.addEventListener("DOMContentLoaded", function () {
    storageData();
})