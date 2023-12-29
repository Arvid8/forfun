/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package miniräknare;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class Miniräknare {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        
        System.out.println("Tryck J för att starta.");
        
        char fortsätt = input.next().charAt(0);
        
        int tal1, tal2;
        
        
        while (fortsätt == 'j'){
            System.out.println("Skriv in till räknesätt. Skriv \"+\" för addition, \"-\" för subtraktion, \"x\" för multiplikation och \"/\" för divition.");
            char räknesätt = input.next().charAt(0);
            if (räknesätt == '+'){
                System.out.println("Skriv in det första talet.");
                tal1 = input.nextInt();
                System.out.println("Skriv in det andra talet.");
                tal2 = input.nextInt();
                System.out.println("Svaret är " + (tal1+tal2));
            }
            
            else if (räknesätt == '-'){
                System.out.println("Skriv in det första talet.");
                tal1 = input.nextInt();
                System.out.println("Skriv in det andra talet.");
                tal2 = input.nextInt();
                System.out.println("Svaret är " + (tal1-tal2));
                break;
            }
            
            else if (räknesätt == 'x'){
                System.out.println("Skriv in det första talet.");
                tal1 = input.nextInt();
                System.out.println("Skriv in det andra talet.");
                tal2 = input.nextInt();
                System.out.println("Svaret är " + (tal1*tal2));
            }
            
            else if (räknesätt == '/'){
                System.out.println("Skriv in din täljare.");
                tal1 = input.nextInt();
                System.out.println("Skriv in din nämnare.");
                tal2 = input.nextInt();
                System.out.println("Svaret är " + (tal1/tal2));
            }
            System.out.println("Tryck \"J\" om du vill fortsätta räkna. Annars trycker du \"N\".");
            fortsätt = input.next().charAt(0);
        }
        // TODO code application logic here
    }
    
}
