package Skjutbana;
import java.io.*;
import sun.audio.*;


public class Ljud {

    
    public void Musik()
        throws Exception
  {
    // open the sound file as a Java input stream
    String gongFile = "/Users/Arvid Persson/Documents/boom-headshot.mp3";
    InputStream in = new FileInputStream(gongFile);
 
    // create an audiostream from the inputstream
    AudioStream audioStream = new AudioStream(in);
 
    // play the audio clip with the audioplayer class
    AudioPlayer.player.start(audioStream);
  }
}






