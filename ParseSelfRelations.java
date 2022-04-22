package game_search_engine;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ParseSelfRelations {
	// Creates gid self-relations based on the MATCH_PREDICATE
	public List<List<Integer>> parse(ArrayList<String[]> genresByGid, int startGid, int endGid) {

		List<List<Integer>> selfRelations = new ArrayList<List<Integer>>();
		for (int gid1 = 0 + startGid; gid1 < endGid; gid1++) {
			System.out.println("Current gid = " + gid1);
			String[] gArray1 = genresByGid.get(gid1);

			List<Integer> relatedGids = new ArrayList<Integer>();
			if (gArray1 != null) {
				int arr1Len = gArray1.length;

				for (int gid2 = 1; gid2 < genresByGid.size(); gid2++) {
					String[] gArray2 = genresByGid.get(gid2);

					if (gid2 != gid1 && gArray2 != null) {
						int arr2Len = gArray2.length;
						int genreMatches = 0;

						for (String genre1 : gArray1) {
							for (String genre2 : gArray2) {
								if (genre2.equals(genre1)) {
									genreMatches++;
									break;

								}
							}
						}

						final boolean MATCH_PREDICATE = genreMatches >= 2
								|| (genreMatches == 1 && (arr1Len == 1 || arr2Len == 1));
						if (MATCH_PREDICATE) {
							relatedGids.add(gid2);

						}
					}
				}

			}

			selfRelations.add(relatedGids);
		}

		return selfRelations;
	}

	public List<List<Integer>> parse(ArrayList<String[]> genresByGid) {

		List<List<Integer>> selfRelations = new ArrayList<List<Integer>>();
		for (int gid1 = 1; gid1 < genresByGid.size(); gid1++) {
			System.out.println("Current gid = " + gid1);
			String[] gArray1 = genresByGid.get(gid1);
			
			List<Integer> relatedGids = new ArrayList<Integer>();
			if (gArray1 != null) {
				int arr1Len = gArray1.length;

				for (int gid2 = 1; gid2 < genresByGid.size(); gid2++) {
					
					String[] gArray2 = genresByGid.get(gid2);

					if (gid2 != gid1 && gArray2 != null) {
						int arr2Len = gArray2.length;
						int genreMatches = 0;

						for (String genre1 : gArray1) {
							for (String genre2 : gArray2) {
								if (genre2.equals(genre1)) {
									genreMatches++;
									break;

								}
							}
						}

						final boolean MATCH_PREDICATE = genreMatches >= 2
								|| (genreMatches == 1 && (arr1Len == 1 || arr2Len == 1));
						if (MATCH_PREDICATE) {
							relatedGids.add(gid2);

						}
					}
				}

			}

			selfRelations.add(relatedGids);
		}

		return selfRelations;
	}

	public static void main(String[] args) {
		String Filename1 = "E:\\Big ass csv\\SelfRelations.csv";
		File file1 = new File(Filename1);
		ParseGenres parseGenres = new ParseGenres();
		ArrayList<String[]> genresByGid = parseGenres.getGidGenrePairs();

		ParseSelfRelations psr = new ParseSelfRelations();
		List<List<Integer>> relations = null;

		try {
			BufferedWriter br = new BufferedWriter(new FileWriter(file1));

			int startGid1 = 0;
			int endGid1 = 4000;
			relations = psr.parse(genresByGid, startGid1, endGid1);

			for (int i = 0; i < relations.size(); i++) {
				List<Integer> relatedGids = relations.get(i);
				
				try {
					for (int relatedGid : relatedGids) {
						int gid = i + startGid1;
						
						String line = gid + "," + relatedGid;
						br.write(line + "\n");
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			br.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
