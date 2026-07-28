export interface OperatorConfig {
  id: string;
  name: string;
  symbol: string;
  meaning: string;
  app: 'Snapchat' | 'Instagram' | 'Netflix' | 'Amazon' | 'WhatsApp' | 'Google Maps' | 'Swiggy' | 'Zomato' | 'Uber' | 'Spotify';
  scenario: string;
  puzzleQuestion: string;
  puzzleOptions: string[];
  correctPuzzleOption: number;
  sqlEquivalent: string;
  raEquivalent: string;
  tableBefore: { columns: string[], data: any[][] };
  tableAfter: { columns: string[], data: any[][] };
  quizQuestion: string;
  quizOptions: string[];
  correctQuizOption: number;
  group: 'Basic' | 'Join' | 'Advanced';
}

export const operatorsData: OperatorConfig[] = [
  // Basic Operators
  {
    id: 'selection', name: 'Selection', symbol: 'σ', meaning: 'Select rows satisfying a condition.',
    group: 'Basic', app: 'Snapchat',
    scenario: "Alex opens Chats. The database has millions of users' messages.",
    puzzleQuestion: "How does Snapchat find only YOUR chats among millions of rows?",
    puzzleOptions: ["Filter columns", "Filter rows (UserID = Alex)", "Combine tables", "Remove duplicates"],
    correctPuzzleOption: 1,
    sqlEquivalent: "SELECT *\nFROM Chats\nWHERE UserID = 'Alex';", raEquivalent: "σ UserID='Alex' (Chats)",
    tableBefore: { columns: ['ChatID', 'UserID', 'Message'], data: [[1, 'Alex', 'Hey!'], [2, 'Sam', 'Sup?'], [3, 'Alex', 'Look at this']] },
    tableAfter: { columns: ['ChatID', 'UserID', 'Message'], data: [[1, 'Alex', 'Hey!'], [3, 'Alex', 'Look at this']] },
    quizQuestion: "Instagram wants ONLY posts created today. Which operator?",
    quizOptions: ["Selection (σ)", "Projection (π)", "Union (∪)", "Join (⋈)"], correctQuizOption: 0
  },
  {
    id: 'projection', name: 'Projection', symbol: 'π', meaning: 'Select specific columns.',
    group: 'Basic', app: 'Instagram',
    scenario: "When viewing a profile, the app only needs the username and bio.",
    puzzleQuestion: "How do we hide sensitive columns like Passwords?",
    puzzleOptions: ["Filter rows", "Combine tables", "Extract specific columns (Username, Bio)", "Rename table"],
    correctPuzzleOption: 2,
    sqlEquivalent: "SELECT Username, Bio\nFROM Users;", raEquivalent: "π Username, Bio (Users)",
    tableBefore: { columns: ['UserID', 'Username', 'Password', 'Bio'], data: [[101, 'alex_cool', 'hash1', 'Photographer'], [102, 'sam_travel', 'hash2', 'Wanderlust']] },
    tableAfter: { columns: ['Username', 'Bio'], data: [['alex_cool', 'Photographer'], ['sam_travel', 'Wanderlust']] },
    quizQuestion: "Amazon wants to show just Product Name and Price. Which operator?",
    quizOptions: ["Selection (σ)", "Projection (π)", "Union (∪)", "Difference (−)"], correctQuizOption: 1
  },
  {
    id: 'union', name: 'Union', symbol: '∪', meaning: 'Combine rows from two tables.',
    group: 'Basic', app: 'Instagram',
    scenario: "You want to see all your followers from both your Private and Business accounts.",
    puzzleQuestion: "How do we merge two lists of followers?",
    puzzleOptions: ["Find common followers", "Merge both lists (A OR B)", "Find followers only in Private", "Rename table"],
    correctPuzzleOption: 1,
    sqlEquivalent: "SELECT UserID FROM PrivateFollowers\nUNION\nSELECT UserID FROM BusinessFollowers;", raEquivalent: "PrivateFollowers ∪ BusinessFollowers",
    tableBefore: { columns: ['UserID'], data: [['User A'], ['User B']] }, // Simplified for visualizer
    tableAfter: { columns: ['UserID'], data: [['User A'], ['User B'], ['User C']] },
    quizQuestion: "Netflix wants a list of users who watched Action OR Comedy movies. Operator?",
    quizOptions: ["Union (∪)", "Intersection (∩)", "Difference (−)", "Join (⋈)"], correctQuizOption: 0
  },
  {
    id: 'difference', name: 'Difference', symbol: '−', meaning: 'Rows in Table A but not in Table B.',
    group: 'Basic', app: 'Snapchat',
    scenario: "Snapchat wants to find friends who have NEVER sent you a snap.",
    puzzleQuestion: "How do we find friends without snaps?",
    puzzleOptions: ["All Friends + All Snaps", "All Friends minus Friends who sent snaps", "Friends AND Snaps", "Filter columns"],
    correctPuzzleOption: 1,
    sqlEquivalent: "SELECT UserID FROM Friends\nEXCEPT\nSELECT UserID FROM SnapsSent;", raEquivalent: "Friends − SnapsSent",
    tableBefore: { columns: ['UserID'], data: [['Alex'], ['Sam'], ['Jordan']] },
    tableAfter: { columns: ['UserID'], data: [['Jordan']] },
    quizQuestion: "Amazon wants customers who bought phones BUT NOT cases. Operator?",
    quizOptions: ["Union (∪)", "Intersection (∩)", "Difference (−)", "Join (⋈)"], correctQuizOption: 2
  },
  {
    id: 'cartesian', name: 'Cartesian Product', symbol: '×', meaning: 'Combine every row of A with every row of B.',
    group: 'Basic', app: 'Snapchat',
    scenario: "Snapchat launches a feature testing EVERY filter on EVERY selfie.",
    puzzleQuestion: "How do we generate all possible combinations?",
    puzzleOptions: ["Union", "Difference", "Cross multiply every row", "Natural Join"],
    correctPuzzleOption: 2,
    sqlEquivalent: "SELECT *\nFROM Selfies CROSS JOIN Filters;", raEquivalent: "Selfies × Filters",
    tableBefore: { columns: ['SelfieID'], data: [['S1'], ['S2']] },
    tableAfter: { columns: ['SelfieID', 'FilterID'], data: [['S1', 'F1'], ['S1', 'F2'], ['S2', 'F1'], ['S2', 'F2']] },
    quizQuestion: "Which operator generates the maximum number of combinations?",
    quizOptions: ["Join (⋈)", "Union (∪)", "Cartesian Product (×)", "Intersection (∩)"], correctQuizOption: 2
  },
  {
    id: 'rename', name: 'Rename', symbol: 'ρ', meaning: 'Rename a table or attributes.',
    group: 'Basic', app: 'Netflix',
    scenario: "A DB Engineer needs to save temporary results as 'ActiveUsers'.",
    puzzleQuestion: "How do we change the table's name?",
    puzzleOptions: ["Create a new table", "Rename (Alias) the result", "Join tables", "Filter rows"],
    correctPuzzleOption: 1,
    sqlEquivalent: "SELECT * FROM Users AS ActiveUsers;", raEquivalent: "ρ ActiveUsers (Users)",
    tableBefore: { columns: ['OldName_ID'], data: [['A']] },
    tableAfter: { columns: ['NewName_ID'], data: [['A']] },
    quizQuestion: "What is the SQL keyword corresponding to Rename (ρ)?",
    quizOptions: ["WHERE", "AS", "IN", "EXCEPT"], correctQuizOption: 1
  },

  // Derived - Joins
  {
    id: 'join', name: 'Join', symbol: '⋈', meaning: 'Combine rows based on a condition.',
    group: 'Join', app: 'WhatsApp',
    scenario: "You have a Messages table (with SenderID) and a Users table (with Name).",
    puzzleQuestion: "How do we display the actual names next to the messages?",
    puzzleOptions: ["Union", "Difference", "Join tables where SenderID = UserID", "Projection"],
    correctPuzzleOption: 2,
    sqlEquivalent: "SELECT *\nFROM Messages\nINNER JOIN Users ON Messages.SenderID = Users.UserID;", raEquivalent: "Messages ⋈ Users",
    tableBefore: { columns: ['Msg', 'SenderID'], data: [['Hi', 101], ['Hello', 102]] },
    tableAfter: { columns: ['Msg', 'Name'], data: [['Hi', 'Alex'], ['Hello', 'Sam']] },
    quizQuestion: "Which operator is most commonly used to combine related tables?",
    quizOptions: ["Join (⋈)", "Union (∪)", "Difference (−)", "Rename (ρ)"], correctQuizOption: 0
  },
  {
    id: 'theta_join', name: 'Theta Join', symbol: '⋈θ', meaning: 'Join using a generic condition (>, <, !=).',
    group: 'Join', app: 'Swiggy',
    scenario: "Compare two restaurants: find cases where Restaurant A's delivery time is strictly greater than Restaurant B's.",
    puzzleQuestion: "How do we join on a condition other than equality?",
    puzzleOptions: ["Equi Join", "Natural Join", "Theta Join (using >)", "Outer Join"],
    correctPuzzleOption: 2,
    sqlEquivalent: "SELECT *\nFROM RestA JOIN RestB ON RestA.Time > RestB.Time;", raEquivalent: "RestA ⋈ (TimeA > TimeB) RestB",
    tableBefore: { columns: ['RestA_Time'], data: [[45], [20]] },
    tableAfter: { columns: ['RestA_Time', 'RestB_Time'], data: [[45, 30], [45, 20]] },
    quizQuestion: "Which symbol represents a Theta Join?",
    quizOptions: ["⋈", "⋈θ", "⟕", "×"], correctQuizOption: 1
  },
  {
    id: 'equi_join', name: 'Equi Join', symbol: '⋈=', meaning: 'Join using equality condition.',
    group: 'Join', app: 'Uber',
    scenario: "Match rides with drivers where DriverID is exactly equal.",
    puzzleQuestion: "Which join strictly uses the '=' operator?",
    puzzleOptions: ["Theta Join", "Equi Join", "Outer Join", "Cross Join"],
    correctPuzzleOption: 1,
    sqlEquivalent: "SELECT *\nFROM Rides JOIN Drivers ON Rides.DriverID = Drivers.DriverID;", raEquivalent: "Rides ⋈ (DriverID=DriverID) Drivers",
    tableBefore: { columns: ['Ride_DriverID'], data: [[5]] },
    tableAfter: { columns: ['Ride_DriverID', 'DriverName'], data: [[5, 'John']] },
    quizQuestion: "An Equi Join is a special case of which join?",
    quizOptions: ["Outer Join", "Theta Join", "Natural Join", "Cross Join"], correctQuizOption: 1
  },
  {
    id: 'natural_join', name: 'Natural Join', symbol: '⋈', meaning: 'Auto-join on common columns, removing duplicates.',
    group: 'Join', app: 'Spotify',
    scenario: "Join Playlists and Tracks. Both have a 'TrackID' column.",
    puzzleQuestion: "How do we join without specifying the ON clause and avoid duplicate columns?",
    puzzleOptions: ["Natural Join", "Equi Join", "Theta Join", "Left Outer Join"],
    correctPuzzleOption: 0,
    sqlEquivalent: "SELECT *\nFROM Playlists NATURAL JOIN Tracks;", raEquivalent: "Playlists ⋈ Tracks",
    tableBefore: { columns: ['TrackID'], data: [[1]] },
    tableAfter: { columns: ['TrackID', 'SongName'], data: [[1, 'Bohemian Rhapsody']] },
    quizQuestion: "What does Natural Join automatically do?",
    quizOptions: ["Creates duplicates", "Matches on common column names and removes duplicate columns", "Keeps all rows", "Generates cross product"], correctQuizOption: 1
  },
  {
    id: 'left_outer', name: 'Left Outer Join', symbol: '⟕', meaning: 'Keep all rows from left table, matching right rows or NULL.',
    group: 'Join', app: 'Amazon',
    scenario: "Show ALL customers, and their orders if they made any. Some customers haven't ordered.",
    puzzleQuestion: "How do we keep customers without orders?",
    puzzleOptions: ["Inner Join", "Left Outer Join", "Right Outer Join", "Difference"],
    correctPuzzleOption: 1,
    sqlEquivalent: "SELECT *\nFROM Customers LEFT JOIN Orders ON C.ID = O.CustID;", raEquivalent: "Customers ⟕ Orders",
    tableBefore: { columns: ['Customer'], data: [['Alice'], ['Bob']] },
    tableAfter: { columns: ['Customer', 'Order'], data: [['Alice', 'Laptop'], ['Bob', 'NULL']] },
    quizQuestion: "Which symbol represents Left Outer Join?",
    quizOptions: ["⟕", "⟖", "⟗", "⋈"], correctQuizOption: 0
  },
  {
    id: 'right_outer', name: 'Right Outer Join', symbol: '⟖', meaning: 'Keep all rows from right table, matching left rows or NULL.',
    group: 'Join', app: 'Amazon',
    scenario: "Show ALL orders, even if the customer account was deleted.",
    puzzleQuestion: "How do we keep all orders (the right table)?",
    puzzleOptions: ["Left Outer Join", "Right Outer Join", "Full Outer Join", "Inner Join"],
    correctPuzzleOption: 1,
    sqlEquivalent: "SELECT *\nFROM Customers RIGHT JOIN Orders ON C.ID = O.CustID;", raEquivalent: "Customers ⟖ Orders",
    tableBefore: { columns: ['Order'], data: [['Order1'], ['Order2']] },
    tableAfter: { columns: ['Customer', 'Order'], data: [['Alice', 'Order1'], ['NULL', 'Order2']] },
    quizQuestion: "Which table's rows are preserved in a Right Outer Join?",
    quizOptions: ["Left", "Right", "Both", "Neither"], correctQuizOption: 1
  },
  {
    id: 'full_outer', name: 'Full Outer Join', symbol: '⟗', meaning: 'Keep all rows from both tables, filling with NULLs where no match.',
    group: 'Join', app: 'Zomato',
    scenario: "Merge active users and active restaurants, keeping ALL users and ALL restaurants.",
    puzzleQuestion: "How do we keep unmatched rows from BOTH sides?",
    puzzleOptions: ["Left Outer", "Right Outer", "Full Outer Join", "Cross Join"],
    correctPuzzleOption: 2,
    sqlEquivalent: "SELECT *\nFROM Users FULL OUTER JOIN Restaurants ON U.City = R.City;", raEquivalent: "Users ⟗ Restaurants",
    tableBefore: { columns: ['User', 'City'], data: [['U1', 'Delhi']] },
    tableAfter: { columns: ['User', 'Rest'], data: [['U1', 'R1'], ['U2', 'NULL'], ['NULL', 'R3']] },
    quizQuestion: "Full Outer Join is the union of which two operations?",
    quizOptions: ["Inner & Cross", "Left & Right Outer", "Theta & Equi", "Selection & Projection"], correctQuizOption: 1
  },

  // Derived - Advanced
  {
    id: 'intersection', name: 'Intersection', symbol: '∩', meaning: 'Rows present in BOTH tables.',
    group: 'Advanced', app: 'Instagram',
    scenario: "Find users who both LIKED and COMMENTED on a post.",
    puzzleQuestion: "How do we find the common users?",
    puzzleOptions: ["Union", "Intersection", "Difference", "Join"],
    correctPuzzleOption: 1,
    sqlEquivalent: "SELECT UserID FROM Likers\nINTERSECT\nSELECT UserID FROM Commenters;", raEquivalent: "Likers ∩ Commenters",
    tableBefore: { columns: ['UserID'], data: [['A'], ['B']] },
    tableAfter: { columns: ['UserID'], data: [['B']] }, // Only B is in both
    quizQuestion: "Which operator is the opposite of Union in set theory?",
    quizOptions: ["Difference", "Intersection", "Cartesian", "Rename"], correctQuizOption: 1
  },
  {
    id: 'division', name: 'Division', symbol: '÷', meaning: 'Find entities that match ALL entities in another set.',
    group: 'Advanced', app: 'Netflix',
    scenario: "Find users who have watched ALL episodes of Stranger Things.",
    puzzleQuestion: "How do we find users who watched every single episode?",
    puzzleOptions: ["Union", "Join", "Division", "Intersection"],
    correctPuzzleOption: 2,
    sqlEquivalent: "SELECT UserID\nFROM Watched\nGROUP BY UserID\nHAVING COUNT(DISTINCT EpisodeID) = (SELECT COUNT(*) FROM Episodes);", raEquivalent: "Watched ÷ Episodes",
    tableBefore: { columns: ['User', 'Episode'], data: [['A', 'E1'], ['A', 'E2'], ['B', 'E1']] },
    tableAfter: { columns: ['User'], data: [['A']] },
    quizQuestion: "Which operator is used to answer queries with 'ALL' or 'EVERY'?",
    quizOptions: ["Union", "Intersection", "Division", "Theta Join"], correctQuizOption: 2
  }
];
