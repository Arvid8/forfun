/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package burrleken;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class BurrLeken {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.println("NU SKA VI LEKA BURR-LEKEN!");
        
        System.out.print("Skriv ditt burrtal (mellan 2-9): ");
        
        int burrtal = input.nextInt();
        
        for (int i=1; i<100; i++){
        if ((i%burrtal==0)||(i/10==burrtal)||(i%10==burrtal)){
            System.out.println("burr");
        }
        else {
            System.out.println(i);
        }
    }
    
    }
}
