// Custom string/text to spritesheet images. 
//
// I did not like having to use fonts to create the text in the games and used the font
// images from the sprite sheet to build a little algorithmn to translate any string value 
// into a spritesheet image(s) to place on the canvas.
//
// TODO: 
//       - Adjust for colors rows in sprite sheet
//       - Consider making dynamic sprite input size. Currently the code is hardcoded per specific sheet. 

let spriteSheet_lib = new Image();
spriteSheet_lib.src = "images/galaga-screens.png";

// -------------
// Constants
// -------------
// Per given sprite sheet. I.e., these will need to be set for each sprite sheet used. 
// These are not parameters, but constants per the given sprite sheet. Therefore I do
// not pass these in. Although they could be if an API or engine was intended. But that
// was not my intent. My intent is to modify this per sprite sheet. So, if you have two
// sheets per game, you would need unique functions and constants for each. Maybe a 
// future enhancement would be to support multiple sprite sheets. 

const spriteWidthX = 8;           // width without border
const spriteWidthY = 8;           // height without border
const spriteBorder = 1;           // border (height and width)

const spriteStartX_num = 453;     // starting x-position of first sprite for numeric characters
const spriteStartX_alpha = 543;   // starting x-position of first sprite for alpha characters
const spriteStartY_row1 = 462;    // starting y-position of row1
const spriteStartY_row2 = 471;    // starting y-position of row1

// Draw a string as sprites on the canvas
function drawString(str, startX = 0, startY = 0, dx = 16, dy = 16) {
  // Converts string to array of characters and translate each character to a sprite and 
  // displays on the canvas.
  //
  // Note: I am using the dx value as the number of pixels of spacing between characters. This 
  // may need some tweaking but seems to work well to create a fixed-width font style vs a 
  // dynamic/variable width font.
  for (let i = 0; i < str.length; i++) {
    drawSprite(str[i], startX + (i * dx), startY, dx, dy);
  };
}

// Maps a char to a given sprite and displays on the canvas
function drawSprite(character, x = 0, y = 0, dx = 16, dy = 16) {
  var alphabetRow1 = 'abcdefghijklmno'; // row 1 of alpha chars from the sprite sheet
  var alphabetRow2 = 'pqrstuvwxyz';     // row 2 of alpha chars the sprite sheet
  var number = '0123456789';

  // TODO: I could remove the magic ASCII numbers, but leaving them for now because it makes 
  //       the code more intuitive.    

  if (alphabetRow1.includes(character)) { // verify if character is in row1             
    // Create an index between 0 and 25 to respresent each alphabetic character as an index.    
    // Subtract ASCII value of 'a' (97) to get index between 0 and 25. 
    var index = character.charCodeAt(0) - 97;
    ctx.drawImage(spriteSheet_lib,
      spriteStartX_alpha + (index * (spriteWidthX + spriteBorder)),
      spriteStartY_row1,
      spriteWidthX, spriteWidthY,
      x, y,
      dx, dy);

  } else if (alphabetRow2.includes(character)) { // verify if character is in row2      
    // Subtract ASCII value of 'a' to get index between 0 and 25. 
    // Subtract 25 to account for the second line of characters starting with 'p'.
    var index = character.charCodeAt(0) - 97 - 25;
    ctx.drawImage(spriteSheet_lib,
      spriteStartX_alpha + (index * (spriteWidthX + spriteBorder)),
      spriteStartY_row2,
      spriteWidthX, spriteWidthY,
      x, y,
      dx, dy);

  } else if (number.includes(character)) {
    // Create an index between 0 and 9 by subtracting ASCII value of '0'.
    var index = character.charCodeAt(0) - 48;
    ctx.drawImage(spriteSheet_lib,
      spriteStartX_num + (index * (spriteWidthX + spriteBorder)), spriteStartY_row1,
      spriteWidthX, spriteWidthY,
      x, y,
      dx, dy);
  }
}