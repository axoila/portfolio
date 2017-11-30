var hue = 0;
var dotsRoot = document.getElementById("dots");
var trailToggle = document.getElementById("disableTrail");
var dots = [];
var length = 30;
var radius = 15;

var lastPoint = null;
var trail = true;

function drawdot(event) {
    if (trail) {
        var point = { x: event.pageX, y: event.pageY };
        if (lastPoint === null)
            lastPoint = point;
    
        difference = { x: point.x - lastPoint.x, y: point.y - lastPoint.y };
        distance = Math.sqrt(difference.x * difference.x + difference.y * difference.y);
        while (distance > radius) {
            lastPoint = { x: lastPoint.x + difference.x * radius / distance, y: lastPoint.y + difference.y * radius / distance };

            makeDot(lastPoint);
            difference = { x: point.x - lastPoint.x, y: point.y - lastPoint.y };
            distance = Math.sqrt(difference.x * difference.x + difference.y * difference.y);
        }
    }   
}

function toggleTrail() {
    trail = !trail;
    if (trail){
        trailToggle.innerHTML = "disable<br/>trail";
    }else{
        while (dots.length > 0) {
            dotsRoot.removeChild(dots.shift().element);
        }
        trailToggle.innerHTML = "enable<br/>trail";
    }
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

function makeDot(position) {
    hue += .01;

    var newDot = document.createElement("div");
    newDot.style.backgroundColor = HSVtoRGB(hue, .85, .70);
    newDot.setAttribute('class', 'dot');
    newDot.style.left = position.x-radius + "px";
    newDot.style.top = position.y-radius + "px";

    dotsRoot.appendChild(newDot);

    dots.push({ element: newDot, time: (new Date()).getTime() });

    if (dots.length > length) {
        dotsRoot.removeChild(dots.shift().element);
    }
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