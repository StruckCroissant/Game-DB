/* ---START STORED PROCEDURES---
*/
-- write genres to GameGenre table
delimiter $$
  drop procedure if exists insertGenre;
  create procedure insertGenre(IN gidIN INT, IN genreIdIN INT)
  begin
    INSERT INTO GameGenre(gid, genre_id)
    VALUES(gidIN, genreIdIN);
  end $$
  delimiter ;

-- write self-relations to RelatedTo table
delimiter $$
  drop procedure if exists insertSelfRelations;
  create procedure insertSelfRelations(IN gid1IN INT, IN gid2IN INT)
  begin
    INSERT INTO RelatedTo(gid1, gid2)
    VALUES(gid1IN, gid2IN);
  end $$
delimiter ;

-- Find all games in a given genre
delimiter $$
drop procedure if exists findGenre;
Create procedure findGenre(IN genreName VARCHAR(255))
begin
 Select gname from Game where gid IN (
   select gid from GameGenre where genre_id IN(
     select genre_id from Genre where
     genre_name like genreName
   ));
end $$
delimiter ;

-- Find if a given game is part of a franchise, return name of franchise and
-- names of other games in franchise
delimiter $$
drop procedure if exists gameFran;
	 Create procedure gameFran(IN gameName VARCHAR(255))
	 Begin
	 Select G.gname, F.fname from Franchise F, Game G
	  Where F.gid IN (Select gid from Game
      Where gname = gameName) AND
    F.gid = G.gid;
    end $$
 delimiter ;

-- Return all names of games with a given age rating
delimiter $$
drop procedure if exists gameRating;
 	Create procedure gameRating(IN rate VARCHAR(255))
 	Begin
 	  Select gname from Game Where age_rating = rate;
  end $$
delimiter ;

-- Find games with key word or phrase in description
delimiter $$
drop procedure if exists descGame;
	Create procedure descGame(IN descTerm VARCHAR(255))
	Begin
	 Select * from Game
	 Where description like
    CONCAT("%", descTerm, "%");
  end $$
delimiter ;


-- Find all games matching a given name
/* End stored procedures
*/
