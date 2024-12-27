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
            ["VIIdim", "bVIIdim7"],
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
            ["I", "IM7"], ["III", "IIIm7"], ["VI", "VIm7"]
        ],
        subDominant: [
            ["#IVm(b5)", "#IVm7(b5)"]
        ],
        dominant: [
            ["II", "II7"], ["V", "VM7"], ["VII", "VIIm7"]
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
            ["I", "Im7"], ["bIII", "bIIIM7"]
        ],
        subDominant: [
            ["II", "IIm7"], ["IV", "IV7"]
        ],
        dominant: [
            ["V", "Vm7"], ["VIm(b5)", "VIm7(b5)"], ["bVII", "bVIIM7"]
        ]
    },
    phrygian: {
        tonic: [
            ["I", "Im7"], ["bIII", "bIII7"]
        ],
        subDominant: [
            ["bII", "bIIM7"], ["IV", "IVm7"], ["bVI", "bVIM7"]
        ],
        dominant: [
            ["Vm(b5)", "Vm7(b5)"], ["bVII", "bVIIm7"]
        ]
    },
    locrian: {
        tonic: [
            ["Im(b5)", "Im7(b5)"], ["bIII", "bIIIm7"]
        ],
        subDominant: [
            ["bII", "bIIM7"], ["IV", "IVm7"]
        ],
        dominant: [
            ["bV", "bVM7"], ["bVI", "bVIM7"], ["bVII", "bVIIm7"]
        ]
    }
}

const noteLengths = [1, 0.75, 0.5, 0.375, 0.25, 0.1875, 0.125, 0.0625];
const noteNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
let pianoNoteNames = [
    "C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2",
    "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
    "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
    "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5"
];
const modes = ["lydian", "major", "mixolydian", "dorian", "minor", "phrygian", "locrian"]
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
const pianoRoll = document.getElementById('piano-roll');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const relative = document.getElementById('relative');
const popupBackground = document.getElementById('popup-background');

const functionColor = document.querySelectorAll(".function");
const tensions = document.querySelectorAll(".tension");
const indicators = document.querySelectorAll(".indicator");
const chordInfo = document.getElementById('chord-info');
const popup = document.querySelectorAll(".popup");
const addKeyButton = document.getElementById('add-key-button');

const selects = [root, modifier, seventh, omit, tensions, omitRoot, inversion, bass];

let chord = document.querySelectorAll("a.chord");
let handle = document.querySelectorAll("span.handle");
let piano = document.querySelectorAll("span.piano");

let chordProgression = [];
let key = "C major";
let keys = [];
let scale;
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

keyRoot.onchange = () => {
    key = `${keyRoot.value} ${keyMode.value}`;
    updateKey();
}

keyMode.onchange = () => {
    key = `${keyRoot.value} ${keyMode.value}`;
    updateKey();
}

relative.onchange = e => {
    classifyRelative = !classifyRelative;
    updateKey()
}

function updateKey() {
    const chordFunctions = ["tonic", "sub-dominant", "dominant"];

    scale = Tonal.Scale.get(key).notes.map(note => noteNames.includes(note) ? note : Tonal.Note.enharmonic(note));
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
    console.log(relativeMajor)
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

            triad = enharmonicChord(triad);
            seventh = enharmonicChord(seventh);
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
    const notes = chord2chordTranslator(chord);
    let html = `<option disabled selected>---</option>
<option value=""></option>`;
    notes.forEach(note => {
        if (note !== root) {
            html += `<option value="${note}">^${note}</option>`;
        }
    })
    inversion.innerHTML = html;
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

    // for (let i = 35; i >= 0; i--) {
    for (let i = 47; i >= 0; i--) {
        html += div([scale.includes(noteNames[i % 12]) ? "diatonic" : "chromatic"]);
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
            if (scale.includes(Tonal.Note.pitchClass(pianoNoteNames[i]))) {
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
    if (splitted.modifier.includes("sus")) {
        return `${splitted.root}${splitted.seventh}${splitted.omit ? (splitted.omit.includes("omit") ? splitted.omit : `omit${splitted.omit}`) : ""}${splitted.modifier}${splitted.tension[0] ? "(" + splitted.tension.join(",") + ")" : ""}${splitted.omitRoot}${splitted.inversion ? "^" + splitted.inversion : ""}${splitted.bass ? "/" + splitted.bass : ""}`;
    } else {
        return `${splitted.root}${splitted.modifier}${splitted.seventh}${splitted.omit ? (splitted.omit.includes("omit") ? splitted.omit : `omit${splitted.omit}`) : ""}${splitted.tension[0] ? "(" + splitted.tension.join(",") + ")" : ""}${splitted.omitRoot}${splitted.inversion ? "^" + splitted.inversion : ""}${splitted.bass ? "/" + splitted.bass : ""}`;
    }
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
        html += `<a class="chord ${chord.function} flexB ${chord.style.join(" ")}" style="width: ${chord.duration * 100}%;" data-index="${index}">${chord2html(chord.symbol)}<span class="material-symbols-outlined piano">piano</span><span class="handle"></span></a>`;
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

function chord2notes(chord) {
    const parsed = splitChord(chord);
    const root = parsed.root;
    const inversion = parsed.inversion;
    const omitRoot = parsed.omitRoot;
    const slash = parsed.bass;

    let notes = chord2chordTranslator(chord);

    if (omitRoot) {
        notes.splice(0, 1);
    }

    let enharmonicResult = notes.map(note => Tonal.Note.enharmonic(note));

    if (notes.includes(inversion) || enharmonicResult.includes(inversion)) {
        const regex = new RegExp(`^${slash}\\d+$`); // 動的に正規表現を作成

        let updatedArr;
        let index = notes.indexOf(inversion);
        if (index === -1) {
            index = enharmonicResult.indexOf(inversion);
            updatedArr = enharmonicResult.slice(0, index);
        } else {
            updatedArr = notes.slice(0, index);
        }
        notes = [...notes.slice(index), ...updatedArr];
    }

    if (slash) {
        return addBass(addOctave(notes), slash);
    } else {
        return addBass(addOctave(notes), root);
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
        console.log(splitted)
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
    document.getElementById('keys-list').innerHTML = keys.map(key => `<span class="flexB">${key}</span>`).join("");
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