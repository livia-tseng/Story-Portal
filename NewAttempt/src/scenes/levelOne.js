import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';

export class LevelOneScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELONE_SCENE,
            }
        );
    }

    init() {

    }


    create(){
        const screenWidth = this.scale.width / this.textures.get('polarkidsleeping').getSourceImage().width;
        const screenHeight = this.scale.height / this.textures.get('polarkidsleeping').getSourceImage().height;
        
        this.add.image(0,0,'polarkidsleeping').setOrigin(0).setScale(screenWidth,screenHeight).setDepth(0);

        const sleep = this.add.text(400,100,'level one', {
                fontFamily: 'BadComic-Regular',
                color: 'white',
                fontSize: '50px',
        }).setOrigin(0.5).setDepth(2);

        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(1);
        const startText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(2);
        //Container!
        const containerBackButton = this.add.container(backButton.width/2, backButton.height/2, [backButton, startText]);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();

        containerBackButton.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        })

        
}

}
