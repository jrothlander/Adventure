// Currently only places the magnet in room 22.
// For level 2 and 3, it should place the magnet randomly. 
// Need to determine exact rules to implement the random placement to not place it in a wall.

var bridge = {}; // Create a single sword for the whole game. Could create more to enhance the game, even match to the dragon like the keys and castles.

class BridgeManager {

    Initialize() {
        const imageLeft = imageManager.GetImage("bridgeleft");
        const imageRight = imageManager.GetImage("bridgeright");

        bridge = {
            x: 150,
            y: 200,
            width: imageLeft.width,
            height: imageLeft.height,
            texture_left: colorizeHex(imageLeft, "#8C58B8"),
            texture_right: colorizeHex(imageRight, "#8C58B8"),
            screen_level: 42, // looks like the original game it always starts on 42. If it is random at higher levels, add an array of available rooms and randomly pick one.
            isPickedUp: false
        };
    }

    Update() {
        if (bridge.isPickedUp) {
            bridge.x = player.x - 31; // players x-pos offset to display a carried magnet.
            bridge.y = player.y + 20;  // y-pos offset
            //bridge.x = player.x; // players x-pos offset to display a carried magnet.
            //bridge.y = player.y;  // y-pos offset
        }
    }

    Draw() {
        if (!bridge.isPickedUp &&
            bridge.screen_level !==
            level) return; // No need to draw if it is not on the current screen or picked up by the player.
        ctx.drawImage(bridge.texture_left, bridge.x, bridge.y);
        ctx.drawImage(bridge.texture_right, bridge.x + 80, bridge.y);

        //this.AddBoundingBoxes();
    }

    AddBoundingBoxes() {

        // This is the code that that should be used in the collision handler logic to determine the left/right 
        // collision boundaries. Work it out here and copy it over to the CollisionHandler.

        const bridgeLeft = {
            x: bridge.x, // offset because image is a little smaller due to border
            y: bridge.y,
            width: bridge.width,
            height: bridge.height
        };

        const bridgeRight = {
            x: bridge.x + 80,
            y: bridge.y,
            width: bridge.width,
            height: bridge.height
        };

        ctx.fillStyle = "red";
        ctx.strokeRect(bridgeLeft.x, bridgeLeft.y, bridgeLeft.width, bridgeLeft.height);
        ctx.strokeRect(bridgeRight.x, bridgeRight.y, bridgeRight.width, bridgeRight.height);
    }

}