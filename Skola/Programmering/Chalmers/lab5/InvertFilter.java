public class InvertFilter implements ImageFilter {

    public String getMenuName() {return "Invert";}

    public void apply(int[][][] src, int[][][] dest) {
	for (int x=0; x< src.length; x++)
	    for (int y=0; y<src[0].length; y++) {
		dest[x][y][0] = 255-src[x][y][0];
		dest[x][y][1] = 255-src[x][y][1];
		dest[x][y][2] = 255-src[x][y][2];
	    }
    }
}