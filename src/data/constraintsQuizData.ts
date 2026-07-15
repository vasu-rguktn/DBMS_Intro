export type Challenge = {
  id: number;
  constraint: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: string;
  definition: string;
  reasoning: string;
  visual?: string; // Optional simple textual visual representation
  sql?: string; // Optional SQL representation
};

export const constraintsQuizData: Challenge[] = [
  {
    id: 1,
    constraint: "NOT NULL",
    scenario: "You are creating a new social media account but leave the username empty. The app does not allow you to create the account.",
    question: "Why does the app require you to enter a username?",
    options: [
      "The username cannot be left empty",
      "Every username must be a number",
      "The app randomly rejects accounts",
      "All users must have the same username"
    ],
    correctAnswer: "The username cannot be left empty",
    definition: "Prevents missing values.",
    reasoning: "The `username` field cannot contain `NULL`. A value must be provided before the account can be created."
  },
  {
    id: 2,
    constraint: "UNIQUE",
    scenario: "You try to create the username `@vasu`, but another user already has it. The app asks you to choose a different username.",
    question: "Why can't two users have the same username?",
    options: [
      "Usernames must be unique",
      "Usernames cannot contain letters",
      "Only one user can use the app",
      "The username must match the password"
    ],
    correctAnswer: "Usernames must be unique",
    definition: "Prevents duplicate values.",
    reasoning: "The `username` field does not allow duplicate values. Every username must be different."
  },
  {
    id: 3,
    constraint: "PRIMARY KEY",
    scenario: "Two users may both have the display name “Vasu”, but the app still knows that they are two different accounts.",
    question: "How can the database uniquely identify each account?",
    options: [
      "By assigning every account a unique user ID",
      "By using only the display name",
      "By giving all users the same ID",
      "By storing no identification value"
    ],
    correctAnswer: "By assigning every account a unique user ID",
    definition: "Uniquely identifies each record.",
    reasoning: "A unique `user_id` can act as the Primary Key and uniquely identify every user record."
  },
  {
    id: 4,
    constraint: "FOREIGN KEY",
    scenario: "You upload a photo. Later, the app can still identify exactly which account uploaded that post.",
    question: "How can the database connect the post to your user account?",
    options: [
      "Store the user's ID with the post",
      "Store only the image colour",
      "Give every post the same user ID",
      "Keep the post completely unrelated to users"
    ],
    correctAnswer: "Store the user's ID with the post",
    definition: "Connects a record to another table.",
    reasoning: "The `user_id` stored in the Post table can act as a Foreign Key referencing the user who created the post.",
    visual: "USER (user_id) → POST (user_id)\nPrimary Key → Foreign Key"
  },
  {
    id: 5,
    constraint: "CHECK",
    scenario: "A social media app requires users to be at least 13 years old. A user enters age 10, and the registration is rejected.",
    question: "Why is the value rejected?",
    options: [
      "The age does not satisfy the required condition",
      "The database accepts only age 10",
      "Age must always be empty",
      "Every user must have the same age"
    ],
    correctAnswer: "The age does not satisfy the required condition",
    definition: "Allows values only when a condition is satisfied.",
    reasoning: "A condition such as `age >= 13` can be checked before the value is accepted.",
    sql: "CHECK (age >= 13)"
  },
  {
    id: 6,
    constraint: "DEFAULT",
    scenario: "You create a new account without selecting a privacy setting. The app automatically sets the account to “Public”.",
    question: "How did the database assign “Public” even though you did not select it?",
    options: [
      "A predefined value was automatically assigned",
      "The database deleted the account",
      "Every field was left empty",
      "Another user selected it"
    ],
    correctAnswer: "A predefined value was automatically assigned",
    definition: "Automatically provides a value when none is specified.",
    reasoning: "A Default Constraint automatically provides a predefined value when the user does not provide one.",
    sql: "privacy DEFAULT 'Public'"
  },
  {
    id: 7,
    constraint: "DOMAIN",
    scenario: "While choosing an account type, the app allows only Personal, Creator, or Business.",
    question: "Why can't you enter a random value such as “Student123”?",
    options: [
      "The field accepts only values from an allowed set",
      "The field accepts every possible value",
      "Account type must always be a number",
      "The database does not store account types"
    ],
    correctAnswer: "The field accepts only values from an allowed set",
    definition: "Restricts an attribute to a valid set or type of values.",
    reasoning: "The attribute has a defined set of valid values. Values outside that domain should not be accepted.",
    visual: "Account Type ∈ {Personal, Creator, Business}"
  },
  {
    id: 8,
    constraint: "COMPOSITE KEY",
    scenario: "You like a particular post. The database should not create multiple identical like records for the same user and the same post.",
    question: "How can the database uniquely identify each user–post like combination?",
    options: [
      "Combine the user ID and post ID",
      "Use only the user's display name",
      "Give every like the same value",
      "Remove the post ID"
    ],
    correctAnswer: "Combine the user ID and post ID",
    definition: "Uses multiple attributes together to uniquely identify a record.",
    reasoning: "The combination of `user_id` and `post_id` can uniquely identify a like and prevent the same user–post combination from appearing twice.",
    visual: "(user_id + post_id) = Unique Like\n(U101, P501) ✓\n(U101, P501) ✗ Duplicate"
  },
  {
    id: 9,
    constraint: "CANDIDATE KEY",
    scenario: "A user account has a unique `user_id`, a unique `username`, and a unique `email`. Each one can uniquely identify the account.",
    question: "What do we call the possible attributes that are capable of uniquely identifying the user?",
    options: [
      "Candidate Keys",
      "Foreign Keys",
      "NULL Values",
      "Duplicate Keys"
    ],
    correctAnswer: "Candidate Keys",
    definition: "A possible minimal key capable of uniquely identifying a record.",
    reasoning: "A Candidate Key is an attribute, or minimal set of attributes, capable of uniquely identifying a record. One Candidate Key can be selected as the Primary Key."
  },
  {
    id: 10,
    constraint: "ENTITY INTEGRITY",
    scenario: "A new user account is created, but its Primary Key `user_id` is missing.",
    question: "Should the database allow this account to be stored?",
    options: [
      "No, a Primary Key cannot be NULL",
      "Yes, every Primary Key should be empty",
      "Yes, all users can have NULL IDs",
      "No, because usernames cannot contain letters"
    ],
    correctAnswer: "No, a Primary Key cannot be NULL",
    definition: "A Primary Key cannot be NULL.",
    reasoning: "Entity Integrity ensures that the Primary Key of a record cannot be `NULL`. Every entity must be uniquely identifiable."
  },
  {
    id: 11,
    constraint: "REFERENTIAL INTEGRITY",
    scenario: "A post has already been deleted. Someone tries to add a new comment that refers to that deleted post.",
    question: "Should the database allow the comment to reference a post that no longer exists?",
    options: [
      "No, the referenced post must exist",
      "Yes, comments do not need a post",
      "Yes, any random post ID is valid",
      "No, because comments cannot contain text"
    ],
    correctAnswer: "No, the referenced post must exist",
    definition: "A Foreign Key must refer to a valid referenced record, unless NULL is permitted.",
    reasoning: "Referential Integrity ensures that a Foreign Key refers to an existing record in the referenced table.",
    visual: "COMMENT.post_id → POST.post_id\nExisting Post: ✓ Valid\nNon-existing Post: ✗ Invalid Reference"
  }
];
