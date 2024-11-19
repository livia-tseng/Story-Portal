import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import * as WebFontLoader from '../lib/webfontloader.js';

//Here, we "preload" all of the assets (images and stuff)
//This is kind of like a loading screen i think
//Some tutorials like to implement a loading bar here but I am a little bit too dumb for that
export class PreloadScene extends Phaser.Scene {
    constructor() { //Constructor!
        super({ //U call super and then u pass in the name of the scene
            key: SCENE_KEYS.PRELOAD_SCENE, //In this case, PRELOAD_SCENE from sceneKeys.js
            }
        );
    }

    //Not sure what this does but i dont think its necessary
    init() {

    }

    //The preload method is where u preload stuff
    //If ur like the guy in the video just preload everything at the beginning in ur preload scene (as done here)
    preload() {
        //this is how you load images (key/name/reference to image, path to actual image file)
        this.load.image('background', './assets/images/polarexpress.webp');
        this.load.image('mountainBackground', './assets/images/polar_express_mountain.jpg');
        this.load.image('samuelf','./assets/images/samuelf.png');
        this.load.image('polarkidsleeping','./assets/images/polarkidsleeping.webp');
        this.load.image('startBtn', './assets/images/TextBTN_Big.png');
        this.load.image('creditsBtn', './assets/images/Exclamation_Yellow.png');
        this.load.image('grayExcl', './assets/images/Exclamation_Gray.png');
        this.load.image('redExcl', './assets/images/Exclamation_Red.png');
        this.load.image('creditsBackground', './assets/images/UI-board-Large-stone.png');
        this.load.image('exitButton', './assets/images/Close-Button.png');
        this.load.image('cancelButton', './assets/images/TextBTN_Cancel.png');
        this.load.image('mediumButton', './assets/images/TextBTN_Medium.png');
        this.load.image('star', './assets/images/star.png');
        
        //These are all free from this random website i have no idea which ones i clicked tbh
    }
    
    create() {
        //Loading custom font!!!
        //As it turns out, it was only not working because I didn't restart the code!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HAHAHAHAHAHAHAHHA
        WebFontLoader.default.load({ //Loading the font
           custom: { //It is a custom font (meaning I have a file for the font)
                families: ['BadComic-Regular'], //Put the same thing as done in the html file
            },
            active: () => { //If the font has loaded and is now active, start the scene
                this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
            },
        });
    }

    
}