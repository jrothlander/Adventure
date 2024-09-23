// -------------------
// Artwork References 
// -------------------
// I drew the game asset images from scratch. I did not use any other images other than that the Galaga sprite-sheet 
// for the fonts. The credit to the author are on the image. I also used an Atari 2600 image on my Easter Egg signature 
// page (rightly above Robinett's original signature Easter Egg page).
// https:/ / atarionline.org / wp - content / uploads / 2021 / 10 / atari - games - search.png
// 
// Tracking all of the images here to make it easier to manage. I could have created them in their 
// associated library or js file, but at least here they are all found in one location and load them when 
// the application is launched. 
//
//

// -------------------
// Spritesheets
// -------------------
var spriteSheet = new Image();
spriteSheet.src = "images/adventure_spritesheet.png";

var doorSpriteSheet = new Image();
doorSpriteSheet.src = "images/adventure_door.png";

var dragonSpriteSheet = new Image();
dragonSpriteSheet.src = "images/adventure_dragons.png";


// -------------------
// Images
// -------------------
let scaleFactor = 1.5;

const imageList = [
    {
        name: "splash",
        path: "images/adventure_logo.png"
    },
    {
        name: "brickwall",
        path: "images/brick_wall_15x15_clr.png"
    },
    {
        name: "stoneground",
        path: "images/stone_ground_white_15x15.png"
    },
    {
        name: "key",
        path: "images/adventure_key.png"
    },
    {
        name: "chalice",
        path: "images/adventure_chalice.png"
    },
    {
        style: "atari", // eventually I would like to flip a switch in the image manager to pull the retro images.
        name: "sword",
        path: "images/adventure_sword.png"
    },
    {
        style: "retro",
        name: "retrosword",
        path: "images/sword_retro_16x16.png"
    },
    {
        name: "magnet",
        path: "images/adventure_magnet.png"
    },
    {
        name: "bat",
        path: "images/adventure_bat.png"
    },
    {
        name: "bridgeleft",
        path: "images/adventure_bridge_left.png"
    },
    {
        name: "bridgeright",
        path: "images/adventure_bridge_right.png"
    },
    {
        name: "dot",
        path: "images/adventure_microdot_4x4.png"
    },
    {
        name: "pmcrump",
        path: "images/pacman/Crump.png"
    },
    {
        name: "pmpill",
        path: "images/pacman/PowerPill2.png"
    },
    {
        name: "easteregg",
        path: "images/adventure_easteregg.png"
    },
    {
        name: "atari",
        path: "images/atari-2600.png"
    },
    {
        style: "retro", // eventually I would like to flip a switch in the image manager to pull the retro images.
        name: "knight_walking",
        path: "images/player/walk.png"
    },
    {
        style: "retro", // eventually I would like to flip a switch in the image manager to pull the retro images.
        name: "knight_running",
        path: "images/player/run.png"
    }
];

// I wanted a class to manage the images, load them initially when the application is started, then pull each image
// from memory as needed. I am colorizing many of the images and I will probably move the coloration logic here
// as well. 

class ImageManager {

    constructor() {
        this.images = [];
    }

    LoadImages(list, callback) {
        let loadedImages = 0;
        list?.forEach((imageObject, index) => {
            const img = new Image();
            img.name = imageObject.name;
            img.onload = () => {
                this.images[index] = img;
                loadedImages++;
                if (loadedImages === list.length) {
                    callback();
                }
            };
            img.src = imageObject.path;
        });
    }

    GetImage(name) {
        if (typeof name !== "string") return {
            err: "Image not found"
        };

        const imageObject = this.images.filter
            ((el) => { return el?.name === name; })?.[0];

        if (imageObject.nodeName.toLowerCase() === "img") {
            return imageObject;
        } else {
            return {
                err: "Image not found"
            };
        }
    }
}