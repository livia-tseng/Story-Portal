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

        
}

}
