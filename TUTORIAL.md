# World Cup Database

> Welcome to the World Cup Database project!

## 1. Instructions

You are started with several files. One of them is `games.csv`. It contains a comma-separated list of all games of the final three rounds of the World Cup tournement since 2014, the titles are at the top. It includes the year of each game, the round of the tournament the game was in, the winner, their opponenet, and the number of goals each team scored. You need to do three things for this project:

Create the database according to the user stories. Log into the psql interactive terminal with `psql --username=freecodecamp --dbname=postgres`. Create your database structure with the interactive terminal. **Don't forget to connect to the database after you create it.**

Complete the `insert_data.sh` script to correctly insert all the data from `games.csv` into the database. The file is started for you. Do not modify any of the code that's in there. Use the `PSQL` variable defined to query your database. You can make queries like this: `$($PSQL "<query_here>")`. The tests will use first value of the variable, you will use the second. The tests have a 10 second limit, so try to make your script efficient. The less you have to query the database, the faster it will be. You can empty out the data in your database with `TRUNCATE TABLE games, teams;`.

Complete empty `echo` commands in the `queries.sh` file to produce output that matches the `example-output.txt` file. The file has some starter code and first query is completed for you. Use the `PSQL` variable defined to complete the queries. Note that you need to have your database filled with the correct data from the script in order to get the correct results from your queries. Hint: Test your queries in the psql prompt first and then add them to the script file.

If you leave your virtual machine, your database will not be saved. You can make a dump of it by entering `pg_dump --clean --create --inserts --username=freecodecamp worldcup > worldcup.sql` in a terminal (not the psql one). Make sure you are in the `project` folder when entering the command. It will save the commands to rebuild your database to `worldcup.sql`. Then, save the file somewhere. You can rebuild it by entering `psql -U postgres < worldcup.sql` in a terminal if you enter the command where the `.sql` file is.

### 1.1

Complete the tasks below

#### SUBTASKS

- You should create a database named `worldcup`
- You should **connect to your worldcup** database and then create `teams` and `games` tables
- Your `teams` table should have a `team_id` column as its primary key and a `name` column that has to be `UNIQUE`
- Your `games` table should have a `game_id` column as its primary key, a `year` column of type `INT`, and a `round` column of type `VARCHAR`
- Your `games` table should have `winner_id` and `opponenent_id` foreign key columns that each reference `team_id` from the `teams` table
- Your `games` table should have `winner_goals` and `opponent_goals` columns that are type `INT`
- All of your columns should have the `NOT NULL` constraint
- Your two script (`.sh`) files should have executable permissions. Other tests involving these two files will fail until permissions are correct. When these permissions are enabled, the tests will take significantly longer to run
- When you run your `insert_data.sh` script, it should add each unique team to the `teams` table. There should be 19 rows
- When you run your `insert_data.sh` script, it should insert a row for each line in the `games.csv` file (other than the top line of the file). There should be 32 rows. Each row should have every column filled in with the appropriate info. Make sure to add the correct ID's from the teams table (you cannot hard-code the values)
- You should correctly complete the queries in the `queries.sh` file. The first one is completed for you. Fill in each empty `echo` command to get the output of what is suggested with the command above it. Only use a single line like I have demonstrated in the first query. The output should match what is in the `example_output.txt` file. Take note of the order of some of the results
