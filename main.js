music="";

function preload(){
    music=loadSound("music.mp3");
}
function setup(){
    video=createCapture(VIDEO);
    video.hide();

    canvas=createCanvas(500,400);
    canvas.position(530,200);
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized!')
}

leftWristY=0;
rightWristY=0;

leftWristX=0;
rightWristX=0;

scoreLeft=0;
scoreRight=0;

function gotPoses(results){
if(results.length>0){
    console.log(results);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX = "+leftWristX+ " leftWristY = "+leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX = "+rightWristX+ " rightWristY = "+rightWristY);

    scoreLeft=results[0].pose.keypoints[9].score;
    scoreRight=results[0].pose.keypoints[10].score;
    console.log("scoreLeft = "+scoreLeft+" scoreRight = "+scoreRight);
}

if(leftWristY>0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    music.setVolume(volume);
}
}

function draw(){
    image(video,0,0,600,500);
    fill("blue");
    noStroke();

    if(scoreRight>0.2){
        circle(rightWristX,rightWristY,20);
     
        if((rightWristY>0) && (rightWristY<=100)){
            music.rate(0.5);
            document.getElementById("speed").innerHTML="Speed = 0.5x";
        }
        if((rightWristY>100) && (rightWristY<=200)){
            music.rate(1);
            document.getElementById("speed").innerHTML="Speed = 1x";
        }
        if((rightWristY>200) && (rightWristY<=300)){
            music.rate(1.5);
            document.getElementById("speed").innerHTML="Speed = 1.5x";
        }
        if((rightWristY>300) && (rightWristY<=400)){
            music.rate(2);
            document.getElementById("speed").innerHTML="Speed = 2x";
        }
        if(rightWristY>400){
            music.rate(2.5);
            document.getElementById("speed").innerHTML="Speed = 2.5x";
        }
    }
}

function play(){
 music.play();
 music.setVolume(1);
 music.rate(1);
}