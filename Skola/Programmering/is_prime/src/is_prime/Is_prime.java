package is_prime;

import java.util.Scanner;

public class Is_prime {

    public static void main(String[] args) {
     Scanner input = new Scanner(System.in);
        int a = 0, b = 0;
        boolean aBig = true;
        
        while(aBig){
        System.out.println("Skriv in början av intervallet: ");
        a = input.nextInt();
        
        System.out.println("Skriv in slutet av intervallet: ");
        b = input.nextInt();
        if (a < 0){
            System.out.println("Intervallet måste vara positivt. Försök igen."); 
        } else if(b <= a){
           System.out.println("Början av intervallet måste vara mindre än slutet. Försök igen."); 
        } else if (b-a == 1){
            System.out.println("Intervallet måste minst sammanfatta 3 tal. Försök igen."); 
        } else{aBig = false;}
        }
        
        if(a == 0){a++;}
        checkTwins(a, b);
    }
    
    public static void checkTwins(int a, int b){
        for(int i = a+1; i < b; i++){
            if(isPrime(i-1) && isPrime(i+1)){
                System.out.println((i-1) + " och " + (i+1) + " är primtalstvillingar"); 
            }
        }
    }
    
    public static boolean isPrime(int n){
        for(int i = 2; i < n; i++) {
        if(n%i == 0)
            return false;
    }
    return true;
    }
}