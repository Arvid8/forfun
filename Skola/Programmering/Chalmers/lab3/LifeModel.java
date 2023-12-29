public class LifeModel  {
    private int width, height, gen;
    private boolean[][] world;

    public LifeModel (int w,int h) {
        width = w;
        height = h;
        world = new boolean[w][h];
    }

    public void randomPopulation(double fill) {
        for (int i = 0; i < width; i++){
            for (int j = 0; j < height; j++){
                world[i][j] = (Math.random()<fill);
            }
        }
    }

    public void newGeneration() {
        gen++;
        boolean[][] nextWorld = new boolean[width][height];
        for(int i = 0; i < width; i++){
            for(int j = 0; j < height; j++){
                if((world[i][j] && nrOfNeighbours(i, j) == 2) || (world[i][j] && nrOfNeighbours(i, j) == 3) || (!world[i][j] && nrOfNeighbours(i, j) == 3)){
                    nextWorld[i][j] = true;
                } else {
                    nextWorld[i][j] = false;
                }
            }
        }
        
        for(int q = 0; q < width; q++){
            for(int e = 0; e < height; e++){
                setCell(q, e, nextWorld[q][e]);
            }
        }
        //world = nextWorld;
    }

    public void setCell(int i, int j, boolean b) {
	   world[i][j] = b;
        
    }

    public boolean getCell(int i, int j) {
        if((i >= width) || (i < 0) || (j < 0) || (j >= height)) return false;
        return world[i][j];
    }

    public int getWidth() {
	System.out.println("LifeModel: Call to getWidth()");
	return width;
    }

    public int getHeight() {
	System.out.println("LifeModel: Call to getHeight()");
	return height;
    }
    
    public int getGen() {
	System.out.println("LifeModel: Call to getGen()");
	return gen;
    }
    
    int nrOfNeighbours(int i, int j){
        int count = 0;
        for (int q = 0; q < 3; q++){
            for (int e = 0; e < 3; e++){
                if(q==1&&e==1){e++;}
                if(getCell(i-1+q, j-1+e)){
                    count += 1;
                }
            }
        }
        return count;
    }
}
