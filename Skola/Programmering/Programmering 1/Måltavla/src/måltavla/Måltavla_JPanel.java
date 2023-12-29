
package måltavla;

import java.awt.*;


public class Måltavla_JPanel extends javax.swing.JPanel {

    Måltavla målet;
    Sikte siktet;
    
    public Måltavla_JPanel() {
        initComponents();
        målet = new Måltavla(200, 150,(Integer.valueOf(txtf_radie.getText())));
        siktet = new Sikte(200, 150, 20);   
    }
    
    // Metoder
    @Override
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        målet.rita(g);
        siktet.rita(g);
        
    }
    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        btn_sättRadie = new javax.swing.JButton();
        txtf_radie = new javax.swing.JTextField();
        jlb_varning = new javax.swing.JLabel();
        jlb_error = new javax.swing.JLabel();

        setForeground(new java.awt.Color(255, 255, 0));
        addMouseMotionListener(new java.awt.event.MouseMotionAdapter() {
            public void mouseMoved(java.awt.event.MouseEvent evt) {
                formMouseMoved(evt);
            }
        });

        btn_sättRadie.setText("Sätt Radie");
        btn_sättRadie.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_sättRadieActionPerformed(evt);
            }
        });

        txtf_radie.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtf_radieActionPerformed(evt);
            }
        });

        jlb_varning.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        jlb_varning.setText("Varning! Max 300!");

        jlb_error.setFont(new java.awt.Font("Tahoma", 1, 48)); // NOI18N
        jlb_error.setForeground(new java.awt.Color(255, 0, 0));
        jlb_error.setHorizontalAlignment(javax.swing.SwingConstants.LEFT);
        jlb_error.setAutoscrolls(true);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(139, 139, 139)
                .addComponent(jlb_varning)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(95, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(txtf_radie, javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(40, 40, 40)
                        .addComponent(btn_sättRadie)
                        .addGap(102, 102, 102))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(jlb_error, javax.swing.GroupLayout.PREFERRED_SIZE, 214, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(82, 82, 82))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addGap(70, 70, 70)
                .addComponent(jlb_error, javax.swing.GroupLayout.PREFERRED_SIZE, 84, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 134, Short.MAX_VALUE)
                .addComponent(jlb_varning)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btn_sättRadie)
                    .addComponent(txtf_radie, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap())
        );
    }// </editor-fold>//GEN-END:initComponents

    private void txtf_radieActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtf_radieActionPerformed
    
    }//GEN-LAST:event_txtf_radieActionPerformed

    private void btn_sättRadieActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_sättRadieActionPerformed
    if (( Integer.valueOf(txtf_radie.getText()) > 300) || ( Integer.valueOf(txtf_radie.getText()) <= 0)){
        målet.sättR(0);
        jlb_varning.setText("Varning, max 300!");
        jlb_error.setText("ERROR!");
    }
    else {
        jlb_error.setText("");
        målet.sättR(Integer.valueOf(txtf_radie.getText()));
    }
    repaint();
    }//GEN-LAST:event_btn_sättRadieActionPerformed

    private void formMouseMoved(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_formMouseMoved
    siktet.sättX(evt.getX());
    siktet.sättY(evt.getY());
    repaint();
    }//GEN-LAST:event_formMouseMoved

    

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btn_sättRadie;
    private javax.swing.JLabel jlb_error;
    private javax.swing.JLabel jlb_varning;
    private javax.swing.JTextField txtf_radie;
    // End of variables declaration//GEN-END:variables
}
