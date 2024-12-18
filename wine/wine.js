function calc() {
  var lrain = Number(document.getElementById("lrain").value);
  var train = Number(document.getElementById("train").value);
  var temp = Number(document.getElementById("temp").value);
  var year = Number(document.getElementById("year").value);
  var price =
    lrain * 0.00117 - train * 0.00386 + temp * 0.616 + year * 0.02358 - 12.145;
  document.querySelector(".result").innerHTML = String(price);
}

var englishMainHtml = `
<div class="title">
<h1>Quality of Wine</h1>
</div>
<div class="field">
<ul>
  <li>
    <p>Amount of rainfall (mL) from October of the year prior to the year of production to March of the year of production</p>
    <input type="number" id="lrain">
  </li>
  <li>
    <p>Amount of rainfall in August and September of the year produced (mL)</p>
    <input type="number" id="train">
  </li>
  <li>
    <p>Average temperature (°C) from April to September of the year of production</p>
    <input type="number" id="temp">
  </li>
  <li>
    <p>Age of wine (year(s))</p>
    <input type="number" id="year">
  </li>
  <li>
    <a onclick="calc()" class="button">Calculate!</a>
  </li>
  <li>
    <p class="result" id="result">Quality of Wine：</p>
  </li>
</ul>
</div>
<div class="link">
<h5 class="ref">&lt;Reference&gt;</h5>
<a href="https://amazon.jp/dp/4315525693/" class="ref">Newton ゼロからわかる統計と確率</a>
</div>
<div class="icon">
  <a href="/">🏠</a>
</div>
`;

var japaneseMainHtml = `    <div class="title">
<h1>ワインの品質</h1>
</div>
<div class="field">
<ul>
  <li>
    <p>生産された年の前年の10月〜生産された年３月の雨の量（mL）</p>
    <input type="number" id="lrain">
  </li>
  <li>
    <p>生産された年の８,９月の雨の量（mL）</p>
    <input type="number" id="train">
  </li>
  <li>
    <p>生産された年の４〜９月の平均気温（℃）</p>
    <input type="number" id="temp">
  </li>
  <li>
    <p>ワインの年齢（年）</p>
    <input type="number" id="year">
  </li>
  <li>
    <a onclick="calc()" class="button">計算！</a>
  </li>
  <li>
    <p class="result" id="result">ワインの品質：</p>
  </li>
</ul>
</div>
<div class="link">
<h5 class="ref">&lt;参考&gt;</h5>
<a href="https://amazon.jp/dp/4315525693/" class="ref">Newton ゼロからわかる統計と確率</a>
</div>
<div class="icon">
<a href="/">🏠</a>
</div>`;