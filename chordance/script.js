"use strict";

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

            ["VIIm(b5)", "VIIm7(b5)"]
        ]
    },
    // minor: {
    //     tonic: [
    //         ["VIm", "VIm7"],
    //         ["I", "IM7"],
    //     ],
    //     subDominant: [
    //         ["IIm", "IIm7"],
    //         ["IVM7", "IV"],
    //         ["VIIm(b5)", "VIIm7(b5)"],
    //     ],
    //     dominant: [
    //         ["IIIm", "IIIm7"],
    //         ["V", "V7"],
    //     ]
    // },
    minor: {
        tonic: [
            ["Im", "Im7"],
            ["bIII", "bIIIM7"],
        ],
        subDominant: [
            ["IVm", "IVm7"],
            ["bVI", "bVIM7"],
            ["IIm(b5)", "IIm7(b5)"],
        ],
        dominant: [
            ["Vm", "Vm7"],
            ["bVII", "bVII7"],
        ]
    },
    "harmonic minor": {
        tonic: [
            ["Im", "ImM7"],
            ["bIIIaug", "bIIIaugM7"],
        ],
        subDominant: [
            ["IVm", "IVm7"],
            ["bVI", "bVIM7"],
            ["IIm(b5)", "IIm7(b5)"],
        ],
        dominant: [
            ["V", "V7"],
            ["VIIdim", "VIIdim7"],
        ]
    },
    "melodic minor": {
        tonic: [
            ["Im", "ImM7"],
            ["bIIIaug", "bIIIaugM7"],
            ["VIm(b5)", "VIm7(b5)"],
        ],
        subDominant: [
            ["IIm", "IIm7"],
        ],
        dominant: [
            ["V", "V7"],
            ["VIIm(b5)", "bVIIm7(b5)"],
            ["IV", "IV7"],
        ]
    },
    other: {
        tonic: [
            ["I", "IM7"],
            ["VIm", "VIm7"],
            ["IIIm", "IIIm7"],
        ],
        subDominant: [
            ["IV", "IVM7"],
            ["IIm", "IIm7"],
            ["VIIm(b5)", "VIIm7(b5)"],
        ],
        dominant: [
            ["V", "V7"],
            ["IIIm", "IIIm7"],
            ["VIIm(b5)", "VIIm7(b5)"],
        ]
    },
    lydian: {
        tonic: [
            ["I", "IM7"], ["IIIm", "IIIm7"], ["VIm", "VIm7"]
        ],
        subDominant: [
            ["#IVm(b5)", "#IVm7(b5)"], ["II", "II7"]
        ],
        dominant: [
            ["V", "VM7"], ["VIIm", "VIIm7"]
        ]
    },
    mixolydian: {
        tonic: [
            ["I", "I7"], ["VI", "VIm7"]
        ],
        subDominant: [
            ["II", "IIm7"], ["IV", "IVM7"]
        ],
        dominant: [
            ["IIIm(b5)", "IIIm7(b5)"], ["V", "Vm7"], ["bVII", "bVIIM7"]
        ]
    },
    dorian: {
        tonic: [
            ["Im", "Im7"], ["bIII", "bIIIM7"], ["Vm", "Vm7"], ["bVII", "bVIIM7"]
        ],
        subDominant: [
            ["II", "IIm7"], ["IV", "IV7"]
        ],
        dominant: [
            ['VIm(b5)', 'VIm7(b5)']
        ]
    },
    phrygian: {
        tonic: [
            ['Im', 'Im7'], ['bIII', 'bIII7']
        ],
        subDominant: [
            ['IVm', 'IVm7'], ['bVI', 'bVIM7']
        ],
        dominant: [
            ['bII', 'bIIM7'], ['Vm(b5)', 'Vm7(b5)'], ['bVIIm', 'bVIIm7']
        ]
    },
    locrian: {
        tonic: [
            ["Im(b5)", "Im7(b5)"], ["IVm", "IVm7"], ["bVIIm", "bVIIm7"], ["bIIIm", "bIIIm7"]
        ],
        subDominant: [
            ["bII", "bIIM7"], ["bV", "bVM7"]
        ],
        dominant: [
            ["bVI", "bVI7"]
        ]
    }
}

// const noteLengths = [1, 0.75, 0.5, 0.375, 0.25, 0.1875, 0.125, 0.0625];
const noteLengths = [1, 0.75, 0.5, 0.375, 0.25, 0.1875, 0.125];
const noteNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const basicNoteNames = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];
let pianoNoteNames = [
    "C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2",
    "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
    "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
    "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5"
];
const modeAndTonalCenter = {
    "lydian": "F",
    "major": "C",
    "mixolydian": "G",
    "dorian": "D",
    "minor": "A",
    "harmonic minor": "A",
    "melodic minor": "A",
    "phrygian": "E",
    "locrian": "B"
}
const modes = ["lydian", "major", "mixolydian", "dorian", "minor", "harmonic minor", "melodic minor", "phrygian", "locrian"]
const cMajor = ["C", "D", "E", "F", "G", "A", "B"];
const ids = ["root", "modifier", "seventh", "omit", "tension", "omitRoot", "inversion", "bass"]
const functions = ["t", "s", "d"];

// const keyInput = document.getElementById("key");
const keyRoot = document.getElementById("key-root");
const keyMode = document.getElementById("key-mode");
const tonic = document.getElementById("tonic");
const subDominant = document.getElementById("sub-dominant");
const dominant = document.getElementById("dominant");
const chords = document.getElementById("chords");
const duration = document.getElementById("duration");
const chordName = document.getElementById("chord-name");
const play = document.getElementById("play");
const bpmInput = document.getElementById("bpm");
const octaveInput = document.getElementById('octave');
const deleteBtn = document.getElementById("delete");
const vmin = Math.min(window.innerWidth, window.innerHeight) / 100;
const root = document.getElementById("root");
const modifier = document.getElementById("modifier");
const seventh = document.getElementById("seventh");
const omit = document.getElementById("omit");
const omitRoot = document.getElementById('omit-root');
const inversion = document.getElementById('inversion');
const bass = document.getElementById("bass");
const save = document.getElementById('save');
const importBtn = document.getElementById('import');
const fileInput = document.getElementById('fileInput');
const exportMidi = document.getElementById('export');
const sectionContainer = document.getElementById('section-container');
const alternative = document.getElementById('alternative');
const pianoRoll = document.getElementById('piano-roll');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const relative = document.getElementById('relative');
const popupBackground = document.getElementById('popup-background');
const addKeyButton = document.getElementById('add-key-button');
const alternativeInfo = document.getElementById('alternative-info');
const chordInfo = document.getElementById('chord-info');

const functionColor = document.querySelectorAll(".function");
const tensions = document.querySelectorAll(".tension");
const indicators = document.querySelectorAll(".indicator");
const popup = document.querySelectorAll(".popup");

const selects = [root, modifier, seventh, omit, tensions, omitRoot, inversion, bass];

let chord = document.querySelectorAll("a.chord");
let handle = document.querySelectorAll("span.handle");
let piano = document.querySelectorAll("span.piano");
let otherKeys = document.querySelectorAll(".other-keys");
let chordAlternative = document.querySelectorAll(".chord-alternative");

let chordProgression = [];
let key = "C major";
let keys = [];
let scale;
let enharmonicScale;
let relativeMajor;
let bpm = 120;
let isPaused = 1;
let isResizing = false;
let resizingIndex = 0;
let classifyRelative = false;

let baseOctave = 4;
pianoNoteNames = updatePianoNoteNames(baseOctave);

let diatonic = {};

const enharmonicNoteByPiano = (note) => pianoNoteNames.includes(note) ? note : Tonal.Note.enharmonic(note);

function updatePianoNoteNames(baseOctave) {
    let result = [];
    for (let i = 0; i < 4; i++) {
        result.push(...noteNames.map(note => `${note}${baseOctave + i - 1}`));
    }
    return result;
}

function chord2html(chord) {
    let result = "";
    if (chord.includes("^")) {
        if (chord.includes("/")) {
            const splitted = chord.split(/[\^\/]/)
            result = `${splitted[0]}<span class="superscript">${splitted[1]}</span>/${splitted[2]}`;
        } else {
            const splitted = chord.split("^")
            result = `${splitted[0]}<span class="superscript">${splitted[1]}</span>`;
        }
    } else {
        result = chord;
    }
    return result;
}

bpmInput.onchange = e => {
    const input = Number(e.target.value);
    if (input !== NaN && input > 0) {
        bpm = input;
    } else {
        e.target.value = bpm;
    }
}

octaveInput.onchange = e => {
    const input = Number(e.target.value);
    if (input !== NaN && input > 0 && input % 1 === 0) {
        baseOctave = input;
        pianoNoteNames = updatePianoNoteNames(baseOctave);
    } else {
        e.target.value = baseOctave;
    }
}

updateKey();
limitKeyRoot(keyRoot.value, keyMode.value);

keyRoot.onchange = () => {
    key = `${keyRoot.value} ${keyMode.value}`;
    updateKey();
}

keyMode.onchange = () => {
    limitKeyRoot(keyRoot.value, keyMode.value);

    key = `${keyRoot.value} ${keyMode.value}`;
    updateKey();
}

function getFifths(tonalCenter) {
    const roots = [tonalCenter];
    for (let i = 0; i < 6; i++) {
        roots.push(Tonal.Note.transposeFifths(tonalCenter, (i + 1)))
    }

    for (let i = -5; i <= -1; i++) {
        roots.push(Tonal.Note.transposeFifths(tonalCenter, (i)))
    }

    return roots;
}

function limitKeyRoot(keyRootValue, keyMode) {
    const tonalCenter = modeAndTonalCenter[keyMode];

    const roots = getFifths(tonalCenter);

    let html = "";

    basicNoteNames.forEach(note => {
        if (roots.includes(note)) {
            if (note == keyRootValue) {
                html += `<option value="${note}" selected>${note}</option>`;
            } else if (Tonal.Note.enharmonic(note) == keyRootValue) {
                html += `<option value="${note}" selected>${note}</option>`;
            } else {
                html += `<option value="${note}">${note}</option>`;
            }
        } else {
            html += `<option value="${note}" disabled>${note}</option>`;
        }
    })

    keyRoot.innerHTML = html;
}

relative.onchange = e => {
    classifyRelative = !classifyRelative;
    updateKey()
}

function updateKey() {
    const chordFunctions = ["tonic", "sub-dominant", "dominant"];

    // scale = Tonal.Scale.get(key).notes.map(note => noteNames.includes(note) ? note : Tonal.Note.enharmonic(note));
    scale = Tonal.Scale.get(key).notes;
    enharmonicScale = Tonal.Scale.get(key).notes.map(note => noteNames.includes(note) ? note : Tonal.Note.enharmonic(note));
    diatonic = getDiatonicChords(key);
    let mainChords = { ...diatonic };

    // Other keys
    keys.forEach(key => {
        mainChords = mergeChords(mainChords, getDiatonicChords(key));
    })

    chordFunctions.forEach(chordFunction => {
        let html = `<h2 class="medium">${toTitleCase(chordFunction)}</h2>`;
        let t = [];
        mainChords[toCamelCase(chordFunction)].forEach(chord => {
            html += `<p class="normal"><a class="roman" data-function="${chordFunction[0]}">${chord[0]}</a> / <a class="roman" data-function="${chordFunction[0]}">${chord[1]}</a></p>`;
        })
        document.getElementById(chordFunction).innerHTML = html;
    })

    setRomansAction();
}

function mergeChords(array1, array2) {
    const mergeCategory = (cat1, cat2) => {
        const combined = [...cat1, ...cat2];
        const unique = combined.filter((chord, index, self) =>
            index === self.findIndex(c => JSON.stringify(c) === JSON.stringify(chord))
        );
        return unique;
    };

    return {
        tonic: mergeCategory(array1.tonic, array2.tonic),
        subDominant: mergeCategory(array1.subDominant, array2.subDominant),
        dominant: mergeCategory(array1.dominant, array2.dominant)
    };
}

function getDiatonicChords(key) {
    const splittedKey = key.split(" ");
    const root = splittedKey[0];
    const mode = splittedKey[2] ? `${splittedKey[1]} ${splittedKey[2]}` : splittedKey[1];
    const modeIndex = modes.includes(mode) ? modes.indexOf(mode) : 4;
    relativeMajor = `${Tonal.Note.transposeFifths(root, (-1 * (modeIndex - 1)))} major`;
    const basicMode = ["major", "minor", "harmonic minor", "melodic minor"];
    const keyTonic = classifyRelative ? (basicMode.includes(mode) ? root : Tonal.Scale.get(relativeMajor).tonic) : root;
    return degreeNames2chords({
        ...classifyRelative ?
            (basicMode.includes(mode) ? degreeNames[mode] : degreeNames.other) :
            degreeNames[mode]
    }, keyTonic);
}

function degreeNames2chords(degreeNames, keyTonic) {
    Object.keys(degreeNames).forEach(key => {
        degreeNames[key] = degreeNames[key].map(chord => {
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
                seventh = Tonal.Progression.fromRomanNumerals(keyTonic, [chord[1]
                ])[0];
            }

            return [triad, seventh];
        })
    });

    return degreeNames;
}

function setRomansAction() {
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
}

function enharmonicChord(chord) {
    const splitted = splitChord(chord);
    let root = splitted.root;
    let bass = splitted.bass;
    root = basicNoteNames.includes(root) ? root : Tonal.Note.enharmonic(root);
    bass = basicNoteNames.includes(bass) ? bass : Tonal.Note.enharmonic(bass);
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
    const chordData = chordProgression[index];
    duration.value = chordData.duration;

    const chord = chordData.symbol;
    chordName.innerHTML = chord2html(chord);
    chordName.classList.remove(...functions);

    const functionClass = chordData.function;
    chordName.classList.add(functionClass);

    setSelectOption(chord);
    setSelectValue(chord);
    durationChanged(chordData);
    setFunctionColorAction(chordData);
    setDeleteAction(index);
    setSelectAction(index);

    setToolAction(index, chord);
    setAlternativeAction(index, chord, functionClass);

    loadPianoRoll(index);

    setPreviousNextAction(index);
}

function setPreviousNextAction(index) {
    previous.onclick = () => {
        document.querySelector(`[data-index="${index - 1}"]`) && loadChord(document.querySelector(`[data-index="${index - 1}"]`));
    }

    next.onclick = () => {
        document.querySelector(`[data-index="${index + 1}"]`) && loadChord(document.querySelector(`[data-index="${index + 1}"]`));
    }
}

function setToolAction(index, chord) {
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
}

function setAlternativeAction(index, _chord, functionClass) {
    let html = "";
    const chord = splitted2chord({ ...splitChord(_chord), inversion: "", omitRoot: "" });
    const splitted = splitChord(chord);
    let alternativeChords = [];
    const root = splitChord(chord).root;
    const type = chordType(chord, true);
    const notSpecificType = chordType(splitted2chord({ ...splitChord(chord), omit: "", tension: splitted.tension.filter(tension => tension == "b5" || tension == "#5"), omitRoot: "", inversion: "", bass: "" }), true);
    // const chordPosition = findElementPosition(diatonic, chord);

    // modes.forEach(mode => {
    //     const degreeName = degreeNames[mode][chordPosition.key][chordPosition.index1][chordPosition.index2];
    //     const keyTonic = key.split(" ")[0];
    //     let newChord;

    //     if (degreeName.includes("dim")) {
    //         newChord = Tonal.Progression.fromRomanNumerals(keyTonic, [degreeName.replace("dim", "")]) + "dim";
    //     } else if (degreeName.includes("dim7")) {
    //         newChord = Tonal.Progression.fromRomanNumerals(keyTonic, [degreeName.replace("dim7", "")]) + "dim7";
    //     } else {
    //         newChord = Tonal.Progression.fromRomanNumerals(keyTonic, [degreeName])[0];
    //     }

    //     if (!alternativeChords.includes(newChord) && newChord !== chord) {
    //         alternativeChords.push(newChord);
    //     }
    // })

    // const splitted = splitChord(chord);
    // const modifiers = {
    //     t: ["", "m", "aug", "sus2", "sus4"],
    //     s: ["", "m", "aug", "sus2", "sus4"],
    //     d: ["", "m", "dim", "aug", "sus2", "sus4"]
    // };
    // modifiers[functionClass].forEach(modifier => {
    //     if (splitted.modifier !== modifier) {
    //         html += `<a class="medium flexB none chord-alternative ${functionClass}">${splitted2chord({ ...splitted, modifier: modifier })}</a>`;
    //         if (modifier == "m" && !splitted.tension.includes("b5")) {
    //             html += `<a class="medium flexB none chord-alternative ${functionClass}">${splitted2chord({ ...splitted, modifier: modifier, tension: [...splitted.tension, "b5"] })}</a>`;
    //         }

    //         if (modifier == "" && !splitted.tension.includes("b5")) {
    //             html += `<a class="medium flexB none chord-alternative ${functionClass}">${splitted2chord({ ...splitted, tension: [...splitted.tension, "b5"] })}</a>`;
    //         }
    //     }
    // })

    modes.forEach(mode => {
        const newChord = convertChordToNewScale(chord, key, `${key.split(" ")[0]} ${mode}`);
        if (newChord) {
            if (newChord !== chord) {
                if (alternativeChords.some(item => item.chord === newChord)) {
                    const i = alternativeChords.findIndex(item => item.chord === newChord);
                    alternativeChords[i].desc.push(mode);
                } else {
                    alternativeChords.push({ chord: newChord, desc: [mode] });
                }
            }
        }
    })

    alternativeChords = alternativeChords.map(item => ({
        chord: item.chord,
        desc: `Modal interchange from ${formatList(item.desc.map(mode => (mode === "minor" ? "aeolian" : mode)).map(mode => mode.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')), "or")}.`
    }));

    const fifths = getFifths("C");

    let enharmonicRoot = root;

    if (!fifths.includes(root)) {
        enharmonicRoot = Tonal.Note.enharmonic(root);
        if (!fifths.includes(root)) {
            enharmonicRoot = Tonal.Note.enharmonic(root);
        }
    }

    alternativeChords.push({ chord: `${fifths[(fifths.indexOf(enharmonicRoot) + 6) % 12]}${type}`, desc: "Tritone Substitution." })

    switch (notSpecificType) {
        case ("m7"):
            // 6
            // alternativeChords.push({ chord: `${Tonal.Note.transpose(root, "3m")}6`, desc: "Same notes." })
            alternativeChords.push({ chord: returnNewChord(splitted, { root: Tonal.Note.transpose(root, "3m"), modifier: "", seventh: "6", tension: "" }), desc: "Same notes." })
            break;
        case ("m9"):
            alternativeChords.push({ chord: returnNewChord(splitted, { root: Tonal.Note.transpose(root, "3m"), modifier: "", seventh: "6", tension: ["9"] }), desc: "Same notes." })
            break;
        case ("m11"):
            alternativeChords.push({ chord: returnNewChord(splitted, { root: Tonal.Note.transpose(root, "3m"), modifier: "", seventh: "6", tension: ["9", "11"] }), desc: "Same notes." })
            break;
        case ("m13"):
            alternativeChords.push({ chord: returnNewChord(splitted, { root: Tonal.Note.transpose(root, "3m"), modifier: "", seventh: "6", tension: ["9", "11", "13"] }), desc: "Same notes." })
            break;
        case ("6"):
            // m7
            alternativeChords.push({ chord: returnNewChord(splitted, { root: Tonal.Note.transpose(root, "-3m"), modifier: "m", seventh: "7", tension: "" }), desc: "Same notes." })
            break;
        case ("m7(b5)"):
            // m6
            alternativeChords.push({ chord: returnNewChord(splitted, { root: Tonal.Note.transpose(root, "3m"), modifier: "m", seventh: "6", tension: "" }), desc: "Same notes." })
            break;
        case ("m6"):
            // m7(b5)
            alternativeChords.push({ chord: returnNewChord(splitted, { root: Tonal.Note.transpose(root, "-3m"), modifier: "m", seventh: "7", tension: "b5" }), desc: "Same notes." })
            break;
    }




    alternative.innerHTML = alternativeChords.length ? alternativeChords.map(alternativeChord => `<a class="medium flexB none chord-alternative ${functionClass}" data-desc="${alternativeChord.desc}">${alternativeChord.chord}</a>`).join("") : `<a class="medium flexB none chord-alternative">---</a>`;

    chordAlternative = document.querySelectorAll(".chord-alternative");

    chordAlternative.forEach(elm => {
        elm.onclick = e => {
            chordProgression[index].symbol = e.target.innerHTML;
            updateHTML();
            loadChord(document.querySelector(`[data-index="${index}"]`));
        }

        elm.onmousemove = e => {
            alternativeInfo.style.left = `${e.clientX}px`;
            alternativeInfo.style.top = `${e.clientY}px`;
        }

        elm.onmouseenter = e => {
            alternativeInfo.innerHTML = `<h5 class="normal">${e.target.dataset.desc}</h5`;
            alternativeInfo.style.opacity = "1";
        }

        elm.onmouseleave = () => {
            alternativeInfo.style.opacity = "0";
        }
    })
}

function returnNewChord(splitted, newData) {
    return splitted2chord({ ...splitted, root: newData.root, modifier: newData.modifier, seventh: newData.seventh, tension: [...splitted.tension.filter(tension => tension !== "b5" && tension !== "#5"), newData.tension] });
}

function formatList(items, conjunction = "and") {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    const lastItem = items.pop();
    return `${items.join(", ")} ${conjunction} ${lastItem}`;
}

function chordType(chord, specific = false) {
    const splitted = splitChord(chord);
    if (specific) {
        return splitted2chord({ ...splitted, root: "" })
    } else {
        return splitted2chord({ ...splitted, root: "", omit: "", tension: [], omitRoot: "", inversion: "", bass: "" })
    }
}

function convertChordToNewScale(chord, originalScale, newScale) {
    const chordNotes = chord2notes(chord, false);
    const originalScaleNotes = Tonal.Scale.get(originalScale).notes;
    const newScaleNotes = Tonal.Scale.get(newScale).notes;

    const newChordNotes = chordNotes.map(note => {
        const originalIndex = originalScaleNotes.indexOf(Tonal.Note.pitchClass(note));
        if (originalIndex === -1) {
            return null;
        }
        return newScaleNotes[originalIndex];
    });

    if (newChordNotes.includes(null)) {
        return null;
    }

    return notes2chord(newChordNotes);
}


function notes2chord(notes) {
    const tonic = notes[0];
    let intervals = notes.map(note => Tonal.Interval.distance(tonic, note));
    intervals = [...new Set(intervals)];

    // { root: any; modifier: any; seventh: any; omit: any; tension: any; omitRoot: any; inversion: any; bass: any; }

    if (JSON.stringify(intervals) == JSON.stringify(['1P', '3m', '5d', '7d'])) {
        return `${tonic}dim7`;
    } else {

        const splitted = { root: tonic };

        const maps = {
            third: {
                "3M": {
                    value: "",
                    key: "modifier"
                },
                "3m": {
                    value: "m",
                    key: "modifier"
                },
                "4P": {
                    value: "sus4",
                    key: "modifier"
                },
                "2M": {
                    value: "sus2",
                    key: "modifier"
                },
                "": {
                    value: "omit3",
                    key: "omit"
                }
            },
            fifth: {
                "5P": {
                    value: "",
                    key: "tension"
                },
                "5A": {
                    value: "aug",
                    key: "modifier"
                },
                "5d": {
                    value: "b5",
                    key: "tension"
                },
                "": {
                    value: "omit5",
                    key: "omit"
                }
            },
            seventh: {
                "7M": {
                    value: "M7",
                    key: "seventh"
                },
                "7m": {
                    value: "7",
                    key: "seventh"
                },
                "6M": {
                    value: "6",
                    key: "seventh"
                },
            }
        };

        for (const mapKey of Object.keys(maps)) {
            const map = maps[mapKey];
            for (const intervalKey of Object.keys(map)) {
                const interval = map[intervalKey];
                if (!intervalKey || intervals.includes(intervalKey)) {
                    if (interval.key === "tension") {
                        if (interval.value) {
                            if (splitted.tension) {
                                splitted.tension.push(interval.value);
                            } else {
                                splitted.tension = [interval.value];
                            }
                        }
                    } else {
                        splitted[interval.key] = interval.value;
                    }
                    intervals = intervals.filter(n => n !== intervalKey);
                    break;
                }
            }
        }

        const interval2tension = {
            "2m": "b9",
            "2M": "9",
            "2A": "#9",
            "3m": "#9",
            "4P": "11",
            "4A": "#11",
            "5d": "#11",
            "5A": "b13",
            "6m": "b13",
            "6M": "13"
        };

        intervals = intervals.filter(item => item !== "1P");

        intervals.forEach(interval => {
            if (splitted.tension) {
                splitted.tension.push(interval2tension[interval]);
            } else {
                splitted.tension = [interval2tension[interval]];
            }
        })

        return splitted2chord(splitted);
    }


    // const chordPatterns = {
    //     "": ["1P", "3M", "5P"],
    //     "7": ["1P", "3M", "5P", "7m"],
    //     "M7": ["1P", "3M", "5P", "7M"],
    //     "m": ["1P", "3m", "5P"],
    //     "m7": ["1P", "3m", "5P", "7m"],
    //     "mM7": ["1P", "3m", "5P", "7M"],
    //     "m(b5)": ["1P", "3m", "5d"],
    //     "m7(b5)": ["1P", "3m", "5d", "7m"],
    //     "dim7": ["1P", "3m", "5d", "7d"],
    //     "aug": ["1P", "3M", "5A"],
    //     "augM7": ["1P", "3M", "5A", "7M"],
    // };

    // for (const [chordName, pattern] of Object.entries(chordPatterns)) {
    //     if (JSON.stringify(intervals) === JSON.stringify(pattern)) {
    //         return `${tonic}${chordName}`;
    //     }
    // }

    // let detected = Tonal.Chord.detect(notes)[0];

    // const converter = [
    //     {
    //         condition: "dim7",
    //         flip: true,
    //         from: "dim",
    //         to: "m(b5)"
    //     },
    //     {
    //         condition: "(b5)",
    //         flip: true,
    //         from: "b5",
    //         to: "(b5)"
    //     },
    //     {
    //         condition: "Mb5",
    //         flip: false,
    //         from: "Mb5",
    //         to: "(b5)"
    //     },
    //     {
    //         condition: "maj7",
    //         flip: false,
    //         from: "maj7",
    //         to: "M7"
    //     },
    //     {
    //         condition: "m/ma7",
    //         flip: false,
    //         from: "m/ma7",
    //         to: "mM7"
    //     },
    // ]

    // converter.forEach(replacement => {
    //     if (replacement.flip) {
    //         detected = detected.includes(replacement.condition) ? detected : detected.replace(replacement.from, replacement.to);
    //     } else {
    //         detected = detected.includes(replacement.condition) ? detected.replace(replacement.from, replacement.to) : detected;
    //     }
    // })

    // return detected;
}

function setSelectAction(index) {
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
}

function setDeleteAction(index) {
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
            alternative.innerHTML = `<a class="medium flexB none chord-alternative">---</a>`;
        }
    }
}

function setFunctionColorAction(chordData) {
    functionColor.forEach(elm => {
        elm.onclick = event => {
            const color = event.target.dataset.function;
            chordName.classList.remove(...functions);
            chordName.classList.add(color);
            chordData.function = color;
            updateHTML();
        }
    })
}

function durationChanged(chordData) {
    duration.onchange = event => {
        chordData.duration = Number(event.target.value);
        updateHTML();
    }
}

function setSelectOption(chord) {
    const root = splitChord(chord).root;
    const notes = chord2noteNames(chord);
    let html = `<option disabled selected>---</option>
<option value=""></option>`;
    notes.forEach(note => {
        if (note !== root) {
            html += `<option value="${note}">^${note}</option>`;
        }
    })
    inversion.innerHTML = html;
}

function chord2noteNames(chord) {
    const splitted = splitChord(chord);
    let intervals = ["1P", "3M", "5P"];

    switch (splitted.modifier) {
        case ("sus4"):
            intervals[1] = "4P";
            break;
        case ("aug"):
            intervals[2] = "5A";
            break;
        case ("m"):
            intervals[1] = "3m";
            break;
        case ("dim"):
            intervals[1] = "3m";
            intervals[2] = "5d";
            break;
        case ("sus2"):
            intervals[1] = "2M";
            break;
    }

    switch (splitted.seventh) {
        case ("M7"):
            intervals[3] = "7M";
            break;
        case ("M9"):
            intervals[3] = "7M";
            intervals[4] = "9M";
            break;
        case ("M11"):
            intervals[3] = "7M";
            intervals[4] = "9M";
            intervals[5] = "11P";
            break;
        case ("M13"):
            intervals[3] = "7M";
            intervals[4] = "9M";
            intervals[5] = "11P";
            intervals[6] = "13M";
            break;
        case ("7"):
            if (splitted.modifier === "dim") {
                intervals[3] = "7d";
            } else {
                intervals[3] = "7m";
            }
            break;
        case ("9"):
            if (splitted.modifier === "dim") {
                intervals[3] = "7d";
                intervals[4] = "9M";
            } else {
                intervals[3] = "7m";
                intervals[4] = "9M";
            }
            break;
        case ("11"):
            if (splitted.modifier === "dim") {
                intervals[3] = "7d";
                intervals[4] = "9M";
                intervals[5] = "11P";
            } else {
                intervals[3] = "7m";
                intervals[4] = "9M";
                intervals[5] = "11P";
            }
            break;
        case ("13"):
            if (splitted.modifier === "dim") {
                intervals[3] = "7d";
                intervals[4] = "9M";
                intervals[5] = "11P";
                intervals[6] = "13M";
            } else {
                intervals[3] = "7m";
                intervals[4] = "9M";
                intervals[5] = "11P";
                intervals[6] = "13M";
            }
            break;
        case ("6"):
            intervals[3] = "6M";
            break;
    }

    const tensionMap = {
        "b9": "9m",
        "9": "9M",
        "#9": "9A",
        "11": "11P",
        "#11": "11A",
        "b13": "13m",
        "13": "13M",
    };

    splitted.tension.forEach(tension => {
        intervals.push(tensionMap[tension]);
        if (tension === "b5") {
            intervals[2] = "5d";
        } else if (tension === "#5") {
            intervals[2] = "5A";
        }
    })

    switch (splitted.omit) {
        case ("omit3"):
            intervals[1] = undefined;
            break;
        case ("omit5"):
            intervals[2] = undefined;
            break;
    }


    intervals = intervals.filter(interval => interval != undefined);

    return intervals.map(interval => Tonal.Note.transpose(splitted.root, interval));
}

function chord2chordTranslator(chord) {
    const parsed = splitChord(chord);
    const root = parsed.root;
    const inversion = parsed.inversion;
    const omitRoot = parsed.omitRoot;
    let chordType = chord.replace(root, "");

    if (inversion) {
        chordType = chordType.replace(`^${inversion}`, "");
    }

    if (omitRoot) {
        chordType = chordType.replace("'", "");
    }

    const slash = parsed.bass;
    chordType = chordType.replace(`/${slash}`, "");
    return chordTranslator(root, chordType);
}

function setSelectValue(chord) {
    ids.forEach((key, i) => {
        if (key == "tension") {
            updateTensions(splitChord(chord)[key]);
        } else {
            selects[i].value = splitChord(chord)[key];
        }
    })
}

function loadPianoRoll(index) {
    let html = "";

    const prevNotes = chordProgression[index - 1] ? chord2notes(chordProgression[index - 1].symbol).map(note => enharmonicNoteByPiano(note)) : [];
    const currNotes = chordProgression[index] ? chord2notes(chordProgression[index].symbol).map(note => enharmonicNoteByPiano(note)) : [];
    const nextNotes = chordProgression[index + 1] ? chord2notes(chordProgression[index + 1].symbol).map(note => enharmonicNoteByPiano(note)) : [];
    // prevNotes.shift();
    // currNotes.shift();
    // nextNotes.shift();

    console.log(currNotes)

    // for (let i = 35; i >= 0; i--) {
    for (let i = 47; i >= 0; i--) {
        html += div([enharmonicScale.includes(noteNames[i % 12]) ? "diatonic" : "chromatic"]);
    }

    html += chordHTML(prevNotes);

    html += chordHTML(currNotes);

    html += chordHTML(nextNotes);

    pianoRoll.innerHTML = html;
}

function loadPianoRollPopup() {
    piano.forEach(elm => {
        elm.onmousemove = e => {
            chordInfo.style.left = `${e.clientX}px`;
            chordInfo.style.top = `${e.clientY}px`;
        }
    })

    piano.forEach(item => {
        item.onmouseenter = e => {
            if (!isResizing) {
                let html = "";
                const index = e.target.parentNode.dataset.index;

                const currNotes = chordProgression[index] ? chord2notes(chordProgression[index].symbol).map(note => Tonal.Note.enharmonic(note)) : [];
                // currNotes.shift();

                html += chordHTML(currNotes);

                chordInfo.innerHTML = html;

                chordInfo.style.opacity = "1";
            }
        }

        item.onmouseleave = e => {
            chordInfo.style.opacity = "0";
        }
    });
}

const div = (className) => `<div class="${className.join(" ")}"></div>`;

function chordHTML(notes) {
    let result = "";
    const tritone = isTritone(notes);
    const augment = isAugment(notes);
    let noteIndex = notes.length - 1;
    // for (let i = 35; i >= 0; i--) {
    for (let i = 47; i >= 0; i--) {
        if (notes.includes(pianoNoteNames[i])) {
            let classes = [];
            if (enharmonicScale.includes(Tonal.Note.pitchClass(pianoNoteNames[i]))) {
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
        const key = toCamelCase(select.id); // select要素のidをキーに使用
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
    const {
        root = "",
        modifier = "",
        seventh = "",
        omit = "",
        tension = [],
        omitRoot = "",
        inversion = "",
        bass = ""
    } = splitted;

    const validTension = tension.filter(t => t !== "");

    const omitPart = omit ? (omit.includes("omit") ? omit : `omit${omit}`) : "";
    const tensionPart = validTension.length ? `(${validTension.join(",")})` : "";
    const inversionPart = inversion ? `^${inversion}` : "";
    const bassPart = bass ? `/${bass}` : "";

    return `${root}${modifier.includes("sus") ? seventh : modifier}${modifier.includes("sus") ? modifier : seventh}${omitPart}${tensionPart}${omitRoot}${inversionPart}${bassPart}`;
}



function chord2class(chord) {
    // const isChordIncluded = diatonic.some(section =>
    //     Object.values(section).some(chordPairs =>
    //         chordPairs.some(pair =>
    //             pair.some(diatonicChord => {
    //                 return diatonicChord === chord;
    //             })
    //         )
    //     )
    // );

    // const isChordQualityIncluded = diatonic.some(section =>
    //     Object.values(section).some(chordPairs =>
    //         chordPairs.some(pair =>
    //             pair.some(diatonicChord => {
    //                 const splitDiatonicChord = splitChord(diatonicChord);
    //                 const splitTargetChord = splitChord(chord);

    //                 return splitDiatonicChord.root === splitTargetChord.root &&
    //                     splitDiatonicChord.modifier === splitTargetChord.modifier;
    //             })
    //         )
    //     )
    // );

    // const isChordTonicIncluded = diatonic.some(section =>
    //     Object.values(section).some(chordPairs =>
    //         chordPairs.some(pair =>
    //             pair.some(diatonicChord => {
    //                 const splitDiatonicChord = splitChord(diatonicChord);
    //                 const splitTargetChord = splitChord(chord);

    //                 return splitDiatonicChord.root === splitTargetChord.root;
    //             })
    //         )
    //     )
    // );
    // 
    //
    // if (isChordIncluded) {
    //     return ["bold"];
    // } else if (isChordQualityIncluded) {
    //     return ["bold", "italic"];
    // } else if (isChordTonicIncluded) {
    //     return ["normal"];
    // } else {
    //     return ["normal", "italic"];
    // }

    return ["bold"];
}

function updateHTML() {
    let html = "";
    chordProgression.forEach((chord, index) => {
        // html += `<a class="chord ${chord.function} flexB ${chord.style.join(" ")}" style="width: ${chord.duration * 100}%;" data-index="${index}">${chord2html(chord.symbol)}<span class="material-symbols-outlined piano">piano</span><span class="handle"></span></a>`;
        html += `<a class="chord ${chord.function} flexB ${chord.style.join(" ")}" style="grid-column: span ${chord.duration * 100 / 6.25};" data-index="${index}">${chord2html(chord.symbol)}<span class="material-symbols-outlined piano">piano</span><span class="handle"></span></a>`;
    })
    chords.innerHTML = html;

    chord = document.querySelectorAll("a.chord");

    chord.forEach(elm => {
        elm.onclick = e => {
            loadChord(e.target);
        };

        elm.oncontextmenu = e => {
            e.preventDefault();
            const index = e.target.dataset.index;
            const time = chordProgression[index].duration * (60 / bpm) * 4; // 音の再生時間
            sampler.triggerAttackRelease(chord2notes(chordProgression[index].symbol), time);
        }
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
    });

    piano = document.querySelectorAll("span.piano");

    loadPianoRollPopup();

    document.onmouseup = () => {
        isResizing = false;
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
        C6: "C6.wav",
        C7: "C7.wav",
        C8: "C8.wav",
    },
    baseUrl: "./audio/",
    release: 1,
    volume: -12,
}).toDestination();

let timeouts = [];
async function playChordProgression() {

    await Tone.start();

    Tone.Transport.bpm.value = bpm;

    Tone.Transport.cancel();

    let startTime = 0;

    const secondsPerBeat = 60 / bpm;

    const delays = [];
    timeouts = [];

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
        delays.push(chord.duration * secondsPerBeat * 4)
    });


    Tone.Transport.scheduleOnce(() => {
        Tone.Transport.stop();

        play.classList.remove("fa-stop");
        play.classList.add("fa-play");
        isPaused = 1;
        play.style.paddingLeft = "0.3vmin;"
    }, startTime);


    Tone.Transport.start();

    let totalDelay = 0;

    document.querySelector('[data-index="0"]').classList.add("active");

    for (let i = 0; i < delays.length; i++) {
        totalDelay += delays[i];
        const timeoutId = setTimeout(() => {
            document.querySelector(`[data-index="${i}"]`).classList.remove("active");
            document.querySelector(`[data-index="${i + 1}"]`)?.classList.add("active");
        }, totalDelay * 1000);
        timeouts.push(timeoutId);
    }
}


function stopChordProgression() {
    Tone.Transport.stop();
    Tone.Transport.cancel();

    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]); // 各タイマーをクリア
    }
    document.querySelectorAll("a.chord.active").forEach(elm => {
        elm.classList.remove("active")
    })
}

function chord2base(chord) {
    const match = chord.match(/^[A-G](#|b)?/);
    return match ? match[0] : null;
}

function chord2notes(chord, octave = true) {
    const parsed = splitChord(chord);
    const root = parsed.root;
    const inversion = parsed.inversion;
    const omitRoot = parsed.omitRoot;
    const slash = parsed.bass;

    // let notes = chord2chordTranslator(chord);
    let notes = chord2noteNames(chord);

    if (omitRoot) {
        notes.splice(0, 1);
    }

    // let enharmonicResult = notes.map(note => Tonal.Note.enharmonic(note));

    // if (notes.includes(inversion) || enharmonicResult.includes(inversion)) {
    if (notes.includes(inversion)) {
        const regex = new RegExp(`^${slash}\\d+$`); // 動的に正規表現を作成

        let updatedArr;
        let index = notes.indexOf(inversion);
        updatedArr = notes.slice(0, index);
        notes = [...notes.slice(index), ...updatedArr];
    }

    if (octave) {
        if (slash) {
            return addBass(addOctave(notes), slash);
        } else {
            return addBass(addOctave(notes), root);
        }
    } else {
        return notes;
    }

}

const addBass = (notes, bass) => [`${bass}${baseOctave - 1}`, ...notes];

function addOctave(notes) {
    const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let result = [];
    let currentOctave = baseOctave;

    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];

        let enharmonicNote;
        let currentIndex;
        if (!scale.includes(note)) {
            enharmonicNote = Tonal.Note.enharmonic(note);
            if (!scale.includes(enharmonicNote)) {
                enharmonicNote = Tonal.Note.enharmonic(enharmonicNote);
            }
            currentIndex = scale.indexOf(enharmonicNote);
        } else {
            currentIndex = scale.indexOf(note);
        }

        if (i > 0) {
            let prevNote = result[i - 1].slice(0, -1);

            let prevIndex;
            if (!scale.includes(prevNote)) {
                enharmonicNote = Tonal.Note.enharmonic(prevNote);
                if (!scale.includes(enharmonicNote)) {
                    enharmonicNote = Tonal.Note.enharmonic(enharmonicNote);
                }
                prevIndex = scale.indexOf(enharmonicNote);
            } else {
                prevIndex = scale.indexOf(prevNote);
            }


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
    // const regex = /^([A-G#b]*)(dim|aug|m)?(6|M?7|M?9|M?11|M?13)?(\([b#]?5\))?(omit\d+)?(sus\d*)?(\([b#,\d]+\))?(\^[A-Ga-g#b]*)?(\/[A-Ga-g#b]*)?$/;
    const regex = /^([A-G#b]*)(dim|aug|m)?(6|M?7|M?9|M?11|M?13)?(omit\d+)?(sus\d*)?(\([b#,\d]+\))?(')?(\^[A-Ga-g#b]*)?(\/[A-Ga-g#b]*)?$/;
    const match = chord.match(regex);

    if (!match) return []; // フォーマットが合わない場合、空の配列を返す

    const [_, root, quality, seventh, omit, sus, tension, omitRoot, inversion, bass] = match;

    return {
        root: root || "",
        modifier: sus || quality || "", // susがあれば優先し、それがなければqualityを設定
        seventh: seventh || "",
        // alt: alteration || "", // b5や#5などの変更部分
        // omit: omit ? omit.replace("omit", "") : "", // omitを数字だけにする
        omit: omit ? omit : "", // omitを数字だけにする
        tension: tension ? tension.slice(1, -1).split(",") : [], // テンション部分（括弧内）をカンマ区切りで配列化
        omitRoot: omitRoot || "",
        inversion: inversion ? inversion.slice(1) : "",
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
        const splitted = key.split(" ");
        bpm = Number(result.bpm);
        keyRoot.value = splitted[0];
        keyMode.value = splitted[1];
        bpmInput.value = bpm;
        chordProgression = result.chordProgression;
        updateHTML();
        updateKey();
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

document.getElementById('keys').onclick = () => {
    document.getElementById("add-key-root").value = keyRoot.value;
    document.getElementById("add-key-mode").value = keyMode.value;

    popupBackground.classList.remove("hide");
    document.getElementById('popup-keys').classList.remove("hide");
    const list = document.getElementById('keys-list');
    updateOtherKeys();
}

addKeyButton.onclick = () => {
    const root = document.getElementById("add-key-root").value;
    const mode = document.getElementById("add-key-mode").value;
    const newKey = `${root} ${mode}`
    addKey(newKey, addKeyButton);
}

function addKey(newKey, target) {
    if (keys.includes(newKey) || key == newKey) {
        errorAnimation(target);
    } else {
        keys.push(newKey);
    }
    updateOtherKeys();
    document.getElementById('keys').innerText = `+ ${keys.length} more keys`;
}

function updateOtherKeys() {
    document.getElementById('keys-list').innerHTML = keys.map(key => `<a class="flexB other-keys">${key}</a>`).join("");
    otherKeys = document.querySelectorAll(".other-keys");
    otherKeys.forEach(elm => {
        elm.onclick = e => {
            const parent = e.target.parentNode;
            const children = Array.from(parent.children);
            const index = children.indexOf(e.target);

            keys.splice(index, 1);
            updateOtherKeys();
        }
    })
}

popupBackground.onclick = e => {
    if (e.target === popupBackground) {
        popupBackground.classList.add("hide");
        popup.forEach(elm => {
            elm.classList.add("hide");
        })
        updateKey();
    }
}

function errorAnimation(elm) {
    elm.classList.add("error");
    setTimeout(() => {
        elm.classList.remove("error");
    }, 200)
}

document.querySelectorAll(".add-relative").forEach(elm => {
    elm.onclick = e => {
        const mode = document.getElementById("add-key-mode").value;
        const root = document.getElementById("add-key-root").value;
        const newMode = e.target.dataset.mode;
        switch (newMode) {
            case "major":
                if (mode == "major") {
                    errorAnimation(e.target);
                } else {
                    addKey(`${Tonal.Note.transposeFifths(root, -3)} ${newMode}`, addKeyButton);
                }
                break;
            default:
                if (mode == "major") {
                    addKey(`${Tonal.Note.transposeFifths(root, 3)} ${newMode}`, addKeyButton);
                } else {
                    errorAnimation(e.target);
                }
                break;
        }
    }
})

function convert(mode, degree, key) {
    const quest = Tonal.Progression.toRomanNumerals("C", Tonal.Mode.triads(mode, key));
    const c3 = Tonal.Progression.toRomanNumerals("C", Tonal.Mode.triads(mode, "C"));
    const c4 = Tonal.Progression.toRomanNumerals("C", Tonal.Mode.seventhChords(mode, "C"));
    return [c3[quest.indexOf(degree)], c4[quest.indexOf(degree)]];
}

const findElementPosition = (obj, value) => {
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            for (let i = 0; i < obj[key].length; i++) {
                if (Array.isArray(obj[key][i])) {
                    const index = obj[key][i].indexOf(value);
                    if (index !== -1) {
                        return { key, index1: i, index2: index };
                    }
                }
            }
        }
    }
    return null;
};