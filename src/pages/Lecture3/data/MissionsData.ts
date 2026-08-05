export interface Mission {
  id: number;
  title: string;
  tagline: string;
  type: 'sql' | 'quiz' | 'plsql';
  explanation: string;
  sqlTemplate?: string;
  challenge: string;
  hints: string[];
  expectedTables?: string[];
  // For validation
  checkQuery?: (query: string, result: any) => { success: boolean; message?: string };
  // For quiz missions
  quizQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const missionsData: Mission[] = [
  {
    id: 1,
    title: "What is SQL?",
    tagline: "Speak the language of databases",
    type: "sql",
    explanation: `**SQL (Structured Query Language)** is the universal language software engineers use to communicate with databases. Think of the database as a highly organized digital filing cabinet, and SQL as the set of instructions to fetch, add, modify, or delete files.

Whether you are fetching WhatsApp status updates, Instagram feeds, or Spotify playlists, you are using SQL behind the scenes!

Let's start with the most basic query. To retrieve **all** columns and **all** rows from a table, we use:
\`\`\`sql
SELECT * FROM TableName;
\`\`\`
* \`SELECT\` tells the database what data you want (here, \`*\` means "all columns").
* \`FROM\` specifies which table to search.`,
    sqlTemplate: "-- Type your query here\nSELECT\nFROM Users;",
    challenge: "Fetch all columns and rows from the Users table to see our WhatsApp contacts list.",
    hints: [
      "Use the asterisk '*' to select all columns.",
      "The query structure should be: SELECT * FROM Users;",
      "Your final query must be: `SELECT * FROM Users;`"
    ]
  },
  {
    id: 2,
    title: "Selecting Columns",
    tagline: "Fetch only what you need",
    type: "sql",
    explanation: `In production, selecting all columns (\`*\`) is usually bad practice because it fetches unnecessary data and slows down applications. Instead, we specify the exact columns we need.

To select specific columns, list their names separated by commas:
\`\`\`sql
SELECT Name, Phone
FROM Users;
\`\`\`
This query will only return the \`Name\` and \`Phone\` columns, hiding all other details.`,
    sqlTemplate: "-- Select only user names\n",
    challenge: "Display ONLY the Name of all users from the Users table.",
    hints: [
      "Instead of '*', use the column name 'Name'.",
      "Format: SELECT Name FROM Users;",
      "Your query should be: `SELECT Name FROM Users;`"
    ]
  },
  {
    id: 3,
    title: "Filtering Records",
    tagline: "Enter the WHERE clause",
    type: "sql",
    explanation: `Often, you don't want to see every row in a table. You only want rows that meet a certain condition. This is where the \`WHERE\` clause comes in.

For example, to find all users from India:
\`\`\`sql
SELECT *
FROM Users
WHERE Country = 'India';
\`\`\`
Notice that text values like 'India' must be wrapped in **single quotes**, whereas numbers do not need quotes.`,
    sqlTemplate: "-- Find users from USA\nSELECT *\nFROM Users\nWHERE ;",
    challenge: "Find all users whose Country is 'USA'.",
    hints: [
      "You need to filter using the condition Country = 'USA'.",
      "Write: SELECT * FROM Users WHERE Country = 'USA';",
      "Remember to wrap text values like 'USA' in single quotes."
    ]
  },
  {
    id: 4,
    title: "Sorting Results",
    tagline: "Put your data in order",
    type: "sql",
    explanation: `Databases don't guarantee any default order for query results. To sort your data, use the \`ORDER BY\` clause.

By default, it sorts in ascending order (\`ASC\`), but you can specify \`DESC\` for descending order.

Example:
\`\`\`sql
SELECT Name, Country
FROM Users
ORDER BY Name DESC; -- Sort Z to A
\`\`\`
To sort by Name alphabetically from A to Z, use \`ORDER BY Name ASC;\` (or just \`ORDER BY Name;\`).`,
    sqlTemplate: "-- Order users by name alphabetically\n",
    challenge: "Display all columns of users ordered by their Name in alphabetical order (A to Z).",
    hints: [
      "Use the ORDER BY clause followed by the column 'Name'.",
      "Append the keyword 'ASC' after Name to sort from A to Z.",
      "The complete query is: `SELECT * FROM Users ORDER BY Name ASC;`"
    ]
  },
  {
    id: 5,
    title: "Aggregate Functions",
    tagline: "Power of mathematical summary",
    type: "sql",
    explanation: `Instead of viewing individual records, we often want summary statistics. SQL provides built-in functions called **Aggregate Functions**:

* \`COUNT(column)\`: Count the number of rows.
* \`SUM(column)\`: Add values together.
* \`AVG(column)\`: Calculate the average value.
* \`MAX(column)\`: Find the highest value.
* \`MIN(column)\`: Find the lowest value.

Example:
\`\`\`sql
SELECT COUNT(*) FROM Users;
\`\`\`
This returns the total number of registered users in the database.`,
    sqlTemplate: "-- Count total users\n",
    challenge: "Calculate the total number of registered users in the Users table.",
    hints: [
      "Use the COUNT(*) function.",
      "Syntax: SELECT COUNT(*) FROM Users;",
      "Remember, aggregate functions require parentheses around the column name (or '*' to count all rows)."
    ]
  },
  {
    id: 6,
    title: "NULL Handling",
    tagline: "The art of dealing with nothingness",
    type: "sql",
    explanation: `In databases, **NULL** represents a missing or unknown value. It is **not** the same as a number \`0\`, nor is it an empty string \`""\`. It is the absence of data.

Because NULL is not a value, you cannot use standard comparison operators like \`=\` or \`<>\`. Instead, you must use special operators:
* \`IS NULL\`
* \`IS NOT NULL\`

Example:
\`\`\`sql
SELECT Name
FROM Users
WHERE Status IS NOT NULL; -- Users who have set a status message
\`\`\``,
    sqlTemplate: "-- Find users with hidden last seen\n",
    challenge: "Find all users who have disabled their Last Seen (where LastSeen is missing/NULL).",
    hints: [
      "Check the 'LastSeen' column for NULL values.",
      "Use the 'IS NULL' operator instead of '= NULL'.",
      "The complete query is: `SELECT * FROM Users WHERE LastSeen IS NULL;`"
    ]
  },
  {
    id: 7,
    title: "Nested Queries (Subqueries)",
    tagline: "Queries inside queries",
    type: "sql",
    explanation: `Sometimes, answering a question requires two steps. For example, to find messages that are longer than average:
1. Find the average length of all messages (inner query).
2. Find messages whose length is greater than that average (outer query).

SQL allows you to nest queries inside each other using parentheses. The **inner query** (or subquery) runs first, and its result is used by the **outer query**.

In SQLite, the \`LENGTH(column)\` function calculates the text length of a column.

Example:
\`\`\`sql
SELECT *
FROM Messages
WHERE LENGTH(Content) > (SELECT AVG(LENGTH(Content)) FROM Messages);
\`\`\``,
    sqlTemplate: "-- Find messages longer than average\n",
    challenge: "Find all columns from the Messages table for messages whose content length is greater than the average message length.",
    hints: [
      "Your subquery should calculate the average message length: `(SELECT AVG(LENGTH(Content)) FROM Messages)`.",
      "The outer query should select from Messages where LENGTH(Content) is greater than the subquery.",
      "Write: `SELECT * FROM Messages WHERE LENGTH(Content) > (SELECT AVG(LENGTH(Content)) FROM Messages);`"
    ]
  },
  {
    id: 8,
    title: "Constraints Checkpoint",
    tagline: "Protecting Data Integrity",
    type: "quiz",
    explanation: `Before moving to advanced concepts, let's review **Database Constraints**. Constraints are rules applied to columns to ensure data accuracy, reliability, and security:

* **PRIMARY KEY**: Uniquely identifies each record. Cannot be NULL or duplicated.
* **FOREIGN KEY**: Links tables together. Enforces relational integrity between tables.
* **NOT NULL**: Prevents a column from storing NULL values.
* **UNIQUE**: Ensures all values in a column are distinct.
* **CHECK**: Validates that all values in a column satisfy a condition (e.g. Age >= 13).
* **DEFAULT**: Provides a default value if none is specified.`,
    challenge: "Answer the following 3 questions to prove your mastery of Database Constraints in our WhatsApp model.",
    hints: [
      "Read the constraint definitions carefully.",
      "A primary key must be unique and cannot be NULL.",
      "Foreign keys link a child table reference back to a parent primary key."
    ],
    quizQuestions: [
      {
        question: "Which constraint ensures that a user's Phone number is completely unique across the app, while allowing their profile Status message to be NULL (empty)?",
        options: ["PRIMARY KEY", "UNIQUE", "NOT NULL", "CHECK"],
        correctIndex: 1,
        explanation: "The UNIQUE constraint ensures all values in a column are distinct. Unlike PRIMARY KEY, UNIQUE columns can contain NULL values (unless NOT NULL is also specified)."
      },
      {
        question: "What type of key links the SenderID column in the Messages table to the UserID in the Users table?",
        options: ["Primary Key", "Foreign Key", "Super Key", "Candidate Key"],
        correctIndex: 1,
        explanation: "A Foreign Key is a column or group of columns that provides a link between data in two tables, acting as a reference to a Primary Key in another table."
      },
      {
        question: "If we want to ensure that a message's Content cannot be empty (i.e., its length must be greater than 0), which constraint is best suited?",
        options: ["DEFAULT", "NOT NULL", "CHECK", "PRIMARY KEY"],
        correctIndex: 2,
        explanation: "The CHECK constraint allows you to specify a condition that must be satisfied by every row in the table, e.g. CHECK (LENGTH(Content) > 0)."
      }
    ]
  },
  {
    id: 9,
    title: "Views",
    tagline: "Virtual tables for convenience",
    type: "sql",
    explanation: `A **View** is a virtual table based on the result-set of an SQL statement. It contains rows and columns just like a real table, but it doesn't store data physically. It queries the base tables dynamically.

**Why use Views?**
1. **Security**: Show only columns or rows users are authorized to see.
2. **Simplicity**: Combine multiple complex tables into a single view.
3. **Reusability**: Write a complex query once, and save it as a view for future queries.

Syntax:
\`\`\`sql
CREATE VIEW ViewName AS
SELECT Column1, Column2
FROM TableName
WHERE Condition;
\`\`\`
After creating it, you can query it just like a regular table: \`SELECT * FROM ViewName;\`.`,
    sqlTemplate: "-- Create a view for Indian users\nCREATE VIEW IndianUsers AS\n",
    challenge: "Create a View named IndianUsers that contains all columns of users from the Users table who are from 'India'.",
    hints: [
      "Use the CREATE VIEW statement: CREATE VIEW IndianUsers AS ...",
      "Follow 'AS' with the SELECT query: SELECT * FROM Users WHERE Country = 'India';",
      "Full query: `CREATE VIEW IndianUsers AS SELECT * FROM Users WHERE Country = 'India';`"
    ]
  },
  {
    id: 10,
    title: "Joining Tables",
    tagline: "Connecting the Dots",
    type: "sql",
    explanation: `Real-world databases split data into multiple tables to avoid redundancy. To get a complete picture, we need to join these tables back together.

We use the \`INNER JOIN\` clause to combine rows from two or more tables based on a related column between them.

For example, to list each group with its members:
\`\`\`sql
SELECT Groups.GroupName, GroupMembers.Role
FROM Groups
INNER JOIN GroupMembers 
ON Groups.GroupID = GroupMembers.GroupID;
\`\`\`
* We prefix columns with their table names (\`Table.Column\`) to avoid ambiguity.
* The \`ON\` keyword specifies which columns link the tables together.`,
    sqlTemplate: "-- Join Messages and Users\nSELECT Users.Name, Messages.Content\nFROM Messages\nINNER JOIN Users\nON ;",
    challenge: "Join the Messages and Users tables (matching Messages.SenderID with Users.UserID) to display the sender's Name and the message Content.",
    hints: [
      "The ON clause should match Messages.SenderID with Users.UserID: `ON Messages.SenderID = Users.UserID;`.",
      "Make sure you select `Users.Name` and `Messages.Content`.",
      "The full query is: `SELECT Users.Name, Messages.Content FROM Messages INNER JOIN Users ON Messages.SenderID = Users.UserID;`"
    ]
  }
];
