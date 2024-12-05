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
        this.load.image('bgl1','./assets/images/1-Background.png');
        this.load.image('backgroundl2', './assets/images/2-Background.png');
        this.load.image('bgl3', './assets/images/3-Background.png');
        this.load.image('bgl5', './assets/images/5-Background.png');
        this.load.image('bgl6', './assets/images/6-Background.png');
        this.load.image('bgl7', './assets/images/7-Background.png');
        this.load.image('bgl8', './assets/images/8-Background.png');
        this.load.image('bglf', './assets/images/Fin-Background.png');
        this.load.image('mountainBackground', './assets/images/polar_express_mountain.jpg');
        this.load.image('dragBackground', './assets/images/UI-board-Large-parchment.png');

        //Level 1 stuff
        this.load.image('samuelf','./assets/images/samuelf.png');
        this.load.image('windowDark', './assets/images/1-windowDark.png');
        this.load.image('windowLight', './assets/images/1-windowLight.png');
        this.load.image('boySleep', './assets/images/1-Animated-ChrisSleep.png');
        this.load.image('boyUp','./assets/images/1-Animated-ChrisUp.png');
        this.load.image('question1', './assets/images/1-Question.png');
        //L1 answers
        this.load.image('1a','./assets/images/sp_1a.png');
        this.load.image('1b','./assets/images/sp_1b.png');
        this.load.image('1c','./assets/images/sp_1c.png');
        this.load.image('1d','./assets/images/sp_1d.png');

        //Level 2 stuff
        this.load.image('jayden2', './assets/images/jayden2.jpg');
        this.load.image('question2', './assets/images/2-Question.png');
        this.load.image('snowflake', './assets/images/snowflake.png');
        //L2 answers
        this.load.image('2a','./assets/images/sp_2a.png');
        this.load.image('2b','./assets/images/sp_2b.png');
        this.load.image('2c','./assets/images/sp_2c.png');
        this.load.image('2d','./assets/images/sp_2d.png');

        //Level 3 stuff
        this.load.image('jayden3', './assets/images/jayden3.jpg');
        this.load.image('question3', './assets/images/3-Question.png');
        //L3 answers
        this.load.image('3a','./assets/images/sp_3a.png');
        this.load.image('3b','./assets/images/sp_3b.png');
        this.load.image('3c','./assets/images/sp_3c.png');
        this.load.image('3d','./assets/images/sp_3d.png');

        //Mystical Level 4
        this.load.image('ameen4', './assets/images/ameen4.jpg');

        //Level 5 stuff
        this.load.image('ameen5', './assets/images/ameen5.jpg');
        this.load.image('snow', './assets/images/5-Snow.png');
        this.load.image('train1', './assets/images/5-Animated1.png');
        this.load.image('train2', './assets/images/5-Animated2.png');
        this.load.image('train3', './assets/images/5-Animated3.png');
        this.load.image('question5', './assets/images/5-Question.png');
        //L5 answers
        this.load.image('5a','./assets/images/sp_5a.png');
        this.load.image('5b','./assets/images/sp_5b.png');
        this.load.image('5c','./assets/images/sp_5c.png');
        this.load.image('5d','./assets/images/sp_5d.png');

        //Level 6 stuff
        this.load.image('ameen6', './assets/images/ameen6.jpg');
        this.load.image('question6', './assets/images/6-Question.png');
        //L6 answers
        this.load.image('6a','./assets/images/sp_6a.png');
        this.load.image('6b','./assets/images/sp_6b.png');
        this.load.image('6c','./assets/images/sp_6c.png');
        this.load.image('6d','./assets/images/sp_6d.png');

        //Level 7 stuff
        this.load.image('ameen7', './assets/images/ameen7.jpg');
        //L7 answers
        this.load.image('7a','./assets/images/sp_7a.png');
        this.load.image('7b','./assets/images/sp_7b.png');
        this.load.image('7c','./assets/images/sp_7c.png');
        this.load.image('7d','./assets/images/sp_7d.png');

        //Level 8 stuff
        this.load.image('avia8', './assets/images/avia8.jpg');
        this.load.image('question8', './assets/images/8-Question.png');
        //L8 answers
        this.load.image('8a','./assets/images/avia8.jpg');
        this.load.image('8b','./assets/images/avia8.jpg');
        this.load.image('8c','./assets/images/avia8.jpg');
        this.load.image('8d','./assets/images/avia8.jpg');


        //Final level stuff
        this.load.image('ameenFinal', './assets/images/ameenFinal.jpg');
        this.load.image('giftLid', './assets/images/Fin-interactive1.png');
        this.load.image('giftBox', './assets/images/Fin-interactive2.png');
        this.load.image('bell', './assets/images/Fin-interactive3.png');
        
        this.load.image('startBtn', './assets/images/TextBTN_Big.png');
        this.load.image('creditsBtn', './assets/images/Exclamation_Yellow.png');
        this.load.image('grayExcl', './assets/images/Exclamation_Gray.png');
        this.load.image('redExcl', './assets/images/Exclamation_Red.png');
        this.load.image('creditsBackground', './assets/images/ameenbgcredit.jpg');
        this.load.image('exitButton', './assets/images/Close-Button.png');
        this.load.image('cancelButton', './assets/images/TextBTN_Cancel.png');
        this.load.image('mediumButton', './assets/images/TextBTN_Medium.png');
        this.load.image('star', './assets/images/star.png');
        this.load.image('heart', './assets/images/pinkheart.png');
        
        //Audio
        this.load.audio('ameen_intro', './assets/audio/ameens_intro.mp3'); //Credits
        this.load.audio('lvl1audio1','./assets/audio/level1audio1.mp3'); //Level 1
        this.load.audio('lvl3audio','./assets/audio/level3audio.mp3'); //Level 3
        this.load.audio('lvl5audio', './assets/audio/level4audio.mp3'); //Level 5
        this.load.audio('lvl2audio','./assets/audio/level2bgaudio.mp3');
        this.load.audio('mainmenuaudio','./assets/audio/mainmenuaudio.mp3');
        this.load.audio('lvl6audio','./assets/audio/level5audio.mp3');
        this.load.audio('lvl7audio','./assets/audio/level7audio.mp3');

        //video
        this.load.video('trainarriving','./assets/videos/trainarriving.mp4');
        this.load.video('gettingontrain','./assets/videos/gettingontrain.mp4');
        this.load.video('tokyodrift','./assets/videos/tokyodrift.mp4');
        this.load.video('lvl3tolvl4','./assets/videos/lvl3tolvl4.mp4');
        this.load.video('lvl5tolvl6', './assets/videos/lvl5tolvl6.mp4');
        this.load.video('lvl7tolvl8','./assets/videos/lvl7tolvl8.mp4');
        this.load.video('lvl8tofinale','./assets/videos/level8tofinale.mp4');
    }
    
    create() {
        //Loading custom font!!!
        //As it turns out, it was only not working because I didn't restart the code!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HAHAHAHAHAHAHAHHA
        WebFontLoader.default.load({ //Loading the font
           custom: { //It is a custom font (meaning I have a file for the font)
                families: ['BadComic-Regular', 'Goudy'], //Put the same thing as done in the html file
            },
            active: () => { //If the font has loaded and is now active, start the scene
                this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
            },
        });
    }

    
}