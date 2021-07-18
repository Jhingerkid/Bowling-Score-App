# the average score for a player should be calculated by ((playerAvg*totalGames)+lastGame)/(totalGames+1)
# this way, we can keep a running average for players without having to store all of their game totals

# highScore should be calculated by: if lastGame > highScore then highScore = lastGame

CREATE TABLE `bowling_score`.`players` (
  `playerId` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `playerName` VARCHAR(45) NOT NULL,
  `playerAvg` INT NOT NULL,
  `lastGame` INT NOT NULL,
  `highScore` INT NOT NULL,
  `totalGames` INT NOT NULL);
  
# add a new player
INSERT INTO bowling_score.players (playerName, playerAvg, lastGame, highScore, totalGames) VALUES 
("Test Player 2", 130, 102, 210, 40);

# submit a players most recent score
