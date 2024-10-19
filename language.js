const select = document.getElementById("lang-select");

if (arg.lang === undefined && localStorage.getItem("lang") === null) {
  const lang = window.navigator.language;
  if (lang === "ja") {
    query("lang", "ja");
    localStorage.setItem("lang", "ja");
  } else {
    query("lang", "en");
    localStorage.setItem("lang", "en");
  }
} else if (arg.lang === undefined) {
  if (localStorage.getItem("lang") === "ja") {
    query("lang", "ja");
  } else {
    query("lang", "en");
  }
} else if (localStorage.getItem("lang") === null) {
  if (arg.lang == "ja") {
    localStorage.setItem("lang", "ja");
  } else {
    localStorage.setItem("lang", "en");
  }
} else if (arg.lang !== localStorage.getItem("lang")) {
  if (arg.lang === "ja") {
    localStorage.setItem("lang", "ja");
  } else {
    localStorage.setItem("lang", "en");
  }
}

switch (arg.lang) {
  case "ja":
    document.getElementById("ja").selected = true;
    break;
  case "en":
    document.getElementById("en").selected = true;
    break;
}

document.querySelectorAll(`[${arg.lang}]`).forEach(element => {
  element.innerText = element.getAttribute(`${arg.lang}`);
});

select.onchange = (e) => {
  query("lang", e.target.value);

  localStorage.setItem("lang", e.target.value);

  document.querySelectorAll(`[${e.target.value}]`).forEach(element => {
    element.innerText = element.getAttribute(`${e.target.value}`);
  });
}