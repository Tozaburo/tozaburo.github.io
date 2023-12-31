setInterval(() => {
  mouse();
}, 100);

var link = [
  ["projects", "project"],
  ["activity", "activities"],
  ["clock", "time"],
  ["file", "files"],
  ["wine", "wines"],
  ["wine", "quality"],
  ["wine", "qualityofwine"],
  ["wine", "qualityofwines"],
  ["wine", "quality-of-wine"],
  ["wine", "quality-of-wines"]
];

var thisurl = location.href;

thisurl = thisurl.replace("https://tozaburo.github.io/", "");

thisurl = thisurl.replace("/", "");

thisurl = thisurl.toUpperCase();

var n = 0;

while (n < link.length){
  if (link[n][1] == thisurl){
    var newurl = link[n][0];
    location.href = "https://tozaburo.github.io/" + newurl;
    break;
  }
  n += 1;
}

function mouse() {
  var sec = new Date().getSeconds();
  var item = Math.floor(sec * 4) % 14;
  var mouse = [
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "se-resize",
    "sw-resize",
    "nw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize"
  ];
  document.getElementById("change").style.cursor = mouse[item];
}

var lang = window.navigator.language;

window.addEventListener("DOMContentLoaded", function () {
  clang();
});

function clang() {
  if (lang != "ja") {
    document.querySelector(".main").innerHTML = `
		  <div class="text">
      <div class="title">
        <h1>2²×101</h1>
        <h2>Aww. You must have typed in a different address. Enjoy watching the mouse change.<br>(Press the button to go to the home screen)</h2>
      </div>
      <div class="button-list">
        <a href="/" class="button" style="cursor: default">Tilted arrow</a>
        <a href="/" class="button none" style="cursor: none">Extinction magic</a>
        <a href="/" class="button none" style="cursor: context-menu">M.E.N.U.</a>
        <a href="/" class="button none" style="cursor: help">???</a>
        <a href="/" class="button none" style="cursor: pointer">L</a>
        <a href="/" class="button none" style="cursor: progress">circling</a>
        <a href="/" class="button none" style="cursor: wait">hourglass</a>
        <a href="/" class="button none" style="cursor: cell">Not a table</a>
        <a href="/" class="button none" style="cursor: crosshair">Croping an image</a>
        <a href="/" class="button none" style="cursor: text">Select letters...</a>
        <a href="/" class="button none" style="cursor: vertical-text">安以宇衣於</a>
        <a href="/" class="button none" style="cursor: alias">Arrows that pop up</a>
        <a href="/" class="button none" style="cursor: copy">⊕</a>
        <a href="/" class="button none" style="cursor: move">⚠This element cannot be moved⚠</a>
        <a href="/" class="button none" style="cursor: not-allowed">This action is prohibited</a>
        <a href="/" class="button none" style="cursor: grab">Gra...</a>
        <a href="/" class="button none" style="cursor: grabbing">b!!</a>
        <a href="/" class="button none" id="change">Various Moves</a>
        <a href="/" class="button none" style="cursor: zoom-in">Zoom in</a>
        <a href="/" class="button none" style="cursor: zoom-out">Zoom out</a>
      </div>
    </div>
    `;
  }
}

var url = location.href;
