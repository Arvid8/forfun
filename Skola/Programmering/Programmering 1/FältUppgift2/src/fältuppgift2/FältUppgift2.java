/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fältuppgift2;
import java.util.Scanner;

/**
 *
 * @author Arvid Persson
 */
public class FältUppgift2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[] antal = new int[4];
        
        System.out.println("Skriv in 4 olika tal.");
        
        antal[0] = input.nextInt();
        antal[1] = input.nextInt();
        antal[2] = input.nextInt();
        antal[3] = input.nextInt();
        
        
        System.out.println("Ditt fält består av: "+antal[0]+", "+antal[1]+", "+antal[2]+" och "+antal[3]+".");
        
        
        
        // TODO code application logic here
    }
    
}
