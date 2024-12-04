import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';
import { effectOnClick } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelSevenScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELSEVEN_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('bgl7').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('bgl7').getSourceImage().height;
        this.add.image(0,0, 'bgl7').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);
        
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
        let corrB = correctButton(this, 695, 520, '7b', SCENE_KEYS.LEVELEIGHT_SCENE).setScale(.085);
        let wb1 = wrongButton(this,435,400,'7a').setScale(.085);
        let wb2 = wrongButton(this,435,520, '7c').setScale(.085);
        let wb3 = wrongButton(this,695,400,'7d').setScale(.085);
        

        //Stars on Click!
        effectOnClick(this);
    }
}