// Key's
//
// Keys are used to open the castle door/gate. Each castle has a different key that matches the castle's 
// color. To open the gate, you have to find the key and pick it up, then carry the key to the castle and
// touch the door. The door will open and you can walk through. You can close the gate by touching the 
// gate again. This is useful in higher levels where you may want to lock the bat in the castle.
//
// The key itself is a white sprite image (adventure_key.png) and the color is modified to match the 
// castle color. A colorize function is applied to create the color needed. This makes the sprite a 
// little less complex to deal with, but it is still a little more complex to draw.
//
// There is some logic behind where the keys can show up. We don't want them to show up inside a castle or
// on a screen that is on the other side of the castle, where the player would have had to already have
// the key in order to get to the key. So in the end, there are only a few places the keys can show up. On
// level one, the locations will always be the same. But for level 2 and 3, the locations are random, but
// random within a given number of screens. 

var whiteKey = {};
var blackKey = {};
var yellowKey = {};
let keyArray = [blackKey, whiteKey, yellowKey];

let castleKeyLocations = [106, 52, 54]; // black, white, yellow - when not randomized locations
let castleKeys = [];

const castleKeyHeight = 10;
const castleKeyWidth = 30;
const castleKeyRadius = playerWidth / 2;

class KeyManager {

    Initialize() {

        // Create each image using the white sprite and coloring it programmatically here during 
        // initialization. I want to do this programmatically so I have more options with setting 
        // the key colors if I want to make the game more advanced and interesting, but without 
        // having to add new sprites.

        whiteKey = imageManager.GetImage("key");
        blackKey = colorize(whiteKey, 0, 0, 0);
        yellowKey = colorize(whiteKey);

        for (let i = 0; i < castleKeyLocations.length; i++) {

            // Crete the keys as a yellow key by default, then modify it below for black and white key.

            const castleKey = {
                x: 100, 
                y: 100,
                width: yellowKey.width,
                height: yellowKey.height,
                texture: yellowKey,
                screen_level: castleKeyLocations[2], // Since the player can move the key, we have to track it's location.
                isPickedUp: false
            };

            switch (i) {
                case 0: // black
                    castleKey.x = 295; // For room 106 (PacMan), we want to list it as a bonus item in the right location.
                    castleKey.y = 220;
                    castleKey.texture = blackKey;
                    castleKey.screen_level = castleKeyLocations[0];
                    break;
                case 1: // white
                    castleKey.x = 140;
                    castleKey.y = 70;
                    castleKey.texture = whiteKey;
                    castleKey.screen_level = castleKeyLocations[1];
                    break;
            }

            castleKeys.push(castleKey); // Add key to collection for collision logic.
        } // for-castleKeyLocations
    } // Initialize

    Update() {
        // x/y movements should be done here and not in draw

        for (let i = 0; i < castleKeys.length; i++) {
            // Only need to draw keys that are located on the current screen or that are picked up.
            if (castleKeys[i].isPickedUp) {
                castleKeys[i].x = player.x + -31; // add offsets to hold by player
                castleKeys[i].y = player.y + 1;
            } 
        } 
    } // Update

    Draw() {
        for (let i = 0; i < castleKeys.length; i++) {
            if (castleKeys[i].screen_level === level || castleKeys[i].isPickedUp) {
                ctx.drawImage(castleKeys[i].texture, castleKeys[i].x, castleKeys[i].y);
            }
        }
    } // Draw

}