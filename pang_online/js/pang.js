$(document).ready(function(){
            var game = new Phaser.Game(600, 600, Phaser.AUTO, 'prueba', { preload: preload, create: create, update: update });
            var platforms;
            var player;
            function preload(){
            game.load.image('sky', 'assets/sky.png');
            game.load.image('ground', 'assets/platform.png');
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            }

            function create(){
                game.physics.startSystem(Phaser.Physics.ARCADE);
                sky = game.add.sprite(0, 0, 'sky');
                sky.scale.setTo(2, 2);
                platforms = game.add.group();
                platforms.enableBody = true;

                var ground = platforms.create(0, game.world.height - 64, 'ground');
                ground.scale.setTo(4, 2);

                ground.body.immovable = true;

                
                //PLAYER

                player = game.add.sprite(32, game.world.height-150, 'dude');
                game.physics.arcade.enable(player);

                player.body.bounce.y = 0.1;
                player.body.gravity.y = 300;
                player.body.collideWorldBounds = true;

                player.animations.add('left', [0, 1, 2, 3], 10, true);
                player.animations.add('right', [5, 6,7, 8], 10, true);

                //MOVIMIENTO

                cursors = game.input.keyboard.createCursorKeys();

                
                
            }

            function update(){
                var hitPlatform = game.physics.arcade.collide(player, platforms);


                player.body.velocity.x = 0;
                if(cursors.left.isDown){
                    player.body.velocity.x = -150;
                    player.animations.play('left');
                    if(player.position.x == 0 ){
                        player.position.x = game.world.width;
                    }
                }
                else if(cursors.right.isDown){
                    player.body.velocity.x = 150;
                    player.animations.play('right');
                    if(player.position.x >= game.world.width-40){
                        player.position.x = 0;
                    }   
                }
                
                else{
                    player.animations.stop();
                    player.frame = 4;
                }                

                if(cursors.up.isDown && player.body.touching.down && hitPlatform){
                    player.body.velocity.y = -450;
                }
            }

            function collectStar(player, star){
                star.kill();
            }

        });