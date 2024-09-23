// Currently only places the magnet in room 22.
// For level 2 and 3, it should place the magnet randomly. 
// Need to determine exact rules to implement the random placement to not place it in a wall.

let batLocations = [
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

var bat = {}; // Create a single sword for the whole game. Could create more to enhance the game, even match to the dragon like the keys and castles.

class BatManager {

    Initialize() {
        const image = imageManager.GetImage("bat");

        bat = {
            x: 200,
            y: 200,
            width: image.width,
            height: image.height,
            texture: colorize(image, 0, 0, 0), // black
            screen_level: batLocations[11],  // 11 is the yellow castle. The bat should not start anywhere, as it flies in. 
            isPickedUp: false
        };
    } 

    Update() {
        if (bat.isPickedUp) {
            bat.x = player.x - 31; // players x-pos offset to display a carried magnet.
            bat.y = player.y + 1;  // y-pos offset
        }
    }

    Draw() {
        if (!bat.isPickedUp && bat.screen_level !== level) return; // No need to draw if it is not on the current screen or picked up by the player.
        ctx.drawImage(bat.texture, bat.x, bat.y);
    } 

}