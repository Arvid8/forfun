package square_test;

public class Square{
	private int x;
	private int y;
	private int side;
	
	public Square(int x, int y, int side){
	this.x = x;
	this.y = y;
	this.side = side;
	}
	
	public void draw(SimpleWindow w){
		w.moveTo(x, y);
		w.lineTo(x, y+side);
		w.lineTo(x+side, y+side);
		w.lineTo(x+side, y);
		w.lineTo(x, y);
	}
        
	public void move(int dx, int dy){
		x += dx;
		y += dy;
	}
	
	public int getX(){
		return x;
	}
	
	public int getY(){
		return y;
	}
	
	public int getArea(){
		return side*side;
	}
        
        public void setSide(int p){
		x += p;
                y += p;
	}
}
