/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kunskapskontroll4;
import java.util.Scanner;
/**
 *
 * @author Arvid Persson
 */
public class Kunskapskontroll4 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Ange summa i kr: ");
        int summa = input.nextInt();
        
        
        if ((100 <= summa) && (summa < 1000)) {
            System.out.println(summa + " kr ger rabatt med 10% och slutpriset blir " + summa*0.9 + "kr.");
        }
        
        else if ((1000 <= summa) && (summa < 10000)){
            System.out.println(summa + " kr ger rabatt med 20% och slutpriset blir " + summa*0.8 + "kr.");
        }
        
        else if ((10000 <= summa) && (summa < 100000)){
           System.out.println(summa + " kr ger rabatt med 30% och slutpriset blir " + summa*0.7 + "kr.");
        }
        
        else if (100000 <= summa){
                System.out.println(summa + " kr ger rabatt med 40% och slutpriset blir " + summa*0.6 + "kr.");
                }
        
        else {
                System.out.println(summa + " är under 100kr och därför får du ingen rabatt.");
                }
        
        
        
        
        
        
        
        // TODO code application logic here
    }
    
}
