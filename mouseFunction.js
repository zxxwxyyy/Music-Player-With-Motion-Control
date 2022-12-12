
// ----- set up mouse dragged function. Reference: https://p5js.org/examples/input-mouse-functions.html
function mousePressed(){
    if(overDurationBar){
      overDurationBarPressed = true
    }else{
      overDurationBarPressed = false
    }
    xOff = mouseX - bx
    yOff = mouseY - by
  }
  // ----- user can only drag within x axis since is for controlling volume bar. 
  function mouseDragged(){
    if(overDurationBarPressed){
      bx = mouseX - xOff
      // by = mouseY - yOff
    }
  }
  // ----- when mouse released, return false for the drag function
  function mouseReleased(){
    overDurationBarPressed = false
  }
  
  // ----- mouse click event for all the buttons
  function mouseClicked(){
    if(playButton.contains(mouseX, mouseY)){
    if(song[i].isPlaying()){
      pause = true 
     }else{
      pause = false  }
  }
  if(nextSongButton.contains(mouseX, mouseY)){
    nextSong = true
  }else{
    nextSong = false
  }
  
  if(lastSongButton.contains(mouseX,mouseY)){
    lastSong = true
  }
  else{
    lastSong = false
  }
  if(-60 < (mouseX - windowWidth/2) && (mouseX - windowWidth/2) < 60 &&  -60 < (mouseY - windowHeight/2) && (mouseY - windowHeight/2) < 60){
    fluidScene = !fluidScene
  }
  }
  // ----- looping music array. if one song end jump to the next song. if reach to the last song, the next song will be the first song. 
  function playMusic(){
    song[i].loop()
    song[i].setVolume(songVol)
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  