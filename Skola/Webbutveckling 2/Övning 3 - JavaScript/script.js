var xR = new Array(),
    yR = new Array(),
    x = new Array(),
    y = new Array(),
    up = new Array(),
    right = new Array(),
    speed = 1,
    r = 40,
    myVar, c, ctx, keepgo = true,
    width = 5,
    sQ = 0,
    s = true;

function init() {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    start();
}

function start() {
    keepgo = true;
    xR[sQ] = c.width / 2;
    yR[sQ] = c.height / 2;
    up[sQ] = true;
    right[sQ] = true;
    x[sQ] = 1;
    y[sQ] = -1;
    sQ++;
    xR.push(0);
    yR.push(0);
    up.push(0);
    right.push(0);
    x.push(0);
    y.push(0);
    if (s) {
        myFunction();
        s = false;
    }
}

function go() {
    setTimeout(myFunction, 10);
}

function stop() {
    keepgo = false;
    s = true;
}

function myFunction() {
    if (keepgo) {
        for (var i = 0; i < sQ; i++) {
            ctx.clearRect(0, 0, c.width, c.height);
            if (document.getElementById("speed").value == "") {
                speed = 1;
            } else {
                var check = Number(document.getElementById("speed").value);
                if (check > 25) {
                    speed = 25;
                    document.getElementById("speed").value = 25;
                } else if (check < 1) {
                    speed = 1;
                    document.getElementById("speed").value = 1;
                } else {
                    speed = check;
                }
            }

            if ((xR[i] <= r + (width) / 2) && (up[i])) {
                x[i] = 1;
                y[i] = -1;
                right[i] = true;
            } else if ((xR[i] <= r + (width) / 2) && (!up[i])) {
                x[i] = 1;
                y[i] = 1;
                right[i] = true;
            } else if ((xR[i] >= c.width - r - (width) / 2) && (up[i])) {
                x[i] = -1;
                y[i] = -1;
                right[i] = false;
            } else if ((xR[i] >= c.width - r - (width) / 2) && (!up[i])) {
                x[i] = -1;
                y[i] = 1;
                right[i] = false;
            } else if ((yR[i] <= r + (width) / 2) && (right[i])) {
                x[i] = 1;
                y[i] = 1;
                up[i] = false;
            } else if ((yR[i] <= r + (width) / 2) && (!right[i])) {
                x[i] = -1;
                y[i] = 1;
                up[i] = false;
            } else if ((yR[i] >= c.height - r - (width) / 2) && (right[i])) {
                x[i] = 1;
                y[i] = -1;
                up[i] = true;
            } else if ((yR[i] >= c.height - r - (width) / 2) && (!right[i])) {
                x[i] = -1;
                y[i] = -1;
                up[i] = true;
            }

            if ((!isNaN(speed)) && (speed <= 25) && (speed >= 0)) {
                xR[i] = xR[i] + (x[i] * speed);
                yR[i] = yR[i] + (y[i] * speed);
            }

            ctx.beginPath();
            ctx.arc(xR[i], yR[i], r, 0, 2 * Math.PI);
            ctx.strokeStyle = "#FF0000";
            ctx.stroke();
            ctx.lineWidth = width;
        }
        go();
    }
}
window.onload = init;