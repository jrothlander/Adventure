var whiteDoor = {};
var blackDoor = {};
var yellowDoor = {};
let doorArray = [blackDoor, whiteDoor, yellowDoor];

let castleDoorLocations = [32, 84, 54]; // black, white, yellow 
let castleDoors = [];

class GateManager {

    Initialize() {
        for (let i = 0; i < castleDoorLocations.length; i++) {
            const castleDoor = {
                x: 285,     // initial x-position for all castle doors
                y: 210,     // initial y-position
                width: 30,  // The x,y cords are scaled to fit the screen. 
                height: 75,
                open: false // All the doors initialize to closed. 
            };
            castleDoors.push(castleDoor);
        }
    }

    // This can be used to animate the opening and closing, if needed. The current animation works, just uses
    // two sprites out of the sprite sheet. Animating this using all of the sprites would look at lot better.
    // Adding a chain and gate opening sound might be a nice effect as well. 

    Update() {
        //for (let i = 0; i < castleDoors.length; i++) {
        // Add animation to walk through each gate sprite to animate the gate opening.
        //}
    }

    Draw() {
        const index = castleDoorLocations.indexOf(level);
        if (index === null || index < 0) return;

        this.DrawCastleDoorFromSprite(castleDoors[index], castleDoors[index].open);
    }

    DrawCastleDoorFromSprite(door, open) {

        const xPos = door.x;
        const yPos = door.y;
        const spriteWidth = 21;
        const spriteHeight = 48;
        const offsetY = 0;

        const offsetX = open ? 23 : 155; // Sprite x-cord when the door is open or closed.

        ctx.drawImage(
            doorSpriteSheet, // Sprite sheet containing door images
            offsetX,
            offsetY,         // Location on sprite sheet
            spriteWidth,
            spriteHeight,    // Size of sprite 
            xPos,
            yPos,            // Location on canvas    
            door.width,
            door.height     // Size of sprite when drawn to screen. Can be scaled here. 
        );
    }

}