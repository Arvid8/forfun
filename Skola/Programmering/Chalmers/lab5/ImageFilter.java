public interface ImageFilter {

    public String getMenuName();
    public void apply(int[][][] src, int[][][] dest);

}