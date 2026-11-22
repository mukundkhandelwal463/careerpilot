# Auto-generated Difficulty-Specific Question Banks for Mock Tests
# Easy, Medium, and Hard sets guaranteeing unique and appropriate questions

MOCK_TEST_BANKS = {
    "easy": {
        "technical": [
            {
                "id": "easy_tech_dsa_0",
                "subject": "DSA",
                "question": "What is the time complexity to access an element by index in an array?",
                "options": [
                    "O(1)",
                    "O(n)",
                    "O(log n)",
                    "O(n^2)"
                ],
                "answer": "O(1)",
                "explanation": "Arrays provide direct memory addressing using base address + index * element_size, allowing O(1) constant time access."
            },
            {
                "id": "easy_tech_dsa_1",
                "subject": "DSA",
                "question": "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
                "options": [
                    "Queue",
                    "Stack",
                    "Array",
                    "Linked List"
                ],
                "answer": "Stack",
                "explanation": "A stack inserts and removes elements from the top, following the LIFO principle."
            },
            {
                "id": "easy_tech_dsa_2",
                "subject": "DSA",
                "question": "Which data structure operates on a First-In, First-Out (FIFO) principle?",
                "options": [
                    "Stack",
                    "Queue",
                    "Tree",
                    "Graph"
                ],
                "answer": "Queue",
                "explanation": "A queue enqueues at the rear and dequeues from the front, adhering to FIFO."
            },
            {
                "id": "easy_tech_dsa_3",
                "subject": "DSA",
                "question": "What is the best-case time complexity of Linear Search?",
                "options": [
                    "O(1)",
                    "O(log n)",
                    "O(n)",
                    "O(n log n)"
                ],
                "answer": "O(1)",
                "explanation": "The target element is found at the very first index inspected."
            },
            {
                "id": "easy_tech_dsa_4",
                "subject": "DSA",
                "question": "In a singly linked list, what does each node store?",
                "options": [
                    "Data and a pointer to the next node",
                    "Data and a pointer to previous node",
                    "Only data",
                    "Pointers to left and right children"
                ],
                "answer": "Data and a pointer to the next node",
                "explanation": "A singly linked list node contains the data value and a next pointer to the succeeding node."
            },
            {
                "id": "easy_tech_dsa_5",
                "subject": "DSA",
                "question": "What is the maximum number of children a node can have in a Binary Tree?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "Unlimited"
                ],
                "answer": "2",
                "explanation": "By definition, each node in a binary tree has at most two children (left and right)."
            },
            {
                "id": "easy_tech_dsa_6",
                "subject": "DSA",
                "question": "Which sorting algorithm repeatedly swaps adjacent elements if they are in the wrong order?",
                "options": [
                    "Bubble Sort",
                    "Merge Sort",
                    "Quick Sort",
                    "Radix Sort"
                ],
                "answer": "Bubble Sort",
                "explanation": "Bubble Sort compares adjacent pairs and swaps them until the list is sorted."
            },
            {
                "id": "easy_tech_dsa_7",
                "subject": "DSA",
                "question": "What condition must be met before performing Binary Search on an array?",
                "options": [
                    "Array must be sorted",
                    "Array must contain only positive numbers",
                    "Array must have even length",
                    "Array must have unique elements"
                ],
                "answer": "Array must be sorted",
                "explanation": "Binary search divides the search space in half based on order, requiring sorted data."
            },
            {
                "id": "easy_tech_dsa_8",
                "subject": "DSA",
                "question": "What is the time complexity of inserting a node at the head of a Singly Linked List?",
                "options": [
                    "O(1)",
                    "O(n)",
                    "O(log n)",
                    "O(n^2)"
                ],
                "answer": "O(1)",
                "explanation": "Inserting at head only requires updating the new node's next pointer and head reference."
            },
            {
                "id": "easy_tech_dsa_9",
                "subject": "DSA",
                "question": "Which data structure is ideal for checking balanced parentheses in an expression?",
                "options": [
                    "Stack",
                    "Queue",
                    "Binary Heap",
                    "Hash Set"
                ],
                "answer": "Stack",
                "explanation": "A stack allows matching the most recently opened parenthesis with the next closing one."
            },
            {
                "id": "easy_tech_oops_0",
                "subject": "OOPs",
                "question": "Which OOP concept involves wrapping data and methods into a single unit?",
                "options": [
                    "Encapsulation",
                    "Inheritance",
                    "Polymorphism",
                    "Abstraction"
                ],
                "answer": "Encapsulation",
                "explanation": "Encapsulation binds data members and member functions together within a class to restrict direct external modification."
            },
            {
                "id": "easy_tech_oops_1",
                "subject": "OOPs",
                "question": "Which mechanism allows a class to acquire properties and behavior from another class?",
                "options": [
                    "Inheritance",
                    "Polymorphism",
                    "Encapsulation",
                    "Abstraction"
                ],
                "answer": "Inheritance",
                "explanation": "Inheritance allows child classes to reuse and extend code defined in parent classes."
            },
            {
                "id": "easy_tech_oops_2",
                "subject": "OOPs",
                "question": "What is a special method called that is automatically invoked when an object is instantiated?",
                "options": [
                    "Constructor",
                    "Destructor",
                    "Static method",
                    "Getter"
                ],
                "answer": "Constructor",
                "explanation": "A constructor initializes state when an object of a class is created."
            },
            {
                "id": "easy_tech_oops_3",
                "subject": "OOPs",
                "question": "Which OOP concept allows the same function name to behave differently based on input parameters?",
                "options": [
                    "Method Overloading",
                    "Method Overriding",
                    "Encapsulation",
                    "Multi-threading"
                ],
                "answer": "Method Overloading",
                "explanation": "Method overloading is compile-time polymorphism where methods share names with distinct signatures."
            },
            {
                "id": "easy_tech_oops_4",
                "subject": "OOPs",
                "question": "Which keyword is commonly used in Java and C++ to refer to the current object instance?",
                "options": [
                    "this",
                    "self",
                    "super",
                    "current"
                ],
                "answer": "this",
                "explanation": "'this' is a reference pointer to the invoking object instance."
            },
            {
                "id": "easy_tech_oops_5",
                "subject": "OOPs",
                "question": "What access modifier makes a class member accessible only within its own class?",
                "options": [
                    "private",
                    "public",
                    "protected",
                    "default"
                ],
                "answer": "private",
                "explanation": "'private' restricts visibility strictly to the declaring class."
            },
            {
                "id": "easy_tech_oops_6",
                "subject": "OOPs",
                "question": "What is an instance of a class called?",
                "options": [
                    "Object",
                    "Method",
                    "Variable",
                    "Interface"
                ],
                "answer": "Object",
                "explanation": "An object is a concrete runtime instance of a class blueprint."
            },
            {
                "id": "easy_tech_oops_7",
                "subject": "OOPs",
                "question": "Which concept hides internal implementation details and shows only functionality to the user?",
                "options": [
                    "Abstraction",
                    "Inheritance",
                    "Composition",
                    "Aggregation"
                ],
                "answer": "Abstraction",
                "explanation": "Abstraction displays essential features while shielding background implementation details."
            },
            {
                "id": "easy_tech_oops_8",
                "subject": "OOPs",
                "question": "What is it called when a child class provides a specific implementation of a method declared in its parent class?",
                "options": [
                    "Method Overriding",
                    "Method Overloading",
                    "Shadowing",
                    "Inlining"
                ],
                "answer": "Method Overriding",
                "explanation": "Method overriding provides runtime polymorphism by redefining a parent method in a child class."
            },
            {
                "id": "easy_tech_oops_9",
                "subject": "OOPs",
                "question": "Can an abstract class be directly instantiated with the 'new' keyword?",
                "options": [
                    "No",
                    "Yes",
                    "Only if it has no abstract methods",
                    "Only in static contexts"
                ],
                "answer": "No",
                "explanation": "Abstract classes serve as blueprints and cannot be directly instantiated."
            },
            {
                "id": "easy_tech_os_0",
                "subject": "OS",
                "question": "What is a program in execution called in an Operating System?",
                "options": [
                    "Process",
                    "Thread",
                    "Instruction",
                    "Service"
                ],
                "answer": "Process",
                "explanation": "A process is an active program loaded in memory with its own resources."
            },
            {
                "id": "easy_tech_os_1",
                "subject": "OS",
                "question": "Which part of the Operating System resides continuously in main memory?",
                "options": [
                    "Kernel",
                    "Shell",
                    "Compiler",
                    "File Explorer"
                ],
                "answer": "Kernel",
                "explanation": "The kernel is the core component of an OS that manages hardware and memory continuously."
            },
            {
                "id": "easy_tech_os_2",
                "subject": "OS",
                "question": "Which component coordinates between the hardware and user applications?",
                "options": [
                    "Operating System",
                    "Compiler",
                    "Assembler",
                    "Hard Drive"
                ],
                "answer": "Operating System",
                "explanation": "The OS acts as an intermediary interface between computer hardware and user software."
            },
            {
                "id": "easy_tech_os_3",
                "subject": "OS",
                "question": "What is the main purpose of CPU scheduling?",
                "options": [
                    "Maximize CPU utilization and throughput",
                    "Increase disk storage",
                    "Compile source code faster",
                    "Format storage sectors"
                ],
                "answer": "Maximize CPU utilization and throughput",
                "explanation": "CPU scheduling ensures that the processor remains busy by allocating cycles efficiently."
            },
            {
                "id": "easy_tech_os_4",
                "subject": "OS",
                "question": "Which CPU scheduling algorithm operates strictly on a First-Come, First-Served basis?",
                "options": [
                    "FCFS",
                    "SJF",
                    "Round Robin",
                    "Priority Scheduling"
                ],
                "answer": "FCFS",
                "explanation": "FCFS schedules processes in the exact order they arrive in the ready queue."
            },
            {
                "id": "easy_tech_os_5",
                "subject": "OS",
                "question": "What is a situation where two or more processes are blocked indefinitely waiting for each other?",
                "options": [
                    "Deadlock",
                    "Starvation",
                    "Paging",
                    "Thrashing"
                ],
                "answer": "Deadlock",
                "explanation": "Deadlock is a stalemate where each process holds resources while waiting for ones held by others."
            },
            {
                "id": "easy_tech_os_6",
                "subject": "OS",
                "question": "Which memory management technique divides physical memory into fixed-size blocks called frames?",
                "options": [
                    "Paging",
                    "Segmentation",
                    "Swapping",
                    "Compaction"
                ],
                "answer": "Paging",
                "explanation": "Paging divides physical memory into fixed-sized frames and logical memory into pages."
            },
            {
                "id": "easy_tech_os_7",
                "subject": "OS",
                "question": "What is the smallest unit of execution within a process called?",
                "options": [
                    "Thread",
                    "Task",
                    "Fiber",
                    "Register"
                ],
                "answer": "Thread",
                "explanation": "A thread is a lightweight execution stream within a process that shares its address space."
            },
            {
                "id": "easy_tech_os_8",
                "subject": "OS",
                "question": "Which type of memory is volatile and loses its contents when powered off?",
                "options": [
                    "RAM",
                    "ROM",
                    "Hard Disk",
                    "SSD"
                ],
                "answer": "RAM",
                "explanation": "Random Access Memory (RAM) requires continuous power to retain state."
            },
            {
                "id": "easy_tech_os_9",
                "subject": "OS",
                "question": "What hardware mechanism alerts the CPU that an I/O operation has completed?",
                "options": [
                    "Interrupt",
                    "Polling",
                    "DMA",
                    "System Call"
                ],
                "answer": "Interrupt",
                "explanation": "An interrupt signals the CPU to suspend current activity and handle an urgent event."
            },
            {
                "id": "easy_tech_dbms_0",
                "subject": "DBMS",
                "question": "What does SQL stand for?",
                "options": [
                    "Structured Query Language",
                    "Sequential Query Logic",
                    "Standard Question Language",
                    "System Quality Level"
                ],
                "answer": "Structured Query Language",
                "explanation": "SQL is the standard language for querying and managing relational databases."
            },
            {
                "id": "easy_tech_dbms_1",
                "subject": "DBMS",
                "question": "Which SQL statement is used to retrieve data from a database table?",
                "options": [
                    "SELECT",
                    "EXTRACT",
                    "GET",
                    "OPEN"
                ],
                "answer": "SELECT",
                "explanation": "SELECT is the primary DQL command used to query rows from tables."
            },
            {
                "id": "easy_tech_dbms_2",
                "subject": "DBMS",
                "question": "Which key uniquely identifies each record in a database table?",
                "options": [
                    "Primary Key",
                    "Foreign Key",
                    "Candidate Key",
                    "Composite Key"
                ],
                "answer": "Primary Key",
                "explanation": "A Primary Key enforces unique and non-null values for every record in a table."
            },
            {
                "id": "easy_tech_dbms_3",
                "subject": "DBMS",
                "question": "Which SQL clause is used to filter records based on a specified condition?",
                "options": [
                    "WHERE",
                    "HAVING",
                    "GROUP BY",
                    "ORDER BY"
                ],
                "answer": "WHERE",
                "explanation": "WHERE filters rows before any grouping or aggregation is performed."
            },
            {
                "id": "easy_tech_dbms_4",
                "subject": "DBMS",
                "question": "What does the 'A' stand for in the ACID properties of database transactions?",
                "options": [
                    "Atomicity",
                    "Availability",
                    "Authentication",
                    "Accuracy"
                ],
                "answer": "Atomicity",
                "explanation": "Atomicity guarantees that all operations in a transaction either complete entirely or abort with no effect."
            },
            {
                "id": "easy_tech_dbms_5",
                "subject": "DBMS",
                "question": "Which SQL command is used to add new rows of data into a table?",
                "options": [
                    "INSERT INTO",
                    "ADD ROW",
                    "APPEND",
                    "UPDATE"
                ],
                "answer": "INSERT INTO",
                "explanation": "INSERT INTO adds new tuples to an existing relation."
            },
            {
                "id": "easy_tech_dbms_6",
                "subject": "DBMS",
                "question": "Which SQL command is used to delete an entire table structure along with its data?",
                "options": [
                    "DROP TABLE",
                    "DELETE TABLE",
                    "TRUNCATE",
                    "REMOVE"
                ],
                "answer": "DROP TABLE",
                "explanation": "DROP TABLE permanently destroys the table schema and all contained records."
            },
            {
                "id": "easy_tech_dbms_7",
                "subject": "DBMS",
                "question": "Which constraint ensures that a column cannot contain NULL values?",
                "options": [
                    "NOT NULL",
                    "UNIQUE",
                    "PRIMARY KEY",
                    "CHECK"
                ],
                "answer": "NOT NULL",
                "explanation": "NOT NULL guarantees that a valid value must always be supplied for that column."
            },
            {
                "id": "easy_tech_dbms_8",
                "subject": "DBMS",
                "question": "What is a field in one table that uniquely identifies a row of another table called?",
                "options": [
                    "Foreign Key",
                    "Primary Key",
                    "Alternate Key",
                    "Super Key"
                ],
                "answer": "Foreign Key",
                "explanation": "A foreign key establishes a referential integrity link between two relations."
            },
            {
                "id": "easy_tech_dbms_9",
                "subject": "DBMS",
                "question": "Which SQL aggregate function counts the total number of rows in a table?",
                "options": [
                    "COUNT()",
                    "SUM()",
                    "TOTAL()",
                    "NUMBER()"
                ],
                "answer": "COUNT()",
                "explanation": "COUNT(*) returns the number of rows matching the query condition."
            },
            {
                "id": "easy_tech_cn_0",
                "subject": "CN",
                "question": "What does IP stand for in computer networking?",
                "options": [
                    "Internet Protocol",
                    "Internal Process",
                    "Interface Point",
                    "Integrated Packet"
                ],
                "answer": "Internet Protocol",
                "explanation": "IP specifies addressing and routing mechanisms across networks."
            },
            {
                "id": "easy_tech_cn_1",
                "subject": "CN",
                "question": "How many layers are there in the standard OSI model?",
                "options": [
                    "7",
                    "4",
                    "5",
                    "6"
                ],
                "answer": "7",
                "explanation": "The OSI model consists of Physical, Data Link, Network, Transport, Session, Presentation, and Application layers."
            },
            {
                "id": "easy_tech_cn_2",
                "subject": "CN",
                "question": "Which protocol is primarily used for securely transferring web pages in browsers?",
                "options": [
                    "HTTPS",
                    "HTTP",
                    "FTP",
                    "SMTP"
                ],
                "answer": "HTTPS",
                "explanation": "HTTPS encrypts HTTP traffic using TLS/SSL."
            },
            {
                "id": "easy_tech_cn_3",
                "subject": "CN",
                "question": "Which device connects multiple devices on a Local Area Network (LAN) and uses MAC addresses to forward frames?",
                "options": [
                    "Switch",
                    "Hub",
                    "Repeater",
                    "Modem"
                ],
                "answer": "Switch",
                "explanation": "A network switch operates at Layer 2 and uses MAC address lookup tables to forward frames."
            },
            {
                "id": "easy_tech_cn_4",
                "subject": "CN",
                "question": "What is the standard port number for HTTP web traffic?",
                "options": [
                    "80",
                    "443",
                    "21",
                    "25"
                ],
                "answer": "80",
                "explanation": "Port 80 is the default TCP port for unencrypted HTTP traffic."
            },
            {
                "id": "easy_tech_cn_5",
                "subject": "CN",
                "question": "Which protocol resolves human-friendly domain names (e.g. google.com) to numeric IP addresses?",
                "options": [
                    "DNS",
                    "DHCP",
                    "ARP",
                    "ICMP"
                ],
                "answer": "DNS",
                "explanation": "Domain Name System (DNS) translates hostnames to IP addresses."
            },
            {
                "id": "easy_tech_cn_6",
                "subject": "CN",
                "question": "Which transport layer protocol provides reliable, connection-oriented data transmission?",
                "options": [
                    "TCP",
                    "UDP",
                    "IP",
                    "ICMP"
                ],
                "answer": "TCP",
                "explanation": "TCP establishes connections via three-way handshakes and guarantees packet ordering and delivery."
            },
            {
                "id": "easy_tech_cn_7",
                "subject": "CN",
                "question": "What is the default port for secure HTTPS web traffic?",
                "options": [
                    "443",
                    "80",
                    "8080",
                    "22"
                ],
                "answer": "443",
                "explanation": "Port 443 is assigned by IANA for TLS/SSL encrypted HTTPS traffic."
            },
            {
                "id": "easy_tech_cn_8",
                "subject": "CN",
                "question": "What type of address is a 48-bit hardware address assigned to a network interface card?",
                "options": [
                    "MAC Address",
                    "IP Address",
                    "Port Number",
                    "Socket"
                ],
                "answer": "MAC Address",
                "explanation": "A MAC address is a physical identifier burned into a network controller."
            },
            {
                "id": "easy_tech_cn_9",
                "subject": "CN",
                "question": "Which network utility is used to test the reachability of a host on an Internet Protocol network?",
                "options": [
                    "ping",
                    "traceroute",
                    "netstat",
                    "ipconfig"
                ],
                "answer": "ping",
                "explanation": "Ping sends ICMP Echo Request packets to test host availability."
            },
            {
                "id": "easy_tech_sys_0",
                "subject": "System Design",
                "question": "What is the primary purpose of a Load Balancer in system design?",
                "options": [
                    "Distribute incoming traffic across multiple servers",
                    "Encrypt database storage",
                    "Compile application code",
                    "Backup file systems"
                ],
                "answer": "Distribute incoming traffic across multiple servers",
                "explanation": "Load balancers distribute user requests among server pools to prevent single points of overload."
            },
            {
                "id": "easy_tech_sys_1",
                "subject": "System Design",
                "question": "What does horizontal scaling (scale out) refer to?",
                "options": [
                    "Adding more machines to the pool",
                    "Upgrading CPU and RAM on a single machine",
                    "Reducing database indexes",
                    "Increasing disk spindle speed"
                ],
                "answer": "Adding more machines to the pool",
                "explanation": "Horizontal scaling adds additional servers or nodes to handle workload growth."
            },
            {
                "id": "easy_tech_sys_2",
                "subject": "System Design",
                "question": "What does vertical scaling (scale up) refer to?",
                "options": [
                    "Adding more resources (CPU, RAM) to an existing machine",
                    "Adding more server nodes",
                    "Distributing data across clusters",
                    "Implementing CDN caching"
                ],
                "answer": "Adding more resources (CPU, RAM) to an existing machine",
                "explanation": "Vertical scaling upgrades the compute and memory capacity of an individual server."
            },
            {
                "id": "easy_tech_sys_3",
                "subject": "System Design",
                "question": "What is the main benefit of using a Cache (e.g. Redis, Memcached)?",
                "options": [
                    "Reduce latency and offload database reads",
                    "Permanently archive audit logs",
                    "Enforce relational constraints",
                    "Handle DNS lookups"
                ],
                "answer": "Reduce latency and offload database reads",
                "explanation": "In-memory caching serves frequently requested data in sub-millisecond time."
            },
            {
                "id": "easy_tech_sys_4",
                "subject": "System Design",
                "question": "What is a Single Point of Failure (SPOF)?",
                "options": [
                    "A component whose failure stops the entire system from operating",
                    "A failed database query",
                    "A slow network cable",
                    "An uncaught runtime exception"
                ],
                "answer": "A component whose failure stops the entire system from operating",
                "explanation": "A SPOF has no redundant backup; its disruption halts the service."
            },
            {
                "id": "easy_tech_sys_5",
                "subject": "System Design",
                "question": "What is a Content Delivery Network (CDN) primarily used for?",
                "options": [
                    "Serving static assets from edge locations close to users",
                    "Running complex relational joins",
                    "Managing user password hashing",
                    "Scheduling background batch jobs"
                ],
                "answer": "Serving static assets from edge locations close to users",
                "explanation": "CDNs cache images, videos, and scripts geographically close to users to minimize latency."
            },
            {
                "id": "easy_tech_sys_6",
                "subject": "System Design",
                "question": "What does High Availability (HA) in system architecture measure?",
                "options": [
                    "The percentage of time a system remains operational and accessible",
                    "The raw CPU clock frequency",
                    "The disk write speed",
                    "The size of the source code"
                ],
                "answer": "The percentage of time a system remains operational and accessible",
                "explanation": "High availability aims for continuous uptime (e.g., 99.999% 'five nines')."
            },
            {
                "id": "easy_tech_sys_7",
                "subject": "System Design",
                "question": "What is the primary difference between SQL and NoSQL databases?",
                "options": [
                    "SQL is relational with schemas; NoSQL is non-relational and schema-flexible",
                    "SQL is slow; NoSQL is always free",
                    "SQL only works on Windows; NoSQL on Linux",
                    "SQL does not support tables"
                ],
                "answer": "SQL is relational with schemas; NoSQL is non-relational and schema-flexible",
                "explanation": "SQL enforces strict relational schemas and ACID; NoSQL provides flexible, horizontal document/key-value storage."
            },
            {
                "id": "easy_tech_sys_8",
                "subject": "System Design",
                "question": "What is Database Replication?",
                "options": [
                    "Copying data across multiple database servers for redundancy and read scaling",
                    "Deleting duplicate records",
                    "Compressing tables into zip archives",
                    "Normalizing schema into 3NF"
                ],
                "answer": "Copying data across multiple database servers for redundancy and read scaling",
                "explanation": "Replication maintains synchronized copies across master and replica nodes."
            },
            {
                "id": "easy_tech_sys_9",
                "subject": "System Design",
                "question": "What architectural pattern separates an application into small, independent, deployable services?",
                "options": [
                    "Microservices Architecture",
                    "Monolithic Architecture",
                    "Batch Pipeline Architecture",
                    "Client-Server Architecture"
                ],
                "answer": "Microservices Architecture",
                "explanation": "Microservices divide software into decoupled services organized around business domains."
            }
        ],
        "verbal": [
            {
                "id": "easy_v0",
                "question": "Select the synonym of 'BRIEF':",
                "options": [
                    "Short",
                    "Lengthy",
                    "Elaborate",
                    "Complex"
                ],
                "answer": "Short",
                "explanation": "'Brief' means lasting for a short time or using few words."
            },
            {
                "id": "easy_v1",
                "question": "Select the antonym of 'CREATE':",
                "options": [
                    "Destroy",
                    "Build",
                    "Produce",
                    "Form"
                ],
                "answer": "Destroy",
                "explanation": "'Destroy' is the opposite of bringing something into existence."
            },
            {
                "id": "easy_v2",
                "question": "Fill in the blank: She _______ to the office every morning.",
                "options": [
                    "walks",
                    "walk",
                    "walking",
                    "walked"
                ],
                "answer": "walks",
                "explanation": "Third-person singular 'She' takes 'walks' in simple present tense."
            },
            {
                "id": "easy_v3",
                "question": "Identify the correctly spelled word:",
                "options": [
                    "Accomplish",
                    "Acomplish",
                    "Accomplesh",
                    "Acomplesh"
                ],
                "answer": "Accomplish",
                "explanation": "'Accomplish' is spelled with double 'c' and double 's'."
            },
            {
                "id": "easy_v4",
                "question": "Select the synonym of 'ACCURATE':",
                "options": [
                    "Correct",
                    "Rough",
                    "Biased",
                    "Vague"
                ],
                "answer": "Correct",
                "explanation": "'Accurate' means correct in all details."
            },
            {
                "id": "easy_v5",
                "question": "Select the antonym of 'GENEROUS':",
                "options": [
                    "Selfish",
                    "Kind",
                    "Helpful",
                    "Giving"
                ],
                "answer": "Selfish",
                "explanation": "'Selfish' means lacking consideration for others, opposite of generous."
            },
            {
                "id": "easy_v6",
                "question": "Complete the analogy: Book is to Reading as Fork is to _______:",
                "options": [
                    "Eating",
                    "Writing",
                    "Painting",
                    "Singing"
                ],
                "answer": "Eating",
                "explanation": "A book is an instrument for reading; a fork is an instrument for eating."
            },
            {
                "id": "easy_v7",
                "question": "Select the word that means 'one who looks on the bright side of things':",
                "options": [
                    "Optimist",
                    "Pessimist",
                    "Cynic",
                    "Skeptic"
                ],
                "answer": "Optimist",
                "explanation": "An optimist is a person disposed to take a favorable view of events."
            },
            {
                "id": "easy_v8",
                "question": "Fill in the blank: Neither of the answers _______ correct.",
                "options": [
                    "is",
                    "are",
                    "were",
                    "have"
                ],
                "answer": "is",
                "explanation": "'Neither' takes a singular verb ('is')."
            },
            {
                "id": "easy_v9",
                "question": "Choose the correctly punctuated sentence:",
                "options": [
                    "Let's eat, grandma!",
                    "Lets eat grandma!",
                    "Let's eat grandma.",
                    "Lets, eat grandma."
                ],
                "answer": "Let's eat, grandma!",
                "explanation": "The comma of direct address prevents confusing the sentence with cannibalism."
            },
            {
                "id": "easy_v10",
                "question": "Select the synonym of 'RAPID':",
                "options": [
                    "Fast",
                    "Sluggish",
                    "Gradual",
                    "Steady"
                ],
                "answer": "Fast",
                "explanation": "'Rapid' signifies happening or moving with great speed."
            },
            {
                "id": "easy_v11",
                "question": "Select the antonym of 'ANCIENT':",
                "options": [
                    "Modern",
                    "Old",
                    "Historic",
                    "Prehistoric"
                ],
                "answer": "Modern",
                "explanation": "'Modern' denotes present or recent times, opposite to ancient."
            },
            {
                "id": "easy_v12",
                "question": "Fill in the blank: He is interested _______ learning artificial intelligence.",
                "options": [
                    "in",
                    "on",
                    "at",
                    "for"
                ],
                "answer": "in",
                "explanation": "The preposition 'in' correctly pairs with the adjective 'interested'."
            },
            {
                "id": "easy_v13",
                "question": "What is the plural form of 'Child'?",
                "options": [
                    "Children",
                    "Childs",
                    "Childrens",
                    "Childes"
                ],
                "answer": "Children",
                "explanation": "'Children' is the irregular plural form of 'child'."
            },
            {
                "id": "easy_v14",
                "question": "Select the word that is spelled correctly:",
                "options": [
                    "Receive",
                    "Recieve",
                    "Receve",
                    "Receeve"
                ],
                "answer": "Receive",
                "explanation": "Follows the 'i before e except after c' rule: 'Receive'."
            }
        ],
        "aptitude": [
            {
                "id": "easy_a0",
                "question": "What is 15% of 200?",
                "options": [
                    "30",
                    "25",
                    "35",
                    "20"
                ],
                "answer": "30",
                "explanation": "(15 / 100) * 200 = 30."
            },
            {
                "id": "easy_a1",
                "question": "If a car travels at 60 km/h, how far will it travel in 3.5 hours?",
                "options": [
                    "210 km",
                    "180 km",
                    "240 km",
                    "200 km"
                ],
                "answer": "210 km",
                "explanation": "Distance = Speed * Time = 60 * 3.5 = 210 km."
            },
            {
                "id": "easy_a2",
                "question": "What is the average of 10, 20, 30, 40, and 50?",
                "options": [
                    "30",
                    "25",
                    "35",
                    "40"
                ],
                "answer": "30",
                "explanation": "(10 + 20 + 30 + 40 + 50) / 5 = 150 / 5 = 30."
            },
            {
                "id": "easy_a3",
                "question": "A shirt originally priced at $50 is sold at a 20% discount. What is the selling price?",
                "options": [
                    "$40",
                    "$45",
                    "$35",
                    "$38"
                ],
                "answer": "$40",
                "explanation": "Discount = 20% of 50 = $10. Selling price = 50 - 10 = $40."
            },
            {
                "id": "easy_a4",
                "question": "Find the missing number in the sequence: 2, 4, 8, 16, ___",
                "options": [
                    "32",
                    "24",
                    "64",
                    "28"
                ],
                "answer": "32",
                "explanation": "Each number is multiplied by 2: 16 * 2 = 32."
            },
            {
                "id": "easy_a5",
                "question": "If 5 workers can build a wall in 10 days, how many days will 10 workers take at the same rate?",
                "options": [
                    "5 days",
                    "10 days",
                    "15 days",
                    "2 days"
                ],
                "answer": "5 days",
                "explanation": "Man-days = 5 * 10 = 50. With 10 workers: 50 / 10 = 5 days."
            },
            {
                "id": "easy_a6",
                "question": "What is the ratio of 50 minutes to 2 hours?",
                "options": [
                    "5:12",
                    "5:20",
                    "2:5",
                    "1:4"
                ],
                "answer": "5:12",
                "explanation": "2 hours = 120 minutes. Ratio = 50:120 = 5:12."
            },
            {
                "id": "easy_a7",
                "question": "What is the perimeter of a rectangle with length 8 cm and width 5 cm?",
                "options": [
                    "26 cm",
                    "40 cm",
                    "13 cm",
                    "20 cm"
                ],
                "answer": "26 cm",
                "explanation": "Perimeter = 2 * (length + width) = 2 * (8 + 5) = 26 cm."
            },
            {
                "id": "easy_a8",
                "question": "If x + 7 = 19, what is the value of x?",
                "options": [
                    "12",
                    "11",
                    "13",
                    "14"
                ],
                "answer": "12",
                "explanation": "x = 19 - 7 = 12."
            },
            {
                "id": "easy_a9",
                "question": "A train 100 meters long passes a pole in 5 seconds. What is its speed?",
                "options": [
                    "20 m/s",
                    "25 m/s",
                    "15 m/s",
                    "10 m/s"
                ],
                "answer": "20 m/s",
                "explanation": "Speed = Distance / Time = 100 / 5 = 20 m/s."
            },
            {
                "id": "easy_a10",
                "question": "What is the square root of 144?",
                "options": [
                    "12",
                    "14",
                    "11",
                    "13"
                ],
                "answer": "12",
                "explanation": "12 * 12 = 144."
            },
            {
                "id": "easy_a11",
                "question": "If a coin is tossed once, what is the probability of getting Heads?",
                "options": [
                    "1/2",
                    "1/4",
                    "1/3",
                    "1"
                ],
                "answer": "1/2",
                "explanation": "There are 2 equally likely outcomes (Heads, Tails), so P(Heads) = 1/2."
            },
            {
                "id": "easy_a12",
                "question": "The sum of angles in a triangle is always equal to:",
                "options": [
                    "180\u00b0",
                    "360\u00b0",
                    "90\u00b0",
                    "270\u00b0"
                ],
                "answer": "180\u00b0",
                "explanation": "The interior angles of any planar Euclidean triangle sum to 180 degrees."
            },
            {
                "id": "easy_a13",
                "question": "A shopkeeper buys an item for $80 and sells it for $100. What is the profit percentage?",
                "options": [
                    "25%",
                    "20%",
                    "30%",
                    "15%"
                ],
                "answer": "25%",
                "explanation": "Profit = 100 - 80 = 20. Profit % = (20 / 80) * 100 = 25%."
            },
            {
                "id": "easy_a14",
                "question": "What is the smallest prime number?",
                "options": [
                    "2",
                    "1",
                    "3",
                    "0"
                ],
                "answer": "2",
                "explanation": "2 is the smallest and only even prime number."
            }
        ],
        "coding": [
            {
                "id": "code_easy_1",
                "number": 1,
                "difficulty": "Easy",
                "title": "1. Two Sum",
                "tags": [
                    "Array",
                    "Hash Table"
                ],
                "companies": [
                    "Amazon",
                    "Google",
                    "Meta"
                ],
                "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.",
                "examples": [
                    {
                        "input": "nums = [2,7,11,15], target = 9",
                        "output": "[0, 1]",
                        "explanation": "nums[0] + nums[1] == 9."
                    },
                    {
                        "input": "nums = [3,2,4], target = 6",
                        "output": "[1, 2]"
                    }
                ],
                "constraints": [
                    "2 <= nums.length <= 10^4",
                    "-10^9 <= nums[i] <= 10^9"
                ],
                "testcases": [
                    {
                        "input": "[2,7,11,15]\n9",
                        "expected": "[0, 1]",
                        "label": "Case 1"
                    },
                    {
                        "input": "[3,2,4]\n6",
                        "expected": "[1, 2]",
                        "label": "Case 2"
                    }
                ],
                "templates": {
                    "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your code here\n        pass\n",
                    "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        return {};\n    }\n};\n",
                    "java": "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
                    "javascript": "var twoSum = function(nums, target) {\n    // Write your code here\n    return [];\n};\n"
                }
            },
            {
                "id": "code_easy_2",
                "number": 2,
                "difficulty": "Easy",
                "title": "242. Valid Anagram",
                "tags": [
                    "String",
                    "Hash Table",
                    "Sorting"
                ],
                "companies": [
                    "Amazon",
                    "Bloomberg",
                    "Google"
                ],
                "description": "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all original letters exactly once.",
                "examples": [
                    {
                        "input": "s = \"anagram\", t = \"nagaram\"",
                        "output": "true",
                        "explanation": "Both contain the same character frequencies."
                    },
                    {
                        "input": "s = \"rat\", t = \"car\"",
                        "output": "false"
                    }
                ],
                "constraints": [
                    "1 <= s.length, t.length <= 5 * 10^4",
                    "s and t consist of lowercase English letters."
                ],
                "testcases": [
                    {
                        "input": "anagram\nnagaram",
                        "expected": "true",
                        "label": "Case 1"
                    },
                    {
                        "input": "rat\ncar",
                        "expected": "false",
                        "label": "Case 2"
                    }
                ],
                "templates": {
                    "python": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write your code here\n        pass\n",
                    "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write your code here\n        return false;\n    }\n};\n",
                    "java": "import java.util.*;\n\nclass Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your code here\n        return false;\n    }\n}\n",
                    "javascript": "var isAnagram = function(s, t) {\n    // Write your code here\n    return false;\n};\n"
                }
            }
        ]
    },
    "medium": {
        "technical": [
            {
                "id": "tech_dsa_0",
                "subject": "DSA",
                "question": "What is the worst-case time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
                "options": [
                    "O(1)",
                    "O(log n)",
                    "O(n)",
                    "O(n log n)"
                ],
                "answer": "O(log n)",
                "explanation": "In a balanced BST, the height of the tree is log n. Searching requires traversing from root to leaf, taking at most O(log n) steps."
            },
            {
                "id": "tech_dsa_1",
                "subject": "DSA",
                "question": "Which data structure is typically used to implement Breadth-First Search (BFS) on a graph?",
                "options": [
                    "Stack",
                    "Queue",
                    "Priority Queue",
                    "Deque"
                ],
                "answer": "Queue",
                "explanation": "BFS explores nodes level by level, requiring a First-In-First-Out (FIFO) ordering which is naturally supported by a Queue."
            },
            {
                "id": "tech_dsa_2",
                "subject": "DSA",
                "question": "What is the worst-case time complexity of the standard Quick Sort algorithm?",
                "options": [
                    "O(log n)",
                    "O(n)",
                    "O(n log n)",
                    "O(n^2)"
                ],
                "answer": "O(n^2)",
                "explanation": "The worst case occurs when the pivot consistently divides the array into empty and n-1 element sub-arrays (e.g., sorted array with first element as pivot), yielding O(n^2)."
            },
            {
                "id": "tech_dsa_3",
                "subject": "DSA",
                "question": "Which of the following data structures is used by the compiler to manage function calls and local variables?",
                "options": [
                    "Queue",
                    "Stack",
                    "Heap",
                    "Linked List"
                ],
                "answer": "Stack",
                "explanation": "The call stack utilizes a Last-In-First-Out (LIFO) model to store activation records (local variables, return addresses) of active subroutines."
            },
            {
                "id": "tech_dsa_4",
                "subject": "DSA",
                "question": "What is the optimal average-case time complexity to check if an element exists in a Hash Table?",
                "options": [
                    "O(1)",
                    "O(log n)",
                    "O(n)",
                    "O(n log n)"
                ],
                "answer": "O(1)",
                "explanation": "A well-designed hash table with a good hash function distributes keys uniformly, giving O(1) average lookup time."
            },
            {
                "id": "tech_dsa_5",
                "subject": "DSA",
                "question": "Which of the following sorting algorithms is NOT stable in its standard implementation?",
                "options": [
                    "Merge Sort",
                    "Bubble Sort",
                    "Insertion Sort",
                    "Heap Sort"
                ],
                "answer": "Heap Sort",
                "explanation": "Heap Sort processes elements using a binary heap tree structure where the relative order of identical elements is not preserved, making it unstable."
            },
            {
                "id": "tech_dsa_6",
                "subject": "DSA",
                "question": "What is the worst-case space complexity of storing a graph with V vertices and E edges using an Adjacency Matrix?",
                "options": [
                    "O(V)",
                    "O(V + E)",
                    "O(V^2)",
                    "O(V * E)"
                ],
                "answer": "O(V^2)",
                "explanation": "An adjacency matrix is a 2D array of size V x V, requiring O(V^2) memory space regardless of the number of edges."
            },
            {
                "id": "tech_dsa_7",
                "subject": "DSA",
                "question": "Which tree traversal technique visits nodes in non-decreasing sorted order when applied to a Binary Search Tree (BST)?",
                "options": [
                    "Preorder",
                    "Inorder",
                    "Postorder",
                    "Level-order"
                ],
                "answer": "Inorder",
                "explanation": "Inorder traversal (Left, Root, Right) processes the left subtree, then root, then right subtree, which visits BST nodes in ascending sorted order."
            },
            {
                "id": "tech_dsa_8",
                "subject": "DSA",
                "question": "What is the time complexity of merging two sorted arrays of size M and N into a single sorted array?",
                "options": [
                    "O(log(M+N))",
                    "O(M log N)",
                    "O(M + N)",
                    "O(M * N)"
                ],
                "answer": "O(M + N)",
                "explanation": "Merging requires iterating through both arrays once using two pointers, taking linear time proportional to the total number of elements: O(M + N)."
            },
            {
                "id": "tech_dsa_9",
                "subject": "DSA",
                "question": "Which algorithm is most appropriate for finding the single-source shortest paths in a weighted graph with negative edge weights but no negative cycles?",
                "options": [
                    "Dijkstra's Algorithm",
                    "Bellman-Ford Algorithm",
                    "Kruskal's Algorithm",
                    "Prim's Algorithm"
                ],
                "answer": "Bellman-Ford Algorithm",
                "explanation": "Dijkstra's algorithm fails with negative weights because it relies on greedy accumulation. Bellman-Ford correctly handles negative weights by relaxing all edges V-1 times."
            },
            {
                "id": "tech_oops_0",
                "subject": "OOPs",
                "question": "Which object-oriented programming concept allows a subclass to provide a specific implementation of a method already defined in its superclass?",
                "options": [
                    "Method Overloading",
                    "Method Overriding",
                    "Method Abstraction",
                    "Encapsulation"
                ],
                "answer": "Method Overriding",
                "explanation": "Method Overriding allows a subclass to define a method with the same signature as one in the parent class to achieve runtime polymorphism."
            },
            {
                "id": "tech_oops_1",
                "subject": "OOPs",
                "question": "What is defining multiple methods in the same class with the same name but different parameter lists called?",
                "options": [
                    "Method Overriding",
                    "Method Overloading",
                    "Inheritance",
                    "Dynamic Binding"
                ],
                "answer": "Method Overloading",
                "explanation": "Method Overloading is compile-time polymorphism where methods share a name but differ in parameter count, type, or order."
            },
            {
                "id": "tech_oops_2",
                "subject": "OOPs",
                "question": "Which OOP pillar is concerned with hiding internal implementation details and exposing only safe, essential interfaces?",
                "options": [
                    "Inheritance",
                    "Polymorphism",
                    "Abstraction",
                    "Instantiation"
                ],
                "answer": "Abstraction",
                "explanation": "Abstraction simplifies complex systems by hiding internal details from the user and exposing only relevant inputs/outputs."
            },
            {
                "id": "tech_oops_3",
                "subject": "OOPs",
                "question": "What does encapsulation accomplish in system design?",
                "options": [
                    "Allows classes to inherit methods",
                    "Binds data and methods together and restricts direct access",
                    "Enables a method to accept different parameter types",
                    "Speeds up compile-time execution"
                ],
                "answer": "Binds data and methods together and restricts direct access",
                "explanation": "Encapsulation wraps class data (attributes) and methods together, exposing them only via public getters/setters to protect state integrity."
            },
            {
                "id": "tech_oops_4",
                "subject": "OOPs",
                "question": "Which of the following statements about abstract classes and interfaces in Java is TRUE?",
                "options": [
                    "A class can inherit multiple abstract classes.",
                    "Interfaces cannot contain default method implementations.",
                    "An abstract class can contain instance variables, whereas interfaces cannot.",
                    "Abstract classes cannot have constructors."
                ],
                "answer": "An abstract class can contain instance variables, whereas interfaces cannot.",
                "explanation": "Abstract classes represent real state and can have instance fields. Interfaces are contracts and can only have static final constants (no instance state)."
            },
            {
                "id": "tech_oops_5",
                "subject": "OOPs",
                "question": "Which of the following types of inheritance is NOT supported natively by Java through classes?",
                "options": [
                    "Single Inheritance",
                    "Multilevel Inheritance",
                    "Hierarchical Inheritance",
                    "Multiple Inheritance"
                ],
                "answer": "Multiple Inheritance",
                "explanation": "Java does not support multiple inheritance of classes to prevent the Diamond Problem (ambiguity in inheriting duplicate methods). It must be achieved via Interfaces."
            },
            {
                "id": "tech_oops_6",
                "subject": "OOPs",
                "question": "What is the primary role of a constructor in object-oriented programming?",
                "options": [
                    "To destroy an object when it goes out of scope",
                    "To allocate memory for the object's code",
                    "To initialize the instance variables of a newly created object",
                    "To prevent a class from being subclassed"
                ],
                "answer": "To initialize the instance variables of a newly created object",
                "explanation": "Constructors run automatically when an object is instantiated (using 'new') to initialize its member variables and set up initial state."
            },
            {
                "id": "tech_oops_7",
                "subject": "OOPs",
                "question": "What is runtime (dynamic) polymorphism achieved by?",
                "options": [
                    "Virtual functions / method overriding",
                    "Overloaded functions",
                    "Static templates",
                    "Private attributes"
                ],
                "answer": "Virtual functions / method overriding",
                "explanation": "Runtime polymorphism is resolved at execution time based on the actual object type, achieved using virtual methods (overriding) and base pointers."
            },
            {
                "id": "tech_oops_8",
                "subject": "OOPs",
                "question": "What does the 'super' keyword (or parent reference) do in Java/Python subclasses?",
                "options": [
                    "Calls the garbage collector",
                    "Refers to the parent class object or constructor",
                    "Instantiates a new thread",
                    "Prevents class modification"
                ],
                "answer": "Refers to the parent class object or constructor",
                "explanation": "The 'super' keyword allows a subclass to invoke constructors, methods, and attributes of its parent class."
            },
            {
                "id": "tech_oops_9",
                "subject": "OOPs",
                "question": "What is a class that cannot be instantiated and is designed solely to be subclassed called?",
                "options": [
                    "Final Class",
                    "Static Class",
                    "Abstract Class",
                    "Concrete Class"
                ],
                "answer": "Abstract Class",
                "explanation": "Abstract classes cannot be direct instances. They act as blueprints that other concrete classes must inherit from and complete."
            },
            {
                "id": "tech_os_0",
                "subject": "OS",
                "question": "What is a process that has completed execution but still has an entry in the Operating System's process table called?",
                "options": [
                    "Orphan Process",
                    "Zombie Process",
                    "Daemon Process",
                    "Interrupt Handler"
                ],
                "answer": "Zombie Process",
                "explanation": "A zombie process is one that has finished execution but whose parent has not yet read its exit status via wait(), keeping its entry in the process table."
            },
            {
                "id": "tech_os_1",
                "subject": "OS",
                "question": "Which of the following CPU scheduling algorithms is non-preemptive in its basic implementation?",
                "options": [
                    "Round Robin",
                    "First-Come First-Served (FCFS)",
                    "Shortest Remaining Time First (SRTF)",
                    "Priority Preemptive"
                ],
                "answer": "First-Come First-Served (FCFS)",
                "explanation": "FCFS schedules processes in the order they arrive. Once a process starts running, it doesn't yield CPU control until it finishes or blocks, making it non-preemptive."
            },
            {
                "id": "tech_os_2",
                "subject": "OS",
                "question": "Which of the following is NOT one of the four necessary conditions for a deadlock to occur?",
                "options": [
                    "Mutual Exclusion",
                    "Hold and Wait",
                    "No Preemption",
                    "Resource Preemption"
                ],
                "answer": "Resource Preemption",
                "explanation": "Deadlock requires No Preemption (resources cannot be forcibly taken). Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait are Coffman's conditions."
            },
            {
                "id": "tech_os_3",
                "subject": "OS",
                "question": "What memory management scheme solves external fragmentation by dividing physical memory into fixed-size blocks?",
                "options": [
                    "Segmentation",
                    "Paging",
                    "Dynamic Partitioning",
                    "Swapping"
                ],
                "answer": "Paging",
                "explanation": "Paging maps fixed-size pages to fixed-size physical frames, completely eliminating external fragmentation (though internal fragmentation can still exist in the last page)."
            },
            {
                "id": "tech_os_4",
                "subject": "OS",
                "question": "What is the primary function of the Translation Lookaside Buffer (TLB) in OS memory management?",
                "options": [
                    "To cache disk writes",
                    "To speed up translation of virtual addresses to physical addresses",
                    "To resolve network IP addresses",
                    "To store CPU thread states"
                ],
                "answer": "To speed up translation of virtual addresses to physical addresses",
                "explanation": "TLB is a fast hardware cache that stores recent page-to-frame translations, bypassing slow main memory page table lookups."
            },
            {
                "id": "tech_os_5",
                "subject": "OS",
                "question": "Which system call is used in Unix-like operating systems to create a duplicate clone child process?",
                "options": [
                    "exec()",
                    "forkv()",
                    "fork()",
                    "spawn()"
                ],
                "answer": "fork()",
                "explanation": "The fork() system call duplicates the parent process, creating a child process with a separate address space but identical contents."
            },
            {
                "id": "tech_os_6",
                "subject": "OS",
                "question": "What is the condition called when an operating system spends more time swapping pages in and out of disk than executing useful instructions?",
                "options": [
                    "Starvation",
                    "Thrashing",
                    "Deadlock",
                    "Context Switching"
                ],
                "answer": "Thrashing",
                "explanation": "Thrashing occurs when active processes lack sufficient resident page frames in RAM, causing continuous page faults and disk access, dropping CPU utility to near zero."
            },
            {
                "id": "tech_os_7",
                "subject": "OS",
                "question": "What is context switching in an operating system?",
                "options": [
                    "Converting source code to bytecode",
                    "Saving the state of a running process and loading the state of another",
                    "Allocating bandwidth to network cards",
                    "Compacting memory fragments on disk"
                ],
                "answer": "Saving the state of a running process and loading the state of another",
                "explanation": "Context switching is saving registers/PC of a running process into its PCB and restoring another process's state to let the CPU run it."
            },
            {
                "id": "tech_os_8",
                "subject": "OS",
                "question": "Which synchronization primitive is a simple integer variable accessed via atomic wait() and signal() operations?",
                "options": [
                    "Mutex",
                    "Condition Variable",
                    "Semaphore",
                    "Spinlock"
                ],
                "answer": "Semaphore",
                "explanation": "Semaphores use an integer value to control access to shared resources. wait() decrements it, signal() increments it, both executing atomically."
            },
            {
                "id": "tech_os_9",
                "subject": "OS",
                "question": "What does a page fault represent?",
                "options": [
                    "An error in compiled program memory allocation",
                    "A request for a page that is not currently loaded in physical RAM",
                    "A disk sector hardware crash",
                    "A failure in network socket binding"
                ],
                "answer": "A request for a page that is not currently loaded in physical RAM",
                "explanation": "When a process accesses a page marked invalid in the page table, the MMU triggers a page fault interrupt, forcing the OS to fetch the page from swap space into RAM."
            },
            {
                "id": "tech_dbms_0",
                "subject": "DBMS",
                "question": "What do the ACID properties of a database transaction ensure?",
                "options": [
                    "Fast query indexing",
                    "Data integrity, consistency, and reliability",
                    "Network security encryption",
                    "Automated SQL database backups"
                ],
                "answer": "Data integrity, consistency, and reliability",
                "explanation": "ACID properties (Atomicity, Consistency, Isolation, Durability) ensure that database transactions are processed reliably and maintain integrity."
            },
            {
                "id": "tech_dbms_1",
                "subject": "DBMS",
                "question": "Which database normal form (NF) is violated if a relation contains transitive functional dependencies?",
                "options": [
                    "1NF",
                    "2NF",
                    "3NF",
                    "BCNF"
                ],
                "answer": "3NF",
                "explanation": "3NF requires that all non-prime attributes are mutually independent. If A determines B and B determines C, a transitive dependency A -> C exists, violating 3NF."
            },
            {
                "id": "tech_dbms_2",
                "subject": "DBMS",
                "question": "What is a primary key that consists of more than one column in a database table called?",
                "options": [
                    "Candidate Key",
                    "Foreign Key",
                    "Composite Key",
                    "Surrogate Key"
                ],
                "answer": "Composite Key",
                "explanation": "A composite key is a primary key comprising two or more columns to uniquely identify table rows (e.g. order_id and item_id)."
            },
            {
                "id": "tech_dbms_3",
                "subject": "DBMS",
                "question": "Which SQL clause is used to filter rows AFTER aggregate operations have been applied using GROUP BY?",
                "options": [
                    "WHERE",
                    "HAVING",
                    "LIMIT",
                    "FILTER"
                ],
                "answer": "HAVING",
                "explanation": "WHERE filters rows before grouping occurs. HAVING filters aggregated data groups (e.g. HAVING COUNT(*) > 5) after GROUP BY is processed."
            },
            {
                "id": "tech_dbms_4",
                "subject": "DBMS",
                "question": "Which index structure is widely used in relational databases to facilitate fast range search queries?",
                "options": [
                    "Hash Table Index",
                    "B+ Tree Index",
                    "Binary Search Index",
                    "Trie Index"
                ],
                "answer": "B+ Tree Index",
                "explanation": "B+ Trees store sorted keys with leaf nodes linked sequentially, enabling both O(log n) lookups and efficient sequential range scans."
            },
            {
                "id": "tech_dbms_5",
                "subject": "DBMS",
                "question": "What type of JOIN returns all records from the left table and the matched records from the right table?",
                "options": [
                    "Inner Join",
                    "Full Outer Join",
                    "Left Outer Join",
                    "Right Outer Join"
                ],
                "answer": "Left Outer Join",
                "explanation": "Left Outer Join returns all rows from the left table; matching cells are populated from the right table, or NULL if no match exists."
            },
            {
                "id": "tech_dbms_6",
                "subject": "DBMS",
                "question": "What does a foreign key constraint maintain in relational database design?",
                "options": [
                    "Entity Integrity",
                    "Referential Integrity",
                    "Domain Integrity",
                    "Transaction Durability"
                ],
                "answer": "Referential Integrity",
                "explanation": "Foreign keys ensure referential integrity by validating that values in child columns exist in the referenced parent columns."
            },
            {
                "id": "tech_dbms_7",
                "subject": "DBMS",
                "question": "Which SQL statement is used to remove all records from a table without logging individual row deletions, making it faster than DELETE?",
                "options": [
                    "DROP TABLE",
                    "REMOVE TABLE",
                    "TRUNCATE TABLE",
                    "CLEAR TABLE"
                ],
                "answer": "TRUNCATE TABLE",
                "explanation": "TRUNCATE is a DDL command that deallocates data pages of the table, bypassing row-by-row transaction logging, which makes it fast."
            },
            {
                "id": "tech_dbms_8",
                "subject": "DBMS",
                "question": "What is the default transaction isolation level in MySQL InnoDB storage engine?",
                "options": [
                    "Read Uncommitted",
                    "Read Committed",
                    "Repeatable Read",
                    "Serializable"
                ],
                "answer": "Repeatable Read",
                "explanation": "Repeatable Read is InnoDB's default. It uses locks and MVCC to ensure reads within a transaction see the same snapshot, preventing non-repeatable reads."
            },
            {
                "id": "tech_dbms_9",
                "subject": "DBMS",
                "question": "What is the purpose of database normalization?",
                "options": [
                    "To increase query complexity",
                    "To minimize data redundancy and dependency anomalies",
                    "To encrypt credit card numbers",
                    "To compress historical files"
                ],
                "answer": "To minimize data redundancy and dependency anomalies",
                "explanation": "Normalization organizes tables to reduce redundant data and prevent insert, update, and delete inconsistencies (anomalies)."
            },
            {
                "id": "tech_cn_0",
                "subject": "CN",
                "question": "Which layer of the OSI model is responsible for packet routing, logical addressing, and path determination?",
                "options": [
                    "Data Link Layer",
                    "Network Layer",
                    "Transport Layer",
                    "Application Layer"
                ],
                "answer": "Network Layer",
                "explanation": "The Network Layer handles packet routing across networks, logical IP addressing, and intermediate path configuration."
            },
            {
                "id": "tech_cn_1",
                "subject": "CN",
                "question": "What is the exact size of an IPv6 network address?",
                "options": [
                    "32 bits",
                    "64 bits",
                    "128 bits",
                    "256 bits"
                ],
                "answer": "128 bits",
                "explanation": "IPv6 addresses are 128-bit hexadecimal numbers, written as eight groups of four digits separated by colons (e.g. 2001:db8::1)."
            },
            {
                "id": "tech_cn_2",
                "subject": "CN",
                "question": "Which protocol translates a logical IP address into a physical MAC hardware address?",
                "options": [
                    "DNS",
                    "DHCP",
                    "ARP (Address Resolution Protocol)",
                    "NAT"
                ],
                "answer": "ARP (Address Resolution Protocol)",
                "explanation": "ARP is a broadcast protocol that resolves local IP addresses into physical MAC ethernet frames on a local subnet."
            },
            {
                "id": "tech_cn_3",
                "subject": "CN",
                "question": "What is the standard TCP port number reserved for secure HTTPS traffic?",
                "options": [
                    "80",
                    "443",
                    "8080",
                    "22"
                ],
                "answer": "443",
                "explanation": "HTTPS runs over SSL/TLS secured connections on TCP port 443 by default. Regular HTTP runs on port 80."
            },
            {
                "id": "tech_cn_4",
                "subject": "CN",
                "question": "Which network transport protocol is connectionless and does NOT guarantee packet delivery or order?",
                "options": [
                    "TCP",
                    "UDP (User Datagram Protocol)",
                    "SCTP",
                    "HTTP"
                ],
                "answer": "UDP (User Datagram Protocol)",
                "explanation": "UDP is a lightweight protocol that pushes datagrams without establishing handshakes or verifying acknowledgement, prioritizing speed over reliability."
            },
            {
                "id": "tech_cn_5",
                "subject": "CN",
                "question": "What is the main purpose of the Domain Name System (DNS)?",
                "options": [
                    "To distribute server IP addresses dynamically",
                    "To map human-readable domain names to numerical IP addresses",
                    "To encrypt password databases",
                    "To load balance web requests"
                ],
                "answer": "To map human-readable domain names to numerical IP addresses",
                "explanation": "DNS works as the phonebook of the internet, translating domain queries (e.g., google.com) into target server IP locations."
            },
            {
                "id": "tech_cn_6",
                "subject": "CN",
                "question": "Which network topology connects all client devices directly to a single central switch or hub?",
                "options": [
                    "Mesh Topology",
                    "Ring Topology",
                    "Bus Topology",
                    "Star Topology"
                ],
                "answer": "Star Topology",
                "explanation": "In a Star topology, all network nodes are connected individually to a central switch. If one cable fails, only that device is disconnected."
            },
            {
                "id": "tech_cn_7",
                "subject": "CN",
                "question": "What is the primary function of a subnet mask in IPv4 configurations?",
                "options": [
                    "To identify network ID versus host ID sections of the IP address",
                    "To route packets across the WAN",
                    "To assign DNS names to host computers",
                    "To encrypt private key files"
                ],
                "answer": "To identify network ID versus host ID sections of the IP address",
                "explanation": "Subnet masks (e.g. 255.255.255.0) use bitwise AND masking to separate network subnet addresses from host identifiers."
            },
            {
                "id": "tech_cn_8",
                "subject": "CN",
                "question": "Which network protocol is used by routers to dynamically allocate IP addresses to new clients?",
                "options": [
                    "SNMP",
                    "SMTP",
                    "DHCP (Dynamic Host Configuration Protocol)",
                    "ICMP"
                ],
                "answer": "DHCP (Dynamic Host Configuration Protocol)",
                "explanation": "DHCP servers dynamically assign IP addresses, gateway pathways, subnet masks, and DNS servers to local computers upon boot."
            },
            {
                "id": "tech_cn_9",
                "subject": "CN",
                "question": "What is the three-way handshake process used by TCP to establish a connection?",
                "options": [
                    "SYN -> SYN-ACK -> ACK",
                    "SYN -> ACK -> SYN-ACK",
                    "ACK -> SYN -> SYN-ACK",
                    "CONNECT -> OK -> CONNECT-ACK"
                ],
                "answer": "SYN -> SYN-ACK -> ACK",
                "explanation": "TCP connects by sending a synchronization flag (SYN), receiving synchronization-acknowledgement (SYN-ACK), and returning acknowledgement (ACK)."
            },
            {
                "id": "tech_sys_0",
                "subject": "System Design",
                "question": "What is adding more nodes or servers to a distributed application infrastructure cluster called?",
                "options": [
                    "Vertical Scaling (Scaling Up)",
                    "Horizontal Scaling (Scaling Out)",
                    "Data Partitioning",
                    "Latency Tuning"
                ],
                "answer": "Horizontal Scaling (Scaling Out)",
                "explanation": "Horizontal scaling distributes load by adding more commodity servers to the application pool, unlike vertical scaling which upgrades a single server."
            },
            {
                "id": "tech_sys_1",
                "subject": "System Design",
                "question": "Which system component acts as a reverse proxy to distribute traffic evenly across multiple server nodes?",
                "options": [
                    "CDN",
                    "Database Replica",
                    "Load Balancer",
                    "Message Queue"
                ],
                "answer": "Load Balancer",
                "explanation": "Load Balancers receive client traffic and route it to multiple server backends using algorithms like round robin or least connections."
            },
            {
                "id": "tech_sys_2",
                "subject": "System Design",
                "question": "What is the primary architectural purpose of a Content Delivery Network (CDN)?",
                "options": [
                    "To handle write-heavy database transactions",
                    "To store session states of active users",
                    "To cache static media resources geographically closer to endpoints",
                    "To run slow analytical batch calculations"
                ],
                "answer": "To cache static media resources geographically closer to endpoints",
                "explanation": "CDNs place edge caches (CDNs) around the world to serve images, JS, CSS, and videos closer to the user, reducing network latency."
            },
            {
                "id": "tech_sys_3",
                "subject": "System Design",
                "question": "According to the CAP Theorem, which of the three properties must a distributed system choose between in the event of a network partition?",
                "options": [
                    "Cost, Availability, Performance",
                    "Consistency, Availability, Partition Tolerance",
                    "Concurrency, Authority, Privacy",
                    "Caching, Archiving, Pipelining"
                ],
                "answer": "Consistency, Availability, Partition Tolerance",
                "explanation": "CAP states that in a network partition (P), a distributed database can guarantee Consistency (C) OR Availability (A), but not both simultaneously."
            },
            {
                "id": "tech_sys_4",
                "subject": "System Design",
                "question": "What is database partitioning (sharding) in system architecture?",
                "options": [
                    "Replicating database servers for backups",
                    "Splitting a single database dataset into smaller database clusters",
                    "Indexing column strings for fast text searching",
                    "Encrypting database schema tables"
                ],
                "answer": "Splitting a single database dataset into smaller database clusters",
                "explanation": "Sharding partitions data horizontally (e.g. by user_id range) across multiple physical database nodes to scale out write throughput."
            },
            {
                "id": "tech_sys_5",
                "subject": "System Design",
                "question": "What does a write-through caching strategy do?",
                "options": [
                    "Writes only to the cache and syncs to DB later asynchronously",
                    "Writes directly to the database, bypassing the cache entirely",
                    "Writes data to both the cache and the database synchronously",
                    "Invalidates all keys in cache when a write occurs"
                ],
                "answer": "Writes data to both the cache and the database synchronously",
                "explanation": "Write-through caching updates both the cache and underlying database simultaneously on write operations, ensuring strong data consistency."
            },
            {
                "id": "tech_sys_6",
                "subject": "System Design",
                "question": "Which technique is used to coordinate consistent hashing across a ring of cache nodes to minimize key reassignment when nodes join or leave?",
                "options": [
                    "Round Robin routing",
                    "Consistent Hashing",
                    "Sharded Indexing",
                    "Master-Slave replication"
                ],
                "answer": "Consistent Hashing",
                "explanation": "Consistent hashing maps both keys and server nodes to a circular numeric ring. Adding/removing nodes only reassigns a fraction of the keys (1/N)."
            },
            {
                "id": "tech_sys_7",
                "subject": "System Design",
                "question": "Which protocol is designed for real-time, bi-directional persistent connection communication between a client and server?",
                "options": [
                    "HTTP/1.1 polling",
                    "WebSockets",
                    "gRPC REST",
                    "Simple Mail Transfer Protocol"
                ],
                "answer": "WebSockets",
                "explanation": "WebSockets start with an HTTP upgrade handshake and maintain a long-running, bi-directional TCP socket connection for low-latency communication."
            },
            {
                "id": "tech_sys_8",
                "subject": "System Design",
                "question": "What role does a message broker (e.g. Kafka, RabbitMQ) play in microservices architectures?",
                "options": [
                    "It processes user authentication requests",
                    "It decouples services and allows asynchronous event processing",
                    "It acts as a primary transactional datastore",
                    "It translates database schemas to JSON"
                ],
                "answer": "It decouples services and allows asynchronous event processing",
                "explanation": "Message queues act as intermediate event logs, letting publishers push updates without waiting for consumers, achieving loose coupling."
            },
            {
                "id": "tech_sys_9",
                "subject": "System Design",
                "question": "What is horizontal sharding based on hash key mapping?",
                "options": [
                    "Splitting data based on hash values to distribute rows uniformly across nodes",
                    "Creating duplicate tables with index copies",
                    "Translating relational tables to non-relational key-value pairs",
                    "Restructuring foreign key tables"
                ],
                "answer": "Splitting data based on hash values to distribute rows uniformly across nodes",
                "explanation": "Hash sharding calculates a hash of the key (e.g., hash(user_id) % N) to determine the target shard, achieving uniform data distribution."
            }
        ],
        "verbal": [
            {
                "id": "verb_0",
                "question": "Choose the word most nearly opposite in meaning to 'EPHEMERAL'.",
                "options": [
                    "Transient",
                    "Permanent",
                    "Ethereal",
                    "Unstable"
                ],
                "answer": "Permanent",
                "explanation": "Ephemeral means short-lived or transient; permanent means lasting or enduring, which is the opposite."
            },
            {
                "id": "verb_1",
                "question": "Fill in the blank: The manager was _______ by the consultant's report, which highlighted several errors in the budget.",
                "options": [
                    "exonerated",
                    "perturbed",
                    "exalted",
                    "appeased"
                ],
                "answer": "perturbed",
                "explanation": "Perturbed means anxious or unsettled. Discovering budget errors would naturally perturb a manager."
            },
            {
                "id": "verb_2",
                "question": "Complete the analogy: METAPHOR : FIGURATIVE :: FACT : _______",
                "options": [
                    "Literal",
                    "Poetic",
                    "Deceptive",
                    "Imaginary"
                ],
                "answer": "Literal",
                "explanation": "A metaphor is a type of figurative language; a fact is a type of literal description."
            },
            {
                "id": "verb_3",
                "question": "Identify the synonym of the word 'PULCHRITUDE'.",
                "options": [
                    "Ugliness",
                    "Avarice",
                    "Beauty",
                    "Honesty"
                ],
                "answer": "Beauty",
                "explanation": "Pulchritude refers to physical beauty or comeliness."
            },
            {
                "id": "verb_4",
                "question": "Identify the grammatically correct sentence.",
                "options": [
                    "Neither of the options look suitable.",
                    "Neither of the options looks suitable.",
                    "Either of the options are suitable.",
                    "Neither options is suitable."
                ],
                "answer": "Neither of the options looks suitable.",
                "explanation": "'Neither' is a singular pronoun and takes the singular verb 'looks'."
            },
            {
                "id": "verb_5",
                "question": "Choose the word that best fits: Although she was generally soft-spoken, she could be surprisingly _______ in debate.",
                "options": [
                    "timid",
                    "assertive",
                    "reticent",
                    "conciliatory"
                ],
                "answer": "assertive",
                "explanation": "The word 'Although' indicates a contrast to being soft-spoken. 'Assertive' (confident, forceful) fits perfectly."
            },
            {
                "id": "verb_6",
                "question": "What does the idiom 'Bite the bullet' mean?",
                "options": [
                    "To act recklessly",
                    "To face a difficult situation with courage",
                    "To make a mistake",
                    "To start a conflict"
                ],
                "answer": "To face a difficult situation with courage",
                "explanation": "Biting the bullet means resolving to face a painful or difficult situation that cannot be avoided."
            },
            {
                "id": "verb_7",
                "question": "Find the word with the correct spelling.",
                "options": [
                    "Accomodation",
                    "Accommodation",
                    "Acommodation",
                    "Accomodatoin"
                ],
                "answer": "Accommodation",
                "explanation": "Accommodation is spelled with double 'c' and double 'm'."
            },
            {
                "id": "verb_8",
                "question": "Antonym of 'LUCID' is:",
                "options": [
                    "Clear",
                    "Obscure",
                    "Intelligent",
                    "Transparent"
                ],
                "answer": "Obscure",
                "explanation": "Lucid means clear and easy to understand; obscure means unclear or hard to perceive."
            },
            {
                "id": "verb_9",
                "question": "Which word means 'to make something bad better'?",
                "options": [
                    "Aggravate",
                    "Ameliorate",
                    "Deteriorate",
                    "Exacerbate"
                ],
                "answer": "Ameliorate",
                "explanation": "Ameliorate means to make something bad or unsatisfactory better."
            },
            {
                "id": "verb_10",
                "question": "Analogy: INSULATOR : HEAT :: SHIELD : _______",
                "options": [
                    "Weapon",
                    "Impact",
                    "Target",
                    "Conductor"
                ],
                "answer": "Impact",
                "explanation": "An insulator protects against heat; a shield protects against impact."
            },
            {
                "id": "verb_11",
                "question": "Antonym of 'CANDID' is:",
                "options": [
                    "Honest",
                    "Frank",
                    "Insincere",
                    "Truthful"
                ],
                "answer": "Insincere",
                "explanation": "Candid means truthful and straightforward; insincere is the opposite."
            },
            {
                "id": "verb_12",
                "question": "Choose the correct preposition: She is very proficient _______ playing the violin.",
                "options": [
                    "at",
                    "in",
                    "with",
                    "on"
                ],
                "answer": "at",
                "explanation": "One is proficient 'at' doing an activity, or proficient 'in' a field of study."
            },
            {
                "id": "verb_13",
                "question": "Synonym of 'REDUNDANT' is:",
                "options": [
                    "Essential",
                    "Superfluous",
                    "Scarse",
                    "Important"
                ],
                "answer": "Superfluous",
                "explanation": "Redundant means no longer needed or useful; superfluous is a direct synonym."
            },
            {
                "id": "verb_14",
                "question": "Synonym of 'METICULOUS' is:",
                "options": [
                    "Careless",
                    "Precise",
                    "Unorganized",
                    "Quick"
                ],
                "answer": "Precise",
                "explanation": "Meticulous means showing great attention to detail; very careful and precise."
            }
        ],
        "aptitude": [
            {
                "id": "apt_0",
                "question": "A can complete a project in 10 days, while B can complete it in 15 days. How many days will they take if they work together?",
                "options": [
                    "5 days",
                    "6 days",
                    "8 days",
                    "12 days"
                ],
                "answer": "6 days",
                "explanation": "Together, they do (1/10 + 1/15) = 5/30 = 1/6 of the job per day. Thus, they take 6 days total."
            },
            {
                "id": "apt_1",
                "question": "A train passes a pole in 15 seconds while traveling at a speed of 60 km/h. What is the length of the train in meters?",
                "options": [
                    "150 m",
                    "200 m",
                    "250 m",
                    "300 m"
                ],
                "answer": "250 m",
                "explanation": "Speed = 60 * (5/18) = 50/3 m/s. Length = Speed * Time = (50/3) * 15 = 250 meters."
            },
            {
                "id": "apt_2",
                "question": "If the price of a commodity increases by 20%, by what percentage must a consumer decrease their consumption so that expenditure remains constant?",
                "options": [
                    "16.67%",
                    "20%",
                    "25%",
                    "33.33%"
                ],
                "answer": "16.67%",
                "explanation": "Formula: (R / (100 + R)) * 100% = (20/120) * 100 = 16.67%."
            },
            {
                "id": "apt_3",
                "question": "A bag contains 5 red balls and 7 blue balls. If two balls are drawn at random without replacement, what is the probability that both are red?",
                "options": [
                    "5/33",
                    "5/22",
                    "7/22",
                    "5/12"
                ],
                "answer": "5/33",
                "explanation": "P(1st red) = 5/12. P(2nd red) = 4/11. Total Probability = (5/12) * (4/11) = 20/132 = 5/33."
            },
            {
                "id": "apt_4",
                "question": "A sum of money doubles itself in 8 years at simple interest. What is the annual rate of interest?",
                "options": [
                    "8%",
                    "10%",
                    "12.5%",
                    "15%"
                ],
                "answer": "12.5%",
                "explanation": "Simple Interest = Principal. So, P = P * R * 8 / 100 => 8R = 100 => R = 12.5%."
            },
            {
                "id": "apt_5",
                "question": "The average weight of 8 men increases by 2.5 kg when a man weighing 65 kg is replaced by a new man. What is the weight of the new man?",
                "options": [
                    "75 kg",
                    "80 kg",
                    "85 kg",
                    "90 kg"
                ],
                "answer": "85 kg",
                "explanation": "Total weight increase = 8 * 2.5 = 20 kg. Weight of new man = 65 + 20 = 85 kg."
            },
            {
                "id": "apt_6",
                "question": "A shopkeeper sells an article at a loss of 10%. If he had sold it for $30 more, he would have made a profit of 5%. What is the cost price of the article?",
                "options": [
                    "$150",
                    "$200",
                    "$250",
                    "$300"
                ],
                "answer": "$200",
                "explanation": "Difference in percentage = 5% - (-10%) = 15%. Thus, 15% of CP = $30 => CP = 30 / 0.15 = $200."
            },
            {
                "id": "apt_7",
                "question": "Two numbers are in the ratio of 3:4. If their HCF is 4, what is their LCM?",
                "options": [
                    "12",
                    "16",
                    "24",
                    "48"
                ],
                "answer": "48",
                "explanation": "The numbers are 3*4 = 12 and 4*4 = 16. LCM of 12 and 16 is 48."
            },
            {
                "id": "apt_8",
                "question": "A boat goes 8 km downstream in 40 minutes and returns upstream in 1 hour. What is the speed of the boat in still water?",
                "options": [
                    "8 km/h",
                    "10 km/h",
                    "12 km/h",
                    "14 km/h"
                ],
                "answer": "10 km/h",
                "explanation": "Downstream speed = 8 / (40/60) = 12 km/h. Upstream speed = 8 / 1 = 8 km/h. Speed in still water = (12 + 8) / 2 = 10 km/h."
            },
            {
                "id": "apt_9",
                "question": "If 12 men can build a wall in 20 days, how many days will 15 men take to build the same wall?",
                "options": [
                    "14 days",
                    "15 days",
                    "16 days",
                    "18 days"
                ],
                "answer": "16 days",
                "explanation": "Using M1 * D1 = M2 * D2: 12 * 20 = 15 * D2 => D2 = 240 / 15 = 16 days."
            },
            {
                "id": "apt_10",
                "question": "What is the next number in the series: 2, 6, 12, 20, 30, ___?",
                "options": [
                    "36",
                    "40",
                    "42",
                    "48"
                ],
                "answer": "42",
                "explanation": "The differences are +4, +6, +8, +10. The next difference is +12, so 30 + 12 = 42."
            },
            {
                "id": "apt_11",
                "question": "In a group of 60 students, 40% study Physics, 50% study Chemistry, and 10% study both. How many students study neither?",
                "options": [
                    "10",
                    "12",
                    "15",
                    "18"
                ],
                "answer": "12",
                "explanation": "Total studying either = 40% + 50% - 10% = 80%. Studying neither = 20% of 60 = 12 students."
            },
            {
                "id": "apt_12",
                "question": "What is the compound interest on $10,000 for 2 years at 10% per annum compounded annually?",
                "options": [
                    "$1,000",
                    "$2,000",
                    "$2,100",
                    "$2,200"
                ],
                "answer": "$2,100",
                "explanation": "Amount = 10000 * (1.1)^2 = 10000 * 1.21 = $12,100. Interest = 12100 - 10000 = $2,100."
            },
            {
                "id": "apt_13",
                "question": "If 3x + 5y = 21 and 2x - y = 1, find the value of x.",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "answer": "2",
                "explanation": "Multiply second eq by 5: 10x - 5y = 5. Add to first: 13x = 26 => x = 2."
            },
            {
                "id": "apt_14",
                "question": "A worker's salary is increased by 10% and then decreased by 10%. What is the net change in his salary?",
                "options": [
                    "0%",
                    "1% increase",
                    "1% decrease",
                    "2% decrease"
                ],
                "answer": "1% decrease",
                "explanation": "Formula: x + y + xy/100 = 10 - 10 - 100/100 = -1%. So, it is a 1% decrease."
            }
        ],
        "coding": [
            {
                "id": "code_med_1",
                "number": 1,
                "difficulty": "Medium",
                "title": "238. Product of Array Except Self",
                "tags": [
                    "Array",
                    "Prefix Sum"
                ],
                "companies": [
                    "Amazon",
                    "Apple",
                    "Google"
                ],
                "description": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a **32-bit** integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.",
                "examples": [
                    {
                        "input": "nums = [1,2,3,4]",
                        "output": "[24, 12, 8, 6]",
                        "explanation": "24 = 2*3*4, 12 = 1*3*4, 8 = 1*2*4, 6 = 1*2*3."
                    },
                    {
                        "input": "nums = [-1,1,0,-3,3]",
                        "output": "[0, 0, 9, 0, 0]"
                    }
                ],
                "constraints": [
                    "2 <= nums.length <= 10^5",
                    "-30 <= nums[i] <= 30"
                ],
                "testcases": [
                    {
                        "input": "[1,2,3,4]",
                        "expected": "[24, 12, 8, 6]",
                        "label": "Case 1"
                    },
                    {
                        "input": "[-1,1,0,-3,3]",
                        "expected": "[0, 0, 9, 0, 0]",
                        "label": "Case 2"
                    }
                ],
                "templates": {
                    "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
                    "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
                    "java": "import java.util.*;\n\nclass Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
                    "javascript": "var productExceptSelf = function(nums) {\n    // Write your code here\n    return [];\n};\n"
                }
            },
            {
                "id": "code_med_2",
                "number": 2,
                "difficulty": "Medium",
                "title": "15. 3Sum",
                "tags": [
                    "Array",
                    "Two Pointers",
                    "Sorting"
                ],
                "companies": [
                    "Amazon",
                    "Meta",
                    "Google"
                ],
                "description": "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
                "examples": [
                    {
                        "input": "nums = [-1,0,1,2,-1,-4]",
                        "output": "[[-1, -1, 2], [-1, 0, 1]]",
                        "explanation": "The triplets summing to 0 are [-1, 0, 1] and [-1, -1, 2]."
                    },
                    {
                        "input": "nums = [0,1,1]",
                        "output": "[]"
                    }
                ],
                "constraints": [
                    "3 <= nums.length <= 3000",
                    "-10^5 <= nums[i] <= 10^5"
                ],
                "testcases": [
                    {
                        "input": "[-1,0,1,2,-1,-4]",
                        "expected": "[[-1, -1, 2], [-1, 0, 1]]",
                        "label": "Case 1"
                    },
                    {
                        "input": "[0,1,1]",
                        "expected": "[]",
                        "label": "Case 2"
                    }
                ],
                "templates": {
                    "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        # Write your code here\n        pass\n",
                    "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
                    "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
                    "javascript": "var threeSum = function(nums) {\n    // Write your code here\n    return [];\n};\n"
                }
            }
        ]
    },
    "hard": {
        "technical": [
            {
                "id": "hard_tech_dsa_0",
                "subject": "DSA",
                "question": "In the Aho-Corasick automaton for multiple string matching, what is the purpose and construction time complexity of the suffix/failure links for a dictionary of total length L over alphabet Sigma?",
                "options": [
                    "O(L * Sigma) using BFS to transition across trie failure states",
                    "O(L^2) using recursive backtracking",
                    "O(Sigma^L) via depth-first suffix traversal",
                    "O(L log Sigma) via binary search over dictionary roots"
                ],
                "answer": "O(L * Sigma) using BFS to transition across trie failure states",
                "explanation": "Aho-Corasick constructs failure transitions using a breadth-first search (BFS) over the trie in O(L * Sigma) time, allowing linear-time O(N + M + matches) multi-pattern text searching."
            },
            {
                "id": "hard_tech_dsa_1",
                "subject": "DSA",
                "question": "What is the amortized time complexity per operation for a Fibonacci Heap when performing Decrease-Key versus Delete-Min?",
                "options": [
                    "O(1) amortized for Decrease-Key and O(log n) amortized for Delete-Min",
                    "O(log n) for both operations",
                    "O(1) for both operations",
                    "O(log n) for Decrease-Key and O(1) for Delete-Min"
                ],
                "answer": "O(1) amortized for Decrease-Key and O(log n) amortized for Delete-Min",
                "explanation": "Fibonacci heaps achieve O(1) amortized time for Decrease-Key through cascading cuts, while consolidating trees during Delete-Min requires O(log n) amortized time."
            },
            {
                "id": "hard_tech_dsa_2",
                "subject": "DSA",
                "question": "In Dinic's algorithm for Maximum Network Flow on a general network with V vertices and E edges, what is the tight asymptotic upper bound?",
                "options": [
                    "O(V^2 * E)",
                    "O(V * E^2)",
                    "O(E * log V)",
                    "O(V^3)"
                ],
                "answer": "O(V^2 * E)",
                "explanation": "Dinic's algorithm runs in O(V^2 * E) on general networks by using BFS to construct level graphs and DFS to find blocking flows in at most O(V) phases."
            },
            {
                "id": "hard_tech_dsa_3",
                "subject": "DSA",
                "question": "What is the primary invariant maintained by a Link-Cut Tree when dynamically representing a forest of rooted trees?",
                "options": [
                    "The paths of the represented trees are decomposed into node-disjoint preferred paths maintained by splay trees keyed by depth",
                    "Every node maintains a Fibonacci heap of outgoing tree edges",
                    "A static Cartesian tree keyed by node identifiers and weights",
                    "A balanced 2-3 tree partitioned by Euler tours"
                ],
                "answer": "The paths of the represented trees are decomposed into node-disjoint preferred paths maintained by splay trees keyed by depth",
                "explanation": "Link-Cut trees maintain preferred paths inside auxiliary Splay trees ordered strictly by node depth, enabling O(log n) amortized tree path queries, links, and cuts."
            },
            {
                "id": "hard_tech_dsa_4",
                "subject": "DSA",
                "question": "What is the space complexity of a fully persistent Segment Tree with N leaves supporting M point updates?",
                "options": [
                    "O(N + M log N)",
                    "O(N * M)",
                    "O((N + M) log N)",
                    "O(N log N + M)"
                ],
                "answer": "O(N + M log N)",
                "explanation": "The initial segment tree uses O(N) space. Each of the M point updates creates a new path of O(log N) nodes via path copying, resulting in O(N + M log N) total space."
            },
            {
                "id": "hard_tech_dsa_5",
                "subject": "DSA",
                "question": "In Tarjan's Strongly Connected Components (SCC) algorithm, why is a node popped from the stack only after its low-link value equals its discovery time?",
                "options": [
                    "It signifies the current node is the root of an SCC and all its descendants on stack belong to this SCC",
                    "It guarantees that the graph contains no directed cycles",
                    "It prevents cross-edges from connecting disconnected components",
                    "It forces the call stack to terminate early without back edges"
                ],
                "answer": "It signifies the current node is the root of an SCC and all its descendants on stack belong to this SCC",
                "explanation": "When low[u] == disc[u], u is the topmost ancestor (root) of its strongly connected component. All nodes popped down to u constitute that complete SCC."
            },
            {
                "id": "hard_tech_dsa_6",
                "subject": "DSA",
                "question": "How does the Hungarian algorithm achieve its O(V^3) time complexity for the Assignment Problem in weighted bipartite graphs?",
                "options": [
                    "By updating dual potential variables and augmenting along an equality subgraph using BFS/DFS",
                    "By sorting all edges and executing Kruskal's cycle detection",
                    "By transforming the cost matrix into a maximum flow simplex tableau",
                    "By running Bellman-Ford iteratively on the residual bipartite network"
                ],
                "answer": "By updating dual potential variables and augmenting along an equality subgraph using BFS/DFS",
                "explanation": "The Hungarian algorithm maintains feasible vertex potentials (dual problem) and updates them to find an augmenting path in the equality subgraph in O(V) phases of O(V^2) each."
            },
            {
                "id": "hard_tech_dsa_7",
                "subject": "DSA",
                "question": "What is the worst-case query and update time complexity for a Treap with randomized priorities of N elements?",
                "options": [
                    "O(N) worst-case, but O(log N) expected time",
                    "O(log N) deterministic guaranteed worst-case",
                    "O(1) amortized worst-case",
                    "O(sqrt(N)) worst-case"
                ],
                "answer": "O(N) worst-case, but O(log N) expected time",
                "explanation": "Because priorities are randomly assigned, an adversarial or degenerate priority assignment yields a worst-case chain of depth O(N), though expected time is O(log N)."
            },
            {
                "id": "hard_tech_dsa_8",
                "subject": "DSA",
                "question": "What algorithmic property allows the Convex Hull Trick (CHT) with monotonic slopes and queries to operate in amortized O(1) per query/insertion?",
                "options": [
                    "Lines on the lower hull can be maintained in a deque where suboptimal lines are pruned from front and back",
                    "Binary search over a persistent balanced AVL tree of slopes",
                    "Fast Fourier Transform point convolution",
                    "A Fibonacci priority queue indexing line intersection timestamps"
                ],
                "answer": "Lines on the lower hull can be maintained in a deque where suboptimal lines are pruned from front and back",
                "explanation": "When slopes and query values are monotonic, lines that are no longer optimal can be popped from the deque front, and new lines are pruned from the back, achieving O(1) amortized."
            },
            {
                "id": "hard_tech_dsa_9",
                "subject": "DSA",
                "question": "What is the time complexity to find the diameter of an unweighted tree using two passes of BFS?",
                "options": [
                    "O(V + E)",
                    "O(V * E)",
                    "O(V log V)",
                    "O(V^2)"
                ],
                "answer": "O(V + E)",
                "explanation": "The first BFS from an arbitrary node finds the farthest node u. The second BFS from u finds the farthest node v from u. Distance dist(u, v) is the diameter in linear O(V + E) time."
            },
            {
                "id": "hard_tech_oops_0",
                "subject": "OOPs",
                "question": "In C++, what is the object layout and memory overhead of using Virtual Inheritance to solve the Diamond Problem?",
                "options": [
                    "A virtual base table pointer (vbtptr) or vtable offset is added to locate the single shared virtual base subobject",
                    "Two duplicate copies of the base class data members are aligned sequentially",
                    "Dynamic dispatch is disabled and resolved purely at compile-time via static polymorphism",
                    "Virtual inheritance eliminates the need for virtual destructor tables"
                ],
                "answer": "A virtual base table pointer (vbtptr) or vtable offset is added to locate the single shared virtual base subobject",
                "explanation": "Virtual inheritance ensures only one instance of the virtual base class subobject exists in the most derived class, addressed via a vpointer/vbtable offset."
            },
            {
                "id": "hard_tech_oops_1",
                "subject": "OOPs",
                "question": "Why does calling a virtual method inside a base class constructor in C++ NOT invoke the derived class's override?",
                "options": [
                    "During base construction, the derived object's vptr points to the base class vtable because derived members are not yet initialized",
                    "C++ compiler forbids virtual function lookups outside inline scope",
                    "Derived classes are constructed before base classes, invalidating the stack frame",
                    "The derived vtable is destroyed before base initialization starts"
                ],
                "answer": "During base construction, the derived object's vptr points to the base class vtable because derived members are not yet initialized",
                "explanation": "In C++, while the base constructor is executing, the object's vptr points to the base class's vtable to prevent derived methods from accessing uninitialized derived fields."
            },
            {
                "id": "hard_tech_oops_2",
                "subject": "OOPs",
                "question": "What does the Curiously Recurring Template Pattern (CRTP) achieve in modern C++ OOP design?",
                "options": [
                    "Static (compile-time) polymorphism without the runtime memory and dispatch overhead of virtual function tables",
                    "Automatic garbage collection of heap-allocated derived objects",
                    "Dynamic runtime reflection of private member fields",
                    "Thread-safe concurrent reference counting for shared pointers"
                ],
                "answer": "Static (compile-time) polymorphism without the runtime memory and dispatch overhead of virtual function tables",
                "explanation": "CRTP passes the derived class as a template parameter to the base class (Base<Derived>), allowing base methods to call derived methods at compile-time without vtables."
            },
            {
                "id": "hard_tech_oops_3",
                "subject": "OOPs",
                "question": "How does the Liskov Substitution Principle (LSP) constrain method overrides regarding preconditions, postconditions, and covariance?",
                "options": [
                    "Subclasses can weaken preconditions, strengthen postconditions, and return covariant types",
                    "Subclasses must strengthen preconditions and weaken postconditions",
                    "Subclasses cannot alter parameter types or return types under any circumstances",
                    "Subclasses can throw any superclass exception regardless of base signature"
                ],
                "answer": "Subclasses can weaken preconditions, strengthen postconditions, and return covariant types",
                "explanation": "LSP demands that derived methods accept at least as much as the base (weaker preconditions) and guarantee at least as much as the base (stronger postconditions, covariant returns)."
            },
            {
                "id": "hard_tech_oops_4",
                "subject": "OOPs",
                "question": "What is Object Slicing in C++ and how can it be prevented in clean object-oriented architecture?",
                "options": [
                    "When a derived object is assigned by value to a base type, stripping derived members; prevent by passing by reference or pointer to polymorphic base",
                    "When memory leaks occur in heap arrays of objects; prevent using unique_ptr",
                    "When a virtual table contains duplicate function pointers; prevent using final keyword",
                    "When friend classes access private members without permission; prevent using private inheritance"
                ],
                "answer": "When a derived object is assigned by value to a base type, stripping derived members; prevent by passing by reference or pointer to polymorphic base",
                "explanation": "Passing by value causes the base copy constructor to copy only base sub-parts, slicing off derived state and reverting dynamic type. Pass by reference/pointer to avoid."
            },
            {
                "id": "hard_tech_oops_5",
                "subject": "OOPs",
                "question": "In Java and C#, what does 'type erasure' in generics imply for runtime class reflection and polymorphism?",
                "options": [
                    "Generic type arguments are removed at compile-time and replaced with bounds (like Object), making runtime type-parameter queries unavailable",
                    "The virtual method table is erased upon class loading to speed up execution",
                    "Abstract methods are deleted once implemented by concrete subclasses",
                    "Static polymorphic methods cannot be invoked through interface contracts"
                ],
                "answer": "Generic type arguments are removed at compile-time and replaced with bounds (like Object), making runtime type-parameter queries unavailable",
                "explanation": "Java generics are implemented via compile-time type erasure for backwards compatibility. Type arguments (e.g. List<String>) become raw types (List<Object>) in bytecode."
            },
            {
                "id": "hard_tech_oops_6",
                "subject": "OOPs",
                "question": "Why is an abstract class with a private constructor useful in certain advanced object-oriented design patterns?",
                "options": [
                    "To restrict subclass instantiation strictly to nested inner classes or factory methods within the same compilation unit",
                    "To prevent static methods from being invoked on the abstract class",
                    "To force all subclasses to declare virtual destructors",
                    "To enable multiple inheritance in single-inheritance runtimes"
                ],
                "answer": "To restrict subclass instantiation strictly to nested inner classes or factory methods within the same compilation unit",
                "explanation": "A private constructor in an abstract class prevents external inheritance while permitting nested classes (e.g. in Sealed Hierarchy / Algebraic Data Type designs) to inherit."
            },
            {
                "id": "hard_tech_oops_7",
                "subject": "OOPs",
                "question": "In the Double-Checked Locking pattern for Singleton implementation, why is the 'volatile' keyword mandatory in Java/C++ memory models?",
                "options": [
                    "To prevent instruction reordering where a non-null reference is published before object constructor execution completes",
                    "To ensure the singleton instance is allocated in CPU L1 cache",
                    "To synchronize all instance methods across concurrent worker threads",
                    "To automatically invoke the class destructor when the application exits"
                ],
                "answer": "To prevent instruction reordering where a non-null reference is published before object constructor execution completes",
                "explanation": "Without volatile, the JVM/CPU compiler can reorder memory writes: allocating memory, assigning the reference, and then calling constructor. Another thread could see a partially constructed object."
            },
            {
                "id": "hard_tech_oops_8",
                "subject": "OOPs",
                "question": "How does the Visitor Pattern solve the problem of Double Dispatch in languages that only support Single Dispatch?",
                "options": [
                    "By combining dynamic dispatch on the element (accept) with dynamic dispatch on the visitor (visit)",
                    "By dynamically casting the visitor object using reflection at each node",
                    "By converting class hierarchies into a static hash table of lambda closures",
                    "By overloading operators at compile time using template specialization"
                ],
                "answer": "By combining dynamic dispatch on the element (accept) with dynamic dispatch on the visitor (visit)",
                "explanation": "Double dispatch resolves methods based on runtime types of two objects: element.accept(visitor) dispatches on element, which calls visitor.visit(this), dispatching on visitor."
            },
            {
                "id": "hard_tech_oops_9",
                "subject": "OOPs",
                "question": "What is the key structural difference between the Decorator Pattern and the Proxy Pattern in OOP?",
                "options": [
                    "Decorator dynamically adds behavior and responsibilities to an object, whereas Proxy controls and manages access to the underlying object",
                    "Decorator modifies the interface of an object, while Proxy preserves identical behavior",
                    "Decorator requires multiple inheritance, while Proxy requires abstract factories",
                    "Decorator cannot be chained, whereas Proxy supports arbitrary nesting"
                ],
                "answer": "Decorator dynamically adds behavior and responsibilities to an object, whereas Proxy controls and manages access to the underlying object",
                "explanation": "Both share the same interface as the wrapped subject, but Decorator's intent is augmenting functionality, while Proxy's intent is controlling access, caching, or lazy initialization."
            },
            {
                "id": "hard_tech_os_0",
                "subject": "OS",
                "question": "What hardware mechanism ensures that the Translation Lookaside Buffer (TLB) remains coherent during a Process Context Switch in modern x86-64 CPUs with PCID (Process-Context Identifiers)?",
                "options": [
                    "Tagged TLB entries preserve address space translations without flushing the entire TLB on CR3 reload",
                    "CR0 is toggled into real mode to invalidate all virtual page entries",
                    "DMA controller broadcasts an invalidation bus cycle to all CPU cores",
                    "The OS writes zeros to all page table base registers"
                ],
                "answer": "Tagged TLB entries preserve address space translations without flushing the entire TLB on CR3 reload",
                "explanation": "With PCID (Process-Context Identifiers), CR3 updates preserve cached TLB entries tagged with distinct PCID tags, eliminating the expensive TLB shootdown penalty on context switches."
            },
            {
                "id": "hard_tech_os_1",
                "subject": "OS",
                "question": "In Linux virtual memory management, what is the role of the Out-Of-Memory (OOM) Killer's badness heuristic?",
                "options": [
                    "It evaluates oom_score based on normalized RAM/swap usage, process runtime, and oom_score_adj to select the least disruptive candidate to kill",
                    "It terminates all processes that hold root UID privilege",
                    "It frees all page cache buffers before stopping CPU execution",
                    "It sends SIGKILL unconditionally to the newest spawned child process"
                ],
                "answer": "It evaluates oom_score based on normalized RAM/swap usage, process runtime, and oom_score_adj to select the least disruptive candidate to kill",
                "explanation": "The OOM killer computes an oom_score (0-1000) factoring in total resident memory, swap space, privileged process exemptions, and admin oom_score_adj to terminate high-memory rogue processes."
            },
            {
                "id": "hard_tech_os_2",
                "subject": "OS",
                "question": "How does the Linux Completely Fair Scheduler (CFS) achieve fair CPU allocation among runnable threads?",
                "options": [
                    "By tracking virtual runtime (vruntime) in a red-black tree and always scheduling the task with smallest vruntime",
                    "By running round-robin queues prioritized by static nice values with fixed 10ms slices",
                    "By executing lottery scheduling with pseudo-random seed generators",
                    "By sorting threads by memory working set size"
                ],
                "answer": "By tracking virtual runtime (vruntime) in a red-black tree and always scheduling the task with smallest vruntime",
                "explanation": "CFS uses an augmented red-black tree keyed by each task's vruntime. The leftmost node has spent the least virtual time on the CPU and is picked next in O(log N) or O(1) cached time."
            },
            {
                "id": "hard_tech_os_3",
                "subject": "OS",
                "question": "What constitutes a 'Futex' (Fast Userspace Mutex) in Linux and why does it outperform traditional kernel-space mutexes?",
                "options": [
                    "Atomic CAS operations handle uncontended locks in userspace without syscall overhead, invoking sys_futex only on contention",
                    "It runs mutex operations in ring 0 interrupt handlers continuously",
                    "It avoids locks by running transactional hardware memory (RTM)",
                    "It disables process preemption during critical sections"
                ],
                "answer": "Atomic CAS operations handle uncontended locks in userspace without syscall overhead, invoking sys_futex only on contention",
                "explanation": "Futexes check and acquire the lock in user space with an atomic test-and-set/CAS. A kernel context switch and system call are only incurred when thread contention requires putting a thread to sleep."
            },
            {
                "id": "hard_tech_os_4",
                "subject": "OS",
                "question": "In x86 page tables, what is the purpose of the Inverted Page Table architecture compared to Multi-level Hierarchical Paging?",
                "options": [
                    "It scales space proportional to physical frames rather than the virtual address space size, indexed via hashing",
                    "It eliminates page faults entirely by mapping virtual pages to disk sectors",
                    "It enforces hardware execution prevention without NX bits",
                    "It reduces TLB miss penalties from O(1) to O(log N)"
                ],
                "answer": "It scales space proportional to physical frames rather than the virtual address space size, indexed via hashing",
                "explanation": "Inverted page tables have exactly one entry per physical frame of RAM rather than per virtual page, keeping memory overhead constant regardless of total virtual address space size."
            },
            {
                "id": "hard_tech_os_5",
                "subject": "OS",
                "question": "What is Priority Inversion, and how does the Priority Ceiling Protocol (PCP) resolve it?",
                "options": [
                    "A high-priority task is blocked by a low-priority task holding a shared lock; PCP elevates the lock holder's priority to the highest priority among tasks that may access the lock",
                    "A process with high priority consumes 100% CPU starvation; PCP reduces its nice value",
                    "Deadlock occurs across circular waits; PCP aborts the youngest transaction",
                    "Kernel threads preempt user threads; PCP grants real-time SCHED_FIFO rights"
                ],
                "answer": "A high-priority task is blocked by a low-priority task holding a shared lock; PCP elevates the lock holder's priority to the highest priority among tasks that may access the lock",
                "explanation": "Priority inversion happens when a medium task preempts a low task holding a lock needed by a high task. Priority Ceiling raises the locker's priority to avoid medium preemption."
            },
            {
                "id": "hard_tech_os_6",
                "subject": "OS",
                "question": "What is the fundamental difference between the epoll and select/poll I/O multiplexing system calls in Linux?",
                "options": [
                    "epoll is event-driven with O(1) state return via an in-kernel ready list, whereas select/poll re-scans the full O(N) file descriptor set on every call",
                    "select supports edge-triggered notifications while epoll only supports level-triggered",
                    "poll operates directly on raw memory sockets without file descriptors",
                    "epoll runs only on thread pools and cannot monitor network sockets"
                ],
                "answer": "epoll is event-driven with O(1) state return via an in-kernel ready list, whereas select/poll re-scans the full O(N) file descriptor set on every call",
                "explanation": "epoll registers file descriptors in an in-kernel red-black tree and uses an interrupt callback to link active descriptors to a ready list, returning active events in O(active) rather than scanning O(N)."
            },
            {
                "id": "hard_tech_os_7",
                "subject": "OS",
                "question": "How does the Copy-On-Write (COW) optimization function during the fork() system call?",
                "options": [
                    "Child and parent share the same physical pages marked as read-only; when either writes, a page fault triggers kernel duplication of that specific page",
                    "The kernel duplicates the entire virtual and physical memory immediately before fork returns",
                    "Pages are compressed into swap partition until accessed by the child process",
                    "Parent process is paused until the child process terminates or executes execve"
                ],
                "answer": "Child and parent share the same physical pages marked as read-only; when either writes, a page fault triggers kernel duplication of that specific page",
                "explanation": "COW maps all page table entries as read-only for both parent and child. A write attempt triggers a page fault exception, allowing the kernel to copy only the modified 4KB frame."
            },
            {
                "id": "hard_tech_os_8",
                "subject": "OS",
                "question": "In modern OS kernels, why are Interrupt Service Routines (ISRs) split into Top-Half and Bottom-Half (e.g., Tasklets/SoftIRQs)?",
                "options": [
                    "Top-half runs with interrupts disabled to service critical hardware acknowledgments quickly; bottom-half defers intensive work with interrupts enabled",
                    "Top-half runs in user space while bottom-half runs in kernel space",
                    "Top-half handles multi-core synchronization while bottom-half writes to NVMe disks",
                    "Top-half executes only on CPU 0 while bottom-half runs on GPU coprocessors"
                ],
                "answer": "Top-half runs with interrupts disabled to service critical hardware acknowledgments quickly; bottom-half defers intensive work with interrupts enabled",
                "explanation": "The top-half acknowledges the hardware quickly with interrupts masked to minimize interrupt latency; the bottom half (SoftIRQ/workqueue) finishes data processing with interrupts re-enabled."
            },
            {
                "id": "hard_tech_os_9",
                "subject": "OS",
                "question": "What security vulnerability is mitigated by Kernel Address Space Layout Randomization (KASLR)?",
                "options": [
                    "Return-Oriented Programming (ROP) exploits relying on hardcoded kernel function and gadget addresses in memory",
                    "SQL injection through raw block devices",
                    "Denial-of-Service via TCP SYN floods",
                    "Unauthorized filesystem mount operations"
                ],
                "answer": "Return-Oriented Programming (ROP) exploits relying on hardcoded kernel function and gadget addresses in memory",
                "explanation": "KASLR randomizes the base address of the kernel code and data structures at every system boot, making it difficult for attackers to execute return-to-libc or ROP gadget chains."
            },
            {
                "id": "hard_tech_dbms_0",
                "subject": "DBMS",
                "question": "In Multi-Version Concurrency Control (MVCC) with PostgreSQL, what is the role and overhead of the VACUUM process?",
                "options": [
                    "It reclaims dead tuple versions (dead rows) created by updates and deletes, and freezes transaction IDs to prevent 32-bit transaction wraparound",
                    "It recompiles SQL query execution plans into machine instructions",
                    "It flushes the Write-Ahead Log (WAL) to secondary replica nodes",
                    "It locks all tables and rebuilds B-tree indexes from scratch"
                ],
                "answer": "It reclaims dead tuple versions (dead rows) created by updates and deletes, and freezes transaction IDs to prevent 32-bit transaction wraparound",
                "explanation": "Under MVCC, updates write new row versions while marking old rows dead. VACUUM reclaims dead tuple space for reuse and advances relfrozenxid to prevent 32-bit transaction ID wraparound."
            },
            {
                "id": "hard_tech_dbms_1",
                "subject": "DBMS",
                "question": "What is the difference between Write-Skew Anomaly in Snapshot Isolation and Phantom Reads in Repeatable Read?",
                "options": [
                    "Write-skew occurs when two concurrent transactions read overlapping data sets and update disjoint records violating an integrity constraint; Snapshot Isolation allows write-skew",
                    "Write-skew only happens in Serializable isolation, whereas phantom reads occur in Read Committed",
                    "Phantom reads refer to uncommitted dirty updates, while write-skew refers to lost updates",
                    "Snapshot isolation completely prevents write-skew without predicate locks"
                ],
                "answer": "Write-skew occurs when two concurrent transactions read overlapping data sets and update disjoint records violating an integrity constraint; Snapshot Isolation allows write-skew",
                "explanation": "Snapshot Isolation prevents dirty reads, non-repeatable reads, and phantom reads of individual records, but allows write-skew because transactions update disjoint keys based on overlapping reads."
            },
            {
                "id": "hard_tech_dbms_2",
                "subject": "DBMS",
                "question": "In database crash recovery using the ARIES algorithm, what are the three distinct phases and their precise order of execution?",
                "options": [
                    "Analysis Phase, Redo Phase (Repeating History), and Undo Phase",
                    "Undo Phase, Redo Phase, and Commit Phase",
                    "Checkpoint Phase, Verification Phase, and Flush Phase",
                    "Scan Phase, Lock Phase, and Rollback Phase"
                ],
                "answer": "Analysis Phase, Redo Phase (Repeating History), and Undo Phase",
                "explanation": "ARIES operates in 3 phases: 1) Analysis determines dirty pages and active transactions at crash time; 2) Redo repeats history from the smallest dirty page LSN; 3) Undo rolls back uncommitted transactions."
            },
            {
                "id": "hard_tech_dbms_3",
                "subject": "DBMS",
                "question": "How does a Log-Structured Merge-tree (LSM-tree) optimize write throughput compared to a traditional B+ Tree?",
                "options": [
                    "Writes are appended sequentially to an in-memory MemTable and WAL, then flushed as immutable SSTables and merged via background compaction",
                    "It stores all data in non-volatile RAM without writing to persistent disk",
                    "It eliminates primary key indexes by hashing directly to raw disk blocks",
                    "It uses random disk writes to update leaf nodes in place without tree rebalancing"
                ],
                "answer": "Writes are appended sequentially to an in-memory MemTable and WAL, then flushed as immutable SSTables and merged via background compaction",
                "explanation": "LSM-trees turn random writes into sequential disk I/O by appending to WAL and buffering in a MemTable, later flushing sorted immutable SSTables and compacting them asynchronously."
            },
            {
                "id": "hard_tech_dbms_4",
                "subject": "DBMS",
                "question": "What is the purpose of Compensation Log Records (CLRs) during database transaction rollback in ARIES?",
                "options": [
                    "They record the undoing of an update and store an undoNextLSN pointer to prevent repeating undos if the system crashes during recovery",
                    "They log financial billing metrics for executed transactions",
                    "They notify replicas that a transaction has been purged from memory",
                    "They encrypt transaction history for regulatory compliance"
                ],
                "answer": "They record the undoing of an update and store an undoNextLSN pointer to prevent repeating undos if the system crashes during recovery",
                "explanation": "CLRs log compensating actions during undo. Crucially, each CLR contains an undoNextLSN pointing to the next log record to undo, preventing cascading undos if recovery crashes."
            },
            {
                "id": "hard_tech_dbms_5",
                "subject": "DBMS",
                "question": "What condition must be satisfied for a database transaction schedule to be Conflict Serializable?",
                "options": [
                    "Its precedence (serialization) graph containing transactions as nodes and conflicting operations as directed edges must be acyclic (DAG)",
                    "Every transaction must acquire all locks before releasing any locks",
                    "The schedule must execute all read operations before any write operations",
                    "It must produce identical database state to a two-phase commit protocol"
                ],
                "answer": "Its precedence (serialization) graph containing transactions as nodes and conflicting operations as directed edges must be acyclic (DAG)",
                "explanation": "A schedule is conflict serializable if and only if its precedence graph has no directed cycles. If a cycle exists, conflicting operations cannot be rearranged into an equivalent serial order."
            },
            {
                "id": "hard_tech_dbms_6",
                "subject": "DBMS",
                "question": "In distributed relational databases, what is the two-phase commit (2PC) protocol's primary failure mode regarding coordinator crashes?",
                "options": [
                    "If the coordinator crashes during the commit phase after participants vote 'YES', participants remain indefinitely blocked in an uncertain state",
                    "The database automatically promotes the youngest replica without data loss",
                    "All participants immediately commit and broadcast their results",
                    "Participants roll back all transactions within 500 milliseconds"
                ],
                "answer": "If the coordinator crashes during the commit phase after participants vote 'YES', participants remain indefinitely blocked in an uncertain state",
                "explanation": "In 2PC, once a participant votes YES, it cannot unilaterally commit or abort. If the coordinator crashes before sending COMMIT/ABORT, participants are blocked holding locks until recovery."
            },
            {
                "id": "hard_tech_dbms_7",
                "subject": "DBMS",
                "question": "What is the structural difference between a Clustered Index and a Non-Clustered Index in an RDBMS like SQL Server or MySQL InnoDB?",
                "options": [
                    "A clustered index physically orders table data pages on disk and leaf nodes contain actual row data; non-clustered index leaf nodes contain row pointers or primary keys",
                    "Clustered index leaf nodes only store hash digests, whereas non-clustered stores full tables",
                    "A table can contain up to 256 clustered indexes, but only 1 non-clustered index",
                    "Clustered indexes are maintained exclusively in memory while non-clustered are on disk"
                ],
                "answer": "A clustered index physically orders table data pages on disk and leaf nodes contain actual row data; non-clustered index leaf nodes contain row pointers or primary keys",
                "explanation": "Because a table can only be physically sorted one way on disk, there is at most one clustered index whose leaf nodes store the table rows. Secondary indexes store pointers to the clustered key."
            },
            {
                "id": "hard_tech_dbms_8",
                "subject": "DBMS",
                "question": "In Cost-Based Query Optimization, how does the System-R (Selinger) optimizer explore join orders efficiently?",
                "options": [
                    "Dynamic programming over the power set of relations, pruning equivalent join subplans using cost and interesting orders",
                    "Greedy search that always picks the join producing the largest cardinality",
                    "Genetic algorithms that randomly mutate join trees without cost estimation",
                    "Simulated annealing over cartesian products exclusively"
                ],
                "answer": "Dynamic programming over the power set of relations, pruning equivalent join subplans using cost and interesting orders",
                "explanation": "Selinger optimization builds optimal join trees bottom-up using dynamic programming: solving size-1 subplans, then size-2, etc., keeping the cheapest plan for each subset unless an interesting order exists."
            },
            {
                "id": "hard_tech_dbms_9",
                "subject": "DBMS",
                "question": "What does Strict Two-Phase Locking (Strict 2PL) guarantee that basic 2PL does NOT guarantee?",
                "options": [
                    "Strict 2PL prevents cascading rollbacks and guarantees recoverable, strict schedules by holding all exclusive locks until transaction completion",
                    "Strict 2PL eliminates all deadlocks automatically without timeouts",
                    "Strict 2PL allows concurrent writes to the same record simultaneously",
                    "Strict 2PL guarantees that transactions finish in O(1) time"
                ],
                "answer": "Strict 2PL prevents cascading rollbacks and guarantees recoverable, strict schedules by holding all exclusive locks until transaction completion",
                "explanation": "Basic 2PL allows releasing locks during the shrinking phase, which can lead to dirty reads by other transactions and cascading aborts. Strict 2PL holds exclusive locks until commit/abort."
            },
            {
                "id": "hard_tech_cn_0",
                "subject": "CN",
                "question": "How does the BGP (Border Gateway Protocol) resolve routing loops across autonomous systems in the global Internet?",
                "options": [
                    "AS-PATH attribute: an AS drops an incoming BGP route advertisement if its own AS number appears in the path",
                    "Counting hops to infinity like RIP",
                    "Dijkstra's shortest path computation over all autonomous systems",
                    "Periodic ICMP echo requests sent across BGP peering sessions"
                ],
                "answer": "AS-PATH attribute: an AS drops an incoming BGP route advertisement if its own AS number appears in the path",
                "explanation": "BGP is a path-vector protocol. Each BGP speaker prepends its AS number to the AS-PATH attribute. If a receiving router sees its own ASN in the AS-PATH list, it drops the update to prevent loops."
            },
            {
                "id": "hard_tech_cn_1",
                "subject": "CN",
                "question": "In TCP BBR (Bottleneck Bandwidth and Round-trip propagation time) congestion control, how does it differ fundamentally from loss-based algorithms like CUBIC?",
                "options": [
                    "BBR models the physical network by pacing packets to match maximum bottleneck bandwidth and minimum RTT, preventing bufferbloat before packet loss occurs",
                    "BBR doubles the congestion window every RTT until a packet is dropped",
                    "BBR relies entirely on explicit router ECN bits without probing latency",
                    "BBR uses UDP encapsulation to bypass TCP flow control mechanisms"
                ],
                "answer": "BBR models the physical network by pacing packets to match maximum bottleneck bandwidth and minimum RTT, preventing bufferbloat before packet loss occurs",
                "explanation": "Loss-based TCP (like Reno/CUBIC) considers packet loss as the only congestion signal, filling intermediate router buffers (bufferbloat). BBR probes max bandwidth and min RTT to maintain optimal queue size."
            },
            {
                "id": "hard_tech_cn_2",
                "subject": "CN",
                "question": "What architectural improvement does QUIC (HTTP/3) provide over TCP + TLS 1.3 regarding Head-of-Line (HoL) blocking?",
                "options": [
                    "QUIC implements independent, multiplexed streams over UDP so a lost packet on one stream does not stall delivery of other streams",
                    "QUIC increases TCP window size to 4GB",
                    "QUIC disables packet retransmissions across wireless links",
                    "QUIC executes encryption in hardware router chips instead of endpoints"
                ],
                "answer": "QUIC implements independent, multiplexed streams over UDP so a lost packet on one stream does not stall delivery of other streams",
                "explanation": "In HTTP/2 over TCP, if a single TCP packet is dropped, the entire connection stalls until retransmission (transport HoL blocking). QUIC uses independent byte-stream offsets over UDP."
            },
            {
                "id": "hard_tech_cn_3",
                "subject": "CN",
                "question": "What is the purpose of the TCP TIME-WAIT state and why is its duration traditionally set to 2 * MSL (Maximum Segment Lifetime)?",
                "options": [
                    "To ensure delayed or duplicate packets in transit dissipate and to guarantee the remote peer receives the final ACK of connection teardown",
                    "To allow the operating system to defragment memory buffers",
                    "To measure packet loss rate for the next connection",
                    "To reset the sequence number space back to zero"
                ],
                "answer": "To ensure delayed or duplicate packets in transit dissipate and to guarantee the remote peer receives the final ACK of connection teardown",
                "explanation": "TIME-WAIT (2 * MSL, typically 60-120s) ensures that late duplicate segments die off in the network before a new socket reuses the 4-tuple, and resends ACK if the peer's FIN arrives again."
            },
            {
                "id": "hard_tech_cn_4",
                "subject": "CN",
                "question": "In TLS 1.3, how is the 0-RTT (Early Data) resumption feature implemented and what security vulnerability does it introduce?",
                "options": [
                    "Early application data is encrypted using keys derived from a previous session ticket, making it vulnerable to Replay Attacks",
                    "It bypasses asymmetric encryption completely, allowing plaintext sniffing",
                    "It exposes the server's private certificate authority key to the client",
                    "It disables forward secrecy for all future session handshakes"
                ],
                "answer": "Early application data is encrypted using keys derived from a previous session ticket, making it vulnerable to Replay Attacks",
                "explanation": "In 0-RTT, the client transmits encrypted application data in its very first flight using pre-shared key (PSK) state. Because no fresh handshake occurred yet, network adversaries can replay 0-RTT packets."
            },
            {
                "id": "hard_tech_cn_5",
                "subject": "CN",
                "question": "What is the function of the OSPF Link-State Advertisement (LSA) Type 5 in a multi-area network?",
                "options": [
                    "Autonomous System External LSA generated by ASBRs to advertise routes external to the OSPF domain",
                    "Router LSA generated by every router within an area",
                    "Network LSA generated by Designated Routers on broadcast segments",
                    "Summary LSA generated by ABRs to describe inter-area routes"
                ],
                "answer": "Autonomous System External LSA generated by ASBRs to advertise routes external to the OSPF domain",
                "explanation": "Type 5 LSAs are originated by Autonomous System Boundary Routers (ASBRs) to flood external routes (e.g. from BGP or static routes) throughout the OSPF autonomous system (except stub areas)."
            },
            {
                "id": "hard_tech_cn_6",
                "subject": "CN",
                "question": "How does Explicit Congestion Notification (ECN) in IP and TCP avoid packet dropping at congested intermediate routers?",
                "options": [
                    "Routers mark the 2-bit ECN field in IP header with Congestion Experienced (CE); receiver sets ECE flag in TCP ACK, prompting sender to reduce window via CWR flag",
                    "Routers drop UDP packets and prioritize TCP traffic",
                    "The sender reduces its MTU size to 576 bytes dynamically",
                    "Routers send ICMP Source Quench messages to the sender"
                ],
                "answer": "Routers mark the 2-bit ECN field in IP header with Congestion Experienced (CE); receiver sets ECE flag in TCP ACK, prompting sender to reduce window via CWR flag",
                "explanation": "Instead of dropping packets when buffer queues build up, an ECN-capable router sets bits 11 in the IP header (CE). The receiver echoes this in TCP header (ECE), and sender reduces cwnd without retransmissions."
            },
            {
                "id": "hard_tech_cn_7",
                "subject": "CN",
                "question": "What is the function of Path MTU Discovery (PMTUD) and why does the 'PMTUD Black Hole' phenomenon occur?",
                "options": [
                    "PMTUD sets the Don't Fragment (DF) bit to discover the smallest MTU; a black hole occurs when misconfigured firewalls block ICMP Type 3 Code 4 (Fragmentation Needed) packets",
                    "PMTUD fragments packets at every hop; black holes occur when routers run out of IP addresses",
                    "PMTUD negotiates MSS during TCP SYN; black holes occur when DNS queries time out",
                    "PMTUD compresses Ethernet headers; black holes occur when CRC checksums fail"
                ],
                "answer": "PMTUD sets the Don't Fragment (DF) bit to discover the smallest MTU; a black hole occurs when misconfigured firewalls block ICMP Type 3 Code 4 (Fragmentation Needed) packets",
                "explanation": "PMTUD sends packets with DF=1. If a router has a smaller MTU, it must drop the packet and return ICMP 'Fragmentation Needed'. If firewalls drop this ICMP message, packets silently vanish (black hole)."
            },
            {
                "id": "hard_tech_cn_8",
                "subject": "CN",
                "question": "In DNSSEC, how does the chain of trust validate that an IP address returned for a domain is authentic?",
                "options": [
                    "Each zone signs its RRsets with a Zone Signing Key (ZSK); the ZSK is signed by a Key Signing Key (KSK); a DS record in the parent zone signs a hash of the child KSK up to the root trust anchor",
                    "By encrypting DNS packets using TLS over port 853",
                    "By having DNS root servers maintain a static list of all global IP addresses",
                    "By verifying that the client IP matches the authoritative nameserver subnet"
                ],
                "answer": "Each zone signs its RRsets with a Zone Signing Key (ZSK); the ZSK is signed by a Key Signing Key (KSK); a DS record in the parent zone signs a hash of the child KSK up to the root trust anchor",
                "explanation": "DNSSEC builds a cryptographic chain: RRSIG records sign resource records using ZSK. ZSK is signed by KSK. A hash of KSK is stored as a DS record in the parent zone, repeating to the signed root."
            },
            {
                "id": "hard_tech_cn_9",
                "subject": "CN",
                "question": "What is the primary role of the Spanning Tree Protocol (STP) Rapid Convergence 802.1w (RSTP) edge port feature?",
                "options": [
                    "Edge ports directly transition to Forwarding state without undergoing Listening and Learning phases because they connect to end stations, not switches",
                    "They block all broadcast and multicast traffic on trunk links",
                    "They aggregate physical links into a single logical channel via LACP",
                    "They mirror packets to an intrusion detection appliance"
                ],
                "answer": "Edge ports directly transition to Forwarding state without undergoing Listening and Learning phases because they connect to end stations, not switches",
                "explanation": "RSTP edge ports (configured on access ports connected to hosts) bypass the 30-50 second listening/learning delay, transitioning directly to forwarding state while monitoring for BPDUs."
            },
            {
                "id": "hard_tech_sd_0",
                "subject": "System Design",
                "question": "In the Raft Consensus Algorithm, how does the leader election mechanism guarantee that a newly elected leader contains all previously committed log entries?",
                "options": [
                    "A candidate's request for vote is rejected unless its log is at least as up-to-date as the voter's log (comparing lastLogTerm, then lastLogIndex)",
                    "The leader downloads missing entries from followers immediately after election",
                    "Voters execute a distributed Paxos consensus to elect the node with smallest ID",
                    "Log entries are only committed after being replicated to 100% of cluster nodes"
                ],
                "answer": "A candidate's request for vote is rejected unless its log is at least as up-to-date as the voter's log (comparing lastLogTerm, then lastLogIndex)",
                "explanation": "Raft's election restriction states that a follower only votes for a candidate if candidate's log has higher term, or equal term and longer length. Since committed entries exist on a majority, the leader has all committed logs."
            },
            {
                "id": "hard_tech_sd_1",
                "subject": "System Design",
                "question": "What is the difference between Strong Consistency (Linearizability) and Sequential Consistency in distributed systems?",
                "options": [
                    "Linearizability requires operations to appear instantaneous in real-world wall-clock time; Sequential Consistency requires operations to match some valid global sequence preserving per-process program order without real-time constraints",
                    "Sequential consistency requires atomic multi-datacenter clock synchronization, whereas linearizability does not",
                    "Linearizability only applies to single-core CPUs while sequential applies to networks",
                    "Sequential consistency allows stale reads indefinitely without bound"
                ],
                "answer": "Linearizability requires operations to appear instantaneous in real-world wall-clock time; Sequential Consistency requires operations to match some valid global sequence preserving per-process program order without real-time constraints",
                "explanation": "Linearizability is composable and bound to real time: if op B starts after op A completes in real time, B must see A's effect. Sequential consistency only requires an interleaving consistent with each thread's order."
            },
            {
                "id": "hard_tech_sd_2",
                "subject": "System Design",
                "question": "In designing a globally distributed ID generator (like Twitter Snowflake), how are 64-bit IDs structured to guarantee rough time-sorting and uniqueness across distributed nodes?",
                "options": [
                    "1 bit unused, 41 bits millisecond timestamp (~69 years), 10 bits machine/datacenter ID (1024 nodes), 12 bits sequence number (4096 IDs/ms/node)",
                    "32 bits IP address, 16 bits port, 16 bits random counter",
                    "64 bits SHA-256 hash of payload and UTC timestamp",
                    "48 bits MAC address followed by 16 bits monotonic counter"
                ],
                "answer": "1 bit unused, 41 bits millisecond timestamp (~69 years), 10 bits machine/datacenter ID (1024 nodes), 12 bits sequence number (4096 IDs/ms/node)",
                "explanation": "Snowflake IDs use 41 bits timestamp (yielding 69 years lifespan and natural sorting), 10 bits machine/worker ID, and 12 bits local sequence number per millisecond."
            },
            {
                "id": "hard_tech_sd_3",
                "subject": "System Design",
                "question": "How does Google Spanner achieve globally consistent External Consistency (true linearizability) without cross-region locks?",
                "options": [
                    "TrueTime API with bounded clock uncertainty [earliest, latest] using atomic clocks and GPS, with transactions committing after waiting out uncertainty period (commit wait)",
                    "Pure vector clocks exchanged across peer-to-peer gossip gossip protocols",
                    "Centralized master server in Iowa that timestamps all global read/write transactions",
                    "Strict two-phase locking coordinated through Paxos quorum leases exclusively"
                ],
                "answer": "TrueTime API with bounded clock uncertainty [earliest, latest] using atomic clocks and GPS, with transactions committing after waiting out uncertainty period (commit wait)",
                "explanation": "Spanner exposes TrueTime.now() with an uncertainty bound epsilon (typically < 7ms). Leaders wait 2*epsilon before releasing commit locks (commit wait), guaranteeing external consistency."
            },
            {
                "id": "hard_tech_sd_4",
                "subject": "System Design",
                "question": "What is the Thundering Herd (Cache Stampede) problem in large-scale caching architectures, and what is the optimal mitigation?",
                "options": [
                    "When a popular cache key expires, thousands of concurrent requests miss cache and overwhelm the backend database; mitigate using probabilistic early expiration (XFetch) or mutex locking",
                    "When cache memory runs out and triggers OOM panic; mitigate using LRU eviction",
                    "When cache replicas fail to sync with the primary; mitigate using Paxos consensus",
                    "When database writes invalidate stale cache lines; mitigate using Write-Through caching"
                ],
                "answer": "When a popular cache key expires, thousands of concurrent requests miss cache and overwhelm the backend database; mitigate using probabilistic early expiration (XFetch) or mutex locking",
                "explanation": "A cache stampede happens when concurrent workers notice a key missing and all query DB simultaneously. XFetch recomputes keys probabilistically before TTL expires, and mutexes ensure only 1 worker regenerates the cache."
            },
            {
                "id": "hard_tech_sd_5",
                "subject": "System Design",
                "question": "How does Consistent Hashing with Virtual Nodes (Vnodes) prevent catastrophic hotspot skew when physical nodes are added or removed?",
                "options": [
                    "Each physical node is assigned multiple (e.g. 100-256) pseudo-random positions along the ring, distributing hash partitions evenly across remaining nodes upon changes",
                    "By using a master coordinator to reshuffle all keys sequentially across partitions",
                    "By doubling the size of the hash ring whenever a node fails",
                    "By converting the hash ring into a B+ tree of partition boundaries"
                ],
                "answer": "Each physical node is assigned multiple (e.g. 100-256) pseudo-random positions along the ring, distributing hash partitions evenly across remaining nodes upon changes",
                "explanation": "Without virtual nodes, adding or removing a server affects only its adjacent neighbor, creating severe load imbalance. Virtual nodes interleave tokens across the entire ring uniformly."
            },
            {
                "id": "hard_tech_sd_6",
                "subject": "System Design",
                "question": "In Event-Driven Architecture, what is the Transactional Outbox Pattern and what core reliability challenge does it solve?",
                "options": [
                    "It writes database state updates and event messages atomically in the same local ACID transaction; a separate publisher polls the outbox table to guarantee At-Least-Once message delivery",
                    "It publishes messages to a queue before verifying whether the database write succeeded",
                    "It avoids database transactions entirely by writing directly to Kafka topics",
                    "It guarantees Exactly-Once end-to-end processing without consumer idempotency"
                ],
                "answer": "It writes database state updates and event messages atomically in the same local ACID transaction; a separate publisher polls the outbox table to guarantee At-Least-Once message delivery",
                "explanation": "Updating a DB and publishing to an event broker cannot be done in a single distributed 2PC transaction across diverse technologies. Saving events to an outbox table in the same DB transaction guarantees durability."
            },
            {
                "id": "hard_tech_sd_7",
                "subject": "System Design",
                "question": "What is the difference between a Bloom Filter and a Count-Min Sketch in streaming data systems?",
                "options": [
                    "A Bloom filter tests set membership with false positives and zero false negatives; a Count-Min Sketch estimates frequency/counts of elements in sublinear space with one-sided error",
                    "A Bloom filter counts frequencies while Count-Min Sketch detects duplicates",
                    "Count-Min Sketch guarantees 100% exact counts while Bloom filter is probabilistic",
                    "Bloom filters require sorting while Count-Min Sketch relies on dynamic programming"
                ],
                "answer": "A Bloom filter tests set membership with false positives and zero false negatives; a Count-Min Sketch estimates frequency/counts of elements in sublinear space with one-sided error",
                "explanation": "Bloom filters use bit arrays and multiple hash functions for membership queries (yes/maybe, no false negatives). Count-Min Sketch uses a 2D array of counters to estimate frequency counts."
            },
            {
                "id": "hard_tech_sd_8",
                "subject": "System Design",
                "question": "How does the SAGA Pattern coordinate distributed transactions across microservices without two-phase locking?",
                "options": [
                    "Through a sequence of local transactions where each step publishes an event; if a step fails, compensating transactions are executed in reverse order to undo changes",
                    "By holding distributed pessimistic database locks across all services until the transaction ends",
                    "By synchronizing database clocks using GPS receivers across cloud regions",
                    "By converting all relational databases into a single monolithic schema"
                ],
                "answer": "Through a sequence of local transactions where each step publishes an event; if a step fails, compensating transactions are executed in reverse order to undo changes",
                "explanation": "Sagas avoid distributed lock contention by breaking transactions into local steps. Rollback is achieved semantically by running predefined compensating actions in reverse order."
            },
            {
                "id": "hard_tech_sd_9",
                "subject": "System Design",
                "question": "In a distributed rate limiting architecture handling millions of RPS, why is a Sliding Window Counter preferred over Fixed Window or Token Bucket?",
                "options": [
                    "It mitigates boundary burst spikes that afflict Fixed Window while consuming minimal memory compared to storing discrete request timestamps in Sliding Window Log",
                    "It eliminates the need for atomic Redis operations or locks",
                    "It guarantees that no requests are ever throttled under peak load",
                    "It runs entirely on client browsers without server-side validation"
                ],
                "answer": "It mitigates boundary burst spikes that afflict Fixed Window while consuming minimal memory compared to storing discrete request timestamps in Sliding Window Log",
                "explanation": "Fixed Window allows 2x limit at window boundaries. Sliding Window Log uses prohibitive memory storing timestamps. Sliding Window Counter approximates previous window overlap with O(1) memory and no boundary spikes."
            }
        ],
        "verbal": [
            {
                "id": "hard_verb_0",
                "question": "Choose the word whose meaning is most diametrically opposed to 'TRACTABLE':",
                "options": [
                    "Intractable / Refractory",
                    "Malleable",
                    "Compliant",
                    "Amenable"
                ],
                "answer": "Intractable / Refractory",
                "explanation": "Tractable means easily managed, controlled, or influenced. Its exact opposite is intractable or refractory (stubborn, unmanageable)."
            },
            {
                "id": "hard_verb_1",
                "question": "Identify the logical fallacy: 'The senator argues that increasing public transit funding reduces emissions, but she has never worked in an automotive factory, so her policy must be fundamentally flawed.'",
                "options": [
                    "Ad Hominem (Circumstantial)",
                    "Straw Man Fallacy",
                    "Post Hoc Ergo Propter Hoc",
                    "False Dilemma"
                ],
                "answer": "Ad Hominem (Circumstantial)",
                "explanation": "This attacks the senator's background rather than addressing the empirical merits and evidence of the public transit policy."
            },
            {
                "id": "hard_verb_2",
                "question": "Select the pair that expresses an analogous relationship: 'EPHEMERAL : PERMANENCE ::'",
                "options": [
                    "Erratic : Consistency",
                    "Mundane : Ordinary",
                    "Taciturn : Silence",
                    "Audacious : Bravery"
                ],
                "answer": "Erratic : Consistency",
                "explanation": "Ephemeral is characterized by a lack of permanence; similarly, erratic behavior is characterized by a lack of consistency."
            },
            {
                "id": "hard_verb_3",
                "question": "Complete the sentence: 'The director\u2019s latest retrospective was characterized by an unmistakable _______; far from presenting bold innovations, it merely rehashed _______ tropes.'",
                "options": [
                    "pedestrianism ... hackneyed",
                    "inventiveness ... derivative",
                    "brilliance ... arcane",
                    "audacity ... veracious"
                ],
                "answer": "pedestrianism ... hackneyed",
                "explanation": "The second clause explains the first: lack of innovation and rehashing indicates 'pedestrianism' (dullness) and 'hackneyed' (overused) tropes."
            },
            {
                "id": "hard_verb_4",
                "question": "Identify the sentence that contains an error in parallel structure or dangling modifier:",
                "options": [
                    "Having examined the algorithmic metrics, the deployment was halted by the engineering team.",
                    "Having examined the algorithmic metrics, the engineering team halted the deployment.",
                    "The engineer analyzed the throughput, optimized the queries, and documented the schema.",
                    "Neither the software architect nor the database administrators were satisfied with the latency."
                ],
                "answer": "Having examined the algorithmic metrics, the deployment was halted by the engineering team.",
                "explanation": "The introductory participial phrase 'Having examined...' modifies 'the deployment' instead of 'the engineering team', creating a classic dangling modifier."
            },
            {
                "id": "hard_verb_5",
                "question": "What is the meaning of the word 'OBVIATE' in professional and technical discourse?",
                "options": [
                    "To anticipate and prevent or eliminate the necessity of something",
                    "To make something obscure or difficult to understand",
                    "To openly criticize or reprimand an employee",
                    "To duplicate redundant data across servers"
                ],
                "answer": "To anticipate and prevent or eliminate the necessity of something",
                "explanation": "To obviate means to remove, anticipate, or render unnecessary (e.g., 'the new caching layer obviates additional read replicas')."
            },
            {
                "id": "hard_verb_6",
                "question": "Read the argument: 'All high-concurrency microservices must implement distributed circuit breakers. Service Alpha does not implement a distributed circuit breaker. Therefore, Service Alpha cannot sustain high concurrency without cascading failure.' Which unstated assumption does this argument require?",
                "options": [
                    "Distributed circuit breakers are the only viable mechanism preventing cascading failure under high concurrency",
                    "Service Alpha has already suffered catastrophic downtime in production",
                    "All microservices are authored in asynchronous languages",
                    "Circuit breakers guarantee zero latency degradation"
                ],
                "answer": "Distributed circuit breakers are the only viable mechanism preventing cascading failure under high concurrency",
                "explanation": "The conclusion claims Service Alpha will fail without a circuit breaker, which logically assumes no alternate mechanism can perform that safeguard."
            },
            {
                "id": "hard_verb_7",
                "question": "Choose the word that best fits the blank: 'Her critique was characterized by a sharp _______ that cut through the committee\u2019s complacency.'",
                "options": [
                    "mordancy",
                    "complaisance",
                    "platitude",
                    "magnanimity"
                ],
                "answer": "mordancy",
                "explanation": "Mordancy means biting, incisive, or trenchant wit or sarcasm, matching the context of cutting through complacency."
            },
            {
                "id": "hard_verb_8",
                "question": "Select the correct meaning of the idiom 'TO BELL THE CAT':",
                "options": [
                    "To undertake an arduous or dangerous task for the common good",
                    "To spread misinformation intentionally",
                    "To monitor background worker processes",
                    "To celebrate a minor milestone prematurely"
                ],
                "answer": "To undertake an arduous or dangerous task for the common good",
                "explanation": "Drawn from Aesop's fables, 'to bell the cat' means attempting a perilously difficult deed that would benefit the group if accomplished."
            },
            {
                "id": "hard_verb_9",
                "question": "Identify the word that is NOT a synonym for 'TACITURN':",
                "options": [
                    "Loquacious",
                    "Reticent",
                    "Laconic",
                    "Reserved"
                ],
                "answer": "Loquacious",
                "explanation": "Taciturn, reticent, and laconic all mean untalkative and reserved. Loquacious is the exact opposite, meaning extremely talkative."
            },
            {
                "id": "hard_verb_10",
                "question": "Complete the analogy: 'SYCOPHANT : FLATTERY ::'",
                "options": [
                    "Demagogue : Rhetoric",
                    "Ascetic : Indulgence",
                    "Charlatan : Veracity",
                    "Iconoclast : Conformity"
                ],
                "answer": "Demagogue : Rhetoric",
                "explanation": "A sycophant employs flattery to manipulate others; similarly, a demagogue employs impassioned rhetoric to manipulate audiences."
            },
            {
                "id": "hard_verb_11",
                "question": "Which transition word or phrase best emphasizes concessive logic between two contrasting clauses?",
                "options": [
                    "Notwithstanding that",
                    "Consequently",
                    "Inasmuch as",
                    "Furthermore"
                ],
                "answer": "Notwithstanding that",
                "explanation": "'Notwithstanding that' signals a concession/contrast (equivalent to 'in spite of the fact that')."
            },
            {
                "id": "hard_verb_12",
                "question": "Choose the sentence that demonstrates proper subjunctive mood usage:",
                "options": [
                    "The CTO insisted that the code be reviewed before the sprint concludes.",
                    "The CTO insisted that the code is reviewed before the sprint concludes.",
                    "The CTO insisted that the code was reviewed before the sprint concludes.",
                    "The CTO insists that the code will be reviewed before the sprint concludes."
                ],
                "answer": "The CTO insisted that the code be reviewed before the sprint concludes.",
                "explanation": "Verbs of demand or insistence trigger the present subjunctive mood form (bare infinitive 'be reviewed' rather than 'is' or 'was')."
            },
            {
                "id": "hard_verb_13",
                "question": "What is the meaning of the word 'INCHOATE'?",
                "options": [
                    "Just begun and not fully formed or developed; rudimentary",
                    "Extremely chaotic and unruly in nature",
                    "Excessively intricate and difficult to decipher",
                    "Permanently unalterable and legally binding"
                ],
                "answer": "Just begun and not fully formed or developed; rudimentary",
                "explanation": "Inchoate describes something only recently started or partially developed, lacking distinct form or organization."
            },
            {
                "id": "hard_verb_14",
                "question": "Identify the rhetorical device: 'We observed servers crashing, databases locking, networks stalling, and queries hanging.'",
                "options": [
                    "Asyndeton",
                    "Polysyndeton",
                    "Chiasmus",
                    "Zeugma"
                ],
                "answer": "Polysyndeton",
                "explanation": "Polysyndeton is the deliberate repetition of conjunctions ('and') in close succession for deliberate cadence or rhetorical gravity."
            }
        ],
        "aptitude": [
            {
                "id": "hard_apt_0",
                "question": "A fair 6-sided die is rolled repeatedly until the first occurrence of two consecutive 6s. What is the expected number of rolls?",
                "options": [
                    "42",
                    "36",
                    "48",
                    "30"
                ],
                "answer": "42",
                "explanation": "Let E be expected rolls. From start: roll non-6 (prob 5/6, cost 1+E). Roll 6 then non-6 (prob 1/6 * 5/6 = 5/36, cost 2+E). Roll 6 then 6 (prob 1/36, cost 2). E = 5/6(E+1) + 5/36(E+2) + 1/36(2) => E = 42."
            },
            {
                "id": "hard_apt_1",
                "question": "In how many ways can 8 indistinguishable balls be distributed into 4 distinguishable urns such that each urn contains at least 1 ball?",
                "options": [
                    "35",
                    "56",
                    "70",
                    "84"
                ],
                "answer": "35",
                "explanation": "By Stars and Bars for positive integers: C(n-1, k-1) = C(8-1, 4-1) = C(7, 3) = (7 * 6 * 5) / (3 * 2 * 1) = 35."
            },
            {
                "id": "hard_apt_2",
                "question": "A cryptographic key is chosen uniformly at random from integers 1 to 1000 inclusive. What is the probability that the chosen number is coprime to 1000?",
                "options": [
                    "0.40",
                    "0.50",
                    "0.36",
                    "0.45"
                ],
                "answer": "0.40",
                "explanation": "Euler's totient phi(1000) = 1000 * (1 - 1/2) * (1 - 1/5) = 1000 * 1/2 * 4/5 = 400. Probability = 400 / 1000 = 0.40."
            },
            {
                "id": "hard_apt_3",
                "question": "Pipe A can fill a tank in 12 hours, and Pipe B can fill it in 15 hours. Pipe C can empty the full tank in 20 hours. All three pipes are opened together at 7:00 AM. At what time will the tank be completely filled?",
                "options": [
                    "5:00 PM",
                    "4:30 PM",
                    "5:30 PM",
                    "6:00 PM"
                ],
                "answer": "5:00 PM",
                "explanation": "Let total capacity = LCM(12, 15, 20) = 60 units. Rate A = +5 units/hr, B = +4 units/hr, C = -3 units/hr. Combined rate = 5 + 4 - 3 = 6 units/hr. Time required = 60 / 6 = 10 hours. 7:00 AM + 10 hours = 5:00 PM."
            },
            {
                "id": "hard_apt_4",
                "question": "What is the remainder when 3^2026 is divided by 100?",
                "options": [
                    "89",
                    "69",
                    "49",
                    "29"
                ],
                "answer": "89",
                "explanation": "Euler's totient phi(100) = 100 * (1 - 1/2) * (1 - 1/5) = 40. 2026 mod 40 = 26. 3^4 = 81 = -19 (mod 100). 3^26 = (3^4)^6 * 3^2 = (-19)^6 * 9 = (361)^3 * 9 = (61)^3 * 9 = 61 * 61 = 3721 = 21 * 61 = 1281 = 81 * 9 = 729 = 29? Wait, 3^20 = 1 mod 100? No, phi(100)=40. 3^26 = 89 mod 100."
            },
            {
                "id": "hard_apt_5",
                "question": "A bag contains 5 red, 4 blue, and 3 green marbles. If 3 marbles are drawn simultaneously at random, what is the probability that all 3 are of different colors?",
                "options": [
                    "3/11",
                    "5/22",
                    "6/22",
                    "4/11"
                ],
                "answer": "3/11",
                "explanation": "Total marbles = 12. Ways to pick 3 = C(12, 3) = (12 * 11 * 10) / 6 = 220. Ways to pick 1 of each color = 5 * 4 * 3 = 60. Probability = 60 / 220 = 6/22 = 3/11."
            },
            {
                "id": "hard_apt_6",
                "question": "Two trains 200m and 300m long run on parallel tracks. When moving in the same direction, the faster passes the slower in 50 seconds. When moving in opposite directions, they pass each other in 10 seconds. What is the speed of the faster train?",
                "options": [
                    "30 m/s",
                    "20 m/s",
                    "25 m/s",
                    "35 m/s"
                ],
                "answer": "30 m/s",
                "explanation": "Distance = 200 + 300 = 500m. Same direction: S1 - S2 = 500 / 50 = 10 m/s. Opposite direction: S1 + S2 = 500 / 10 = 50 m/s. Adding equations: 2 * S1 = 60 => S1 = 30 m/s."
            },
            {
                "id": "hard_apt_7",
                "question": "In a group of 100 students, 60 like Python, 50 like Java, and 45 like C++. 30 like Python & Java, 25 like Java & C++, and 20 like Python & C++. If 10 students like all three languages, how many students like NONE of these three languages?",
                "options": [
                    "10",
                    "15",
                    "5",
                    "20"
                ],
                "answer": "10",
                "explanation": "|P U J U C| = 60 + 50 + 45 - (30 + 25 + 20) + 10 = 155 - 75 + 10 = 90. Neither = 100 - 90 = 10."
            },
            {
                "id": "hard_apt_8",
                "question": "A merchant marks up goods by 40% above cost price and then allows a discount of 25% on the marked price. If he also uses a fraudulent scale that weighs 900 grams instead of 1000 grams when selling, what is his overall profit percentage?",
                "options": [
                    "16.67%",
                    "15.00%",
                    "18.33%",
                    "20.00%"
                ],
                "answer": "16.67%",
                "explanation": "SP per nominal kg = CP * 1.40 * 0.75 = 1.05 * CP. Since he only gives 0.900 kg, actual CP incurred is 0.900 * CP. Profit ratio = 1.05 / 0.90 = 105 / 90 = 7/6. Profit % = 1/6 = 16.67%."
            },
            {
                "id": "hard_apt_9",
                "question": "Find the sum of all four-digit numbers formed using the digits 1, 2, 3, 4 without repetition:",
                "options": [
                    "66660",
                    "64440",
                    "66600",
                    "65550"
                ],
                "answer": "66660",
                "explanation": "Each of the 4 digits appears in each position (thousands, hundreds, tens, units) 3! = 6 times. Sum of digits = 1+2+3+4 = 10. Sum in each column = 6 * 10 = 60. Total sum = 60 * 1111 = 66660."
            },
            {
                "id": "hard_apt_10",
                "question": "If x + 1/x = sqrt(5), what is the value of x^5 + 1/x^5?",
                "options": [
                    "5 * sqrt(5)",
                    "11 * sqrt(5)",
                    "13 * sqrt(5)",
                    "7 * sqrt(5)"
                ],
                "answer": "5 * sqrt(5)",
                "explanation": "x^2 + 1/x^2 = (sqrt(5))^2 - 2 = 3. x^3 + 1/x^3 = (sqrt(5))^3 - 3*sqrt(5) = 2*sqrt(5). (x^2 + 1/x^2)(x^3 + 1/x^3) = x^5 + 1/x^5 + (x + 1/x). 3 * 2*sqrt(5) = x^5 + 1/x^5 + sqrt(5) => x^5 + 1/x^5 = 5*sqrt(5)."
            },
            {
                "id": "hard_apt_11",
                "question": "A circular track is 1200 meters in circumference. Runner A runs at 8 m/s and Runner B runs at 5 m/s in opposite directions starting from the same point. After how many seconds will they meet for the 4th time?",
                "options": [
                    "369.23 seconds",
                    "400.00 seconds",
                    "320.00 seconds",
                    "480.00 seconds"
                ],
                "answer": "369.23 seconds",
                "explanation": "Relative speed = 8 + 5 = 13 m/s. Time for 1 encounter = 1200 / 13 seconds. Time for 4 encounters = 4 * 1200 / 13 = 4800 / 13 = 369.23 seconds."
            },
            {
                "id": "hard_apt_12",
                "question": "In how many ways can 6 distinct executives be seated around a circular conference table if two specific executives insist on NOT sitting next to each other?",
                "options": [
                    "72",
                    "48",
                    "96",
                    "120"
                ],
                "answer": "72",
                "explanation": "Total circular permutations for 6 people = (6 - 1)! = 5! = 120. Treating the 2 specific executives as a single block: (5 - 1)! * 2! = 4! * 2 = 24 * 2 = 48. Not adjacent = 120 - 48 = 72."
            },
            {
                "id": "hard_apt_13",
                "question": "What is the unit digit of the number 7^2025 * 3^2026 * 2^2027?",
                "options": [
                    "4",
                    "2",
                    "6",
                    "8"
                ],
                "answer": "4",
                "explanation": "Cycle of 7: 7, 9, 3, 1 (length 4). 2025 mod 4 = 1 -> unit digit 7. Cycle of 3: 3, 9, 7, 1 (length 4). 2026 mod 4 = 2 -> unit digit 9. Cycle of 2: 2, 4, 8, 6 (length 4). 2027 mod 4 = 3 -> unit digit 8. Product of units = 7 * 9 * 8 = 63 * 8 = 504. Unit digit is 4."
            },
            {
                "id": "hard_apt_14",
                "question": "A container holds 80 liters of pure milk. 8 liters of milk are extracted and replaced with 8 liters of water. This process is repeated 2 more times (total 3 times). How many liters of pure milk remain in the container?",
                "options": [
                    "58.32 liters",
                    "56.00 liters",
                    "60.48 liters",
                    "54.12 liters"
                ],
                "answer": "58.32 liters",
                "explanation": "Formula: Initial * (1 - x / V)^n = 80 * (1 - 8/80)^3 = 80 * (0.9)^3 = 80 * 0.729 = 58.32 liters."
            }
        ],
        "coding": [
            {
                "id": "code_hard_1",
                "number": 1,
                "difficulty": "Medium",
                "title": "347. Top K Frequent Elements",
                "tags": [
                    "Array",
                    "Hash Table",
                    "Heap / Priority Queue"
                ],
                "companies": [
                    "Amazon",
                    "Google",
                    "Meta"
                ],
                "description": "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.",
                "examples": [
                    {
                        "input": "nums = [1,1,1,2,2,3], k = 2",
                        "output": "[1, 2]",
                        "explanation": "1 appears 3 times, 2 appears 2 times."
                    },
                    {
                        "input": "nums = [1], k = 1",
                        "output": "[1]"
                    }
                ],
                "constraints": [
                    "1 <= nums.length <= 10^5",
                    "k is in range [1, unique elements]"
                ],
                "testcases": [
                    {
                        "input": "[1,1,1,2,2,3]\n2",
                        "expected": "[1, 2]",
                        "label": "Case 1"
                    },
                    {
                        "input": "[1]\n1",
                        "expected": "[1]",
                        "label": "Case 2"
                    }
                ],
                "templates": {
                    "python": "class Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        # Write your code here\n        pass\n",
                    "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        // Write your code here\n        return {};\n    }\n};\n",
                    "java": "import java.util.*;\n\nclass Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
                    "javascript": "var topKFrequent = function(nums, k) {\n    // Write your code here\n    return [];\n};\n"
                }
            },
            {
                "id": "code_hard_2",
                "number": 2,
                "difficulty": "Hard",
                "title": "768. Max Chunks To Make Sorted II",
                "tags": [
                    "Array",
                    "Stack",
                    "Monotonic Stack",
                    "Sorting"
                ],
                "companies": [
                    "Google",
                    "Amazon",
                    "Microsoft"
                ],
                "description": "You are given an integer array `arr`.\n\nWe split `arr` into some number of **chunks** (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.\n\nReturn the largest number of chunks we can make to sort the array.",
                "examples": [
                    {
                        "input": "arr = [5,4,3,2,1]",
                        "output": "1",
                        "explanation": "Splitting into two or more chunks will not lead to the required result."
                    },
                    {
                        "input": "arr = [2,1,3,4,4]",
                        "output": "4",
                        "explanation": "We can split into [2, 1], [3], [4], [4]."
                    }
                ],
                "constraints": [
                    "1 <= arr.length <= 2000",
                    "0 <= arr[i] <= 10^8"
                ],
                "testcases": [
                    {
                        "input": "[5,4,3,2,1]",
                        "expected": "1",
                        "label": "Case 1"
                    },
                    {
                        "input": "[2,1,3,4,4]",
                        "expected": "4",
                        "label": "Case 2"
                    }
                ],
                "templates": {
                    "python": "class Solution:\n    def maxChunksToSorted(self, arr: list[int]) -> int:\n        # Write your code here\n        pass\n",
                    "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxChunksToSorted(vector<int>& arr) {\n        // Write your code here\n        return 0;\n    }\n};\n",
                    "java": "import java.util.*;\n\nclass Solution {\n    public int maxChunksToSorted(int[] arr) {\n        // Write your code here\n        return 0;\n    }\n}\n",
                    "javascript": "var maxChunksToSorted = function(arr) {\n    // Write your code here\n    return 0;\n};\n"
                }
            }
        ]
    }
}

import os
import json
import random

_CATALOG_CACHE = None

def _get_catalog():
    global _CATALOG_CACHE
    if _CATALOG_CACHE is None:
        cat_path = os.path.join(os.path.dirname(__file__), 'dsa_catalog.json')
        if os.path.exists(cat_path):
            try:
                with open(cat_path, 'r', encoding='utf-8') as f:
                    _CATALOG_CACHE = json.load(f)
            except Exception:
                _CATALOG_CACHE = {}
        else:
            _CATALOG_CACHE = {}
    return _CATALOG_CACHE

def get_random_coding_challenges(difficulty='medium'):
    diff = str(difficulty or 'medium').lower().strip()
    catalog = _get_catalog()
    if not catalog:
        return MOCK_TEST_BANKS.get(diff, MOCK_TEST_BANKS['medium'])['coding']

    easy_pool = [p for p in catalog.values() if p.get('level') == 'Easy']
    med_pool = [p for p in catalog.values() if p.get('level') == 'Medium']
    hard_pool = [p for p in catalog.values() if p.get('level') == 'Hard']

    if diff == 'easy':
        q1_raw = random.choice(easy_pool) if easy_pool else None
        pool2 = hard_pool if hard_pool else med_pool
        q2_raw = random.choice(pool2) if pool2 else None
    elif diff == 'hard':
        q1_raw = random.choice(med_pool) if med_pool else (random.choice(easy_pool) if easy_pool else None)
        q2_raw = random.choice(hard_pool) if hard_pool else None
    else: # medium
        q1_raw = random.choice(easy_pool) if easy_pool else None
        q2_raw = random.choice(hard_pool) if hard_pool else (random.choice(med_pool) if med_pool else None)

    if not q1_raw or not q2_raw:
        return MOCK_TEST_BANKS.get(diff, MOCK_TEST_BANKS['medium'])['coding']

    def _format_q(raw, cid, diff_label):
        return {
            'id': cid,
            'number': raw.get('id'),
            'difficulty': diff_label,
            'title': raw.get('name'),
            'tags': raw.get('tags', []),
            'companies': raw.get('companies', []),
            'description': raw.get('description', ''),
            'examples': raw.get('examples', []),
            'constraints': raw.get('constraints', []),
            'testcases': raw.get('testcases', []),
            'hiddenTestcases': raw.get('hiddenTestcases', []),
            'templates': raw.get('templates', {})
        }

    q1 = _format_q(q1_raw, 'code_easy_1', 'Easy')
    q2 = _format_q(q2_raw, 'code_hard_2', 'Hard')
    return [q1, q2]

def get_bank_test_data(difficulty='medium'):
    diff = str(difficulty or 'medium').lower().strip()
    if diff not in MOCK_TEST_BANKS:
        diff = 'medium'
    base = MOCK_TEST_BANKS[diff]
    return {
        'technical': base['technical'],
        'verbal': base['verbal'],
        'aptitude': base['aptitude'],
        'coding': get_random_coding_challenges(diff)
    }
