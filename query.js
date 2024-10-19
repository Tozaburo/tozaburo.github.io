var arg = new Object;
var pair = location.search.substring(1).split('&');
for (var i = 0; pair[i]; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

function query(parameter, value) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(parameter, value);
  const newUrl = `${location.pathname}?${urlParams.toString()}`;
  history.pushState(null, '', newUrl);

  arg = new Object;
  pair = location.search.substring(1).split('&');
  for (var i = 0; pair[i]; i++) {
    var kv = pair[i].split('=');
    arg[kv[0]] = kv[1];
  }
}