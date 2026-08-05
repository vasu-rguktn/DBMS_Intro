// SQL Engine with built-in SQLite database and Intelligent Tutor validation

declare global {
  interface Window {
    initSqlJs: any;
  }
}

export interface SqlResult {
  columns: string[];
  rows: any[][];
}

export interface TutorFeedback {
  success: boolean;
  message?: string; // Tutoring message
  highlight?: string; // Incorrect code part
  suggestion?: string; // Corrected SQL suggestion
  tip?: string; // Learning tip
  result?: SqlResult; // SQLite execution result if success
}

let dbInstance: any = null;

// Raw seed data
const SEED_DATA = {
  Users: `
    CREATE TABLE Users (
      UserID INTEGER PRIMARY KEY,
      Name TEXT NOT NULL,
      Status TEXT,
      Phone TEXT NOT NULL UNIQUE,
      Country TEXT NOT NULL,
      LastSeen TEXT
    );
    INSERT INTO Users VALUES (101, 'Aditya Kumar', 'Hey there! I am using WhatsApp.', '9876543210', 'India', '2026-08-05 23:15:00');
    INSERT INTO Users VALUES (102, 'Sneha Reddy', 'Busy', '9123456789', 'India', NULL);
    INSERT INTO Users VALUES (103, 'John Smith', 'At the gym 🏋️‍♂️', '12025550143', 'USA', '2026-08-05 22:45:00');
    INSERT INTO Users VALUES (104, 'Priya Patel', 'Sleeping 😴', '8765432109', 'India', '2026-08-05 23:40:00');
    INSERT INTO Users VALUES (105, 'Emily Davis', 'Available', '14155552671', 'USA', NULL);
    INSERT INTO Users VALUES (106, 'Yuki Tanaka', '🇯🇵 Hello World!', '81905555123', 'Japan', '2026-08-05 18:30:00');
    INSERT INTO Users VALUES (107, 'Karan Malhotra', 'In a meeting', '9988776655', 'India', '2026-08-05 21:00:00');
    INSERT INTO Users VALUES (108, 'Sarah Connor', 'No calls, WhatsApp only', '13105559876', 'USA', '2026-08-05 23:55:00');
    INSERT INTO Users VALUES (109, 'Carlos Gomez', 'Feeling happy! 😊', '34612345678', 'Spain', NULL);
    INSERT INTO Users VALUES (110, 'Fatima Al-Sayed', 'Urgent messages only', '96650123456', 'Saudi Arabia', '2026-08-05 23:50:00');
  `,
  Messages: `
    CREATE TABLE Messages (
      MessageID INTEGER PRIMARY KEY,
      SenderID INTEGER NOT NULL,
      ReceiverID INTEGER NOT NULL,
      Content TEXT NOT NULL,
      Status TEXT NOT NULL,
      Timestamp TEXT NOT NULL,
      FOREIGN KEY (SenderID) REFERENCES Users(UserID),
      FOREIGN KEY (ReceiverID) REFERENCES Users(UserID)
    );
    INSERT INTO Messages VALUES (1, 101, 102, 'Hey Sneha! Did you finish the DBMS project?', 'Read', '2026-08-05 23:01:00');
    INSERT INTO Messages VALUES (2, 102, 101, 'Yes Aditya, almost done with the relational algebra part.', 'Read', '2026-08-05 23:03:00');
    INSERT INTO Messages VALUES (3, 103, 105, 'Hey Emily! Are we meeting for the gym tomorrow?', 'Delivered', '2026-08-05 22:40:00');
    INSERT INTO Messages VALUES (4, 101, 104, 'Can you send me the lecture notes?', 'Sent', '2026-08-05 23:10:00');
    INSERT INTO Messages VALUES (5, 106, 110, 'Konnichiwa! Hope you are doing well.', 'Read', '2026-08-05 18:25:00');
    INSERT INTO Messages VALUES (6, 107, 101, 'The meeting starts in 10 minutes. Hurry up!', 'Read', '2026-08-05 20:50:00');
    INSERT INTO Messages VALUES (7, 108, 103, 'Target locked. Please confirm.', 'Read', '2026-08-05 23:52:00');
  `,
  Groups: `
    CREATE TABLE Groups (
      GroupID TEXT PRIMARY KEY,
      GroupName TEXT NOT NULL,
      CreatedBy INTEGER NOT NULL,
      CreatedDate TEXT NOT NULL,
      FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
    );
    INSERT INTO Groups VALUES ('G001', 'DBMS Study Club 📚', 101, '2026-08-01');
    INSERT INTO Groups VALUES ('G002', 'Weekend Plans 🎉', 103, '2026-08-03');
  `,
  GroupMembers: `
    CREATE TABLE GroupMembers (
      GroupID TEXT,
      UserID INTEGER,
      JoinedDate TEXT NOT NULL,
      Role TEXT NOT NULL,
      PRIMARY KEY (GroupID, UserID),
      FOREIGN KEY (GroupID) REFERENCES Groups(GroupID),
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
    INSERT INTO GroupMembers VALUES ('G001', 101, '2026-08-01', 'Admin');
    INSERT INTO GroupMembers VALUES ('G001', 102, '2026-08-01', 'Member');
    INSERT INTO GroupMembers VALUES ('G001', 104, '2026-08-02', 'Member');
    INSERT INTO GroupMembers VALUES ('G002', 103, '2026-08-03', 'Admin');
    INSERT INTO GroupMembers VALUES ('G002', 105, '2026-08-03', 'Member');
    INSERT INTO GroupMembers VALUES ('G002', 108, '2026-08-04', 'Member');
  `
};

// Available schema definitions for autocomplete / checking
export const SCHEMA_INFO = {
  Users: ['UserID', 'Name', 'Status', 'Phone', 'Country', 'LastSeen'],
  Messages: ['MessageID', 'SenderID', 'ReceiverID', 'Content', 'Status', 'Timestamp'],
  Groups: ['GroupID', 'GroupName', 'CreatedBy', 'CreatedDate'],
  GroupMembers: ['GroupID', 'UserID', 'JoinedDate', 'Role']
};

// Load sql.js dynamically
export async function initDatabase(): Promise<any> {
  if (dbInstance) return dbInstance;

  return new Promise(async (resolve, reject) => {
    try {
      if (!window.initSqlJs) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
        script.async = true;
        document.body.appendChild(script);
        await new Promise((res, rej) => {
          script.onload = res;
          script.onerror = rej;
        });
      }

      const SQL = await window.initSqlJs({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
      });

      const db = new SQL.Database();
      // Initialize seed data
      db.run(SEED_DATA.Users);
      db.run(SEED_DATA.Messages);
      db.run(SEED_DATA.Groups);
      db.run(SEED_DATA.GroupMembers);

      dbInstance = db;
      resolve(db);
    } catch (err) {
      reject(err);
    }
  });
}

export function validateAndRunSql(query: string, _currentMissionId: number): TutorFeedback {
  // Remove single line comments starting with --
  let cleaned = query.replace(/--.*$/gm, '');
  // Remove multi-line comments /* ... */
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');

  const normalized = cleaned.trim().replace(/\s+/g, ' ');
  const uppercaseQuery = normalized.toUpperCase();

  // 1. Missing SELECT
  if (uppercaseQuery.startsWith('FROM ') || (normalized.length > 0 && !uppercaseQuery.includes('SELECT') && !uppercaseQuery.includes('CREATE') && !uppercaseQuery.includes('BEGIN'))) {
    return {
      success: false,
      message: "It looks like you're missing the SELECT keyword at the start of your query.",
      highlight: normalized.substring(0, 15),
      suggestion: `SELECT * ${normalized}`,
      tip: "SELECT is the foundation of SQL queries; it tells the database exactly what data columns you want to retrieve."
    };
  }

  // 2. Missing FROM
  if (uppercaseQuery.includes('SELECT') && !uppercaseQuery.includes('FROM') && !uppercaseQuery.includes('CREATE') && !uppercaseQuery.includes('BEGIN')) {
    return {
      success: false,
      message: "You specified a SELECT clause, but forgot the FROM clause.",
      highlight: normalized,
      suggestion: `${normalized} FROM Students;`,
      tip: "SQL always needs to know which table you want to fetch data from. Specify the table using 'FROM TableName'."
    };
  }

  // 3. Missing WHERE condition values
  const whereMatch = uppercaseQuery.match(/WHERE\s+([A-Z0-9_]+)\s*([<>=!]+)\s*(;|$)/i);
  if (whereMatch) {
    return {
      success: false,
      message: `A comparison operator requires a value to compare against. Your filter on '${whereMatch[1]}' is incomplete.`,
      highlight: whereMatch[0],
      suggestion: normalized.replace(whereMatch[0], `WHERE ${whereMatch[1]} ${whereMatch[2]} 80`),
      tip: "Make sure you specify a value after operators like '=', '>', or '<'. For example: Marks > 80"
    };
  }

  // 4. Incorrect Table Names (Plural/Singular suggestions)
  const tables = ['Users', 'Messages', 'Groups', 'GroupMembers'];
  for (const t of tables) {
    const singular = t.endsWith('s') ? t.slice(0, -1) : t;
    const regexSingular = new RegExp(`\\bFROM\\s+${singular}\\b`, 'i');
    if (regexSingular.test(normalized)) {
      return {
        success: false,
        message: `Table '${singular}' not found. Did you mean the plural form?`,
        highlight: singular,
        suggestion: normalized.replace(regexSingular, `FROM ${t}`),
        tip: "Database tables are named specifically. Double-check your spelling and singular vs plural forms."
      };
    }
  }

  // 5. Unknown Column Names suggestions
  if (uppercaseQuery.includes('SELECT') && uppercaseQuery.includes('FROM')) {
    // Find all tables mentioned in the query to handle JOINs and prefixes
    const activeTables = tables.filter(t => new RegExp(`\\b${t}\\b`, 'i').test(normalized));
    
    if (activeTables.length > 0) {
      // Parse columns in SELECT
      const selectIdx = uppercaseQuery.indexOf('SELECT');
      const selectPart = normalized.substring(selectIdx + 6, normalized.toLowerCase().indexOf('from')).trim();
      const selectCols = selectPart.split(',').map(c => c.trim().replace(/[*()]/g, ''));
      
      for (const col of selectCols) {
        if (!col || col === '*' || col.toUpperCase().includes('AVG') || col.toUpperCase().includes('SUM') || col.toUpperCase().includes('COUNT') || col.toUpperCase().includes('MAX') || col.toUpperCase().includes('MIN')) {
          continue;
        }

        // Handle Table.Column prefix format
        if (col.includes('.')) {
          const parts = col.split('.');
          if (parts.length === 2) {
            const colTable = parts[0].trim();
            const colName = parts[1].trim();
            const matchedTable = tables.find(t => t.toLowerCase() === colTable.toLowerCase());
            if (matchedTable) {
              const validCols = SCHEMA_INFO[matchedTable as keyof typeof SCHEMA_INFO];
              if (!validCols.some(c => c.toLowerCase() === colName.toLowerCase())) {
                return {
                  success: false,
                  message: `Column '${colName}' does not exist on table '${matchedTable}'.`,
                  highlight: col,
                  tip: `Available columns in '${matchedTable}' are: ${validCols.join(', ')}`
                };
              }
              continue; // Valid prefixed column
            }
          }
        }

        // Handle standard columns without table prefix
        let columnExists = false;
        for (const activeT of activeTables) {
          const validCols = SCHEMA_INFO[activeT as keyof typeof SCHEMA_INFO];
          if (validCols.some(c => c.toLowerCase() === col.toLowerCase())) {
            columnExists = true;
            break;
          }
        }

        if (!columnExists) {
          return {
            success: false,
            message: `Column '${col}' does not exist on the referenced tables.`,
            highlight: col,
            tip: `Check your spelling. Referenced tables are: ${activeTables.join(', ')}`
          };
        }
      }
    }
  }

  // 6. Missing Quotes around String Literals
  const missingQuotesMatch = normalized.match(/(\w+)\s*=\s*([a-zA-Z]{3,})\b/);
  if (missingQuotesMatch) {
    const col = missingQuotesMatch[1];
    const val = missingQuotesMatch[2];
    if (val.toUpperCase() !== 'NULL') {
      return {
        success: false,
        message: `Missing single quotes around the text value '${val}'.`,
        highlight: `${col} = ${val}`,
        suggestion: normalized.replace(`${col} = ${val}`, `${col} = '${val}'`),
        tip: "In SQL, text and date values must be enclosed in single quotes. Numbers should not have quotes."
      };
    }
  }

  // 7. NULL Comparison with '='
  if (uppercaseQuery.includes('= NULL') || uppercaseQuery.includes('<> NULL')) {
    const badPart = uppercaseQuery.includes('= NULL') ? '= NULL' : '<> NULL';
    return {
      success: false,
      message: "You are using standard operators to compare against NULL. In SQL, NULL represents an empty slot, so normal comparison fails.",
      highlight: badPart,
      suggestion: normalized.replace(/=\s*null/i, 'IS NULL').replace(/<>\s*null/i, 'IS NOT NULL'),
      tip: `Always use 'IS NULL' or 'IS NOT NULL' to find missing database records. Example: Phone IS NULL`
    };
  }

  // 8. Aggregate Misuse
  if (/(COUNT|SUM|AVG|MAX|MIN)\s+([A-Za-z0-9_*]+)/i.test(normalized) && !/(COUNT|SUM|AVG|MAX|MIN)\s*\(/i.test(normalized)) {
    const funcMatch = normalized.match(/(COUNT|SUM|AVG|MAX|MIN)\s+([A-Za-z0-9_*]+)/i);
    if (funcMatch) {
      return {
        success: false,
        message: `Incorrect usage of the aggregate function '${funcMatch[1]}'. Functions require arguments enclosed in parentheses.`,
        highlight: funcMatch[0],
        suggestion: normalized.replace(funcMatch[0], `${funcMatch[1]}(${funcMatch[2]})`),
        tip: "Always wrap the column name inside parentheses immediately after the aggregate function. For example: COUNT(*)"
      };
    }
  }

  // 9. Wrong Aggregate Column type
  const sumOrAvgNonNumeric = normalized.match(/(SUM|AVG)\s*\(\s*Name\s*\)/i);
  if (sumOrAvgNonNumeric) {
    return {
      success: false,
      message: `Invalid column for function '${sumOrAvgNonNumeric[1]}'. You cannot perform mathematical operations on text columns like 'Name'.`,
      highlight: sumOrAvgNonNumeric[0],
      suggestion: normalized.replace(sumOrAvgNonNumeric[0], `${sumOrAvgNonNumeric[1]}(Marks)`),
      tip: "Functions like SUM() and AVG() only accept numeric columns. Use them on columns like Marks or Salary."
    };
  }

  // 10. ORDER BY mistakes
  const orderMistake = normalized.match(/ORDER\s+([A-Za-z0-9_]+)/i);
  if (orderMistake && !/ORDER\s+BY/i.test(normalized)) {
    return {
      success: false,
      message: "You are missing the BY keyword in your ORDER clause.",
      highlight: orderMistake[0],
      suggestion: normalized.replace(/ORDER\s+/i, 'ORDER BY '),
      tip: "To sort results, you must use the complete 'ORDER BY' clause."
    };
  }

  // 11. Missing comma in select list
  if (uppercaseQuery.includes('SELECT') && uppercaseQuery.includes('FROM')) {
    const selectIdx = uppercaseQuery.indexOf('SELECT');
    const selectPart = normalized.substring(selectIdx + 6, normalized.toLowerCase().indexOf('from')).trim();
    if (/\w+\s+\w+/i.test(selectPart) && !selectPart.includes(',') && selectPart !== '*') {
      return {
        success: false,
        message: "Multiple columns in a SELECT statement must be separated by commas.",
        highlight: selectPart,
        suggestion: `SELECT ${selectPart.split(/\s+/).join(', ')} FROM ...`,
        tip: "Double check your column names. If selecting more than one column, put a comma between them."
      };
    }
  }

  // 12. Invalid Clause Order (e.g. WHERE before FROM)
  if (uppercaseQuery.indexOf('WHERE') !== -1 && uppercaseQuery.indexOf('FROM') !== -1 && uppercaseQuery.indexOf('WHERE') < uppercaseQuery.indexOf('FROM')) {
    return {
      success: false,
      message: "Your clauses are in the wrong order. In SQL, the FROM clause must come before the WHERE clause.",
      highlight: normalized,
      tip: "The correct sequence is: SELECT ... FROM ... WHERE ... ORDER BY ..."
    };
  }



  // Run on SQLite
  try {
    if (!dbInstance) {
      return {
        success: false,
        message: "Database engine is still initializing. Please wait a second and try again."
      };
    }

    // Views validation: if it's CREATE VIEW, execute and then select from it to verify
    if (uppercaseQuery.includes('CREATE VIEW')) {
      // Execute the view creation
      dbInstance.run(query);
      // Retrieve the columns and rows of the newly created view to verify
      const viewMatch = query.match(/CREATE\s+VIEW\s+([a-zA-Z0-9_]+)/i);
      const viewName = viewMatch ? viewMatch[1] : 'IndianUsers';
      const testRes = dbInstance.exec(`SELECT * FROM ${viewName};`);
      if (testRes.length === 0) {
        return {
          success: true,
          result: {
            columns: ['Status'],
            rows: [['View created successfully, but contains no records.']]
          }
        };
      }
      return {
        success: true,
        result: {
          columns: testRes[0].columns,
          rows: testRes[0].values
        }
      };
    }

    const execRes = dbInstance.exec(query);
    if (execRes.length === 0) {
      return {
        success: true,
        result: {
          columns: ['Message'],
          rows: [['Empty result-set returned.']]
        }
      };
    }

    // Semicolon warning reminder (still succeeds)
    const hasSemicolon = query.trim().endsWith(';');
    const successMsg = hasSemicolon 
      ? undefined 
      : "Excellent query! Note: You forgot the semicolon ';' at the end. While most browsers allow this, it is standard practice to end SQL statements with a semicolon.";

    return {
      success: true,
      message: successMsg,
      result: {
        columns: execRes[0].columns,
        rows: execRes[0].values
      }
    };
  } catch (err: any) {
    // Unrecognized SQLite errors
    return {
      success: false,
      message: err.message || "An unexpected SQL syntax error occurred.",
      highlight: normalized,
      tip: "Double-check columns, spelling, and basic SQL grammar. Select hints for detailed help."
    };
  }
}
