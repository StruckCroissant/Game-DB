package game_search_engine;

import java.awt.AWTEvent;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Panel;
import java.awt.event.AWTEventListener;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.function.Consumer;

import javax.swing.*;
import javax.swing.GroupLayout.Alignment;
import javax.swing.border.EmptyBorder;

public class GUI {
	/**
	 * This method provides the framework for the DBMS game search/recommendation
	 * application
	 * 
	 */
	private ArrayList<String> users = new ArrayList<String>();
	
	public String getUsernameFromPrompt() {
		LoginPrompt login = new LoginPrompt();
		
		// Force thread to wait for user input on login screen
				while(login.isRunning()) {
					try {
						Thread.sleep(200);
					} catch(InterruptedException e) {
					}
				}
				
		return login.getUsername();
	}
	
	public Boolean userRegistered(String username) {
		return users.contains(username);
	}
	
	public void addUser(String username) {
		users.add(username);
	}
	
	public static void main(String[] args) {
		GUI gui = new GUI();
		
		String username = gui.getUsernameFromPrompt();
		if(!gui.userRegistered(username)) {
			gui.addUser(username);
			
		}
	}
	
}// End class GUI
