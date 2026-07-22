export const sql50Data = [
  // ── 1. SELECT STATEMENTS ──────────────────────────────────────
  {
    id: "sql_01",
    title: "Recyclable and Low Fat Products (LC 1757)",
    difficulty: "Easy",
    topic: "Select",
    leetcode: "https://leetcode.com/problems/recyclable-and-low-fat-products/",
    query: "SELECT product_id FROM products WHERE low_fats = 'Y' AND recyclable = 'Y';",
    explanation: "Simple filter query using the AND logical operator. Checks that both columns have value 'Y'."
  },
  {
    id: "sql_02",
    title: "Find Customer Referee (LC 584)",
    difficulty: "Easy",
    topic: "Select",
    leetcode: "https://leetcode.com/problems/find-customer-referee/",
    query: "SELECT name FROM customer WHERE referee_id <> 2 OR referee_id IS NULL;",
    explanation: "Handles NULL values correctly. In SQL, comparison operators like <> or != return UNKNOWN for NULL values, so IS NULL must be handled explicitly."
  },
  {
    id: "sql_03",
    title: "Big Countries (LC 595)",
    difficulty: "Easy",
    topic: "Select",
    leetcode: "https://leetcode.com/problems/big-countries/",
    query: "SELECT name, population, area FROM world WHERE area >= 3000000 OR population >= 25000000;",
    explanation: "Selects rows matching either condition (area >= 3M sq km or population >= 25M people) using the OR operator."
  },
  {
    id: "sql_04",
    title: "Article Views I (LC 1148)",
    difficulty: "Easy",
    topic: "Select",
    leetcode: "https://leetcode.com/problems/article-views-i/",
    query: "SELECT DISTINCT author_id AS id FROM views WHERE author_id = viewer_id ORDER BY id ASC;",
    explanation: "Checks cases where authors read their own articles (author_id = viewer_id). DISTINCT removes duplicate authors, and ORDER BY sorts them in ascending order."
  },
  {
    id: "sql_05",
    title: "Invalid Tweets (LC 1683)",
    difficulty: "Easy",
    topic: "Select",
    leetcode: "https://leetcode.com/problems/invalid-tweets/",
    query: "SELECT tweet_id FROM tweets WHERE LENGTH(content) > 15;",
    explanation: "Uses the built-in LENGTH() function (or CHAR_LENGTH() in MySQL) to filter strings whose length exceeds 15 characters."
  },

  // ── 2. BASIC JOINS ───────────────────────────────────────────
  {
    id: "sql_06",
    title: "Product Sales Analysis I (LC 1068)",
    difficulty: "Easy",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/product-sales-analysis-i/",
    query: "SELECT p.product_name, s.year, s.price FROM sales s INNER JOIN product p ON s.product_id = p.product_id;",
    explanation: "Uses INNER JOIN to combine tables on the common column product_id, fetching product names for each sales record."
  },
  {
    id: "sql_07",
    title: "Customer Who Visited but Did Not Make Any Transactions (LC 1581)",
    difficulty: "Easy",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/",
    query: "SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans \nFROM visits v \nLEFT JOIN transactions t ON v.visit_id = t.visit_id \nWHERE t.transaction_id IS NULL \nGROUP BY v.customer_id;",
    explanation: "Identifies visits with no transaction using LEFT JOIN and WHERE key IS NULL, then counts visits grouped by customer."
  },
  {
    id: "sql_08",
    title: "Rising Temperature (LC 197)",
    difficulty: "Easy",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/rising-temperature/",
    query: "SELECT w1.id \nFROM weather w1 \nINNER JOIN weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1 \nWHERE w1.temperature > w2.temperature;",
    explanation: "Performs a self join on dates using DATEDIFF() to compare temperatures between consecutive days."
  },
  {
    id: "sql_09",
    title: "Average Time of Process per Machine (LC 1661)",
    difficulty: "Easy",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/average-time-of-process-per-machine/",
    query: "SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time \nFROM activity a1 \nINNER JOIN activity a2 ON a1.machine_id = a2.machine_id AND a1.process_id = a2.process_id \nWHERE a1.activity_type = 'start' AND a2.activity_type = 'end' \nGROUP BY a1.machine_id;",
    explanation: "Self-joins activity events on the same process, subtracting start timestamp from end timestamp, then groups by machine."
  },
  {
    id: "sql_10",
    title: "Employee Bonus (LC 577)",
    difficulty: "Easy",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/employee-bonus/",
    query: "SELECT e.name, b.bonus FROM employee e LEFT JOIN bonus b ON e.empId = b.empId WHERE b.bonus < 1000 OR b.bonus IS NULL;",
    explanation: "A LEFT JOIN guarantees employees with no bonus are included. Checks bonus < 1000 or IS NULL."
  },
  {
    id: "sql_11",
    title: "Students and Examinations (LC 1280)",
    difficulty: "Easy",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/students-and-examinations/",
    query: "SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams \nFROM students s \nCROSS JOIN subjects sub \nLEFT JOIN examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name \nGROUP BY s.student_id, s.student_name, sub.subject_name \nORDER BY s.student_id, sub.subject_name;",
    explanation: "Uses CROSS JOIN to get all combinations of students and subjects, then LEFT JOIN with examinations to count attended exams."
  },
  {
    id: "sql_12",
    title: "Managers with at Least 5 Direct Reports (LC 570)",
    difficulty: "Medium",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/",
    query: "SELECT m.name \nFROM employee e \nINNER JOIN employee m ON e.managerId = m.id \nGROUP BY m.id, m.name \nHAVING COUNT(e.id) >= 5;",
    explanation: "Self joins employees to managers, aggregates counts of reports grouped by manager ID, and filters using HAVING count >= 5."
  },
  {
    id: "sql_13",
    title: "Confirmation Rate (LC 1934)",
    difficulty: "Medium",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/confirmation-rate/",
    query: "SELECT s.user_id, ROUND(IFNULL(SUM(c.action = 'confirmed') / COUNT(c.action), 0), 2) AS confirmation_rate \nFROM signups s \nLEFT JOIN confirmations c ON s.user_id = c.user_id \nGROUP BY s.user_id;",
    explanation: "Uses LEFT JOIN to ensure all signup IDs remain, counts aggregate fraction of 'confirmed' actions, and converts nulls using IFNULL / COALESCE."
  },

  // ── 3. BASIC AGGREGATE FUNCTIONS ─────────────────────────────
  {
    id: "sql_14",
    title: "Not Boring Movies (LC 620)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/not-boring-movies/",
    query: "SELECT id, movie, description, rating FROM cinema WHERE id % 2 = 1 AND description <> 'boring' ORDER BY rating DESC;",
    explanation: "Filters odd IDs using modulo (id % 2 = 1) and description not matching 'boring', sorted by rating descending."
  },
  {
    id: "sql_15",
    title: "Average Selling Price (LC 1251)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/average-selling-price/",
    query: "SELECT p.product_id, IFNULL(ROUND(SUM(p.price * u.units) / SUM(u.units), 2), 0) AS average_price \nFROM prices p \nLEFT JOIN units_sold u ON p.product_id = u.product_id AND u.purchase_date BETWEEN p.start_date AND p.end_date \nGROUP BY p.product_id;",
    explanation: "Joins transactions that occur within validity date ranges, sums revenues (price * units), and divides by total units."
  },
  {
    id: "sql_16",
    title: "Project Employees I (LC 1075)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/project-employees-i/",
    query: "SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years \nFROM project p \nINNER JOIN employee e ON p.employee_id = e.employee_id \nGROUP BY p.project_id;",
    explanation: "Joins project members with experience values, then groups by project ID to find average years."
  },
  {
    id: "sql_17",
    title: "Percentage of Users Attended a Contest (LC 1633)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/percentage-of-users-attended-a-contest/",
    query: "SELECT contest_id, ROUND(COUNT(distinct user_id) * 100 / (SELECT COUNT(*) FROM users), 2) AS percentage \nFROM register \nGROUP BY contest_id \nORDER BY percentage DESC, contest_id ASC;",
    explanation: "Calculates registration percentage per contest against total user count fetched dynamically in a subquery."
  },
  {
    id: "sql_18",
    title: "Queries Quality and Percentage (LC 1211)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/queries-quality-and-percentage/",
    query: "SELECT query_name, \n       ROUND(AVG(rating / position), 2) AS quality, \n       ROUND(SUM(rating < 3) * 100 / COUNT(*), 2) AS poor_query_percentage \nFROM queries \nWHERE query_name IS NOT NULL \nGROUP BY query_name;",
    explanation: "Groups by query type. Quality is average ratio of rating/position. Poor query percentage is fraction of ratings < 3."
  },
  {
    id: "sql_19",
    title: "Monthly Transactions I (LC 1193)",
    difficulty: "Medium",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/monthly-transactions-i/",
    query: "SELECT SUBSTR(trans_date, 1, 7) AS month, country, \n       COUNT(id) AS trans_count, \n       SUM(state = 'approved') AS approved_count, \n       SUM(amount) AS trans_total_amount, \n       SUM(IF(state = 'approved', amount, 0)) AS approved_total_amount \nFROM transactions \nGROUP BY month, country;",
    explanation: "Substrings dates to extract 'YYYY-MM' values, then aggregates counts and sums conditioned on transaction state."
  },
  {
    id: "sql_20",
    title: "Immediate Food Delivery II (LC 1174)",
    difficulty: "Medium",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/immediate-food-delivery-ii/",
    query: "SELECT ROUND(SUM(order_date = customer_pref_delivery_date) * 100 / COUNT(*), 2) AS immediate_percentage \nFROM delivery \nWHERE (customer_id, order_date) IN (\n    SELECT customer_id, MIN(order_date) \n    FROM delivery \n    GROUP BY customer_id\n);",
    explanation: "Filters only first orders using a subquery grouping customer IDs with MIN(order_date), then calculates the percentage of immediate delivery."
  },
  {
    id: "sql_21",
    title: "Game Play Analysis IV (LC 550)",
    difficulty: "Medium",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/game-play-analysis-iv/",
    query: "SELECT ROUND(COUNT(distinct a1.player_id) / (SELECT COUNT(distinct player_id) FROM activity), 2) AS fraction \nFROM activity a1 \nINNER JOIN (\n    SELECT player_id, MIN(event_date) AS first_login \n    FROM activity \n    GROUP BY player_id\n) a2 ON a1.player_id = a2.player_id AND DATEDIFF(a1.event_date, a2.first_login) = 1;",
    explanation: "First finds initial login dates. Joins logins offset by +1 day, then divides matched count by total distinct players count."
  },

  // ── 4. SORTING AND GROUPING ──────────────────────────────────
  {
    id: "sql_22",
    title: "Number of Unique Subjects Taught by Each Teacher (LC 2356)",
    difficulty: "Easy",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/",
    query: "SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt FROM teacher GROUP BY teacher_id;",
    explanation: "Groups by teacher ID and returns unique counts using COUNT(DISTINCT subject_id)."
  },
  {
    id: "sql_23",
    title: "User Activity for the Past 30 Days I (LC 1141)",
    difficulty: "Easy",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/user-activity-for-the-past-30-days-i/",
    query: "SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users \nFROM activity \nWHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27' \nGROUP BY activity_date;",
    explanation: "Filters activity dates in range '2019-06-28' and '2019-07-27' (30 days trailing '2019-07-27'), then sums user counts."
  },
  {
    id: "sql_24",
    title: "Classes More Than 5 Students (LC 596)",
    difficulty: "Easy",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/classes-more-than-5-students/",
    query: "SELECT class FROM courses GROUP BY class HAVING COUNT(student) >= 5;",
    explanation: "Groups records by class name, then filters the groups using HAVING count >= 5."
  },
  {
    id: "sql_25",
    title: "Find Followers Count (LC 1729)",
    difficulty: "Easy",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/find-followers-count/",
    query: "SELECT user_id, COUNT(follower_id) AS followers_count FROM followers GROUP BY user_id ORDER BY user_id ASC;",
    explanation: "Groups relations by user_id, counts records, and sorts rows ascending by user_id."
  },
  {
    id: "sql_26",
    title: "Biggest Single Number (LC 1731)",
    difficulty: "Easy",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/biggest-single-number/",
    query: "SELECT MAX(num) AS num \nFROM (\n    SELECT num \n    FROM my_numbers \n    GROUP BY num \n    HAVING COUNT(num) = 1\n) unique_nums;",
    explanation: "Using subquery, finds all numbers with count = 1. The outer query finds the MAX() of this list (returning NULL if empty)."
  },
  {
    id: "sql_27",
    title: "Customer Placing the Largest Number of Orders (LC 586)",
    difficulty: "Easy",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/customer-placing-the-largest-number-of-orders/",
    query: "SELECT customer_number FROM orders GROUP BY customer_number ORDER BY COUNT(order_number) DESC LIMIT 1;",
    explanation: "Groups by customer, sorts in descending order of aggregate orders counts, and returns the top 1."
  },

  // ── 5. ADVANCED SELECT AND JOINS ──────────────────────────────
  {
    id: "sql_28",
    title: "The Number of Employees Which Report to Each Employee (LC 1731)",
    difficulty: "Medium",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/",
    query: "SELECT m.employee_id, m.name, COUNT(e.employee_id) AS reports_count, ROUND(AVG(e.age)) AS average_age \nFROM employees e \nINNER JOIN employees m ON e.reports_to = m.employee_id \nGROUP BY m.employee_id, m.name \nORDER BY m.employee_id;",
    explanation: "Self-joins reports to manager IDs, aggregates count of reports and average age rounded to nearest integer."
  },
  {
    id: "sql_29",
    title: "Primary Department for Each Employee (LC 1789)",
    difficulty: "Easy",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/primary-department-for-each-employee/",
    query: "SELECT employee_id, department_id FROM employee WHERE primary_flag = 'Y'\nUNION\nSELECT employee_id, department_id FROM employee GROUP BY employee_id HAVING COUNT(department_id) = 1;",
    explanation: "Combines two sets: employees with flag = 'Y' and employees who belong to exactly one department using UNION."
  },
  {
    id: "sql_30",
    title: "Triangle Judgement (LC 610)",
    difficulty: "Easy",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/triangle-judgement/",
    query: "SELECT x, y, z, IF(x+y>z AND x+z>y AND y+z>x, 'Yes', 'No') AS triangle FROM triangle;",
    explanation: "Evaluates standard triangle property (sum of any two sides must exceed the third) using conditional IF or CASE."
  },
  {
    id: "sql_31",
    title: "Consecutive Numbers (LC 180)",
    difficulty: "Medium",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/consecutive-numbers/",
    query: "SELECT DISTINCT l1.num AS ConsecutiveNums \nFROM logs l1 \nINNER JOIN logs l2 ON l1.id = l2.id - 1 \nINNER JOIN logs l3 ON l1.id = l3.id - 2 \nWHERE l1.num = l2.num AND l2.num = l3.num;",
    explanation: "Self-joins logs table with IDs offset by 1 and 2, filtering rows where values are equal across all three consecutive positions."
  },
  {
    id: "sql_32",
    title: "Product Price at a Given Date (LC 1164)",
    difficulty: "Medium",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/product-price-at-a-given-date/",
    query: "SELECT product_id, new_price AS price \nFROM products \nWHERE (product_id, change_date) IN (\n    SELECT product_id, MAX(change_date) \n    FROM products \n    WHERE change_date <= '2019-08-16' \n    GROUP BY product_id\n)\nUNION\nSELECT distinct product_id, 10 AS price \nFROM products \nWHERE product_id NOT IN (\n    SELECT DISTINCT product_id \n    FROM products \n    WHERE change_date <= '2019-08-16'\n);",
    explanation: "Splits logic: first gets latest price on/before date; second fetches products not updated before date, setting default price 10."
  },
  {
    id: "sql_33",
    title: "Last Person to Fit in the Bus (LC 1204)",
    difficulty: "Medium",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/last-person-to-fit-in-the-bus/",
    query: "SELECT q1.person_name \nFROM queue q1 \nINNER JOIN queue q2 ON q1.turn >= q2.turn \nGROUP BY q1.turn, q1.person_name \nHAVING SUM(q2.weight) <= 1000 \nORDER BY q1.turn DESC \nLIMIT 1;",
    explanation: "Self joins table to sum weights cumulatively (q2.turn <= q1.turn), filters rows <= 1000 limit, and returns last person."
  },
  {
    id: "sql_34",
    title: "Count Salary Categories (LC 1907)",
    difficulty: "Medium",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/count-salary-categories/",
    query: "SELECT 'Low Salary' AS category, COUNT(income) AS accounts_count FROM accounts WHERE income < 20000\nUNION\nSELECT 'Average Salary' AS category, COUNT(income) AS accounts_count FROM accounts WHERE income BETWEEN 20000 AND 50000\nUNION\nSELECT 'High Salary' AS category, COUNT(income) AS accounts_count FROM accounts WHERE income > 50000;",
    explanation: "Uses UNION to merge three distinct subqueries, ensuring categories with 0 count are retained and represented."
  },

  // ── 6. SUBQUERIES ────────────────────────────────────────────
  {
    id: "sql_35",
    title: "Employees Whose Manager Left the Company (LC 1978)",
    difficulty: "Easy",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
    query: "SELECT employee_id FROM employees WHERE salary < 30000 AND manager_id NOT IN (SELECT employee_id FROM employees) ORDER BY employee_id;",
    explanation: "Identifies rows where manager_id is not present in employee list, with salary filter."
  },
  {
    id: "sql_36",
    title: "Exchange Seats (LC 626)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/exchange-seats/",
    query: "SELECT \n    CASE \n        WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM seat) THEN id \n        WHEN id % 2 = 1 THEN id + 1 \n        ELSE id - 1 \n    END AS id, \n    student \nFROM seat \nORDER BY id;",
    explanation: "Swaps index pointers: if odd and not last, increments by 1; if even, decrements; if last odd, keeps same."
  },
  {
    id: "sql_37",
    title: "Movie Rating (LC 1341)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/movie-rating/",
    query: "(\n    SELECT u.name AS results \n    FROM movie_rating mr \n    INNER JOIN users u ON mr.user_id = u.user_id \n    GROUP BY mr.user_id, u.name \n    ORDER BY COUNT(mr.rating) DESC, u.name ASC \n    LIMIT 1\n)\nUNION ALL\n(\n    SELECT m.title AS results \n    FROM movie_rating mr \n    INNER JOIN movies m ON mr.movie_id = m.movie_id \n    WHERE SUBSTR(mr.created_at, 1, 7) = '2020-02' \n    GROUP BY mr.movie_id, m.title \n    ORDER BY AVG(mr.rating) DESC, m.title ASC \n    LIMIT 1\n);",
    explanation: "Combines two queries: one finding user with most ratings, other finding movie with highest avg rating in Feb 2020."
  },
  {
    id: "sql_38",
    title: "Restaurant Growth (LC 1321)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/restaurant-growth/",
    query: "SELECT c1.visited_on, \n       SUM(c2.amount) AS amount, \n       ROUND(SUM(c2.amount) / 7, 2) AS average_amount \nFROM (\n    SELECT visited_on, SUM(amount) AS day_amount \n    FROM customer \n    GROUP BY visited_on\n) c1 \nINNER JOIN (\n    SELECT visited_on, SUM(amount) AS day_amount \n    FROM customer \n    GROUP BY visited_on\n) c2 ON DATEDIFF(c1.visited_on, c2.visited_on) BETWEEN 0 AND 6 \nGROUP BY c1.visited_on \nHAVING COUNT(c2.visited_on) = 7 \nORDER BY c1.visited_on;",
    explanation: "Calculates 7-day moving averages by joining records within offset [0, 6] range, filtering for complete 7-day sets."
  },
  {
    id: "sql_39",
    title: "Friend Requests II: Who Has the Most Friends (LC 602)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/",
    query: "SELECT id, COUNT(*) AS num \nFROM (\n    SELECT requester_id AS id FROM request_accepted\n    UNION ALL\n    SELECT accepter_id AS id FROM request_accepted\n) friend_counts \nGROUP BY id \nORDER BY num DESC \nLIMIT 1;",
    explanation: "Combines sender and receiver IDs using UNION ALL, groups by ID to sum friends counts, and returns max count."
  },
  {
    id: "sql_40",
    title: "Invested in 2016 (LC 585)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/investments-in-2016/",
    query: "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 \nFROM insurance \nWHERE tiv_2015 IN (\n    SELECT tiv_2015 \n    FROM insurance \n    GROUP BY tiv_2015 \n    HAVING COUNT(*) > 1\n) AND (lat, lon) NOT IN (\n    SELECT lat, lon \n    FROM insurance \n    GROUP BY lat, lon \n    HAVING COUNT(*) > 1\n);",
    explanation: "Checks logic: tiv_2015 matches other accounts (not unique value), but lat/lon coordinate is unique."
  },
  {
    id: "sql_41",
    title: "Department Top Three Salaries (LC 185)",
    difficulty: "Hard",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/department-top-three-salaries/",
    query: "SELECT d.name AS Department, e1.name AS Employee, e1.salary AS Salary \nFROM employee e1 \nINNER JOIN department d ON e1.departmentId = d.id \nWHERE 3 > (\n    SELECT COUNT(distinct e2.salary) \n    FROM employee e2 \n    WHERE e2.departmentId = e1.departmentId AND e2.salary > e1.salary\n);",
    explanation: "Correlated subquery. Filters employee rows where there are less than 3 employees in the same department with a strictly higher salary."
  },

  // ── 7. ADVANCED STRING FUNCTIONS / REGEX / CLAUSE ────────────
  {
    id: "sql_42",
    title: "Fix Names in a Table (LC 1667)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/fix-names-in-a-table/",
    query: "SELECT user_id, CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name FROM users ORDER BY user_id;",
    explanation: "Concats upper-cased first letter with lower-cased trailing substring to standardize names formats."
  },
  {
    id: "sql_43",
    title: "Patients With a Condition (LC 1527)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/patients-with-a-condition/",
    query: "SELECT patient_id, patient_name, conditions FROM patients WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';",
    explanation: "Filters rows containing 'DIAB1' code either as primary keyword or inside spaces-separated substrings."
  },
  {
    id: "sql_44",
    title: "Delete Duplicate Emails (LC 196)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/delete-duplicate-emails/",
    query: "DELETE p1 FROM person p1 \nINNER JOIN person p2 ON p1.email = p2.email \nWHERE p1.id > p2.id;",
    explanation: "Self joins person table. Deletes duplicates keeping row with the minimum ID."
  },
  {
    id: "sql_45",
    title: "Second Highest Salary (LC 176)",
    difficulty: "Medium",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/second-highest-salary/",
    query: "SELECT (\n    SELECT DISTINCT salary \n    FROM employee \n    ORDER BY salary DESC \n    LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;",
    explanation: "Selects second highest using LIMIT 1 OFFSET 1 inside parent SELECT to handle cases where query returns empty set (outputs NULL)."
  },
  {
    id: "sql_46",
    title: "Group Sold Products By The Date (LC 1484)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/group-sold-products-by-the-date/",
    query: "SELECT sell_date, \n       COUNT(distinct product) AS num_sold, \n       GROUP_CONCAT(distinct product ORDER BY product ASC SEPARATOR ',') AS products \nFROM activities \nGROUP BY sell_date \nORDER BY sell_date;",
    explanation: "Uses GROUP_CONCAT() (MySQL) or STRING_AGG() (Postgres) to combine values from aggregated records into single strings."
  },
  {
    id: "sql_47",
    title: "List the Products Ordered in a Period (LC 1327)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/list-the-products-ordered-in-a-period/",
    query: "SELECT p.product_name, SUM(o.unit) AS unit \nFROM products p \nINNER JOIN orders o ON p.product_id = o.product_id \nWHERE SUBSTR(o.order_date, 1, 7) = '2020-02' \nGROUP BY p.product_id, p.product_name \nHAVING unit >= 100;",
    explanation: "Joins orders from Feb 2020, aggregates totals grouped by product name, and retains sums >= 100."
  },
  {
    id: "sql_48",
    title: "Find Users With Valid E-Mails (LC 1517)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/find-users-with-valid-e-mails/",
    query: "SELECT user_id, name, mail FROM users WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode\\\\.com$';",
    explanation: "Uses REGEXP pattern matching. The email prefix must start with letter, followed by valid alphanumeric/specials, ending with domain '@leetcode.com'."
  },
  {
    id: "sql_49",
    title: "User Project Contributions (LC 1809)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/ad-free-sessions/",
    query: "SELECT session_id \nFROM playback p \nLEFT JOIN ads a ON p.customer_id = a.customer_id AND a.timestamp BETWEEN p.start_time AND p.end_time \nWHERE a.ad_id IS NULL;",
    explanation: "Identifies user playback sessions containing no ad impressions during that timeline using LEFT JOIN and IS NULL check."
  },
  {
    id: "sql_50",
    title: "Calculated Employee Salaries (LC 1699)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/number-of-calls-between-two-persons/",
    query: "SELECT IF(from_id < to_id, from_id, to_id) AS person1, \n       IF(from_id < to_id, to_id, from_id) AS person2, \n       COUNT(*) AS call_count, \n       SUM(duration) AS total_duration \nFROM calls \nGROUP BY person1, person2;",
    explanation: "Normalizes direction of calls by swapping parameters to always sort IDs consistently, then aggregates counts and durations."
  },
  {
    id: "sql_51",
    title: "Article Views II (LC 1149)",
    difficulty: "Medium",
    topic: "Select",
    leetcode: "https://leetcode.com/problems/article-views-ii/",
    query: "SELECT DISTINCT viewer_id AS id FROM views GROUP BY viewer_id, view_date HAVING COUNT(DISTINCT article_id) > 1 ORDER BY id ASC;",
    explanation: "Groups by viewer and date to find viewers who read more than one distinct article on the same day."
  },
  {
    id: "sql_52",
    title: "Managers with at Least 5 Direct Reports (LC 570)",
    difficulty: "Medium",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/",
    query: "SELECT e1.name FROM employee e1 INNER JOIN employee e2 ON e1.id = e2.managerId GROUP BY e1.id, e1.name HAVING COUNT(e2.id) >= 5;",
    explanation: "Self-joins the employee table on manager ID, grouping by manager to retain those with 5 or more reports."
  },
  {
    id: "sql_53",
    title: "Confirmation Rate (LC 1934)",
    difficulty: "Medium",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/confirmation-rate/",
    query: "SELECT s.user_id, ROUND(IFNULL(SUM(c.action = 'confirmed') / COUNT(c.user_id), 0), 2) AS confirmation_rate FROM signups s LEFT JOIN confirmations c ON s.user_id = c.user_id GROUP BY s.user_id;",
    explanation: "Performs LEFT JOIN to include users with no actions, then aggregates confirmation occurrences divided by total count."
  },
  {
    id: "sql_54",
    title: "Sales Person (LC 607)",
    difficulty: "Easy",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/sales-person/",
    query: "SELECT name FROM salesperson WHERE sales_id NOT IN (SELECT o.sales_id FROM orders o LEFT JOIN company c ON o.com_id = c.com_id WHERE c.name = 'RED');",
    explanation: "Retrieves salesperson names whose IDs are not in the list of sales associated with orders for company 'RED'."
  },
  {
    id: "sql_55",
    title: "Investments in 2016 (LC 585)",
    difficulty: "Medium",
    topic: "Basic Joins",
    leetcode: "https://leetcode.com/problems/investments-in-2016/",
    query: "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 FROM insurance WHERE tiv_2015 IN (SELECT tiv_2015 FROM insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1) AND (lat, lon) IN (SELECT lat, lon FROM insurance GROUP BY lat, lon HAVING COUNT(*) = 1);",
    explanation: "Aggregates 2016 values for policies sharing 2015 values with others but located at unique geographic coordinates."
  },
  {
    id: "sql_56",
    title: "Average Time of Process per Machine (LC 1661)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/average-time-of-process-per-machine/",
    query: "SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time FROM activity a1 INNER JOIN activity a2 ON a1.machine_id = a2.machine_id AND a1.process_id = a2.process_id AND a1.activity_type = 'start' AND a2.activity_type = 'end' GROUP BY a1.machine_id;",
    explanation: "Self-joins processes on start/end events, averages the difference in timestamps, and groups by machine."
  },
  {
    id: "sql_57",
    title: "Project Employees I (LC 1075)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/project-employees-i/",
    query: "SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years FROM project p LEFT JOIN employee e ON p.employee_id = e.employee_id GROUP BY p.project_id;",
    explanation: "Joins project and employee arrays, groups by project, and computes average experience years rounded to 2 decimals."
  },
  {
    id: "sql_58",
    title: "Percentage of Users Attended a Contest (LC 1633)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/percentage-of-users-attended-a-contest/",
    query: "SELECT contest_id, ROUND((COUNT(DISTINCT user_id) / (SELECT COUNT(*) FROM users)) * 100, 2) AS percentage FROM register GROUP BY contest_id ORDER BY percentage DESC, contest_id ASC;",
    explanation: "Calculates registration count divided by total user count (from subquery), then sorts by percentage descending."
  },
  {
    id: "sql_59",
    title: "Queries Quality and Percentage (LC 1211)",
    difficulty: "Easy",
    topic: "Aggregate Functions",
    leetcode: "https://leetcode.com/problems/queries-quality-and-percentage/",
    query: "SELECT query_name, ROUND(AVG(rating / position), 2) AS quality, ROUND(AVG(rating < 3) * 100, 2) AS poor_query_percentage FROM queries WHERE query_name IS NOT NULL GROUP BY query_name;",
    explanation: "Averages quality (rating / position) and computes fraction of ratings < 3 as percentage grouped by query name."
  },
  {
    id: "sql_60",
    title: "Monthly Transactions I (LC 1193)",
    difficulty: "Medium",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/monthly-transactions-i/",
    query: "SELECT SUBSTR(trans_date, 1, 7) AS month, country, COUNT(*) AS trans_count, SUM(state = 'approved') AS approved_count, SUM(amount) AS trans_total_amount, SUM(IF(state = 'approved', amount, 0)) AS approved_total_amount FROM transactions GROUP BY month, country;",
    explanation: "Groups by formatted month and country to compile totals and sums for approved transactions."
  },
  {
    id: "sql_61",
    title: "Immediate Food Delivery II (LC 1174)",
    difficulty: "Medium",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/immediate-food-delivery-ii/",
    query: "SELECT ROUND(AVG(order_date = customer_pref_delivery_date) * 100, 2) AS immediate_percentage FROM delivery WHERE (customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM delivery GROUP BY customer_id);",
    explanation: "Finds the first order date for each customer, and calculates the percentage of these that were immediate."
  },
  {
    id: "sql_62",
    title: "Game Play Analysis IV (LC 550)",
    difficulty: "Medium",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/game-play-analysis-iv/",
    query: "SELECT ROUND(COUNT(DISTINCT a1.player_id) / (SELECT COUNT(DISTINCT player_id) FROM activity), 2) AS fraction FROM activity a1 INNER JOIN (SELECT player_id, MIN(event_date) AS first_login FROM activity GROUP BY player_id) a2 ON a1.player_id = a2.player_id AND a1.event_date = DATE_ADD(a2.first_login, INTERVAL 1 DAY);",
    explanation: "Tracks players who logged in on the consecutive day after their first login date, dividing by total players."
  },
  {
    id: "sql_63",
    title: "Classes More Than 5 Students (LC 596)",
    difficulty: "Easy",
    topic: "Sorting and Grouping",
    leetcode: "https://leetcode.com/problems/classes-more-than-5-students/",
    query: "SELECT class FROM courses GROUP BY class HAVING COUNT(DISTINCT student) >= 5;",
    explanation: "Groups by class name and filters utilizing HAVING count of distinct student IDs >= 5."
  },
  {
    id: "sql_64",
    title: "Primary Department for Each Employee (LC 1789)",
    difficulty: "Easy",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/primary-department-for-each-employee/",
    query: "SELECT employee_id, department_id FROM employee WHERE primary_flag = 'Y' UNION SELECT employee_id, department_id FROM employee GROUP BY employee_id HAVING COUNT(department_id) = 1;",
    explanation: "Unions employees assigned a primary flag 'Y' with employees who belong to exactly one department."
  },
  {
    id: "sql_65",
    title: "Triangle Judgement (LC 619)",
    difficulty: "Easy",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/triangle-judgement/",
    query: "SELECT x, y, z, IF(x+y>z AND x+z>y AND y+z>x, 'Yes', 'No') AS triangle FROM triangle;",
    explanation: "Applies the triangle inequality theorem (sum of any two sides must be greater than the third side) using a conditional statement."
  },
  {
    id: "sql_66",
    title: "Consecutive Numbers (LC 180)",
    difficulty: "Medium",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/consecutive-numbers/",
    query: "SELECT DISTINCT l1.num AS ConsecutiveNums FROM logs l1 INNER JOIN logs l2 ON l1.id = l2.id - 1 INNER JOIN logs l3 ON l1.id = l3.id - 2 WHERE l1.num = l2.num AND l2.num = l3.num;",
    explanation: "Self-joins logs three times on consecutive ID steps to find numbers repeating three times sequentially."
  },
  {
    id: "sql_67",
    title: "Product Price at a Given Date (LC 1164)",
    difficulty: "Medium",
    topic: "Advanced Select and Joins",
    leetcode: "https://leetcode.com/problems/product-price-at-a-given-date/",
    query: "SELECT product_id, 10 AS price FROM products GROUP BY product_id HAVING MIN(change_date) > '2019-08-16' UNION SELECT product_id, new_price AS price FROM products WHERE (product_id, change_date) IN (SELECT product_id, MAX(change_date) FROM products WHERE change_date <= '2019-08-16' GROUP BY product_id);",
    explanation: "Unions products whose first change occurred after the target date (default price 10) with the latest recorded price on/before the date."
  },
  {
    id: "sql_68",
    title: "Last Person to Fit in the Bus (LC 1204)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/last-person-to-fit-in-the-bus/",
    query: "SELECT person_name FROM (SELECT person_name, turn, SUM(weight) OVER(ORDER BY turn) AS cumulative_weight FROM queue) q WHERE cumulative_weight <= 1000 ORDER BY turn DESC LIMIT 1;",
    explanation: "Calculates cumulative passenger weights ordered by boarding turn using window function, then extracts the last passenger under 1000 kg."
  },
  {
    id: "sql_69",
    title: "Restaurant Growth (LC 1321)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/restaurant-growth/",
    query: "SELECT visited_on, amount, ROUND(amount / 7, 2) AS average_amount FROM (SELECT DISTINCT visited_on, SUM(amount) OVER(ORDER BY visited_on RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW) AS amount, MIN(visited_on) OVER() AS start_date FROM customer) t WHERE visited_on >= DATE_ADD(start_date, INTERVAL 6 DAY);",
    explanation: "Uses window function range intervals to sum transaction records for a moving 7-day window, filtering out the first 6 days."
  },
  {
    id: "sql_70",
    title: "Friend Requests II: Who Has the Most Friends (LC 602)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/",
    query: "SELECT id, COUNT(*) AS num FROM (SELECT requester_id AS id FROM requestaccepted UNION ALL SELECT accepter_id AS id FROM requestaccepted) friends GROUP BY id ORDER BY num DESC LIMIT 1;",
    explanation: "Unions requester and accepter IDs in a single column to count occurrences of each ID, keeping the top record."
  },
  {
    id: "sql_71",
    title: "Movie Rating (LC 1341)",
    difficulty: "Medium",
    topic: "Subqueries",
    leetcode: "https://leetcode.com/problems/movie-rating/",
    query: "(SELECT u.name AS results FROM movie_rating mr INNER JOIN users u ON mr.user_id = u.user_id GROUP BY mr.user_id ORDER BY COUNT(*) DESC, u.name ASC LIMIT 1) UNION ALL (SELECT m.title AS results FROM movie_rating mr INNER JOIN movies m ON mr.movie_id = m.movie_id WHERE SUBSTR(mr.created_at, 1, 7) = '2020-02' GROUP BY mr.movie_id ORDER BY AVG(mr.rating) DESC, m.title ASC LIMIT 1);",
    explanation: "Unions the user who rated the highest number of movies with the movie that achieved the highest average rating in Feb 2020."
  },
  {
    id: "sql_72",
    title: "Patients With a Condition (LC 1527)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/patients-with-a-condition/",
    query: "SELECT patient_id, patient_name, conditions FROM patients WHERE conditions REGEXP '\\bDIAB1';",
    explanation: "Retrieves patient records where the conditions code string contains a word starting with 'DIAB1' using word boundaries REGEXP."
  },
  {
    id: "sql_73",
    title: "Delete Duplicate Emails (LC 196)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/delete-duplicate-emails/",
    query: "DELETE p1 FROM person p1 INNER JOIN person p2 ON p1.email = p2.email WHERE p1.id > p2.id;",
    explanation: "Deletes duplicate rows from the person table by keeping the record containing the minimum ID for each unique email."
  },
  {
    id: "sql_74",
    title: "Second Highest Salary (LC 176)",
    difficulty: "Medium",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/second-highest-salary/",
    query: "SELECT (SELECT DISTINCT salary FROM employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;",
    explanation: "Uses an offset query inside a SELECT wrap to guarantee that NULL is returned if there are fewer than two unique salaries."
  },
  {
    id: "sql_75",
    title: "Group Sold Products By The Date (LC 1484)",
    difficulty: "Easy",
    topic: "String Functions / Regex",
    leetcode: "https://leetcode.com/problems/group-sold-products-by-the-date/",
    query: "SELECT sell_date, COUNT(DISTINCT product) AS num_sold, GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products FROM activities GROUP BY sell_date ORDER BY sell_date ASC;",
    explanation: "Groups by sale date, compiles counts of distinct product titles, and aggregates them into a comma-separated sorted string."
  }

];