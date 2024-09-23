// Currently only places the sword on level 8.
// For level 2 and 3, it should place it elsewhere or randomly. 
// Need to determine exact rules to implement the random placement to not place it in a wall.

let swordLocations = [
    1, 2,
    11, 12,
    22, // Black Castle Interior
    32, // Black Castle
    42, 43,
    44, // Yellow Castle Interior - don't want this one, as it would be too easy to get to
    52, 53, // Removed - too easy
    54, // Yellow Castle (game starting point)
    62, 63, 64, 65, 66, // Removed - too easy
    74,
    84, // White Castle Interior
    86, // Chalice here for level 1
    94, // White Castle
    96,
    104, 106];

var sword = {}; // Create a single sword for the whole game. Could create more to enhance the game, even match to the dragon like the keys and castles.

class SwordManager {

    Initialize() {
        let swordImage = imageManager.GetImage("sword");

        sword = {
            x: 500,
            y: 100,
            width: swordImage.width,
            height: swordImage.height,
            texture: colorize(swordImage), // colorize function defaults to yellow if no color param provided.
            screen_level: swordLocations[8],
            isPickedUp: false
        };

        if (skin) { // There's certainly a better way to use the skiined version and images that I can do in the image manager class. For now, I will do it here.
            swordImage = imageManager.GetImage("retrosword");
            sword.texture = swordImage;
        }
    } 

    Update() {
        if (skin)
            if (sword.isPickedUp) {
                sword.x = player.x - 10; // players x-pos offset to display a carried sword.
                sword.y = player.y - 5; // y-pos offset
            }
        else {
            if (sword.isPickedUp) {
                sword.x = player.x - 31; // players x-pos offset to display a carried sword.
                sword.y = player.y + 1; // y-pos offset
            }
        }
    }

    Draw() {
        if (!sword.isPickedUp && sword.screen_level !== level) return; // No need to draw if the sword is not on the current screen or picked up by the player.
        ctx.drawImage(sword.texture, sword.x, sword.y);
    } 

}