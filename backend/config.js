import 'dotenv/config';
import mysql from 'mysql2/promise';
/*
Very important: Do NOT commit your .env file to source control (git)
Add the following files to backend (not visible in GitHub):
.env
.gitignore
inside .env put your local database password like so:
DB_PASSWORD=yourpasswordhere
Note: No space around the = sign
inside .gitignore add the line:
.env
*/

export const config = {
  db: {
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: 'UpCodeDB',
    port: 3306
  }
};

let pool;

export async function createPool() {
  if (!pool) {
    pool = mysql.createPool(config.db);
  }
  return pool;
}

// connection config used to create DB (connect without database first)
const connectionConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port
};

// SQL: create database only 
const schema = `CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`;`;

/*
MySQL: Write your DDL statements here
Create tables, triggers, procedures, etc.
Example: Create Users table
const tableUsers = `
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
*/

const Users = `
CREATE TABLE IF NOT EXISTS Users (
  userId INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
);`;

// Trigger needed for deletion cascade
const Recommendations = `
CREATE TABLE IF NOT EXISTS Recommendations (
  recommendationId INT PRIMARY KEY AUTO_INCREMENT,
  sourceId VARCHAR2(50) NOT NULL,
  targetId VARCHAR2(50) NOT NULL,
  sourceType VARCHAR(50) ENUM('user', 'project', 'career') NOT NULL,
  targetType VARCHAR(50) ENUM('user', 'project', 'career') NOT NULL,
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_source_type CHECK (source_type IN ('user', 'project', 'career')),
  CONSTRAINT check_target_type CHECK (target_type IN ('user', 'project', 'career'))
);`;

const Projects = `
CREATE TABLE IF NOT EXISTS Projects (
  projectId INT PRIMARY KEY AUTO_INCREMENT,
  creatorId INT REFERENCES Users(userId),
  description VARCHAR(255) NOT NULL,
  difficulty VARCHAR(50) ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
  category VARCHAR(50) ENUM('web development', 'data science', 'mobile apps', 'game development', 'cybersecurity', 'other') NOT NULL,
  lastUpdateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  detailsFile TEXT NOT NULL,
);`;

const Project_Tracking = `
CREATE TABLE IF NOT EXISTS Project_Tracking (
  trackingId INT PRIMARY KEY AUTO_INCREMENT,
  userId INT REFERENCES Users(userId),
  projectId INT REFERENCES Projects(projectId),
);`;

const Submissions = `
CREATE TABLE IF NOT EXISTS Submissions (
  submissionId INT PRIMARY KEY AUTO_INCREMENT,
  projectId INT REFERENCES Projects(projectId) ON DELETE RESTRICT,
  userId INT REFERENCES Users(userId),
  title VARCHAR(100) NOT NULL,
  tag VARCHAR(50) NOT NULL,
  postDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastUpdateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  RepoLink VARCHAR(255) NOT NULL,
  RationaleFile TEXT NOT NULL,
);`;

const Roadmaps = `
CREATE TABLE IF NOT EXISTS Roadmaps (
  roadmapId INT PRIMARY KEY AUTO_INCREMENT,
  creatorId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  creationDate TIMESTAMP NOT NULL,
  difficulty ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
  FOREIGN KEY (creatorId) REFERENCES Users(userId) ON DELETE RESTRICT
);`;

const Chapters = `
CREATE TABLE IF NOT EXISTS Chapters (
    chapterId INT PRIMARY KEY AUTO_INCREMENT,
    roadmapId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,  -- Matches the NULLABLE indication
    lastUpdateDate TIMESTAMP,
    difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
    chapterOrder INT NOT NULL,
    category VARCHAR(100),
    FOREIGN KEY (roadmapId) REFERENCES Roadmaps(roadmapId) ON DELETE CASCADE
);`;

const Nodes = `
CREATE TABLE IF NOT EXISTS Nodes (
  nodeId INT PRIMARY KEY AUTO_INCREMENT,
  chapterId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  lastUpdateDate TIMESTAMP,
  nodeOrder INT NOT NULL,
  link VARCHAR(255),
  FOREIGN KEY (chapterId) REFERENCES Chapters(chapterId) ON DELETE CASCADE
);`;

const ReadRecords = `
CREATE TABLE IF NOT EXISTS ReadRecords (
  recordId INT PRIMARY KEY AUTO_INCREMENT,
  NodeID INT NOT NULL,
);`;

// Triggers
// Cascade delete on Recommendations when a User is deleted
const triggerCascadeDeleteRecommendations = `
CREATE TRIGGER trg_delete_recommendations
AFTER DELETE ON Roadmaps, Projects
FOR EACH ROW
BEGIN 
  DELETE FROM Recommendations WHERE sourceId = OLD.roadmapId OR targetId = OLD.roadmapId;
  DELETE FROM Recommendations WHERE sourceId = OLD.projectId OR targetId = OLD.projectId;
END;
`;



export async function initDB() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(schema); // Create database if it doesn't exist
    await connection.query(`USE \`${config.db.database}\`;`); // Switch to the database
    // Add your DDL queries connection here
    // Example: await connection.query(tableUsers); 
    await connection.query(Users);
    await connection.query(Recommendations);
    await connection.query(Projects);
    await connection.query(Project_Tracking);
    await connection.query(Submissions);
    await connection.query(Roadmaps);
    await connection.query(Chapters);
    await connection.query(Nodes);
    await connection.query(ReadRecords);
    await connection.query(triggerCascadeDeleteRecommendations);
    console.log("Database ensured:", config.db.database);
    await connection.end();
  } catch (err) {
    console.error("Warning: Failed to initialize database schema. Please check your database configuration.", err);
  }
}