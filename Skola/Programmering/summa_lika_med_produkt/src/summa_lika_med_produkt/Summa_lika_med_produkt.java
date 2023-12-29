package summa_lika_med_produkt;

public class Summa_lika_med_produkt {

    public static void main(String[] args) {
        for(int i = 0; i < 101; i++){
            for(int o = 0; o < 101; o++){
                for(int p = 0; p < 101; p++){
                    if(i + o + p == i * o * p){
                        System.out.println("Summan för: " + i + ", " + o + " och " + p + " är lika med deras produkt.");
                    }
                }
            }
        }
    }   
}
