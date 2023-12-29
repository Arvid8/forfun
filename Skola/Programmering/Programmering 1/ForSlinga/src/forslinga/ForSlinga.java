/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package forslinga;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class ForSlinga {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    int[] talen = new int[50];
    System.out.println("Skriv in hur många värden du vill lagra: ");
    int antalplatser = input.nextInt();
    
    System.out.println("Skriv in dina värden: ");
    for (int i = 0; i < antalplatser; i++){
        talen[i] = input.nextInt();
    }
    
    int störst = talen[0];
    
    for (int n = 0; n < antalplatser; n++){
        if (störst < talen[n]){
            störst = talen[n];
        }
    }
        System.out.println(störst + " är det största värdet.");
        
        int minst = talen[0];
        int summa = 0;
    
    for (int b = 0; b < antalplatser; b++){
        if (minst > talen[b]){
            minst = talen[b];
        }
        summa = summa+talen[b];
    }
    System.out.println(minst + " är det minsta värdet.");
    System.out.println("Talens summa är: " + summa);
        
        
        
        
        
        
        
        // TODO code application logic here
    }
}
