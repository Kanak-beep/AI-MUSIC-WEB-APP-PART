onMyWaySong = "";
gratefulSong = "";
leftWristX = 0;
leftWristY = 0;
RightWristX = 0;
RightWristY = 0;

function preload(){
    AloneSong = loadSound("Alan Walker - Alone.mp3")
    FadedSong = loadSound("Alan Walker - Faded.mp3")
}

function setup(){
    canvas = createCanvas(600,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}



function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        // console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        // console.log("LeftWristX : "+leftWristX+" LeftWristY : "+leftWristY+" RightWristX : "+rightWristX+" RightWristY : "+rightWristY)
    }
}

function draw(){
    image(video, 0, 0, 600, 450);
	
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song2.stop();

		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song-piano"
		}
	}
	if(scoreLeftWrist > 0.2)
	{ 
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song1_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}
	
}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}