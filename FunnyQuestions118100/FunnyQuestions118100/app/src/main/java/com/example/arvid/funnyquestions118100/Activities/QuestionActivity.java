package com.example.arvid.funnyquestions118100.Activities;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.SharedPreferences;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Point;
import android.os.Bundle;
import android.os.Handler;
import android.text.ClipboardManager;
import android.text.method.ScrollingMovementMethod;
import android.view.Display;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.arvid.funnyquestions118100.MyDBHandler;
import com.example.arvid.funnyquestions118100.R;

public class QuestionActivity extends Activity {

    TextView L2_questionText, L2_answerText, L2_counter, space;
    RelativeLayout rel;
    Button L2_nextButton, L2_backButton;
    MyDBHandler myDbHelper;
    public static Toast toastShow;
    Runnable backR, nextR;
    Handler backH, nextH;
    int Qtal = 0, nextC = 400, backC = 400;
    boolean backE = false, nextE = false;

    SQLiteDatabase myDb = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);

        myDbHelper = new MyDBHandler(this);
        myDbHelper.initializeDataBase();

        try {
            myDb = myDbHelper.getWritableDatabase();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                myDbHelper.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            } finally {
                myDb.close();
            }
        }

        //Hittar och definerar alla objekt
        L2_nextButton = (Button) findViewById(R.id.l2_nextButton);
        L2_backButton = (Button) findViewById(R.id.l2_backButton);
        L2_questionText = (TextView) findViewById(R.id.l2_questionText);
        L2_answerText = (TextView) findViewById(R.id.l2_answerText);
        L2_counter = (TextView) findViewById(R.id.counter);
        space = (TextView) findViewById(R.id.space);
        rel = (RelativeLayout) findViewById(R.id.rel);

        //Gör texten scrollbar
        L2_answerText.setMovementMethod(new ScrollingMovementMethod());
        L2_questionText.setMovementMethod(new ScrollingMovementMethod());

        //Sätter textstorlek från inställningar
        SharedPreferences prefs = getSharedPreferences("SettingsPrefs", MODE_PRIVATE);
        int font_size = prefs.getInt("FONT_SIZE", 22);
        L2_answerText.setTextSize(font_size);
        L2_questionText.setTextSize(font_size);

        //region Button_lyssnare
        nextH = new Handler();
        nextR = new Runnable() {
            @Override
            public void run() {
                nextE = false;
                nextQuestion();
                L2_answerText.scrollTo(0, 0);
                L2_questionText.scrollTo(0, 0);
                nextH.postDelayed(nextR, nextC);
                if (nextC > 100) {
                    nextC -= 25;
                }
            }
        };

        L2_nextButton.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        nextE = true;
                        nextH.postDelayed(nextR, 500);
                        break;
                    case MotionEvent.ACTION_UP:
                        nextC = 400;
                        if (nextE) {
                            nextQuestion();
                            L2_answerText.scrollTo(0, 0);
                            L2_questionText.scrollTo(0, 0);
                        }
                        nextH.removeCallbacks(nextR);
                        break;
                }
                return false;
            }
        });

        backH = new Handler();
        backR = new Runnable() {
            @Override
            public void run() {
                backE = false;
                backQuestion();
                L2_answerText.scrollTo(0, 0);
                L2_questionText.scrollTo(0, 0);
                backH.postDelayed(backR, backC);
                if (backC > 100) {
                    backC -= 25;
                }
            }
        };

        L2_backButton.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        backE = true;
                        backH.postDelayed(backR, 500);
                        break;
                    case MotionEvent.ACTION_UP:
                        backC = 400;
                        if (backE) {
                            backQuestion();
                            L2_answerText.scrollTo(0, 0);
                            L2_questionText.scrollTo(0, 0);
                        }
                        backH.removeCallbacks(backR);
                        break;
                }
                return false;
            }
        });

        space.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                L2_answerText.scrollTo(0, 0);
                L2_questionText.scrollTo(0, 0);
                nextQuestion();
            }
        });

        rel.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                L2_answerText.scrollTo(0, 0);
                L2_questionText.scrollTo(0, 0);
                nextQuestion();
            }
        });

        L2_answerText.setOnLongClickListener(new View.OnLongClickListener() {
            public boolean onLongClick(View v) {
                copyAShit();
                return false;
            }
        });

        L2_questionText.setOnLongClickListener(new View.OnLongClickListener() {
            public boolean onLongClick(View v) {
                copyQShit();
                return false;
            }
        });
        //endregion

        //Visar en fråga och ett svar när man startar appen
        if (MenuActivity.go) {
            nextQuestion();
        } else {
            L2_counter.setText(Integer.toString(MenuActivity.c) + "/" + Integer.toString(MenuActivity.frågR));
            L2_questionText.setText(MenuActivity.dbQuestion);
            L2_answerText.setText(MenuActivity.dbAnswer);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        MenuActivity.go = false;
    }

    @Override
    protected void onPause() {
        super.onPause();
        SharedPreferences.Editor editor = getSharedPreferences("MyPrefs", MODE_PRIVATE).edit();
        editor.putInt(MenuActivity.nCounterName, MenuActivity.nCounter);
        editor.apply();
    }

    public void showToast(Activity actRef) {
        if ((toastShow == null) || (toastShow.getView().getWindowVisibility() != View.VISIBLE)) {
            Display display = getWindowManager().getDefaultDisplay();
            Point size = new Point();
            display.getSize(size);
            int height = size.y;

            toastShow = Toast.makeText(actRef, "Du kan inte gå tillbaka mer", Toast.LENGTH_SHORT);
            toastShow.setGravity(Gravity.CENTER, 0, height / 4);
            toastShow.show();
        }
    }

    public void nextQuestion() {
        if (!MenuActivity.h) {
            MenuActivity.räknare++;
        }
        MenuActivity.h = true;
        MenuActivity.dbQuestion = myDbHelper.getQuestion(Qtal);
        MenuActivity.dbAnswer = myDbHelper.getAnswer(Qtal);
        L2_questionText.setText(MenuActivity.dbQuestion);
        L2_answerText.setText(MenuActivity.dbAnswer);
        MenuActivity.räknare++;
        MenuActivity.c++;
        setCounter();
    }

    public void backQuestion() {
        if (MenuActivity.h) {
            MenuActivity.räknare--;
        }
        MenuActivity.h = false;
        if (MenuActivity.räknare == 0) {
            showToast(this);
        } else {
            if (MenuActivity.nCounter == 5) {
                new AlertDialog.Builder(this).setTitle("Tips!").setMessage
                        ("Du vet att du kan hålla ner \"TILLBAKA\" och \"NÄSTA FRÅGA\" för att gå igenom frågorna snabbare.")
                        .setNeutralButton("Stäng", null).setCancelable(false).show();
                MenuActivity.nCounter++;
            } else if (MenuActivity.nCounter < 5) {
                MenuActivity.nCounter++;
            }
            MenuActivity.räknare--;
            MenuActivity.dbQuestion = myDbHelper.getQuestion(Qtal);
            MenuActivity.dbAnswer = myDbHelper.getAnswer(Qtal);
            L2_questionText.setText(MenuActivity.dbQuestion);
            L2_answerText.setText(MenuActivity.dbAnswer);
            MenuActivity.c--;
            setCounter();
        }
    }

    public void setCounter() {
        L2_counter.setText(Integer.toString(MenuActivity.c) + "/" + Integer.toString(MenuActivity.frågR));
    }

    public void copyAShit() {
        ((ClipboardManager) getSystemService(CLIPBOARD_SERVICE)).setText(MenuActivity.dbAnswer);
        String send = "Svaret har kopierats till urklipp.";
        copyToast(this, send);
    }

    public void copyQShit() {
        ((ClipboardManager) getSystemService(CLIPBOARD_SERVICE)).setText(MenuActivity.dbQuestion);
        String send = "Frågan har kopierats till urklipp.";
        copyToast(this, send);
    }

    public void copyToast(Activity actRef, String text) {
        if ((toastShow == null) || (toastShow.getView().getWindowVisibility() != View.VISIBLE)) {
            Display display = getWindowManager().getDefaultDisplay();
            Point size = new Point();
            display.getSize(size);
            int height = size.y;

            toastShow = Toast.makeText(actRef, text, Toast.LENGTH_SHORT);
            toastShow.setGravity(Gravity.CENTER, 0, height / 4);
            toastShow.show();
        }
    }
}