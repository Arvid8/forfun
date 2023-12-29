/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sekventell_sök;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class Sekventell_sök {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String[] talserie = {"Adam","Arvid","Berit","Kalle","Magnus","Robert","Thor","Vilma"};
        System.out.print("Mata in det namn som du vill söka efter: ");
        String tal = scan.next();
        int min = 0;
        int max = talserie.length -1;
        int pos = -1;
        while(min<=max && pos == -1){
            int mitt = (min+max)/2;
            if(tal.compareTo(talserie[mitt]) > 0){
                min = mitt +1;
            }
            else if(tal.compareTo(talserie[mitt]) < 0){
                max = mitt -1;
            }
            else {
                
                pos = mitt;
            }
            }
            if (pos == -1){
                System.out.println("Namnet finns inte.");
            }
            else{
                System.out.println("Namnet finns på position " + pos + ".");
            }
          
        }
        
    }
    

