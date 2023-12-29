import javax.swing.*;
import java.awt.Font;
import java.awt.event.*;

public class ECPanel extends JPanel {

    public ECPanel(String text) {
        JLabel lab1 = new JLabel(new ECIcon(4,15000));
        JLabel lab2 = new JLabel(text);
        lab2.setFont(new Font(Font.SANS_SERIF,Font.PLAIN, 30));
        lab1.addMouseListener(new WebListener());
        add(lab1);
        add(lab2);
    }
    
    private static class WebListener extends MouseAdapter {
        public void mouseClicked(MouseEvent e) {
            try {
                Runtime.getRuntime().exec("open " + URLReader.nordpoolURL);
            } catch (Exception ex) {}
        }
    }
    
    public static void main(String[] args) {
        JFrame win = new JFrame();
        win.add(new ECPanel("ECPanel test (click icon)"));
        win.pack();
        win.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        win.setVisible(true);
    }
}
