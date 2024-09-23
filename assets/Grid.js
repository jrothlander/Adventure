const TILE_TYPES = {
    Closed: 0, Open: 1, Home: 2, Dot: 3, Enemy: 4, Crump: 5, StoneWall: 6, Wall: 7, Blockade: 8, PowerPill
        : 9
};

let screens = [
    1, 2,
    11, 12,
    22 /* Black Castle Interior */,
    32 /* Black Castle */,
    42, 43, 44 /* Yellow Castle Interior */,
    52, 53, 54, 56,
    62, 63, 64, 65, 66,
    74, 75,
    84 /* White Castle Interior */, 85, 86,
    94 /* White Castle */, 95, 96,
    104, 106 /* chalice location for level 1 */
];

const LEVEL_COLORS = ["#FFFFFF",
    "#FFC500e", "#FFC500e", "", "", "", "", "", "", "", "",                       //   1 -  10
    "#FFC500e", "#FFC500e", "", "", "", "", "", "", "", "",                       //  11 -  20
    "", "#FA8072", "", "", "", "", "", "", "", "",                                //  21 -  30
    "", "#000000", "", "", "", "", "", "", "", "",                                //  31 -  40
    "", "#505CC0", "#505CC0", "#CDCD00", "", "", "", "", "", "",                  //  41 -  50
    "", "#505CC0", "#505CC0", "#CDCD00", "", "#9CA864", "", "", "", "",           //  51 -  60
    "", "#505CC0", "#84B468", "#74B474", "#9CA864", "#710EF5", "", "", "", "",    //  61 -  70
    "", "", "", "#FFFFFF", "#FFC500", "", "", "", "", "",                         //  71 -  80
    "", "", "", "#FFFFFF", "#FFC500", "#732BF5", "", "", "", "",                  //  81 -  90
    "", "", "", "#B5E61D", "#FFC500", "#7E84F7", "", "", "", "",                  //  91 - 100
    "", "", "", "#9CA864", "", "#0023F5", "", "", "", ""];                        // 101 - 110

let path = new Path2D();
let walls = new Path2D();
let tiles = [];
let scale = 15;
let localFrameCounter = 0;

// PacMan
let currentLoadedGrid = 0;
let pmChomp = false;
let totalCrumpsRemaining = 0;
let score = 0;

// Images
let colorizedImage;
let pmCrump;
let pmPill;
let easterEgg;
let brickWallImage;
let stoneGroundImage;
let atariImage;

class GridManager {

    Initialize() {

        brickWallImage = imageManager.GetImage("brickwall");
        pmCrump = colorizeHex(imageManager.GetImage("pmcrump"), "#CDCD00");
        pmPill = colorizeHex(imageManager.GetImage("pmpill"), "#CDCD00");
        easterEgg = imageManager.GetImage("easteregg");
        stoneGroundImage = imageManager.GetImage("stoneground");
        atariImage = imageManager.GetImage("atari");

        if (level === 106) {
            totalCrumpsRemaining = 74;
            newGame[0].play(); // do not play multiples... just wait for it to finish, so do not use PlaySound() function here.
            if (skin) colorizedImage = colorizeHex(brickWallImage, "#505CF0");
        } else {
            if (skin) colorizedImage = colorizeHex(brickWallImage, LEVEL_COLORS[level]);
        }

        path = new window.Path2D();
        walls = new window.Path2D();

        this.InitializeTiles();        
    }

    Update() {
        if (currentLoadedGrid !== level) { // lazy loading of the grids only when need and not on every frame            
            this.Initialize();
        }
        
    }

    Draw() {
        currentLoadedGrid = level;

        this.DrawTile();

        ctx.fillStyle = LEVEL_COLORS[level];    // loads color from color array where the index = level   
        this.ProcessGameState();                // changes the level color, so must come over setting the fillstyle                  
        ctx.fill(walls);

        this.DrawRoom();

        //totalGameTime = Date.now() - timerOffset;
        //this.DrawText(`Time : ${totalGameTime}`, 25, 25, "rgb(155, 102, 102)", "left");

        localFrameCounter++;
    }

    // The following should be private functions within the class.

    InitializeTiles() {
        var index = screens.indexOf(level);
        var screen = map.layers[index];

        for (var y = 0; y < map.rows; y++) {
            tiles[y] = [];
            for (var x = 0; x < map.cols; x++) {

                var tileGrid = screen.grid[(y * 40) + x];

                var tile = {
                    x: x * scale,
                    y: y * scale,
                    size: scale,
                    width: scale,
                    height: scale
                };

                switch (tileGrid) {
                    case 0: // Closed                        
                        path.rect(x * scale - 15, y * scale - 15, scale + 15, scale + 15);
                        if (!skin) walls.rect(x * scale, y * scale, scale, scale);
                        tile.type = TILE_TYPES.Open;
                        tile.color = LEVEL_COLORS[0];
                        tiles[y][x] = tile;
                        break;
                    case 1: // Open                        
                        tile.type = TILE_TYPES.Closed;
                        tile.color = LEVEL_COLORS[0];
                        tiles[y][x] = tile;
                        break;
                    case 6: // StoneWalls - function as blockade by you cannot pass through with a microdot                                              
                        path.rect(x * scale - 15, y * scale - 15, scale + 15, scale + 15);
                        tile.type = TILE_TYPES.Blockade;
                        tile.color = "#000000";
                        tiles[y][x] = tile;
                        break;
                    case 7: // Walls                      
                        path.rect(x * scale - 15, y * scale - 15, scale + 15, scale + 15);
                        if (!skin) walls.rect(x * scale, y * scale, scale, scale);
                        tile.type = TILE_TYPES.Blockade;
                        tile.color = "#000000";
                        tiles[y][x] = tile;
                        break;
                    case 8: // Blockade    
                        if (!dot.isPickedUp)
                            path.rect(x * scale - 15, y * scale - 15, scale + 15, scale + 15);
                        tile.type = TILE_TYPES.Blockade;
                        tile.color = "#000000";
                        tiles[y][x] = tile;
                        break;
                    case 5: //  Crumps for Pacman (in room 106 only)
                        tile.type = TILE_TYPES.Crump;
                        tile.color = LEVEL_COLORS[0];
                        tiles[y][x] = tile;
                        break;
                    case 9: //  Power Crump for Pacman (in room 106 only)
                        tile.type = TILE_TYPES.PowerPill;
                        tile.color = LEVEL_COLORS[0];
                        tiles[y][x] = tile;
                        break;
                }
            }
        }
    }   

    DrawTile() {
        const index = screens.indexOf(level);
        const screen = map.layers[index];        

        for (let y = 0; y < map.rows; y++) { // 24 rows
            for (let x = 0; x < map.cols; x++) { // 40 columns

                const type = screen.grid[(y * map.cols) + x];

                switch (type) {
                    case TILE_TYPES.Closed: // 0-closed
                        if (skin) ctx.drawImage(colorizedImage, tiles[y][x].x, tiles[y][x].y);
                        break;
                    case TILE_TYPES.StoneWall: //6-Stonewalls
                        if (skin) ctx.drawImage(stoneGroundImage, tiles[y][x].x, tiles[y][x].y);
                        else {
                            ctx.fillStyle = "black";
                            ctx.fillRect(tiles[y][x].x, tiles[y][x].y, scale, scale);
                        }
                        break;
                    case TILE_TYPES.Wall: // 7-Walls
                        if (skin) ctx.drawImage(stoneGroundImage, tiles[y][x].x, tiles[y][x].y);
                        break;
                    case TILE_TYPES.Blockade: //8-Blockade
                        if (skin)
                            ctx.drawImage(stoneGroundImage, tiles[y][x].x, tiles[y][x].y);
                        else {
                            ctx.fillStyle = "black";
                            ctx.fillRect(tiles[y][x].x, tiles[y][x].y, scale, scale);
                        }
                        break;

                    case TILE_TYPES.Crump: // 5-Crump
                        if (tiles[y][x].type === TILE_TYPES.Crump) {
                            if (collisionHandler.CollisionHandler(player, tiles[y][x])) {

                                // Optimized here to detect collisions because it would take too long
                                // in another function to loop through all of the tiles again. So here
                                // when they are drawn, if the player is on a crump tile, it applies
                                // the collision logic.

                                tiles[y][x].type = TILE_TYPES.Open; // clear the crump by setting tile to open
                                totalCrumpsRemaining--;

                                if (pmChomp)
                                    PlaySound(eatPill1);
                                else
                                    PlaySound(eatPill2);
                                pmChomp = !pmChomp;
                                score += 10;
                            } else {
                                ctx.drawImage(pmCrump, (tiles[y][x].x) + 12, (tiles[y][x].y) + 10);
                            }
                        }
                        break;
                    case TILE_TYPES.PowerPill: // 9-PowerPill
                        if (tiles[y][x].type === 9) {
                            if (collisionHandler.CollisionHandler(player, tiles[y][x])) {

                                tiles[y][x].type = TILE_TYPES.Open; // clear the crump by setting tile to open
                                totalCrumpsRemaining--;

                                if (pmChomp)
                                    PlaySound(eatPill1);
                                else
                                    PlaySound(eatPill2);
                                pmChomp = !pmChomp;
                                score += 100;
                            } else {
                                ctx.drawImage(pmPill, (tiles[y][x].x) + 10, (tiles[y][x].y) + 10);
                            }
                        }
                        break;
                }
            }
        }
    }

    DrawRoom() {
        switch (level) {
            case 56:
                this.DrawText("Cloned by Jon Rothlander", canvas.width / 2, 125, "rgb(155, 102, 102)", "center");
                ctx.drawImage(atariImage, (canvas.width * .5) - (atariImage.width * .5), (canvas.height * .5));
                break;
            case 66:
                ctx.drawImage(easterEgg, (canvas.width * .5), 50);
                break;
            //case 86: // Add this to pages that are blank, just to poke fun of those pages in books that are blank and they write this message on them. 
            //    this.DrawText("This room was intentionaly left blank.", canvas.width * .5, canvas.height * .5, "rgb(155, 102, 102)", "center");
            //    break;
            case 104:
                this.DrawText("This room was intentionaly left blank in the original game. ", canvas.width * .5, 60, "rgb(155, 102, 102)", "center");
                this.DrawText("However, in this version it offers you a clue. In 1979, Atari would not let game", 50, 100, "rgb(155, 102, 102)", "left");
                this.DrawText("developers sign their games and take credit. All Atari games were developed", 50, 120, "rgb(155, 102, 102)", "left");
                this.DrawText("anonymously. Therefore, Warren decided to add a hidden signature that no one", 50, 140, "rgb(155, 102, 102)", "left");
                this.DrawText("would find until after he had left Atari. This was the  first hidden Easter Egg", 50, 160, "rgb(155, 102, 102)", "left");
                this.DrawText("in a computer game. While Atari management was surely upset that Warren", 50, 180, "rgb(155, 102, 102)", "left");
                this.DrawText("pulled it off. They must have learned a valuable lesson, as soon afterwards,", 50, 200, "rgb(155, 102, 102)", "left");
                this.DrawText("Atari implement a requirement that all games must have a hidden Easter Egg.", 50, 220, "rgb(155, 102, 102)", "left");
                this.DrawText("To find the Easter Egg, use the bridge and find a room with a small walled off", 50, 250, "rgb(155, 102, 102)", "left");
                this.DrawText("room that you cannot reach. Use the bridge to enter the room and find an", 50, 270, "rgb(155, 102, 102)", "left");
                this.DrawText("invisible object that will allow you to pass through one of the stone walls.", 50, 290, "rgb(155, 102, 102)", "left");
                break;
            case 106:
                if (totalCrumpsRemaining === 0) {
                    this.DrawText("Take your key!", (canvas.width / 2) + 8, canvas.height / 2, "rgb(155, 102, 102)", "center");
                    castleKeys[0].screen_level = 106; // show the key
                } else {
                    castleKeys[0].screen_level = 0; // hide the key until the crumps are cleared. Makes it at least a challange.
                    castleKeys[0].x = 295; // For room 106 (PacMan), we want to list it as a bonus item in the right location.
                    castleKeys[0].y = 220;

                    this.DrawText("1UP", 35, 35, "rgb(255, 255, 255)");
                    this.DrawText(score, 35, 55, "rgb(255, 255, 255)");

                    if (totalCrumpsRemaining > 60)
                        this.DrawText("Complete this level for a reward.", (canvas.width * .5) + 8, 35, "rgb(155, 102, 102)", "center");
                }
                break;
        }
    }

    ProcessGameState() {

        if (state === GAME_STATE.WIN && (localFrameCounter % 4 === 0)) {
            if (skin)
                colorizedImage = colorizeHex(brickWallImage, getRandomHexColor());
            else
                ctx.fillStyle = getRandomHexColor(); // randomly pick a color from the array.
            localFrameCounter = 0;
        }
    }

    DrawText(text, x, y, color, align) {

        ctx.font = "16px fantasy";
        ctx.textAlign = align;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

}