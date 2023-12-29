public class SquareFilter implements ScalableFilter {

    public String getMenuName() {return "Square";}

    public void apply(int[][][] src, int[][][] dest, double scale) {
	final double TWO_PI = 2 * Math.PI;
        final double width = src.length;
        final double height = src[0].length;
	for (int x=0; x<src.length; x++) {
            double xr = x/width;
	    for (int y=0; y<src[0].length; y++) {
                double yr = y/height;
                int xd = (int)((xr + scale * Math.sin(xr * TWO_PI) / TWO_PI) * width);
                int yd = (int)((yr + scale * Math.sin(yr * TWO_PI) / TWO_PI) * height);
                dest[x][y][0]= src[xd][yd][0];
                dest[x][y][1]= src[xd][yd][1];
                dest[x][y][2]= src[xd][yd][2];
	    }
        }
    }
}
