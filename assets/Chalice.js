// There is only one chalice in the game and it should be positioned in just a few grid locations, as not 
// all grids would be appropriate for the chalice to be there. 
// 
// For level one, the chalice is placed in room (86). For level two and three, create an array of 
// valid grid locations and then randomly select one of those locations. Need to review the original
// game to determine where appropriate locations are for the chalice. Mostly behind the black castle.
//
// Allow the chalice to be picked up by the player and carried. Once the player reaches the golden 
// (yellow) castle with the chalice, the game is over and the player has won. 

// Possible locations to randomly select from. Level 1 uses screen 86 is valid for level 1.
let chaliceLocations = [
    1,
    2,    
    22, // Black Castle Interior                
    74,
    84, // White Castle Interior
    86, // Chalice here for level 1    
    96,
    104
];

var chaliceImage;
var chalice = {};

class ChaliceManager {

    Initialize() {

        chaliceImage = imageManager.GetImage("chalice"); // White

        chalice = {
            x: 100,
            y: 200,
            width: chaliceImage.width,
            height: chaliceImage.height,
            texture: chaliceImage,
            screen_level: chaliceLocations[5], // Index for room 86.
            isPickedUp: false
        };

        if (gameType === GAME_TYPE.EASY) {
            chalice.screen_level = chaliceLocations[5]; // Index 11 is room 86. Using an array so we can randomly select the location for level 3, once level 3 is implemented
        }
        if (gameType === GAME_TYPE.INTRO) {
            chalice.screen_level = chaliceLocations[3];
        }
        if (gameType === GAME_TYPE.HARD) {
            chalice.screen_level = chaliceLocations[randomNumber(0, chaliceLocations.length)];
        }
    }

    Update() {
        if (chalice.isPickedUp === false && chalice.screen_level !== level) return;

        // Random set the color to give it the magical effect from the original game.
        if (frameCounter % 4 === 0) {
            chalice.texture = colorize(chaliceImage, // Shouldn't need a global var for this, but it fails on the chalice.texture.
                randomNumber(0, 1),
                randomNumber(0, 1),
                randomNumber(0, 1)
            );
        }

        if (chalice.isPickedUp === true) {
            chalice.x = player.x + -31; // offset from player x-pos to display a carried chalice.
            chalice.y = player.y + 1; // offset from players y-pos
        } 

        frameCounter++;
    }

    Draw() {
        // Only need to draw keys that are located on the current screen or that are picked up.
        if (chalice.isPickedUp === false && chalice.screen_level !== level) return;

        ctx.drawImage(chalice.texture, chalice.x, chalice.y);
    } 

}