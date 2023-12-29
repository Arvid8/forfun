public class SobelFilter implements ImageFilter {

    public String getMenuName() {return "Detect Edges";}

    public void apply(int[][][] src, int[][][] dest) {
        // Use sobel operator in the interior
	for (int x=1; x< src.length-1; x++)
	    for (int y=1; y<src[0].length-1; y++) 
                for (int c=0; c<3; c++) {
                    int hor = src[x-1][y-1][c]+src[x][y-1][c]+src[x][y-1][c]+src[x+1][y-1][c]
                            - (src[x-1][y+1][c]+src[x][y+1][c]+src[x][y+1][c]+src[x+1][y+1][c]);
                    int ver = src[x-1][y-1][c]+src[x-1][y][c]+src[x-1][y][c]+src[x-1][y+1][c]
                            - (src[x+1][y-1][c]+src[x+1][y][c]+src[x+1][y][c]+src[x+1][y+1][c]);
                    dest[x][y][c] = Math.min(255,(int)(Math.sqrt(hor*hor+ver*ver)));
        }
        // Make edge pixels black
        for (int x=0; x<src.length; x++)
            for (int c=0; c<3; c++) {
                dest[x][0][c]=0;
                dest[x][src[0].length-1][c]=0;
            }
        for (int y=0; y<src[0].length; y++)
            for (int c=0; c<3; c++) {
                dest[0][y][c]=0;
                dest[src.length-1][y][c]=0;
            }
                
    }
}