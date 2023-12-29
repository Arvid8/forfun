public class GlassFilter implements ImageFilter {

    public String getMenuName() {return "Glass";}

    public void apply(int[][][] src, int[][][] dest) {
        for (int x=0; x< src.length; x++)
            for (int y=0; y<src[0].length; y++) {
                int xn = disturb(x,5,src.length-1);
                int yn = disturb(y,5,src[0].length-1);
                for (int c=0; c<3; c++) 
                    dest[x][y][c] = src[xn][yn][c];
            }
    }

    private static int disturb(int x, int d, int max) {
        int nx = x + (int)(d*Math.random());
        return Math.max(0,Math.min(nx,max));
    }
}