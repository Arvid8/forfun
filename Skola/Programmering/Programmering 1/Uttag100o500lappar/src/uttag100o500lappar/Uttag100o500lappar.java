/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package uttag100o500lappar;
import java.util.Scanner;
/**
 *
 * @author Arvid Persson
 */
public class Uttag100o500lappar {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner (System.in);
        System.out.println("Hur mycket vill du ta ut?");
        int uttag = input.nextInt();
        
        int femhundra =  uttag / 500;
        int hundra = uttag % 500;
        int hundra_svar = hundra / 100;
        int hundra_svar_rest = hundra % 100;
        
       
        int litetsvar = hundra_svar_rest / 50;
        int svar = hundra_svar + litetsvar;
        
        System.out.println("Antal femhundralappar: " + femhundra);
        System.out.println("Antal hundralappar: " + svar);
        
       
        
        // TODO code application logic here
    }
    
}
