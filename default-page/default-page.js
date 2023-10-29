// AIzaSyCIybGpYAlOaCjAKN9BEeKCBfWUFxrIXFc

var emojiName = "";
var randomKanji = "";
var choosedFont = "";

window.addEventListener("DOMContentLoaded", function () {
    new ClipboardJS('.colorBox');

    // clipboard.jsのインスタンスを作成
    const clipboard = new ClipboardJS('#button');

    // コピーが成功した場合のイベント
    clipboard.on('success', function (e) {
        // e.clearSelection();
    });

    // コピーが失敗した場合のイベント
    clipboard.on('error', function (e) {
    });
});

if (localStorage.getItem("gw") == null) {
    localStorage.setItem("gw", 0);
}
var gw = localStorage.getItem("gw");

if (localStorage.getItem("lang") == null) {
    localStorage.setItem("lang", navigator.languages[0]);
}
var lang = localStorage.getItem("lang");

if (localStorage.getItem("bookmark") == null) {
    localStorage.setItem("bookmark", "[]");
}
var bookmark = convertStringToArray(localStorage.getItem("bookmark"));

function langChange() {
    localStorage.setItem("lang", document.querySelector("#language").value);
}

function addBookmark() {
    document.querySelector(".popup-wrap").style.display = "flex";
}

function confirm() {
    var url = document.querySelector("#url").value;
    var title = document.querySelector("#btitle").value;
    console.log(title);
    bookmark.push([url, title]);
    localStorage.setItem("bookmark", convertArrayToString(bookmark));
    updateBookmark();
    document.querySelector(".popup-wrap").style.display = "none";
}

function updateBookmark() {
    document.querySelector(".bookmark").innerHTML = "<p>Right click to delete</p>";
    for (var n = 0; n < bookmark.length; n++) {
        document.querySelector(".bookmark").innerHTML += `<a href="${bookmark[n][0]}" oncontextmenu="removeBookmark(${n})" style="font-size: ${12 * (1 / Math.ceil(Math.sqrt(bookmark[n][1].length)))}vmin;">${bookmark[n][1]}</a>`;
    }
    document.querySelector(".bookmark").innerHTML += `<a onclick="addBookmark()" class="add">⊕</a>`;
}

function removeBookmark(n) {
    bookmark.splice(n, 1);
    localStorage.setItem("bookmark", convertArrayToString(bookmark));
    updateBookmark();
}

function convertStringToArray(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.error("入力された文字列が正しいJSON形式ではありません:", str);
        return null;
    }
}

function convertArrayToString(array) {
    try {
        return JSON.stringify(array);
    } catch (e) {
        console.error("入力された値が正しくない:", array);
        return null;
    }
}

function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function padNumber(number, length) {
    var str = number.toString();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function hex2rgb(hex) {
    if (hex.slice(0, 1) == "#") hex = hex.slice(1);
    if (hex.length == 3) hex = hex.slice(0, 1) + hex.slice(0, 1) + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3);

    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (str) {
        return parseInt(str, 16);
    });
}

function rgb2txt(rgb) {
    var txt = [];
    var rgbmost = 0;
    var most = 0;
    // Red, Yellow, Green, Cian, Blue, Magenta
    var threshold = 0.5;

    if (rgb[0] > rgb[1] && rgb[0] > rgb[2]) {
        // R
        rgbmost = 0;
        if (rgb[1] > rgb[2]) {
            if (rgb[1] / rgb[0] < threshold) {
                most = 0;
                txt.push("Red");
            } else {
                most = 1;
                txt.push("Yellow");
            }
        } else {
            if (rgb[2] / rgb[0] < threshold) {
                most = 0;
                txt.push("Red");
            } else {
                most = 5;
                txt.push("Magenta");
            }
        }
    } else if (rgb[1] > rgb[0] && rgb[1] > rgb[2]) {
        // G
        rgbmost = 1;
        if (rgb[0] > rgb[2]) {
            if (rgb[0] / rgb[1] < threshold) {
                most = 2;
                txt.push("Green");
            } else {
                most = 1;
                txt.push("Yellow");
            }
        } else {
            if (rgb[2] / rgb[1] < threshold) {
                most = 2;
                txt.push("Green");
            } else {
                most = 3;
                txt.push("Cyan");
            }
        }
    } else {
        // B
        rgbmost = 2;
        if (rgb[0] > rgb[1]) {
            if (rgb[0] / rgb[2] < threshold) {
                most = 4;
                txt.push("Blue");
            } else {
                most = 5;
                txt.push("Magenta");
            }
        } else {
            if (rgb[1] / rgb[2] < threshold) {
                most = 4;
                txt.push("Blue");
            } else {
                most = 5;
                txt.push("Cyan");
            }
        }
    }

    if (rgb[rgbmost] > 128) {
        txt.push("Light");
    } else {
        txt.push("Dark");
    }

    if (most == 0) {
        if (rgb[1] > rgb[2]) {
            txt.push("Yellowish")
        } else {
            txt.push("Purplish")
        }
    } else if (most == 1) {
        if (rgb[0] > rgb[1]) {
            txt.push("Redish")
        } else {
            txt.push("Greenish")
        }
    } else if (most == 2) {
        if (rgb[0] > rgb[2]) {
            txt.push("Yellowish")
        } else {
            txt.push("Cyan-ish")
        }
    } else if (most == 3) {
        if (rgb[1] > rgb[2]) {
            txt.push("Greenish")
        } else {
            txt.push("Blueish")
        }
    } else if (most == 4) {
        if (rgb[0] > rgb[1]) {
            txt.push("Magentaish")
        } else {
            txt.push("Cyan-ish")
        }
    } else {
        if (rgb[0] > rgb[2]) {
            txt.push("Redish")
        } else {
            txt.push("Blueish")
        }
    }

    return txt[1] + " " + txt[2] + " " + txt[0];
}

function hex2txt(hex) {
    return rgb2txt(hex2rgb(hex));
}

function copyToClipboard(tagValue) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(tagValue).then(function () {
            // messageActive()
        })
    }
}

function copy(num) {
    if (num == 1) {
        copyToClipboard(color1);
    }
}

function removeAfterCommaSpace(str) {
    var index = str.indexOf(', ');
    if (index === -1) return str;
    return str.substring(0, index);
}

function viewEmoji() {
    location.href = "https://emojipedia.org/search/?q=" + document.querySelector("#emoji").innerHTML;
}

function viewKanji() {
    location.href = "https://zi.tools/zi/" + randomKanji;
}

function viewFont() {
    location.href = "https://fonts.google.com/?query=" + choosedFont;
}


function unicode2Text(unicode) {
    return String.fromCodePoint(`0x${unicode}`);
}

function getRandomNumberFromRanges(ranges) {
    let totalWeight = 0;
    const cumulativeWeights = [];

    ranges.forEach(range => {
        const [min, max] = range;
        const weight = max - min + 1;
        totalWeight += weight;
        cumulativeWeights.push(totalWeight);
    });

    const randomWeight = Math.random() * totalWeight;
    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (randomWeight < cumulativeWeights[i]) {
            const [min, max] = ranges[i];
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}

const API_KEY = 'AIzaSyCIybGpYAlOaCjAKN9BEeKCBfWUFxrIXFc';
let fontsList = [];
async function loadFontsList() {
    try {
        const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY);
        const data = await result.json();
        console.log('loaded google fonts list: ', data.items.length);
        return data.items;
    } catch (error) {
        console.log('loadFontsList', error, error.message);
    }
}
function loadRandomFont(fontsList) {
    const randomIndex = Math.floor(Math.random() * fontsList.length);
    const choosedFont = fontsList[randomIndex].family;
    WebFont.load({
        google: {
            families: [choosedFont]
        }
    });
    console.log('choosed font: ', choosedFont);
    return choosedFont;
}
async function main() {
    fontsList = await loadFontsList();
    choosedFont = loadRandomFont(fontsList);
    document.querySelector("#font").style.fontFamily = choosedFont;
    document.querySelector("#font").innerHTML = choosedFont;
    document.querySelector("#font").style.fontSize = String(40 / choosedFont.length) + "vmin";
}

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector(".popup-wrap").style.display = "none";

    // Google
    document.getElementById("googleInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            location.href = "https://www.google.com/search?q=" + document.getElementById("googleInput").value
            event.preventDefault();
        }
    });

    // Wikipedia
    document.getElementById("wikipediaInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            location.href = "https://" + document.querySelector("#language").value + ".wikipedia.org/wiki/" + document.getElementById("wikipediaInput").value
            event.preventDefault();
        }
    });

    // Wikipedia Language
    var userLanguages = navigator.languages;
    for (var n = 0; n < userLanguages.length; n++) {
        if (userLanguages[n].length < 3) {
            if (userLanguages[n] == lang) {
                document.querySelector("#language").innerHTML = `<option value="${userLanguages[n]}">${userLanguages[n]}</option>` + document.querySelector("#language").innerHTML;
            } else {
                document.querySelector("#language").innerHTML += `<option value="${userLanguages[n]}">${userLanguages[n]}</option>`
            }
        }
    }

    // Google / Wikipedia Switch
    if (gw == 0) {
        document.querySelector('#gw').checked = false;
        document.querySelector('.toggle').classList.remove('checked');
        document.querySelector("#google").style.display = "flex";
        document.querySelector("#wikipedia").style.display = "none";
    } else {
        document.querySelector('#gw').checked = true;
        document.querySelector('.toggle').classList.add('checked');
        document.querySelector("#google").style.display = "none";
        document.querySelector("#wikipedia").style.display = "flex";
    }

    document.querySelector('.toggle').addEventListener('click', function () {
        this.classList.toggle('checked');
        if (!document.querySelector('#gw').checked) {
            document.querySelector('#gw').checked = true;
            document.querySelector("#google").style.display = "none";
            document.querySelector("#wikipedia").style.display = "flex";
            gw = 1;
            localStorage.setItem("gw", 1);
        } else {
            document.querySelector('#gw').checked = false;
            document.querySelector("#google").style.display = "flex";
            document.querySelector("#wikipedia").style.display = "none";
            gw = 0;
            localStorage.setItem("gw", 0);
        }
    });

    // Bookmark
    updateBookmark();

    // Random Color
    var hex1 = "#" + padNumber(getRandomInt(0, 255).toString(16), 2) + padNumber(getRandomInt(0, 255).toString(16), 2) + padNumber(getRandomInt(0, 255).toString(16), 2);
    var hex2 = "#" + padNumber(getRandomInt(0, 255).toString(16), 2) + padNumber(getRandomInt(0, 255).toString(16), 2) + padNumber(getRandomInt(0, 255).toString(16), 2);
    var hex3 = "#" + padNumber(getRandomInt(0, 255).toString(16), 2) + padNumber(getRandomInt(0, 255).toString(16), 2) + padNumber(getRandomInt(0, 255).toString(16), 2);
    var hex4 = "#" + padNumber(getRandomInt(0, 255).toString(16), 2) + padNumber(getRandomInt(0, 255).toString(16), 2) + padNumber(getRandomInt(0, 255).toString(16), 2);
    document.querySelector("#color1").style.backgroundColor = hex1;
    document.querySelector("#color2").style.backgroundColor = hex2;
    document.querySelector("#color3").style.backgroundColor = hex3;
    document.querySelector("#color4").style.backgroundColor = hex4;

    document.querySelector("#color1").setAttribute("data-clipboard-text", hex1);
    document.querySelector("#color2").setAttribute("data-clipboard-text", hex2);
    document.querySelector("#color3").setAttribute("data-clipboard-text", hex3);
    document.querySelector("#color4").setAttribute("data-clipboard-text", hex4);

    document.querySelector("#ch1").innerHTML = hex1;
    document.querySelector("#ch2").innerHTML = hex2;
    document.querySelector("#ch3").innerHTML = hex3;
    document.querySelector("#ch4").innerHTML = hex4;

    document.querySelector("#ch1").value = hex1;
    document.querySelector("#ch2").value = hex2;
    document.querySelector("#ch3").value = hex3;
    document.querySelector("#ch4").value = hex4;

    document.querySelector("#cd1").innerHTML = hex2txt(hex1);
    document.querySelector("#cd2").innerHTML = hex2txt(hex2);
    document.querySelector("#cd3").innerHTML = hex2txt(hex3);
    document.querySelector("#cd4").innerHTML = hex2txt(hex4);

    // Kanji
    // U+4E00 - U+9FCC, U+2E80 - U+2EFF, U+F900 - U+FAD9, U+20000 - U+2FFFF
    // 19968 - 40908, 11904 - 12031, 63744 - 64217, 131072 - 196607
    // .toString(16)
    var randomKanjiUnicode = getRandomNumberFromRanges([[19968, 40908], [11904, 12031], [63744, 64217], [131072, 196607]]).toString(16)
    randomKanji = unicode2Text(randomKanjiUnicode);
    document.querySelector("#kanji").innerHTML = randomKanji;

    // Font
    main();
});

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