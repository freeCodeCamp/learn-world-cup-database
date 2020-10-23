const assert = require('assert');
const { Client } = require('pg');
const { getCommandOutput, getScriptOutput, canExecute, getFileContents } = require('./utils');

const connectionString = 'postgresql://postgres@localhost:5432/worldcup';
const connectionString2 = 'postgresql://postgres@localhost:5432/worldcuptest';
const client = new Client({
  connectionString: connectionString
});

const client2 = new Client({
  connectionString: connectionString2
});

describe('SUBTASKS 1.1', async () => {
  before(async () => {
    const insertFileExecutable = await canExecute('../insert_data.sh');
  
    try {
      await client.connect();
      await client2.connect();

      await client2.query(`TRUNCATE TABLE games, teams`);
      if(insertFileExecutable) await getCommandOutput('../insert_data.sh test');

    } catch (error) {
      throw new Error('Cannot connect to PostgreSQL\n' + error);
    }
  });

  after(async () => {
    await client.end();
    await client2.end();
    console.log('client connections ended');
  });

  it(':1 "worldcup" database should exist', async () => {
    const query = 'SELECT datname FROM pg_database';
    const res = await client.query(query);

    if (!res) assert(false);

    const index = res.rows.findIndex(row => {
      return row.datname === 'worldcup';
    });

    assert(index >= 0);
  });

  it(':2 "teams" and "games" tables should exist', async () => {
    const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
    const res = await client.query(query);

    if (!res) assert(false);

    const teamsIndex = res.rows.findIndex(row => {
      return row.table_name === 'teams';
    });

    const gamesIndex = res.rows.findIndex(row => {
      return row.table_name === 'games';
    });

    assert(teamsIndex >= 0 && gamesIndex >= 0);
  });

  it(':3 Your "teams" table should have the correct "team_id" and "name" columns', async () => {
    const queryTeamIdPKey = `SELECT column_name FROM information_schema.key_column_usage AS c LEFT JOIN information_schema.table_constraints AS t ON t.constraint_name = c.constraint_name WHERE t.constraint_type = 'PRIMARY KEY' AND c.table_name='teams' AND c.column_name='team_id'`;
    const queryNameColumn = `SELECT column_name FROM information_schema.key_column_usage AS c LEFT JOIN information_schema.table_constraints AS t ON t.constraint_name = c.constraint_name WHERE t.constraint_type = 'UNIQUE' AND c.table_name='teams' AND c.column_name='name'`;
    const teamIdPKeyRes = await client.query(queryTeamIdPKey);
    const nameColumnRes = await client.query(queryNameColumn);

    if (!teamIdPKeyRes || !nameColumnRes) assert(false);

    assert(teamIdPKeyRes.rowCount > 0 && nameColumnRes.rowCount > 0);
  });

  it(':4 Your "games" table should have the correct "game_id", "year", and "round" columns', async () => {
    const queryGameIdPKey = `SELECT column_name FROM information_schema.key_column_usage AS c LEFT JOIN information_schema.table_constraints AS t ON t.constraint_name = c.constraint_name WHERE t.constraint_type = 'PRIMARY KEY' AND c.table_name='games' AND c.column_name='game_id'`;
    const queryYearColumn = `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'public' AND data_type='integer' AND column_name='year' AND table_name='games'`;
    const queryRoundColumn = `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'public' AND data_type='character varying' AND column_name='round' AND table_name='games'`;

    const gameIdPKeyRes = await client.query(queryGameIdPKey);
    const yearColumnRes = await client.query(queryYearColumn);
    const roundColumnRes = await client.query(queryRoundColumn);

    if (!gameIdPKeyRes || !yearColumnRes || !roundColumnRes) assert(false);

    assert(gameIdPKeyRes.rowCount > 0 && yearColumnRes.rowCount > 0 && roundColumnRes.rowCount > 0);
  });

  it(':5 Your "games" table should have correct "winner_id" and "opponent_id" foreign key columns', async () => {
    const queryForeignKeys = `SELECT tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = 'FOREIGN KEY'`;
    const foreignKeysRes = await client.query(queryForeignKeys);

    if (!foreignKeysRes) assert(false);

    const foreignKeys = foreignKeysRes.rows.filter(row => {
      const winnerIdColumn = row.table_name === 'games' && row.column_name === 'winner_id' && row.foreign_table_name === 'teams' && row.foreign_column_name === 'team_id';
      const opponentIdColumn = row.table_name === 'games' && row.column_name === 'opponent_id' && row.foreign_table_name === 'teams' && row.foreign_column_name === 'team_id';

      return winnerIdColumn || opponentIdColumn;
    });

    assert(foreignKeys.length > 1);
  });

  it(':6 Your "games" table should have correct "winner_goals" and "opponent_goals" columns', async () => {
    const queryWinnerGoalsColumn = `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'public' AND data_type='integer' AND column_name='winner_goals' AND table_name='games'`;
    const queryOpponentGoalsColumn = `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'public' AND data_type='integer' AND column_name='opponent_goals' AND table_name='games'`;

    const winnerColumnRes = await client.query(queryWinnerGoalsColumn);
    const opponentColumnRes = await client.query(queryOpponentGoalsColumn);

    if (!winnerColumnRes || !opponentColumnRes ) assert(false);

    assert(winnerColumnRes.rowCount > 0 && opponentColumnRes.rowCount > 0);
  });

  it(':7 All of your columns should have the "NOT NULL" constraint', async () => {
    const queryNotNullColumns = `SELECT column_name, table_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'public' AND is_nullable='NO'`;
    const queryAllColumns = `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name`;
    const notNullColumnsRes = await client.query(queryNotNullColumns);
    const allColumnsRes = await client.query(queryAllColumns);
    
    if (!notNullColumnsRes || !allColumnsRes) assert(false);

    assert(allColumnsRes.rowCount > 0 && notNullColumnsRes.rowCount === allColumnsRes.rowCount);    
  });

  it(':8 Your "insert_data.sh" and "queries.sh" files should have executable permissions', async () => {
    const insertFileExecutable = await canExecute('../insert_data.sh');
    const queriesFileExecutable = await canExecute('../queries.sh');

    if(!queriesFileExecutable || !insertFileExecutable) assert(false);

    assert(queriesFileExecutable && insertFileExecutable);
  });

  it(':9 Your "insert_data.sh" script should add each unique team to the "teams" table', async () => {
    const teamNames = ['France','Croatia','Belgium','England','Russia','Sweden','Brazil','Uruguay','Colombia','Switzerland','Japan','Mexico','Denmark','Spain','Portugal','Argentina','Germany','Netherlands','Costa Rica','Chile','Algeria','Nigeria','Greece','United States'];
    const query = 'SELECT name FROM teams';
    const res = await client2.query(query);

    if (!res) assert(false);

    res.rows.forEach(row => {
      if(!teamNames.includes(row.name)) assert(false);
    })

    assert(res.rowCount === 24);
  });

  it(':10 Your "insert_data.sh" script should add a row in the "games" table for each game', async () => {
    const query = 'SELECT * FROM games';
    const res = await client2.query(query);

    if (!res) assert(false);

    const finalRows = res.rows.filter(row => {
      return row.round === 'Final';
    });

    const query2 = `SELECT name FROM teams LEFT JOIN games ON teams.team_id = games.winner_id WHERE round = 'Final' AND year = '2018'`;
    const res2 = await client2.query(query2);

    if (!res2) assert(false);

    assert(res.rowCount === 32 && finalRows.length === 2 && res2.rows[0].name === 'France');
  });

  it(':11 You should correctly complete the "queries.sh" file', async () => {
    const queriesFileExecutable = await canExecute('../queries.sh');

    if(!queriesFileExecutable) assert(false);
    
    let scriptOutput = await getScriptOutput('../queries.sh');
    let expectedOutput = await getFileContents('../.freeCodeCamp/expected_output.txt');
    
    scriptOutput = scriptOutput.replace(/\s/g, '');
    expectedOutput = expectedOutput.replace(/\s/g, '')

    if(!scriptOutput || !expectedOutput) assert(false);

    assert(scriptOutput === expectedOutput);
  });
});
