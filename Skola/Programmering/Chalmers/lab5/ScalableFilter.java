public interface ScalableFilter {

    public String getMenuName();
    public void apply(int[][][] src, int[][][] dest, double scale);

}