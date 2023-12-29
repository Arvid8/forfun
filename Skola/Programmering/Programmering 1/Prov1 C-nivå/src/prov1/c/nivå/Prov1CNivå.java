/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package prov1.c.nivå;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class Prov1CNivå {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        boolean fortsätt = true;
        int värde, sistavärde = 0;
        
        do {
            System.out.print("Skriv in ett startvärde: ");
            int startvärde = input.nextInt();
            System.out.print("Skriv in ett slutvärde: ");
            int slutvärde = input.nextInt();
            värde = slutvärde-startvärde;
            
            for(int i=0; i<=värde; i++ ){
                sistavärde = sistavärde + (i);
            }
            System.out.println("Summan är: " + sistavärde);
            System.out.println("Medelvärdet är: " + sistavärde/värde);
            System.out.print("Skriv \"true\" om du vill fortsätta och \"false\" om du vill avsluta: ");
            fortsätt = input.nextBoolean();
        }
        while(fortsätt);
    }
    
}
