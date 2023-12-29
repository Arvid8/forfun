import java.io.File;
public class MusicUtils{
	public static final double k=0.498;
    public static double[] sine(double freq, double duration) {
        int n = (int)(duration*SoundDevice.SAMPLING_RATE);
        double[] a = new double[n];
        double dx = 2*Math.PI*freq / SoundDevice.SAMPLING_RATE;
        for (int i = 0; i < n; i++) {
            a[i] = Math.sin(i * dx);
        }
        return a;
    }
    public static double[] pluck(double freq, double duration) {
		int n = (int)(duration*SoundDevice.SAMPLING_RATE);
		double[] a = new double[n];
		double p = SoundDevice.SAMPLING_RATE/freq;
		for (int i=0;i<p;i++){
			a[i]=Math.random()*2-1;
		}
		for(int i=(int)p;i<n;i++){
			a[i]=(a[i-(int)p]+a[i-(int)p+1])*k;
		}
		return a;
	}
	
	public static double[] note(int pitch, double duration)
	{
	double freq=440*Math.pow(2,pitch/((double)12));
	double[] a=pluck(freq,duration);
	return a;
	}
	
	public static double[] average(double[] t1, double[] t2){
		int l=t1.length;
		double a[]=new double[l];
		for (int i=0;i<l;i++) {
			a[i]=(t1[i]+t2[i])/2;
		}
		return a;
	}
	
	public static double[] harmonic(int pitch, double duration) {
	int n=(int)(duration*SoundDevice.SAMPLING_RATE);
	return average(note(pitch,duration),average(note(pitch-12,duration),note(pitch+12,duration)));
	}
}