import javax.swing.ImageIcon;
import java.awt.image.BufferedImage;
import java.awt.Color;

public class ECIcon extends ImageIcon {
    private final int hours_per_pixel;
    private final int pixels_per_day;
    private final int width;
    private final int height;
    private final int mwh_per_pixel;

    public ECIcon (int hours_per_pixel, int mid_consumption) {
        this.hours_per_pixel = hours_per_pixel;
        pixels_per_day = 24/hours_per_pixel;
        width = 8*24/hours_per_pixel + 2;
        height = width;
        mwh_per_pixel = 2*mid_consumption/height;
        update();
    }

    public void update() {
        BufferedImage image = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
        int[][] data = new int[24][8];

        // We try to get data from NordPool;
        //If exception thrown, use consumption = 0 (default value)
        try {
            URLReader.getEightDays(data);
        } catch (Exception e) {}                

        for(int i=0; i<width-2; i++) {
            int day = i/pixels_per_day;
            int hour = hours_per_pixel*(i%(pixels_per_day));
            for(int j=0; j<height; j++) {
                int average = 0;
                int vals = 0;
                for (int k=0; k<hours_per_pixel; k++) {
                    int val = data[hour+k][day];
                    if (val > 0) {
                        average += val;
                        vals++;
                    }
                }
                if (vals > 0)
                    average = average/vals;
                // Paint if consumption bigger than current pixel and paint border pixels
                boolean paint = average > (height-j)*mwh_per_pixel ||    
                    i==0 || i==width-1 || j==0 || j==height-1; 
                // Use light gray to indicate new day
                Color col = paint ? Color.BLACK : ((hour==0) ? Color.LIGHT_GRAY : Color.WHITE);
                image.setRGB(i,j,col.getRGB());
                if (j==height/2) image.setRGB(i,j,Color.RED.getRGB());
            }
        }
        setImage(image);
    }
}
