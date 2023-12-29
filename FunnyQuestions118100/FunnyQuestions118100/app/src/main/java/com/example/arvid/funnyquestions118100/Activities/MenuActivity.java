package com.example.arvid.funnyquestions118100.Activities;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Point;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.view.Window;
import android.widget.ImageView;

import com.example.arvid.funnyquestions118100.R;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;


public class MenuActivity extends Activity {

    ImageView menu_loga;
    public static int ArraySize = 10, nyttNr = 0, Qtal, längd, full = 0, räknare = 0, frågR = 0, c = 0, nCounter = 1;
    public static int[] sparadeQ = new int[ArraySize];
    public static ArrayList<Integer> backQ = new ArrayList<>();
    public static Boolean start = true, go = true, h = true;
    public static String dbQuestion, dbAnswer;
    static final String nCounterName = "notification_counter";

    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);

        menu_loga = (ImageView) findViewById(R.id.menu_loga);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int width = size.x;
        double scale = 1.77777777777777777777777777777777777777777777777778; // 16/9 - 50 decimaler
        int yScale = (int) (width / scale);
        Picasso.with(this).load(R.drawable.logo).resize(width, yScale).centerCrop().into(menu_loga);

        SharedPreferences prefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);
        nCounter = prefs.getInt(nCounterName, nCounter);
    }

    public void NextButtonClicked(View v) {
        startActivity(new Intent(MenuActivity.this, QuestionActivity.class));
    }

    public void OmMigClicked(View v) {
        startActivity(new Intent(MenuActivity.this, OmMigActivity.class));
    }

    public void SettingsClicked(View v) {
        startActivity(new Intent(MenuActivity.this, SettingsActivity.class));
    }
}