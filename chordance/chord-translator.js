/* Original from https://github.com/comorebi-notes/chord-translator/tree/master
MIT License https://opensource.org/license/mit */

const translateType = (_type) => {
    const notes = [0, 0, 0, null, null, null, null];
    let type = _type;
    type = type.replace(/ 　/g, "");
    type = type.replace(/[＃♯]/g, "#");
    type = type.replace(/[♭ｂ]/g, "b");
    let tension;
    let omit;

    const omitRegex = /[\(（]?(omit|no)(\d+)[\)）]?/;
    const omitMatch = type.match(omitRegex);
    if (omitMatch) {
        omit = omitMatch[2];
        type = type.replace(omitRegex, "");
    }

    const tensionRegex = /\((.+)\)/;
    const tensionMatch = type.match(tensionRegex);
    if (tensionMatch) {
        tension = tensionMatch[1].replace(/[\s　]+/g, "").split(/[,，]/);
        type = type.replace(tensionRegex, "");
    }

    const parseType = (regex) => {
        if (type.match(regex)) {
            type = type.replace(regex, "");
            return true;
        } else {
            return false;
        }
    };

    switch (true) {
        case parseType(/^M(?!(7|9|11|13|aj))/): break;
        case parseType(/^m(?!aj)/): notes[1] = -1; break;
    }
    switch (true) {
        case parseType(/aug5?|\+(?!\d)/): notes[2] = 1; break;
        case parseType(/[Φφø]/): notes[1] = -1; notes[2] = -1; notes[3] = 0; break;
    }
    switch (true) {
        case parseType(/[\+#]5/): notes[2] = 1; break;
        case parseType(/[-b]5/): notes[2] = -1; break;
    }
    switch (true) {
        case parseType(/^5/): notes[1] = null; break;
        case parseType(/^6/): notes[3] = -1; break;
        case parseType(/^7/): notes[3] = 0; break;
        case parseType(/^9/): notes[3] = 0; notes[4] = 0; break;
        case parseType(/^11/): notes[3] = 0; notes[4] = 0; notes[5] = 0; break;
        case parseType(/^13/): notes[3] = 0; notes[4] = 0; notes[5] = 0; notes[6] = 0; break;
    }
    switch (true) {
        case parseType(/sus4/): notes[1] = 1; break;
        case parseType(/sus2/): notes[1] = -2; break;
    }
    switch (true) {
        case parseType(/add2/): notes[4] = -12; break;
        case parseType(/add9/): notes[4] = 0; break;
        case parseType(/add4/): notes[5] = -12; break;
        case parseType(/add11/): notes[5] = 0; break;
        case parseType(/add6/): notes[6] = -12; break;
        case parseType(/add13/): notes[6] = 0; break;
    }
    switch (true) {
        case parseType(/(M|[Mm]aj|△|Δ)7/): notes[3] = 1; break;
        case parseType(/(M|[Mm]aj|△|Δ)9/): notes[3] = 1; notes[4] = 0; break;
        case parseType(/(M|[Mm]aj|△|Δ)11/): notes[3] = 1; notes[4] = 0; notes[5] = 0; break;
        case parseType(/(M|[Mm]aj|△|Δ)13/): notes[3] = 1; notes[4] = 0; notes[5] = 0; notes[6] = 0; break;
    }
    switch (true) {
        case parseType(/^(dim|o)7/): notes[1] -= 1; notes[2] -= 1; notes[3] = -1; break;
        case parseType(/^(dim|o)/): notes[1] -= 1; notes[2] -= 1; break;
    }
    if (tension) type += tension.join("");
    if (parseType(/[\+#]5/)) notes[2] = 1;
    if (parseType(/[-b]5/)) notes[2] = -1;
    if (parseType(/M7/)) notes[3] = 1;
    if (parseType(/7/)) notes[3] = 0;
    if (parseType(/[\+#]9/)) notes[4] = 1;
    if (parseType(/[-b]9/)) notes[4] = -1;
    if (parseType(/9/)) notes[4] = 0;
    if (parseType(/[\+#]11/)) notes[5] = 1;
    if (parseType(/[-b]11/)) notes[5] = -1;
    if (parseType(/11/)) notes[5] = 0;
    if (parseType(/[\+#]13/)) notes[6] = 1;
    if (parseType(/[-b]13/)) notes[6] = -1;
    if (parseType(/13/)) notes[6] = 0;
    switch (omit) {
        case "1": notes[0] = null; break;
        case "3": notes[1] = null; break;
        case "5": notes[2] = null; break;
        case "7": notes[3] = null; break;
        case "9": notes[4] = null; break;
        case "11": notes[5] = null; break;
        case "13": notes[6] = null; break;
    }
    if (type.length > 0 || notes.filter(note => note !== null).length < 2) {
        return false;
    }
    return notes;
};

// const transposer = (note, interval) => Tonal.Note.fromMidi(Tonal.Note.midi(note) + interval);
const transposer = (note, semitones) => Tonal.Note.transpose(note, Tonal.Interval.fromSemitones(semitones));


const buildChord = (root, translator) => {
    const notes = [];
    const chord13 = Tonal.Chord.notes("13", root);
    chord13.splice(5, 0, Tonal.Note.transpose(root, "M11"));
    for (let i = 0; i < 7; i += 1) {
        if (translator[i] !== null) notes.push(Tonal.Note.enharmonic(transposer(chord13[i], translator[i])));
    }
    return notes;
};

const chordTranslator = (root, type = "") => {
    // const root = addOctave(_root);
    // const root = `${_root}3`;

    const translator = translateType(type);

    if (!translator) return false;

    // const notes = buildChord(`${root}${baseKey}`, baseNotes, translator, baseKey);
    const notes = buildChord(root, translator);

    return notes;
};

// const addOctave = (note) => {
//     // 音名と対応するデフォルトのオクターブ番号を定義
//     const defaultOctave = {
//         C: 4,
//         D: 4,
//         E: 4,
//         F: 4,
//         G: 4,
//         A: 3,
//         B: 3
//     };

//     // 入力音符の先頭文字を取得
//     const baseNote = note[0].toUpperCase();

//     // 該当する音名が存在すればオクターブ番号を追加する
//     if (defaultOctave[baseNote] !== undefined) {
//         return baseNote + note.slice(1) + defaultOctave[baseNote];
//     }

//     // 無効な入力の場合はそのまま返す
//     return note;
// }

// C
// C4 E4 G4

// CM7
// C4 E4 G4 B4

// CM7/E
// E4 G4 B4 C5

// CM7/D
// D3 C4 E4 G4 B4

// G7
// G4 B4 D5 F5

// G7/F
// F4 D5 G5 B5

// G
// G4 B4 D5

// G/D
// D4 G4 B4