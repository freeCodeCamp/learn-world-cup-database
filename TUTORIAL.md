# World Cup Database

> Welcome to the World Cup Database project!

## 1. Instructions

I have started you off with several files. One of them is `games.csv`. It contains a comma-separated list of all games of the final three rounds of the World Cup tournement since 2014, the titles are at the top. It includes the year of each game, the round of the tournament the game was in, the winner, their opponenet, and the number of goals each team scored. You need to do three things for this project:

1. Create the database according to the user stories.
You can log into the psql interactive terminal with `psql --username=freecodecamp --dbname=postgres`. Create your database structure with the interactive terminal.

1. Complete the `insert_data.sh` script to correctly insert all the data from `games.csv` into the database.
I have started the file for you. Do not modify any of the code I have started you with. Use the `PSQL` variable I defined to query your database. My tests will use first value of the variable, you will use the second. The test have a 10 second limit, so try to make your script efficient. The less you have to query the database, the faster it will be. Hint: you can empty out the data in your database by entering `TRUNCATE TABLE games, teams;` in the psql prompt before testing your script.

1. Complete empty `echo` commands in the `queries.sh` file to produce output that matches the `example-output.txt` file. I have started the file and completed the first one for you. Use the `PSQL` variable I have defined to complete the queries.

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
- When I run your `insert_data.sh` script, it should insert a row for each line in the `games.csv` file (other than the top line of the file). Each row should have every column filled in with the appropriate info. Make sure to add the correct ID's from the teams table (you cannot hard-code the values)
- You should correctly complete the queries in the `queries.sh` file. I have completed the first one for you. Fill in each empty `echo` command to get the output of what is suggested with the command above it. Only use a single line like I have demonstrated in the first query.
- When I run your `queries.sh` file, the output should match what is in the `example_output.txt` file. Take note of the order of some of the results
