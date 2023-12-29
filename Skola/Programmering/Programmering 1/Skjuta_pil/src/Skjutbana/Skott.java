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
 * @author Arvid Persson
 */
public class Skott {
    private int x;
    private int y;
    private int r;
    private int fy;
    private int fx;
    
    public Skott(int x, int y, int r){
        this.x = x;
        this.y = y;
        this.r = r;
    }
    
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
    
    public void sättFelY(int fy){
        this.fy = fy;
    }
    
    public void sättFelX(int fx){
        this.fx = fx;
    }
    
    public int hämtaFelX(){
        return fx;
    }
    
    public int hämtaFelY(){
        return fy;
    }
    
    public void rita(Graphics g){
        g.setColor(Color.GRAY);
        g.fillOval((x-r/20)+fx,(y-r/20)+fy, r/10, r/10);
        
}
}
