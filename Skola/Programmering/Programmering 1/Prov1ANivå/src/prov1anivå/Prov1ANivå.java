/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package prov1anivå;

import java.util.*;

/**
 *
 * @author Arvid Persson
 */
public class Prov1ANivå {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        boolean fortsätt = true;
        int tal, summa = 0,talsvar;
        
        
        while (fortsätt){
            System.out.print("Mata in ditt heltal (1-9 siffror): ");
            tal = input.nextInt();
            
            String talet = Integer.toString(tal);
            
            int längd = talet.length();
            for(int i = 0; i < längd; i++){
            talsvar = tal%10;
            tal = tal/10;
            summa = summa + talsvar;
            }
            System.out.print("Talets siffersumma är: " + summa + "\n" + "Medelvärdet är: " + summa/längd + "\n");
            
            System.out.print("Skriv \"true\" om du vill fortsätta och \"false\" om du vill avsluta: ");
            fortsätt = input.nextBoolean();
        }
            
            
            
        }
        
            
            
        
    }
    

