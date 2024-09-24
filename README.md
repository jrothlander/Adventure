<img src="https://img.itch.zone/aW1nLzE3NzQ1MjI0LnBuZw==/original/pg%2BKUl.png" width="50%">

The game is hosted at https://jrothlander.itch.io/atari-adventure-1980

# Adventure
Atari Adventure (1980) Clone

This is a clone of Warren Robinett's 1980 game Adventure for the Atari 2600 and written in HTML and JavaScript, and  my submission to Andre LaMothe's Udemy course,  Fast and Furious Game Development with JavaScript and AI.

## Game Controls
Use your keyboard cursor arrows to move the player and the spacebar to drop items. 

## Game History
Adventure was the first graphical adventure game ever released. Robinett was the first game developer to add multiple screens/rooms to computer game, the first to add an Easter egg, mazes, and a map to travel from room to room, and the first to use hyperplane navigation. Many games that came afterwards were inspired by Adventure and many game developers have mentioned that this game was their inspiration.

## Game Assets Supported
The player, dragons, keys, sword, gates, maze, bridge, magnet, microdot, hyperplane navigation, chalice, and winning the game are all working pretty much as the original. I do have it setup so that you have to drop the chalice to win and I do not lock the game down on winning, as I want you to be able to explore the maze. 

## My Focus and Direction
This is an academic project for learning game design in JavaScript, HTML, and using the canvas. The following details have been added for other students that want to review the code and design. 

I developed this game for a competition to write a game based on _**Adventure**_ in less than 30-days without using any 3rd party libraries. I worked on this a few hours a day, a few days a week over the course of about three weeks. While the core of the game is here, it is not production ready. But it is very close. 

My goal has been to recreate the game as close as possible to the original, adding a few new surprises along the way to keep it interesting. I was hoping to encounter many of the same issues that Robinett had to deal with back in 1979 when developing the original, which I think I did when comes to building the map, getting oddies around the various game assets like the bridge and magnet to work.  

Much of the firsts found in _**Adventure**_ would become standard in many other popular games. For example, PacMan is very similar in functionality and has many of the same features. To demonstrate this, I added my own Easter egg of sorts in the lowest right positioned room. While Adventure was released the same year as PacMan, it was probably too late to have really effected the design of PacMan. But it is hard to imagine some of Robinett's features didn't inspire  them. Either way, many games were inspired by his accomplishments and he deserves the credit for being the first.   

## Currently not Implemented

**Level 3** - Level 3 adds randomness elements and the bat. I have not added these yet, but the code already supports it. I just have not had the time to implement it yet. 

**Closing the Gates** - I have not decided how I want the gate closing to work. It is a bit problematic as how do you decided when the player wants to walking through an open gate with the key in hand vs when they just want to close the gate. I have not resolved how this works in the original version just yet. Maybe I will force you to drop the key or it will trigger a gate close. But I would rather it work the same as the original.

**Advanced Dragon AI** - I just started working on the AI for the dragons. Currently they all use a simple direct attack pattern. My goal is to make each use a similar AI to the original game. For now, it uses a simple chasing attack pattern and cannot cross rooms up and down, only left and right. 

**Animations** - I have not added the gate animations. The images are there but I have not added the per-frame logic to work through each image. For now, it just uses an open and closed sprite. It is simple to add and I will do so soon. For the retro skin, I am working on characters and animations to replace the Atari style images. Since I am new to pixel art, it will take me some time unless I can find some free ones that will work well.

**Bat AI** - I have coded the bat, but it only sits on the yellow castle. There is no AI setup yet and the bat will not do anything other than sit there. But the code is there and ready for the AI to be added. This would be a great learning project for someone to complete. 

**Second Bridge** - I am only adding one bridge for now. It will be easy to add the second one since the first is already setup and working.  

**Torch** - On the orange levels leading to the White Castle, the original game uses a limited viewing area, sort of like walking with a torch in a catacomb. While this can be done with JavaScript, I did not add this. I may add it later. 

## Open Issues/Concerns

**Getting Caught in the Walls** - There are still a number of little bugs that I need to clean up. The player can get caught in a wall due to a couple of alignment problems between rooms. I think I have resolved them all, but I keep finding and fixing them as I encounter them. 

**Winning** - To win, you bring the chalice to the Yellow Castle. However, I am requiring that you drop the chalice in the room, not just enter the room with the chalice.  I may go ahead set it to win on entering.

**Picking up items** - The items do not position well when picked up. I have a hardcoded position when they are being carried. This works fine for most objects, but is problematic for the bridge and magnet. I need to figure out a way to make the pick up based on the player's position to the object, as is done in the original. It sounds simple, which it is at first glance. But it becomes problematic when picking up the bridge from the bottom and the magnet. So, I am still working that out. I am curious how Robinett coded for this. I think the best approach might be to create the bounding box a little bigger than the object, so that you don't have to touch the object. So, if you get within say 5 pixels of the object, you pick it up. That way, when you drop it, you are not touching it, so you do not immediately pick it back up. 

**Magnet** - The magnet functionality is odd in the original game. I am not sure how it should really work here. For example, in the original game it will struggles to carry items from one room to the next and often stops attracting the sword, for no reason that I can figure out. The issue is just determining how it should work in order to implement the code. The magnet in this version of the game cannot carry items from room to room, which makes it pretty useless as a method to carry multiple objects. I will fix this. But it still works well to pull objects out of walls. There is also a bug that needs to be fixed, where if multiple items are picked up by the magnet, one will simply disappear. 

**Bridge** - If you are using the bridge to get the microdot, be careful. Currently you can fall off the bridge and into a wall and get trapped, forcing you to reset the game. Also, when picking up the bridge from the bottom, it attaches to the bridge's top, to the bottom of the player. So it shifts the bridge down equal to its height. This does create some odd game play that needs to be addressed and cleaned up.

**Retro Style Skin** - I started working on a retro arcade skin (select it via the radio button on the start screen). My pixel art skills are weak and I am using this to learn. But the point here is not so much about my art skills, as it is about being able to build similar games.

## Development & Design Notes

### Images, Sounds, etc.

The images and sounds are my own. I created them from scratch. I recorded the sounds from the original game and cleaned them up. I used Paint, Krita, and Piskel.com to draw the various images, and Audacity to record, clean up, and edit the sounds. I am open to using free assets in the Retro skin for the characters and inventory items. But I have not found ones that I think fit the game well just yet. I will continue working on this and maybe draw my own if need be. I have pulled in a few free characters to test with and I have commented the code and added a readme.txt to include credits and URLs for these images.    

### Tiles, Grid, and Map

I created my own mapping system based on a map of the original game I found online and through trial and error to come up with a grid layout that worked to accurately recreate the original rooms. 

(https://www.reddit.com/r/gaming/comments/1tvmx1/complete_map_including_the_easte...) 

One I workd out the layout of the rooms, I started numbering them left to right, top to bottom. Each row increase column increases 1 and each row jumps by 10. This limits this design to no more than 10 rooms per row and allows the code to easily calculate the next room to render based on the character travel off the screen in one of four directions. 

The room grids are found in an array in Map.js and Grid.js handles rendering the rooms. The rooms are laid out in a grid of 960 tiles (40 columns by 24 rows). This design is my own and I am sure there are much better Tile Engines available to do this. But for this competition I rolled my own custom version because using 3rd party tools was against the rules. I went through a number of interations with how this is done and finally settled on building an array with all of the rooms. It is fast and works well. 

The grids for each room are my own design based on the original game. I played around with different sizes to mimic the original game. I finally settled on 24 rows and 40 columns, as seemes to best mimic the layout and style of the original game. But I think I ended up going with tiles that are too large. I am using a 40x24=960 tiles @ 15x15 pixels per tile, which is fine for most things in the game, but is problematic for the walls when using the retro skin, as you cannot design a room with walls any smaller than 15x15 with the current approach of using each tile to define the canvas path. to resolve I can increase the size of the canvas, reduce the size of the tiles, and/or adjust the number of rows and columns. But I think using maybe 48 rows and 80 columns of 8x8 pixel tiles, and increasing the size of the canvas to make up the difference, might have been a better choice to get more detail and precision when working in the retro style. I realized this when trying to layout my Easter Egg demo screen where I needed more precision to align various playable elements. You will probably notice that the layout of the room, walls, and assets are not centered well. But at this point, it would be hard to go back and modify it. Maybe after the competition is over I will go back and make the changes. 

### JavaScript Design Patterns

I've been using JavaScript for web design customizations for about as long as it has been around, but I am new to JavaScript game development and I am still working on how best to encapsulate functions, objects, etc. I have been reviewing various design patterns but having a hard time nailing down the best approach, as most content online was pre JavaScript classes and not what I want. I am currently using classes but this doesn't give me everything I want, so I may end up changing the design. I do not like having so many global variables and functions, and I do not like having public functions that are only used in the given class and that should be scoped private. While it works fine as is, adding prototype seems to be a valid way to make these functions private, and I am considering changing my design so that all of the functions in the classes that need private scopes, would be coded as prototypes. I am still reviewing a lot of different perspectives on this and trying to nail down the best option. 

Most games engines implement the following functions and I am trying to support the same. To enforce this, from my game loop I only execute registered drawable game asset classes and I only call initilize(), update(), and draw() through a forEach over an array of these classes. This is my simply way to create a sort of drawable game asset registration and conventions. There are probably better ways to do this, but remember that the completition requires no 3rd party libraries. So I am rolling my own way to do this. Therefore, the structure of all the drawable game asset classes and their functions must be:

* **Initialize()**
* **Update()**
* **Draw()**
* Additional functions to support initalize, update, and draw. These functions should be scoped private and only accessilbe from within the class. They are currently global.

### Managing Drawable Game Assets/Components

I implemented a simple image manager class, audio manager class, and a drawable game asset manager and registration of sorts, for each of the game assets (key, chalice, player, grid, etc.) to allow me to register the game assets and enforce conventions for initialize(), update(), draw() and by registering the asset class in an array and only executing them through a forEach. This may end up being a poor design, but it works well for this game and under these requirements. It also deoes a great deal to clean up the game loop and adding future game assets does not require any additional code to implment them other than registering them in the array. 

I am calling these "drawable" game assets, because if I continue to develop this design, there will be a need for "updatable" only game assets. In that case, the Draw() function will not be needed. You can see this in the CollisionHandler class (CollisionHandler.js) where the Initialize() and Draw() functions are coded but do nothing. It would be nice to have an updateable game asset that does not perform the Draw() fuction. I can support that currently, I am not yet doing so just yet. I want to resovle the JavaScript scoping issues first. 
