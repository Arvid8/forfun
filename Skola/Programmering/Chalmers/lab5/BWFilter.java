public class BWFilter implements ImageFilter {

    public String getMenuName() {return "Black and White";}

    public void apply(int[][][] src, int[][][] dest) {
	for (int x=0; x< src.length; x++)
	    for (int y=0; y<src[0].length; y++) {
		int r = src[x][y][0];
		int g = src[x][y][1];
		int b = src[x][y][2];
		int lum = (int)Math.round(0.2*r + 0.7*g + 0.1*b);
		dest[x][y][0] = lum;
		dest[x][y][1] = lum;
		dest[x][y][2] = lum;
	    }
    }
}