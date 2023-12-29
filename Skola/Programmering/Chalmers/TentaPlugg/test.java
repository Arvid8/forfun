public class test{
    public static int computeScore(int i, int[] a){
        int score = 0;
        for(int k = 0; k < a.length; k++){
            if(a[k]  == i)
                score++;
        }
        return score;
    }
    
    public static void main(String[] args){
        int a[] = {2,1,3,4,1,1,4};
        for (int i = 0; i < 5; i++){
            System.out.print(computeScore(i,a));
        }
        System.out.println();
    }
}