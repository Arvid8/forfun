import java.awt.image.BufferedImage;
import java.awt.Color;

public class Conversions {

    public static void image2Matrix(BufferedImage src, int[][][] dest) {
	for (int x=0; x< src.getWidth(); x++)
	    for (int y=0; y<src.getHeight(); y++) {
		Color rgb = new Color(src.getRGB(x,y));
		dest[x][y][0] = rgb.getRed();
		dest[x][y][1] = rgb.getGreen();
		dest[x][y][2] = rgb.getBlue();
	    }
    }

    public static void matrix2Image(int[][][] src, BufferedImage dest) {
	for (int x=0; x< dest.getWidth(); x++)
	    for (int y=0; y<dest.getHeight(); y++) {
		dest.setRGB(x,y,new Color(src[x][y][0],src[x][y][1],src[x][y][2]).getRGB());
	    }
    }

}
