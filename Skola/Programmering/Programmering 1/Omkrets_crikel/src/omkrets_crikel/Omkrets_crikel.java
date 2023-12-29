/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package omkrets_crikel;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class Omkrets_crikel {

    /**
     * @param args the command line arguments
     */

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.print("Skriv in diametern: ");
        double dia = input.nextDouble();
        double svar = omkretsCirkel(dia);
        
        System.out.println("Diametern är: " + svar);
        
}  
                
        static double omkretsCirkel(double diameter){
            double s = diameter*3.14159265358979;
            return s;
            
        }
        
}
        // TODO code application logic here
    
    

