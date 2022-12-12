// ----- Creative Coding Final Project
// ----- Liqian Zhang
// ----- Creating a music player with song visualization. For accessbility, with arduino ultrasonic sensor, user can use motion to control the player. 
// ----- Motion control Reference: https://www.electronicshub.org/arduino-based-hand-gesture-control-computer/
// ----- songs from: https://pixabay.com/music/search/genre/techno%20&%20trance/
let cirVar = 0;
let xCir = 3;
let yCir = 6;
let ang, x, y, limit, xPos, yPos;
var frame_number = 0;
let song = []
let i = 0;
let songWaveform, vol, soundloop;
let degreeMode = false;
let nextSong = false;
let lastSong = false;
// ----- put all songs name in an array for displaying
let songNames = ['Zen Man - Melodic Techno #03', 'Zen Man - Background Loop Melodic Techno #03', 'AlexiAction - Phonk Bass Boost', 'ComaStudio - Action Techno Beat']
let play = false
let playButton, nextSongButton, lastSongButton, openingPrompt; 
let overDurationBar = false;
let overDurationBarPressed = false;
let bx 
let by 
let xOff = 0
let yOff = 0
let songVolVisual

// ----- preload all songs to an array.
function preload(){
  for(let i = 0; i < 4; i++){
  song[i] = loadSound("song" + String(i) + ".mp3")
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  // rectMode((CENTER))
  frameRate(60)
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.openPort(portName);              // open a serial port

  // ----- I was going to do an interactive object that interact with the environment sound, as I play through, I changed my mind to developed an interactive music player. 
  // ----- using fft to analyze the frequency of sound
  // ----- reference: https://p5js.org/reference/#/p5.FFT
  fft = new p5.FFT();
  song[i].pause()
  song[i].setVolume(songVol)

  let value = song[i].currentTime()
  let songDuration = song[i].duration()

  // ----- prompt to remind user click to play the music. 
  openingPrompt = createP('Click ▶ To Play')
  openingPrompt.style('font-size', '40px')
  openingPrompt.position(windowWidth - 500, windowHeight - 130)
  openingPrompt.style('color', 'white')

  // ----- create variable bx and by to store beginning position of volume bar. 
  bx = -windowWidth/2 + 305
  by = windowHeight/2 - 70
}

function draw() {
  // ----- draw background
  background(0);
  translate(windowWidth/2, windowHeight/2)
  stroke(255);
  noFill();
  push()
  fill(100)
// ----- display song's name
  textSize(22)
  text(songNames[i], -windowWidth/2 + 100, windowHeight/2 - 118)
  pop()
  // ----- getting waveform data for different scene's noise use
  songWaveform = fft.waveform();
  vol = abs(fft.waveform()[1] * 80)

  changeScene();
  drawingUIs();
  playOrPauseSong();
  preOrNextSong();

  push()
  stroke(180)
  strokeWeight(1.5)

  // ellipse(-width/8 - 650, -height/8 - 430, abs(sin(frameCount)) * 60)

  // ellipse(width/8 + 650, height/8 + 380, abs(sin(frameCount * 3)) * 60)
  pop()

  if(leftHandDetected){
  push()
  stroke(180)
  strokeWeight(1.5)
  ellipse(-width/8 - 650, -height/8 - 430, abs(sin(frameCount * 3)) * 60)
  pop()

  // ----- use setTimeout function to delay the status so that the dected animation can last after user finish the motion
  // ----- reference: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
  setTimeout(() => {
    leftHandDetected = false
  }, 1500)
  }
  if(rightHandDetected){
    push()
    stroke(180)
    strokeWeight(1.5)
    ellipse(width/8 + 650, -height/8 - 430, abs(sin(frameCount * 3)) * 60)
    pop()
    setTimeout(() => {
      rightHandDetected = false
    }, 1500)
  }
  if(bothHandDetected){
    push()
    stroke(180)
    strokeWeight(1.5)
    ellipse(-width/8 - 650, -height/8 - 430, abs(sin(frameCount)) * 60)
    ellipse(width/8 + 650, -height/8 - 430, abs(sin(frameCount)) * 60)
    pop()
    setTimeout(() => {
      bothHandDetected = false
    }, 1500)
  }
  if(volMode){
    push()
    stroke(180)
    strokeWeight(1.5)
    ellipse(width/8 + 650, height/8 + 380, abs(sin(frameCount * 3)) * 60)
    pop()
    setTimeout(() => {
      volMode = false
    }, 1500)
  }
}


function preOrNextSong(){
  // ----- if user click next song button, stop current song and play next song; return next song to false
  // ----- no matter the song is playing or not, user can go to previous and next song. 
  if(nextSong){
    if(song[i].isPlaying()){
    song[i].stop()
    i = (i+1)%song.length
    song[i].play()
    song[i].setVolume(songVol)
    nextSong = false
  }else{
    i = (i+1)%song.length
    song[i].play()
    song[i].setVolume(songVol)
    nextSong = false
  }
  }
// console.log(song.length)
// ----- function for the last song
  if(lastSong){
    if(song[i].isPlaying()){
    song[i].stop()
    if(i > 0){
    i = i - 1
    song[i].play()
    song[i].setVolume(songVol)
    lastSong = false
  }
  // ----- if user wants to go to the last song when playing first song in the array, return to the last song of the array
  else if(i == 0){
    i = song.length - 1
    song[i].play()
    song[i].setVolume(songVol)
    lastSong = false
  }
  }else{
    if(i > 0){
      i = i - 1
      song[i].play()
      song[i].setVolume(songVol)
      lastSong = false
    }
    else if(i == 0){
      i = song.length - 1
      song[i].play()
      song[i].setVolume(songVol)
      lastSong = false
    }
  }
  }
}

function playOrPauseSong(){
  // ----- using boolean to control pause or play. If song is playing, display pause icon; else display play icon
  if(pause){
    if(song[i].isPlaying()){
      song[i].pause()
    }
    push()
    fill(30)
    playButton = new TriangleButton(-windowWidth/2 + 177, windowHeight/2 - 58, -windowWidth/2 + 177, windowHeight/2 - 82,  -windowWidth/2 + 197, windowHeight/2 - 70)
    if(playButton.contains(mouseX, mouseY) && pause){
      fill(255)
    }
    playButton.display()
    pop()
  }else{
    if(!song[i].isPlaying()){
      song[i].play()
    }
    openingPrompt.hide()
    // ----- drawing pause icon for user to visualize
    push()
    strokeWeight(5)
    stroke(30)
    if(playButton.contains(mouseX, mouseY) && !pause){
    stroke(255)
    }
    line(-windowWidth/2 + 178, windowHeight/2 - 60, -windowWidth/2 + 178, windowHeight/2 - 80)
    line(-windowWidth/2 + 192, windowHeight/2 - 60, -windowWidth/2 + 192, windowHeight/2 - 80)
    pop()
  }
  
}

function drawingUIs(){
  // ----- creating a track to display current play song's status
  push()
  fill(20)
  stroke(0)
  // console.log(rectOpoint)
  let value = map(song[i].currentTime(), 0, song[i].duration(), 0, 300)
  // console.log(value)
  rect(-windowWidth/2 + 100, windowHeight/2 - 100, 300, 10)
  fill(150)
  rect(-windowWidth/2 + 100, windowHeight/2 - 100, 0 + value, 10)
  pop()

// ----- drawing volume control bar for user to visual
// ----- the volume control bar is draggable for user to control the volume.
push()
fill(20)
stroke(0)
rectMode(CENTER)
// ----- volume bar background rectangle
rect(-windowWidth/2 + 355, windowHeight/2 - 70, 100, 10, 10)
fill(100)

pop()

push()
fill(100)
songVolVisual = map(songVol, 0, 1, 0, 100)
// ----- if mouse hovered the volume bar, fill white color
if(overDurationBar){
  fill(255)
}
// ----- create variable volControlButton to store the position of the bar while user dragged
let volControlButton = bx + songVolVisual
// ----- set range for the volume bar move 
if(volControlButton < -windowWidth/2 + 305){
  volControlButton = -windowWidth/2 + 305
}
if(volControlButton > -windowWidth/2 + 395){
  volControlButton = -windowWidth/2 + 395
}
// console.log(-windowWidth/2 + 300)
// ----- create volume bar button
let volControl = new CirButton(volControlButton, by, 15)
// ----- mapped the bar movement and transfer to volume range, which is between 0 - 1
let vol1 = map(volControlButton, -windowWidth/2 + 305, -windowWidth/2 + 395, 0, 1)
song[i].setVolume(vol1)
// ----- map out volume after change and use a rectangle to visualize. 
songVolVisual = map(vol1, 0, 1, 0, 100)
rect(-windowWidth/2 + 300, windowHeight/2 - 75, 0 + songVolVisual, 10, 10)
volControl.display()
pop()

if (volControl.contains(mouseX, mouseY)){
overDurationBar = true
}else{
overDurationBar = false
}

  // ----- using class draw next & previous song's icon
  push()
  fill(30)
  nextSongButton = new TriangleButton(-windowWidth/2 + 235, windowHeight/2 - 60, -windowWidth/2 + 235, windowHeight/2 - 80,  -windowWidth/2 + 255, windowHeight/2 - 70)
  lastSongButton = new TriangleButton( -windowWidth/2 + 135, windowHeight/2 - 60, -windowWidth/2 + 135, windowHeight/2 - 80,  -windowWidth/2 + 115, windowHeight/2 - 70)
  // ----- hovered effect for last song & next song button
  push()
  // ----- hovered effect for previous & next song effect
  if(nextSongButton.contains(mouseX,mouseY)){
    fill(255)
  }
  nextSongButton.display()
  pop()
  push()
  if(lastSongButton.contains(mouseX, mouseY)){
    fill(255)
  }
  lastSongButton.display()
  pop()
  pop()
    
  // ----- hovered effect for last song & next song button's line
  push()
  strokeWeight(5)
  stroke(30)
  push()
  if(nextSongButton.contains(mouseX,mouseY)){
    stroke(255)
  }
  line(-windowWidth/2 + 265, windowHeight/2 - 62, -windowWidth/2 + 265, windowHeight/2 - 78)
  pop()
  push()
  if(lastSongButton.contains(mouseX,mouseY)){
    stroke(255)
  }
  line(-windowWidth/2 + 105, windowHeight/2 - 62, -windowWidth/2 + 105, windowHeight/2 - 78)
  pop()
  pop()
}

function changeScene(){
  // ----- creating 2 scenes fir user to change
  if(fluidScene){
    angleMode(DEGREES)
    drawDiscoCircleDM();
    drawSpotlightDM();
    drawWaveBackgroundDM();
  }else{
    angleMode(RADIANS)
    drawInnerNoiseRM();
    drawOuterNoiseRM();
    drawDiscoCircleRM();
    drawBlowCirRM();
  }


}


