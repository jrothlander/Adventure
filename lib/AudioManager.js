// -------------
// Load sounds
// -------------
// I personally recorded the sounds from the original game and cleaned them up manually.
// 
// I am tracking all of the sounds in this one location. You can track them in where they are used, but 
// here it is easier to maintain them in a single location.
//
// There is currently one issue, in that the first sound played has a delay. Probably something internalizing
// that could be initialize at the start of the game.

// ----------------------------
// Adventure Sounds
// ----------------------------

var pickupSound = [new Audio(), new Audio()];
pickupSound[0].src = "audio/adventure_pickup.mp3";
pickupSound[1].src = "audio/adventure_pickup.mp3";

var releaseSound = [new Audio(), new Audio()];
releaseSound[0].src = "audio/adventure_release.mp3";
releaseSound[1].src = "audio/adventure_release.mp3";

var attackSound = [new Audio(), new Audio()];
attackSound[0].src = "audio/adventure_attack.mp3";
attackSound[1].src = "audio/adventure_attack.mp3";

var dieSound = [new Audio(), new Audio()];
dieSound[0].src = "audio/adventure_die.mp3";
dieSound[1].src = "audio/adventure_die.mp3";

var killedSound = [new Audio(), new Audio()];
killedSound[0].src = "audio/adventure_killed.mp3";
killedSound[1].src = "audio/adventure_killed.mp3";

// ----------------------------
// Other Sounds
// ----------------------------

var newGame = [new Audio(), new Audio()];
newGame[0].src = "audio/newgame.wav";
newGame[1].src = "audio/newgame.wav";

var eatPill1 = [new Audio(), new Audio()];
eatPill1[0].src = "audio/eatpill1.wav";
eatPill1[1].src = "audio/eatpill1.wav";

var eatPill2 = [new Audio(), new Audio()];
eatPill2[0].src = "audio/eatpill2.wav";
eatPill2[1].src = "audio/eatpill2.wav";

var eatFruit = [new Audio(), new Audio()];
eatFruit[0].src = "audio/eatfruit.wav";
eatFruit[1].src = "audio/eatfruit.wav";

function PlaySound(soundToPlay) {
    // Scan for available sound to play.
    // This resolves issues where the sound fails to play quickly back to back and there is a delay before 
    // it plays and allows more than one sound to play at a time. This also allows for volume setting.
    for (let sound of soundToPlay) {
        if (sound.ended || sound.currentTime === 0) {
            sound.volume = 0.5;
            sound.play();
            break;
        } // if
    } // for
} // PlaySound() 