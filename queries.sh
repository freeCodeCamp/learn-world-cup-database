#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=worldcup --no-align --tuples-only -c"

# Do not change code above this line. Use the PSQL variable above to query your database.

echo -e "\nTotal number of goals in all games from winning teams:"
echo "$($PSQL "SELECT SUM(winner_goals) FROM games")"

echo -e "\nTotal number of goals in all games from both teams combined:"
echo

echo -e "\nAverage number of goals in all games from the winning teams:"
echo

echo -e "\nAverage number of goals in all games from the winning teams rounded to two decimal places:"
echo

echo -e "\nAverage number of goals in all games from both teams:"
echo

echo -e "\nMost goals scored in a single game by one team:"
echo

echo -e "\nNumber of games where the winning team scored more than two goals:"
echo

echo -e "\nWinner of the 2018 tournament team name:"
echo

echo -e "\nList of teams who played in the 2014 'Eighth-Final' round:"
echo

echo -e "\nList of unique winning team names in the whole data set:"
echo

echo -e "\nYear and team name of all the champions:"
echo

echo -e "\nList of teams that start with 'Co':"
echo
