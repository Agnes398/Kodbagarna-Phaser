
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

var score = 0;
var scoreText;
var coins;
var bombs;
var platforms;
var player;
var cursors;
var directionIsLeft = true;
var jumpIsLeft = true;
var enterKey;
var Wait = false;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/plattform.jpg');
    this.load.image('ground2', 'assets/plattform2.jpg');
    this.load.image('Coin', 'assets/Coin.png');
    this.load.image('AngryBird', 'assets/angrybird.png');

    this.load.spritesheet('SpriteSheet2Limbo', 'assets/SpriteLimboLol2.png', { frameWidth: 69, frameHeight: 144 });
}
function create() {

    score = 0;
    this.add.image(800, 425, 'sky');
    
    platforms = this.physics.add.staticGroup();

    platforms.create(800, 860, 'ground').setScale(4).refreshBody();

    platforms.create(600, 600, 'ground');
    platforms.create(300, 400, 'ground');
    platforms.create(950, 300, 'ground');
    platforms.create(1400, 500, 'ground2');
    platforms.create(1100, 780, 'ground2');
    platforms.create(1100, 750, 'ground2');
    platforms.create(1100, 720, 'ground2');
    

    player = this.physics.add.sprite(200, 715, 'SpriteSheet2Limbo');
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
        key: 'jumpleftup',
        frames: [{key: 'SpriteSheet2Limbo', frame: 14}],
        frameRate: 20
    });

    this.anims.create({
        key: 'jumprightup',
        frames: [{key: 'SpriteSheet2Limbo', frame: 16}],
        frameRate: 20
    });

    this.anims.create({
        key: 'jumpleftdown',
        frames: [{key: 'SpriteSheet2Limbo', frame: 15}],
        frameRate: 20
    });

    this.anims.create({
        key: 'jumprightdown',
        frames: [{key: 'SpriteSheet2Limbo', frame: 17}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('SpriteSheet2Limbo', {start: 8, end:13}),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    
    coins = this.physics.add.group({
        key: 'Coin',
        repeat: 15,
        setXY: { x: 50, y: 20, stepX: 100 }
    });

    coins.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '35px', fill: '#000' });
    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(player, coins, collectCoin, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

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

    else if (cursors.right.isDown == false && cursors.left.isDown == false || cursors.right.isDown == true && cursors.left.isDown == true) {
        Stand();
    }
    
    //Jumps
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-600);
    }

    AnimatePlayer();

    if (enterKey.isDown == true && Wait == false) {
        Wait = true;
        RestartGame();
    }

}


function WalkLeft() 
{
    player.setVelocityX(-225);
}

function WalkRight() 
{
    player.setVelocityX(225);
}

function Stand() 
{
    player.setVelocityX(0);
}

function AnimatePlayer() {

    if(cursors.right.isDown == true && cursors.left.isDown == false) {
        player.anims.play('right', true);
    }

    else if(cursors.right.isDown == false && cursors.left.isDown == true) {
        player.anims.play('left', true);
    }

    else if (cursors.right.isDown == false && cursors.left.isDown == false || cursors.right.isDown == true && cursors.left.isDown == true) {
        if(directionIsLeft == true) {
        player.anims.play('turnleft', true);
        }
        else {
            player.anims.play('turnright', true);
        }
    }

}

function collectCoin(player, coin) {
    coin.disableBody(true, true);

    //  Add and update the score
    score += 1;
    scoreText.setText('Score: ' + score);

    if (coins.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 800) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 800);
        var bomb = bombs.create(x, 16, 'AngryBird');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-150, 150), 20);
        bomb.allowGravity = false;

    }
}
function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');
}

function RestartGame() {
    //this.scene.restart();
    console.log('Restarting. . .');
}