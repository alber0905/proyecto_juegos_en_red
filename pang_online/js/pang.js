$(document).ready(function(){
            var game = new Phaser.Game(600, 600, Phaser.AUTO, 'prueba', { preload: preload, create: create, update: update });
            var platforms;
            var player;
            var lives = 3;
            var firing = false;
            var firing2 = false;
            var score = 0;
            function preload(){
            game.load.image('sky', 'assets/sky.png');
            game.load.image('ground', 'assets/platform.png');
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/player.png', 32, 34);
            game.load.image('bullet', 'assets/laser_bullet.png');
            game.load.image('long_bullet', 'assets/superlong_bullet.png');
            game.load.image('ball', 'assets/big_red_ball.png');
            game.load.image('ball3', 'assets/medium_red_ball.png');
            game.load.image('ball2', 'assets/small_red_ball.png');
            game.load.image('ball1', 'assets/small_small_red_ball.png');
            game.load.image('starvader', 'assets/starvader.png');
            game.load.image('oeste', 'assets/oeste.png');
            }

            var scake = 3;
            var gravity = 600;
            var cursors2 = [];


            function create(){
                game.physics.startSystem(Phaser.Physics.ARCADE);
                generateBackground();
                bullets = game.add.group();
                bullets2 = game.add.group();
                platforms = game.add.group();
                platforms.enableBody = true;

                var ground = platforms.create(0, game.world.height - 64, 'ground', 3);
                var ceil = platforms.create(0, 0, 'ground');
                ground.scale.setTo(4, 2);
                ceil.scale.setTo(4,2);
 
                ground.body.immovable = true;
                ceil.body.immovable = true;

                //BALAS

                bullets.enableBody = true;
                bullets.physicsBodyType = Phaser.Physics.ARCADE;
                bullets2.enableBody = true;
                bullets2.physicsBodyType = Phaser.Physics.ARCADE;

                for (var i = 0; i<20; i++){
                    var b = bullets.create(0,0, 'bullet');
                    b.name = 'bullet'+i;
                    b.exists = false;
                    b.visible = false;
                    b.checkWorldBounds = true;
                    b.events.onOutOfBounds.add(resetBullet, this);
                    b.scale.setTo(0.04, 0.04);

                    var bul = bullets2.create(0,0, 'bullet');
                    bul.name = 'bullet'+i;
                    bul.exists = false;
                    bul.visible = false;
                    bul.checkWorldBounds = true;
                    bul.events.onOutOfBounds.add(resetBullet2, this);
                    bul.scale.setTo(0.04, 0.04);
                }

                
                //PLAYER

                player = game.add.sprite(32, game.world.height-150, 'dude');
                game.physics.arcade.enable(player);

                player.body.bounce.y = 0.1;
                player.body.gravity.y = 300;
                player.body.collideWorldBounds = true;

                player.animations.add('moveleft', [0, 1, 2, 3], 10, true);
                player.animations.add('moveright', [13, 14, 15, 16], 10, true);
                
                player2 = game.add.sprite(32, game.world.height-150, 'dude');
                game.physics.arcade.enable(player2);

                player2.body.bounce.y = 0.1;
                player2.body.gravity.y = 300;
                player2.body.collideWorldBounds = true;

                player2.animations.add('moveleft', [0, 1, 2, 3], 10, true);
                player2.animations.add('moveright', [13, 14, 15, 16], 10, true);

                long_bullet_instance = bullets.create(player.x, player.y, 'long_bullet');
                long_bullet_instance.exists = false;
                long_bullet_instance.visible = false;
                game.world.sendToBack(long_bullet_instance);
               
                long_bullet_instance2 = bullets2.create(player2.x, player2.y, 'long_bullet');
                long_bullet_instance2.exists = false;
                long_bullet_instance2.visible = false;
                game.world.sendToBack(long_bullet_instance2);
                

                //MOVIMIENTO

                cursors = game.input.keyboard.createCursorKeys();   
                spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                spacebar.onDown.add(fireLongBullet, this);
                game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
                cursors2[0]=game.input.keyboard.addKey(Phaser.Keyboard.A);
                cursors2[1]=game.input.keyboard.addKey(Phaser.Keyboard.D);
                cursors2[3] = game.input.keyboard.addKey(Phaser.Keyboard.W);
                cursors2[3].onDown.add(fireLongBullet2, this);
                game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

                //BOLAS
                
                balls = game.add.group();
                //ball = game.add.sprite(400, 200, 'ball');
                ball = balls.create(400,200, 'ball');
                game.physics.enable(ball, Phaser.Physics.ARCADE);


                //  This gets it moving
                //ball.body.velocity.setTo(200, 200);

                //  This makes the game world bounce-able
                ball.body.collideWorldBounds = true;

                //  This sets the image bounce energy for the horizontal 
                //  and vertical vectors (as an x,y point). "1" is 100% energy return
                ball.body.bounce.setTo(1, 1);
                //balls.createMultiple(250, 'bullets', 0, false);

                ball.scale.setTo(scake, scake);
                //ball.body.collideWorldBounds = true;
                player.body.collideWorldBounds = true;
                player2.body.collideWorldBounds = true
                //ball.body.collide('platforms');
                ball.body.bounce.setTo(1, 1);
                ball.body.velocity.setTo(100, 100);
                ball.body.gravity.setTo(0, gravity);
                ball.size = 4;

                //Score
                scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
                //Lives
                livesText = game.add.text(320, 16, 'Lives: ' + lives, { fontSize: '32px', fill: '#000' });
                
            }

            function dividirBolas(ball){
                    var velox = Math.abs(ball.body.velocity.x);
                    var veloy = Math.abs(ball.body.velocity.y);
                if (ball.size > 1){
                    var newball1 = balls.create(ball.position.x-5,ball.position.y, 'ball'+(ball.size-1));
                    var newball2 = balls.create(ball.position.x+5,ball.position.y, 'ball'+(ball.size-1));
                    game.physics.enable(newball1, Phaser.Physics.ARCADE);
                    game.physics.enable(newball2, Phaser.Physics.ARCADE);
                    newball1.body.collideWorldBounds = true;
                    newball1.body.bounce.setTo(1, 1);
                    newball1.scale.setTo(scake, scake);
                    newball1.body.collideWorldBounds = true;
                    newball1.body.velocity.setTo(20 + velox, veloy/1.25);
                    newball1.body.gravity.setTo(0, gravity);
                    newball2.body.collideWorldBounds = true;
                    newball2.body.bounce.setTo(1, 1);
                    newball2.scale.setTo(scake, scake);
                    newball2.body.collideWorldBounds = true;
                    newball2.body.velocity.setTo(-25 - velox, veloy/1.25);
                    newball2.body.gravity.setTo(0, gravity);
                    newball1.size = ball.size -1;
                    newball2.size = ball.size -1;

                }
                score += 10;
                scoreText.text = 'Score: ' + score;
            }

            function update(){
                //la función de abajo hace que acabe la partida pero no sale bien el texto
                //gameOver();
                var hitPlatform = game.physics.arcade.collide(player, platforms);
                var hitPlatform2 = game.physics.arcade.collide(player2, platforms);
                game.physics.arcade.collide(balls, platforms);
                game.physics.arcade.collide(bullets, platforms, killLongBullet, null, this);
                game.physics.arcade.overlap(balls, bullets, collisionBall, null, this);
                game.physics.arcade.collide(bullets2, platforms, killLongBullet2, null, this);
                game.physics.arcade.overlap(balls, bullets2, collisionBall2, null, this);
                game.physics.arcade.overlap(balls, player, playerDeath);
                game.physics.arcade.overlap(balls, player2, playerDeath2);

                    
                player.body.velocity.x = 0;
                if(cursors.left.isDown){
                    player.body.velocity.x = -150;
                    player.animations.play('moveleft');
                    if(player.position.x == 0 ){
                        player.position.x = game.world.width;
                    }
                }
                else if(cursors.right.isDown){
                    player.body.velocity.x = 150;
                    player.animations.play('moveright');
                    if(player.position.x >= game.world.width-40){
                        player.position.x = 0;
                    }   
                }
                
                else{
                    player.animations.stop();
                    player.frame = 4;
                } 

                player2.body.velocity.x = 0;
                if(cursors2[0].isDown){
                    player2.body.velocity.x = -150;
                    player2.animations.play('moveleft');
                    if(player2.position.x == 0 ){
                        player2.position.x = game.world.width;
                    }
                }
                else if(cursors2[1].isDown){
                    player2.body.velocity.x = 150;
                    player2.animations.play('moveright');
                    if(player2.position.x >= game.world.width-40){
                        player2.position.x = 0;
                    }   
                }
                
                else{
                    player2.animations.stop();
                    player2.frame = 4;
                } 

                
            }

            function fireBullet(){
                    bullet = bullets.getFirstExists(false);
                    if(bullet){
                        bullet.reset(player.x, player.y);
                        bullet.body.velocity.y = -300;
                    }
            }
    
            function resetBullet(bullet){
                bullet.kill();
            }
            function resetBullet2(bullet){
                bullet2.kill();
            }

            function fireLongBullet(){
                if(!firing){
                    firing = true;
                    long_bullet_instance.reset(player.x, player.y);
                    long_bullet_instance.body.velocity.y = -200;
                }
            }
            function fireLongBullet2(){
                if(!firing2){
                    firing2 = true;
                    long_bullet_instance2.reset(player2.x, player2.y);
                    long_bullet_instance2.body.velocity.y = -200;
                }
            }

            function collisionBall(ball1, bullet){
                bullet.kill();
                firing = false;
                dividirBolas(ball1);
                ball1.kill();
            }
            function collisionBall2(ball1, bullet){
                bullet.kill();
                firing2 = false;
                dividirBolas(ball1);
                ball1.kill();
            }

            function killLongBullet(bullet, platform){
                if(platform.y<10){
                    bullet.kill();
                    firing = false;
                }
            }

            function killLongBullet2(bullet, platform){
                if(platform.y<10){
                    bullet.kill();
                    firing2 = false;
                }
            }

            function playerDeath(){
                lives--;
                livesText.text = 'Lives: ' + lives;
                player.kill();
                setTimeout(playerReset, 1000);
            }
            function playerDeath2(){
                lives--;
                livesText.text = 'Lives: ' + lives;
                player2.kill();
                setTimeout(playerReset2, 1000);
            }

            function playerReset(){
                player.reset(0, game.world.height-150);
            }
            function playerReset2(){
                player2.reset(0, game.world.height-150);
            }

            function generateBackground(){
                var background = Math.floor((Math.random() * 10) + 1);
                if (background < 5){
                    sky = game.add.sprite(-180, 0, 'oeste');
                } else {
                    sky = game.add.sprite(-100, 0, 'starvader');
                }
                sky.scale.setTo(0.8, 0.8);
            }

            function showGameOverText(){
                var stateText = game.add.text(50, 50, ' ', {font: '84px Arial', fill: '#F2F2F2'});
                stateText.text = " GAME OVER \n Click to restart";
                stateText.visible = true;
            }

            function gameOver(){
                if (lives <= 0){
                    setTimeout(showGameOverText, 10000);
                    game.world.removeAll();
                    
                }
            }

            
        });

       