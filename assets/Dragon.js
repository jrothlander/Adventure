// The dragon logic is pretty strait forward. The dragons must be created on a given starting screen at a given
// x/y cords and each seems to have a different set of AI instructions/rules being applied. 
//
// The Atari 2600 console has a difficutly switch that can be set to A or B. 
//   A - dragons will runaway from the swaord
//   B - dragons will attack the player
//   Not yet support in this version of the game, but I will probably support it at some level, as 
//   it should not be hard to do.
//
// Red Dragon
//
// Yellow Dragon 
//   - If you are carrying a gold key, the yellow dragon will runaway from the player.
//   - If you encounter the yellow dragon, it will purse you across screens. 
//   - If you have teh sword, the dragon will approach you caustiously and try to eat you.
//   - In level 2, the yellow dragon will not appear until you unlock the white castle.
//
//     Stimulus   | Response
//     -----------|----------
//     Sword      | Flee
//     Yellow Key | feel
//     Man        | Chase
//     Chalice    | Chase
//
// Green Dragon
//   - guards the black key
//   - does not give chase unless the player grabs the black key
//
// Interestingly, the sword is lethal to a dragon, even if it is not held by the player. Meaning, you can trick
// the dragon into running into it and dying.
//
// The player must have picked up the sword and must use it to defeat the dragon. The dragon attacks player
// and reduces the players life. It seems like each success attack by the dragon reduces the players life by 
// about 25%. This needs to be verified in the original game. 
//
// The dragon uses simple sprite animatation and the attack uses a single sound. The animation is either 
// an open or closed mouth, or a dead sprite when the player has successfully killed the dragon.
//
// This handler needs to handle the dragon attacking the player and making moves towards the
// player, animating the attack, determining if the player has the sword, if the sword and dragon 
// collisions have occured, if the player and dragon collision has occured, if the attack or died sounds // should be played, and if the dragon or player has been killed, and displaying the dead dragon.
// 
// As the game level increases, the dragon will become more difficult to defeat. The dragon will become
// more aggressive and will leave one grid and enter into another.
//   
// Due to the dragon animations (sort of) states of chasing, bitting, dead, or swallowed, I want to use a 
// spritesheet vs single images, align the state with the order of the images. I would rather colorize 
// the images during intialization but due to the states aligning to the images, and due to the limitations 
// of loading images from spritesheets in JavaScript and then colorsing them, I decided to take the 
// approach of using a spritesheet with seperate images per state per color. But I would still rather have
// creating a spritesheet with 3 white dragons, one for each state, then and coloring them via code. But I 
// see an good option to do this with JavaScript and the canvas. 

// Spritesheet
// 0-white, 1-red, 2-yellow, 4-green
// 0-chasing, 1-bitting, 2-dead (No swallowed image for now, trying to avoid it if I can.)

// Possible locations to randomly select from. Level 1 uses screen 86 is valid for level 1.
let DRAGON_COLOR = { White: 0, Red: 1, Yellow: 2, Green: 3 };
let DRAGON_STATE = { Chasing: 0, Biting: 1, Dead: 2, Swallowed: 3 };
let DRAGON_DIR = { Up: 0, Down: 1, Left: 2, Right: 3 };
let dragonStartingLocations = [64, 106, 0];
let speed = 2;
let isBiting = false;

// let redDragon =  {};
// let greenDragon = {};
// let yellowDragon = {};
// let dragonArray = [redDragon, greenDragon, yellowDragon];

let dragons = [];
let dragonArray = {};
let frameCounter = 0;

class DragonManager {

    Initialize() {

        // redDragon =  dragonImage;  
        // greenDragon = colorize(keyImage, 0,0,0);
        // yellowDragon = colorize(keyImage);

        for (let i = 0; i < dragonStartingLocations.length; i++) {
            const dragon = { // defaults to green here
                x: 200,
                y: 200,
                width: 29,
                height: 69,
                killing_power: 40,
                level: dragonStartingLocations[2],
                direction: DRAGON_DIR.Right,
                state: DRAGON_STATE.Chasing,
                color: DRAGON_COLOR.Green
            };

            switch (i) {
                // case 0: // white
                //   dragon.x = 100;
                //   dragon.y = 100;
                //   //dragon.texture = redDragon;
                //   dragon.screen_level = dragonStartingLocations[0]; 
                //   break;
                case 1: // red
                    dragon.x = 200;
                    dragon.y = 200;
                    dragon.killing_power = 40; 
                    dragon.level = dragonStartingLocations[0];
                    dragon.color = DRAGON_COLOR.Yellow;
                    dragon.state = DRAGON_STATE.Chasing;
                    break;
                case 2: // yellow
                    dragon.x = 200;
                    dragon.y = 200;
                    dragon.killing_power = 40; // This is a modifier and will take away 40/100 of the players health. So in 3 hits they are dead.
                    dragon.level = dragonStartingLocations[1];
                    dragon.color = DRAGON_COLOR.Red;
                    break;
                // case 2: // green (default, no need to set here)
                //     dragon.x = 100;
                //     dragon.y = 100;
                //     //dragon.texture = greenDragon;
                //     dragon.screen_level = dragonStartingLocations[2];
                //     break;
            }

            dragons.push(dragon);
        }
    } // CreateEnemy()

    Update() {
        // Modify dragon location based on state and direction
        for (let i = 0; i < dragons.length; i++) {
            // if (dragons[i].level === level) {  // Only on current screen                  
            //   // the dragon on a current screen has different logic that the dragons elsewhere 
            this.UpdateDragon(i);
            // } else {
            //   // off screen updates for dragons on other screens, as original game play had them moving in patterns
            //   UpdateDragon(i);
            // }   
        }
    }

    Draw() {
        for (let i = 0; i < dragons.length; i++) {
            if (dragons[i].level === level) { // Only on current screen
                this.DrawDragonFromSprite(i);
            }
        }
    } // DrawDragons()

    UpdateDragon(i) {
        if (state === GAME_STATE.OVER) return;

        // Process dragon attacking the player
        if (player.alive && (dragons[i].level === level)) { // Only on current screen
            if (dragons[i].state === DRAGON_STATE.Chasing) {

                // calculate vector
                let dx = player.x - dragons[i].x;
                let dy = player.y - dragons[i].y;

                // normalize vector
                const dist = Math.sqrt(dx * dx + dy * dy);
                dx /= dist;
                dy /= dist;

                // calculate angle
                //const angle = Math.atan2(dy, dx);

                // calculate new position
                dragons[i].x += dx * speed;
                dragons[i].y += dy * speed;

                frameCounter = 0;
            }
            if (dragons[i].state === DRAGON_STATE.Biting) {
                // nothing to do yet.
                if (frameCounter % 100 === 0)
                    dragons[i].state = DRAGON_STATE.Chasing;
            }
        } else {

            // Based on the state, update the dragon location.
            switch (dragons[i].state) {
                case DRAGON_STATE.Chasing:
                    switch (dragons[i].direction) {
                        case DRAGON_DIR.Up:
                            dragons[i].y -= speed;
                            break;
                        case DRAGON_DIR.Down:
                            dragons[i].y += speed;
                            break;
                        case DRAGON_DIR.Left:
                            dragons[i].x -= speed;
                            break;
                        case DRAGON_DIR.Right:
                            dragons[i].x += speed;
                            break;
                    }
                    break;
                case DRAGON_STATE.Swallowed:
                    if (frameCounter % 100 === 0) {
                        PlaySound(dieSound);
                        state = GAME_STATE.OVER;
                    }
                    break;
                default: // dead or swallowed and the dragon stops moving
                    break;
            }
        }

        // This should be combined into a single function that works for the player and the dragons, 
        // not a separate one for each. 
        // Work that out here and move to lib and adjust dragon player to use it.

        if (dragons[i].x < 0) {
            dragons[i].x = canvas.width;
            this.MoveToGrid(i);
        }
        if (dragons[i].x > canvas.width) {
            dragons[i].x = 0;
            this.MoveToGrid(i);
        }
        if (dragons[i].y > canvas.height) {
            dragons[i].y = 0;
            this.MoveToGrid(i);
        }
        if (dragons[i].y < 0) {
            dragons[i].y = canvas.height;
            this.MoveToGrid(i);
        }
    }

    MoveToGrid(i) {
        // Hyperplane navigation rules are exceptions to the above simple mathematical and logical rules.
        switch (dragons[i].direction) {
            case DRAGON_DIR.Left:
                dragons[i].level = this.ProcessLeftNav(dragons[i]);
                break;
            case DRAGON_DIR.Right:
                dragons[i].level = this.ProcessRightNav(dragons[i]);
                break;
            case DRAGON_DIR.Up:
                dragons[i].level = this.ProcessUpNav(dragons[i]);
                break;
            case DRAGON_DIR.Down:
                dragons[i].level = this.ProcessDownNav(dragons[i]);
                break;
        }

        // basic grid navigation works off a grid of 10 columns and 11 rows
        // each column index increases by 1 and each row index increases by 10

        // left  - 1
        // right + 1  
        // up    - 10
        // down  + 10

        // Basic map/grid navigation.
        switch (dragons[i].direction) {
            case DRAGON_DIR.Left:
                dragons[i].level -= 1;
                break;
            case DRAGON_DIR.Right:
                dragons[i].level += 1;
                break;
            case DRAGON_DIR.Up:
                // Override for easy game intro level to reduce the map size
                if (gameType === GAME_TYPE.EASY) {
                    switch (dragons[i].level) {
                        case 22:
                            dragons[i].level = 86;
                            return;
                        case 106:
                            dragons[i].level = 65;
                            return;
                    }
                }
                level = level - 10;
                break;
            case DRAGON_DIR.Down:
                // Override for easy game intro level to reduce the map size
                if (gameType === GAME_TYPE.EASY) {
                    switch (dragons[i].level) {
                        case 86:
                            dragons[i].level = 22;
                            return;
                        case 65:
                            dragons[i].level = 106;
                            return;
                    }
                }
                dragons[i].level += 10;
                break;
        }


    }

    ProcessUpNav(character) {
        switch (character.level) {
            // Orange Labyrinth  (Black Castle)
            case 1:
                character.level = 11;
                break;
            case 2: // You currently can't go up from here. If that changes, you'd want to go to 12.
                character.level = 12;
                break;
        }
    }

    ProcessDownNav(character) {
        switch (level) {
            // Orange Labyrinth  (Black Castle)
            case 11:
                character.level = 1;
                break;
        }
    }

    ProcessRightNav(character) {
        // Only applies to grids 43, 53, and 62.    
        switch (character.level) {
            case 62:
                return 42;
            case 53:
                return 52;
            case 43:
                return 62;
            case 75:
                return 85;
            case 85:
                return 75;
            // Orange Labyrinth  (Black Castle)      
            case 2:
                return 11;
            case 12:
                return 1;

            // Tracking rooms with paths the player cannot take, but the dragon's can.
            // Flip around to the first part of the map in this case, as the
            // dragon's search for the player.      
            case 54:
                return 52;
            case 66:
                return 62;
            case 76:
                return 74;
            case 86:
                return 84;
            case 96:
                return 94;

            default:
                return character.level;
        }
    }

    ProcessLeftNav(character) {
        switch (character.level) {
            // Blue Labyrinth  (White Castle)
            case 62:
                character.level = 42;
                break;
            case 52:
                character.level = 53;
                break;
            case 42:
                character.level = 62;
                break;
            case 75:
                character.level = 85;
                break;
            case 85:
                character.level = 75;
                break;
            // Orange Labyrinth  (Black Castle)      
            case 11:
                character.level = 2;
                break;
            case 1:
                character.level = 12;
                break;
        }
    }

    DrawDragonFromSprite(i) {

        const xPos = dragons[i].x;
        const yPos = dragons[i].y;
        const spriteWidth = 29;
        const spriteHeight = 69;

        const offsetY = spriteHeight * dragons[i].color; // skip white(0)
        let offsetX = spriteWidth * dragons[i].state; // 0 chasing

        if (dragons[i].state === DRAGON_STATE.Swallowed) // uses chasing image... could add to spritesheet or force it here.
            offsetX = spriteWidth * dragons[DRAGON_STATE.Chasing].state; 

        ctx.drawImage(
            dragonSpriteSheet, // Sprite sheet containing door images
            offsetX,
            offsetY, // Location on sprite sheet
            spriteWidth,
            spriteHeight, // Size of sprite 
            xPos,
            yPos, // Location on canvas    
            spriteWidth,
            spriteHeight
        );

        frameCounter++;
    }

    // trying to figure out if I can just make greyscale spritesheets and colorize them, vs 
    // making a set of sprites per color. 

    // function LoadAndColorizeSpriteSheetImage() {
    //   const spriteWidth = 64; // Width of each sprite in the spritesheet
    //   const spriteHeight = 64; // Height of each sprite in the spritesheet
    //   const rows = 4; // Number of rows in spritesheet
    //   const cols = 4; // Number of columns in spritesheet

    //   // Loop over each sprite in the spritesheet
    //   for (let row = 0; row < rows; row++) {
    //       for (let col = 0; col < cols; col++) {
    //           // Extract each sprite from the spritesheet
    //           const spriteX = col * spriteWidth;
    //           const spriteY = row * spriteHeight;

    //           // Draw the grayscale sprite onto an offscreen canvas
    //           const offscreenCanvas = document.createElement('canvas');
    //           offscreenCanvas.width = spriteWidth;
    //           offscreenCanvas.height = spriteHeight;
    //           const offscreenCtx = offscreenCanvas.getContext('2d');
    //           offscreenCtx.drawImage(spriteSheet, spriteX, spriteY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    //           // Convert the grayscale sprite to color using pixel manipulation
    //           const imageData = offscreenCtx.getImageData(0, 0, spriteWidth, spriteHeight);
    //           const pixels = imageData.data;

    //           // Loop through all pixels (RGBA format: 4 bytes per pixel)
    //           for (let i = 0; i < pixels.length; i += 4) {
    //               // Pixels[i] is the Red channel
    //               // Pixels[i+1] is the Green channel
    //               // Pixels[i+2] is the Blue channel
    //               // Pixels[i+3] is the Alpha channel

    //               // Apply a color filter to convert grayscale to color
    //               const grayscale = pixels[i];    // Since R=G=B in grayscale
    //               pixels[i] = grayscale;          // Red channel
    //               pixels[i+1] = grayscale * 0.7;  // Green channel (slightly less intensity)
    //               pixels[i+2] = grayscale * 0.4;  // Blue channel (even less intensity)
    //           }

    //           // Put the modified colored image back onto the offscreen canvas
    //           offscreenCtx.putImageData(imageData, 0, 0);

    //           // Draw the colored sprite to the main canvas at its appropriate position
    //           ctx.drawImage(offscreenCanvas, col * spriteWidth, row * spriteHeight, spriteWidth, spriteHeight);
    //       }
    //   }

}