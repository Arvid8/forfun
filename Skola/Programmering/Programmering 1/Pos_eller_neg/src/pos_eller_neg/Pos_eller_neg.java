/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pos_eller_neg;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class Pos_eller_neg {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Mata in ditt tal: ");
        int tal = input.nextInt();
        String posellerneg = checkPosEllerNeg(tal);
        
        System.out.println("Talet är " + posellerneg + ".");
    }
        
        static String checkPosEllerNeg(int t) {
        String h;
        if (t>0){
        h = "positivt";
        }
        else if(t<0){
        h = "negativt";
        }
        else {
        h = "neutralt";
        }
        
        return h;
            
        }
        // TODO code application logic here
    }
    

