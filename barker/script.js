var bawls = [];

var endpoint = "https://script.google.com/macros/s/AKfycbwwSad9KfAGm7EFQOCi1A3HJ4asc-JWKJQOjXTdF7u5k2He_taYdDLmh1eX1PdeWE5z/exec";

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        bawls = data;
        loadingDone();
    });

function convertToJST(isoDateString) {
    // ISO日付文字列をUTCとしてDateオブジェクトに変換
    const date = new Date(isoDateString);

    // JSTに変換（UTC+9時間）
    const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    // 日付を "YYYY/MM/DD HH:mm" 形式でフォーマット
    const formattedDate = jstDate.getUTCFullYear() +
        '/' + ('0' + (jstDate.getUTCMonth() + 1)).slice(-2) + // 月は0から始まるため+1
        '/' + ('0' + jstDate.getUTCDate()).slice(-2) +
        ' ' + ('0' + jstDate.getUTCHours()).slice(-2) +
        ':' + ('0' + jstDate.getUTCMinutes()).slice(-2);

    return formattedDate;
}

function loadingDone() {
    bawls.forEach((element) => element[0] = convertToJST(element[0]));
    console.log(bawls);
    bawlsHtml = '';
    for (var n = 0; n < bawls.length; n++) {
        bawlsHtml += `<div class="bawl flexB flexC"><p class="time">${(bawls[n][0])}</p><p class="content">${(bawls[n][1])}</p></div>`;
    }
    document.querySelector('.bawls').innerHTML = bawlsHtml;
}