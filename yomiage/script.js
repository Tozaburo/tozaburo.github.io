const main = document.querySelector(".main");
let html = "";
var hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもや ゆ よらりるれろわをん"

for (let n = 0; n < hiragana.length; n++) {
    html += `<a class="hiragana flexB">${hiragana[n]}</a>`
}

main.innerHTML = html;

const hiraganas = document.querySelectorAll('.hiragana'); // 例えば、'.clickable'クラスの要素を取得
hiraganas.forEach(hiraganas => {
    hiraganas.addEventListener('click', (e) => {
        if ('speechSynthesis' in window) {
            const uttr = new SpeechSynthesisUtterance();
            uttr.text = e.target.innerHTML;
            uttr.lang = "ja-JP";
            uttr.rate = 1;
            uttr.pitch = 1;
            uttr.volume = 1;
            window.speechSynthesis.speak(uttr);
        }
    });
});
