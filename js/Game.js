class Game {

    constructor(){}

    getState() {

        var gameStateRef=database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState=data.val();
            console.log(gameState);
        })

    }

    update(state){

        database.ref('/').update({
            gameState:state
        })

    }

    async start(){

        if(gameState===0){

            player=new Player();
            var playerCountRef= await database.ref('playerCount').once("value");

            if(playerCountRef.exists()){

                playerCount=playerCountRef.val();
                player.getCount();
            }

            form=new Form();
            form.display();

        }

        car1=createSprite(100,200)
        car2=createSprite(300,200)
        car3=createSprite(500,200)
        car4=createSprite(700,200)

        cars=[car1,car2,car3,car4];

        car1.addImage("car1",car1_img);
        car2.addImage("car2",car2_img);
        car3.addImage("car3",car3_img);
        car4.addImage("car4",car4_img);
        

    }

    play( ){

        form.hide();
        
        Player.getPlayerInfo();
       
        if(allPlayers!==undefined){

            var index=0,x=0,y;

            background("#666666");

            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
            
            if(index<4){
            for(var plr in allPlayers){

                x=x+250;
                y=displayHeight-allPlayers[plr].distance+50;
                console.log(plr);

                cars[index].x=x;
                cars[index].y=y;
 
                if(index+1===player.index){
                    cars[index].shapeColor="red"; 
                    stroke(10);
                    fill("red");
                    ellipse(x,y,60)
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index].y;
                }  
                index++

            }
            
            }

        }

        if(keyIsDown(UP_ARROW)&& player.index!==null){

            player.distance+=10;
            player.update();
        }

        drawSprites();

        



    }

}

