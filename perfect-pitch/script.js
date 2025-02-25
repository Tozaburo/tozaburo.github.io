"use strict";

const startBtn = document.getElementById('start');
const keys = document.querySelectorAll(".key");
const result = document.getElementById('resultBtn');
const rate = document.getElementById('rate');
const time = document.getElementById('time');
const retry = document.getElementById('retry');
const home = document.querySelectorAll('.home');
const replay = document.getElementById('replay');
const statusBtn = document.getElementById('statusBtn');
const statusPage = document.getElementById('status');
const bars = document.getElementById('bars');

const noteNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

if (localStorage.getItem("perfectPitchData") == null) {
    let data = {};
    noteNames.forEach(noteName => {
        data = { ...data, [noteName]: { correct: 0, solved: 0 } }
    })

    localStorage.setItem("perfectPitchData", JSON.stringify(data));
}

let perfectPitchData = JSON.parse(localStorage.getItem("perfectPitchData"));

function updateData() {
    localStorage.setItem("perfectPitchData", JSON.stringify(perfectPitchData));
}

const piano = new Tone.Sampler({
    urls: {
        C1: "C1.wav",
        C2: "C2.wav",
        C3: "C3.wav",
        C4: "C4.wav",
        C5: "C5.wav",
        C6: "C6.wav",
        C7: "C7.wav",
        C8: "C8.wav",
    },
    baseUrl: "./audio/",
    release: 1,
    volume: -12,
}).toDestination();

startBtn.onclick = newProblems;
retry.onclick = newProblems;

home.forEach(item => {
    item.onclick = () => {
        show("top");
    }
})

statusBtn.onclick = () => {
    show("status");

    let html = "";

    noteNames.forEach(noteName => {
        const data = perfectPitchData[noteName];
        const rate = data.solved ? data.correct / data.solved : 1;
        html += `<div class="flexB noteName"><p>${noteName}</p><span style="background-position: ${100 - rate * 100}% 0;" class="flexB">${Math.round(rate * 100)}%</span></div>`
    })
    bars.innerHTML = html;
}

function newProblems() {
    let n = 1;
    let c = 0;
    const startTime = performance.now();
    show("question");
    newQuestion(n, c, startTime);
}

function newQuestion(n, c, startTime) {
    let isClicked = false;
    result.innerText = "待機中...";
    result.classList.remove("correct");
    result.classList.remove("wrong");

    let pitch;
    if (n <= 10) {
        pitch = randomPitch();
    } else {
        const ratios = Object.values(perfectPitchData).map(({ correct, solved }) => solved ? correct / solved : 0);
        const average = ratios.reduce((sum, r) => sum + r, 0) / ratios.length;
        const belowAverageKeys = Object.keys(perfectPitchData).filter(key => {
            const { correct, solved } = perfectPitchData[key];
            return solved ? correct / solved < average : true;
        });

        const pitchName = belowAverageKeys[getRandomIntInclusive(0, belowAverageKeys.length - 1)]
        pitch = { SPN: `${pitchName}${getRandomIntInclusive(3, 6)}`, pitchName: pitchName }
    }
    const answer = pitch.pitchName;
    piano.triggerAttackRelease(pitch.SPN, "4n");

    replay.onclick = () => {
        piano.triggerAttackRelease(pitch.SPN, "4n");
    }

    perfectPitchData[answer].solved++;
    updateData();

    keys.forEach(key => {
        key.onclick = e => {
            const clicked = e.target.id;

            if (clicked == answer) {
                result.innerText = "正解！";
                result.classList.remove("wrong");
                result.classList.add("correct");
                if (!isClicked) {
                    c += 1;
                    perfectPitchData[answer].correct++;
                }
                isClicked = true;
            } else {
                result.innerText = `正解は${answer}`;
                result.classList.remove("correct");
                result.classList.add("wrong");
                isClicked = true;
            }
            updateData();
        }
    })


    result.onclick = () => {
        if (n < 15) {
            newQuestion(n + 1, c, startTime);
        } else {
            const endTime = performance.now();
            show("result");
            rate.innerText = `${Math.round(c / n * 100)}%`;
            rate.style.backgroundPosition = `100% 0`;
            requestAnimationFrame(() => {
                rate.style.backgroundPosition = `${100 - c / n * 100}% 0`;
            });

            time.innerText = `${Math.round((endTime - startTime) / 1000)}s`
        }
    }
}

function randomPitch() {
    const pitchName = noteNames[getRandomIntInclusive(0, noteNames.length - 1)];
    return { SPN: `${pitchName}${getRandomIntInclusive(3, 6)}`, pitchName: pitchName };
}

function show(id) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hide");
        document.getElementById(id).classList.remove("hide");
    });
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 上限を含み、下限も含む
}