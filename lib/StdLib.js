// ------------------------------------------
// My Standard JavaScript Library - StdLib.js
// ------------------------------------------
// Contains misc utility functions that are not specific to any particular game, program, class, etc.

const colorizeHex = (image, hex) => {
    const offscreen = new window.OffscreenCanvas(image.width, image.height);
    const ctx = offscreen.getContext("2d");

    var newColor = HexToRGB(hex);

    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = (imageData.data[i] / 200) * newColor.R;
        imageData.data[i + 1] = (imageData.data[i] / 200) * newColor.G;
        imageData.data[i + 2] = (imageData.data[i] / 200) * newColor.B;
    }

    ctx.putImageData(imageData, 0, 0);
    return offscreen;
}

function HexToRGB(hex) {
    const long = parseInt(hex.replace(/^#/, ""), 16);
    return {
        R: (long >>> 16) & 0xff,
        G: (long >>> 8) & 0xff,
        B: long & 0xff
    };
}

function colorize(image, r = 1, g = 1, b = 0) {
    const offscreen = new window.OffscreenCanvas(image.width, image.height);
    const ctx = offscreen.getContext("2d");

    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] *= r;
        imageData.data[i + 1] *= g;
        imageData.data[i + 2] *= b;
    }

    ctx.putImageData(imageData, 0, 0);
    return offscreen;
}

function DrawBitmapFromSpriteSheet(cellX, cellY, borderWidth, spriteWidth, spriteHeight, x, y) {
    // Each sprite is 17x17 and uses 1px border. 
    // There are 2px between images. 
    const offsetX = (cellX + 1) * borderWidth + (cellX) * spriteWidth - 1;
    const offsetY = (cellY + 1) * borderWidth + (cellY) * spriteWidth - 1;

    ctx.drawImage(
        spriteSheet,
        offsetX, offsetY,
        spriteWidth, spriteHeight,
        x, y,
        spriteWidth * 2, spriteHeight * 2 // no scaling for now
    );
}

function DrawBitmapFromSpriteSheet2(
    cellX, cellY,
    borderWidth,
    spriteWidth, spriteHeight,
    spriteImageSheet,
    x, y,
    originX = 0, originY = 0) {

    const offsetX = originX + (cellX + 1) * borderWidth + cellX * spriteWidth;
    const offsetY = originY + (cellY + 1) * borderWidth + cellY * spriteHeight;

    ctx.drawImage(spriteImageSheet,
        offsetX, offsetY,
        spriteWidth, spriteHeight,
        Math.floor(x + 0.5), Math.floor(y + 0.5),
        spriteWidth, spriteHeight);

} // end DrawBitmapFromSpriteSheet2

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

//function randomIntFromInterval(min, max) { // min and max included 
//    return Math.floor(Math.random() * (max - min + 1) + min)
//}

//function biotCollisionHandler(obj1, obj2) {
//    const dx = obj1.x - obj2.x;
//    const dy = obj1.y - obj2.y;
//    const distance = Math.sqrt(dx * dx + dy * dy);

//    if (distance < obj1.radius + obj2.radius) {
//        const angle = Math.atan2(dy, dx);
//        const targetX = obj2.x + Math.cos(angle) * (obj1.radius + obj2.radius);
//        const targetY = obj2.y + Math.sin(angle) * (obj1.radius + obj2.radius);
//        const ax = (targetX - obj1.x) * 0.1;
//        const ay = (targetY - obj1.y) * 0.1;
//        obj1.vx -= ax;
//        obj1.vy -= ay;
//        obj2.vx += ax;
//        obj2.vy += ay;
//    }
//}

// Extension to set numeric precision to 15 or less. 
Number.prototype.rounded = function (i) {
    i = Math.pow(10, i || 15);
    return Math.round(this * i) / i;
}