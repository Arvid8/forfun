/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package figur;
import java.awt.*;
/**
 *
 * @author Arvid Persson
 */
public class Figur_JPanel extends javax.swing.JPanel {
    private String figur = "rektangel";
    /**
     * Creates new form Figur_JPanel
     */
    public Figur_JPanel() {
        initComponents();
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        btn_rektangel = new javax.swing.JButton();
        btn_elips = new javax.swing.JButton();

        btn_rektangel.setText("Rektangel");
        btn_rektangel.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_rektangelActionPerformed(evt);
            }
        });

        btn_elips.setText("Elips");
        btn_elips.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_elipsActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(89, 89, 89)
                .addComponent(btn_rektangel)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 133, Short.MAX_VALUE)
                .addComponent(btn_elips, javax.swing.GroupLayout.PREFERRED_SIZE, 78, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(90, 90, 90))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(56, 56, 56)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btn_rektangel, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btn_elips, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(262, Short.MAX_VALUE))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void btn_rektangelActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_rektangelActionPerformed
    figur = "rektangel";
    repaint();
    }//GEN-LAST:event_btn_rektangelActionPerformed

    private void btn_elipsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_elipsActionPerformed
    figur = "elips";
    repaint();
    }//GEN-LAST:event_btn_elipsActionPerformed
    protected void paintComponent(Graphics g){
        super.paintComponent(g);
        if (figur.equals("rektangel")){
            g.setColor(Color.red);
            g.fillRect(190, 200, 100, 80);
        }
        else if (figur.equals("elips")){
            g.setColor(Color.cyan);
            g.fillOval(190, 200, 100, 80);
            
        }
        Color minFärg = new Color(0,0,0);
        g.setColor(minFärg);
        g.drawRect(190, 200, 100, 80);
    }


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btn_elips;
    private javax.swing.JButton btn_rektangel;
    // End of variables declaration//GEN-END:variables
}