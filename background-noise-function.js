function drawInnerNoiseRM(){
    // ----- I play around with the waveform & volume with map function, and create noise effect around. The noise is based on the volume.  
  // ----- reference: https://www.youtube.com/watch?v=uk96O7N1Yo0&t=440s&ab_channel=ColorfulCoding
  
    beginShape();
    for (let i = 0; i < songWaveform.length; i++) {
      // rotate(TWO_PI/float(5)); 
    // ----- using volume to control opacity
      let q =  map(vol, 0, 50, 0, 100)
      stroke(255, 60+q)
      strokeWeight(.2)
      // console.log(songWaveform[i]*80)
      let r = map(songWaveform[i]*80, 0, 256, 40 ,400)
      let angle = map(i, 0, songWaveform.length, 0, 360)
      let x = r * cos(angle) * 3
      let y = r * sin(angle) * 3
  
      vertex(x, y);
  
    }
    endShape();
  }
  
  function drawOuterNoiseRM(){
  // let songWaveform = fft.waveform();
  // let vol = abs(fft.waveform()[1] * 80)
  push()
  for(let t = -1; t <=1; t +=2){
    beginShape();
  for(let i = 0; i <= 180; i++){
    let index = floor(map(i, 0, 180, 0, songWaveform.length - 1))
    let r = map(songWaveform[index] * 10, -1, 1, 300, 500)
  
    let x = r * sin(i) * t
    let y = r * cos(i)
    stroke(60 + songWaveform[index] * 10)
    vertex(x,y)
  
  }
  endShape()
  
  }
  pop()
  }
  
  function drawDiscoCircleRM(){
    // ----- map out the volume so that different circles have different effect
    let OuterCircleVol = map(vol, 0, 30, 0, 80);
    let InnerCircleVol = map(vol, 0, 30, 0, 10)
    // console.log(OuterCircleVol)
  
  // ----- here I want some circles to visualize volumn, I use noise to get smooth value, then map then out because I want circles to have different effect. 
  push()
  strokeWeight(.1)
  stroke(130 + vol)
  // angleMode(DEGREES)
  for(let i = 0; i < 360; i += 0.1){
  // ----- play around with different numbers with some math function. 
  // ----- create a variable cirVar to let the circle change every loop
  // ----- use noise() to get more smooth value than random()
    let n = noise(cos(i) + cirVar, sin(i) + cirVar)
    let h = map(n, 0, 1, -150, 150)
    let l = map(n, 0, 1, -800, 800)
    let w = map(n, 0, 1, -500, 500)
  
    rotate(0.1)
    // ----- inner circle 
    ellipse(windowWidth / 10, 0, abs(InnerCircleVol/w) * 2)
    ellipse(windowWidth / 9.6, 0, abs(InnerCircleVol/w) * 3)
    ellipse(windowWidth / 15, 0, abs(InnerCircleVol/h) * 1)
  
    // ----- outer circle, more obivous effect
    ellipse(windowWidth / 5, 0, abs(OuterCircleVol/l) * 2,abs(OuterCircleVol/l) * 4)
    // ellipse(windowWidth / 3.9, 0, abs(OuterCircleVol/l) * 6 )
  
  }
  pop()
  cirVar += 0.01 + vol/6666
  }
  
  function drawBlowCirRM(){
    // ----- center tiny circle, it will blow base on the music wave. 
  // ----- reference: https://openprocessing.org/sketch/1127622
  push()
  // angleMode(RADIANS)
  for (let g = 0; g < 8; g++) {
    rotate(noise(sin(vol)) * g); 
    strokeWeight(1)
    xCir += vol/1000;
    yCir += vol/1000;
    limit = cos(frameCount *.005) * TWO_PI/5 ;
    // console.log(xIncr)
      xPos = map(noise(xCir), 0, 100, 0, 800);
      yPos = map(noise(yCir), 0, 100, 0, 800);
  
    // ----- strokes of the shape also interact with the volumn. 
    stroke(255, map(vol, 0, 100, 0, 255) + 100);
  
    // ----- creating shapes in different t conditions so that they blow in different time base on the volumn.
    for (let t = 0; t < 15; t++) {
      ang =  t * limit;
      x = (t * vol /3) * sin(ang);
      y = (t * vol/ 3) * cos(ang);
      if(t == 5){
        ellipse(x/vol, y/t, 3);
        rect(-x*vol, -y/2, 2);
      }
      if (t == 10) {
        ellipse(x * vol/2, y * 4, 3);
        ellipse(-x * vol/4, -y * 3, 2);
        rect(x * vol/6, -y * 2, vol/4);
  
  
      }
      if(t == 3){
        ellipse(-x* 5, -y*vol, vol/2+1);
        rect(-x*5, -y * vol, 1);
      }
    } 
  
    }
    pop()
  }
  
  
  // ----- Another scene, with angleMode(Degrees)
  function drawSpotlightDM(){
    // ----- create a spotlight effect in the middle that base on the wave form
    // ----- reference: https://www.youtube.com/watch?v=uk96O7N1Yo0&t=440s&ab_channel=ColorfulCoding
    push()
  // console.log(wave)
  for(let t = -1; t <=1; t +=2){
    beginShape();
  for(let i = 0; i <= 180; i++){
    let index = floor(map(i, 0, 180, 0, songWaveform.length - 1))
    let r = map(songWaveform[index], -1, 1, -50, 50)
    let x = r * sin(i + frameCount*20) * t
    let y = r * cos(i + frameCount*10)
    stroke(255, 60 + songWaveform[index] * 10)
    rotate(r * sin(frameCount) ) 
    vertex(x,y)
    vertex(x*2,y*2)
    vertex(x*4,y*4)
  }
  endShape()
  }
  pop()
  }
  
  function drawDiscoCircleDM(){
  // ----- map out volume so that circles have different effect
    let OuterCircleVol = map(vol, 0, 20, 0, 40);
    let InnerCircleVol = map(vol, 0, 500, 0, 80)
    // console.log(vol)
  
  // ----- here I want some circles to visualize volumn, I use noise to get smooth value, then map then out because I want circles to have different effect. 
  push()
  for(let i = 0; i < 360; i += 0.1){
  
    let n = noise(cos(i) + cirVar, sin(i) + cirVar)
    let h = map(n, 0, 1, -150, 150)
    let l = map(n, 0, 1, -500, 500)
    let w = map(n, 0, 1, -300, 300)
  
    rotate(0.1)
    ellipse(windowWidth / 8, 0, abs(InnerCircleVol/w)/4, InnerCircleVol /4)
    ellipse(windowWidth / 5, 0, abs(OuterCircleVol/l) * 2 )
  
  }
  pop()
  cirVar += 0.01
  }
  
  function drawWaveBackgroundDM(){
  // ----- create a wave background by playing with numbers
  // ----- reference: https://www.youtube.com/watch?v=ktPnruyC6cc&t=200s&ab_channel=ColorfulCoding
  for(let j = 0; j < 100; j++){
    push()
    strokeWeight(0.1)
    stroke(255, 70 + 2 * vol)
    rotate(sin(frameCount + j * 2) * 50)
    rect(0, 0, 600 - j * 3, 20  - j * 3, 200 - j)
    rect(-windowWidth/6, -windowHeight/3, 600 - j * 3, 1000 - j * 3, 200 - j, )
    pop()
  }
  }