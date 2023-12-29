import javax.swing.*;

public class Main {

    public static void main(String[] args) {
	JFrame f = new JFrame("Game of Life");
	LifeModel model = new LifeModel(50,50); 
	double ratio = Double.parseDouble(args[0]);
	model.randomPopulation(ratio);
	LifeView view = new LifeView(model,400);
	f.add(view);
	f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	f.pack(); 
	f.setVisible(true);
    }
}

    