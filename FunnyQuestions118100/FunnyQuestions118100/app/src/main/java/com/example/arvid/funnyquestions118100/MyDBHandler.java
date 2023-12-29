package com.example.arvid.funnyquestions118100;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.arvid.funnyquestions118100.Activities.MenuActivity;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class MyDBHandler extends SQLiteOpenHelper {

    private static final int DATABASE_VERSION = 2;
    private static final String DB_DIR = "/data/data/com.example.arvid.funnyquestions118100/databases/";
    private static final String DB_NAME = "productDB.db";
    private static String DB_PATH = DB_DIR + DB_NAME;
    private static String OLD_DB_PATH = DB_DIR + "old_" + DB_NAME;

    public static final String TABLE_PRODUCTS = "products";
    public static final String COLUMN_QUESTION = "question";
    public static final String COLUMN_ANSWER = "answer";
    public static final String COLUMN_ID = "_id";

    private boolean createDatabase = false;
    private boolean upgradeDatabase = false;

    private final Context myContext;

    public MyDBHandler(Context context) {
        super(context, DB_NAME, null, DATABASE_VERSION);
        myContext = context;
        DB_PATH = myContext.getDatabasePath(DB_NAME).getAbsolutePath();
    }

    public void initializeDataBase() {
        getWritableDatabase();

        if (createDatabase) {
            try {
                copyDataBase();
            } catch (IOException e) {
                throw new Error("Error copying database");
            }
        } else if (upgradeDatabase) {
            try {
                FileHelper.copyFile(DB_PATH, OLD_DB_PATH);
                copyDataBase();
            } catch (IOException e) {
                throw new Error("Error copying database");
            }
        }
    }

    private void copyDataBase() throws IOException {
        close();

        InputStream myInput = myContext.getAssets().open(DB_NAME);

        OutputStream myOutput = new FileOutputStream(DB_PATH);

        FileHelper.copyFile(myInput, myOutput);

        getWritableDatabase().close();
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        createDatabase = true;
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        upgradeDatabase = true;
    }

    @Override
    public void onOpen(SQLiteDatabase db) {
        super.onOpen(db);
    }

    public int getQtal() {
        //Slumpar ett nummer, det måste gå 5 nummer innan samma nummer kan bli valt igen.
        if (MenuActivity.start) {
            MenuActivity.Qtal = (int) Math.floor(Math.random() * MenuActivity.ArraySize) + 1;
            MenuActivity.sparadeQ[0] = MenuActivity.Qtal;
            MenuActivity.start = false;
        } else {
            MenuActivity.längd = 0;
            for (int a = 0; a < MenuActivity.ArraySize; a++) {
                if (MenuActivity.sparadeQ[a] != 0) {
                    MenuActivity.längd++;
                }
            }
            MenuActivity.Qtal = (int) Math.floor(Math.random() * MenuActivity.ArraySize) + 1;
            for (int i = 0; i < MenuActivity.längd; i++) {
                if (MenuActivity.Qtal == MenuActivity.sparadeQ[i]) {
                    MenuActivity.Qtal = (int) Math.floor(Math.random() * MenuActivity.ArraySize) + 1;
                    i = -1;
                    MenuActivity.nyttNr = 0;
                } else {
                    MenuActivity.nyttNr++;
                }
                if (MenuActivity.nyttNr == MenuActivity.längd) {
                    MenuActivity.nyttNr = 0;
                    if (MenuActivity.längd >= (MenuActivity.ArraySize / 2) /*<-- Hur många gånger ska man vänta till samma fråga kommer igen.*/) {
                        MenuActivity.sparadeQ[MenuActivity.full] = MenuActivity.Qtal;
                        MenuActivity.full++;
                    } else {
                        MenuActivity.sparadeQ[i + 1] = MenuActivity.Qtal;
                    }
                    if (MenuActivity.full == MenuActivity.ArraySize / 2) {
                        MenuActivity.full = 0;
                    }
                }
            }
        }
        if (MenuActivity.räknare == MenuActivity.backQ.size()) {
            MenuActivity.backQ.add(MenuActivity.Qtal);
        }
        return MenuActivity.Qtal;
    }

    public String getQuestion(int q) {
        if (MenuActivity.räknare != MenuActivity.backQ.size()) {
            q = MenuActivity.backQ.get(MenuActivity.räknare);
        } else {
            q = getQtal();
            MenuActivity.frågR++;
        }

        SQLiteDatabase db = getWritableDatabase();
        String query = "SELECT " + COLUMN_QUESTION + " FROM " + TABLE_PRODUCTS + " WHERE " + COLUMN_ID + "=" + q;
        Cursor c = db.rawQuery(query, null);
        c.moveToFirst();
        String dbString = c.getString(c.getColumnIndex("question"));
        db.close();
        c.close();

        return dbString;
    }

    public String getAnswer(int q) {
        if (MenuActivity.räknare != MenuActivity.backQ.size()) {
            q = MenuActivity.backQ.get(MenuActivity.räknare);
        }

        SQLiteDatabase db = getWritableDatabase();
        String query = "SELECT " + COLUMN_ANSWER + " FROM " + TABLE_PRODUCTS + " WHERE " + COLUMN_ID + "=" + q;
        Cursor c = db.rawQuery(query, null);
        c.moveToFirst();
        String dbString = c.getString(c.getColumnIndex("answer"));
        db.close();
        c.close();

        return dbString;
    }
}
