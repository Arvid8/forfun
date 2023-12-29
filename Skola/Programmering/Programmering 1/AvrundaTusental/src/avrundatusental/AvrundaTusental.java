/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package avrundatusental;
import java.util.Scanner;
/**
 *
 * @author Arvid Persson
 */
public class AvrundaTusental {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner (System.in);
        System.out.println("Skriv det tusental som du vill avrunda: ");
        int tal = input.nextInt();
        int avrundning = tal/1000; // 77
        int avrundning_rest = tal%1000; // 560
        int avrundning_svar;
        if (avrundning_rest > 499) {
            avrundning_svar = avrundning+1;
        }
        else {
            avrundning_svar = avrundning-(avrundning_rest)/1000;
        }
        System.out.println("Avrundat får du talet: "+avrundning_svar*1000);
        
        
        
        
// TODO code application logic here
    }
    
}
