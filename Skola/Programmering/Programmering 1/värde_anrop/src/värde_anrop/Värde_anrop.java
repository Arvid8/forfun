/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package värde_anrop;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class Värde_anrop {
    
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner (System.in);
        System.out.println("Mata in klotets radie: ");
        double radie = input.nextDouble();
        double PI = 3.14159265358979;
        
        double area = areaKlot(radie, PI);
        double volym = volymKlot(radie, PI);
        
        
        
        System.out.println("Area: " + area);
        System.out.println("Volym: " + volym);
    }
        static double areaKlot(double r, double PI){
            double a = 4*PI*r*r;
            return a;
        }

        static double volymKlot(double r, double PI){
            double v = (4*PI*r*r*r)/3;
            return v;
        }
        
        // TODO code application logic here
    }
    

