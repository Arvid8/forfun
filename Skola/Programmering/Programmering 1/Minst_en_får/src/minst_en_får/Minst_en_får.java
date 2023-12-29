/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package minst_en_får;
import java.util.*;

/**
 *
 * @author Arvid Persson
 */
public class Minst_en_får {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Mata in antalet mottagare: ");
        int mottagare = input.nextInt();
        System.out.println("Mata in antalet saker som ska fördelas: ");
        int saker = input.nextInt();
        
        int stycken = minstEn_får(saker, mottagare);
        System.out.println("Minst en mottagare får åtminstone " + stycken + " saker.");
    }
    
        static int minstEn_får(int x, int y){
        int s;
        if(x%y != 0){
            s = (x/y) + 1;
        }
        else {s = x/y;}
        return s;
        }
    
}
