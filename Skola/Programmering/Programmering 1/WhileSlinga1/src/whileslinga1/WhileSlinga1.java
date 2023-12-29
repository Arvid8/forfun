/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package whileslinga1;

/**
 *
 * @author Arvid Persson
 */
public class WhileSlinga1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        double befolkning = 1000000;
        int år = 0;
        
        while (befolkning<=2000000){
        befolkning = befolkning * 1.05;
        år++;
        }
        System.out.println("Befolkningen är: " + (int) befolkning + " efter " + år + " antal år.");
        
        
        // TODO code application logic here
    }
    
}
