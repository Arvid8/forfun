package com.example.arvid.funnyquestions118100.Activities;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.EditText;
import android.widget.RelativeLayout;

import com.example.arvid.funnyquestions118100.R;

public class SettingsActivity extends AppCompatActivity {

    static final String storlekName = "FONT_SIZE";
    EditText settings_storlek;
    RelativeLayout settings_rel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        settings_storlek = (EditText) findViewById(R.id.settings_storlek);
        settings_rel = (RelativeLayout) findViewById(R.id.settings_rel);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        SharedPreferences prefs = getSharedPreferences("SettingsPrefs", MODE_PRIVATE);
        int font_size = prefs.getInt(storlekName, 22);
        settings_storlek.setText(Integer.toString(font_size));

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        int save_font_size = Integer.parseInt(settings_storlek.getText().toString());
        SharedPreferences.Editor editor = getSharedPreferences("SettingsPrefs", MODE_PRIVATE).edit();
        editor.putInt(storlekName, save_font_size);
        editor.apply();
    }

    @Override
    protected void onResume() {
        super.onResume();

        settings_storlek.clearFocus();
        settings_rel.requestFocus();
    }

}

