let serial;                             // variable to hold an instance of the serialport library
let portName = 'COM13';  // fill in your serial port name here
let inData;                             // for incoming serial data
let portSelector;
let buttonData; 
let potentiometerData;
let dataMode;
let sensors;
let pause = true;
let fluidScene = false;
let volume, volumeUp, volumeDown;
let volUp = false;
let volDown = false;
let songVol = 0.6;
let leftHandDetected = false
let rightHandDetected = false
let bothHandDetected = false
let volMode = false

// make a serial port selector object:
function printList(portList) {
  // create a select object:
  portSelector = createSelect();
  portSelector.position(10, 10);
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // add this port name to the select object:
    portSelector.option(portList[i]);
  }
  // set an event listener for when the port is changed:
  portSelector.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = portSelector.value();
  // if there's a port open, close it:
  if (serial.serialport != null) {
    serial.close();
  }
  // open the new port:
  serial.openPort(item);
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  inString = serial.readStringUntil('\r\n');
  console.log(inString)

  if(inString == "Play/Pause"){
    pause = !pause
    // console.log(pause)
  }
  if(inString == "Change Display Scene"){
    fluidScene = !fluidScene
  }
  if(inString == "Next Song"){
    nextSong = !nextSong
  }
  if(inString == "Last Song"){
    lastSong = !lastSong
  }
  if(inString == "Left hand detected"){
    leftHandDetected = true
  }
  if(inString == "Right hand detected"){
    rightHandDetected = true
  }
  if(inString == "Both hand detected"){
    bothHandDetected = true
  }
  if(inString == 'Volume Mode'){
    volMode = true
  }
  
  volume = split(inString, ',');
  // console.log(volume)
  if(volume[0] == 'Volume Up'){
    // volume = split(inString, ',');
    // volumeUp = volume[1];
    volumeUp = map(volume[1],0, 20, 0, 1)
    volUp = true
    console.log(volumeUp)
    songVol = songVol + volumeUp;
    if(songVol > 1){
      songVol = 1
    }
    song[i].setVolume(songVol);
  }
  if(volume[0] == 'Volume Down'){
    volDown = true
    // volumeDown = volume[1];
    volumeDown = map(volume[1], 0, 20, 0, 1)
    songVol = songVol - volumeDown;
    if(songVol < 0.01){
      songVol = 0.01
    }
    song[i].setVolume(songVol);
  }
  // console.log(songVol)
  // }

// ----- using split() function to seperate to data into a array, then use if statement for different condition
//   if (inString.length > 0 ) {
//     sensors = split(inString, ',');    
// // ----- using map function to map out potentiometer from 0 - 255 into my map size, one for horizontal moving and one for vertical moving. 
//      posX = map(sensors[0], 0, 255, 0, windowWidth - 300);
//      posY = map(sensors[1], 0, 255, 0, windowHeight);
// // ----- I noticed that arduino can't not interact with the dom element I created before, so I use photocell and switch to create buttons to bring back the function I offered. 
// // ----- I use the photocell sensor for the fire button. if user tap on it, the value would be mostly under 1 in all situation because I mapped it out. 
// // ----- If I didn't mapped it out here, I notice it will have accident touch, it's hard to set a value for different light situation. But after I mapped it, it works well. 
//     if(sensors[2] <= 1){
//        isFired = true;
//     }else{
//       isFired = false;
//     }
//     if(sensors[3] < 1){
//       isReset = !isReset;
//     }else{
//       isReset = false;
//     }
// // ----- I use a switch here for changing different mode. I put all the mode in an array as default, easy, medium and hard. When user click the button, it will change the mode through the array. 
//     if(sensors[4] > 0){
//       j = (j + 1)% mode.length
//       isMoving = true;

//     }

// }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}