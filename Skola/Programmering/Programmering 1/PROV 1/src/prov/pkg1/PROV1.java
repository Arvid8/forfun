/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package prov.pkg1;
import java.util.*;

/**
 *
 * @author Arvid Persson
 */
public class PROV1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        
        System.out.print("Skriv in ditt ord: ");
        String ord = input.next(), bygg = "";
        
        int ordlängd = ord.length();
        
        for(int i = ordlängd - 1; i >= 0 ;i--){
            bygg = bygg + ord.charAt(i);
        }
            if(bygg.equals(ord)){
                System.out.print("Ordet är ett palindrom!");
            }
            else {
                System.out.print("Ordet är INTE ett palindrom!"); 
            }
                
            
        }
        
        
    }
    

 /*if (ord.substring(1, (ordlängd/2)) == ord.substring(ordlängd, (ordlängd/2))){
            
            System.out.print("Ordet är ett palindrom!");
        }
        
        else {
           System.out.print("Ordet är INTE ett palindrom!"); 
        }
        
        System.out.print(ordlängd);*/
