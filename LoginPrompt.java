package game_search_engine;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

class LoginPrompt implements ActionListener{
	private static EmptyBorder PANEL_PADDING = new EmptyBorder(10, 10, 10, 10);
	private static Dimension ENTRY_SIZE = new Dimension(200, 20);
	private static Dimension PANEL_SIZE = new Dimension(200, 100);
	
	private JLabel usernameLabel;
	private JFrame login;
	private JTextField loginEntry;
	private JButton loginBtn;
	private JPanel loginPanel;
	private String username;
	private static Boolean running = false;
	
	public LoginPrompt(){
		initialize();
		
	}// End LoginPrompt constructor
	
	private void initialize() {
		running = true;
		usernameLabel = new JLabel("Username:   ");

		login = new JFrame("Login");
		login.setResizable(false);
		login.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		loginEntry = new JTextField(8);
		loginEntry.setMaximumSize(ENTRY_SIZE);
		loginEntry.setAlignmentY(JComponent.CENTER_ALIGNMENT);;

		loginBtn = new JButton("Login");
		loginBtn.addActionListener(this);
		
		loginPanel = new JPanel();
		loginPanel.setBorder(PANEL_PADDING);
		loginPanel.setPreferredSize(PANEL_SIZE);

		loginPanel.add(usernameLabel, BorderLayout.LINE_START);
		loginPanel.add(loginEntry, BorderLayout.CENTER);
		loginPanel.add(loginBtn, BorderLayout.LINE_END);
		login.getContentPane().add(loginPanel);
		
		loginPanel.validate();
		login.pack();
		login.setLocationRelativeTo(null);
		login.setVisible(true);
	}// End initialize method
	
	public String getUsername() {
		return username;
	}// end getUsername method
	
	public static boolean isRunning() {
		return running;
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		//System.out.println(loginEntry.getText());
		username = loginEntry.getText();
		login.setVisible(false);
		login.dispose();
		running = false;
	}// End actionPerformed inherited method
	
	/*
	public static void main(String[] args) {
		javax.swing.SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				initialize();
			}
		});
	}
	*/
}
