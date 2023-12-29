package porv;

import java.awt.Graphics;

public class JPanel_prov extends javax.swing.JPanel {

    Smiley smile;
    int gladRäknare = 0, snällRäknare = 0;
    boolean glad = true, snäll = true;
    
    public JPanel_prov() {
        initComponents();
        smile = new Smiley(snäll, glad);
    }
    
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        smile.paint(g);
    }
    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        btn_elak = new javax.swing.JButton();
        btn_snäll = new javax.swing.JButton();

        btn_elak.setText("Glad/Ledsen");
        btn_elak.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_elakActionPerformed(evt);
            }
        });

        btn_snäll.setText("Snäll/Elak");
        btn_snäll.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_snällActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(btn_elak)
                .addGap(18, 18, 18)
                .addComponent(btn_snäll)
                .addContainerGap(24, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btn_elak)
                    .addComponent(btn_snäll))
                .addContainerGap(158, Short.MAX_VALUE))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void btn_elakActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_elakActionPerformed
    //glad eller ledsen
     gladRäknare++;
     if(gladRäknare%2 == 1) {
            smile.sättGlad(false);
        }
        else {
            smile.sättGlad(true);
        }
     repaint();
    }//GEN-LAST:event_btn_elakActionPerformed

    private void btn_snällActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_snällActionPerformed
    //snäll eller elak
     snällRäknare++;
     if(snällRäknare%2 == 1) {
            smile.sättSnäll(false);
        }
        else {
            smile.sättSnäll(true);
        }
     repaint();
    }//GEN-LAST:event_btn_snällActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btn_elak;
    private javax.swing.JButton btn_snäll;
    // End of variables declaration//GEN-END:variables
}
