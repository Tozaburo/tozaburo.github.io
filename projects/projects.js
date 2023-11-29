var lang = window.navigator.language;

var endpoint = "https://script.google.com/macros/s/AKfycbzY21bS8Xjkm3Ov7htzmS-NM6I-zVI5KTqlw_qAWvOWcqMBd8-ZtvUM8GwwW5ugwviuog/exec";

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    projects = data;
    // 初期設定
    updateCheckboxListener();
    clang();
  });

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
  document.querySelector(".button-list").innerHTML = "";
  var checkbox = document.getElementById('slider-checkbox');
  if (lang != "ja") {
    for (var n = 0; n < projects.length; n++) {
      if (projects[n][1] != "") {
        document.querySelector("#title").innerHTML = "Projects";
        document.querySelector(".button-list").innerHTML += `<a href="${projects[n][2]}" class="button">${projects[n][1]}</a>`;
      }
    }
    document.getElementById('slider-checkbox').checked = true;
  } else if (lang == "ja") {
    for (var n = 0; n < projects.length; n++) {
      if (projects[n][0] != "") {
        document.querySelector("#title").innerHTML = "作品";
        document.querySelector(".button-list").innerHTML += `<a href="${projects[n][2]}" class="button">${projects[n][0]}</a>`;
      }
    }
    document.getElementById('slider-checkbox').checked = false;
  }

  updateCheckboxListener(); // DOM変更後にリスナーを再設定
}
