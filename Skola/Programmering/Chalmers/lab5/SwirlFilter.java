public class SwirlFilter implements ScalableFilter {

    public String getMenuName() {return "Swirl";}

    public void apply(int[][][] src, int[][][] dest, double scale) {
        final double width = src.length;
        final double height = src[0].length;
	for (int x=0; x<src.length; x++) {
            double xr = x/width-0.5;
	    for (int y=0; y<src[0].length; y++) {
                double yr = y/height-0.5;
                double r = Math.sqrt(xr*xr + yr*yr);
                double theta = Math.atan2(yr,xr);
                double theta1 = 50*scale*r*(0.5-r) + theta;
                int xs = (int)((0.5 + (r<0.5 ? r * Math.cos(theta1) : xr)) * width);
                int ys = (int)((0.5 + (r<0.5 ? r * Math.sin(theta1) : yr)) * height);
                dest[x][y][0]= src[xs][ys][0];
                dest[x][y][1]= src[xs][ys][1];
                dest[x][y][2]= src[xs][ys][2];
	    }
        }
    }
}
