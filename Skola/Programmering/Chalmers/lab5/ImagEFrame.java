import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import javax.swing.*;
import javax.swing.event.*;
import javax.swing.filechooser.*;
import javax.swing.border.*;
import java.awt.event.*;
import java.awt.*;
import java.io.*;

public class ImagEFrame extends JFrame implements ActionListener {

    private JMenuItem aboutItem;
    private JMenuItem quitItem;
    private JMenuItem openItem;
    private JMenuItem saveItem;

    private BufferedImage image;
    private ImageIcon icon;
    private JFileChooser chooser;
    private JSlider slider;
    private JPanel sliderPanel;
    private TitledBorder border;

    private int[][][] imArray1;    // Before filtering, images are swapped.
    private int[][][] imArray2;    // Displayed image always stored in imArray2

    private ScalableFilter currentFilter;

    public ImagEFrame() {

        // Set up menus
        JMenuBar menuBar = new JMenuBar();
        JMenu imagEMenu = new JMenu("imagE");
        menuBar.add(imagEMenu);
        aboutItem = new JMenuItem("About imagE");
        imagEMenu.add(aboutItem);
        quitItem = new JMenuItem("Quit");
        imagEMenu.add(quitItem);

        JMenu fileMenu = new JMenu("File");
        menuBar.add(fileMenu);
        openItem = new JMenuItem("Open File...");
        fileMenu.add(openItem);
        saveItem = new JMenuItem("Save As...");
        fileMenu.add(saveItem);

        JMenu filterMenu = new JMenu("Filters");
        menuBar.add(filterMenu);
        addFilter(filterMenu,new InvertFilter());
        addFilter(filterMenu,new FlipHFilter());
        addFilter(filterMenu,new FlipVFilter());
        filterMenu.addSeparator();
        addFilter(filterMenu,new BWFilter());
        addFilter(filterMenu,new GlassFilter());
        addFilter(filterMenu,new SobelFilter());
        addFilter(filterMenu,new SharpFilter());
        filterMenu.addSeparator();
        addScalableFilter(filterMenu,new SwirlFilter());
        addScalableFilter(filterMenu,new SquareFilter());
        addScalableFilter(filterMenu,new BrightnessFilter());

        // Listeners for filters are added in addScalableFilter
        aboutItem.addActionListener(this);
        quitItem.addActionListener(this);
        openItem.addActionListener(this);
        saveItem.addActionListener(this);

        // Set up rest of GUI
        image = initialImage();
        icon = new ImageIcon(image);
        JLabel lab = new JLabel(icon);

        slider = new JSlider(0,100);
        sliderPanel = new JPanel();
        sliderPanel.add(slider);
        sliderPanel.setVisible(false);
        Border b1 = BorderFactory.createEtchedBorder(EtchedBorder.LOWERED);
        border = BorderFactory.createTitledBorder(b1,"");
        sliderPanel.setBorder(border);
        slider.addChangeListener( new ChangeListener() {
                public void stateChanged(ChangeEvent e) {
                    double scale = (slider.getValue()-50)/50.0;
                    currentFilter.apply(imArray1,imArray2,scale);
                    Conversions.matrix2Image(imArray2,image);
                    icon.setImage(image);
                    repaint();
		}
            });
  
        JPanel panel = new JPanel(new BorderLayout());
        panel.add(lab,BorderLayout.NORTH);
        panel.add(sliderPanel,BorderLayout.SOUTH);
        add(panel);
        setJMenuBar(menuBar);
        pack();
        setTitle("imagE");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Prepare file chooser
        chooser = new JFileChooser(new File("."));
        FileNameExtensionFilter filter = new FileNameExtensionFilter("JPG Images", "jpg");
        chooser.setFileFilter(filter);
    }

    private BufferedImage initialImage() {
        image = new BufferedImage(500,600,BufferedImage.TYPE_INT_RGB);
        imArray1 = new int[image.getWidth()][image.getHeight()][3];
        imArray2 = new int[image.getWidth()][image.getHeight()][3];
        for (int x=0; x<imArray2.length; x++)
            for (int y=0; y<imArray2[0].length; y++) {
                double dist = 1.0-Math.sqrt((x-300)*(x-300) + (y-200)*(y-200))/500; 
                imArray2[x][y][0] = (int) (dist<0.5 ? 0 :
                                           Math.min(Math.pow(dist,0.4) +
                                                    Math.pow(dist-0.5,0.1),1.0) * 255);

                // Math.min(Math.pow(dist2,0.4) +
                //        Math.pow(dist2-0.5,0.1),1.0) * 255);
                imArray2[x][y][1] = (int)(dist*255);
                imArray2[x][y][2] =  0;
            }
        Conversions.matrix2Image(imArray2,image);
        return image;
   }

    public void addFilter (JMenu menu, final ImageFilter f) {
        JMenuItem item = new JMenuItem (f.getMenuName());
        menu.add(item);
        item.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    swapImages();
                    f.apply(imArray1,imArray2);
                    Conversions.matrix2Image(imArray2,image);
                    icon.setImage(image);
                    sliderPanel.setVisible(false);
                    pack();
                    repaint();

                }
            });
    }

     public void addScalableFilter (JMenu menu, final ScalableFilter f) {
        JMenuItem item = new JMenuItem (f.getMenuName());
        menu.add(item);
        item.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    swapImages();
                    currentFilter = f;
                    slider.setValue(50);
                    sliderPanel.setVisible(true);
                    border.setTitle(f.getMenuName());
                    pack();
                    repaint();
                }
            });
    }
                    
    private void swapImages() {
        int[][][] tmp = imArray1;
        imArray1 = imArray2;
        imArray2 = tmp;
    } 

    // Handler for imagE and File menu

    public void actionPerformed(ActionEvent e) {
        String cmd = (e.getActionCommand());
        if (cmd.equals(aboutItem.getText()))
            JOptionPane.showMessageDialog(this,"Simple Image Program for TDA547\nversion 0.1",
                                          "About imagE", JOptionPane.INFORMATION_MESSAGE);

        else if (cmd.equals(quitItem.getText()))
            System.exit(0);

        else if (cmd.equals(openItem.getText())) {
            int returnVal = chooser.showOpenDialog(this);
            if (returnVal == JFileChooser.APPROVE_OPTION) {
                try {
                    image = ImageIO.read(chooser.getSelectedFile());
                    imArray1 = new int[image.getWidth()][image.getHeight()][3];
                    imArray2 = new int[image.getWidth()][image.getHeight()][3];
                    icon.setImage(image);
                    Conversions.image2Matrix(image,imArray2);
                    sliderPanel.setVisible(false);
                    pack();
                    repaint();
                } catch (Exception ex) {
                    JOptionPane.showMessageDialog(this,"Could not open " + chooser.getSelectedFile().getName()
                                                  + "\n" + ex.getMessage(),
                                                  "Open Error", JOptionPane.INFORMATION_MESSAGE);
                }
            }
            
        } else if (cmd.equals(saveItem.getText())) {
            int returnVal = chooser.showSaveDialog(this);
            if (returnVal == JFileChooser.APPROVE_OPTION) {
                try {
                    ImageIO.write(image,"jpg",chooser.getSelectedFile());
                } catch (Exception ex) {
                    JOptionPane.showMessageDialog(this,"Could not write " + chooser.getSelectedFile().getName()
                                                  + "\n" + ex.getMessage(),
                                                  "Save Error", JOptionPane.INFORMATION_MESSAGE);
                }
            }            
        }
    }
}
