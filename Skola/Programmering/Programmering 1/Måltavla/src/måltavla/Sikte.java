/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package måltavla;

import java.awt.Color;
import java.awt.Graphics;

/**
 *
 * @author Arvid Persson
 */
public class Sikte {
    private int x;
        private int y;
        private int r;
        
        public Sikte (int x, int y, int r){
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
        
        public int hämtaR(){
            return r;
        }
        
        public void sättX(int x){
            this.x = x;
        }
        
        public void sättY(int y){
            this.y = y;
        }
        
        public void sättR(int r){
            this.r = r;
        }
    
    public void rita(Graphics g){
        g.setColor(Color.orange); //Sätter färg
        g.drawLine(x-r, y, x+r, y); //Skapar kors
        g.drawLine(x, y-r, x, y+r); //Skapar kors
        g.drawOval(x-r, y-r, r*2, r*2); //Skapar ring
        
        
        }
    
}
