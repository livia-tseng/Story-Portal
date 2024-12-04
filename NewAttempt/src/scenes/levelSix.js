import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';
import { effectOnClick } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelSixScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELSIX_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('bgl6').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('bgl6').getSourceImage().height;
        this.add.image(0,0, 'bgl6').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);

        let question = this.add.image(0, 0, 'question6').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(1);
        
        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(2);
        const backText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(2);
        //Container!
        const containerBackButton = this.add.container(backButton.width/2, 600 - (backButton.height/2), [backButton, backText]).setDepth(2);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();
        containerBackButton.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        });
        
        // answer buttons
        let corrB = correctButton(this, 435, 520, '6c', SCENE_KEYS.LEVELSEVEN_SCENE).setScale(.075);
        let wb1 = wrongButton(this,695,400,'6b').setScale(.075);
        let wb2 = wrongButton(this,435,400, '6a').setScale(.075);
        let wb3 = wrongButton(this,695,520,'6d').setScale(.075);

        

        //Stars on Click!
        effectOnClick(this);
    }
}