var storyList = [];
var story = "";
var bolNum = 0;
var isFirst = true;

if (localStorage.getItem("storyId") == null) {
    localStorage.setItem("storyId", "+0");
}
var storyId = localStorage.getItem("storyId");
var chapter = 0;
if (storyId.includes("+") || storyId.includes("-")) {
    chapter = storyId[1];
} else {
    chapter = storyId[0];
}


// function ready(id) {
//     const animatedText = document.getElementById(id);
//     const text = animatedText.textContent;
//     animatedText.textContent = '';
//     animatedText.classList.add('animated-text');

//     for (let i = 0; i < text.length; i++) {
//         const span = document.createElement('span');
//         span.textContent = text[i];
//         animatedText.appendChild(span);
//     }
// }

function ready(id) {
    const animatedText = document.getElementById(id);
    const nodes = Array.from(animatedText.childNodes);
    animatedText.textContent = '';
    animatedText.classList.add('animated-text');

    nodes.forEach(node => {
        if (node.nodeName === "#text") {
            const text = node.nodeValue;
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                animatedText.appendChild(span);
            }
        } else if (node.nodeName === "BR") {
            animatedText.appendChild(document.createElement('br'));
        }
    });
}


function startAnimation(id, delayFactor) {
    ready(id);
    const animatedText = document.getElementById(id);
    const spans = animatedText.querySelectorAll('span');
    let delay = 0;

    spans.forEach(span => {
        setTimeout(() => {
            span.classList.add('visible');
        }, delay);
        delay += delayFactor;
    });
}

function load() {
    var endpoint = "https://script.google.com/macros/s/AKfycbwWHN6aK921yPO0aUo7AN0my4Xs9awdp5nIVN3RbjchVM2Qp1S4zsYlYAWZrAHtjTc5/exec";

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            storyList = data;
            console.log(storyList);
            main();
            document.querySelector(".loading").style.opacity = "0";
            setTimeout(() => {
                document.querySelector(".loading").style.display = "none";
            }, 500);
        });
}

function findInArray(array, index, str) {
    for (var n = 0; n < array.length; n++) {
        if (array[n][index] == str) {
            return n;
            break;
        }
    }
    return -1;
}

function removeCharAt(str, index) {
    if (index < 0 || index >= str.length) {
        return str;
    }
    return str.slice(0, index) + str.slice(index + 1);
}

function choice(id) {
    storyId += id;
    story = "";
    main();
}

function main() {
    if (storyList[findInArray(storyList, 0, "+" + chapter)][1] == "¡") {
        document.querySelector(".main").innerHTML = `
        <h1 id="chapter">Chapter</h1>
        <a href="https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E9%81%93%E8%B7%AF%E6%A8%99%E8%AD%98#:~:text=%E9%81%93%E8%B7%AF-,%E5%B7%A5%E4%BA%8B%E4%B8%AD,-(213)">
            <svg xmlns="http://www.w3.org/2000/svg" class="svgOrigin" id="construction" width="400" height="1200" x="0px" y="0px" viewBox="0 0 400 1200"
                enable-background="new 0 0 400 1200">
                <g>
                    <rect fill="#808080" x="190" y="300"
                        width="20" height="1500" />
                    <rect x="61.170311" y="61.168743" transform="matrix(0.70712 -0.707094 0.707094 0.70712 -82.841606 199.994278)"
                        width="277.659363" height="277.659363" />
                    <polygon fill="none" stroke="#FFD113" stroke-width="3.84133"
                        points="199.995102,389.094696 10.9043,199.996613    199.995102,10.90331 389.09079,199.996613 199.995102,389.094696  " />
                    <path fill="#FFD113"
                        d="M221.727493,346.879913c-11.949203,11.944275-31.505798,11.944275-43.4599,0L53.124001,221.726608   c-11.954102-11.944397-11.954102-31.505905,0-43.457611L178.267593,53.120609c11.954102-11.951702,31.510696-11.951702,43.4599,0   l125.148514,125.148392c11.954071,11.951706,11.954071,31.513214,0,43.457611L221.727493,346.879913z" />
                    <path
                        d="M167.653793,92.917c-6.247101,4.856407-5.691895,12.206505-5.491699,15.462906   c0.199707,3.255798-2.030792,7.5327,0.609909,7.327599c2.641098-0.205093,5.281693-1.4282,6.507294,0.4048   c1.225601,1.833504,4.891602,8.753403,9.568405,10.1763c4.676697,1.422806,8.342697,2.440903,6.917389,5.289001   c-1.42569,2.848694-9.36319,11.371597-9.36319,18.721695c0,6.514694,6.10199,18.519104,7.732391,22.995605   c1.630798,4.476593,5.292007,12.819397,3.461395,16.482895c-1.830597,3.664108-3.461395,5.902405-3.461395,7.530304   s1.01561,3.458496,0,4.479004c-1.015198,1.015594-16.685593,13.227493-16.685593,13.227493l-7.527802-7.123001   c0,0-14.649902,11.804703-14.649902,16.685501c0,0-4.066406,1.220795-5.086899-0.410095   c-1.020004-1.629898-3.465805-2.240204-4.886703-0.410202c-1.420395,1.840897-7.522499,10.173904-9.763199,17.096695   c-2.2407,6.921906-3.461395,17.095718-3.461395,20.1465c0,3.050812-3.4561,8.142609,2.036095,8.342804   c5.491707,0.200195,162.381317,0,166.652802,0c4.271515,0,8.142609-4.681702,3.25589-4.681702   c-4.886688,0-18.316376,0.410187-17.500977-2.640594c0.815399-3.050812,2.640594-8.342804,0.200195-11.393509   c-2.441406-3.0616-17.706116-32.151398-20.552704-42.125c-2.845703-9.973694-12.003906-34.594299-12.003906-40.088898   c0-5.494202,14.445313-21.572296,17.295898-28.287094c2.851501-6.714905,2.446198-12.412102-1.014679-14.4478   c-3.461914-2.035599-22.788116-9.973099-26.250015-13.024399c-3.460892-3.0513-14.044891-6.307098-18.316391-3.458504   c-4.2715,2.848206-9.152298,5.899399-11.3936,5.899399c-2.240204,0-9.968201-5.697197-11.188904-8.137703   c-1.2202-2.440895-1.425293-6.71479-0.205093-7.935493c1.220688-1.2202,5.29689-3.458504,1.020493-3.866203   s-8.142593,0.202606-9.363297-1.425797C183.524399,92.101608,174.9814,87.219711,167.653793,92.917z" />
                    <path fill="#FFD113"
                        d="M198.894501,165.679703c-1.520508,1.445297,0.1353,5.554199,1.230499,6.8974   c1.095688,1.342804,3.050797,8.425308,3.050797,9.888199c0,1.463409,1.705994,0.610397,2.561493-0.122498   c0.854507-0.732391,4.236313-4.343811,3.626007-7.272491C208.752899,172.142105,201.210007,163.4814,198.894501,165.679703z" />
                    <path fill="#FFD113"
                        d="M184.984894,207.121109l-14.650391,10.744095l3.786591,7.322296   c0,0-10.618698,11.354507-20.507294,10.133804c0,0-1.0952,9.042999,0.610291,11.233398   c1.705612,2.201202,7.077698,7.933594,8.297913,10.013687c1.2202,2.071228,4.516586,5.492126,8.057587,5.372009   c3.541504-0.129883,8.183105-4.761688,9.403305-5.862305c1.220703-1.099594,0-8.062485-0.854996-9.893494   c-0.855408-1.830093-0.00531-14.034195,1.340393-19.526398c1.3452-5.492203,5.986801-9.763702,6.106903-11.723602   C186.695297,212.983398,188.645996,204.808609,184.984894,207.121109z" />
                    <path fill="#FFD113"
                        d="M222.462891,202.972702c-3.411102-0.209991-14.525391,9.770508-17.09079,18.193298   c-2.566406,8.422897-4.641602,17.576202-4.641602,21.117203c0,3.542007,4.1465,7.083008,2.685501,8.663101   c-1.4599,1.590805-6.472198,3.301697-6.5923,4.641602c-0.120102,1.340805,0.005402,8.183609,5.741699,8.183609   c5.737289,0,45.166,0,47.242188,0c2.075211,0,1.950211-2.811523,3.416-3.912109   c1.464905-1.099609,2.075211-4.510803-0.365189-8.422897c-2.441391-3.901306-14.530304-23.677704-15.870102-27.218704   C235.647491,220.675812,230.400391,203.457993,222.462891,202.972702z" />
                    <path fill="#FFD113"
                        d="M243.214798,138.762711c0.510803,2.013199-0.639603,3.093689-1.370102,3.826691   c-0.730408,0.732407-5.796799-1.278397-6.7724-3.231491c-0.975601-1.95311-0.565506-4.496597,1.385696-4.61911   C238.408188,134.616211,242,133.968704,243.214798,138.762711z" />
                </g>
            </svg>
        </a>
        <a onclick='localStorage.setItem("storyId", "+0"); location.reload();' class="restart">最初から</a>`
        document.querySelector("#chapter").innerHTML = "制作中です...";
        document.querySelector("#construction").classList.add("animate");
        var construnction = document.querySelector("#construction");

        construnction.addEventListener('animationend', function () {
            construnction.classList.remove("animate");
        });

        construnction.addEventListener('mouseover', function () {
            construnction.classList.add("sway");
        });

        construnction.addEventListener('mouseout', function () {
            construnction.classList.remove("sway");
        });
        // document.querySelector(".main").style.display = "inline-block";
        return;
    } else {
        document.querySelector(".main").innerHTML = `
        <h1 id="chapter">Chapter</h1>
        <div class="bol">
        </div>
        <div class="choice">
            <h2>選択肢</h2>
            <div class="choices">
                <a onclick="choice(0)" id="choice1"></a>
                <a onclick="choice(1)" id="choice2"></a>
            </div>
        </div>
        <div class="complete">
            <h2>章コンプリート！</h2>
            <div class="choices">
                <a onclick="next()">進む</a>
            </div>
        </div>`
        document.querySelector("#chapter").innerHTML = storyList[findInArray(storyList, 0, "+" + chapter)][1];
    }
    if (storyId.includes("+")) {
        storyId = removeCharAt(storyId, 0);
        story += storyList[findInArray(storyList, 0, storyId)][1].replaceAll(/¿/g, '<br>');
    }
    if (storyList[findInArray(storyList, 0, "-" + storyId + "0")][1] == "¡") {
        document.querySelector(".choice").style.display = "none";
        document.querySelector(".complete").style.display = "flex";
        return;
    } else {
        document.querySelector(".choice").style.display = "flex";
        document.querySelector(".complete").style.display = "none";
        document.querySelector("#choice1").innerHTML = storyList[findInArray(storyList, 0, "-" + storyId + "0")][1];
        document.querySelector("#choice2").innerHTML = storyList[findInArray(storyList, 0, "-" + storyId + "1")][1];
    }
    bolNum = -1;
    console.log("a")
    story = "";
    ts = "";
    for (var n = 0; n < storyId.length; n++) {
        bolNum += 1;
        document.querySelector(".bol").innerHTML += `<p id="bol${bolNum}"></p>`
        ts += storyId[n];
        story = storyList[findInArray(storyList, 0, ts)][1].replaceAll(/¿/g, '<br>');
        document.querySelector(`#bol${bolNum}`).innerHTML = story;
    }

    localStorage.setItem("storyId", storyId);
    if (isFirst) {
        for (var n = 0; n < bolNum; n++) {
            startAnimation(`bol${n}`, 2);
        }
    } else {
        startAnimation(`bol${bolNum}`, 2);
    }
    isFirst = false;
}

function next() {
    storyId = String(Number(chapter) + 1);
    localStorage.setItem("storyId", storyId);
    if (storyId.includes("+") || storyId.includes("-")) {
        chapter = storyId[1];
    } else {
        chapter = storyId[0];
    }
    main();
}

document.addEventListener('DOMContentLoaded', function () {
    load();
    startAnimation("loading-text", 100);
});