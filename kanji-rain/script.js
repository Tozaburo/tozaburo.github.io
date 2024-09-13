defineArg();

if (arg.d === undefined) {
    changeQueryWithoutRefresh("d", 6.0);
    defineArg();
}

if (arg.f === undefined) {
    changeQueryWithoutRefresh("f", 1.5);
    defineArg();
}

if (arg.b === undefined) {
    changeQueryWithoutRefresh("b", 1);
    defineArg();
}

const canvas = document.getElementById('canvas');
var frame = 0;
var isPaused = 0;
var distance = Number(arg.d);
var prevDistance = Number(arg.d);
var fStop = Number(arg.f);
var prevFStop = Number(arg.f);
var x = 0;
var y = 0;
var xDelta = 0;
var yDelta = 0;
var timeoutId = null;
var isBlur = Number(arg.b);

if (isBlur === 0) {
    document.getElementById("blur").checked = false;
}

function defineArg() {
    arg = new Object;
    var pair = location.search.substring(1).split('&');
    for (var i = 0; pair[i]; i++) {
        var kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
}

function changeQueryWithoutRefresh(parameter, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(parameter, value);
    const newUrl = `${location.pathname}?${urlParams}`;
    history.pushState(null, '', newUrl);
}

// よりシンプルな範囲内のランダムな数値を取得する関数
function getRandomNumberFromRanges(ranges) {
    const totalWeight = ranges.reduce((acc, [min, max]) => acc + max - min + 1, 0);
    let randomWeight = Math.random() * totalWeight;

    for (const [min, max] of ranges) {
        const weight = max - min + 1;
        if (randomWeight < weight) {
            return Math.floor(Math.random() * weight) + min;
        }
        randomWeight -= weight;
    }
}

// ランダムな漢字を生成する関数
function randomKanji() {
    // const ranges = [[19968, 40908], [11904, 12031], [63744, 64217], [131072, 196607]];
    const ranges = [[19968, 40908], [11904, 12031], [63744, 64217]];
    return String.fromCodePoint(getRandomNumberFromRanges(ranges));
}

// ランダムな範囲の数値を取得する関数
const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

function draw() {
    frame++;
    // 新しい漢字の追加
    if (frame % 30 == 0) {
        const newKanji = document.createElement('a');
        newKanji.textContent = randomKanji();
        newKanji.classList.add("kanji");
        newKanji.style.fontSize = `${getRandomArbitrary(1, 10)}vh`;
        newKanji.style.top = "0vh";
        newKanji.style.left = `${getRandomArbitrary(0, 100)}vw`;
        newKanji.href = "https://zi.tools/zi/" + newKanji.textContent;
        newKanji.target = "_blank";
        newKanji.rel = "noopener noreferrer";
        newKanji.draggable = false;
        canvas.appendChild(newKanji);
    }

    // 漢字の移動処理
    document.querySelectorAll(".kanji").forEach(kanji => {
        const top = parseFloat(kanji.style.top);
        if (top > 100) {
            kanji.remove();
        } else {
            kanji.style.top = `${top + parseFloat(kanji.style.fontSize) / 20}vh`;
            if (isBlur == 1) {
                kanji.style.filter = `blur(${Math.abs(Number(kanji.style.fontSize.replace("vh", "")) - distance) / fStop + Math.max(5 - top, 0) / 2}vh)`;
            }
            kanji.style.opacity = Math.max(top, 1) / 5;
        }
    });
}

// 30FPSでの描画更新
let animation = setInterval(draw, 1000 / 30);

document.body.addEventListener('keydown',
    event => {
        if (event.key === ' ') {
            switch (isPaused) {
                case 0:
                    clearInterval(animation);
                    isPaused = 1;
                    break;
                case 1:
                    animation = setInterval(draw, 1000 / 30);
                    isPaused = 0;
                    break;
            }
        }
    });

document.body.onmousedown = e => {
    x = e.clientX;
    y = e.clientY;
};

document.body.onmousemove = e => {
    if (x == 0 || y == 0) {
        return;
    }
    xDelta = x - e.clientX;
    yDelta = y - e.clientY;

    var maxDelta = 200;

    var percentageX = (xDelta / maxDelta) * 100 / 100;
    distance = prevDistance + percentageX;

    var percentageY = (yDelta / maxDelta) * 100 / 50;
    fStop = Math.max(prevFStop + percentageY, 0.1);

    if (isBlur == 1) {
        document.querySelectorAll(".kanji").forEach(kanji => {
            kanji.style.filter = `blur(${Math.abs(Number(kanji.style.fontSize.replace("vh", "")) - distance) / fStop + Math.max(5 - top, 0) / 2}vh)`;
        });
    }

    // 既存の遅延があればクリア
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
    }

    // 新しい遅延を設定
    timeoutId = setTimeout(() => {
        changeQueryWithoutRefresh("f", fStop.toFixed(1));
        changeQueryWithoutRefresh("d", distance.toFixed(1));
    }, 1000);
};

document.body.onmouseup = e => {
    x = 0;
    y = 0;
    prevDistance = distance
    prevFStop = fStop;
};


// http://127.0.0.1:5501/kanji-rain/index.html

var desc = document.getElementById("description");

desc.animate(
    [
        {
            transform: "translate(0, 12vmin)"
        },
        {
            transform: "translate(0, 0vmin)"
        }
    ], {
    duration: 500,
    fill: "forwards",
    easing: "ease-in-out"
});
setTimeout(() => {
    desc.animate(
        [
            {
                transform: "translate(0, 0vmin)"
            },
            {
                transform: "translate(0, -12vmin)"
            }
        ], {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out"
    });
    setTimeout(() => {
        desc.innerText = "Drag your mouse up and down to change the focal stop"
        desc.animate(
            [
                {
                    transform: "translate(0, 12vmin)"
                },
                {
                    transform: "translate(0, 0vmin)"
                }
            ], {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out"
        });
        setTimeout(() => {
            desc.animate(
                [
                    {
                        transform: "translate(0, 0vmin)"
                    },
                    {
                        transform: "translate(0, -12vmin)"
                    }
                ], {
                duration: 500,
                fill: "forwards",
                easing: "ease-in-out"
            });
            setTimeout(() => {
                desc.innerText = "Press space key to pause"
                desc.animate(
                    [
                        {
                            transform: "translate(0, 12vmin)"
                        },
                        {
                            transform: "translate(0, 0vmin)"
                        }
                    ], {
                    duration: 500,
                    fill: "forwards",
                    easing: "ease-in-out"
                });
                setTimeout(() => {
                    desc.animate(
                        [
                            {
                                transform: "translate(0, 0vmin)"
                            },
                            {
                                transform: "translate(0, -12vmin)"
                            }
                        ], {
                        duration: 500,
                        fill: "forwards",
                        easing: "ease-in-out"
                    });
                    document.querySelector(".description-wrapper").animate(
                        [
                            {
                                opacity: "1"
                            },
                            {
                                opacity: "0"
                            }
                        ], {
                        duration: 500,
                        fill: "forwards",
                        easing: "ease-in-out"
                    });
                }, 4000);
            }, 500);
        }, 4000);
    }, 500);
}, 4000);

document.getElementById("blur").onchange = e => {
    changeQueryWithoutRefresh("b", e.target.checked ? 1 : 0);
    isBlur = e.target.checked ? 1 : 0;
}