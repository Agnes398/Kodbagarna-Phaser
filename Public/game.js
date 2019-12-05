
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('plattform', 'assets/plattform.png');
    this.load.image('GKBCoin', 'assets/GKBCoin.png');
    this.load.image('Coin', 'assets/Coin.png');

    this.load.spritesheet('SpriteSheet2Limbo', 'assets/SpriteSheet2Limbo.png', { frameWidth: 90, frameHeight: 136 });
}
function create() {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'Coin');
    
    player = this.physics.add.sprite(100, 450, 'SpriteSheet2Limbo');
    player.setCollideWorldBounds(true);

    this.anim.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('SpriteSheet2Limbo', {start: 0, end:5}),
        framerate: 10,
        repeat: -1
    });

    this.anim.create({
        key: 'turnleft',
        frames: [{key: 'SpriteSheet2Limbo', frame: 6}],
        framerate: 20
    });
    // this.anim.create({
    //     key: 'turnright',
    //     frames: [{key: 'SpriteSheet2Limbo', frame: 7}],
    //     framerate: 20
    // });

    this.anim.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('SpriteSheet2Limbo', {start: 8, end:13}),
        framerate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
}
function update() 
{

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turnright');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-280);
    }
}