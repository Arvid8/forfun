/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package square_test;

/**
 *
 * @author 199701296916
 */
public class Square_test {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        SimpleWindow w = new SimpleWindow(400, 400, "Example");
        Square sq = new Square(50, 50, 100);
        sq.draw(w); 
        for (int i = 0; i < 10; i++){
        sq.setSide(20);
        sq.draw(w);   
        }
    }
    
}
