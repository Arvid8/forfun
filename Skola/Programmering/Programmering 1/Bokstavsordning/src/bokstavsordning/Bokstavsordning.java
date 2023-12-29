/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bokstavsordning;
import java.util.Scanner;
/**
 *
 * @author Arvid Persson
 */
public class Bokstavsordning {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input1  = new Scanner (System.in);
        
        
        System.out.println("Skriv första ordet:");
        String namn1 = input1.nextLine();
        
        System.out.println("Skriv andra ordet:");
        String namn2 = input1.nextLine();
        
        int sak = namn1.compareTo(namn2);
        
        if (sak < 0) {
        System.out.println(namn1 + " går före " + namn2 + ".");
        }
        else if (sak > 0) {
        System.out.println(namn2 + " går före " + namn1 + ".");
        }
        else { System.out.println(namn1 + " och " + namn2 + " är identiska.");
        }
    }  
}
