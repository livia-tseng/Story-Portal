import Phaser from './lib/phaser.js';
import { SCENE_KEYS } from './scenes/sceneKeys.js';
import { PreloadScene } from './scenes/preloadscene.js';
import { MainMenuScene } from './scenes/mainMenuScene.js';
import { CreditsScene } from './scenes/creditsScene.js';
import { GameStartScene } from './scenes/gameStartScene.js';
import { LevelOneScene } from './scenes/levelOne.js';
import { LevelTwoScene } from './scenes/levelTwo.js';
import{ LevelThreeScene } from './scenes/levelThree.js';
import { LevelFourScene } from './scenes/levelFour.js';
import { LevelDraggableScene } from './scenes/levelDraggable.js';


//This the main js file

//This how u initialize game        
const game = new Phaser.Game({
    type: Phaser.CANVAS, //Not sure what this does tbh but apparently it just works most of the time
    pixelArt: false, //Dude in the video did this, if we do pixel art then this setting matters
    scale: { //This is how big/the resolution of the game screen
        width: 800,
        height: 600, //800x600
        mode: Phaser.Scale.FIT, //Fit to device screen
        autoCenter: Phaser.Scale.CENTER_BOTH //auto centers it on the screen
    },
    parent: 'game-container', //Need this for the html for some reason
    backgroundColor: '#000000', //Background color
});

//Adding all the scenes to the game
game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.MAIN_MENU_SCENE, MainMenuScene);
game.scene.add(SCENE_KEYS.CREDITS_SCENE, CreditsScene);
game.scene.add(SCENE_KEYS.GAME_START_SCENE, GameStartScene);

//levels
game.scene.add(SCENE_KEYS.LEVELONE_SCENE, LevelOneScene);
game.scene.add(SCENE_KEYS.LEVELTWO_SCENE, LevelTwoScene);
game.scene.add(SCENE_KEYS.LEVELTHREE_SCENE, LevelThreeScene);
game.scene.add(SCENE_KEYS.LEVELFOUR_SCENE, LevelFourScene);
game.scene.add(SCENE_KEYS.LEVELDRAGGABLE_SCENE, LevelDraggableScene);

//Starting the first one (preloader)
game.scene.start(SCENE_KEYS.PRELOAD_SCENE);