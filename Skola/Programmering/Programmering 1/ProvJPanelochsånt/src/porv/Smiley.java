package porv;

import java.awt.Color;
import java.awt.Graphics;


public class Smiley {
    private boolean a;
    private boolean b;
    
    public Smiley(boolean a, boolean b){
       this.a = a;
       this.b = b;
        
    }
    
    public boolean hämtaSnäll(){
        return a;
    }
    
    public boolean hämtaGlad(){
        return b;
    }
    
    public void sättSnäll(boolean a){
        this.a = a;
    }
    
    public void sättGlad(boolean b){
        this.b = b;
    }
    
    
    // ritametoden
    public void paint(Graphics g){
        g.setColor(Color.yellow);
        g.fillOval(50, 50, 100, 100);
        g.setColor(Color.black);
        g.fillOval(75, 85, 10, 10);
        g.fillOval(115, 85, 10, 10);
        g.drawOval(50, 50, 100, 100);
        
        if(a) {
            g.drawLine(75, 84, 85, 84);
            g.drawLine(115, 84, 125, 84);
        }
        else {
            g.drawLine(75, 80, 85, 85);
            g.drawLine(115, 85, 125, 80);
        }
        
        if(b) {
            g.drawArc(85, 110, 30, 10, 0, -180);
        }
        else {
            g.drawArc(85, 115, 30, 10, 0, 180);
        }
    }
}
