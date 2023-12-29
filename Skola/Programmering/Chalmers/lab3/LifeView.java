import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class LifeView extends JPanel {

    private LifeModel model;
    private LifeWorld world;
    private Timer timer;

    public LifeView(LifeModel model, int size) {
        this.model = model;
        world = new LifeWorld(model,size);
        JButton stepButton = new JButton("Step");
        JButton runButton = new JButton("Run");
        JButton stopButton = new JButton("Stop");
        setLayout(new BorderLayout());
        add(world,BorderLayout.NORTH);
        add(stepButton,BorderLayout.WEST); 
        add(runButton,BorderLayout.CENTER);
        add(stopButton,BorderLayout.EAST);
        ActionListener stepListener = new StepListener();
        stepButton.addActionListener(stepListener);
        runButton.addActionListener(new RunListener());
        stopButton.addActionListener(new StopListener());
        timer = new Timer(100,stepListener);
    }

    private class StepListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            model.newGeneration();
            world.repaint();
        }
    }

    private class RunListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            timer.start();
        }
    }

    private class StopListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            timer.stop();
        }
    }
}