
var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 850,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 750 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var platforms;
var player;
var cursors;
var directionIsLeft;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/plattform.jpg');
    this.load.image('GKBCoin', 'assets/GKBCoin.png');
    this.load.image('Coin', 'assets/Coin.png');

    this.load.spritesheet('SpriteSheet2Limbo', 'assets/SpriteSheet2Limbo.png', { frameWidth: 90.71, frameHeight: 136 });
}
function create() {
    this.add.image(800, 425, 'sky');
    this.add.image(800, 400, 'Coin');
    
    platforms = this.physics.add.staticGroup();
    platforms.create(800, 860, 'ground').setScale(4).refreshBody();

    platforms.create(600, 600, 'ground');
    platforms.create(300, 400, 'ground');
    platforms.create(950, 300, 'ground');
    

    player = this.physics.add.sprite(100, 715, 'SpriteSheet2Limbo');
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('SpriteSheet2Limbo', {start: 0, end:5}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turnleft',
        frames: [ { key: 'SpriteSheet2Limbo', frame: 6 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'turnright',
        frames: [{key: 'SpriteSheet2Limbo', frame: 7}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('SpriteSheet2Limbo', {start: 8, end:13}),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platforms);
}
function update() 
{

    if (cursors.left.isDown == true && cursors.right.isDown == false) {
        WalkLeft();
        directionIsLeft = true;
    }
    
    else if (cursors.right.isDown == true && cursors.left.isDown == false) {
        WalkRight();
        directionIsLeft = false;
    }

    else if (cursors.right.isDown == false && cursors.left.isDown == false && directionIsLeft == true) {
        player.setVelocityX(0);
        player.anims.play('turnleft');
    }

    else if (cursors.right.isDown == false && cursors.left.isDown == false && directionIsLeft == false) {
        player.setVelocityX(0);
        player.anims.play('turnright');
    }
    
    else if (cursors.right.isDown == true && cursors.left.isDown == true) {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-600);
    }
}

function WalkLeft() 
{

        player.setVelocityX(-160);

        player.anims.play('left', true);


        

}

function WalkRight() 
{
    if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else if (cursors.right.isDown == false)
    {
        
    }
}