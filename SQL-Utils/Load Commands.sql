/* MariaDB auth info:
 * Username: vaughndh15
 * pass: dv7763
*/

/* ---START TABLE LOAD COMMANDS---
*  Description:
*   This file describes the table creation & load commands for the server.
*   Tables which are loaded directly via SQL code have paired `LOAD DATA LOCAL...`
*   commands following the table creation commands.
*
*  Legend:
*  FULLY IMPLEMENTED means that the change has been successfully written to the table
*  NEEDS IMPLEMENTATION means that the change needs to be written to the db
*/

/* Start Game load commands
*  FULLY IMPLEMENTED
*/
CREATE TABLE Game (
  gid INT,
  gname VARCHAR(255),
  cost VARCHAR(255)
    NOT NULL,
  discounted_cost VARCHAR(255),
  url VARCHAR(255),
  age_rating VARCHAR(255),
  specs VARCHAR(255),
  indie INT,
  description VARCHAR(7000),
  rdate VARCHAR(255),
  rawgId FLOAT,
  PRIMARY KEY (gid)
);
-- Implemented
LOAD DATA LOCAL INFILE 'games.csv' INTO TABLE Game
  FIELDS TERMINATED BY ',' ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (@id, gid, gname, rawgId, url, @metacritic, @genres, indie, @presence, @platform, @graphics,
   @storage, @memory, @ratings, rdate, @soundtrack, @franchise, cost, discounted_cost,
   @players, @controller, @languages, age_rating, @achievements, @publisher, description,
   @tags)
;
/*  End Game load commands
*/

/* Start franchise load commands
*  FULLY IMPLEMENTED
*/
CREATE TABLE Franchise(
  gid INT
    NOT NULL,
  fname VARCHAR(255),
  PRIMARY KEY (gid, fname),
  FOREIGN KEY (gid)
    REFERENCES Game(gid)
  ON DELETE CASCADE
);
-- Implemented
LOAD DATA LOCAL INFILE 'games.csv' INTO TABLE Franchise
  FIELDS TERMINATED BY ',' ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (@id, gid, @gname, @rawgId, @url, @metacritic, @genres, @indie, @presence, @platform, @graphics,
   @storage, @memory, @ratings, @rdate, @soundtrack, fname, @cost, @discounted_cost,
   @players, @controller, @languages, @age_rating, @achievements, @publisher, @description,
   @tags)
;
/* End franchise load commands
*/

/* Start Genre load commands
*  FULLY IMPLEMENTED
*/
CREATE TABLE Genre(
   genre_id INT
     AUTO_INCREMENT,
   genre_name VARCHAR(255)
     NOT NULL,
   PRIMARY KEY (genre_id)
);
-- Implemented
LOAD DATA LOCAL INFILE 'genres.txt' INTO TABLE Genre
  LINES TERMINATED BY '\n'
  (genre_name)
;
/*  End Genre load commands
*/

/* Start User load commands
*  FULLY IMPLEMENTED
*/
CREATE TABLE User(
  cid INT NOT NULL AUTO_INCREMENT,
  cname VARCHAR(255) NOT NULL,
  PRIMARY KEY (cid)
);
/* End User load commands
*/

/* Start GameGenre load commands
*  FULLY IMPLEMENTED
*
*  Note: Used JDBC to load this table. See ParseGenres.java
*/
CREATE TABLE GameGenre(
  gid INT
    NOT NULL,
  genre_id INT
    NOT NULL,
  PRIMARY KEY (gid, genre_id),
  FOREIGN KEY (gid)
    REFERENCES Game(gid),
  FOREIGN KEY (genre_id)
    REFERENCES Genre(genre_id)
);
/* End GameGenre load commands
*/

/* Start RelatedTo load commands
*
*  Note: Going to need java to populate this. Relation will be dictated by
*        games which have the same genres as each other.
*/
CREATE TABLE RelatedTo(
  gid1 INT,
  gid2 INT,
  PRIMARY KEY (gid1, gid2),
  FOREIGN KEY (gid1)
    REFERENCES Game(gid),
  FOREIGN KEY (gid2)
    REFERENCES Game(gid)
);
LOAD DATA LOCAL INFILE 'SelfRelations1.csv' INTO TABLE RelatedTo
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  (gid1, gid2)
;
/* End RelatedTo load commands
*/



/* Start Plays load commands
*  FULLY IMPLEMENTED
*
* Note: Data will need to be added when the user saves a game
*/
CREATE TABLE Plays(
  gid INT,
  cid INT,
  PRIMARY KEY (gid, cid),
  FOREIGN KEY (gid)
    REFERENCES Game(gid),
  FOREIGN KEY (cid),
    REFERENCES Customer(cid)
);
/* End Plays load commands
*/
