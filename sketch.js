var ball;
var database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();

    var ballnode = database.ref("ball/position");
    ballnode.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        rightPosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        rightPosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        rightPosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        rightPosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function rightPosition(x,y){
    database.ref("ball/position").set({
        'x': position.x + x,
        'y': position.y + y
    })
}

function readPosition(data){
     position = data.val();
     ball.x = position.x;
     ball.y = position.y;
}

function showError(){
    console.log("Error");
}