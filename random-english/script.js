// Caution: The code is based on "random-noun", so some of the code is not used, but do not mind

let words;

fetch('data.txt')
    .then(response => response.text())
    .then(data => {
        words = data.trim().split(/\r?\n/).join("/");
        words = words.trim().split(" ").join("/");
        words = words.trim().split(".").join("/");
        words = words.split("/");
        console.log(words); // ["apple", "banana"]
    })
    .catch(error => console.error('Error:', error));

var mode = "normal";
var result = "";
var min = 3;
var max = 10;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function numberOf(ch, str) {
    const arr = str;
    const obj = {};
    for (const item of arr) {
        if (obj[item]) {
            obj[item] += 1;
        } else {
            obj[item] = 1;
        }
    }
    return obj[ch];
}

function kanaToHiragana(str) {
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

function make() {
    // intervalId = setInterval(function () {
    //     result += kanaToHiragana(lastWord);
    //     var candidate = [];
    //     var last = 0;
    //     var loop = numberOf(lastWord, data);

    //     for (let i = 0; i < loop; i++) {
    //         if (data[data.indexOf(lastWord, last) + 1] != undefined) {
    //             candidate.push(data[data.indexOf(lastWord, last) + 1]);
    //         }
    //         last = data.indexOf(lastWord, last) + 1;
    //     }

    //     lastWord = candidate[getRandomIntInclusive(0, candidate.length - 1)];
    //     if (lastWord == ";") {
    //         clearInterval(intervalId);
    //     }
    //     document.getElementById("result").innerText = result;
    // }, 1);
    do {
        result = "";
        var data = words.join(";");
        var lastWord = words[getRandomIntInclusive(0, words.length - 1)][0];

        do {
            result += kanaToHiragana(lastWord);
            var candidate = [];
            var last = 0;
            var loop = numberOf(lastWord, data);

            for (let i = 0; i < loop; i++) {
                if (data[data.indexOf(lastWord, last) + 1] != undefined) {
                    candidate.push(data[data.indexOf(lastWord, last) + 1]);
                }
                last = data.indexOf(lastWord, last) + 1;
            }
            if (min > result.length && ((candidate.length != 1) || (candidate.length == 1 && !candidate.includes(";")))) {
                candidate = candidate.filter(item => item !== ";");
            }
            console.log(result.length);
            if (max == result.length) {
                candidate = [";"];
            }
            lastWord = candidate[getRandomIntInclusive(0, candidate.length - 1)];
            document.getElementById("result").innerText = result;
        } while (lastWord != ";");
    } while (!(min <= result.length && result.length <= max));

    if ('speechSynthesis' in window) {
        const uttr = new SpeechSynthesisUtterance();
        uttr.text = result;
        uttr.lang = "en";
        uttr.rate = 1;
        uttr.pitch = 1;
        uttr.volume = 1;
        window.speechSynthesis.speak(uttr);
    }

    document.getElementById("texts").innerHTML += `${result}<br>`
}

const startTime = Date.now();

setInterval(function () {
    var nowTime = (Date.now() - startTime) / 50;
    document.body.style.background = `linear-gradient(0.1turn, hsl(${nowTime} 37% 45%), hsl(${nowTime + 60} 37% 45%))`;
}, 1000 / 30);

document.body.addEventListener("click", function (event) {
    if (event.target.tagName != 'H1' && event.target.tagName != 'SPAN' && mode == "normal") {
        document.getElementById("description").style.color = "#ffffff00";
        make();
    } else if (event.target.className.includes("main") && mode == "setting") {
        mode = "normal";
        document.getElementById("settings").style.display = "none";
        min = document.getElementById("min").value;
        max = document.getElementById("max").value;
    }
}, false);

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        document.getElementById("description").style.color = "#ffffff00";
        make();
    }
});

document.getElementById("setting").addEventListener("click", function (event) {
    if (mode == "normal") {
        mode = "setting";
        document.getElementById("settings").style.display = "flex";
    } else {
        mode = "normal";
        document.getElementById("settings").style.display = "none";
        min = document.getElementById("min").value;
        max = document.getElementById("max").value;
    }
}, false);