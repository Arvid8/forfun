/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fältuppgift4;
import java.util.Scanner;

/**
 *
 * @author Arvid Persson
 */
public class FältUppgift4 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        double[] antal = new double[4];
        
        System.out.println("Skriv in 3 decimaltal.");
        
        antal[0] = input.nextDouble();
        antal[1] = input.nextDouble();
        antal[2] = input.nextDouble();
        
        Double summa = antal[0]+antal[1]+antal[2];
        Double medelvärde = (antal[0]+antal[1]+antal[2])/3;
        
        
        System.out.println("Summan av dina tal är: "+summa);
        System.out.println("Medelvärdet av dina tal är: "+medelvärde);
        
        
        
        // TODO code application logic here
    }
    
}
