public class FlipHFilter implements ImageFilter {

    public String getMenuName() {return "Flip Horizontal";}

    public void apply(int[][][] src, int[][][] dest) {
	for (int x=0; x< src.length; x++) {
            int x1 = src.length-1-x;
	    for (int y=0; y<src[0].length; y++) {
		dest[x][y][0] = src[x1][y][0];
		dest[x][y][1] = src[x1][y][1];
		dest[x][y][2] = src[x1][y][2];
	    }
        }
    }
}