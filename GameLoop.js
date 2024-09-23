const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const GAME_TYPE = { EASY: 1, INTRO: 2, HARD: 3 };
const GAME_STATE = { START: 0, RUNNING: 1, WIN: 2, OVER: 3 };

let totalGameTime;
let gameType = GAME_TYPE.EASY;  // Set game type default and override from dropdown list below.
let state = GAME_STATE.START;   // Set game state 
let level = {};                 // Games starts in room 54
let keys = {};                  // keyboard input handling... not do be confused with the castleKeys[] game assets.
let skin = {};                  // User can select original Atari skin or a retro arcade style.

const panel = document.querySelector("#panel");
const startButton = document.querySelector("#startButton");
const btnGame = document.querySelector("#btnGame");
const checkboxSkin = document.querySelector("#retro");

// In most game engines the convention is to implement to use an initialize, update, and draw 
// function to handle drawable game assets. An array of manager classes allows the code forEach
// over each manager to enforce the conventions. Still considering if I like this approach. 

const imageManager = new ImageManager();
const dragonHandler = new DragonManager();
const chaliceHandler = new ChaliceManager();
const playerHandler = new PlayerManager();
const keyManager = new KeyManager();
const swordManager = new SwordManager();
const magnetManager = new MagnetManager();
const batManager = new BatManager();
const bridgeManager = new BridgeManager();
const dotManager = new DotManager();
const gateManager = new GateManager();
const gridManager = new GridManager();
const collisionHandler = new CollisionHandler();
const gameStateManager = new GameStateManager();

// register managers add them to the following array. I may get more advanced later. 
var managers = // Used for drawable game assets and must contain Initialize(), Update(), and Draw().
    [
        gameStateManager,
        gridManager,
        chaliceHandler,
        playerHandler,
        dragonHandler,
        keyManager,
        swordManager,
        magnetManager,
        batManager,
        bridgeManager,
        dotManager,
        gateManager,
        collisionHandler
    ];

imageManager.LoadImages(imageList, () => {
    gameStateManager.LoadSplashImage();
});

startButton.addEventListener("click", () => {
    if (state !== GAME_STATE.RUNNING) {
        panel.hidden = true;
        skin = checkboxSkin.checked;
        gameType = gameStateManager.GetGameType(btnGame.value);

        Initialize();
    }
});

window.addEventListener("keydown", function (event) {
    keys[event.key] = true;
    if (event.key === " ") {    // space-bar
        player.released = true;
    }
});

window.addEventListener("keyup", function (event) {
    delete keys[event.key];
    if (event.key === " ") {    // space-bar
        player.released = true;
    }
});

// Initialize() and Update() make up the Game-Loop
//
// I am not supporting a separate Draw() function here, as I am in the other classes, as there are no non-drawable 
// game assets at this time. Therefore, the asset managers Update() and Draw() functions are both called in the 
// Update() function.However, they are called separately in case I want to try to manage the fps later. But that 
// may not be necessary when using the Canvas.

function Initialize() {

    managers?.forEach((item) => {   // initialize all game asset managers
        item.Initialize();
    });

    requestAnimationFrame(Update);  
} 

function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    managers?.forEach((item) => { // execute all game asset manager Update() and Draw() functions
        item.Update();
        item.Draw();
    });

    requestAnimationFrame(Update); // continue the game loop
}
