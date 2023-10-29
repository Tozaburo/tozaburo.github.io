var yoji = yojiList[getRandomInt(0, yojiList.length)];
var able = 1;
var copyText = [];

window.addEventListener("DOMContentLoaded", function () {
    new ClipboardJS('#copy');

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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

document.getElementById("input").addEventListener("keypress", function (event) {
    if (event.key === "Enter" && able == 1) {
        var yojiInput = document.getElementById("input").value;
        addYojijukugo(yojiInput);
        event.preventDefault();
    }
});

function countCharacter(str, char) {
    let count = 0;
    // 文字列をループして、各文字が目的の文字かどうかをチェック
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count++;  // 文字が一致した場合、カウントを増やす
        }
    }
    return count; // カウントした数を返す
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function addYojijukugo(yojiInput) {
    able = 0;
    var textCount = [];
    if (yojiInput.length != 4 || !yojiList.includes(yojiInput)) {
        if (yojiInput != "q" && yojiInput != "Q" && yojiInput != "w" && yojiInput != "W") {
            document.querySelector("#input").classList.add('error');
            setTimeout(() => {
                document.querySelector("#input").classList.remove('error');
            }, 500);
            able = 1;
            return;
        }
    }
    document.querySelector("#input").value = "";
    var text = "";
    if (yojiInput == "w" || yojiInput == "W") {
        yojiInput = yojiList[getRandomInt(0, yojiList.length)];
    }
    if (yojiInput == "q" || yojiInput == "Q") {
        text = "🟦🟦🟦🟦"
        for (var n = 0; n < 4; n++) {
            var newElement = document.createElement("h1");
            var newContent = document.createTextNode(yoji[n]);
            newElement.appendChild(newContent);
            newElement.setAttribute("class", "blue");
            var parentDiv = document.querySelector(".text");
            parentDiv.appendChild(newElement);
            await delay(200);
        }
        copyText.push(text);
        gameOver();
    } else {
        for (var n = 0; n < 4; n++) {
            if (textCount.includes(yojiInput[n])) {
                textCount[textCount.indexOf(yojiInput[n]) + 1] += 1;
            } else {
                textCount.push(yojiInput[n]);
                textCount.push(1);
            }
            if (yojiInput[n] == yoji[n]) {
                var newElement = document.createElement("h1");
                var newContent = document.createTextNode(yojiInput[n]);
                newElement.appendChild(newContent);
                newElement.setAttribute("class", "green");
                var parentDiv = document.querySelector(".text");
                parentDiv.appendChild(newElement);
                text += "🟩";
            } else if (yoji.includes(yojiInput[n])) {
                if (countCharacter(yoji, yojiInput[n]) >= textCount[textCount.indexOf(yojiInput[n]) + 1]) {
                    var newElement = document.createElement("h1");
                    var newContent = document.createTextNode(yojiInput[n]);
                    newElement.appendChild(newContent);
                    newElement.setAttribute("class", "yellow");
                    var parentDiv = document.querySelector(".text");
                    parentDiv.appendChild(newElement);
                    text += "🟨";
                } else {
                    var newElement = document.createElement("h1");
                    var newContent = document.createTextNode(yojiInput[n]);
                    newElement.appendChild(newContent);
                    newElement.setAttribute("class", "none");
                    var parentDiv = document.querySelector(".text");
                    parentDiv.appendChild(newElement);
                    text += "⬜";
                }
            } else {
                var newElement = document.createElement("h1");
                var newContent = document.createTextNode(yojiInput[n]);
                newElement.appendChild(newContent);
                newElement.setAttribute("class", "none");
                var parentDiv = document.querySelector(".text");
                parentDiv.appendChild(newElement);
                text += "⬜";
            }
            smoothScrollToBottom(1000);
            await delay(200);
        }
        copyText.push(text);
    }
    if (yoji == yojiInput) {
        gameClear();
    }
    able = 1;
}

function gameClear() {
    copyText.push("");
    copyText.push("四字dle");
    copyText.push("https://tozaburo.github.io/yojidle");
    document.querySelector(".popup").style.display = "flex";
    document.querySelector(".popup").classList.add("flexB");
    document.querySelector(".popup").classList.add("flexC");
    document.querySelector("#copy").setAttribute("data-clipboard-text", copyText.join("\n"));
    document.querySelector("#copy").innerHTML = copyText.join("<br>");
    document.querySelector("#alert").style.color = "#e05151";
}

function gameOver() {
    copyText.push("");
    copyText.push("四字dle");
    copyText.push("https://tozaburo.github.io/yojidle");
    document.querySelector(".popup").style.display = "flex";
    document.querySelector(".popup").classList.add("flexB");
    document.querySelector(".popup").classList.add("flexC");
    document.querySelector("#copy").setAttribute("data-clipboard-text", copyText.join("\n"));
    document.querySelector("#copy").innerHTML = copyText.join("<br>");
    document.querySelector("#alert").style.color = "#128185";
    document.querySelector("#alert").style.fontFamily = "'Zen Maru Gothic', sans-serif";
    document.querySelector("#alert").innerHTML = yoji;
}

function smoothScrollToBottom(duration) {
    // 最下部までのスクロール位置を計算します
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const distanceToBottom = scrollHeight - scrollTop;

    // 現在の位置からスムーズにスクロールするためのアニメーションを作成します
    let start = null;

    // アニメーションステップを処理する関数
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const position = easeInOutCubic(progress, scrollTop, distanceToBottom, duration);

        window.scrollTo(0, position);

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// イージング関数 (ここでは easeInOutCubic を使用)
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}
