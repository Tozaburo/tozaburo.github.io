document.getElementById("input").oninput = e => {
    let input = e.target.value.trim();
    if (!input) {
        input = "Dm7 Db7 CM7 F7";
    }

    const chordArr = input.split(" ");

    let html = "";
    const outputArea = document.getElementById('result');

    if (!chordArr.length) return;

    let previousMidi = null;

    chordArr.forEach((chord, index) => {
        const rootCurrent = extractRoot(chord);
        if (index > 0) {
            if (rootCurrent) {
                const midiCurrent = Tonal.Note.midi(`${rootCurrent}4`);
                if (midiCurrent !== null) {
                    const interval = previousMidi - midiCurrent;
                    if ((interval + 24) % 12 == 7) {
                        html += `<span class="arrow red">▶</span>`
                    } else if ((interval + 24) % 12 === 1) {
                        html += `<span class="arrow blue">▶</span>`
                    } else {
                        html += `<span class="arrow">▶</span>`
                    }

                    previousMidi = midiCurrent;
                } else {
                    previousMidi = null;
                }
            } else {
                previousMidi = null;
            }
        } else {
            const rootFirst = extractRoot(chord);
            if (rootFirst) {
                const midiFirst = Tonal.Note.midi(`${rootCurrent}4`);
                previousMidi = midiFirst !== null ? midiFirst : null;
            } else {
                previousMidi = null;
            }
        }

        html += `<span class="chord flexB">${chord}</span>`

        outputArea.innerHTML = html;
    });
}

function extractRoot(chordStr) {
    chordStr = chordStr.replace("♭", "b");
    chordStr = chordStr.replace("＃", "#");
    chordStr = chordStr.replace("♯", "#");
    const match = chordStr.match(/^[A-Ga-g][#b]?/);
    return match ? match[0] : null;
}