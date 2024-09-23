const Direction = { Up: 0, Down: 1, Left: 2, Right: 3, Space: 4 };
var playerResetTimerElapsed = false;

const playerHeight = 16;
const playerWidth = playerHeight;
const playerRadius = playerWidth / 2;

let player = {
    x: (canvas.width / 2),  // initial x-position
    y: 325,                 // 175/325 // initial y-position
    width: playerWidth,
    height: playerHeight,
    speed: 3,
    score: 0,
    lives: 1,
    health: 100,   // 100% 
    alive: true,
    released: false
};

//let walkleft2_Image;
//let playerFrameCounter = 0;
//let frames = [];
//let spritesheet;

class PlayerManager {

    Initialize() {
        // Testing some free characters but they don't work well with the style of the rooms. 
        // I think to use something like this, the game would need to be modified to a 1980 style isometric style game.
        //spritesheet = imageManager.GetImage("knight_walking");
        //spritesheet = imageManager.GetImage("knight_running");
    }

    Update() {

        //for (var j = 0; j < dragons.length; j++) {
        //    if (player.alive && (dragons[j].level === level)) {
        //        if (dragons[j].state === DRAGON_STATE.Biting) {
        //            return 0;
        //        }
        //    }
        //}

        if (player.health <= 0) {
            player.lives = 0;
            player.alive = false;
            return 0; // nothing to do if player is dead
        }

        if (player.released) {

            // Drop whatever player is holding
            if (dot.isPickedUp === true) {
                dot.isPickedUp = false;
                dot.x = player.x - 30;
                dot.y = player.y - 10;
                dot.screen_level = level;
                PlaySound(releaseSound);
            }

            if (sword.isPickedUp === true) {
                sword.isPickedUp = false;
                sword.x = player.x - 30;
                sword.y = player.y - 10;
                sword.screen_level = level;
                PlaySound(releaseSound);
            }

            if (chalice.isPickedUp === true) {
                chalice.isPickedUp = false;
                chalice.x = player.x - 30;
                chalice.y = player.y - 10;
                chalice.screen_level = level;
                PlaySound(releaseSound);
            }

            if (magnet.isPickedUp === true) {
                magnet.isPickedUp = false;
                magnet.x = player.x - 30;
                magnet.y = player.y - 10;
                magnet.screen_level = level;
                PlaySound(releaseSound);
            }

            if (bridge.isPickedUp === true) {
                bridge.isPickedUp = false;
                //bridge.x = player.x - 30;
                //bridge.y = player.y - 10;
                bridge.screen_level = level;
                PlaySound(releaseSound);
            }

            // Drop any castle gate/door keys...
            for (var i = 0; i < castleKeys.length; i++) {
                if (castleKeys[i].isPickedUp === true) {
                    castleKeys[i].isPickedUp = false; // drop the key  
                    castleKeys[i].x = player.x - 30; // - 5;
                    castleKeys[i].y = player.y - 10; //- 9;
                    castleKeys[i].screen_level = level;
                    PlaySound(releaseSound);
                } // if
            } // for-castleKeys

            player.released = false;
        }

        if (player.alive === false) {
            // determine logic to reset player    

            if (player.lives === 0) state = GAME_STATE.OVER;
            //if (player.lives > 0) state = GAME_STATE.RUNNING;

            if (player.lives > 0 && player.alive === false && playerResetTimerElapsed) {
                // player died... wait 5 seconds and reset player      
                player.alive = true;
                player.lives--;
                playerResetTimerElapsed = false;
            }
            return 0;
        }

        // Capture direction enumeration based on keys pressed
        var direction;
        if ("ArrowLeft" in keys) {
            direction = Direction.Left;
        }
        if ("ArrowRight" in keys) {
            direction = Direction.Right;
        }
        if ("ArrowUp" in keys) {
            direction = Direction.Up;
        }
        if ("ArrowDown" in keys) {
            direction = Direction.Down;
        }

        var newX = player.x;
        var newY = player.y;

        // Control player movement based on direction and speed

        if (direction === Direction.Left) {
            newX -= player.speed;
        }
        if (direction === Direction.Right) {
            newX += player.speed;
        }
        if (direction === Direction.Up) {
            newY -= player.speed;
        }
        if (direction === Direction.Down) {
            newY += player.speed;
        }

        if (collisionHandler.HandleCastleDoorCollisions()) {
            player.y = 292;
        } else {
            // Allow the player to move based on path and walls
            if (!ctx.isPointInPath(path, newX, newY) && !collisionHandler.HandleCastleDoorCollisions()) {
                player.x = newX;
                player.y = newY;
            }

            // If the bridge is here, allow the player to pass through the walls.
            // TODO: Don't let the player walk off the sides, or they will be stuck in a wall. They can right now. 

            if (bridge.screen_level === level && collisionHandler.HandlePlayerOnBridgeCollisions()) { // force them to stay on the path while on the bridge
                if (collisionHandler.HandleBridgeCollisionPath) {
                    player.x = newX;
                    player.y = newY;
                }
            }

            // TODO: Need to add logic here to handle microdot being carried and allow the player through the blockades.
            if (dot.isPickedUp) {

                //// Need a function to verify if we are hitting ablockaded wall.
                //if (BlockedWallCollision()) {
                //    // Allow player to walk through blockaded walls
                //    player.x = newX;
                //    player.y = newY;
                //}
            }
        }

        // --------------------------
        //   Navigate to new Screen
        // --------------------------
        // The functions below are for screen navigation
        //
        // Castle Navigation - When you hit the top of the gate/door it navigates up to the next screen.
        //
        // Castles are based on the level  [54, 32, 84]
        // Yellow Castle - Level 54
        // Black Castle  - Level 32
        // White Castle  - Level 84

        // We could pull this from the castle array in the CastleHandler and do away with the switch. But the swith
        // is easier to follow and maintain for now. 

        switch (level) {
            case 54:
            case 32:
            case 84:
                // Castle Navigation
                if (direction === Direction.Down && player.y > -20 && player.y < 220 && player.x > 200 && player.x < 350) {
                    player.y = 230;
                    return 0;
                }

                if (direction === Direction.Up && player.y < 220 && player.x > 200 && player.x < 350) {
                    // player is at the top of the gate/door
                    // navigate to next screen
                    this.LoadNewGrid(direction);
                    player.y = canvas.height;
                    return 0;
                }
                break;
        }

        // When exiting the screen, reposition the player's x/y cords for next screen.
        if (player.x < 0) {
            this.LoadNewGrid(direction);
            player.x = canvas.width;
        }
        if (player.x > canvas.width) {
            this.LoadNewGrid(direction);
            player.x = 0;
        }
        if (player.y > canvas.height) {
            this.LoadNewGrid(direction);
            player.y = 0;
        }
        if (player.y < 0) {
            this.LoadNewGrid(direction);
            player.y = canvas.height;
        }

        return 0;
    }

    Draw() {
        //if (!player.alive) return;

        //if (skin) {
        //    ctx.drawImage(frames[frameCounter], player.x, player.y); //, player.height * 2, playerWidth * 2);
            // The commented code allows you to run the spritesheets setup in the initialize() function.
            //var borderWidth = 8;
            //var spriteWidth = 61;
            //var spriteHeight = 65;

            //if (frameCounter % 5 === 0) {
            //    playerFrameCounter++;
            //}
            //this.DrawPlayerFromSpriteSheet( //playerFrameCounter, 0, borderWidth, spriteWidth, spriteHeight, player.x, player.y);
            //    playerFrameCounter, 0,
            //    borderWidth,
            //    spriteWidth, spriteHeight,
            //    spritesheet,
            //    player.x, player.y,
            //    8, 22
            //);

        //} else {
            ctx.fillRect(player.x, player.y, playerWidth, playerHeight);
        //}

        //frameCounter++;
        //if (playerFrameCounter === 7) playerFrameCounter = 0;
    }

    DrawPlayerFromSpriteSheet(
        cellX, cellY,
        borderWidth,
        spriteWidth, spriteHeight,
        spriteImageSheet,
        x, y,
        originX = 0, originY = 0) {

        //const offsetX = originX + (cellX + 1) * borderWidth + cellX * spriteWidth;
        //const offsetY = originY + (cellY + 1) * cellY * spriteHeight;

        const offsetX = originX + (borderWidth * (cellX + 1)) + (spriteWidth * (cellX));
        const offsetY = originY + (cellY * spriteHeight);

        ctx.drawImage(
            spriteImageSheet,
            offsetX, offsetY,
            spriteWidth, spriteHeight,            
            x, y,
            spriteWidth, spriteHeight);

    } // end DrawBitmapFromSpriteSheet2

    LoadNewGrid(direction) {
        // Hyperplane navigation (exceptions to the above rules)
        switch (direction) {
            case Direction.Left:
                if (this.ProcessLeftHyperplaneNavigation())
                    return;
                break;
            case Direction.Right:
                if (this.ProcessRightHyperplaneNavigation())
                    return;
                break;
            case Direction.Up:
                if (this.ProcessUpHyperplaneNavigation())
                    return;
                break;
            case Direction.Down:
                if (this.ProcessDownHyperplaneNavigation())
                    return;
                break;
        }

        // basic grid navigation works off a grid of 10 columns and 11 rows
        // each column index increases by 1 and each row index increases by 10

        // left  - 1
        // right + 1  
        // up    - 10
        // down  + 10

        // Basic map/grid navigation.
        switch (direction) {
            case Direction.Left:
                level = level - 1;
                break;
            case Direction.Right:
                level = level + 1;
                break;
            case Direction.Up:
                // Override for easy game intro level to reduce the map size
                if (gameType === GAME_TYPE.EASY) {
                    switch (level) {
                        case 22:
                            level = 86;
                            return;
                        case 106:
                            level = 65;
                            return;
                    }
                }
                level = level - 10;
                break;
            case Direction.Down:
                // Override for easy game intro level to reduce the map size
                if (gameType === GAME_TYPE.EASY) {
                    switch (level) {
                        case 86:
                            level = 22;
                            return;
                        case 65:
                            level = 106;
                            return;
                    }
                }
                level = level + 10;
                break;
        }
    }

    ProcessUpHyperplaneNavigation() {
        let rtVal = true;

        switch (level) {

            // Orange Labyrinth  (Black Castle)
            case 1:
                level = 11;
                break;
            case 2: // You currently can't go up from here. If that changes, you'd want to go to 12.
                level = 12;
                break;

            default:
                rtVal = false;
        }
        return rtVal;
    }

    ProcessDownHyperplaneNavigation() {
        let rtVal = true;

        switch (level) {

            // Orange Labyrinth  (Black Castle)
            case 11:
                level = 1;
                break;

            default:
                rtVal = false;
        }
        return rtVal;
    }

    ProcessRightHyperplaneNavigation() {
        // Override basic navigation logic on right direction movements
        // to create a labyrinth like navigation.
        // Only applies to grids 43, 53, and 62.
        let rtVal = true;
        switch (level) {
            case 62:
                level = 42;
                break;
            case 53:
                level = 52;
                break;
            case 43:
                level = 62;
                break;
            case 75:
                level = 85;
                break;
            case 85:
                level = 75;
                break;

            // Orange Labyrinth  (Black Castle)      
            case 2:
                level = 11;
                break;
            case 12:
                level = 1;
                break;

            // PacMan
            case 106:
                level = 106;
                break;

            default:
                rtVal = false;
        }
        return rtVal;
    }

    ProcessLeftHyperplaneNavigation() {
        // Override basic navigation logic on left direction movements
        // to create a labyrinth like navigation.
        let rtVal = true;

        switch (level) {

            // Blue Labyrinth  (White Castle)
            case 62:
                level = 42;
                break;
            case 52:
                level = 53;
                break;
            case 42:
                level = 62;
                break;
            case 75:
                level = 85;
                break;
            case 85:
                level = 75;
                break;

            // Orange Labyrinth  (Black Castle)      
            case 11:
                level = 2;
                break;
            case 1:
                level = 12;
                break;

            // PacMan
            case 106:
                level = 106;
                break;

            default:
                rtVal = false;
        }
        return rtVal;
    }

    //StartPlayerResetTimer() {
    //    //console.log("Player Reset");
    //    if (!playerResetTimerElapsed)
    //        setTimeout(playerResetElapsed, 5000);
    //}

    //PlayerResetElapsed() {
    //    //console.log("Player Reset Timer Elapsed");
    //    playerResetTimerElapsed = true;
    //}

}
