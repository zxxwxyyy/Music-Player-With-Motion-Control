# The Music Player
The Music Player is an innovative project that offers users an interactive and visually engaging music player. It features a unique sound visual effect in the middle of the screen, which reacts dynamically to the audio being played.

[Demo](https://zxxwxyyy.github.io/Music-Player-With-Motion-Control/)

### Click to see the demo video:

[![Demo video](https://img.youtube.com/vi/REj6sknVT5g/0.jpg)](https://www.youtube.com/watch?v=REj6sknVT5g)

## Features
- Interactive music player
- Dynamic sound visual effects
- Built-in control buttons (play/pause, song switch, volume adjustment)
- Motion control options for increased accessibility
- Two unique visualization scenes

## Inspiration
The initial idea was to create an interactive p5 sketch, which will interact with sounds and the user's motion. The inspiration came from Instagram, which led to the creation of a music player with p5 3D objects and animations that play based on the music rhythm, displayed in a cold colorway.

## Development Process
1. Created a wave effect for the fluid scene.
2. Added the ability to preload songs and visualize them using p5.FFT.
3. Created a spotlight effect in the middle based on the waveform.
4. Developed a second scene with a sense of depth and a different feel.
5. Set up ultrasonic sensors for motion control.
6. Motion Control Logic
7. Hold either hand in front of the sensor to play/pause the song. (Accessible for both left-handed and right-handed.)
8. Hold both hands in front of both sensors for 1 second to change the scene.
9. Slide from left to right for the next song, and from right to left for the previous song.
10. Move hand up and down for volume control.

## User Testing Feedback
The user-testing phase highlighted the need for feedback when the hand is detected and when the user should move. It also revealed that without a physical button, the system is not as convenient.

## Changes Made Post-Feedback
- Added play&pause, previous&next song, and volume bar.
- Implemented a feature to display the name of the song that is currently playing.
- Integrated mouseDragged function for the volume bar.
- Created a circular animation when Arduino sends back "hand detected".

## Timeline
This project was completed in a span of 2 weeks.
