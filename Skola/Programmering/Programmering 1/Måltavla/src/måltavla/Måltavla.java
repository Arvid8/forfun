/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package måltavla;

import java.awt.*;

/**
 *
 * @author Arvid Persson
 */
    public class Måltavla {
        private int x;
        private int y;
        private int r;
        
        public Måltavla (int x, int y, int r){
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
        
        g.setColor(Color.white);
        g.fillOval(x-(r), y-(r), r, r);
        
        g.setColor(Color.black);
        g.fillOval(x-(int)0.8*r, y-(int)0.8*r, (int)0.8*r, (int)0.8*r);
        
        g.setColor(Color.blue);
        g.fillOval(x-(int)0.6*r, y-(int)0.6*r, (int)0.6*r, (int)0.6*r);
        
        g.setColor(Color.red);
        g.fillOval(x-(int)0.4*r, y-(int)0.4*r, (int)0.4*r, (int)0.4*r);
        
        g.setColor(Color.yellow);
        g.fillOval(x-(int)0.2*r, y-(int)0.2*r, (int)0.2*r, (int)0.2*r);
        
        g.setColor(Color.black);
        g.drawOval(x-(r), y-(r), r, r);
        
        
        }
    }