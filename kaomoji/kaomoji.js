var space = "";
var earLeft = "";
var earRight = "";

function convert() {
    var input = document.querySelector("#input").value;
    input = input.replace(/\n/g, '');
    var result = '';
    for (var n = 0; n < input.length; n += 2) {
        var firstChar = input[n];
        var secondChar = input[n + 1];

        if (secondChar !== undefined) {
            result += earLeft + "(" + space + firstChar + space + "_" + space + secondChar + space + ")" + earRight + " ";
        }
    }
    document.querySelector("#output").value = result;
}

function changeSpace() {
    if (space == "") {
        space = " ";
        if (lang == "ja"){
            document.querySelector("#space").innerHTML = "◀&emsp;空白あり&emsp;▶"
        } else {
            document.querySelector("#space").innerHTML = "◀&emsp;with space&emsp;▶"
        }
    } else {
        space = "";
        if (lang == "ja"){
            document.querySelector("#space").innerHTML = "◀&emsp;空白なし&emsp;▶"
        } else {
            document.querySelector("#space").innerHTML = "◀&emsp;with out space&emsp;▶"
        }
    }
}

function changeEar() {
    if (earLeft == "") {
        earLeft = "c";
        earRight = "ɔ"
        if (lang == "ja"){
            document.querySelector("#ear").innerHTML = "◀&emsp;耳あり&emsp;▶"
        } else {
            document.querySelector("#ear").innerHTML = "◀&emsp;with ear&emsp;▶"
        }
    } else {
        earLeft = "";
        earRight = ""
        if (lang == "ja"){
            document.querySelector("#ear").innerHTML = "◀&emsp;耳なし&emsp;▶"
        } else {
            document.querySelector("#ear").innerHTML = "◀&emsp;with out ear&emsp;▶"
        }
    }
}

var englishMainHtml = `
<div class="title">
    <h1>Emoticon Generator</h1>
    <p>Converting any sentence to Emotion</p>
</div>
<div class="input">
    <textarea class="input" id="input"></textarea>
    <a onclick="convert()">↓Convert↓</a>
</div>
<div class="output">
    <textarea class="input" id="output"></textarea>
</div>
<div class="detail">
    <h2>Setting<span>⚙️</span></h2>
    <a onclick="changeSpace()" id="space">◀&emsp;with space&emsp;▶</a>
    <a onclick="changeEar()" id="ear">◀&emsp;with ear&emsp;▶</a>
</div>
  `;

var japaneseMainHtml = `<div class="title">
<h1>顔文字ジェネレーター</h1>
<p>どんな文章も顔文字にします。</p>
</div>
<div class="input">
<textarea class="input" id="input"></textarea>
<a onclick="convert()">↓変換↓</a>
</div>
<div class="output">
<textarea class="input" id="output"></textarea>
</div>
<div class="detail">
<h2>設定<span>⚙️</span></h2>
<a onclick="changeSpace()" id="space">◀&emsp;空白なし&emsp;▶</a>
<a onclick="changeEar()" id="ear">◀&emsp;耳なし&emsp;▶</a>
</div>`