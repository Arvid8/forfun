public class FlipVFilter implements ImageFilter {

    public String getMenuName() {return "Flip Vertical";}

    public void apply(int[][][] src, int[][][] dest) {
	for (int y=0; y< src[0].length; y++) {
            int y1 = src[0].length-1-y;
	    for (int x=0; x<src.length; x++) {
		dest[x][y][0] = src[x][y1][0];
		dest[x][y][1] = src[x][y1][1];
		dest[x][y][2] = src[x][y1][2];
	    }
        }
    }
}