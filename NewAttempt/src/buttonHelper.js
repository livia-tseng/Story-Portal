export function wrongButton(scene,x,y,assetKey) {
    const wrongButton = scene.add.sprite(x,y,assetKey)
        .setInteractive()
        .setOrigin(0.5)
        .setScale(0.3,0.3)
        .on('pointerup', ()=> {wrongButton.setTint(0xff0000).setAlpha(0.5)
            scene.input.enabled = false;
            let wrongText = scene.add.text(400,300,"Wrong!", {
                fontSize: "64px",
                color:"#FF0000",
                fontFamily: 'BadComic-Regular',
            }).setOrigin(0.5).setDepth(2);
            scene.time.delayedCall(1500, ()=> {
                wrongText.destroy();
                scene.input.enabled = true;
            })
        })
    return wrongButton;
}

export function correctButton(scene,x,y,assetKey,nextScene, callback=null) {
    const correctButton = scene.add.sprite(x,y,assetKey)
        .setInteractive()
        .setOrigin(0.5)
        .setScale(0.3,0.3)
        .on('pointerdown', () => {
            scene.input.enabled = false;
            correctButton.setTint(0xff0000).setAlpha(0.5)
            
            let correctText = scene.add.text(400,300,"Correct!", {
                fontSize: "64px",
                color:"#00ff00",
                fontFamily: 'BadComic-Regular',
            }).setOrigin(0.5).setDepth(2);
        scene.time.delayedCall(1500, ()=> {
            scene.sound.stopAll();
            correctText.destroy();
            if (callback) {
                callback(()=>{
                    scene.input.enabled = false;
                    scene.scene.start(nextScene);
                });
            } else {
                scene.input.enabled = false;
                scene.scene.start(nextScene);
        }})
        })
        return correctButton;
    };
        
  


export function effectOnClick(scene) {
    const emitterStars = scene.add.particles(0, 0, 'star', {
        lifespan: 400,
        speed: { min: 150, max: 150 },
        alpha: { start: 1, end: 0.1 },
        rotate: { start: 0, end: 180 },
        emitting: false
    });
    emitterStars.setDepth(2);

    scene.input.on('pointerdown', pointer => {
        emitterStars.emitParticleAt(pointer.worldX, pointer.worldY, 30);
    });

    return emitterStars;
}