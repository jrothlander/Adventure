
let timerOffset;

class GameStateManager {

    Initialize() {
        timerOffset = Date.now(); // start game timer
        state = GAME_STATE.RUNNING;
        level = 54; // starts on 54... but you can change this to test any level.
    }

    Update() {
        if (level === 44 && chalice.screen_level === 44) {
            state = GAME_STATE.WIN;
        }
    }

    Draw() {
        if (state === GAME_STATE.START) {
            LoadSplashImage();
        }

        if (state === GAME_STATE.WIN) {

            //panel.hidden = false;
            this.DrawText("You Win!", canvas.width * .5, canvas.height * .5, "rgb(155, 102, 102)");

            // Format the total game time
            const totalTimeSeconds = Math.floor(totalGameTime / 1000);
            const minutes = Math.floor(totalTimeSeconds / 60);
            const seconds = totalTimeSeconds % 60;
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            this.DrawText(`Total Time : ${formattedTime}`, canvas.width * .5, (canvas.height * .5) + 50, "rgb(155, 102, 102)");

        } else {
            totalGameTime = Date.now() - timerOffset;
        }
    }

    DrawText(text, x, y, color) {
        ctx.font = "16px fantasy";
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    LoadSplashImage() {
        const splashImage = imageManager.GetImage("splash");
        ctx.drawImage(
            splashImage,
            (canvas.width - (splashImage.width * scaleFactor)) / 2,
            (canvas.height - (splashImage.height * scaleFactor)) / 2,
            splashImage.width * scaleFactor,
            splashImage.height * scaleFactor
        );
    }

    GetGameType(value) {
        switch (value) {
        case "2":
            return GAME_TYPE.INTRO;
        case "3":
            return GAME_TYPE.HARD;
        default:
            return GAME_TYPE.EASY;
        }
    }
}