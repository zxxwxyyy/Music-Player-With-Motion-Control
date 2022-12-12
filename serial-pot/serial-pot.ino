// ----- for left sensor input
const int TriggerPin = 9;
const int EchoPin = 10; 
// ----- for right sensor input
const int TriggerPin1 = 12;
const int EchoPin1 = 11;
// ----- for volume sensor
const int TriggerPin2 = 6;
const int EchoPin2 = 5;
int Distance;
int Distance1;
int distL;
int distR;
int distVol, distVol1;

long Duration = 0;
long Duration1 = 0;

void setup() {
  // put your setup code here, to run once:
pinMode(TriggerPin, OUTPUT);
pinMode(EchoPin, INPUT);
pinMode(TriggerPin1, OUTPUT);
pinMode(EchoPin1, INPUT);
pinMode(TriggerPin2, OUTPUT);
pinMode(EchoPin2, INPUT);
Serial.begin(9600);
}

void loop() {
  // ----- get distance by function, store either hands data in variables. 
  getDistance(TriggerPin, EchoPin);
  distL = Distance;
  getDistance(TriggerPin1, EchoPin1);
  distR = Distance;
  getDistance(TriggerPin2, EchoPin2);
  distVol = Distance;

  Serial.print("DistL= ");
  Serial.println(distL);

  Serial.print("DistR= ");
  Serial.println(distR);

  Serial.print("DistVol= ");
  Serial.println(distVol);

  // ----- Hold both hands in front of the sensor for 1 seconds to change display scene 
  // ----- When both hands dected is print, user hold hands for another seconds to play/pause the song.
  if(distL < 30 && distR < 30){
  // delay(1500);

  Serial.println("Both hand detected");
// ----- after detected, delay another seconds to dect further movement
  delay(1000);
//----- get the distance again to check if user is still holding hands
  getDistance(TriggerPin, EchoPin);
  distL = Distance;
  getDistance(TriggerPin1, EchoPin1);
  distR = Distance;
// ----- if user still holding hands, tell p5 to change the current display scene. 
    if(distL < 30 && distR < 30){
    Serial.println("Change Display Scene");
    delay(1000);

    }
  }
  // delay(500);

// ----- left hand interaction
// ----- if detect user left hand in range, print left hand detected
  else if(distL < 30){
  // delay(1500); 
  Serial.println("Left hand detected");
// ----- after detected, delay another seconds to dect further movement
  delay(1000);
// ----- get both hands data and store them for further use
  getDistance(TriggerPin, EchoPin);
  distL = Distance;

// ----- detect if user is holding hands, if yes, print out play or pause for p5
// ----- here I put distL > 30, it's the best distance I found through my user testing.
  if(distL < 30){
  Serial.println("Play/Pause");
  delay(1000);
  }

 getDistance(TriggerPin1, EchoPin1);
  distR = Distance;
// ----- for next song, the idea is just as common sense, slide from left to right. After detect left hand, user will swipe left hands to the right sensor, and it will return next song to p5. 
  if(distR < 30){
  Serial.println("Next Song");  
  delay(1000);

  }
  }

// ----- right hand interaction
// ----- if detect user right hand in range, print right hand detected
  else if(distR < 30){
  // delay(1500);
  Serial.println("Right hand detected");
// ----- after detected, delay another seconds to dect further movement
  delay(1000); 
// ----- get both hands data and store them for further use

  getDistance(TriggerPin1, EchoPin1);
  distR = Distance;
// ----- detect if user is holding hands, if yes, print out play or pause for p5
  if(distR < 30){
  Serial.println("Play/Pause");
  delay(1000);

  }

  // ----- for previous song, the idea is just as common sense, slide back from right to left. After detect right hand, user will swipe right hands to the left sensor, and it will return last song to p5. 
  getDistance(TriggerPin, EchoPin);
  distL = Distance;

  if(distL< 30){
  Serial.println("Last Song");
  delay(1000);
  }
}

// ----- sensor for volume mode, volume goes up / down based on distance user hand move
// ----- 20 is good number to prevent interrupt from top right sensor
  else if(distVol < 20){
  // delay(1500);
  Serial.println("Volume Mode");
  delay(1000);

  getDistance(TriggerPin2, EchoPin2);
  distVol1 = Distance;

// ----- if user's hand move down, meaning volume goes down
  if(distVol > distVol1){
    Serial.print("Volume Down");
    Serial.print(",");
    Serial.println(distVol - distVol1);
  }
  // ----- if user's hand move up, meaning volume goes up
  else if(distVol < distVol1){
    Serial.print("Volume Up");
    Serial.print(",");
    Serial.println(distVol1 - distVol);
  }
  delay(1000);

}

// ----- delay 1 secs after every loop
  delay(1000);
}

// ----- function for getting the data from ultrasonic sensor
void getDistance(int Trigger, int Echo){

  // put your main code here, to run repeatedly:
  digitalWrite(Trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trigger, LOW);

  Duration = pulseIn(Echo, HIGH);
  Distance = Duration * 0.034 / 2;
  
  // ----- set the maximum range to 50 to prevent unintended activation, also it helps to get proper read. 
  if (Distance > 50){
    Distance = 50;
  };
  if(Distance > 1000){
    Distance = 0;
  };
}
