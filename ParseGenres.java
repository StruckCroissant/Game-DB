package game_search_engine;

import java.io.*;
import java.util.*;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderHeaderAware;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.exceptions.CsvException;
import com.opencsv.exceptions.CsvValidationException;

/*	Author: Dakota
 *  Description: This code takes in the DB in the form of a tab delimited excel file. The data from
 *  			 the file is parsed & the gid & unique genre names are scraped from it. This file 
 *  			 builds a legend ArrayList which has every GID & its associated genres within a 
 *  			 nested String[] array.
 * 
 */
public class ParseGenres {
	private final static String filename = "C:\\Users\\dakot\\OneDrive\\Desktop\\Workspace\\Main\\src\\game_search_engine\\games-tab_delimit.txt";
	private final static String outputFilename = "C:\\Users\\dakot\\OneDrive\\Desktop\\Workspace\\Main\\src\\game_search_engine\\genres.txt";

	// Reads individual unique genres from game tuples
	public ArrayList<String> readGenresByStream() {
		ArrayList<String> genreList = new ArrayList<String>();
		BufferedReader br = null;

		// Read txt file for unique genre values
		try {
			br = new BufferedReader(new FileReader(filename));

			int headCols = br.readLine().split("\t").length - 1;
			int lastGid = -1;
			String nextLine = null;
			while ((nextLine = br.readLine()) != null) {
				String[] splitLine = nextLine.split("\t");
				final int genreColNum = 6;

				try {
					if (splitLine.length <= 0) {
						System.out.println("ERROR");
					}
					int gid = Integer.parseInt(splitLine[0]);
					int lineCols = splitLine.length;

					// Determine if valid entry by checking column count & gid against lastGid
					if (lineCols >= headCols && gid > lastGid) {
						lastGid = Integer.parseInt(splitLine[0]);

						if (!splitLine[genreColNum].equals("")) {
							String genreLine = splitLine[genreColNum];
							genreLine = genreLine.replace("\"", "");

							String[] genres = genreLine.split(",");

							for (String genre : genres) {
								if (genre.toCharArray()[0] == ' ') {
									genre = genre.substring(1);
								}

								if (!genreList.contains(genre)) {
									genreList.add(genre);
								}
							} // End for loop
						} // End 2nd nested if statement
					} // End 1st if statement
				} catch (NumberFormatException e) {
					// Catch continued game entry
					System.out.println("Skipping line - continued entry");
				} catch (ArrayIndexOutOfBoundsException e) {
					// Catch continued game entry
					System.out.println("Skipping line - continued entry");
				}
			}

			br.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return genreList;
	}// End readGenresByStream method

	// The method generates the GID -> Genre legend array
	public ArrayList<String[]> getGidGenrePairs() {
		ArrayList<String[]> pairs = new ArrayList<String[]>();
		BufferedReader br = null;

		try {
			br = new BufferedReader(new FileReader(filename));
			String nextLine = null;
			String[] firstLine = br.readLine().split("\t"); // Get column names
			int columns = firstLine.length - 1;

			pairs.add(null); // Move indexes forward to make gid begin @ 1
			while ((nextLine = br.readLine()) != null) {
				String[] splitLine = nextLine.split("\t");
				int gid = -1;

				try {
					if (splitLine.length >= columns && (gid = Integer.parseInt(splitLine[1])) != -1) {
						String genreLine = splitLine[6];

						if (!genreLine.equals("")) {
							genreLine = genreLine.replace("\"", "");
							String[] genres = genreLine.split(",");

							for (int i = 0; i < genres.length; i++) {
								String currGenre = genres[i];
								if (currGenre.substring(0, 1).equals(" ")) {
									currGenre = currGenre.substring(1);
								}
								genres[i] = currGenre;

							}

							pairs.add(genres);

						} else {
							pairs.add(null);

						} // End nested if-else statement

					} // End if statement
				} catch (NumberFormatException e) {
					// Catches continued game entry
					e.printStackTrace();

				}
			} // End while loop

			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return pairs;
	}// End getGidGenrePairs method

	public static void writeToFile(ArrayList<String> genres) {
		try {
			File outputFile = new File(outputFilename);
			FileWriter writer = new FileWriter(outputFile);

			for (String genre : genres) {
				writer.write(genre + "\n");

			}

			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}// End writeToFile method

	public static void main(String[] args) {
		ParseGenres parse = new ParseGenres();
		ArrayList<String[]> genresByGid = parse.getGidGenrePairs();

		
	}// End main method
}// End ParseGenres class
