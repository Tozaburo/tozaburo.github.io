var input = "";
var result = 0;

if (localStorage.getItem("expenses") === null) {
    localStorage.setItem("expenses", "");
    expenses = [];
} else {
    var expenses = localStorage.getItem("expenses").split(",");
}

document.getElementById("convert-button").addEventListener('click', () => {
    document.getElementById("convert").style.display = "flex";
    document.getElementById("list").style.display = "none";
    document.getElementById("convert-button").classList.add("active");
    document.getElementById("list-button").classList.remove("active");

    input = "";
    document.getElementById("input-value").innerText = "0.00";
});

document.getElementById("list-button").addEventListener('click', () => {
    document.getElementById("convert").style.display = "none";
    document.getElementById("list").style.display = "flex";
    document.getElementById("convert-button").classList.remove("active");
    document.getElementById("list-button").classList.add("active");

    showList();
});

// async function fetchExchangeRates(baseCurrency) {
//     const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
//     const response = await fetch(url);

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.rates;
// }

// async function convertCurrency(amount, fromCurrency, toCurrency) {
//     const rates = await fetchExchangeRates(fromCurrency);

//     if (!rates[toCurrency]) {
//         throw new Error(`Currency ${toCurrency} is not supported`);
//     }

//     const convertedAmount = amount * rates[toCurrency];
//     // 小数点第2位までに丸めて返す
//     return convertedAmount.toFixed(2);
// }

function convertCurrency(amount, fromCurrency, toCurrency) {
    fromCurrency = fromCurrency.toUpperCase();
    toCurrency = toCurrency.toUpperCase();

    var data = {
        JPY: 1,
        USD: 147.66,
        EUR: 162.95,
        DKK: 21.82,
        SEK: 13.94,
        CHF: 170.49,
        GBP: 191.12
    }

    return (amount / data[toCurrency] * data[fromCurrency]).toFixed(2);
}

// // 例: 100ユーロを円に変換する
// convertCurrency(100, 'EUR', 'JPY')
//     .then(result => console.log(`100 EUR is ${result} JPY`))
//     .catch(error => console.error(error));

// 例: 1000ユーロをクローネに変換する
// convertCurrency(1000, 'EUR', 'DKK')
//     .then(result => console.log(`1000 EUR is ${result} DKK`))
//     .catch(error => console.error(error));


const currencyElements = document.querySelectorAll('.currency');
currencyElements.forEach(function (element) {
    element.addEventListener('click', function () {
        var value = this.innerText;
        switch (value) {
            case "EUR":
                this.innerText = "DKK"
                break;
            case "DKK":
                this.innerText = "SEK"
                break;
            case "SEK":
                this.innerText = "CHF"
                break;
            case "CHF":
                this.innerText = "GBP"
                break;
            case "GBP":
                this.innerText = "JPY"
                break;
            case "JPY":
                this.innerText = "EUR"
                break;
        }
        update();
    });
});


document.querySelectorAll(".number").forEach(function (element) {
    element.addEventListener('click', function () {
        if (this.innerText == "<") {
            input = input.slice(0, -1);
        } else {
            input += this.innerText;
        }
        document.getElementById("input-value").innerText = input;

        update();
    });
});

function update() {
    result = convertCurrency(Number(input), document.getElementById('currency-input').innerText, document.getElementById('currency-output').innerText);
    document.getElementById("output-value").innerText = result;
    if (document.getElementById('currency-output').innerText == "JPY") {
        document.getElementById("add").classList.remove("disabled");
    } else {
        document.getElementById("add").classList.add("disabled");
    }
}

document.getElementById("add").addEventListener('click', () => {
    expenses.push(result);
    document.getElementById("convert").style.display = "none";
    document.getElementById("list").style.display = "flex";
    document.getElementById("convert-button").classList.remove("active");
    document.getElementById("list-button").classList.add("active");

    localStorage.setItem("expenses", expenses.join(","));
    showList();
});

function showList() {
    var html = "";
    var sum = 0;
    for (var n = 0; n < expenses.length; n++) {
        html += `
<div class="item flexB">
    <p class="flexB">¥${expenses[n]}</p>
</div>`
        sum += Number(expenses[n]);
    }
    document.getElementById("items").innerHTML = html;
    document.getElementById("sum").innerHTML = `
<div class="item flexB">
    <p class="flexB">¥${sum}</p>
</div>`
}