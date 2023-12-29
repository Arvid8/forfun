/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Skjutbana;
import java.awt.Color;
import java.awt.Graphics;
/**
 *
 * @author Admin15538
 */

// Medlemsvariabler
public class Måltaval {
    private int x;
    private int y;
    private int r;
    
    // Konstruktur
    public Måltaval(int x, int y, int r){
       this.x = x;
       this.y = y;
       this.r = r;
        
    }
    
    
    //Metoder för att sätta och hämta värden
    public int hämtaX(){
        return x;
    }
    
    public int hämtaY(){
        return y;
    }
    
    public int hämtaRadie(){
        return r;
    }
    
    public void sättX(int x){
        this.x = x;
    }
    
    public void sättY(int y){
        this.y = y;
    }
    
    public void sättRadie(int r){
        if(r<0) this.r = -r;
        else this.r = r;
    }
    
    
    
    // ritametoden
    public void rita(Graphics g){
        g.setColor(Color.WHITE);
        g.fillOval(x-r,y-r, r*2, r*2);
        g.setColor(Color.BLACK);
        int radie = (int)(r*0.8);
        g.fillOval( x-radie, y-radie, radie*2, radie*2);
        g.setColor(Color.BLUE);
        radie = (int)(r*0.6);
        g.fillOval( x-radie, y-radie, radie*2, radie*2);
        g.setColor(Color.RED);
        radie = (int)(r*0.4);
        g.fillOval( x-radie, y-radie, radie*2, radie*2);
        g.setColor(Color.YELLOW);
        radie = (int)(r*0.2);
        g.fillOval( x-radie, y-radie, radie*2, radie*2);
        g.setColor(Color.BLACK);
        radie = (int)(r*1);
        g.drawOval(x-radie, y-radie, radie*2, radie*2);
        
    }
}
