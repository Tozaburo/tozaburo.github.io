const input = document.getElementById('input');

let font;
let fontSize = 1000;
let x = 0;

input.focus();

input.onblur = () => {
    input.focus();
};

function preload() {
    font = loadFont("https://tozaburo.github.io/NotoSansJP-Variable.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textFont(font);
    textAlign(LEFT, BOTTOM);
}
function findIndexRange(arr, target) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (target <= sum) {
            return i;
        }
    }
    return -1;
}

function draw() {
    background(0);
    const time = millis();
    const inputValue = input.value;
    const splittedInput = inputValue.split("\n");
    const cursor = input.selectionStart;
    const inputCursorPerRow = splittedInput.map((str, index, arr) => str.length + (index === 0 ? 0 : 1));
    const inputLengthPerRow = splittedInput.map(str => str.length);
    
    const cursorRow = findIndexRange(inputCursorPerRow, cursor);
    const cursorInRow = cursor - inputCursorPerRow.slice(0, cursorRow).reduce((acc, val) => acc + val, 0);

    let originalSize = textSize();

    const beforeCursor = splittedInput[cursorRow].slice(0, cursorInRow);
    const afterCursor = splittedInput[cursorRow].slice(cursorInRow);



    textSize(1);
    const relativeSize = textWidth(beforeCursor);
    textSize(originalSize);
    let fontSize = textSize();
    const dynamicSize = 1920 / (relativeSize + 5);
    fontSize += (Math.max(dynamicSize, 200) - textSize()) / 20;

    x += ((relativeSize * fontSize) * -1 - x) / 20;

    textSize(fontSize);
    const cursorX = textWidth(beforeCursor);

    text(inputValue, x, fontSize);

    if (Math.round(time / 500) % 2 === 0) {
        noStroke();
        fill(255);
        rect(x + cursorX, fontSize * -0.2, 2, fontSize * 1.2);
    }
}