/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fältuppgift;

/**
 *
 * @author Arvid Persson
 */
public class FältUppgift {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        int[] vikt = {67, 54, 60};
        
        System.out.println("Innehållet i fältet vikt: " + vikt[0] + " " + vikt[1] + " " + vikt[2] + ".");
                
                int tmpvikt0 = vikt[0];
                int tmpvikt1 = vikt[1];
                int tmpvikt2 = vikt[2];
                vikt[0] = tmpvikt1;
                vikt[1] = tmpvikt2;
                vikt[2] = tmpvikt0;
                
        
        System.out.println("Om man sorterar detta fält så blir det: " + tmpvikt1 + " " + tmpvikt2 + " " + tmpvikt0 + ".");
        
        // TODO code application logic here
    }
    
}
