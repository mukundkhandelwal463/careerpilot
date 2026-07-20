import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import { 
  ArrowLeft, 
  Terminal, 
  Cpu, 
  Clock, 
  Sparkles, 
  Check, 
  Copy, 
  Award, 
  CircleDot,
  Calculator,
  HelpCircle,
  Database,
  CheckCircle2
} from 'lucide-react';
import { questionBankData } from '../data/questionBankData.js';

const dbmsConcepts = [
  {
    "id": "dbms_rdbms_basics",
    "index": "01",
    "name": "RDBMS Basics (MySQL & PostgreSQL)",
    "overview": "Relational Databases store data in structured tables with rows and columns, enforcing predefined schemas.",
    "detailedTheory": "Relational Database Management Systems (RDBMS) utilize Structured Query Language (SQL) for database operations. Common engines include MySQL (default port 3306) and PostgreSQL (default port 5432). While MySQL is widely used for web apps due to speed, PostgreSQL is an Object-Relational Database (ORDBMS) offering advanced data types, strict compliance, and complex join optimizations.",
    "dryRun": "1. Client establishes connection on MySQL (Port 3306) or PostgreSQL (Port 5432).\n2. Parser validates syntax and checks schema metadata.\n3. Query Optimizer evaluates indices and builds execution plan.\n4. Storage Engine (e.g. InnoDB for MySQL) reads pages from disk and locks rows.",
    "visualTrace": "Client Connection (Port 3306/5432)\n      │\n      ▼\n  SQL Parser (Syntax Check)\n      │\n      ▼\nQuery Optimizer (Chooses Clustered vs Non-Clustered Index)\n      │\n      ▼\nStorage Engine (Reads blocks of physical memory)",
    "code": {
      "java": "// Java connection example using JDBC\nimport java.sql.Connection;\nimport java.sql.DriverManager;\nimport java.sql.ResultSet;\nimport java.sql.Statement;\n\npublic class DbAccess {\n    public static void main(String[] args) throws Exception {\n        String url = \"jdbc:postgresql://localhost:5432/prephub\";\n        Connection conn = DriverManager.getConnection(url, \"postgres\", \"secure123\");\n        Statement stmt = conn.createStatement();\n        ResultSet rs = stmt.executeQuery(\"SELECT name, port FROM engines\");\n        while(rs.next()) {\n            System.out.println(rs.getString(\"name\") + \" on \" + rs.getInt(\"port\"));\n        }\n        conn.close();\n    }\n}",
      "cpp": "// C++ SQL connection concept\n#include <iostream>\n#include <pqxx/pqxx> // PostgreSQL C++ client library\n\nint main() {\n    try {\n        pqxx::connection c(\"dbname=prephub user=postgres password=secure123 host=127.0.0.1 port=5432\");\n        pqxx::work w(c);\n        pqxx::result r = w.exec(\"SELECT name FROM engines\");\n        for (auto row : r) {\n            std::cout << row[0].as<std::string>() << std::endl;\n        }\n    } catch (const std::exception &e) {\n        std::cerr << e.what() << std::endl;\n    }\n    return 0;\n}",
      "python": "# Python connection example using psycopg2\nimport psycopg2\n\ntry:\n    conn = psycopg2.connect(\n        database=\"prephub\", user=\"postgres\", password=\"secure123\", host=\"127.0.0.1\", port=\"5432\"\n    )\n    cur = conn.cursor()\n    cur.execute(\"SELECT name, port FROM engines;\")\n    for row in cur.fetchall():\n        print(f\"Database: {row[0]}, Port: {row[1]}\")\n    conn.close()\nexcept Exception as e:\n    print(f\"Database Connection Error: {e}\")",
      "js": "// Node.js connection using pg (PostgreSQL Client)\nconst { Client } = require('pg');\n\nconst client = new Client({\n  host: 'localhost',\n  port: 5432,\n  database: 'prephub',\n  user: 'postgres',\n  password: 'secure123'\n});\n\nclient.connect()\n  .then(() => client.query('SELECT name, port FROM engines'))\n  .then(res => {\n    res.rows.forEach(row => console.log(`${row.name} - Port ${row.port}`));\n    client.end();\n  })\n  .catch(e => console.error(e));"
    },
    "interviewQ": "What is the difference between MySQL and PostgreSQL?",
    "interviewA": "MySQL is a pure relational database known for rapid read performance, using storage engines like InnoDB. PostgreSQL is an object-relational database (ORDBMS) emphasizing extensibility, ACID compliance, MVCC concurrency, and supporting advanced SQL syntax and custom data types."
  },
  {
    "id": "dbms_keys",
    "index": "02",
    "name": "Keys (Primary, Foreign, Candidate, Unique)",
    "overview": "Keys uniquely identify rows and define relationships between tables, ensuring relational integrity.",
    "detailedTheory": "A Superkey is a set of one or more attributes that uniquely identifies tuples. A Candidate Key is a minimal superkey (no redundant attributes). A Primary Key is the candidate key chosen by the DBA to uniquely identify rows (cannot contain NULLs). A Unique Key also ensures uniqueness but allows a single NULL value. A Foreign Key is a set of attributes in a child table referencing a candidate key (usually primary key) of a parent table, enforcing Referential Integrity.",
    "dryRun": "1. Client inserts child row with foreign key value.\n2. DBMS checks parent table. If parent row does not exist, constraint violation is raised.\n3. Client deletes parent row. DBMS checks ON DELETE constraint (e.g. CASCADE deletes child rows, RESTRICT blocks deletion).",
    "visualTrace": "Parent Table: USERS              Child Table: ORDERS\n+----------------------+           +----------------------+\n| User_ID (PK)  | Name |           | Order_ID | User_ID*  |\n+----------------------+           +----------------------+\n| 101          | Alice | <───────+ | 9001     | 101       | (Valid ref)\n| 102          | Bob   |           | 9002     | 999       | (Invalid ref -> REFERENTIAL INTEGRITY FAILS)\n+----------------------+           +----------------------+",
    "code": {
      "java": "// Java JDBC checking table key metadata\nimport java.sql.*;\n\npublic class MetaKeys {\n    public static void main(String[] args) throws Exception {\n        Connection conn = DriverManager.getConnection(\"jdbc:postgresql://localhost:5432/prephub\", \"postgres\", \"secure123\");\n        DatabaseMetaData meta = conn.getMetaData();\n        ResultSet rs = meta.getImportedKeys(null, null, \"orders\");\n        while (rs.next()) {\n            System.out.println(\"FK column: \" + rs.getString(\"FKCOLUMN_NAME\") +\n                               \" references PK column: \" + rs.getString(\"PKCOLUMN_NAME\"));\n        }\n        conn.close();\n    }\n}",
      "cpp": "// C++ SQL DDL constraints declaration\n#include <iostream>\n#include <string>\n\n// Conceptual SQL representation:\nconst std::string CREATE_TABLE_SQL = \n    \"CREATE TABLE orders (\\n\"\n    \"    order_id INT PRIMARY KEY,\\n\"\n    \"    user_id INT,\\n\"\n    \"    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE\\n\"\n    \");\";",
      "python": "# Python script executing key constraints\nimport psycopg2\n\nconn = psycopg2.connect(\"dbname=prephub user=postgres password=secure123\")\ncur = conn.cursor()\n\n# Create tables with PK/FK constraints\ncur.execute(\"\"\"\n    CREATE TABLE IF NOT EXISTS users (\n        user_id SERIAL PRIMARY KEY,\n        email VARCHAR(255) UNIQUE NOT NULL\n    );\n    CREATE TABLE IF NOT EXISTS orders (\n        order_id SERIAL PRIMARY KEY,\n        user_id INT REFERENCES users(user_id) ON DELETE CASCADE\n    );\n\"\"\")\nconn.commit()\nconn.close()",
      "js": "// Node.js defining models with Sequelize (ORM constraints)\n// const { DataTypes } = require('sequelize');\n// Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });"
    },
    "interviewQ": "What is the difference between Primary Key and Unique Key?",
    "interviewA": "A table can have only one Primary Key, which cannot accept NULL values and automatically creates a clustered index by default. A table can have multiple Unique Keys, which accept a single NULL value and create a non-clustered index."
  },
  {
    "id": "dbms_normalization",
    "index": "03",
    "name": "Normalization & Normal Forms",
    "overview": "Normalization structures database relations to minimize data redundancy and prevent update/delete anomalies.",
    "detailedTheory": "Normal Forms check relations progressively: 1NF: Attribute values must be atomic (no multi-valued columns). 2NF: Must be in 1NF and have no Partial Dependencies (non-prime attributes must depend on the whole candidate key, not part of it). 3NF: Must be in 2NF and have no Transitive Dependencies (non-prime attributes must not depend on other non-prime attributes). BCNF (Boyce-Codd Normal Form): For every functional dependency X -> Y, X must be a superkey.",
    "dryRun": "To normalize R(Student, Course, Instructor, Grade) with dependencies:\n1. Find candidate keys.\n2. Look for partial dependencies (violates 2NF).\n3. Look for transitive dependencies (violates 3NF).\n4. Decompose relations into smaller tables and verify lossless join property.",
    "visualTrace": "Unnormalized: R(StudentID, CourseID, CourseFee) -> Partial Dependency (CourseID -> CourseFee)\n   │\n   ▼ (Decompose into 2NF)\nTable 1: R1(StudentID, CourseID) (PK: StudentID, CourseID)\nTable 2: R2(CourseID, CourseFee) (PK: CourseID)",
    "code": {
      "java": "// Concept of normalization: mapping object relations to prevent redundancy\npublic class UserProfile {\n    int userId;\n    String username;\n    // Instead of duplicating Address fields, reference normalized address model\n    Address address;\n}\nclass Address {\n    int addressId;\n    String city;\n    String zip;\n}",
      "cpp": "// C++ representations of normalized tables structures\n#include <string>\n\nstruct NormalizedUser {\n    int user_id; // Primary Key\n    std::string username;\n};\n\nstruct NormalizedContact {\n    int contact_id; // Primary Key\n    int user_id;    // Foreign Key references NormalizedUser\n    std::string phone_number;\n};",
      "python": "# Normalizing functional dependencies solver utility\ndef find_closure(attributes, fds):\n    closure = set(attributes)\n    while True:\n        before_len = len(closure)\n        for lhs, rhs in fds:\n            if set(lhs).issubset(closure):\n                closure.update(rhs)\n        if len(closure) == before_len:\n            break\n    return closure",
      "js": "// Schema decomposition verification\nconst hasTransitiveDependency = (fds) => {\n  // checks if non-key attributes determine other non-key attributes\n  return true;\n};"
    },
    "interviewQ": "Why is BCNF stricter than 3NF?",
    "interviewA": "3NF allows dependency X -> A where X is not a superkey, provided that A is a prime attribute (part of a candidate key). BCNF removes this exception: every determinant X in functional dependency X -> Y must be a superkey, with no exceptions for prime attributes."
  },
  {
    "id": "dbms_joins",
    "index": "04",
    "name": "Joins (Inner, Left, Right, Full, Self)",
    "overview": "Joins merge records from two or more tables based on a matching conditional attribute.",
    "detailedTheory": "Different join operations yield distinct results: Inner Join returns rows with matching keys in both tables. Left Join returns all rows from the left table and matched rows from the right table (filling NULLs for unmatched). Right Join is the mirror opposite. Full Join returns all records if there is a match in left or right tables. Self Join joins a table to itself, useful for hierarchical structures (e.g. Employee and Manager IDs in the same table).",
    "dryRun": "1. Nested Loop Join: Outer table is scanned, and for each row, inner table is searched.\n2. Hash Join: DBMS builds a hash table on join keys of smaller table, then probes it with rows from larger table.\n3. Sort-Merge Join: Both tables are sorted by join keys, then scanned together in linear time.",
    "visualTrace": "Table X: {1, 2}        Table Y: {2, 3}\n\nInner Join:    {2}\nLeft Join:     {1 (NULL), 2 (matched)}\nFull Join:     {1 (NULL), 2 (matched), 3 (NULL)}",
    "code": {
      "java": "// Executing join query via JDBC\nimport java.sql.*;\n\npublic class SqlJoins {\n    public static void main(String[] args) throws Exception {\n        Connection conn = DriverManager.getConnection(\"jdbc:postgresql://localhost:5432/prephub\", \"postgres\", \"secure123\");\n        Statement stmt = conn.createStatement();\n        ResultSet rs = stmt.executeQuery(\n            \"SELECT e.name, m.name AS manager \" +\n            \"FROM employees e \" +\n            \"LEFT JOIN employees m ON e.manager_id = m.employee_id\"\n        );\n        while(rs.next()) {\n            System.out.println(rs.getString(\"name\") + \" reports to \" + rs.getString(\"manager\"));\n        }\n        conn.close();\n    }\n}",
      "cpp": "// C++ SQL construction helper\n#include <string>\n\nstd::string getSelfJoinQuery() {\n    return \"SELECT emp.name, mgr.name \"\n           \"FROM employees emp \"\n           \"INNER JOIN employees mgr ON emp.manager_id = mgr.id;\";\n}",
      "python": "# Python pandas simulating joins on dataframes\nimport pandas as pd\n\ndf_X = pd.DataFrame({'id': [1, 2], 'val_X': ['A', 'B']})\ndf_Y = pd.DataFrame({'id': [2, 3], 'val_Y': ['B', 'C']})\n\n# Left Join\nleft_join = pd.merge(df_X, df_Y, on='id', how='left')\nprint(left_join)",
      "js": "// Sequelize eager loading Joins representation\n// User.findAll({\n//   include: [{ model: Order, required: false }] // LEFT OUTER JOIN\n// });"
    },
    "interviewQ": "What is the difference between a Hash Join and a Sort-Merge Join?",
    "interviewA": "Hash Join builds an in-memory hash table of the smaller table and probes it using keys from the larger table; it is extremely fast for unsorted inputs but requires sufficient RAM. Sort-Merge Join sorts both inputs by join keys first and merges them in linear scans; it is preferred if inputs are already sorted (e.g. by index) or for range join criteria."
  },
  {
    "id": "dbms_indexes",
    "index": "05",
    "name": "Indexes (B-Tree, Hash, Clustered vs Non-Clustered)",
    "overview": "Indexes are schema structures that speed up query search retrievals at the cost of slower writes.",
    "detailedTheory": "Indices minimize disk block accesses. B+ Tree Index stores indexes in balanced search trees, optimal for range and point scans. Hash Index utilizes hash lookup tables, yielding O(1) searches but invalid for range scans. Clustered Index dictates the physical ordering of records in memory; a table can have only one clustered index (usually on Primary Key). Non-Clustered Index contains pointers (addresses or clustered index key) back to the actual data rows; a table can have multiple non-clustered indexes.",
    "dryRun": "Query: SELECT * FROM users WHERE age = 25 (index on age exists)\n1. Read root node of age B+ Tree.\n2. Traverse node references based on key value.\n3. Arrive at leaf node containing key 25.\n4. Leaf node contains pointer. DBMS reads database page from disk using pointer.",
    "visualTrace": "B+ Tree Index traversal:\n        [ Root: 20 ]\n        /          \\\n   [ 10, 15 ]    [ 25, 30 ]  <-- Arrive at Node\n                  /\n             [ Leaf: Data pointer to Row address ]",
    "code": {
      "java": "// JDBC Index optimization explanation\n// String query = \"CREATE INDEX idx_user_email ON users(email);\";\n// Prepares database to search email column in O(log N) rather than O(N).",
      "cpp": "// Mock execution plan builder checking index\n#include <iostream>\n\nvoid runExplainPlan() {\n    std::cout << \"EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@test.com';\" << std::endl;\n    std::cout << \"-> Index Scan using idx_user_email on users\" << std::endl;\n}",
      "python": "# Creating indices in PostgreSQL\nimport psycopg2\n\nconn = psycopg2.connect(\"dbname=prephub user=postgres\")\ncur = conn.cursor()\ncur.execute(\"CREATE INDEX IF NOT EXISTS idx_order_date ON orders(order_date DESC);\")\nconn.commit()\nconn.close()",
      "js": "// Mongoose Index declaration on MongoDB schemas\n// const userSchema = new mongoose.Schema({ email: { type: String, index: true } });"
    },
    "interviewQ": "Why can there be only one Clustered Index per table?",
    "interviewA": "Because a clustered index determines the physical, sorted layout of the table rows on the disk. Since a physical file's rows can only be ordered in one sorting sequence at a time, there can only be one clustered index."
  },
  {
    "id": "dbms_acid",
    "index": "06",
    "name": "ACID Properties",
    "overview": "ACID properties guarantee database consistency and reliability, preventing data corruption during concurrent operations or failures.",
    "detailedTheory": "ACID stands for: Atomicity: Entire transaction succeeds or rolls back completely. Consistency: Transactions transitions database from one valid state to another, maintaining constraints. Isolation: Transactions execute concurrently without interfering with one another. Durability: Committed transaction updates are written to non-volatile memory to survive system crashes.",
    "dryRun": "Transaction: Transfer $100 from A to B.\n1. A (balance = 500) -> subtract 100 -> A = 400.\n2. Server crashes!\n3. Recovery manager runs WAL (Write-Ahead Logging) log analysis.\n4. Atomicity rolls back A to 500, preventing money loss.",
    "visualTrace": "Start Transaction\n      │\n      ▼\n  A = A - 100  (Temp state)\n      │\n  [CRASH DETECTED] ---> Undo changes (Rollback) -> balance restored\n      ▼\n  B = B + 100\n      │\n      ▼\nCommit Transaction (Written to permanent log file -> Durability)",
    "code": {
      "java": "// Transaction Management in Java JDBC\nimport java.sql.*;\n\npublic class TransactionAcid {\n    public static void main(String[] args) throws Exception {\n        Connection conn = DriverManager.getConnection(\"jdbc:postgresql://localhost:5432/prephub\", \"postgres\", \"secure123\");\n        try {\n            conn.setAutoCommit(false); // Enable manual transaction control\n            Statement stmt = conn.createStatement();\n            stmt.executeUpdate(\"UPDATE accounts SET balance = balance - 100 WHERE id = 1\");\n            stmt.executeUpdate(\"UPDATE accounts SET balance = balance + 100 WHERE id = 2\");\n            conn.commit(); // Durability save point\n            System.out.println(\"Transaction Committed successfully!\");\n        } catch (Exception e) {\n            conn.rollback(); // Atomicity fallback\n            System.out.println(\"Failed. Rolled back changes.\");\n        } finally {\n            conn.close();\n        }\n    }\n}",
      "cpp": "// C++ pqxx transaction block\n#include <pqxx/pqxx>\n#include <iostream>\n\nvoid runTransaction() {\n    pqxx::connection c(\"dbname=prephub\");\n    pqxx::work txn(c); // Creates transactional unit of work\n    txn.exec0(\"UPDATE accounts SET balance = balance - 100 WHERE id = 1;\");\n    txn.exec0(\"UPDATE accounts SET balance = balance + 100 WHERE id = 2;\");\n    txn.commit(); // Commits atomically\n}",
      "python": "# Django transaction atomicity decorator representation\n# from django.db import transaction\n# @transaction.atomic\n# def transfer_funds():\n#     Account.objects.filter(id=1).update(balance=F('balance') - 100)",
      "js": "// Nodepg manual transactions\n// await client.query('BEGIN');\n// await client.query('COMMIT'); // or ROLLBACK"
    },
    "interviewQ": "How is Durability achieved in database engines?",
    "interviewA": "Durability is achieved using Write-Ahead Logging (WAL) or Redo logs. Before any changes are written to the actual database files (which are cached in memory buffer pools), the modifications are appended to a non-volatile, sequential log file on disk. In a crash recovery, the database reads the WAL to re-apply (redo) committed transactions."
  },
  {
    "id": "dbms_transactions",
    "index": "07",
    "name": "Transaction Isolation Levels & Anomalies",
    "overview": "Isolation levels trade concurrency performance for data correctness, preventing race conditions.",
    "detailedTheory": "Concurrency anomalies: Dirty Read: Reading uncommitted updates. Non-Repeatable Read: Reading changed values within the same transaction. Phantom Read: Reading newly inserted records within the same transaction. SQL Isolation Levels: Read Uncommitted (allows all anomalies), Read Committed (prevents Dirty Reads), Repeatable Read (prevents Dirty & Non-repeatable Reads), and Serializable (prevents all anomalies).",
    "dryRun": "T1: SELECT balance FROM accounts WHERE id = 1 (returns 500)\nT2: UPDATE accounts SET balance = 400 WHERE id = 1; (Uncommitted)\nIf Read Uncommitted: T1 reads 400 (Dirty Read!).\nIf Read Committed: T1 reads 500. After T2 commits, T1 reads 400 (Non-repeatable Read!).\nIf Repeatable Read: T1 always reads 500 inside its transaction scope.",
    "visualTrace": "T1: Read row X (val=A0) ───────> T1: Read row X (val=A0)\n                                         ▲\n                                         │ (Repeatable Read blocks reading A1)\nT2: Update row X (val=A1) ──> Commit ────+",
    "code": {
      "java": "// Setting transaction isolation in JDBC\nimport java.sql.Connection;\nimport java.sql.DriverManager;\n\npublic class IsolationSetter {\n    public static void main(String[] args) throws Exception {\n        Connection conn = DriverManager.getConnection(\"jdbc:postgresql://localhost:5432/prephub\", \"postgres\", \"secure123\");\n        // Set to Serializable isolation\n        conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);\n        conn.setAutoCommit(false);\n        // execute transaction queries\n        conn.commit();\n        conn.close();\n    }\n}",
      "cpp": "// C++ SQL transaction isolation configuration\n#include <string>\n\nstd::string setSerializableIsolation() {\n    return \"SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\";\n}",
      "python": "# Python PostgreSQL cursor setting isolation levels\nimport psycopg2\nfrom psycopg2.extensions import ISOLATION_LEVEL_SERIALIZABLE\n\nconn = psycopg2.connect(\"dbname=prephub\")\nconn.set_isolation_level(ISOLATION_LEVEL_SERIALIZABLE)\ncur = conn.cursor()\ncur.execute(\"SELECT * FROM accounts;\")\n# transaction commits/rolls back\nconn.close()",
      "js": "// Sequelize setting isolation level dynamically\n// const { Transaction } = require('sequelize');\n// await sequelize.transaction({\n//   isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE\n// });"
    },
    "interviewQ": "What is a Phantom Read, and how does it differ from a Non-Repeatable Read?",
    "interviewA": "A Non-repeatable Read occurs when a transaction reads the *same row* twice and gets different values because another transaction updated and committed it. A Phantom Read occurs when a transaction executes a *range query* (e.g., matching a WHERE filter) twice and gets a different set of rows because another transaction inserted or deleted records matching the filter."
  },
  {
    "id": "dbms_locking",
    "index": "08",
    "name": "Locking & Deadlocks",
    "overview": "Locks restrict transaction access to database resource items to prevent concurrent collisions.",
    "detailedTheory": "Shared Locks (S-locks) allow concurrent reads; multiple transactions can hold S-locks on the same resource. Exclusive Locks (X-locks) grant write access; only one transaction can hold an X-lock, blocking both reads and writes. Two-Phase Locking (2PL) ensures serializability by restricting transactions to a Growing Phase (only lock acquisition) followed by a Shrinking Phase (only lock release). Deadlocks occur when transactions wait in a circular loop for resources held by each other, resolved by DBMS deadlock detection engines which abort one of the transactions.",
    "dryRun": "T1 locks Row 1 (X-lock). T2 locks Row 2 (X-lock).\nT1 requests Row 2 (waits for T2 to release).\nT2 requests Row 1 (waits for T1 to release).\nDeadlock detected! DBMS aborts T1, rolls back its queries, and releases locks.",
    "visualTrace": "Transaction 1 [Holds Row 1 lock] ─── (Waits for Row 2) ───> Transaction 2 [Holds Row 2 lock]\n       ▲                                                               │\n       └───────────────────────── (Waits for Row 1) ───────────────────┘",
    "code": {
      "java": "// Java JDBC SELECT FOR UPDATE (exclusive lock query)\nimport java.sql.*;\n\npublic class RowLocking {\n    public static void main(String[] args) throws Exception {\n        Connection conn = DriverManager.getConnection(\"jdbc:postgresql://localhost:5432/prephub\", \"postgres\", \"secure123\");\n        conn.setAutoCommit(false);\n        Statement stmt = conn.createStatement();\n        // SELECT FOR UPDATE places X-lock on matching rows\n        ResultSet rs = stmt.executeQuery(\"SELECT balance FROM accounts WHERE id = 1 FOR UPDATE\");\n        if (rs.next()) {\n            int val = rs.getInt(\"balance\") - 50;\n            stmt.executeUpdate(\"UPDATE accounts SET balance = \" + val + \" WHERE id = 1\");\n        }\n        conn.commit(); // Releases lock\n        conn.close();\n    }\n}",
      "cpp": "// C++ SELECT FOR UPDATE helper\n#include <string>\n\nstd::string getExclusiveLockQuery() {\n    return \"SELECT * FROM inventory WHERE item_id = 101 FOR UPDATE;\";\n}",
      "python": "# Python script handling deadlock exceptions\nimport psycopg2\nimport time\n\nconn = psycopg2.connect(\"dbname=prephub\")\nconn.setAutoCommit = False\ncur = conn.cursor()\ntry:\n    cur.execute(\"SELECT * FROM accounts WHERE id = 1 FOR UPDATE;\")\n    cur.execute(\"SELECT * FROM accounts WHERE id = 2 FOR UPDATE;\")\n    conn.commit()\nexcept psycopg2.errors.DeadlockDetected:\n    conn.rollback()\n    print(\"Deadlock detected! Retrying transaction after sleep...\")\n    time.sleep(1)\nconn.close()",
      "js": "// Mongoose query transaction lock conceptual wrapper\n// session.startTransaction();"
    },
    "interviewQ": "What is the difference between Strict 2PL and Rigorous 2PL?",
    "interviewA": "Under Strict 2PL, a transaction must hold all its exclusive (write) locks until the transaction commits or aborts. Under Rigorous 2PL, the transaction must hold *all* its locks (both shared and exclusive) until the transaction commits or aborts, preventing cascading rollbacks completely."
  },
  {
    "id": "dbms_nosql_basics",
    "index": "09",
    "name": "NoSQL Basics & CAP Theorem",
    "overview": "NoSQL databases store non-relational, distributed data models at horizontal scale.",
    "detailedTheory": "NoSQL databases are designed for schema flexibility, horizontal scalability, and distributed clustering. Types: Document stores (MongoDB), Key-Value stores (Redis), Wide-Column (Cassandra), Graph (Neo4j). The CAP Theorem states that a distributed system can guarantee at most two out of: Consistency (all nodes read the same data at the same time), Availability (every non-failing node returns a response), and Partition Tolerance (system continues to operate despite network messages drop). In a real-world network, partition tolerance is non-negotiable; therefore, distributed systems must choose between Consistency (CP) and Availability (AP).",
    "dryRun": "1. Network split separates Node A and Node B.\n2. Write request updates Node A.\n3. Read request queries Node B.\n4. If system is CP: Node B returns error/blocks read (Consistency preserved).\n5. If system is AP: Node B returns stale data (Availability preserved).",
    "visualTrace": "Client write -> [ Node A (active) ]   xxxxx (Network split) xxxxx   [ Node B (isolated) ] <- Client read\n                                                                           \nIf CP: Node B rejects read query.\nIf AP: Node B returns old data state.",
    "code": {
      "java": "// Connecting to a NoSQL Document Database in Java\n// import com.mongodb.client.MongoClients;\n// import com.mongodb.client.MongoClient;\n// MongoClient mongoClient = MongoClients.create(\"mongodb://localhost:27017\");",
      "cpp": "// C++ NoSQL driver connection concept\n#include <string>\n\nstd::string getNoSqlConnectionString() {\n    return \"mongodb://127.0.0.1:27017/?replicaSet=rs0\";\n}",
      "python": "# PyMongo connection script\nfrom pymongo import MongoClient\n\ntry:\n    client = MongoClient(\"mongodb://localhost:27017/\")\n    db = client[\"prephub\"]\n    print(\"NoSQL MongoDB connected successfully\")\nexcept Exception as e:\n    print(f\"Connection error: {e}\")",
      "js": "// Node.js Mongo client connection\n// const { MongoClient } = require('mongodb');"
    },
    "interviewQ": "What is the difference between SQL (ACID) and NoSQL (BASE)?",
    "interviewA": "SQL databases emphasize ACID properties, structured schemas, relational tables, and vertical scaling. NoSQL databases emphasize BASE properties (Basically Available, Soft state, Eventual consistency), flexible schemas (document, key-value), and horizontal scalability via sharding across distributed clusters."
  },
  {
    "id": "dbms_mongodb",
    "index": "10",
    "name": "MongoDB (Document Store & Aggregations)",
    "overview": "MongoDB stores data records as flexible, BSON (Binary JSON) documents with rich aggregation querying pipeline engines.",
    "detailedTheory": "MongoDB stores documents in collections. Rather than joining separate tables, documents represent hierarchical data models by embedding sub-documents or arrays. MongoDB Aggregation Pipeline processes collections through stage-by-stage pipelines: $match (filter), $group (aggregation sum, average), $project (fields formatting), $sort, and $limit.",
    "dryRun": "Aggregation pipeline: Count total order price for active users.\n1. $match stage filters records where status = 'ACTIVE'.\n2. $group stage aggregates total order counts using: { $sum: '$price' }.\n3. Output is sorted descending and passed to projects.",
    "visualTrace": "Documents collection\n       │\n       ▼\n    $match { status: 'ACTIVE' }  (Filters rows)\n       │\n       ▼\n    $group { _id: '$userId', total: { $sum: '$price' } } (Calculates sums)\n       │\n       ▼\n    Sorted & Projected Result documents",
    "code": {
      "java": "// MongoDB Aggregation in Java\n// import static com.mongodb.client.model.Aggregates.*;\n// import static com.mongodb.client.model.Filters.*;\n// import static com.mongodb.client.model.Accumulators.*;\n// collection.aggregate(Arrays.asList(\n//     match(eq(\"status\", \"ACTIVE\")),\n//     group(\"$userId\", sum(\"totalPrice\", \"$price\"))\n// ));",
      "cpp": "// C++ MongoDB aggregation construction example\n// #include <mongocxx/client.hpp>\n// mongocxx::pipeline stage;\n// stage.match(make_document(kvp(\"status\", \"ACTIVE\")));",
      "python": "# Python PyMongo Aggregation script example\nfrom pymongo import MongoClient\n\nclient = MongoClient(\"mongodb://localhost:27017/\")\ndb = client.prephub\npipeline = [\n    {\"$match\": {\"status\": \"ACTIVE\"}},\n    {\"$group\": {\"_id\": \"$userId\", \"totalPaid\": {\"$sum\": \"$price\"}}}\n]\nresults = db.orders.aggregate(pipeline)\nfor r in results:\n    print(f\"User: {r['_id']}, Total: {r['totalPaid']}\")",
      "js": "// MongoDB shell query:\n// db.orders.aggregate([\n//   { $match: { status: 'ACTIVE' } },\n//   { $group: { _id: '$userId', total: { $sum: '$price' } } }\n// ]);"
    },
    "interviewQ": "How does MongoDB store data internally, and what is BSON?",
    "interviewA": "MongoDB stores data records as BSON (Binary JSON) documents. BSON is a binary serialization representation of JSON documents containing additional data types (such as Date, double, and 32/64-bit integers) that are not supported in standard JSON, allowing faster index searches and traversals."
  },
  {
    "id": "dbms_redis",
    "index": "11",
    "name": "Redis (Caching Patterns)",
    "overview": "Redis is an in-memory key-value data structure store used as a high-speed database, cache, and message broker.",
    "detailedTheory": "Because RAM accesses are orders of magnitude faster than disk accesses, Redis caches database queries to decrease latencies. Key caching patterns: Cache-Aside (Lazy Loading): Read queries check the cache; on cache miss, query the database, write to the cache, and return. Write-Through: Database updates are written to the cache and the database concurrently. Write-Back (Write-Behind): Updates are written only to the cache, and asynchronously flushed to the database in bulk.",
    "dryRun": "Query User ID 101:\n1. Check Redis cache: GET user:101.\n2. Cache Miss! Query PostgreSQL: SELECT * FROM users WHERE id=101.\n3. Save result in Redis cache: SETEX user:101 3600 (user data serialized as string).\n4. Return user data to client.",
    "visualTrace": "Client request ────> Check Redis cache (GET user:101)\n                             │\n                             ├── [Cache Hit] ──> Return data\n                             │\n                             └── [Cache Miss] ─> PostgreSQL (Read db) ─> Write to cache ─> Return",
    "code": {
      "java": "// Redis caching with Jedis client in Java\nimport redis.clients.jedis.Jedis;\n\npublic class RedisCache {\n    public static void main(String[] args) {\n        Jedis jedis = new Jedis(\"localhost\", 6379);\n        String cachedUser = jedis.get(\"user:101\");\n        if (cachedUser == null) {\n            // Mock db query\n            String dbUser = \"{\\\"id\\\":101,\\\"name\\\":\\\"Alice\\\"}\";\n            jedis.setex(\"user:101\", 3600, dbUser); // cache with 1 hr TTL\n            System.out.println(\"Cache Miss. Data fetched from SQL and saved to cache.\");\n        } else {\n            System.out.println(\"Cache Hit! Data: \" + cachedUser);\n        }\n        jedis.close();\n    }\n}",
      "cpp": "// C++ Redis client conceptual usage using hiredis\n#include <iostream>\n#include <hiredis/hiredis.h>\n\nvoid testRedis() {\n    redisContext *c = redisConnect(\"127.0.0.1\", 6379);\n    redisReply *reply = (redisReply *)redisCommand(c, \"GET user:101\");\n    if (reply->str == NULL) {\n        std::cout << \"Cache Miss\" << std::endl;\n    }\n    freeReplyObject(reply);\n    redisFree(c);\n}",
      "python": "# Python Redis Cache-Aside simulation\nimport redis\nimport json\n\nr = redis.Redis(host='localhost', port=6379, db=0)\n\ndef get_user_data(user_id):\n    cache_key = f\"user:{user_id}\"\n    cached_val = r.get(cache_key)\n    if cached_val:\n        print(\"Cache Hit!\")\n        return json.loads(cached_val)\n    \n    # Mock DB read\n    db_data = {\"id\": user_id, \"name\": \"Alice\", \"email\": \"alice@prephub.com\"}\n    print(\"Cache Miss. Reading from DB...\")\n    r.setex(cache_key, 3600, json.dumps(db_data)) # save with TTL\n    return db_data\n\nprint(get_user_data(101))",
      "js": "// Node.js redis client usage\n// const redis = require('redis');\n// const client = redis.createClient();\n// const val = await client.get('user:101');"
    },
  },
  {
    "id": "dbms_storage_engines",
    "index": "12",
    "name": "Database Storage Engines (InnoDB vs MyISAM)",
    "overview": "Storage engines handle physical table block indexing, locking strategies, and transaction records on disk.",
    "detailedTheory": "InnoDB is the default engine for MySQL. It uses Clustered B+ Tree indexes, supports transaction ACID properties, row-level locking (MVCC), and adaptive hashing. MyISAM is a legacy engine using flat file heaps, table-level locking, and no transactions, but was historically faster for read-heavy operations.",
    "dryRun": "1. Query updates Row X.\\n2. InnoDB acquires a row-level X-lock.\\n3. Writes changes to Redo Log.\\n4. Flushes page changes asynchronously to InnoDB tablespace (.ibd file).",
    "visualTrace": "Query Update -> [Row X-Lock acquired] -> [Redo Log write] -> [Dirty page in Buffer Pool] -> [Flushed to Disk]",
    "code": {
      "java": "// Java JDBC setting manual commit to trigger transactional engine updates\n// connection.setAutoCommit(false);\n// statement.executeUpdate(\"UPDATE accounts SET balance = balance - 100;\");\n// connection.commit();",
      "cpp": "// C++ SQL engine options string\n#include <string>\nconst std::string CREATE_INNODB_TABLE = \"CREATE TABLE customers (id INT PRIMARY KEY) ENGINE=InnoDB;\";",
      "python": "# Python schema creation with specified storage engines in MySQL\nimport mysql.connector\nconn = mysql.connector.connect(host=\"localhost\", user=\"root\", password=\"password\")\ncursor = conn.cursor()\ncursor.execute(\"CREATE TABLE IF NOT EXISTS orders_innodb (id INT PRIMARY KEY) ENGINE=InnoDB;\")\ncursor.execute(\"CREATE TABLE IF NOT EXISTS log_myisam (id INT PRIMARY KEY) ENGINE=MyISAM;\")",
      "js": "// Sequelize defining MySQL storage engines\n// const User = sequelize.define('User', { name: DataTypes.STRING }, { engine: 'InnoDB' });"
    },
    "interviewQ": "Why is InnoDB preferred over MyISAM for high-concurrency systems?",
    "interviewA": "InnoDB supports row-level locking, which allows multiple transactions to write to different rows in the same table concurrently. MyISAM supports only table-level locking, meaning any write lock blocks all other read/write operations on the entire table."
  },
  {
    "id": "dbms_er_diagrams",
    "index": "13",
    "name": "ER Diagrams & Schema Design",
    "overview": "Entity-Relationship Diagrams map business domains logically before database physical schema layout.",
    "detailedTheory": "ER Diagrams represent entities (rectangles), attributes (ovals), and relationships (diamonds). Cardinality defines mapping limits (1:1, 1:N, N:M). Double ellipses indicate multivalued attributes, while double rectangles indicate weak entities depending on identifying relationships.",
    "dryRun": "Decompose N:M relationship:\\n1. Entity Student (PK: student_id) and Entity Course (PK: course_id) have N:M relationship 'enrolls'.\\n2. Create junction table 'enrollments'.\\n3. Map foreign keys from both tables as composite primary key in junction table.",
    "visualTrace": "Student(PK: id) ───[1]───<enrollments(FK: student_id, FK: course_id)>───[N]───Course(PK: id)",
    "code": {
      "java": "// Mapping normalized objects representing relationships\npublic class Student {\n    private int id; // PK\n    private List<Enrollment> enrollments; // N:M representation\n}",
      "cpp": "// C++ structures mapping composite primary keys for relationship tables\nstruct Enrollment {\n    int student_id; // Composite PK & FK1\n    int course_id;  // Composite PK & FK2\n};",
      "python": "# Python SQLAlchemy model mapping relationships\n# class Student(Base):\n#     id = Column(Integer, primary_key=True)\n#     courses = relationship('Course', secondary=enrollment_table)",
      "js": "// Sequelize junction model mapping\n// Student.belongsToMany(Course, { through: 'Enrollments' });"
    },
    "interviewQ": "What is a Weak Entity, and how is it represented in an ER diagram and mapped to tables?",
    "interviewA": "A weak entity is an entity that cannot be uniquely identified by its own attributes alone and depends on an identifying relationship with a parent owner entity. It is represented with a double rectangle. In mapping to tables, the primary key of the parent entity is imported as a foreign key and combined with the weak entity's partial key (discriminator) to form a composite primary key."
  },
  {
    "id": "dbms_views_ctes",
    "index": "14",
    "name": "Views & Common Table Expressions (CTEs)",
    "overview": "Views act as virtual tables for encapsulation, and CTEs provide inline named queries for complex recursive algorithms.",
    "detailedTheory": "A standard view stores only the SELECT statement query in database metadata. A Materialized View computes and physically stores the records on disk to improve performance, requiring periodic refreshes. Common Table Expressions (CTEs) are temporary query scopes declared with the WITH clause, aiding in query readability and hierarchical recursive traversals.",
    "dryRun": "Recursive CTE execution:\\n1. Execute anchor member (base case).\\n2. Execute recursive query joining previous result set.\\n3. Union results until base case condition returns empty set.",
    "visualTrace": "WITH cte_name AS (SELECT ... UNION ALL SELECT ... JOIN cte_name) SELECT * FROM cte_name;",
    "code": {
      "java": "// JDBC querying views or recursive queries\n// ResultSet rs = statement.executeQuery(\"WITH RECURSIVE subordinates AS (...) SELECT * FROM subordinates;\");",
      "cpp": "// C++ returning SQL query containing CTEs\n#include <string>\nstd::string getHierarchyQuery() {\n    return \"WITH RECURSIVE org AS (SELECT id FROM emp UNION ALL SELECT e.id FROM emp e JOIN org o ON e.mgr_id = o.id) SELECT * FROM org;\";\n}",
      "python": "# Python executing CTE select\nimport psycopg2\nconn = psycopg2.connect(\"dbname=prephub\")\ncur = conn.cursor()\ncur.execute(\"WITH high_sales AS (SELECT * FROM orders WHERE total > 1000) SELECT * FROM high_sales;\")\nprint(cur.fetchall())",
      "js": "// Querying views\n// const results = await sequelize.query(\"SELECT * FROM active_customers_view;\");"
    },
    "interviewQ": "What is a Recursive CTE, and what is its typical use case?",
    "interviewA": "A recursive CTE is a query defined with the `WITH RECURSIVE` clause that references its own name. It consists of an anchor member (base query) and a recursive member (queries the CTE itself). It is used to traverse hierarchical structures like organizational trees, bill-of-materials, or graph networks."
  },
  {
    "id": "dbms_procedures_triggers",
    "index": "15",
    "name": "Stored Procedures, Functions & Triggers",
    "overview": "Precompiled database routines and automatic audit monitors running directly in database memory.",
    "detailedTheory": "Stored Procedures are compiled and cached in database memory to eliminate network roundtrips for multi-step logic. Triggers automatically execute in response to events (INSERT, UPDATE, DELETE). They can be row-level (runs for each row) or statement-level (runs once per query). Cursors act as row pointers to iterate through multiple records sequentially.",
    "dryRun": "Trigger execution:\\n1. User runs: DELETE FROM users WHERE id = 101.\\n2. Trigger configured BEFORE DELETE on users fires.\\n3. Copies row values from OLD system pseudo-table to archive table.\\n4. Original DELETE completes.",
    "visualTrace": "User DML Query -> [Trigger Evaluates BEFORE/AFTER] -> [Executes custom logic block] -> [DML Commits]",
    "code": {
      "java": "// Java calling stored procedure via CallableStatement\n// CallableStatement stmt = conn.prepareCall(\"{call transfer_funds(?, ?, ?)}\");\n// stmt.setInt(1, 101);\n// stmt.setInt(2, 102);\n// stmt.execute();",
      "cpp": "// C++ invoking SQL stored function\n#include <string>\nstd::string callStoredFunction() {\n    return \"SELECT calculate_tax(1500.0);\";\n}",
      "python": "# Calling Postgres stored procedure using psycopg2\n# cur.callproc('process_invoice', [invoice_id])",
      "js": "// Sequelize stored procedure query execution\n// await sequelize.query('CALL update_inventory(:itemId, :quantity)', { replacements: { itemId: 12, quantity: 5 } });"
    },
    "interviewQ": "What is the difference between a Stored Procedure and a Stored Function?",
    "interviewA": "A stored function must return a single value, can be used inline in SQL statements (like SELECT or WHERE clauses), and cannot perform transaction DDL/DML commits/rollbacks. A stored procedure does not need to return a value, cannot be used inline in SELECT queries (called with CALL or EXECUTE), and can control transactions internally."
  }
];

const DbmsTheory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [activeLang, setActiveLang] = useState('python'); // Python default
  const [selectedConceptId, setSelectedConceptId] = useState(() => {
    const fromUrl = searchParams.get('concept');
    if (fromUrl && dbmsConcepts.some(c => c.id === fromUrl)) {
      return fromUrl;
    }
    return 'dbms_rdbms_basics';
  });
  const [completedConcepts, setCompletedConcepts] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});

  const handleSelectMCQ = (questionId, option) => {
    if (userAnswers[questionId] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    setRevealedExplanations(prev => ({ ...prev, [questionId]: true }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('completed_dbms_concepts');
    if (saved) {
      try {
        setCompletedConcepts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleConceptCompleted = (id, e) => {
    e.stopPropagation();
    let newCompleted;
    if (completedConcepts.includes(id)) {
      newCompleted = completedConcepts.filter(x => x !== id);
    } else {
      newCompleted = [...completedConcepts, id];
    }
    setCompletedConcepts(newCompleted);
    localStorage.setItem('completed_dbms_concepts', JSON.stringify(newCompleted));
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'template') {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    } else {
      setCopiedExample(true);
      setTimeout(() => setCopiedExample(false), 2000);
    }
  };

  const selectedConcept = dbmsConcepts.find(c => c.id === selectedConceptId) || dbmsConcepts[0];

  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 40px' }}>
        
        {/* Back Link */}
        <Link 
          to="/preparation" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#10b981', 
            fontWeight: 700, 
            fontSize: '0.86rem', 
            textDecoration: 'none',
            marginBottom: '24px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
        >
          <ArrowLeft className="size-4" /> Back to Preparation Hub
        </Link>

        {/* Dark Blue Header Banner Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '24px',
          padding: '40px',
          color: '#ffffff',
          marginBottom: '32px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '16px', letterSpacing: '0.3px' }}>
            <Database className="size-3.5 text-emerald-400" />
            DBMS MASTERCLASS · Database Systems Syllabus
          </div>
          
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px 0', fontFamily: 'Sora, sans-serif', letterSpacing: '-0.5px' }}>
            Database Management Systems (DBMS) Notes
          </h1>
          
          <p style={{ margin: 0, fontSize: '0.94rem', color: '#94a3b8', lineHeight: '1.6', maxWidth: '800px' }}>
            Master Relational & Non-Relational Databases, Normalization & Normal Forms, Joins, Indexes (B-Tree/Hash/Clustered), ACID transaction safety properties, Views, Common Table Expressions (CTEs), Stored Procedures, Functions, and triggers.
          </p>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT PANEL: Concept list */}
          <aside style={{ background: '#ffffff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DBMS Concepts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
              {dbmsConcepts.map((concept) => {
                const isActive = concept.id === selectedConceptId;
                const isDone = completedConcepts.includes(concept.id);

                return (
                  <div
                    key={concept.id}
                    onClick={() => setSelectedConceptId(concept.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: isActive ? '#10b981' : '#e2e8f0',
                      background: isActive ? 'linear-gradient(to right, #ecfdf5, #f0fdf4)' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.06)' : '0 1px 3px rgba(0,0,0,0.01)',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = '#a7f3d0';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div 
                      onClick={(e) => toggleConceptCompleted(concept.id, e)}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '6px',
                        border: isDone ? '2px solid #10b981' : '2px solid #cbd5e1',
                        background: isDone ? '#10b981' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        transition: 'all 0.2s',
                        flexShrink: 0
                      }}
                    >
                      {isDone && <Check className="size-3 text-white" style={{ strokeWidth: 3 }} />}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                      <span style={{ fontSize: '0.74rem', color: isActive ? '#10b981' : '#94a3b8', fontWeight: 700 }}>
                        Concept {concept.index}
                      </span>
                      <strong style={{
                        fontSize: '0.84rem',
                        color: isActive ? '#15803d' : '#475569',
                        lineHeight: '1.3',
                        marginTop: '2px',
                        wordBreak: 'break-word'
                      }}>
                        {concept.name}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* RIGHT PANEL: Topic details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            
            {/* Overview Section */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', background: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                  Concept {selectedConcept.index}
                </span>
                <button
                  onClick={(e) => toggleConceptCompleted(selectedConcept.id, e)}
                  style={{
                    marginLeft: 'auto',
                    border: 'none',
                    background: completedConcepts.includes(selectedConcept.id) ? '#d1fae5' : '#f1f5f9',
                    color: completedConcepts.includes(selectedConcept.id) ? '#065f46' : '#475569',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  {completedConcepts.includes(selectedConcept.id) ? (
                    <>Completed <Check className="size-4" /></>
                  ) : (
                    'Mark as Completed'
                  )}
                </button>
              </div>

              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
                {selectedConcept.name}
              </h1>
              <p style={{ fontSize: '0.96rem', color: '#334155', fontWeight: 700, margin: '0 0 20px 0', lineHeight: '1.5' }}>
                {selectedConcept.overview}
              </p>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>Detailed Theory Analysis</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  {selectedConcept.detailedTheory}
                </p>
              </div>
            </section>

            {/* Language Code Editor / Template */}
            <section style={{ background: '#0f172a', borderRadius: '24px', overflow: 'hidden', border: '1px solid #1e293b', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ background: '#1e293b', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal className="size-4.5 text-indigo-400" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace' }}>Code implementation / Queries</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '4px', background: '#0f172a', padding: '3px', borderRadius: '8px' }}>
                    {['java', 'cpp', 'python', 'js'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        style={{
                          border: 'none',
                          background: activeLang === lang ? '#1e293b' : 'transparent',
                          color: activeLang === lang ? '#ffffff' : '#64748b',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          transition: 'all 0.15s'
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleCopy(selectedConcept.code[activeLang], 'template')}
                    style={{
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      width: '28px', height: '28px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    {copiedTemplate ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                  </button>
                </div>
              </div>

              <pre style={{ margin: 0, padding: '24px', overflowX: 'auto', maxHeight: '400px' }}>
                <code style={{ fontFamily: 'monospace, Courier New', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                  {selectedConcept.code[activeLang]}
                </code>
              </pre>
            </section>

            {/* Execution Trace & Dry Run */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                  <Sparkles className="size-5" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Visual Execution Trace</h3>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>Step-by-step Dry Run</h4>
                <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                  {selectedConcept.dryRun}
                </p>
              </div>

              {selectedConcept.visualTrace && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 10px 0' }}>Flow & Mapping Diagram</h4>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b', background: '#0f172a' }}>
                    <div style={{ background: '#1e293b', height: '36px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                      <span style={{ color: '#64748b', fontSize: '0.74rem', fontFamily: 'monospace', marginLeft: '12px' }}>flow_diagram.ascii</span>
                    </div>
                    <pre style={{
                      margin: 0,
                      padding: '20px',
                      color: '#38bdf8',
                      fontSize: '0.86rem',
                      fontFamily: 'monospace, Courier New',
                      overflowX: 'auto',
                      lineHeight: '1.5',
                      background: 'transparent'
                    }}>
                      <code>{selectedConcept.visualTrace}</code>
                    </pre>
                  </div>
                </div>
              )}
            </section>

            {/* MCQ Practice Section */}
            {questionBankData.filter(q => q.conceptId === selectedConcept.id).length > 0 && (
              <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                    <HelpCircle className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Concept MCQ Challenge</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {questionBankData.filter(q => q.conceptId === selectedConcept.id).map((q, idx) => {
                    const selectedAns = userAnswers[q.id];
                    const isAnswered = selectedAns !== undefined;
                    const showExp = !!revealedExplanations[q.id];

                    return (
                      <div key={q.id} style={{ borderBottom: idx < questionBankData.filter(q => q.conceptId === selectedConcept.id).length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: idx < questionBankData.filter(q => q.conceptId === selectedConcept.id).length - 1 ? '20px' : '0' }}>
                        <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '14px', lineHeight: '1.5' }}>
                          <strong>Q{idx + 1}:</strong> {q.question}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '14px' }}>
                          {q.options.map(option => {
                            const isThisSelected = selectedAns === option;
                            const isCorrect = q.answer === option;

                            let optStyle = {
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              color: '#334155',
                              cursor: isAnswered ? 'default' : 'pointer'
                            };

                            if (isAnswered) {
                              if (isCorrect) {
                                optStyle = {
                                  background: '#d1fae5',
                                  border: '1px solid #10b981',
                                  color: '#065f46',
                                  fontWeight: 800,
                                  cursor: 'default'
                                };
                              } else if (isThisSelected) {
                                optStyle = {
                                  background: '#fee2e2',
                                  border: '1px solid #ef4444',
                                  color: '#991b1b',
                                  fontWeight: 800,
                                  cursor: 'default'
                                };
                              } else {
                                optStyle = {
                                  background: '#f8fafc',
                                  border: '1px solid #e2e8f0',
                                  color: '#94a3b8',
                                  cursor: 'default'
                                };
                              }
                            }

                            return (
                              <button
                                key={option}
                                disabled={isAnswered}
                                onClick={() => handleSelectMCQ(q.id, option)}
                                style={{
                                  width: '100%',
                                  textAlign: 'left',
                                  padding: '12px 18px',
                                  borderRadius: '10px',
                                  fontSize: '0.84rem',
                                  fontWeight: 600,
                                  transition: 'all 0.15s',
                                  ...optStyle
                                }}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered && (
                          <div>
                            <button
                              onClick={() => setRevealedExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#059669',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                padding: '4px 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Terminal className="size-4" />
                              {showExp ? "Hide Explanation" : "View Explanation"}
                            </button>

                            {showExp && (
                              <div style={{ marginTop: '10px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #10b981', fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Standard Interview Question */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'grid', placeItems: 'center' }}>
                  <Award className="size-5" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Standard Interview Question</h3>
              </div>

              <div style={{ padding: '16px 20px', background: '#fffbeb', borderRadius: '12px', border: '1px solid #fef3c7' }}>
                <strong style={{ fontSize: '0.88rem', color: '#b45309', display: 'block', marginBottom: '6px' }}>
                  Q: {selectedConcept.interviewQ}
                </strong>
                <p style={{ fontSize: '0.86rem', color: '#78350f', lineHeight: '1.5', margin: 0 }}>
                  <strong>Ans:</strong> {selectedConcept.interviewA}
                </p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DbmsTheory;
