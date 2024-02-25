// clock
var tsec = 61;
var cmin = 0;
var chour = 0;

setInterval(() => {
    timeChanged();
}, 1);

function timeChanged() {
    if (tsec != new Date().getMilliseconds()) {
        replacetime();
        tsec = new Date().getMilliseconds();
    }
}

function gradient(x) {
    return "hsl(" + String((pmin * (10 - x) + phour * x) / 10) + " 85% 75%)";
}

function replacetime() {
    var now = new Date();

    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    cmin = min + sec / 60;

    chour = hour + cmin / 60;

    pmin = cmin * 6;
    phour = chour * 15;


    if (pmin > phour) {
        if ((phour + 360) - pmin < pmin - phour) {
            phour += 360;
        }
    } else {
        if ((pmin + 360) - phour < phour - pmin) {
            pmin += 360;
        }
    }


    var g = [gradient(0), gradient(1), gradient(2), gradient(3), gradient(4), gradient(5), gradient(6), gradient(7), gradient(8), gradient(9)]

    var backgroundhm = `radial-gradient(circle at top right, ${g[0]} 0% 10%, ${g[1]} 10% 20%, ${g[2]} 20% 30%, ${g[3]} 30% 40%, ${g[4]} 40% 50%, ${g[5]} 50% 60%, ${g[6]} 60% 70%, ${g[7]} 70% 80%, ${g[8]} 80% 90%, ${g[9]} 90% 100%`;

    document.body.style.background = backgroundhm;
}
