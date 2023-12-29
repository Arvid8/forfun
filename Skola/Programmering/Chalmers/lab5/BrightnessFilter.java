public class BrightnessFilter implements ScalableFilter{
    
    public String getMenuName(){
        return "Brightness Filter";
    }
    
    public void apply(int[][][] src, int[][][] dest, double scale){
        int brightScale = (int) (scale*128);
        int xRes = src.length;
        int yRes = src[0].length;
        for(int i = 0; i < xRes-1; i++){
            for(int j = 0; j < yRes-1; j++){
                for(int k = 0; k < 3; k++){
                    dest[i][j][k] = src[i][j][k]+brightScale;
                    if(dest[i][j][k]>255)dest[i][j][k]=255;
                    if(dest[i][j][k]<0)dest[i][j][k]=0;
                }
            } 
        }
    }
}