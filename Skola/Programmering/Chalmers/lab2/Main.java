import java.io.File;

public class Main {
    
    public static void main(String[] args) {
        SoundDevice device = new SoundDevice();
        Song song = new Song(6);
     song.add(MusicUtils.note(-9,0.4));
song.add(MusicUtils.note(-9,0.4));
song.add(MusicUtils.note(-9,0.4));
song.add(MusicUtils.note(-5,0.4));
song.add(MusicUtils.note(-7,0.4));
song.add(MusicUtils.note(-7,0.4));
song.add(MusicUtils.note(-7,0.4));
song.add(MusicUtils.note(-4,0.4));
song.add(MusicUtils.note(-5,0.4));
song.add(MusicUtils.note(-5,0.4));
song.add(MusicUtils.note(-7,0.4));
song.add(MusicUtils.note(-7,0.4));
song.add(MusicUtils.note(-9,1));
        song.play(device);
        song.save(device.getFormat(),new File("twotones.wav"));
        System.exit(0);
    }
}