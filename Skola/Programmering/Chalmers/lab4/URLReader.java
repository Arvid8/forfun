import java.net.URL;
import java.io.InputStreamReader;
import java.util.*;

public class URLReader {

    public static final String nordpoolURL = 
        "http://wwwdynamic.nordpoolspot.com/marketinfo/consumption/sweden/consumption.cgi?interval=last8";
    ArrayList<Integer> consump = new ArrayList<Integer>();
    
    public static void main(String[] args) throws Exception {
        int[][] q = new int[24][8];
        getEightDays(q);
        
    }
    
    public static void getEightDays(int[][] data) throws Exception{
        URL url = new URL(nordpoolURL);
        Scanner in = new Scanner(new InputStreamReader(url.openStream()));
        while (in.findInLine("00-01") == null)in.nextLine();
        in.nextLine();
        
        for(int i = 0; i < 24; i++){
            for(int j = 0; j < 8; j++){
                String p = in.findInLine("\\d+");
                if (p == null) p = "0";
                    data[i][j] = Integer.parseInt(p);
                    in.nextLine();
                }
            for(int j = 0; j < 3; j++){
                in.nextLine();
            }
        }
        /*for(int i = 0; i < 24;i++){
            for(int j = 0; j < 8; j++){
                System.out.print(data[i][j]);
                System.out.print("\t");
            }
            System.out.println("");
        }*/
    }
}