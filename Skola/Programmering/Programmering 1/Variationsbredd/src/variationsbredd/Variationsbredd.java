/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package variationsbredd;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class Variationsbredd {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Hur många tal vill du jämföra?");
        int fält = input.nextInt();
        int[] tal = new int[fält];
        for (int i = 0; i < fält; i++){
            System.out.println("Skriv in värde för tal nummer " + (i+1) + ":");
            tal[i] = input.nextInt();
        }
        
        int jämför = jämförVariationsbredd(tal);
        
        System.out.println("Variationsbredden är " + jämför + ".");
        
        
    }
    
    static int jämförVariationsbredd(int[] ja){
        int svar, stor=ja[0], liten=ja[0];
        for (int i = 0; i < ja.length-1; i++){
            if (stor<ja[i+1]){
                stor=ja[i+1];
            }
            if (liten>ja[i+1]){
                liten=ja[i+1];
            }
        }
        svar = stor-liten;
        return svar;
    }
}
