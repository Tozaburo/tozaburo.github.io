function splitChord(chord) {
    // const regex = /^([A-G#b]*)(dim|aug|m)?(6|M?7|M?9|M?11|M?13)?(\([b#]?5\))?(omit\d+)?(sus\d*)?(\([b#,\d]+\))?(\^[A-Ga-g#b]*)?(\/[A-Ga-g#b]*)?$/;
    const regex = /^([A-G#b]*)(dim|aug|m)?(6|M?7|M?9|M?11|M?13)?(sus\d*)?(omit\d+)?(\([b#,\d]+\))?(')?(\^[A-Ga-g#b]*)?(\/[A-Ga-g#b]*)?$/;
    const match = chord.match(regex);

    if (!match) return []; // フォーマットが合わない場合、空の配列を返す

    const [_, root, quality, seventh, sus, omit, tension, omitRoot, inversion, bass] = match;

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

    const validTension = tension[0] ? tension.filter(t => t !== "" && t !== undefined) : [];

    const omitPart = omit ? (omit.includes("omit") ? omit : `omit${omit}`) : "";
    const tensionPart = validTension.length ? `(${validTension.join(",")})` : "";
    const inversionPart = inversion ? `^${inversion}` : "";
    const bassPart = bass ? `/${bass}` : "";

    return `${root}${modifier.includes("sus") ? seventh : modifier}${modifier.includes("sus") ? modifier : seventh}${omitPart}${tensionPart}${omitRoot}${inversionPart}${bassPart}`;
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
            third: [
                {
                    "3M": {
                        value: "",
                        key: "modifier"
                    }
                },
                {
                    "3m": {
                        value: "m",
                        key: "modifier"
                    }
                },
                {
                    "4P": {
                        value: "sus4",
                        key: "modifier"
                    }
                },
                {
                    "2M": {
                        value: "sus2",
                        key: "modifier"
                    }
                },
                {
                    "": {
                        value: "omit3",
                        key: "omit"
                    }
                }
            ],
            fifth: [
                {
                    "5P": {
                        value: "",
                        key: "tension"
                    }
                },
                {
                    "5A": {
                        value: "#5",
                        key: "tension"
                    }
                },
                {
                    "5d": {
                        value: "b5",
                        key: "tension"
                    }
                },
                {
                    "": {
                        value: "omit5",
                        key: "omit"
                    }
                }
            ],
            seventh: [
                {
                    "7M": {
                        value: "M7",
                        key: "seventh"
                    }
                },
                {
                    "7m": {
                        value: "7",
                        key: "seventh"
                    }
                },
                {
                    "6M": {
                        value: "6",
                        key: "seventh"
                    }
                }
            ]
        };


        // for (const mapKey of Object.keys(maps)) {
        //     const map = maps[mapKey];
        //     for (const intervalKey of Object.keys(map)) {
        //         const interval = map[intervalKey];
        //         if (!intervalKey || intervals.includes(intervalKey)) {
        //             if (interval.key === "tension") {
        //                 if (interval.value) {
        //                     if (splitted.tension) {
        //                         splitted.tension.push(interval.value);
        //                     } else {
        //                         splitted.tension = [interval.value];
        //                     }
        //                 }
        //             } else {
        //                 splitted[interval.key] = interval.value;
        //             }
        //             intervals = intervals.filter(n => n !== intervalKey);
        //             break;
        //         }
        //     }
        // }

        outer: for (const mapKey of Object.keys(maps)) {
            const map = maps[mapKey];

            inner: for (let i = 0; i < map.length; i++) {
                const interval = map[i];

                for (const intervalKey of Object.keys(interval)) {
                    const valueAndKey = interval[intervalKey];

                    if (!intervalKey || intervals.includes(intervalKey)) {
                        if (valueAndKey.key === "tension") {
                            if (valueAndKey.value) {
                                if (splitted.tension) {
                                    splitted.tension.push(valueAndKey.value);
                                } else {
                                    splitted.tension = [valueAndKey.value];
                                }
                            }
                        } else {
                            splitted[valueAndKey.key] = valueAndKey.value;
                        }
                        intervals = intervals.filter(n => n !== intervalKey);
                        break inner;
                    }
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
            if (Object.keys(interval2tension).includes(interval)) {
                if (splitted.tension) {
                    splitted.tension.push(interval2tension[interval]);
                } else {
                    splitted.tension = [interval2tension[interval]];
                }
                intervals = intervals.filter(n => n != interval);
            }
        })

        if (intervals.length !== 0) {
            return null;
        }

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

function pitchClass2chord(_pitches) {
    // _pitches [11, 2, 5]
    const rootPitch = _pitches[0];
    let pitches = _pitches.map((pitch) => (pitch - rootPitch + 12) % 12);
    const noteNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    const tonic = noteNames[rootPitch];

    pitches = pitches.sort((a, b) => {
        return a - b;
    });

    pitches = pitches.map(pitch => String(pitch));

    // { root: any; modifier: any; seventh: any; omit: any; tension: any; omitRoot: any; inversion: any; bass: any; }

    if (JSON.stringify(pitches) == JSON.stringify(['0', '3', '6', '9'])) {
        return `${tonic}dim7`;
    } else {

        const splitted = { root: tonic };

        const maps = {
            third: [
                {
                    "4": {
                        value: "",
                        key: "modifier"
                    }
                },
                {
                    "3": {
                        value: "m",
                        key: "modifier"
                    }
                },
                {
                    "5": {
                        value: "sus4",
                        key: "modifier"
                    }
                },
                {
                    "2": {
                        value: "sus2",
                        key: "modifier"
                    }
                },
                {
                    "": {
                        value: "omit3",
                        key: "omit"
                    }
                }
            ],
            fifth: [
                {
                    "7": {
                        value: "",
                        key: "tension"
                    }
                },
                {
                    "8": {
                        value: "#5",
                        key: "tension"
                    }
                },
                {
                    "6": {
                        value: "b5",
                        key: "tension"
                    }
                },
                {
                    "": {
                        value: "omit5",
                        key: "omit"
                    }
                }
            ],
            seventh: [
                {
                    "11": {
                        value: "M7",
                        key: "seventh"
                    }
                },
                {
                    "10": {
                        value: "7",
                        key: "seventh"
                    }
                },
                {
                    "9": {
                        value: "6",
                        key: "seventh"
                    }
                },
            ]
        };

        // mapKey ... third, fifths, seventh
        // map ... [{"4": ...}, ...]
        // interval ... {"4": ...}
        // intervalKey ... "4"
        // valueAndKey = {value: "6", key: "seventh"}
        // interval.key ... "modifier" ...
        // interval.value ... "" ...

        outer: for (const mapKey of Object.keys(maps)) {
            const map = maps[mapKey];

            inner: for (let i = 0; i < map.length; i++) {
                const interval = map[i];

                for (const intervalKey of Object.keys(interval)) {
                    const valueAndKey = interval[intervalKey];

                    if (!intervalKey || pitches.includes(intervalKey)) {
                        if (valueAndKey.key === "tension") {
                            if (valueAndKey.value) {
                                if (splitted.tension) {
                                    splitted.tension.push(valueAndKey.value);
                                } else {
                                    splitted.tension = [valueAndKey.value];
                                }
                            }
                        } else {
                            splitted[valueAndKey.key] = valueAndKey.value;
                        }
                        pitches = pitches.filter(n => n !== intervalKey);
                        break inner;
                    }
                }
            }
        }


        const interval2tension = {
            "1": "b9",
            "2": "9",
            "3": "#9",
            "5": "11",
            "6": "#11",
            "8": "b13",
            "9": "13"
        };

        pitches = pitches.filter(item => item !== "0");

        pitches.forEach(interval => {
            if (Object.keys(interval2tension).includes(interval)) {
                if (splitted.tension) {
                    splitted.tension.push(interval2tension[interval]);
                } else {
                    splitted.tension = [interval2tension[interval]];
                }
                pitches = pitches.filter(n => n != interval);
            }
        })

        if (pitches.length !== 0) {
            return null;
        }

        return splitted2chord(splitted);
    }
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