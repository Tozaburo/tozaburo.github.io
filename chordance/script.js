const synth = new Tone.PolySynth(Tone.Synth).toDestination();

const degreeNames = {
    major: {
        tonic: [
            ["I", "IM7"],
            ["VIm", "VIm7"],
            ["IIIm", "IIIm7"]
        ],
        subDominant: [
            ["IV", "IVM7"],
            ["IIm", "IIm7"]
        ],
        dominant: [
            ["V", "V7"],
            ["VIImb5", "VIIm7b5"]
        ]
    },
    minor: {
        tonic: [
            ["Im", "Im7"],
            ["Im", "ImM7"],
            ["Im", "Im6"],
            ["bIII", "bIIIM7"],
            ["bIIIaug", "bIIIaugM7"],
            ["VImb5", "VIm7b5"],
        ],
        subDominant: [
            ["IVm", "IVm7"],
            ["IVmb5", "IVm7b5"],
            ["bVI", "bVIM7"],
            ["bVIm", "bVIm6"],
            ["IImb5", "IIm7b5"],
            ["IIm", "IIm7"],
        ],
        dominant: [
            ["Vm", "Vm7"],
            ["bVII", "bVII7"],
            ["V", "V7"],
            ["VIIdim", "VIIdim7"],
            ["IIdim", "IIdim7"],
            ["IVdim", "IVdim7"],
            ["bVIdim", "bVIdim7"],
            ["IV", "IV7"],
            ["VIImb5", "VIIm7b5"],
        ]
    }
}
const noteLengths = [1, 0.75, 0.5, 0.375, 0.25, 0.1875, 0.125, 0.0625];
const noteNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const pianoNoteNames = [
    "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
    "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
    "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5"
];

const keyInput = document.getElementById("key");
const tonic = document.getElementById("tonic");
const subDominant = document.getElementById("sub-dominant");
const dominant = document.getElementById("dominant");
const chords = document.getElementById("chords");
const duration = document.getElementById("duration");
const chordName = document.getElementById("chord-name");
const play = document.getElementById("play");
const bpmInput = document.getElementById("bpm");
const deleteBtn = document.getElementById("delete");
const vmin = Math.min(window.innerWidth, window.innerHeight) / 100;
const root = document.getElementById("root");
const modifier = document.getElementById("modifier");
const seventh = document.getElementById("seventh");
const alt = document.getElementById("alt");
const omit = document.getElementById("omit");
const bass = document.getElementById("bass");
const save = document.getElementById('save');
const importBtn = document.getElementById('import');
const fileInput = document.getElementById('fileInput');
const exportMidi = document.getElementById('export');
const sectionContainer = document.getElementById('section-container');
const pianoRoll = document.getElementById('piano-roll');

const functionColor = document.querySelectorAll(".function");
const tensions = document.querySelectorAll(".tension");
const indicators = document.querySelectorAll(".indicator");

const selects = [root, modifier, seventh, alt, omit, tensions, bass];

let chord = document.querySelectorAll("a.chord");
let handle = document.querySelectorAll("span.handle");

let chordProgression = [];
let key = "";
let scale;
let bpm = 120;
let isPaused = 1;
let isResizing = false;
let resizingIndex = 0;
let scaleNotes = Tonal.Scale.get(key).notes;

const baseOctave = 3;

let diatonic = [];

bpmInput.onchange = e => {
    bpm = e.target.value;
}

keyInput.onchange = (e) => {
    // const prevTonic = Tonal.Scale.get(key).tonic;
    key = e.target.value;
    updateKey(key);
}

function updateKey(key) {
    scale = Tonal.Scale.get(key).notes;

    const keyTonic = Tonal.Scale.get(key).tonic;
    const data = ["tonic", "sub-dominant", "dominant"];

    diatonic = [];
    data.forEach(chordFunction => {
        let html = `<h2 class="medium">${toTitleCase(chordFunction)}</h2>`;
        let t = [];
        degreeNames[Tonal.Scale.get(key).type][toCamelCase(chordFunction)].forEach(chord => {
            let triad;
            if (chord[0].includes("dim")) {
                triad = Tonal.Progression.fromRomanNumerals(keyTonic, [chord[0].replace("dim", "")]) + "dim";
            } else {
                triad = Tonal.Progression.fromRomanNumerals(keyTonic, [chord[0]])[0];
            }

            let seventh;
            if (chord[1].includes("dim7")) {
                seventh = Tonal.Progression.fromRomanNumerals(keyTonic, [chord[1].replace("dim7", "")]) + "dim7";
            } else {
                seventh = Tonal.Progression.fromRomanNumerals(keyTonic, [chord[1]])[0];
            }

            triad = enharmonicChord(triad);
            seventh = enharmonicChord(seventh);

            t.push([triad, seventh]);
            html += `<p class="normal"><a class="roman" data-function="${chordFunction[0]}">${triad}</a> / <a class="roman" data-function="${chordFunction[0]}">${seventh}</a></p>`;
        })
        document.getElementById(chordFunction).innerHTML = html;
        const functionChords = { [toCamelCase(chordFunction)]: t };
        diatonic.push(functionChords);
    })

    const romans = document.querySelectorAll(".roman");
    romans.forEach(elm => {
        elm.onclick = e => {
            if (key !== "") {
                const chord = e.target.innerText;
                chordProgression.push({
                    symbol: chord,
                    function: e.target.dataset.function,
                    duration: 1,
                    style: chord2class(chord),
                });
                updateHTML();
                loadChord(chords.lastChild);
            }
        }
    });

    scaleNotes = Tonal.Scale.get(key).notes;
}

function enharmonicChord(chord) {
    const splitted = splitChord(chord);
    let root = splitted.root;
    let bass = splitted.bass;
    root = noteNames.includes(root) ? root : Tonal.Note.enharmonic(root);
    bass = noteNames.includes(bass) ? bass : Tonal.Note.enharmonic(bass);
    return splitted2chord({ ...splitted, root: root, bass: bass });
}

function sortArrayByOrder(inputArray, order) {
    return order.map(index => inputArray[index]);
}

function toCamelCase(input) {
    return input
        .split('-')
        .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

function toTitleCase(input) {
    return input
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function loadChord(e) {
    const index = Number(e.dataset.index);
    duration.value = chordProgression[index].duration;
    const chord = chordProgression[index].symbol;
    chordName.innerText = chord;
    const functions = ["t", "s", "d"];
    chordName.classList.remove(...functions);
    // 思い出
    // const functionClass = [...e.classList].find(item => ["t", "s", "d"].includes(item));

    const functionClass = chordProgression[index].function;
    chordName.classList.add(functionClass);
    const keys = ["root", "modifier", "seventh", "alt", "omit", "tension", "bass"]

    keys.forEach((key, i) => {
        if (key == "tension") {
            updateTensions(splitChord(chord)[key]);
        } else {
            selects[i].value = splitChord(chord)[key];
        }
    })

    duration.onchange = event => {
        chordProgression[index].duration = Number(event.target.value);
        updateHTML();
    }
    functionColor.forEach(elm => {
        elm.onclick = event => {
            const color = event.target.dataset.function;
            chordName.classList.remove(...functions);
            chordName.classList.add(color);
            chordProgression[index].function = color;
            updateHTML();
        }
    })
    deleteBtn.onclick = event => {
        chordProgression.splice(index, 1);
        updateHTML();
        if (chords.lastChild) {
            loadChord(chords.lastChild)
        } else {
            chordName.classList.remove(...functions);
            chordName.innerText = "---";
            selects.forEach(select => {
                select.value = "---";
            })
            updateTensions([]);
            duration.value = "---";
        }
    }

    selects.filter(item => item !== tensions).forEach(select => {
        select.onchange = event => {
            updateChord(index);
        }
    })

    tensions.forEach(tension => {
        tension.onclick = event => {
            if (event.target.classList.toggle("selected")) {
                updateChord(index);
            } else {
                updateChord(index);
            }
        }
    })

    document.getElementById("add-dominant").onclick = () => {
        const newChord = Tonal.Note.simplify(Tonal.Note.transpose(splitChord(chord).root, "5P")) + "7";
        chordProgression.splice(index, 0, {
            symbol: newChord,
            function: "d",
            duration: 1,
            style: chord2class(newChord),
        });
        updateHTML();
    }

    document.getElementById('add-substitute').onclick = () => {
        const newChord = Tonal.Note.simplify(Tonal.Note.transpose(splitChord(chord).root, "2m")) + "7";
        chordProgression.splice(index, 0, {
            symbol: newChord,
            function: "d",
            duration: 1,
            style: chord2class(newChord),
        });
        updateHTML();
    }

    document.getElementById('add-sus4').onclick = () => {
        const newChord = splitChord(chord).root + "7sus4";
        chordProgression.splice(index, 0, {
            symbol: newChord,
            function: "d",
            duration: 1,
            style: chord2class(newChord),
        });
        updateHTML();
    }

    document.getElementById("add-related").onclick = () => {
        const newChord = Tonal.Note.simplify(Tonal.Note.transpose(splitChord(chord).root, "5P")) + "m7";
        chordProgression.splice(index, 0, {
            symbol: newChord,
            function: "s",
            duration: 1,
            style: chord2class(newChord),
        });
        updateHTML();
    }

    // Piano roll
    let html = "";

    const prevNotes = chordProgression[index - 1] ? chord2notes(chordProgression[index - 1].symbol).map(note => Tonal.Note.enharmonic(note)) : [];
    const currNotes = chordProgression[index] ? chord2notes(chordProgression[index].symbol).map(note => Tonal.Note.enharmonic(note)) : [];
    const nextNotes = chordProgression[index + 1] ? chord2notes(chordProgression[index + 1].symbol).map(note => Tonal.Note.enharmonic(note)) : [];
    prevNotes.shift();
    currNotes.shift();
    nextNotes.shift();

    for (let i = 35; i >= 0; i--) {
        html += div([scaleNotes.includes(noteNames[i % 12]) ? "diatonic" : "chromatic"]);
    }

    html += chordHTML(prevNotes);

    html += chordHTML(currNotes);

    html += chordHTML(nextNotes);

    pianoRoll.innerHTML = html;
}

const div = (className) => `<div class="${className.join(" ")}"></div>`;

function chordHTML(notes) {
    let result = "";
    const tritone = isTritone(notes);
    const augment = isAugment(notes);
    let noteIndex = notes.length - 1;
    for (let i = 35; i >= 0; i--) {
        if (notes.includes(pianoNoteNames[i])) {
            let classes = [];
            if (scaleNotes.includes(Tonal.Note.pitchClass(pianoNoteNames[i]))) {
                classes.push("diatonic");
            } else {
                classes.push("chromatic");
            }

            if (tritone[noteIndex]) {
                classes.push("tritone");
            }

            if (augment[noteIndex]) {
                classes.push("augment");
            }

            noteIndex--;

            result += div(classes);
        } else {
            if (Tonal.Note.accidentals(pianoNoteNames[i])) {
                result += div(["accidental"]);
            } else {
                result += div(["natural"]);
            }
        }
    }

    return result;
}

function isTritone(notes) {
    let result = new Array(notes.length).fill(false);
    for (let i = 0; i < notes.length; i++) {
        if (!result[i]) {
            const index = notes.findIndex(note => notesSemitones(notes[i], note, 6));
            if (index !== -1) {
                result[i] = true;
                result[index] = true;
            }
        }
    }
    return result;
}

function isAugment(notes) {
    let result = new Array(notes.length).fill(false);
    for (let i = 0; i < notes.length; i++) {
        if (!result[i]) {
            if (notesSemitones(notes[i], notes[i + 1], 4) && notesSemitones(notes[i + 1], notes[i + 2], 4)) {
                result[i] = true;
                result[i + 1] = true;
                result[i + 2] = true;
            }
        }
    }
    return result;
}

const notesSemitones = (note1, note2, semitones) => Math.abs(Tonal.Interval.semitones(Tonal.Interval.distance(note1, note2)) % 12) == semitones;

function updateChord(index) {
    const chordData = selects.filter(item => item !== tensions).reduce((acc, select) => {
        const key = select.id; // select要素のidをキーに使用
        const value = select.value; // 現在選択されている値
        acc[key] = value;
        return acc;
    }, {});
    chordData.tension = Array.from(document.querySelectorAll('.tension.selected')).map(tension => tension.innerText);
    const newChord = splitted2chord(chordData);
    chordProgression[index].symbol = newChord;
    chordProgression[index].style = chord2class(newChord);
    updateHTML();
    chordName.innerText = newChord;
    loadChord(document.querySelector(`[data-index="${index}"]`))
}

function splitted2chord(splitted) {
    // splitChord("B7b5sus2(9)/C")
    /* {
        "root": "B",
        "modifier": "sus2",
        "seventh": "7",
        "alt": "b5",
        "omit": "",
        "tension": [
            "9"
        ],
        "bass": "C"
    } */
    if (splitted.modifier.includes("sus")) {
        return `${splitted.root}${splitted.seventh}${splitted.alt}${splitted.omit ? (splitted.omit.includes("omit") ? splitted.omit : `omit${splitted.omit}`) : ""}${splitted.modifier}${splitted.tension[0] ? "(" + splitted.tension.join(",") + ")" : ""}${splitted.bass ? "/" + splitted.bass : ""}`;
    } else {
        return `${splitted.root}${splitted.modifier}${splitted.seventh}${splitted.alt}${splitted.omit ? (splitted.omit.includes("omit") ? splitted.omit : `omit${splitted.omit}`) : ""}${splitted.tension[0] ? "(" + splitted.tension.join(",") + ")" : ""}${splitted.bass ? "/" + splitted.bass : ""}`;
    }
}

function chord2class(chord) {
    const isChordIncluded = diatonic.some(section =>
        Object.values(section).some(chordPairs =>
            chordPairs.some(pair =>
                pair.some(diatonicChord => {
                    return diatonicChord === chord;
                })
            )
        )
    );

    const isChordQualityIncluded = diatonic.some(section =>
        Object.values(section).some(chordPairs =>
            chordPairs.some(pair =>
                pair.some(diatonicChord => {
                    const splitDiatonicChord = splitChord(diatonicChord);
                    const splitTargetChord = splitChord(chord);

                    return splitDiatonicChord.root === splitTargetChord.root &&
                        splitDiatonicChord.modifier === splitTargetChord.modifier;
                })
            )
        )
    );

    const isChordTonicIncluded = diatonic.some(section =>
        Object.values(section).some(chordPairs =>
            chordPairs.some(pair =>
                pair.some(diatonicChord => {
                    const splitDiatonicChord = splitChord(diatonicChord);
                    const splitTargetChord = splitChord(chord);

                    return splitDiatonicChord.root === splitTargetChord.root;
                })
            )
        )
    );


    if (isChordIncluded) {
        return ["bold"];
    } else if (isChordQualityIncluded) {
        return ["bold", "italic"];
    } else if (isChordTonicIncluded) {
        return ["normal"];
    } else {
        return ["normal", "italic"];
    }
}

function updateHTML() {
    let html = "";
    chordProgression.forEach((chord, index) => {
        html += `<a class="chord ${chord.function} flexB ${chord.style.join(" ")}" style="width: ${chord.duration * 100}%;" data-index="${index}">${chord.symbol}<span class="handle"></span></a>`;
    })
    chords.innerHTML = html;

    chord = document.querySelectorAll("a.chord");

    chord.forEach(elm => {
        elm.onclick = e => {
            loadChord(e.target);
        };
    });

    handle = document.querySelectorAll("span.handle");

    handle.forEach(elm => {
        elm.onmousedown = (e) => {
            isResizing = true;
            e.stopPropagation();
            resizingIndex = e.target.closest(".chord").dataset.index;
            loadChord(e.target.closest(".chord"));
            // defSort();
        };
    })

    document.onmouseup = () => {
        isResizing = false;
        // defSort();
    };

    document.onmousemove = (e) => {
        if (isResizing) {
            const resizable = document.querySelector(`[data-index="${resizingIndex}"]`);
            let newWidth = e.clientX - resizable.getBoundingClientRect().left;
            // resizable.style.width = findClosest(noteLengths.map(length => length * 100), newWidth) + '%';
            const noteLength = findClosest(noteLengths, (newWidth / vmin) / 40);
            resizable.style.width = noteLength * 100 + '%';
            chordProgression[resizingIndex].duration = noteLength;
            updateHTML();
            duration.value = noteLength;
        }
    };
}

function findClosest(array, target) {
    return array.reduce(function (prev, curr) {
        return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
    });
}

const sortable = new Sortable(chords, {
    animation: 150,
    // handle: ".handle",
    onStart: () => {
        if (isResizing) {
            sortable.option("disabled", true); // リサイズ中は並び替えを無効化
        }
    },
    onEnd: () => {
        sortable.option("disabled", false); // 並び替えを再び有効化
        if (!isResizing) {
            const order = Array.from(chords.children).map(item => Number(item.getAttribute('data-index')));
            chordProgression = sortArrayByOrder(chordProgression, order);
            updateHTML();
        }
    }
});

const sampler = new Tone.Sampler({
    urls: {
        C1: "C1.wav",
        C2: "C2.wav",
        C3: "C3.wav",
        C4: "C4.wav",
        C5: "C5.wav",
    },
    baseUrl: "./audio/",
    release: 1,
    volume: -12,
}).toDestination();

async function playChordProgression() {

    await Tone.start();

    Tone.Transport.bpm.value = bpm;

    Tone.Transport.cancel();

    let startTime = 0;

    const secondsPerBeat = 60 / bpm;

    chordProgression.forEach(chord => {
        const notes = chord2notes(chord.symbol);
        if (notes.length > 0) {

            Tone.Transport.schedule(time => {
                notes.forEach(note => {
                    sampler.triggerAttackRelease(note, chord.duration * secondsPerBeat * 4, time);
                });
            }, startTime);
        }

        startTime += chord.duration * secondsPerBeat * 4;
    });


    Tone.Transport.scheduleOnce(() => {
        Tone.Transport.stop();

        play.classList.remove("fa-stop");
        play.classList.add("fa-play");
        isPaused = 1;
        play.style.paddingLeft = "0.3vmin;"
    }, startTime);


    Tone.Transport.start();
}


function stopChordProgression() {
    Tone.Transport.stop();
    Tone.Transport.cancel();
}

function chord2base(chord) {
    const match = chord.match(/^[A-G](#|b)?/);
    return match ? match[0] : null;
}

function chord2notes(chord) {
    const parsed = splitChord(chord);
    const root = parsed.root;
    let chordType = chord.replace(root, "");
    const slash = parsed.bass;
    if (slash) {
        chordType = chordType.replace(`/${slash}`, "");
        let result = chordTranslator(root, chordType);
        let enharmonicResult = result.map(note => Tonal.Note.enharmonic(note));
        if (result.includes(slash) || enharmonicResult.includes(slash)) {
            // result = result.map(note => Tonal.Note.pitchClass(note));
            const regex = new RegExp(`^${slash}\\d+$`); // 動的に正規表現を作成
            // let index = result.findIndex(item => regex.test(item));
            let updatedArr;
            let index = result.indexOf(slash);
            if (index === -1) {
                index = enharmonicResult.indexOf(slash);
                updatedArr = enharmonicResult.slice(0, index).map(item => {
                    return item.replace(/\d+$/, match => String(Number(match) + 1));
                });
            } else {
                updatedArr = result.slice(0, index).map(item => {
                    return item.replace(/\d+$/, match => String(Number(match) + 1));
                });
            }
            return addBass(addOctave([...result.slice(index), ...updatedArr]), slash);
        } else {
            // const tonic = result[0];
            // result.unshift(Tonal.Note.transpose(tonic, Tonal.Chord.get(`${tonic.replace(/\d+$/, '')}/${slash}`).intervals[0]));
            return addBass(addOctave(result), slash);
        }
    } else {
        return addBass(addOctave(chordTranslator(root, chordType)), root);
    }
}

const addBass = (notes, bass) => [`${bass}${baseOctave - 1}`, ...notes];

function addOctave(notes) {
    const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const flatToSharp = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };
    let result = [];
    let currentOctave = baseOctave;

    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];

        if (flatToSharp[note]) {
            note = flatToSharp[note];
        }
        let currentIndex = scale.indexOf(note);

        if (i > 0) {
            let prevIndex = scale.indexOf(result[i - 1].slice(0, -1));


            if (currentIndex <= prevIndex) {
                currentOctave++;
            }
        }

        result.push(note + currentOctave);
    }

    return result;
}

function reorderArray(arr, start) {
    let index = arr.indexOf(start);
    if (index === -1) return arr;
    return [...arr.slice(index), ...arr.slice(0, index)];
}


function splitChord(chord) {
    const regex = /^([A-G#b]*)(dim|aug|m)?(6|M?7|M?9|M?11|M?13)?([b#]?\d+)?(omit\d+)?(sus\d*)?(\([b#,\d]+\))?(\/[A-Ga-g#b]*)?$/;
    const match = chord.match(regex);

    if (!match) return []; // フォーマットが合わない場合、空の配列を返す

    const [_, root, quality, seventh, alteration, omit, sus, tension, bass] = match;

    return {
        root: root || "",
        modifier: sus || quality || "", // susがあれば優先し、それがなければqualityを設定
        seventh: seventh || "",
        alt: alteration || "", // b5や#5などの変更部分
        omit: omit ? omit.replace("omit", "") : "", // omitを数字だけにする
        tension: tension ? tension.slice(1, -1).split(",") : [], // テンション部分（括弧内）をカンマ区切りで配列化
        bass: bass ? bass.slice(1) : "" // ベース音は "/" を削除
    };
}

play.onclick = e => {
    switch (isPaused) {
        case 0:
            stopChordProgression();
            e.target.classList.remove("fa-stop");
            e.target.classList.add("fa-play");
            isPaused = 1;
            e.target.style.paddingLeft = "0.3vmin;"
            break;
        case 1:
            playChordProgression();
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-stop");
            isPaused = 0;
            break;
    }
}

function updateTensions(tensionsList) {
    tensions.forEach(tension => {
        if (tensionsList.includes(tension.innerText)) {
            tension.classList.add("selected");
        } else {
            tension.classList.remove("selected");
        }
    })
}

save.onclick = e => {
    const data = { key: key, bpm: bpm, chordProgression: chordProgression };
    download_txt("chordance.cdg", JSON.stringify(data))
}

importBtn.onclick = () => fileInput.click();

function download_txt(file_name, data) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = file_name;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

fileInput.onchange = () => {
    const file = fileInput.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const result = JSON.parse(event.target.result);
        key = result.key;
        bpm = Number(result.bpm);
        keyInput.value = key;
        bpmInput.value = bpm;
        chordProgression = result.chordProgression;
        updateHTML();
        updateKey(key);
    };

    reader.readAsText(file);
};

exportMidi.onclick = () => {
    const midi = generateMIDI();
    const bytes = midi.toArray();
    const blob = new Blob([bytes], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chord_progression.mid";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

function generateMIDI() {
    const midi = new Midi();
    const track = midi.addTrack();

    midi.header.setTempo(bpm);

    let time = 0;
    chordProgression.forEach(({ symbol, duration }) => {
        const notes = chord2notes(symbol);
        notes.forEach(note => {
            track.addNote({
                name: note,
                time: time,
                duration: duration,
                velocity: 0.8
            });
        });
        time += duration;
    });

    return midi;
}

sectionContainer.addEventListener("scroll", () => {
    const scrollPosition = sectionContainer.scrollLeft;
    const slideWidth = sectionContainer.clientWidth;
    const activeIndex = Math.round(scrollPosition / slideWidth);

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === activeIndex);
    });
});

indicators.forEach((indicator, index) => {
    indicator.onclick = () => {
        const slideWidth = sectionContainer.clientWidth;
        sectionContainer.scrollTo({
            left: slideWidth * index,
            behavior: "smooth"
        });
    };
});

function noteAccidental(note, key) {
    const scale = Tonal.Scale.get(key).notes;
    const enharmonic = Tonal.Note.enharmonic(note);
}