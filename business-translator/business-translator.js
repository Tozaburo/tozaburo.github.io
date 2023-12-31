var code = "";
var codebyrow = [];
var ruleset = [];
var truleset = [];
var arulesetz = [];
var dec = [];
var tdec = [];
var result = [];
var tresult = [];
var classFirst = 1;

function clean() {
  codebyrow = [];
  ruleset = [];
  truleset = [];
  arulesetz = [];
  dec = [];
  tdec = [];
  result = [];
  tresult = [];
  code = document.querySelector("#input").value;
  if (classFirst == 1) {
    code = easyReplace(code, ".", "あ");
    code = easyReplace(code, "#", "安");
  } else {
    code = easyReplace(code, "#", "あ");
    code = easyReplace(code, ".", "安");
  }
  codebyrow = code.split("\n");
  for (var i = 0; i < codebyrow.length; i++) {
    if (codebyrow[i].includes("{")) {
      do {
        truleset.push(codebyrow[i]);
        i += 1;
      } while (!codebyrow[i].includes("}"));
      truleset.push(codebyrow[i]);
      ruleset.push(truleset);
      truleset = [];
    }
  }

  arulesetz = ruleset.sort();

  for (var i = 0; i < arulesetz.length; i++) {
    for (var j = 1; j < arulesetz[i].length - 1; j++) {
      tdec.push(arulesetz[i][j]);
    }
    tdec = tdec.sort();
    dec.push(tdec);
    tdec = [];
  }

  for (var i = 0; i < ruleset.length; i++) {
    for (var j = 0; j < ruleset[i].length; j++) {
      if (j == 0 || j == ruleset[i].length - 1) {
        tresult.push(ruleset[i][j]);
      } else {
        tresult.push(dec[i][j - 1]);
      }
    }
    result.push(tresult.join("\n"));
    tresult = [];
  }

  result = result.join("\n\n");
  if (classFirst == 1) {
    result = easyReplace(result, "あ", ".");
    result = easyReplace(result, "安", "#");
  } else {
    result = easyReplace(result, "あ", "#");
    result = easyReplace(result, "安", ".");
  }

  document.querySelector("#input").value = result;
}

function easyReplace(str, a, b) {
  str = str.split(a);
  return str.join(b);
}