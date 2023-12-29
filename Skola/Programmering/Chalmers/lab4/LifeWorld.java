import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class LifeWorld extends JPanel implements MouseListener {

    private LifeModel model; 
    private int xside, yside;

    public LifeWorld(LifeModel model, int size) {
        this.model = model;
        xside = size/model.getWidth();
        yside = size/model.getHeight();
        setPreferredSize(new Dimension(size,size));
        setBackground(Color.WHITE);
        setOpaque(true);
        addMouseListener(this);
    }

    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.BLACK);
        int width = model.getWidth();
        int height = model.getHeight();
        for(int i=0; i<width; i++) {
            for (int j=0; j<height; j++) {
                if (model.getCell(i,j)) {
                    g.fillRect(i*xside,j*yside,xside,yside);
                }
            }
        }
    }

    public void mouseClicked(MouseEvent e) {
        int i = e.getX()/xside;
        int j = e.getY()/yside;
        boolean b = model.getCell(i,j);
        model.setCell(i,j,!b);
        repaint();
    }

    public void mouseEntered(MouseEvent e) {
    }

    public void mouseExited(MouseEvent e) {
    }

    public void mousePressed(MouseEvent e) {
    }

    public void mouseReleased(MouseEvent e) {
    }
}