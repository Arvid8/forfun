/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package uttag100lappar;
import java.util.Scanner;

/**
 *
 * @author Arvid Persson
 */
public class Uttag100lappar {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner (System.in);
        System.out.println("Du har 1000kr på kontot." + '\n' + "Hur mycket vill du ta ut?");
        int pengar = 1000;
        int uttag = input.nextInt();
        int avrundning = uttag / 100;
        int rest_avrundning = uttag % 100;
        int jagharingenaninglängre = rest_avrundning / 50;
        int svar = avrundning + jagharingenaninglängre;
        int riktigasvaret = pengar - (svar*100);
        
        System.out.println("Ditt belopp är nu: " + riktigasvaret);
        
        if (riktigasvaret < 0){
        System.out.println("GE TILLBAKA MINA PENGAR!");
        }
        
        // TODO code application logic here
    }
    
}
