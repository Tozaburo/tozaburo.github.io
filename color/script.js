new ClipboardJS('.item');
var num = 2;

// clipboard.jsのインスタンスを作成
const clipboard = new ClipboardJS('.item');

// コピーが成功した場合のイベント
clipboard.on('success', function (e) {
    // e.clearSelection();
});

// コピーが失敗した場合のイベント
clipboard.on('error', function (e) {
});


let timeoutId = null;
document.querySelector("#hex").value = "#" + location.search.replace("?", "");
updateColor();

function changeQueryWithoutRefresh(newQuery) {
    history.pushState(null, '', `${location.pathname}?${newQuery}`);
}


function hsv2hex(h, s, v) {
    s /= 100;
    v /= 100;
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h / 60);
    f = (h / 60) - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


function hex2hsv(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max == 0 ? 0 : d / max;
    if (max == min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), parseFloat((s * 100).toFixed(1)), parseFloat((v * 100).toFixed(1))];
}

function updateColor() {
    if (!document.querySelector("#hex").value.includes("#")) {
        document.querySelector("#hex").value = "#" + document.querySelector("#hex").value;
    }

    var hex = document.querySelector("#hex").value;
    if (isValidHex(hex)) {
        var hsv = hex2hsv(hex);

        document.querySelector("#hList").style.height = "0vmin";
        document.querySelector("#sList").style.height = "0vmin";
        document.querySelector("#vList").style.height = "0vmin";
        setTimeout(() => {
            document.querySelector("#hList").innerHTML = "";
            document.querySelector("#sList").innerHTML = "";
            document.querySelector("#vList").innerHTML = "";
        }, 300)

        // CSS変数 `--hex` の値を `#ff0000` に設定
        document.documentElement.style.setProperty('--hex', hex);

        document.querySelector("#h").innerHTML = "H: " + hsv[0];
        document.querySelector("#s").innerHTML = "S: " + hsv[1];
        document.querySelector("#v").innerHTML = "V: " + hsv[2];

        document.querySelector("#hRange").value = hsv[0];
        document.querySelector("#sRange").value = hsv[1];
        document.querySelector("#vRange").value = hsv[2];

        // 既存の遅延があればクリア
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        // 新しい遅延を設定
        timeoutId = setTimeout(() => {
            // hexから"#"を取り除いて関数を実行
            changeQueryWithoutRefresh(hex.replace("#", ""));
        }, 1000); // 最後の変更から1秒後に実行

    }
}

function color(hsvN) {
    var id = "#" + (hsvN == 0 ? "h" : hsvN == 1 ? "s" : "v") + "List";
    var list = document.querySelector(id);
    if (list.style.height == "0vmin") {
        list.style.height = "10vmin";
        var items = "";
        var hsv = hex2hsv(document.querySelector("#hex").value);
        for (var n = 0; n < num; n++) {
            var hex = hsvN == 0 ? hsv2hex(hsv[0] + n / num * 360 % 360, hsv[1], hsv[2]) : hsvN == 1 ? hsv2hex(hsv[0], ((hsv[1] + n / num * 100) % 100), hsv[2]) : hsv2hex(hsv[0], hsv[1], ((hsv[2] + n / num * 100) % 100));
            if (n == 0) {
                items += `<div class="item flexB start" onContextmenu="document.querySelector('#hex').value = '${hex}'; updateColor();" style="background-color: ${hex};" data-clipboard-text="${hex}"></div>`;
            } else if (n == num - 1) {
                items += `<div class="item flexB end" onContextmenu="document.querySelector('#hex').value = '${hex}'; updateColor();" style="background-color: ${hex};" data-clipboard-text="${hex}"></div>`;
            } else {
                items += `<div class="item flexB" onContextmenu="document.querySelector('#hex').value = '${hex}'; updateColor();" style="background-color: ${hex};" data-clipboard-text="${hex}"></div>`;
            }
        }
        list.innerHTML = items;
    } else {
        list.style.height = "0vmin";
        setTimeout(() => {
            list.innerHTML = "";
        }, 300)
    }
}

function isValidHex(hex) {
    // `#`で始まり、その後に3桁または6桁の16進数が続く文字列のみを有効とする正規表現
    const pattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    return pattern.test(hex);
}

function padNumber(number, length) {
    var str = number.toString();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function randomColor() {
    document.querySelector("#hex").value = "#" + padNumber(getRandomInt(0, 256).toString(16), 2) + padNumber(getRandomInt(0, 256).toString(16), 2) + padNumber(getRandomInt(0, 256).toString(16), 2);
    updateColor();
}

// .item クラスを持つすべての要素を取得
var items = document.querySelectorAll('.item');

const result = document.querySelector(".result");

document.querySelector("#hex").addEventListener("input", (event) => {
    updateColor();
});

document.querySelector("#hRange").addEventListener("input", (event) => {
    document.querySelector("#hex").value = hsv2hex(Number(event.target.value), Number(document.querySelector("#sRange").value), Number(document.querySelector("#vRange").value));
    updateColor();
});

document.querySelector("#sRange").addEventListener("input", (event) => {
    document.querySelector("#hex").value = hsv2hex(Number(document.querySelector("#hRange").value), Number(event.target.value), Number(document.querySelector("#vRange").value));
    updateColor();
});

document.querySelector("#vRange").addEventListener("input", (event) => {
    document.querySelector("#hex").value = hsv2hex(Number(document.querySelector("#hRange").value), Number(document.querySelector("#sRange").value), Number(event.target.value));
    updateColor();
});

document.querySelector("#num").addEventListener("input", (event) => {
    num = event.target.value;
    updateColor();
});