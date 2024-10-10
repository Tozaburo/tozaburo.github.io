const storagePoints = JSON.parse(localStorage.getItem("locationData"));
const container = document.querySelector(".inputs");
if (storagePoints !== null) {
    let html = "";
    storagePoints.forEach((point) => {
        if (!(point.name === "" && point.coords[0] === null && point.coords[1] === null && point.score === null)) {
            html += `
        <div class="flexB input">
            <input type="text" class="name" placeholder="地点の名前" value="${point.name}">
            <input type="number" class="lat" placeholder="北緯" value="${point.coords[0]}">
            <input type="number" class="lon" placeholder="東経" value="${point.coords[1]}">
            <input type="number" class="score" placeholder="得点" value="${point.score}">
        </div>`;
        }
    });
    html += `<div class="flexB input">
                <input type="text" class="name" placeholder="地点の名前">
                <input type="number" class="lat" placeholder="北緯">
                <input type="number" class="lon" placeholder="東経">
                <input type="number" class="score" placeholder="得点">
            </div>`
    container.innerHTML = html;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6378.137;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function findMaxScoreRoute(points, timeLimit, speed) {
    let maxScore = 0;
    let bestRoute = [];

    function visit(currentIndex, currentTime, currentScore, visited) {
        if (currentTime > timeLimit) return;

        if (currentScore > maxScore) {
            maxScore = currentScore;
            bestRoute = visited.slice();
        }

        for (let i = 0; i < points.length; i++) {
            if (!visited.includes(i)) {
                const [lat1, lon1] = points[currentIndex].coords;
                const [lat2, lon2] = points[i].coords;
                const distance = calculateDistance(lat1, lon1, lat2, lon2);
                const travelTime = distance / speed;

                visit(i, currentTime + travelTime, currentScore + points[i].score, [...visited, i]);
            }
        }
    }

    for (let i = 0; i < points.length; i++) {
        visit(i, 0, points[i].score, [i]);
    }

    return { maxScore, bestRoute };
}

function updateInputListener() {
    let inputs = document.querySelectorAll('.input');
    let lastInputDiv = inputs[inputs.length - 1];
    let lastInputs = lastInputDiv.querySelectorAll('input');

    inputs.forEach(div => {
        div.querySelectorAll('input').forEach(input => {
            input.oninput = null;
        });
    });

    lastInputs.forEach(input => {
        input.oninput = () => {
            document.querySelector('.inputs').insertAdjacentHTML('beforeend', `
                <div class="flexB input">
                    <input type="text" class="name" placeholder="地点の名前">
                    <input type="number" class="lat" placeholder="北緯">
                    <input type="number" class="lon" placeholder="東経">
                    <input type="number" class="score" placeholder="得点">
                </div>
            `);
            updateInputListener();
        };
    });

    inputs.forEach((input) => {
        input.oninput = () => {
            let points = Array.from(document.querySelectorAll('.inputs .input')).map(input => ({
                name: input.querySelector('.name').value,
                coords: [
                    parseFloat(input.querySelector('.lat').value),
                    parseFloat(input.querySelector('.lon').value)
                ],
                score: parseInt(input.querySelector('.score').value)
            }));

            localStorage.setItem("locationData", JSON.stringify(points));
        }
    });
};

updateInputListener();

document.getElementById("submit").onclick = () => {
    let points = Array.from(document.querySelectorAll('.inputs .input')).map(input => ({
        name: input.querySelector('.name').value,
        coords: [
            parseFloat(input.querySelector('.lat').value),
            parseFloat(input.querySelector('.lon').value)
        ],
        score: parseInt(input.querySelector('.score').value)
    }));
    points.pop();

    const timeLimit = document.getElementById("time").value;
    const speed = document.getElementById("speed").value;

    const result = findMaxScoreRoute(points, timeLimit, speed);

    document.getElementById("route").innerText = `ルート: ${result.bestRoute.map(i => points[i].name).join(" -> ")}`;
    document.getElementById("score").innerText = `スコア: ${result.maxScore}`;

    console.log("最適ルート:", result.bestRoute.map(i => points[i].name).join(" -> "));
    console.log("最大スコア:", result.maxScore);
}