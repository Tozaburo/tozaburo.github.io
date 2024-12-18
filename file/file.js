var vname = "";
var result = "";
var ntype = "";
var last = "";

window.addEventListener("load", () => {
  const f = document.getElementById("file");
  f.addEventListener("change", (e) => {
    let input = e.target;
    var file = input.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      var txt = reader.result;
      txt = txt.split(/\r\n|\n/);
      var ttxt = "";
      var stxt = "";
      var n = 0;
      result = " = [";
      while (n < txt.length) {
        ttxt = txt[n];
        if (ttxt.indexOf(",") == -1) {
          var isM = 0;
        } else {
          var isM = 1;
        }
        ttxt = String(ttxt);
        ttxt = ttxt.split(",");
        var m = 0;

        if (isM == 0) {
          var tttxt = "";
          while (m < ttxt.length) {
            if (m < ttxt.length - 1) {
              tttxt = tttxt + '"' + ttxt[m] + '",';
            } else {
              tttxt = tttxt + '"' + ttxt[m] + '"';
            }
            m += 1;
          }
        } else {
          var tttxt = "[";
          while (m < ttxt.length) {
            if (m < ttxt.length - 1) {
              tttxt = tttxt + '"' + ttxt[m] + '",';
            } else {
              tttxt = tttxt + '"' + ttxt[m] + '"]';
            }
            m += 1;
          }
        }

        ttxt = tttxt;

        if (n < txt.length - 1) {
          result = result + ttxt + ", ";
        } else {
          result = result + ttxt;
        }

        n += 1;
      }
      result = result + "]";
    };
  });
});

function changeType() {
  if (ntype == "") {
    ntype = "var ";
    last = ";";
    document.querySelector(".switch").innerHTML = "js";
  } else {
    ntype = "";
    last = "";
    document.querySelector(".switch").innerHTML = "python";
  }
}

function copyResult() {
  vname = document.getElementById("name").value;
  copy = ntype + vname + result + last;
  navigator.clipboard.writeText(copy);
}

var englishMainHtml = `
<div class="title">
  <h1>Files to Python/JS Lists</h1>
</div>
<div class="quiz">
  <h2 id="question">Making txt file to python/js's list</h2>
  <div class="input">
    <h3 for="name">Name of list：</h3>
    <input type="text" id="name" class="name">
  </div>
  <div class="button-list">
    <label class="button"><input type="file" accept=".txt" id='file' style="display: none;">Upload the File</label>
    <a onclick="changeType()" class="button switch">python</a>
    <a onclick="copyResult()" class="button">Copy!</a>
  </div>
</div>
<div class="icon">
    <a href="/">🏠</a>
  </div>
`;

var japaneseMainHtml = `<div class="title">
<h1>ファイルをリスト化</h1>
</div>
<div class="quiz">
<h2 id="question">txtファイルをpython/jsのリストにします</h2>
<div class="input">
  <h3 for="name">リストの名前：</h3>
  <input type="text" id="name" class="name">
</div>
<div class="button-list">
  <label class="button"><input type="file" accept=".txt" id='file' style="display: none;">ファイルをアップロード</label>
  <a onclick="changeType()" class="button switch">python</a>
  <a onclick="copyResult()" class="button">コピー！</a>
</div>
</div>`;