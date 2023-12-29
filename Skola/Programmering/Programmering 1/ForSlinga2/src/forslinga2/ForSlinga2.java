/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package forslinga2;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class ForSlinga2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    System.out.println("Skriv in ditt nummer: ");
    
    int antalplatser = input.nextInt();
    int[] talen = new int[antalplatser];
    
    int summa = 0;
    
    for (int i = 0; i < antalplatser; i++){
       talen[i] = i + 1;
       summa = summa + talen[i];
    }
    
    System.out.println("Summa: " + summa);
    
    }
}
