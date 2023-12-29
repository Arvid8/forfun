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
        
        
        if (100 =< summa < 1000) {
            System.out.println(summa + " kr ger rabatt med 10% och slutpriset blir " + summa*0.9);
        }
        
        else if (tal1 < tal2){
            System.out.println("Tal 2 är störst.");
        }
        
        else {
           System.out.println("Tal 1 och tal 2 är lika stora."); 
        }
        
        
        
        
        
        
        
        // TODO code application logic here
    }
    
}
