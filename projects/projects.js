var lang = window.navigator.language;

var endpoint = "https://script.google.com/macros/s/AKfycbzY21bS8Xjkm3Ov7htzmS-NM6I-zVI5KTqlw_qAWvOWcqMBd8-ZtvUM8GwwW5ugwviuog/exec";

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    projects = data;
    clang();
  });

function clang() {
  document.querySelector(".button-list").innerHTML = "";
  if (lang != "ja") {
    document.title = "Projects";
    document.querySelector("#title").innerHTML = "Projects";
    for (var n = 0; n < projects.length; n++) {
      if (projects[n][1] != "") {
        document.querySelector(".button-list").innerHTML += `<a href="${projects[n][2]}" class="button">${projects[n][1]}</a>`;
      }
    }
  } else {
    for (var n = 0; n < projects.length; n++) {
      if (projects[n][0] != "") {
        document.querySelector(".button-list").innerHTML += `<a href="${projects[n][2]}" class="button">${projects[n][0]}</a>`;
      }
    }
  }
}
