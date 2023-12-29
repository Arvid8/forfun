/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package referens_anrop;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class Referens_anrop {
static int antal;
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        double[] tid = new double[100];
        inTid(tid);
        utTid(tid);
    }
    
    static void inTid(double[] tid){
        Scanner input = new Scanner(System.in);
        System.out.println("Skriv in tider, avsluta med 0: ");
        antal = 0;
        double temp = input.nextDouble();
        while(temp != 0){
            tid[antal] = temp;
            antal++;
            temp = input.nextDouble();
        }
    }
        static void utTid(double[] tid){
            System.out.println("Tiderna är: ");
            for(int i = 0; i < antal; i++){
                System.out.print(" " + tid[i]);
            }
        
        
        }}
    

