/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Skjutbana;
import java.awt.*;
/**
 *
 * @author Admin15538
 */
public class Sikte {
    private int x;
    private int y;
    private int r;
    
    public Sikte(int x, int y, int r){
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
    
    public void rita(Graphics g){
        g.setColor(Color.ORANGE);
        //rita hårkors
        g.drawLine(x-r, y, x+r, y);
        g.drawLine(x, y-r, x, y+r);
        //rita cirkeln
        g.drawOval(x-r, y-r, r*2, r*2);
        
    }
    
}
