/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package omprovmetoder;
import java.util.*;
/**
 *
 * @author Arvid Persson
 */
public class OmprovMetoder {
    
    
 
    public static void main(String[] args) {
        Scanner input = new Scanner (System.in);
        System.out.println("Skriv in din sträng: ");
        String serie = input.next();
        
        String svar = konstigSerie(serie);
        
        System.out.println("Serien blir: " + svar);
    }
        static String konstigSerie(String s){
            String svar = "";
            
            for (int i = 0; i < s.length(); i++){
                if(s.charAt(i)== 'a'){
                 svar += "aa";
                }
                
                if(i+1 == s.length()){
                    if (s.charAt(i)== 'b'){
                    svar += "b";
                    }
                }
                
                else {
                    if ((s.charAt(i)== 'b') && (s.charAt(i+1)== 'b')){
                    svar += "b";
                    i++;
                    }
                    
                    else {
                        if (s.charAt(i)== 'b'){
                        svar += "b";
                        }
                    }
                    }
                
                if(i+1 == s.length()){
                    if (s.charAt(i)== 'c'){
                        svar += "";
                    }
                }
                
                else {
                    if ((s.charAt(i)== 'c') && (s.charAt(i+1)== 'c')){
                    svar += "cc";
                    i++;
                    }
                    else {
                        if (s.charAt(i)== 'c'){
                        svar += "";
                        }
                    }
                    }   
            }
            return svar;
        }
    }
    

