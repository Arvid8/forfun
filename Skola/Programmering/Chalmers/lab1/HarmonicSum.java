import java.util.Scanner;
    
public class HarmonicSum {

    public static double hSum(int n, int lim) {
        double sum = 0; 
        int counter = 0;
        for (int i = 1; i <= n; i++) {
            sum += 1.0/i;
            counter += 1;
            if((sum >= lim) && (lim != 0)) return counter; 
        }
        return sum;
    }

    public static void main(String[] args) {
            int n = Integer.parseInt(args[0]);
            Scanner sc = new Scanner(System.in);
            System.out.println("");
            System.out.println("Vad vill du göra?");
            System.out.println("1. Visa antal termer för att uppnå nummer " + n);
            System.out.println("2. Visa " + n + "st termer");
            
            switch(sc.nextInt()){
                case 1: 
                    System.out.println("Det tog " + (int)hSum(2147483647, n) + "st termer för att uppnå nummer " + n);     
                    break;
                    
                case 2: 
                    System.out.print("Number of Terms");
                    System.out.print("       ");// 7st
                    System.out.println("Harmonic sum");
        
                    for (int r = 1; r <= n; r++){
                        String s = "";
                        for (int t = Integer.toString(r).length(); t <= 21; t++){// för att få allt i en snygg rad
                            s += " ";
                        }
                        System.out.print(r+s);
                        System.out.println(hSum(r, 0));
                    }
                    break;
                    
                default: 
                    System.out.println("Error!");
                    break;
        }
    }
}