// Currently only places the microdot is room 11.
// Need to determine if there are any rules to implement random placement for level 2 and 3.

var dot = {}; 

class DotManager {

    Initialize() {
        const image = imageManager.GetImage("dot");
        //const image = imageManager.GetImage("sword"); // Use the sword image to test with, so you can see it. 

        dot = {
            x: 250,
            y: 290,
            width: image.width,
            height: image.height,
            texture: image, //yellow for testing // I am using an image because it is easy to control the size. But I could just create a transparent rectangle without an image.
            screen_level: 11, // I think this is the only place it shows up in the game, for every level. 
            isPickedUp: false
        };
    } 

    Update() {
        // don't really need to pick it per say say... just mark it as picked up. 
        // Well, maybe we do, so we can drop it and find it again.
        if (dot.isPickedUp) {
            dot.x = player.x - 31; // players x-pos offset to display a carried magnet.
            dot.y = player.y + 1;  // y-pos offset
        }
    }

    Draw() {
        if (!dot.isPickedUp && dot.screen_level !== level) return; // No need to draw if it is not on the current screen or picked up by the player.
        ctx.drawImage(dot.texture, dot.x, dot.y);
    } 

}