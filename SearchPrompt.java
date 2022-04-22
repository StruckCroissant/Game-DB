package game_search_engine;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridBagLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BoxLayout;
import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

/* This file provides the necessary components to let the user search for a game
 * and scroll through the results.
 */
class SearchPrompt extends JFrame implements ActionListener{
	/**
	 * This class provides the entire search prompt. Contained is both content frame/pane, as 
	 * well as the search header
	 */
	private static final long serialVersionUID = 6572630867752246054L;
	final private static EmptyBorder PANEL_PADDING = new EmptyBorder(10, 10, 10, 10);
	final private static Dimension PANEL_SIZE = new Dimension(400, 350);
	final private static Dimension ENTRY_SIZE = new Dimension(200, 20);
	final private static Dimension RESULTS_SIZE = new Dimension(600, 400);
	private static boolean running = false;
	
	public SearchPrompt(String name) {
		super(name);
		setResizable(false);
		createAndShowGUI();
	}// End SearchPrompt constructor
	
	private void initialize(final Container pane) {
		JPanel searchPanel = new JPanel();
		//searchPanel.setSize(PANEL_SIZE);
		//searchPanel.setBorder(PANEL_PADDING);
		searchPanel.setBackground(Color.DARK_GRAY);// Color for debug
		
		JPanel resultsPanel = new JPanel();
		//resultsPanel.setSize(PANEL_SIZE);
		//resultsPanel.setBorder(PANEL_PADDING);
		resultsPanel.setBackground(Color.GRAY);// Color for debug
		
		JTextField searchEntry = new JTextField(10);
		//Dimension entrySize = searchEntry.getPreferredSize();
		//searchEntry.setMaximumSize(ENTRY_SIZE);
		
		JButton searchBtn = new JButton("Search");
		Dimension btnSize = searchBtn.getPreferredSize();
		searchBtn.addActionListener(this);
		
		GameList gameList = new GameList(300, new Dimension(600, 400));
		//gameList.setBackground(Color.GREEN);// Color for debug
		
		searchPanel.add(searchEntry);
		searchPanel.add(searchBtn);
		resultsPanel.add(gameList);
		
		pane.add(searchPanel, BorderLayout.PAGE_START);
		pane.add(resultsPanel, BorderLayout.CENTER);
	}// End initialize method
	
	private void createAndShowGUI() {
		running = true;
		SearchPrompt frame = this;
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		frame.initialize(frame.getContentPane());
		
		frame.pack();
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
	}// End createAndShowGUI method
	
	public static boolean isRunning() {
		return running;
		
	}// End isRunning getter method
	
	@Override
	public void actionPerformed(ActionEvent arg0) {
		// TODO Auto-generated method stub
		
	}// End actionPerformed method
	
	public static void main(String[] args) {
		/*
		javax.swing.SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				createAndShowGUI();
				
			}
		});
		*/
	}// End main method
}// End class searchPrompt


class GameList extends JScrollPane{
	/**
	 * This class lets the user scroll through the games returned by the search term
	 */
	private static final long serialVersionUID = -4636802661429750904L;
	private int rows = 0;
	
	public GameList(int rows, Dimension size){
		this.horizontalScrollBarPolicy = JScrollPane.HORIZONTAL_SCROLLBAR_NEVER;
		this.verticalScrollBarPolicy = JScrollPane.VERTICAL_SCROLLBAR_ALWAYS;
		this.rows = rows;
		initialize(size);
		
	}// End GameList constructor
	
	// Sets up the component
	private void initialize(Dimension size) {
		
		Container container = new Container();
		
		for(int i = 0; i < rows; i++) {
			GameComponent test = new GameComponent(size);
			container.add(test);
		}
		
		BoxLayout layout = new BoxLayout(container, BoxLayout.PAGE_AXIS);
		container.setLayout(layout);
		
		this.getViewport().setView(container);
		this.setPreferredSize(size);
	}// End initialize method
}// End GameList class


class GameComponent extends JPanel implements ActionListener{
	/**
	 * This class holds the game link inside the parent JScrollPane
	 */
	private static final long serialVersionUID = -8992687586269949368L;

	GameComponent(final Dimension size){
		initialize(size);
		
	}
	
	// Sets up the component
	private void initialize(final Dimension size) {
		JButton test = new JButton();
		// Dnamically alter the size of the component based on scroll panel size
		test.setPreferredSize(new Dimension(size.width - 30, 90));
		test.addActionListener(this);
		
		this.add(test);
		//this.setBackground(Color.GRAY);
		
	}// End initilize method
	
	// Listen for component click event & bring up the game details screen	
	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println(e.getSource());
		
	}// End actionPerformed method
}// End GameComponent class
