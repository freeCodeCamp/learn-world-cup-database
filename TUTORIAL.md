# World Cup Database

> Welcome to the World Cup Database project!

## 1. Instructions

Part 1: Create the database according to the user stories.

Part 2: Create a script to insert the data into the database.

Part 3: Complete the `queries.sh` file to produce the expected output.

I have started you off with several files. One of them is `games.csv`. It contains a comma-separated list of all games of the final three rounds of the World Cup tournement since 2010, the titles are at the top. It includes the year of each game, the round of the tournament the game was in, the winner, their opponenet, and the number of goals each team scored. You need to do three things for this project; create a database structure, create a script to insert all of the data from that file, and complete the `queries.sh` script to produce the correct output.

Log into the psql interactive terminal with `psql --username=freecodecamp --dbname=postgres`. Create your database structure with the interactive terminal. You can query the database in your script with `psql --username=freecodecamp --dbname=salon -c "SQL QUERY HERE"`, add more flags if you need to.

My tests will replace all instances of `worldcup` in your scripts with my own database to test against.
Hint: For your `insert_data.sh` get one insert working before trying to add the rest. Also, you may want to run a command at the start of the script to delete data that may have been created from previously running the script. I would suggest to make as few queries to the database as possible so your script is faster.


### 1.1

Complete the tasks below

#### SUBTASKS

- You should create a database named `worldcup`
- You should connect to your database and then create `teams` and `games` tables
- Your `teams` table should have a `team_id` column as its primary key and a `name` column that has to be `UNIQUE`
- Your `games` table should have a `game_id` column as its primary key, a `year` column of type `INT`, and a `round` column of type `VARCHAR`
- Your `games` table should have `winner_id` and `opponenent_id` foreign key columns that each reference `team_id` from the `teams` table
- Your `games` table should have `winner_goals` and `opponent_goals` columns that are type `INT`
- All of your columns should have the `NOT NULL` constraint
- Your two script (`.sh`) files should have executable permissions. Other tests involving these two files will fail until permissions are correct
- When I run your `insert_data.sh` script, it should add each team to the `teams` table without duplicates
- When I run your `insert_data.sh` script, it should insert a row for each line in the `games.csv` file (other than the top line of the file). Each row should have every column filled in with the appropriate info.
- You should correctly complete the queries in the `queries.sh` file. I have completed the first one for you. Fill in each empty `echo` command to get the output of what is suggested with the command above it. Only use a single line like I have demonstrated in the first query.
- When I run your `queries.sh` file, the output should match what is in the `example_output.txt` file. Take note of the order of some of the results
