/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kunskapskontroll5;
import java.util.Scanner;
/**
 *
 * @author Arvid Persson
 */
public class Kunskapskontroll5 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[] antal = new int[3];
        
        System.out.println("Skriv in 3 tal: ");
        
        antal[0] = input.nextInt();
        antal[1] = input.nextInt();
        antal[2] = input.nextInt();
        
        int back0 = antal[0];
        int back1 = antal[1];
        int back2 = antal[2];
        
        
        if ((antal[2] > antal[0]) && (antal[2] > antal[1])) {
            back0=antal[2];
            if (antal[1]>antal[0]){
                back1=antal[1];
                back2=antal[0];
            }
                else {
                        back1=antal[0];
                        back2=antal[1];
                        }
            }
        else if ((antal[1] > antal[0]) && (antal[1] > antal[2])) {
            back0=antal[1];
            if (antal[0]>antal[2]){
                back1=antal[0];
                back2=antal[2];
            }
                else {
                        back1=antal[2];
                        back2=antal[0];
                        }
            }
        else if ((antal[0] > antal[1]) && (antal[0] > antal[2])) {
            back0=antal[0];
            if (antal[1]>antal[2]){
                back1=antal[1];
                back2=antal[2];
            }
                else {
                        back1=antal[2];
                        back2=antal[1];
                        }
            }
        
        System.out.println("Ditt fält består av: "+back0+", "+back1+" och "+back2+".");
        // TODO code application logic here
    
    
}
}
