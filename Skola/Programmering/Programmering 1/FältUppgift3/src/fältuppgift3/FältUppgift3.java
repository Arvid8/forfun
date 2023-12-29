/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fältuppgift3;
import java.util.Scanner;

/**
 *
 * @author Arvid Persson
 */
public class FältUppgift3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[] antal = new int[3];
        
        System.out.println("Skriv in 3 olika tal.");
        
        antal[0] = input.nextInt();
        antal[1] = input.nextInt();
        antal[2] = input.nextInt();
        
        int temp0 = antal[0];
        int temp2 = antal[2];
        
        antal[0] = temp2;
        antal[2] = temp0;
        
        
        System.out.println("Ditt fält består av: "+antal[0]+", "+antal[1]+" och "+antal[2]+".");
        
        
        
        // TODO code application logic here
    }
    
}
