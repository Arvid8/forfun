/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kunskapskontroll3;
import java.util.Scanner;
/**
 *
 * @author Arvid Persson
 */
public class Kunskapskontroll3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Skriv tal 1: ");
        int tal1 = input.nextInt();
        System.out.print("Skriv tal 2: ");
        int tal2 = input.nextInt();
        System.out.print("Skriv tal 3: ");
        int tal3 = input.nextInt();
        
        if ((tal1 > tal2) && (tal1 > tal3)) {
            System.out.println("Tal 1 är störst.");
        }
        
        else if ((tal2 > tal1) && (tal2 > tal3)){
            System.out.println("Tal 2 är störst.");
        }
        
        else if ((tal3 > tal1) && (tal3 > tal2)){
           System.out.println("Tal 3 är störst."); 
        }
        
        else {
           System.out.println("Alla tal är lika stora."); 
        }
        
        
        
        
        
        
        
        // TODO code application logic here
    }
    
}
