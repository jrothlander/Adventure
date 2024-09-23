// Currently only places the magnet in room 22.
// For level 2 and 3, it should place the magnet randomly. 
// Need to determine exact rules to implement the random placement to not place it in a wall.

let magnetLocations = [
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

var magnet = {}; // Create a single sword for the whole game. Could create more to enhance the game, even match to the dragon like the keys and castles.

class MagnetManager {

    Initialize() {
        const magnetImage = imageManager.GetImage("magnet");

        magnet = {
            x: 500,
            y: 100,
            width: magnetImage.width,
            height: magnetImage.height,
            texture: colorize(magnetImage, 0, 0, 0), // black
            screen_level: magnetLocations[4],  // index 4 is room 22
            isPickedUp: false
        };
    }

    CalculateNewPosition(asset) {
        if (asset.screen_level === level && asset.isPickedUp === false) {

            // calculate vector
            let dx = magnet.x - asset.x;
            let dy = magnet.y - asset.y;

            // normalize vector
            const dist = Math.sqrt(dx * dx + dy * dy);
            dx /= dist;
            dy /= dist;

            // calculate angle
            //const angle = Math.atan2(dy, dx);

            // calculate new position
            asset.x += dx * speed;
            asset.y += dy * speed;
        }
    }

    Update() {
        if (magnet.isPickedUp) {
            magnet.x = player.x - 31; // players x-pos offset to display a carried magnet.
            magnet.y = player.y + 1;  // y-pos offset
        }

        if (magnet.screen_level === level || magnet.isPickedUp) {
            this.CalculateNewPosition(sword);
            this.CalculateNewPosition(chalice);
            this.CalculateNewPosition(sword);
            this.CalculateNewPosition(bridge);

            // Drop any castle gate/door keys...
            for (let i = 0; i < castleKeys.length; i++) {
                this.CalculateNewPosition(castleKeys[i]);
            }
        }
    }

    Draw() {
        if (!magnet.isPickedUp && magnet.screen_level !== level) return; // No need to draw if it is not on the current screen or picked up by the player.
        ctx.drawImage(magnet.texture, magnet.x, magnet.y);
    }

}