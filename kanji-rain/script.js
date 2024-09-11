const canvas = document.getElementById('canvas');
var frame = 0;
var isPaused = 0;
var focalLength = 6;
var prevFocalLenth = 6;
var f = 1.5;
var prevF = 1.5;
var x = 0;
var y = 0;
var xDelta = 0;
var yDelta = 0;

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

function returnPositiveOrZero(num) {
    return num < 0 ? 0 : num;
}

function whiteWithBrightness(n) {
    // nが0%〜100%の範囲かどうか確認
    if (n < 0) n = 0;
    if (n > 100) n = 100;

    // 255（白色のRGB値）に対する割合を計算
    var brightnessValue = Math.round(255 * (n / 100));

    // 十六進数に変換し、2桁の形式に合わせる
    var hex = brightnessValue.toString(16).padStart(2, '0');

    // 同じ値をRGBの全てのチャンネルに適用しHEXを作成
    return `#${hex}${hex}${hex}`;
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
            kanji.style.filter = `blur(${Math.abs(Number(kanji.style.fontSize.replace("vh", "")) - focalLength) / f + returnPositiveOrZero(5 - top) / 2}vh)`;
            kanji.style.color = whiteWithBrightness(returnPositiveOrZero(5 - top) * 20);
        }
    });
}

// 30FPSでの描画更新
let animation = setInterval(draw, 1000 / 30);

document.body.addEventListener('keydown',
    event => {
        if (event.key === ' ') {
            console.log("foo")
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
    focalLength = prevFocalLenth + percentageX;

    var percentageY = (yDelta / maxDelta) * 100 / 50;
    f = prevF + percentageY;

    document.querySelectorAll(".kanji").forEach(kanji => {
        kanji.style.filter = `blur(${Math.abs(Number(kanji.style.fontSize.replace("vh", "")) - focalLength) / f + returnPositiveOrZero(5 - top) / 2}vh)`;
    });
    console.log(f);
};

document.body.onmouseup = e => {
    x = 0;
    y = 0;
    prevFocalLenth = focalLength
    prevF = f;
};


// http://127.0.0.1:5501/kanji-rain/index.html