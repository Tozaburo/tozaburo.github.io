// const url = 'https://cdn.jsdelivr.net/npm/js-pixel-fonts@1.6.0/data/seven-plus.json';
const url = 'https://cdn.jsdelivr.net/npm/js-pixel-fonts@1.6.0/data/slumbers.json';
const pixelGap = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const container = document.getElementById("container");
const text = document.getElementById("text");
const convert = document.getElementById("convert");

let font = {};

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // font = data;
        font = data.glyphs;
        console.log(font);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

function text2pixels(_string) {
    let result = [];
    let string = _string.split("");
    string.forEach((text, index) => {
        if (Object.keys(font).some(key => key.includes(text))) {
            if (index !== 0) {
                result = mergeArrays(result, pixelGap);
            }
            if (text === " ") {
                result = mergeArrays(result, pixelGap);
            } else {
                result = mergeArrays(result, adjustArray(font[text]));
            }
        } else {
            result = mergeArrays(result, pixelGap);
        }
    });
    return result;
}

function text2subpixels(string) {
    let result = text2pixels(string);
    // let result = renderLine(string, font);
    result = result.map(row => chunkArrayWithPadding(row, 3));
    console.log(result);
    result = result.map(row => {
        return row.map(pixels => {
            return rgb2Hex(pixels);
        });
    });

    return result;
}

function adjustArray(data) {
    const offset = data.offset;
    const pixels = data.pixels;


    const zerosToInsert = 5 - pixels.length;


    const leadingZeros = Array(offset).fill([0, 0, 0]);


    const trailingZeros = Array(zerosToInsert - offset).fill([0, 0, 0]);


    const result = [...leadingZeros, ...pixels, ...trailingZeros];

    return result.slice(0, 5);
}

convert.onclick = e => {
    const pixels = text2subpixels(text.value.toUpperCase());
    console.log(pixels);
    // const height = pixels.length;
    // const width = pixels[0].length;
    // container.style.height = `${height}px`;
    // container.style.width = `${width}px`;
    // // grid-template-rows: repeat(7, 1fr);
    // // grid-template-columns: repeat(6, 1fr);
    // container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    // container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    // let html = "";
    // pixels.forEach(rows => {
    //     rows.forEach(pixel => {
    //         html += `<div class="dot" style="background-color: ${pixel};"></div>`;
    //     })
    // })
    // container.innerHTML = html;
    drawCanvas(pixels);
}

function mergeArrays(arr1, arr2) {
    const maxLength = Math.max(arr1.length, arr2.length);
    const merged = [];

    for (let i = 0; i < maxLength; i++) {
        const subArr1 = arr1[i] || [];
        const subArr2 = arr2[i] || [];
        merged.push([...subArr1, ...subArr2]);
    }

    return merged;
}

function chunkArrayWithPadding(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        while (chunk.length < chunkSize) {
            chunk.push(0);
        }
        result.push(chunk);
    }
    return result;
}

function rgb2Hex(rgbArray) {
    return '#' + rgbArray.map(val => {
        const hex = Math.round(val * 255).toString(16).padStart(2, '0');
        return hex;
    }).join('');
};

function drawCanvas(data) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // キャンバスの幅と高さをデータに基づいて設定
    const height = data.length; // 配列の行数
    const width = Math.max(...data.map(row => row.length)); // 最大列数
    canvas.width = width;
    canvas.height = height;

    // 左上から右下に向かう形で描画
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = data[y][x] || "#000000"; // データがない場合は黒色
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1); // 1px の四角形を描画
        }
    }
}