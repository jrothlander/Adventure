//
// All of the Collision logic is here vs being in the individual managers/handlers. This is just to make it easier to
// maintain and debug. However, it may make more sense to eventually move these so we don't need global variables
// for all of these objects. 
// 
// I may change this so that I can have a drawable game asset and an update only game asset. In this case, this would
// be an updateable-game-asset only, which I am not supporting at this time. So, I have empty Initialize() and Draw()
// function to allow the existing asset manager logic to run. I would want the asset manager to manage this and only
// perform Update() for updateable-only game assets. Currently in JavaScript, I don't know how best to implement that
// in other languages I would implement an interface such as IDrawableGameAsset or IUpdateableGameAsset, for any class
// that implements the drawable asset, I would perform Initialize(), Update(), and Draw(). For any that implement  
// IUpdateableGameAsset I would only perform the Update(). It's a thought. I might look into more. 

class CollisionHandler {

    Initialize() {
        return 0;
    }

    Update() {
        this.HandleCastleKeyCollisions();
        this.HandleCastleDoorKeyCollisions();
        this.HandleChaliceCollisions();
        this.HandleSwordCollisions();
        this.HandleDragonCollisions();
        this.HandleMagnetCollisions();
        this.HandleBridgeCollisions();
        this.HandleMicroDotCollisions();
    }

    Draw() {
        return 0;
    }

    HandleDragonCollisions() {
        for (let i = 0; i < dragons.length; i++) {
            if (dragons[i].level === level && (dragons[i].state !== DRAGON_STATE.Dead)) {

                // Sword Collision (has priority over player collision)
                if (sword.isPickedUp || sword.screen_level === level) { // either you are carry the sword or the dragon runs into a dropped sword 
                    // Original game allows you to trick a dragon t run in a dropped sword.
                    if (this.CollisionHandler(sword, dragons[i])) {
                        dragons[i].state = DRAGON_STATE.Dead;
                        PlaySound(killedSound); // Need to create kill sound and replace it here.
                    }
                }

                // Player Collision
                if (dragons[i].state !== DRAGON_STATE.Dead) {
                    if (this.CollisionHandler(player, dragons[i])) {

                        if (dragons[i].state !== DRAGON_STATE.Biting && dragons[i].state !== DRAGON_STATE.Swallowed) {
                            PlaySound(attackSound);
                            player.health -= dragons[i].killing_power;
                        }

                        if (player.alive)
                            dragons[i].state = DRAGON_STATE.Biting;
                        else {
                            dragons[i].state = DRAGON_STATE.Swallowed;
                            player.x = dragons[i].x + 5;
                            player.y = dragons[i].y + 35;
                        }
                    }
                }
            }
        }
    }

    HandleChaliceCollisions() {
        if (chalice.isPickedUp === false && chalice.screen_level === level) {
            if (this.CollisionHandler(player, chalice)) {
                this.DropAllInventory();
                chalice.isPickedUp = true;
                PlaySound(pickupSound);
            }
        }
    }

    HandleSwordCollisions() {
        if (sword.isPickedUp === false && sword.screen_level === level) {
            if (this.CollisionHandler(player, sword)) {
                this.DropAllInventory();
                sword.isPickedUp = true;
                PlaySound(pickupSound);
            }
        }
    }

    HandleMagnetCollisions() {
        if (magnet.isPickedUp === false && magnet.screen_level === level) {
            if (this.CollisionHandler(player, magnet)) {
                this.DropAllInventory();
                magnet.isPickedUp = true;
                PlaySound(pickupSound);
            }
        }
    }

    HandleMicroDotCollisions() {
        if (dot.isPickedUp === false && dot.screen_level === level) {
            if (this.CollisionHandler(player, dot)) {
                this.DropAllInventory();
                dot.isPickedUp = true;
                PlaySound(pickupSound);
            }
        }
    }

    HandlePlayerOnBridgeCollisions() {

        // TODO: Don't let the player walk off the sides, or they will be stuck in a wall.
        // Once that are on the bridge, they cannot pick it up and they cannot walk off the sides of the bridge and get stuck in the walls.

        const bridgePath = {
            x: bridge.x + bridge.width,
            y: bridge.y,
            width: 80,
            height: bridge.height
        };

        if (this.CollisionHandler(player, bridgePath)) {
            return true;
        }

        return false;
    }

    HandleBridgeCollisionPath() {
        if (bridge.isPickedUp || bridge.screen_level !== level) return false;

        const bridgeLeft = {
            x: bridge.x + 80, // offset because image is a little smaller due to border
            y: bridge.y,
            width: bridge.width,
            height: bridge.height
        };

        const bridgeRight = {
            x: bridge.x,
            y: bridge.y,
            width: bridge.width,
            height: bridge.height
        };

        if (this.CollisionHandler(player, bridgeLeft)) {
            return true;
        }

        if (this.CollisionHandler(player, bridgeRight)) {
            return true;
        }

        return false;
    }

    HandleBridgeCollisions() {
        if (bridge.isPickedUp || bridge.screen_level !== level) return false;

        // if the player is on the bridge, don't let them collide with it to pick it up or walk off the sides of the bridge and get stuck in a wall.
        //if (this.HandleBridgeCollisionPath()) return false;

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

        if (this.CollisionHandler(player, bridgeLeft)) {
            this.DropAllInventory();
            bridge.isPickedUp = true;
            //bridge.x = player.x;
            //bridge.y = player.y;
            PlaySound(pickupSound);
        }

        if (this.CollisionHandler(player, bridgeRight)) {
            this.DropAllInventory();
            bridge.isPickedUp = true;
            //bridge.x = player.x;
            //bridge.y = player.y;
            PlaySound(pickupSound);
        }
    }

    Drop(object) {
        if (object.isPickedUp) {
            object.isPickedUp = false;
            object.x = player.x - 30;
            object.y = player.y - 10;
            object.screen_level = level;
        }
    }

    DropAllInventory() {

        // Drop whatever player is holding
        this.Drop(sword);
        this.Drop(chalice);
        this.Drop(magnet);
        this.Drop(bridge);
        this.Drop(dot);     // Can you hold the micro dot and drop everything else? Or will you drop it like all the others?

        for (let i = 0; i < castleKeys.length; i++) {
            this.Drop(castleKeys[i]);
        }
    }

    HandleCastleKeyCollisions() {
        for (let i = 0; i < castleKeys.length; i++) {
            if (castleKeys[i].isPickedUp === false && castleKeys[i].screen_level === level) {
                if (this.CollisionHandler(player, castleKeys[i])) {
                    this.DropAllInventory();
                    castleKeys[i].isPickedUp = true;

                    if (level == 106)
                        PlaySound(eatFruit);
                    else
                        PlaySound(pickupSound);
                }
            }
        }
    }

    HandleCastleDoorCollisions() {
        if (!castleDoorLocations.includes(level)) return false; // Only process if we are in a castle room/level.

        const index = castleDoorLocations.indexOf(level);
        if (castleDoors[index].open === false && castleKeys[index].isPickedUp === false)
            return this.CollisionHandler(player, castleDoors[index]);

        return false;
    }

    HandleCastleDoorKeyCollisions() {
        // Check for collision between the castle door and the player holding a key.
        //
        // Player needs to have the matching key to open the door.
        // So castleKey[0] matches castleDoor[0] and so on.
        //
        // We only need to do the calculation for screens we are on. 
        // [106, 52, 54]; // black, white, yellow castles  

        if (!castleDoorLocations.includes(level)) return; // only process if we are on a castle screen

        const index = castleDoorLocations.indexOf(level);

        if (castleDoors[index].open === false && castleKeys[index].isPickedUp) {
            if (this.CollisionHandler(player, castleDoors[index])) {
                castleDoors[index].open = true; // Opens the door      
                //pickupSound.play(); // original game doesn't play sound when door is opened. We could add one.
            }
        }
    }

    CollisionHandler(a, b) {
        if (a === undefined || a === null || b === undefined || b === null) return false;

        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    // found this online but it is not actually BIOT collision detection. Leaving here for reference. 
    //BiotCollisionHandler(obj1, obj2) {
    //    const dx = obj1.x - obj2.x;
    //    const dy = obj1.y - obj2.y;
    //    const distance = Math.sqrt(dx * dx + dy * dy);

    //    if (distance < obj1.radius + obj2.radius) {
    //        const angle = Math.atan2(dy, dx);
    //        const targetX = obj2.x + Math.cos(angle) * (obj1.radius + obj2.radius);
    //        const targetY = obj2.y + Math.sin(angle) * (obj1.radius + obj2.radius);
    //        const ax = (targetX - obj1.x) * 0.1;
    //        const ay = (targetY - obj1.y) * 0.1;
    //        obj1.vx -= ax;
    //        obj1.vy -= ay;
    //        obj2.vx += ax;
    //        obj2.vy += ay;
    //    }
    //}

}