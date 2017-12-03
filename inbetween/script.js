var mammoths = [];
var mammothData = [];
var maxSpeed = 1;
var acceleration = 3;

function createMammoth(event) {
    var position = { x: event.pageX, y: event.pageY }; 

    var newMammoth = document.createElement("div");
    newMammoth.className = "Mammoth";
    newMammoth.style.left = position.x-64 + "px";
    newMammoth.style.top = position.y-96 + "px";
    document.body.appendChild(newMammoth);
    mammoths.push(newMammoth);
    mammothData.push({ speedX: 0, speedY: 0});
}

oldTime = new Date().getTime();
function tick() {
    //fps stuff
    var time = new Date().getTime();
    deltaTime = (time - oldTime) / 1000;
    oldTime = time;

    //deltaTime based stuff (every frame)
    for (let index = 0; index < mammoths.length; index++) {
        const mammoth = mammoths[index];
        const data = mammothData[index];
        var position = {
            x: parseFloat(mammoth.style.left.split("px")[0]),
            y: parseFloat(mammoth.style.top.split("px")[0])
        };
        data.speedX += (Math.random() - 0.5) * deltaTime * acceleration;
        data.speedY += (Math.random() - 0.5) * deltaTime * acceleration;

        data.speedX = Math.min(Math.max(data.speedX, -maxSpeed), maxSpeed);
        data.speedY = Math.min(Math.max(data.speedY, -maxSpeed), maxSpeed);

        position.x += data.speedX;
        position.y += data.speedY;

        mammoth.className = data.speedX > 0 ? "Mammoth" : "Mammoth flipped";
        mammoth.style.left = position.x + "px";
        mammoth.style.top = position.y + "px";
    }

    requestAnimationFrame(tick, 60);
}

tick();