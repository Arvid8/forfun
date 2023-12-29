public class SharpFilter implements ImageFilter{
    
    public String getMenuName(){
        return "Sharpening Filter";
    }
    
    public void apply(int[][][] src, int[][][] dest){
        int xRes = src.length;
        int yRes = src[0].length;
        for(int i = 0; i < xRes-1; i++){
            for(int j = 0; j < yRes-1; j++){
                for(int k = 0; k < 3; k++){
                    if(i==0||i==xRes-1||j==0||j==yRes-1){
                        dest[i][j][k] = src[i][j][k];
                    } else {
                        dest[i][j][k] = 5*src[i][j][k];
                        dest[i][j][k] -= src[i][j+1][k];
                        dest[i][j][k] -= src[i][j-1][k];
                        dest[i][j][k] -= src[i+1][j][k];
                        dest[i][j][k] -= src[i-1][j][k];
                        if(dest[i][j][k]>255)dest[i][j][k]=255;
                        if(dest[i][j][k]<0)dest[i][j][k]=0;
                    }
                }
            } 
        }
    }
}