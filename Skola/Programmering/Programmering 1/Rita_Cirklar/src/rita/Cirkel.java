/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rita;
import java.awt.*;
/**
 *
 * @author Arvid Persson
 */
public class Cirkel {
    public int x,y,d;
    
    public Cirkel(int x, int y, int d){
        this.x = x;
        this.y = y;
        this.d = d;
    }
    
    public void rita(Graphics g){
        g.drawOval(x, y, d, d);
    }
    
    public void flytta(int x, int y){
        this.x += x;
        this.y += y;
        
    }
}
