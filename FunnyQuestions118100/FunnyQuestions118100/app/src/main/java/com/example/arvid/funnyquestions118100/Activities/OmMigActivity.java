package com.example.arvid.funnyquestions118100.Activities;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.view.Window;
import android.widget.TextView;

import com.example.arvid.funnyquestions118100.R;

public class OmMigActivity extends Activity {

    TextView presentation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_om_mig);

        presentation = (TextView) findViewById(R.id.presentation);

        presentation.setMovementMethod(new ScrollingMovementMethod());

        SharedPreferences prefs = getSharedPreferences("SettingsPrefs", MODE_PRIVATE);
        int font_size = prefs.getInt("FONT_SIZE", 22);
        presentation.setTextSize(font_size);

    }
}
