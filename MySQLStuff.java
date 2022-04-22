package game_search_engine;

import java.beans.Statement;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class MySQLStuff {
	static final String databasePrefix = "cs366-2217_vaughndh15";
	static final String netID = "vaughndh15";
	static final String hostName = "washington.uww.edu";
	static final String databaseURL = "jdbc:mariadb://" + hostName + "/" + databasePrefix;
	static final String password = "dv7763";

	private Connection connection = null;

	public void Connection() {

		try {
			Class.forName("org.mariadb.jdbc.Driver");
			System.out.println("databaseURL" + databaseURL);
			connection = DriverManager.getConnection(databaseURL, netID, password);
			System.out.println("Successfully connected to the database");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	} // End Connection method

	public ArrayList<String> getGenresFromServer() {
		String result = "";
		ResultSet resultSet = null;
		String query = "select * from Genre;";
		ArrayList<String> genres = new ArrayList<String>();

		try {
			java.sql.Statement statement = connection.createStatement();
			resultSet = statement.executeQuery(query);

			ResultSetMetaData metaData = resultSet.getMetaData();
			int columns = metaData.getColumnCount();

			genres.add("");
			int i = 2;
			while (resultSet.next()) {
				String genreName = resultSet.getString(i);
				genres.add(genreName);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return genres;
	}// End getGenresFromServer method

	public void writeGenres(ArrayList<String[]> pairs, ArrayList<String> legend) {
		java.sql.Statement statement = null;
		CallableStatement callStmt = null;

		try {
			statement = connection.createStatement();
			callStmt = connection.prepareCall("{call insertGenre(?, ?)}");
			connection.setAutoCommit(false);
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		for (int gid = 1; gid <= pairs.size(); gid++) {
			System.out.println("Current GID = " + gid);

			try {
				for (int i = 0; i <= pairs.get(gid).length; i++) {
					try {
						String genre = pairs.get(gid)[i];
						int genre_id = legend.indexOf(genre) + 1;

						callStmt.setInt(1, gid);
						callStmt.setInt(2, genre_id);
						callStmt.executeQuery();
					} catch (SQLIntegrityConstraintViolationException e) {
						System.out.println("Duplicate value - skipping");

					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			} catch (NullPointerException e) {
				// Catch null entry - put nothing
				System.out.println("Null entry detected - skipping to next tuple");

			}
		} // End for loop
	}// End writeGenres method

	public void writeSelfRelations(List<List<Integer>> relations, int offset) {
		java.sql.Statement statement = null;
		CallableStatement callStmt = null;

		try {
			statement = connection.createStatement();
			callStmt = connection.prepareCall("{call insertSelfRelations(?, ?)}");

		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		for (int i = 0; i < relations.size(); i++) {
			List<Integer> relatedGids = relations.get(i);
			int gid1 = i + offset;
			
			try {
				for (int gid2 : relatedGids) {
					System.out.println("Writing relation (" + gid1 + " -> " + gid2 + ")");
					callStmt.setInt(1, gid1);
					callStmt.setInt(2, gid2);
					callStmt.addBatch();
					
				}
				
			} catch (NullPointerException e) {
				// Catch null entry - put nothing
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		System.out.println("Executing batch index (" + offset + ") write");
		try {
			callStmt.executeBatch();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


}// End MySQLStuff class