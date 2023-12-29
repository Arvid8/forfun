/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package blandform;
import java.util.Scanner;
/**
 *
 * @author Arvid Persson
 */
public class Blandform {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner (System.in);
        
        System.out.println("Skriv din täljare: ");
        int täljare = input.nextInt();
        System.out.println("Skriv din nämnare: ");
        int nämnare = input.nextInt();
        
        
        System.out.println("Ditt blandtal blir: " + täljare/nämnare + " " + täljare%nämnare + "/" + nämnare + ".");
        
        
        // TODO code application logic here
    }
    
}
