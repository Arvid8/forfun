/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hejeje;
import java.util.Scanner;
/**
 *
 * @author 199701296916
 */
public class HEJEJE {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        double x = 0, y = 0;
        int q = 0, z = 1;
        
        Scanner input = new Scanner(System.in);
        System.out.println("Skriv in hur många temer du vill summera:");
        x = input.nextDouble();
        
        while(q != x){
            y += 1/(z*(Math.sqrt(z)));
            z++;
            q++;
        }
        
        System.out.println("Efter " + q + " termer blir summan " + y);
    }
}
