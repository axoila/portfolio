var hue = 0;
var dotsRoot = document.getElementById("dots");
var context = dotsRoot.getContext("2d");
var trailToggle = document.getElementById("disableTrail");
var dots = [];
var radius = 30;
var canvasSize = {width:0, height:0}

function drawdot(event) {
    var size = { width: width(), height: height() };
    if (canvasSize.width != size.width || canvasSize.height != size.height) {
        dotsRoot.height = size.height;
        dotsRoot.width = size.width;
        canvasSize = size;
    }
    var point = { x: event.pageX, y: event.pageY }; 
    hue = (new Date()).getTime() / 512.0;

    context.beginPath();
    context.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = HSVtoRGB(hue, .85, .70);
    context.fill();
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return "#" + Math.round(r * 255).toString(16) +
        Math.round(g * 255).toString(16) +
        Math.round(b * 255).toString(16);
}

function height() {
    var body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    
    return height;
}
function width() {
    var body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollWidth, body.offsetWidth,
        html.clientWidth, html.scrollWidth, html.offsetWidth);

    return height;
}