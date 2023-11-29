var lang = window.navigator.language;

function updateCheckboxListener() {
  document.getElementById("slider-checkbox").addEventListener("change", checkboxChanged);
}

function checkboxChanged() {
  if (lang == "ja") {
    lang = "en";
  } else {
    lang = "ja";
  }
  clang();
}

function clang() {
  var checkbox = document.getElementById('slider-checkbox');
  if (lang != "ja") {
    document.querySelector(".main").innerHTML = englishMainHtml;
    document.getElementById('slider-checkbox').checked = true;
  } else if (lang == "ja") {
    document.querySelector(".main").innerHTML = japaneseMainHtml;
    document.getElementById('slider-checkbox').checked = false;
  }

  updateCheckboxListener(); // DOM変更後にリスナーを再設定
}

// 初期設定
updateCheckboxListener();
clang();
