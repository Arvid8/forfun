/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package forslinga1;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class ForSlinga1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    System.out.println("Skriv in hur många värden du vill lagra: ");
    
    int antalplatser = input.nextInt();
    int[] talen = new int[antalplatser];
    
    System.out.println("Skriv in dina värden: ");
    
    for (int i = 0; i < antalplatser; i++){
        talen[i] = input.nextInt();
    }
        int störst = talen[0];
        int minst = talen[0];
        int summa = 0;
    
    for (int b = 0; b < antalplatser; b++){
        if (minst > talen[b]){
            minst = talen[b];
        }
        if (störst < talen[b]){
            störst = talen[b];
        }
        summa = summa+talen[b];
    }
    System.out.println(störst + " är det största värdet.");
    System.out.println(minst + " är det minsta värdet.");
    System.out.println("Talens summa är: " + summa);
    }
    
}
