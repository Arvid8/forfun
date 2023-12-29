/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Skjutbana;
import java.awt.*;
/**
 *
 * @author Admin15538
 */
public class Måltavala_JPanel extends javax.swing.JPanel {

    Måltaval målet;
    Sikte siktet;
    Skott skott;
    Skott[] träffar;
    Ljud ljud;
    
    int plus, antal = 0;
    Boolean rätt=false, visa=false;
    
    public Måltavala_JPanel() {
        initComponents();
        målet = new Måltaval(400, 300, 200);
        siktet = new Sikte(400, 300, 20);
        skott = new Skott(400, 300, 10);
        träffar = new Skott[10];
        
        txfRadie.setText("200");
        lbpåav.setText("AV");
        skott.sättRadie(målet.hämtaRadie());
    }

    public void paintComponent(Graphics g){
        super.paintComponent(g);
        
        målet.rita(g);
        siktet.rita(g);
        if(antal != 0){skott.rita(g);}
       
        for(int i = 0; i < antal; i++){
            träffar[i].sättRadie(skott.hämtaRadie());
            träffar[i].rita(g);
        }
        
       }
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        btnSättRadie = new javax.swing.JButton();
        txfRadie = new javax.swing.JTextField();
        btnFelmarginal = new javax.swing.JButton();
        lbpåav = new javax.swing.JLabel();
        btn_Rensa = new javax.swing.JButton();

        addMouseMotionListener(new java.awt.event.MouseMotionAdapter() {
            public void mouseMoved(java.awt.event.MouseEvent evt) {
                formMouseMoved(evt);
            }
        });
        addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                formMouseClicked(evt);
            }
        });

        btnSättRadie.setText("Sätt radie");
        btnSättRadie.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnSättRadieActionPerformed(evt);
            }
        });

        btnFelmarginal.setText("Felmarginal");
        btnFelmarginal.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnFelmarginalActionPerformed(evt);
            }
        });

        btn_Rensa.setText("Rensa");
        btn_Rensa.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_RensaActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addGap(73, 73, 73)
                .addComponent(txfRadie, javax.swing.GroupLayout.PREFERRED_SIZE, 73, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(btnSättRadie)
                .addGap(86, 86, 86)
                .addComponent(btn_Rensa, javax.swing.GroupLayout.PREFERRED_SIZE, 72, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 121, Short.MAX_VALUE)
                .addComponent(btnFelmarginal)
                .addGap(166, 166, 166))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(lbpåav, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(182, 182, 182))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(540, Short.MAX_VALUE)
                .addComponent(lbpåav, javax.swing.GroupLayout.PREFERRED_SIZE, 20, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btnSättRadie)
                    .addComponent(txfRadie, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnFelmarginal)
                    .addComponent(btn_Rensa))
                .addContainerGap())
        );
    }// </editor-fold>//GEN-END:initComponents

    private void btnSättRadieActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnSättRadieActionPerformed
        målet.sättRadie(Integer.valueOf(txfRadie.getText()));
        skott.sättRadie(målet.hämtaRadie());
        repaint(); 
    }//GEN-LAST:event_btnSättRadieActionPerformed

    private void formMouseMoved(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_formMouseMoved
        siktet.sättX(evt.getX());
        siktet.sättY(evt.getY());
        repaint();
    }//GEN-LAST:event_formMouseMoved

    private void formMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_formMouseClicked
        skott.sättX(evt.getX());
        skott.sättY(evt.getY());
        
        if (rätt){
        skott.sättFelY((int)(((Math.random()*målet.hämtaRadie()/5)+1))-målet.hämtaRadie()/10);
        skott.sättFelX((int)(((Math.random()*målet.hämtaRadie()/5)+1))-målet.hämtaRadie()/10);
        }
        else {
        skott.sättFelY(0);
        skott.sättFelX(0);
        }
        if(antal==10)antal=0;
        träffar[antal] = new Skott(evt.getX()+skott.hämtaFelX(),evt.getY()+skott.hämtaFelY(),skott.hämtaRadie());
        antal++;
        repaint();
    }//GEN-LAST:event_formMouseClicked

    private void btnFelmarginalActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnFelmarginalActionPerformed
        plus++;
        if(plus%2 == 1) {
            rätt = true;
            lbpåav.setText("PÅ");
        }
        else {
            rätt = false;
            lbpåav.setText("AV");
        }
    }//GEN-LAST:event_btnFelmarginalActionPerformed

    private void btn_RensaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_RensaActionPerformed
        antal = 0;
        skott.sättX(1000000);
        skott.sättY(1000000);
        repaint();
    }//GEN-LAST:event_btn_RensaActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnFelmarginal;
    private javax.swing.JButton btnSättRadie;
    private javax.swing.JButton btn_Rensa;
    private javax.swing.JLabel lbpåav;
    private javax.swing.JTextField txfRadie;
    // End of variables declaration//GEN-END:variables
}
