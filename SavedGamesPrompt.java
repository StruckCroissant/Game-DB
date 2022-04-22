package game_search_engine;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

/* This file provides the necessary components to show the user their previously saved games 
 *
 */
public class SavedGamesPrompt extends JFrame implements ActionListener{
	/**
	 * This class provides the entire user saved games prompt. Contained is both 
	 * content frame/pane, as well as the search header
	 */
	private static final long serialVersionUID = -1755271427504466108L;
	final private static EmptyBorder PANEL_PADDING = new EmptyBorder(10, 10, 10, 10);
	final private static Dimension PANEL_SIZE = new Dimension(400, 350);
	final private static Dimension ENTRY_SIZE = new Dimension(200, 20);
	final private static Dimension RESULTS_SIZE = new Dimension(600, 400);
	
	private JPanel headerPanel;
	private JPanel displayPanel;
	private JLabel userLabel;
	private JButton searchPromptBtn;
	private GameList gameList;
	private String username;
	private static boolean running = false;
	
	public SavedGamesPrompt(String name){
		super(name);
	}// End SaveGamesPrompt method
	
	private void initialize(final Container pane, String username) {
		JPanel headerPanel = new JPanel();
		//headerPanel.setSize(PANEL_SIZE);
		//headerPanel.setBorder(PANEL_PADDING);
		headerPanel.setBackground(Color.GRAY);
		headerPanel.setLayout(new GridLayout(0, 2));
		headerPanel.setBorder(new EmptyBorder(4, 4, 4, 4));
		
		String greetingMsg = username + "'s saved games";
		JLabel userLabel = new JLabel(greetingMsg);
		userLabel.setBorder(new EmptyBorder(6, 6, 6, 6));
		
		JButton searchPromptBtn = new JButton("Want to search for new games?");
		
		JPanel displayPanel = new JPanel();
		//displayPanel.setSize(PANEL_SIZE);
		//displayPanel.setBorder(PANEL_PADDING);
		displayPanel.setBackground(Color.WHITE);
		
		GameList gameList = new GameList(300, new Dimension(500, 300));
		gameList.setBackground(Color.GREEN);// Color for debug
		
		headerPanel.add(userLabel, BorderLayout.LINE_START);
		headerPanel.add(searchPromptBtn, BorderLayout.LINE_END);
		displayPanel.add(gameList);
		
		pane.add(headerPanel, BorderLayout.PAGE_START);
		pane.add(displayPanel, BorderLayout.CENTER);
	}// End initialize method
	
	private static void createAndShowGUI(String username) {
		running = true;
		SavedGamesPrompt frame = new SavedGamesPrompt("saved games");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		frame.initialize(frame.getContentPane(), username);
		
		frame.pack();
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
	}// End createAndShowGUI method
	
	public static boolean isRunning() {
		return running;
	}// End isRunning getter method

	public static void main(String[] args) {
		String username = "TESTUSERTESTUSER";
		
		javax.swing.SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				createAndShowGUI(username);
			}
		});
		
	}// End main method

	@Override
	public void actionPerformed(ActionEvent arg0) {
		// TODO Auto-generated method stub
		
	}// End actionPerformed method
}// End class SavedGamesPrompt
