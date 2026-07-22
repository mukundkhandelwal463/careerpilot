export const questionBankData = [
  // ==========================================
  // DATA STRUCTURES & ALGORITHMS (25 Questions)
  // ==========================================
  {
    id: "dsa_01",
    conceptId: "Arrays & Hashing",
    subject: "dsa",
    type: "theoretical",
    question: "What is the worst-case time complexity of inserting a node into a Binary Search Tree (BST)?",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
    answer: "O(n)",
    explanation: "In the worst case, the BST can be skewed (like a linked list), making insertion time proportional to the height of the tree, which is O(n)."
  },
  {
    id: "dsa_02",
    conceptId: "Heap / Priority Queue",
    subject: "dsa",
    type: "numerical",
    question: "What is the time complexity of building a binary heap of size n from an unsorted array using the bottom-up Heapify method?",
    options: ["O(n log n)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(n)",
    explanation: "Building a heap bottom-up takes linear time, O(n), because the work done decreases exponentially as we go up the levels of the tree."
  },
  {
    id: "dsa_03",
    conceptId: "Arrays & Hashing",
    subject: "dsa",
    type: "numerical",
    question: "In a hash table of size 10 using linear probing and hash function h(k) = k mod 10, keys 43, 23, and 13 are inserted. What is the index of key 13?",
    options: ["3", "4", "5", "6"],
    answer: "5",
    explanation: "43 goes to index 3. 23 hashes to 3, collides, and probes to 4. 13 hashes to 3, collides at 3 and 4, and probes to index 5."
  },
  {
    id: "dsa_04",
    conceptId: "Stack",
    subject: "dsa",
    type: "theoretical",
    question: "Which of the following data structures is typically used to implement recursion?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    answer: "Stack",
    explanation: "Recursion uses a system call stack to store execution contexts and activation records in a Last-In-First-Out (LIFO) order."
  },
  {
    id: "dsa_05",
    conceptId: "Sorting",
    subject: "dsa",
    type: "theoretical",
    question: "Which sorting algorithm is stable and has a worst-case time complexity of O(n log n)?",
    options: ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"],
    answer: "Merge Sort",
    explanation: "Merge Sort is a stable sorting algorithm that guarantees O(n log n) worst-case time complexity. Quick Sort is O(n^2) in the worst case, and Heap Sort is unstable."
  },
  {
    id: "dsa_06",
    conceptId: "Trees",
    subject: "dsa",
    type: "numerical",
    question: "How many null pointers exist in a binary tree with n nodes?",
    options: ["n", "n + 1", "n - 1", "2n"],
    answer: "n + 1",
    explanation: "A binary tree with n nodes has 2n pointers. Since there are n-1 edges connecting nodes, the number of null pointers is 2n - (n - 1) = n + 1."
  },
  {
    id: "dsa_07",
    conceptId: "Sorting",
    subject: "dsa",
    type: "theoretical",
    question: "What is the best-case time complexity of Bubble Sort when the input array is already sorted?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"],
    answer: "O(n)",
    explanation: "With an optimized implementation checking if any swaps occurred in a pass, Bubble Sort can terminate in O(n) time for sorted inputs."
  },
  {
    id: "dsa_08",
    conceptId: "Queues & Deques",
    subject: "dsa",
    type: "numerical",
    question: "A queue is implemented using two stacks. What is the amortized cost per dequeue operation if enqueue is O(1)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(1)",
    explanation: "Each element is pushed to Stack 1, popped from Stack 1, pushed to Stack 2, and popped from Stack 2. Over n operations, this averages to O(1) per operation."
  },
  {
    id: "dsa_09",
    conceptId: "Graphs",
    subject: "dsa",
    type: "theoretical",
    question: "Which graph traversal uses a FIFO queue?",
    options: ["Depth First Search (DFS)", "Breadth First Search (BFS)", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
    answer: "Breadth First Search (BFS)",
    explanation: "BFS explores neighbors level-by-level using a FIFO queue to track discovered vertices."
  },
  {
    id: "dsa_10",
    conceptId: "Graphs",
    subject: "dsa",
    type: "numerical",
    question: "What is the maximum number of edges in a simple undirected graph with n vertices?",
    options: ["n", "n(n - 1)", "n(n - 1) / 2", "2^n"],
    answer: "n(n - 1) / 2",
    explanation: "Every vertex can connect to n-1 other vertices. For undirected graphs, divide by 2 to prevent double-counting edges: n(n - 1) / 2."
  },
  {
    id: "dsa_11",
    conceptId: "1-D DP",
    subject: "dsa",
    type: "theoretical",
    question: "What does the dynamic programming technique utilize to avoid redundant work?",
    options: ["Recursion only", "Divide and conquer", "Memoization / Tabulation", "Greedy choice"],
    answer: "Memoization / Tabulation",
    explanation: "Dynamic programming stores the results of subproblems in a table (memoization or tabulation) to prevent resolving them repeatedly."
  },
  {
    id: "dsa_12",
    conceptId: "Trees",
    subject: "dsa",
    type: "numerical",
    question: "What is the height of a balanced AVL tree with n nodes?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(log n)",
    explanation: "AVL trees maintain strict height balancing (difference <= 1), keeping the tree height bounded to O(log n)."
  },
  {
    id: "dsa_13",
    conceptId: "Binary Search Tree (BST)",
    subject: "dsa",
    type: "theoretical",
    question: "Which traversal of a Binary Search Tree (BST) yields elements in sorted ascending order?",
    options: ["Pre-order", "In-order", "Post-order", "Level-order"],
    answer: "In-order",
    explanation: "In-order traversal visits left child, root, and then right child. For a BST, this outputs keys in sorted ascending order."
  },
  {
    id: "dsa_14",
    conceptId: "Heap / Priority Queue",
    subject: "dsa",
    type: "numerical",
    question: "In a min-heap with 7 elements, what is the index of the second smallest element if 0-indexed?",
    options: ["1 or 2", "0", "3 or 4", "Any leaf index"],
    answer: "1 or 2",
    explanation: "The minimum element is at the root (index 0). The second minimum must be one of its direct children (index 1 or index 2)."
  },
  {
    id: "dsa_15",
    conceptId: "Graphs",
    subject: "dsa",
    type: "theoretical",
    question: "Which of the following problems can be solved using Dijkstra's algorithm?",
    options: ["All-pairs shortest path", "Single-source shortest path with positive weights", "Minimum spanning tree", "Single-source shortest path with negative weights"],
    answer: "Single-source shortest path with positive weights",
    explanation: "Dijkstra's algorithm finds single-source shortest paths. It fails on negative weight edges where Bellman-Ford must be used."
  },
  {
    id: "dsa_16",
    conceptId: "Graphs",
    subject: "dsa",
    type: "numerical",
    question: "How many minimum spanning trees does a complete graph with 4 vertices have if all edges have distinct weights?",
    options: ["1", "4", "16", "24"],
    answer: "1",
    explanation: "If all edge weights in a connected graph are distinct, the graph has exactly one unique minimum spanning tree (MST)."
  },
  {
    id: "dsa_17",
    conceptId: "Arrays & Hashing",
    subject: "dsa",
    type: "theoretical",
    question: "Which hashing collision resolution technique keeps all colliding elements in the same index using linked lists?",
    options: ["Linear Probing", "Quadratic Probing", "Chaining", "Double Hashing"],
    answer: "Chaining",
    explanation: "Separate chaining handles collisions by creating a linked list of entries at the same index slot."
  },
  {
    id: "dsa_18",
    conceptId: "Trees",
    subject: "dsa",
    type: "numerical",
    question: "What is the time complexity of searching for an element in a balanced Red-Black Tree of size n?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(log n)",
    explanation: "Like AVL trees, Red-Black trees maintain logarithmic height, ensuring search operations complete in O(log n) worst-case time."
  },
  {
    id: "dsa_19",
    conceptId: "String",
    subject: "dsa",
    type: "theoretical",
    question: "Which string matching algorithm uses a prefix table (pi-array) to skip redundant comparisons?",
    options: ["Rabin-Karp", "Knuth-Morris-Pratt (KMP)", "Boyer-Moore", "Naive string search"],
    answer: "Knuth-Morris-Pratt (KMP)",
    explanation: "The KMP algorithm precomputes a prefix table (LPS/pi array) to avoid matching characters that have already been matched."
  },
  {
    id: "dsa_20",
    conceptId: "Trees",
    subject: "dsa",
    type: "numerical",
    question: "If a binary tree has 8 leaf nodes, how many nodes in the tree have exactly two children?",
    options: ["7", "8", "9", "Cannot be determined"],
    answer: "7",
    explanation: "For any binary tree, the number of leaf nodes (L) is related to the number of nodes with two children (D) by the formula: L = D + 1. Thus, D = 8 - 1 = 7."
  },
  {
    id: "dsa_21",
    conceptId: "Sorting",
    subject: "dsa",
    type: "theoretical",
    question: "Which of the following sorting algorithms is NOT in-place?",
    options: ["Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
    answer: "Merge Sort",
    explanation: "Merge Sort requires O(n) auxiliary space to merge sub-arrays, meaning it is not an in-place sorting algorithm."
  },
  {
    id: "dsa_22",
    conceptId: "Arrays & Hashing",
    subject: "dsa",
    type: "numerical",
    question: "Given a 1D array of size 100 starting at address 1000. If each element takes 4 bytes, what is the address of array[25] in a 0-indexed array?",
    options: ["1100", "1025", "1075", "1125"],
    answer: "1100",
    explanation: "Address of array[i] = Base + i * size = 1000 + 25 * 4 = 1100."
  },
  {
    id: "dsa_23",
    conceptId: "Linked List",
    subject: "dsa",
    type: "theoretical",
    question: "What is the primary advantage of a Doubly Linked List over a Singly Linked List?",
    options: ["Requires less memory", "Allows faster traversal in both directions", "Faster element insertion at head", "Simpler node struct implementation"],
    answer: "Allows faster traversal in both directions",
    explanation: "Each node in a doubly linked list contains a pointer to both the next and the previous node, allowing bidirectional traversal."
  },
  {
    id: "dsa_24",
    conceptId: "Trees",
    subject: "dsa",
    type: "numerical",
    question: "What is the maximum height of a binary tree with 15 nodes?",
    options: ["3", "4", "14", "15"],
    answer: "14",
    explanation: "In a 0-based height system, the maximum height of a tree with n nodes is n-1 (occurring in a skewed chain). Height = 15 - 1 = 14."
  },
  {
    id: "dsa_25",
    conceptId: "Graphs",
    subject: "dsa",
    type: "theoretical",
    question: "Which algorithm uses the greedy approach to find the minimum spanning tree of a graph by selecting edges sorted by weight?",
    options: ["Dijkstra's Algorithm", "Prim's Algorithm", "Kruskal's Algorithm", "Floyd-Warshall Algorithm"],
    answer: "Kruskal's Algorithm",
    explanation: "Kruskal's sorting-based edge choice constructs the Minimum Spanning Tree using a transient-set (Union-Find) data structure."
  },

  // ==========================================
  // OBJECT-ORIENTED PROGRAMMING (25 Questions)
  // ==========================================
  {
    id: "oops_01",
    conceptId: "encapsulation",
    subject: "oops",
    type: "theoretical",
    question: "Which OOP pillar is described as wrapping data members and methods into a single unit?",
    options: ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"],
    answer: "Encapsulation",
    explanation: "Encapsulation binds code and the data it manipulates into a class template, protecting it from unauthorized outside access."
  },
  {
    id: "oops_02",
    conceptId: "inheritance",
    subject: "oops",
    type: "theoretical",
    question: "Which feature of OOP allows a class to acquire the properties and behavior of another class?",
    options: ["Abstraction", "Inheritance", "Polymorphism", "Dynamic Binding"],
    answer: "Inheritance",
    explanation: "Inheritance allows subclasses to reuse and extend code defined in parent (base) classes."
  },
  {
    id: "oops_03",
    conceptId: "classes_objects",
    subject: "oops",
    type: "numerical",
    question: "In C++, what is the typical size of an object instantiated from an empty class?",
    options: ["0 bytes", "1 byte", "4 bytes", "8 bytes"],
    answer: "1 byte",
    explanation: "C++ allocates at least 1 byte to empty class objects to ensure they have distinct memory addresses."
  },
  {
    id: "oops_04",
    conceptId: "polymorphism",
    subject: "oops",
    type: "theoretical",
    question: "What mechanism is used to implement runtime polymorphism in C++?",
    options: ["Function overloading", "Templates", "Virtual functions", "Friend classes"],
    answer: "Virtual functions",
    explanation: "Virtual functions resolved through Virtual Tables (vtables) enable dynamic dispatch of subclass overrides at runtime."
  },
  {
    id: "oops_05",
    conceptId: "interfaces_abstract_classes",
    subject: "oops",
    type: "theoretical",
    question: "Which of the following is true regarding Java interfaces?",
    options: ["Supports multiple inheritance", "Can have instance variables", "Can be instantiated directly", "Cannot have static methods"],
    answer: "Supports multiple inheritance",
    explanation: "While Java classes cannot inherit multiple parent classes directly, they can implement multiple interfaces."
  },
  {
    id: "oops_06",
    conceptId: "interfaces_abstract_classes",
    subject: "oops",
    type: "theoretical",
    question: "What is an abstract class?",
    options: ["A class that cannot be inherited", "A class containing only static variables", "A class designed for instantiation only", "A class containing at least one abstract method that cannot be instantiated"],
    answer: "A class containing at least one abstract method that cannot be instantiated",
    explanation: "Abstract classes contain declarations without implementations, defining interface guidelines for subclasses."
  },
  {
    id: "oops_07",
    conceptId: "inheritance",
    subject: "oops",
    type: "theoretical",
    question: "Which keyword is used in Java to refer to a parent class's constructor or methods?",
    options: ["this", "super", "parent", "base"],
    answer: "super",
    explanation: "In Java, 'super' invokes parent constructors and methods, resolving base class scopes."
  },
  {
    id: "oops_08",
    conceptId: "polymorphism",
    subject: "oops",
    type: "theoretical",
    question: "What does function overloading mean?",
    options: ["Redefining parent methods with same parameters", "Multiple methods with same name but different signatures", "Allowing code to compile faster", "Declaring classes inside functions"],
    answer: "Multiple methods with same name but different signatures",
    explanation: "Overloading defines multiple functions with the same name that differ in parameter count or type."
  },
  {
    id: "oops_09",
    conceptId: "encapsulation",
    subject: "oops",
    type: "theoretical",
    question: "Which access modifier restricts visibility strictly to the declaring class itself?",
    options: ["public", "protected", "private", "default"],
    answer: "private",
    explanation: "Private variables are accessible only within the defining class, protecting internal implementation details."
  },
  {
    id: "oops_10",
    conceptId: "inheritance",
    subject: "oops",
    type: "theoretical",
    question: "What type of inheritance is NOT supported in Java directly for classes?",
    options: ["Single Inheritance", "Hierarchical Inheritance", "Multiple Inheritance", "Multilevel Inheritance"],
    answer: "Multiple Inheritance",
    explanation: "Java does not support multiple inheritance of classes (inheriting multiple classes) to avoid the Diamond Problem."
  },
  {
    id: "oops_11",
    conceptId: "classes_objects",
    subject: "oops",
    type: "theoretical",
    question: "What does the 'friend' keyword do in C++?",
    options: ["Allows any class to access private data", "Grants non-member functions access to private/protected members", "Inherits protected members only", "Creates global constructors"],
    answer: "Grants non-member functions access to private/protected members",
    explanation: "C++ 'friend' declarations bypass standard class access restrictions for designated external functions/classes."
  },
  {
    id: "oops_12",
    conceptId: "constructors_destructors",
    subject: "oops",
    type: "theoretical",
    question: "What is a copy constructor?",
    options: ["A constructor that returns a copy of the class type", "A constructor that initializes an object using another object of the same class", "A constructor that duplicates a compiler process", "A global class initializer"],
    answer: "A constructor that initializes an object using another object of the same class",
    explanation: "Copy constructors copy field values from an existing object to initialize a new instance."
  },
  {
    id: "oops_13",
    conceptId: "constructors_destructors",
    subject: "oops",
    type: "theoretical",
    question: "What is the purpose of a destructor?",
    options: ["To create an instance", "To release resources allocated to an object when it is destroyed", "To copy static references", "To compile nested loops"],
    answer: "To release resources allocated to an object when it is destroyed",
    explanation: "Destructors clean up dynamically allocated memory and release resources when an object goes out of scope."
  },
  {
    id: "oops_14",
    conceptId: "constructors_destructors",
    subject: "oops",
    type: "theoretical",
    question: "Which of the following statements about C++ constructors is true?",
    options: ["They have a return type", "They can be virtual", "They cannot be overloaded", "They are invoked automatically upon object instantiation"],
    answer: "They are invoked automatically upon object instantiation",
    explanation: "Constructors are called automatically when allocating objects. In C++, they cannot be declared virtual."
  },
  {
    id: "oops_15",
    conceptId: "classes_objects",
    subject: "oops",
    type: "theoretical",
    question: "In Python, what represents the implicit reference to the current object instance inside methods?",
    options: ["this", "self", "me", "current"],
    answer: "self",
    explanation: "Python uses 'self' explicitly as the first parameter of instance methods to reference the invoking object."
  },
  {
    id: "oops_16",
    conceptId: "inheritance",
    subject: "oops",
    type: "theoretical",
    question: "What is the Diamond Problem in object-oriented programming?",
    options: ["A memory leak pattern", "Ambiguity when a class inherits from two classes that share a common base class", "Syntax errors in nested class blocks", "Garbage collection exceptions"],
    answer: "Ambiguity when a class inherits from two classes that share a common base class",
    explanation: "If two parent classes override the same base class method, a grandchild class faces ambiguity over which method to run."
  },
  {
    id: "oops_17",
    conceptId: "abstraction",
    subject: "oops",
    type: "theoretical",
    question: "What does Abstraction do?",
    options: ["Displays all details", "Hides implementation details and exposes only essential features", "Speeds up CPU speed", "Creates array partitions"],
    answer: "Hides implementation details and exposes only essential features",
    explanation: "Abstraction hides background complexities, presenting a clean interface for interaction."
  },
  {
    id: "oops_18",
    conceptId: "inheritance",
    subject: "oops",
    type: "theoretical",
    question: "Which keyword prevents a class from being inherited in Java?",
    options: ["static", "final", "const", "abstract"],
    answer: "final",
    explanation: "A class declared as 'final' in Java cannot be subclassed (inherited)."
  },
  {
    id: "oops_19",
    conceptId: "polymorphism",
    subject: "oops",
    type: "theoretical",
    question: "What is dynamic binding?",
    options: ["Linking files at compilation time", "Resolving method calls at runtime rather than compile-time", "Allocating variables in the stack", "Passing parameters by reference"],
    answer: "Resolving method calls at runtime rather than compile-time",
    explanation: "Dynamic (late) binding determines which method implementation to call at runtime based on the actual object type."
  },
  {
    id: "oops_20",
    conceptId: "interfaces_abstract_classes",
    subject: "oops",
    type: "theoretical",
    question: "What type of class cannot be instantiated and must be subclassed to be useful?",
    options: ["Final class", "Abstract class", "Static class", "Concrete class"],
    answer: "Abstract class",
    explanation: "Abstract classes outline interfaces. They cannot be instantiated directly and must be subclassed."
  },
  {
    id: "oops_21",
    conceptId: "encapsulation",
    subject: "oops",
    type: "theoretical",
    question: "In Javascript, how do you declare a private field inside a class?",
    options: ["private myField;", "this._myField;", "Using '#' prefix like #myField;", "var myField;"],
    answer: "Using '#' prefix like #myField;",
    explanation: "Modern JavaScript uses the '#' prefix to enforce class-private variables."
  },
  {
    id: "oops_22",
    conceptId: "class_attributes_methods",
    subject: "oops",
    type: "theoretical",
    question: "What are static methods?",
    options: ["Methods that run inside loops", "Methods that belong to the class rather than any instance", "Methods that can access instance variables directly", "Destructors in Java"],
    answer: "Methods that belong to the class rather than any instance",
    explanation: "Static methods belong to the class template, meaning they can be called without instantiating an object."
  },
  {
    id: "oops_23",
    conceptId: "polymorphism",
    subject: "oops",
    type: "theoretical",
    question: "Which OOP concept is illustrated by 'a base class pointer pointing to a derived class object'?",
    options: ["Encapsulation", "Polymorphism", "Static binding", "Composition"],
    answer: "Polymorphism",
    explanation: "Assigning derived class objects to base class pointers is the foundation of runtime polymorphism."
  },
  {
    id: "oops_24",
    conceptId: "composition_aggregation",
    subject: "oops",
    type: "theoretical",
    question: "What is composition?",
    options: ["Inheriting from multiple parents", "A 'has-a' relationship where one class contains instances of other classes", "Writing code in multiple files", "Compiling programs into binaries"],
    answer: "A 'has-a' relationship where one class contains instances of other classes",
    explanation: "Composition models 'has-a' relationships by nesting object instances as class attributes."
  },
  {
    id: "oops_25",
    conceptId: "inheritance",
    subject: "oops",
    type: "theoretical",
    question: "What is virtual inheritance used for in C++?",
    options: ["To prevent inheritance of static fields", "To solve the Diamond Problem by ensuring only one copy of virtual base class is inherited", "To instantiate interface classes", "To speed up method overrides"],
    answer: "To solve the Diamond Problem by ensuring only one copy of virtual base class is inherited",
    explanation: "Virtual inheritance prevents grandchild classes from inheriting duplicate copies of a grandparent class."
  },

  // ==========================================
  // OPERATING SYSTEMS (25 Questions)
  // ==========================================
  {
    id: "os_01",
    conceptId: "os_process_thread",
    subject: "os",
    type: "theoretical",
    question: "Which of the following is true about a process compared to a thread?",
    options: ["Threads do not share memory segments", "Processes share stack space", "Processes have separate address spaces", "Context switching is faster for processes"],
    answer: "Processes have separate address spaces",
    explanation: "Processes run in isolated address spaces. Threads share the memory space of their parent process."
  },
  {
    id: "os_02",
    conceptId: "os_deadlock",
    subject: "os",
    type: "numerical",
    question: "If there are 3 processes and 4 resources of a single type, and each process needs at most 2 resources, is deadlock possible?",
    options: ["Yes, always", "No, never", "Depends on execution order", "Only if preemption is enabled"],
    answer: "No, never",
    explanation: "Sum of max needs = 3*2 = 6. Since total resources R=4, and R >= Sum(Max Needs) - N + 1 (4 >= 6-3+1 => 4 >= 4), deadlock is impossible."
  },
  {
    id: "os_03",
    conceptId: "os_paging",
    subject: "os",
    type: "numerical",
    question: "A system has a 32-bit physical address space. If the page size is 4 KB, how many page table entries are required for a process's flat page table?",
    options: ["1 Million (2^20)", "4 Million (2^22)", "256 Thousand (2^18)", "64 Thousand (2^16)"],
    answer: "1 Million (2^20)",
    explanation: "Page Size = 4 KB = 2^12 bytes. Number of pages = 2^32 / 2^12 = 2^20 entries (approximately 1 million)."
  },
  {
    id: "os_04",
    conceptId: "os_deadlock",
    subject: "os",
    type: "theoretical",
    question: "What are the four necessary conditions for a deadlock to occur?",
    options: ["Mutual Exclusion, Preemption, Hold & Wait, Circular Wait", "Mutual Exclusion, No Preemption, Hold & Wait, Circular Wait", "Semaphore lock, Preemption, Hold & Wait, Mutual exclusion", "None of the above"],
    answer: "Mutual Exclusion, No Preemption, Hold & Wait, Circular Wait",
    explanation: "These conditions (Coffman conditions) must hold simultaneously for a deadlock to occur."
  },
  {
    id: "os_05",
    conceptId: "os_cpu_scheduling",
    subject: "os",
    type: "numerical",
    question: "A CPU scheduling queue has processes with burst times: P1 (10), P2 (4), P3 (2). Using Non-preemptive Shortest Job First (SJF) at arrival t=0, what is the average waiting time?",
    options: ["2.0 ms", "4.0 ms", "8.0 ms", "2.67 ms"],
    answer: "2.67 ms",
    explanation: "Order of execution: P3 (runs 0-2), P2 (runs 2-6), P1 (runs 6-16). Waiting times: P3=0, P2=2, P1=6. Average = (0 + 2 + 6)/3 = 2.67 ms."
  },
  {
    id: "os_06",
    conceptId: "os_thrashing",
    subject: "os",
    type: "theoretical",
    question: "What is thrashing?",
    options: ["CPU executing operations extremely fast", "An error in directory structure", "Excessive page swapping resulting in low CPU utilization", "A deadlock resolution scheme"],
    answer: "Excessive page swapping resulting in low CPU utilization",
    explanation: "Thrashing occurs when the system spends more time swapping pages in and out than executing tasks."
  },
  {
    id: "os_07",
    conceptId: "os_page_replacement",
    subject: "os",
    type: "numerical",
    question: "A page reference string is: 1, 2, 3, 4, 1. With 3 empty frames using FIFO page replacement, how many page faults occur?",
    options: ["3", "4", "5", "2"],
    answer: "5",
    explanation: "1 -> [1]. 2 -> [1,2]. 3 -> [1,2,3]. 4 -> [2,3,4] (1 evicted). 1 -> [3,4,1] (2 evicted). All reference steps trigger page faults."
  },
  {
    id: "os_08",
    conceptId: "os_disk_scheduling",
    subject: "os",
    type: "numerical",
    question: "For a disk queue: 90, 120, 30. Head is at 50. Using Shortest Seek Time First (SSTF), what is the total head movement?",
    options: ["90 cylinders", "110 cylinders", "130 cylinders", "150 cylinders"],
    answer: "110 cylinders",
    explanation: "Head starts at 50. Closest is 30 (seek = 20). From 30, closest is 90 (seek = 60). From 90, next is 120 (seek = 30). Total seek = 20 + 60 + 30 = 110."
  },
  {
    id: "os_09",
    conceptId: "os_cpu_scheduling",
    subject: "os",
    type: "theoretical",
    question: "Which component of the OS determines which process in the ready queue is allocated to the CPU next?",
    options: ["Long-term scheduler", "Medium-term scheduler", "Short-term scheduler (CPU Scheduler)", "Dispatcher"],
    answer: "Short-term scheduler (CPU Scheduler)",
    explanation: "The short-term scheduler selects from the processes in ready status to execute next."
  },
  {
    id: "os_10",
    conceptId: "os_io_management",
    subject: "os",
    type: "theoretical",
    question: "What is the main advantage of Direct Memory Access (DMA)?",
    options: ["It bypasses CPU caches", "It allows I/O devices to transfer data directly to memory without constant CPU interrupts", "It eliminates physical memory requirements", "It prevents deadlocks"],
    answer: "It allows I/O devices to transfer data directly to memory without constant CPU interrupts",
    explanation: "DMA offloads block data transfers to a dedicated controller, reducing CPU overhead during I/O operations."
  },
  {
    id: "os_11",
    conceptId: "os_paging",
    subject: "os",
    type: "numerical",
    question: "If a system uses 48-bit virtual addresses and a 4 KB page size, how many bits represent the offset?",
    options: ["12 bits", "36 bits", "48 bits", "8 bits"],
    answer: "12 bits",
    explanation: "Page Size = 4 KB = 4096 bytes = 2^12. The offset requires 12 bits, leaving 36 bits for the page number."
  },
  {
    id: "os_12",
    conceptId: "os_page_replacement",
    subject: "os",
    type: "theoretical",
    question: "What is Belady's Anomaly?",
    options: ["Page fault rate increases as frame capacity increases", "Process executes faster with less RAM", "Deadlock occurs only in small processes", "Disk seek time increases with SSTF"],
    answer: "Page fault rate increases as frame capacity increases",
    explanation: "Belady's Anomaly occurs in FIFO page replacement where adding physical frames can increase page faults."
  },
  {
    id: "os_13",
    conceptId: "os_ipc",
    subject: "os",
    type: "theoretical",
    question: "Which of the following is an IPC mechanism that uses shared memory directly?",
    options: ["Pipes", "Sockets", "Shared Memory segments", "Message queues"],
    answer: "Shared Memory segments",
    explanation: "Shared Memory maps a physical memory region into the address spaces of both processes, bypassing kernel copy operations."
  },
  {
    id: "os_14",
    conceptId: "os_cpu_scheduling",
    subject: "os",
    type: "numerical",
    question: "A process starts with CPU burst time of 8ms. In a Round Robin scheduler with quantum = 3ms, how many times is this process preempted?",
    options: ["1 time", "2 times", "3 times", "0 times"],
    answer: "2 times",
    explanation: "Runs 3ms (preempted #1, 5ms left). Runs 3ms (preempted #2, 2ms left). Runs remaining 2ms and terminates. It is preempted exactly 2 times."
  },
  {
    id: "os_15",
    conceptId: "os_process_states",
    subject: "os",
    type: "theoretical",
    question: "Which section of a Process Control Block (PCB) stores the address of the next instruction to execute?",
    options: ["Process ID", "CPU Registers", "Program Counter", "Memory Limits"],
    answer: "Program Counter",
    explanation: "The Program Counter (PC) stores the address of the next instruction to be fetched and executed."
  },
  {
    id: "os_16",
    conceptId: "os_raid",
    subject: "os",
    type: "numerical",
    question: "In a RAID 5 array of 4 disks, each disk has a capacity of 1 TB. What is the usable storage capacity?",
    options: ["4 TB", "3 TB", "2 TB", "1 TB"],
    answer: "3 TB",
    explanation: "RAID 5 usable space is (N - 1) * C = (4 - 1) * 1 TB = 3 TB (1 disk capacity equivalent is reserved for distributed parity)."
  },
  {
    id: "os_17",
    conceptId: "os_mutex_semaphore",
    subject: "os",
    type: "theoretical",
    question: "What is a mutex?",
    options: ["A non-blocking queue", "A locking mechanism used to synchronize access to a resource", "An I/O scheduling algorithm", "A virtual memory frame"],
    answer: "A locking mechanism used to synchronize access to a resource",
    explanation: "A Mutex (mutual exclusion) is a binary lock that ensures only one thread can access a critical section at a time."
  },
  {
    id: "os_18",
    conceptId: "os_segmentation",
    subject: "os",
    type: "numerical",
    question: "A segment table has base = 1400 and limit = 300 for segment 0. What physical address corresponds to segment 0, offset 150?",
    options: ["1550", "1400", "1700", "Segmentation Fault"],
    answer: "1550",
    explanation: "Offset (150) is less than limit (300). Physical address = base + offset = 1400 + 150 = 1550."
  },
  {
    id: "os_19",
    conceptId: "os_page_replacement",
    subject: "os",
    type: "theoretical",
    question: "Which of the following is NOT a dynamic page replacement algorithm?",
    options: ["FIFO", "LRU", "Optimal (OPT)", "Round Robin"],
    answer: "Round Robin",
    explanation: "Round Robin is a CPU scheduling algorithm, not a page replacement algorithm."
  },
  {
    id: "os_20",
    conceptId: "os_paging",
    subject: "os",
    type: "numerical",
    question: "A system has a page fault service time of 8 ms and a memory access time of 200 ns. If page fault rate is 1 in 10,000, what is the effective access time?",
    options: ["1000 ns", "200 ns", "800 ns", "1000 ns (approx)"],
    answer: "1000 ns (approx)",
    explanation: "EAT = (1-p)*200ns + p*8ms. p = 0.0001. EAT = 0.9999*200ns + 0.0001*8,000,000ns = 200ns + 800ns = 1000 ns."
  },
  {
    id: "os_21",
    conceptId: "os_critical_section",
    subject: "os",
    type: "theoretical",
    question: "What is the critical section?",
    options: ["A code block that must be executed in minimum time", "A code segment that accesses shared resources that must not be concurrently accessed by multiple threads", "The main execution path of a process", "Memory space reserved for OS Kernel"],
    answer: "A code segment that accesses shared resources that must not be concurrently accessed by multiple threads",
    explanation: "The critical section is a code block accessing shared mutable data. Access must be serialized to prevent race conditions."
  },
  {
    id: "os_22",
    conceptId: "os_file_system",
    subject: "os",
    type: "numerical",
    question: "What is the maximum number of file allocation blocks accessible using a 12-bit FAT entry?",
    options: ["4096", "1024", "2048", "65536"],
    answer: "4096",
    explanation: "A 12-bit entry can index up to 2^12 = 4096 unique blocks."
  },
  {
    id: "os_23",
    conceptId: "os_file_system",
    subject: "os",
    type: "theoretical",
    question: "Which directory structure prevents duplicate directory loops but allows files to be shared across multiple directories?",
    options: ["Single-level directory", "Two-level directory", "Acyclic Graph directory", "General Graph directory"],
    answer: "Acyclic Graph directory",
    explanation: "An Acyclic Graph directory structure allows shared directories and files without creating cycles (loops)."
  },
  {
    id: "os_24",
    conceptId: "os_disk_scheduling",
    subject: "os",
    type: "numerical",
    question: "Using SCAN disk scheduling on tracks 0-199. Head is at 50 moving towards 0. Queue: 90, 30. What is total seek distance?",
    options: ["50 cylinders", "140 cylinders", "110 cylinders", "80 cylinders"],
    answer: "140 cylinders",
    explanation: "Moves 50 -> 30 -> 0 (seek = 50). Reverses direction at 0 and goes to 90 (seek = 90). Total seek = 50 + 90 = 140."
  },
  {
    id: "os_25",
    conceptId: "os_virtual_memory",
    subject: "os",
    type: "theoretical",
    question: "What is the function of the swap space in an operating system?",
    options: ["To store user profile records", "To cache DNS values", "To act as an extension of RAM on secondary storage", "To back up file system registries"],
    answer: "To act as an extension of RAM on secondary storage",
    explanation: "Swap space on disk acts as a temporary overflow area for RAM pages when memory demands exceed physical capacity."
  },

  // ==========================================
  // COMPUTER NETWORKS (25 Questions)
  // ==========================================
  {
    id: "cn_01",
    conceptId: "cn_osi_model",
    subject: "cn",
    type: "theoretical",
    question: "Which layer of the OSI model handles routing, logical addressing, and path determination?",
    options: ["Transport Layer", "Network Layer", "Data Link Layer", "Physical Layer"],
    answer: "Network Layer",
    explanation: "The Network Layer manages routing and packet forwarding using IP addresses."
  },
  {
    id: "cn_02",
    conceptId: "cn_subnetting",
    subject: "cn",
    type: "numerical",
    question: "Given a subnet mask of 255.255.255.224, how many usable host addresses are available per subnet?",
    options: ["32", "30", "16", "14"],
    answer: "30",
    explanation: "255.255.255.224 corresponds to a /27 subnet mask. Usable hosts = (2^(32-27)) - 2 = 2^5 - 2 = 30 hosts."
  },
  {
    id: "cn_03",
    conceptId: "cn_network_layer",
    subject: "cn",
    type: "numerical",
    question: "A packet with a TTL of 64 is sent from Host A. It traverses 4 routers before arriving at Host B. What is the TTL of the packet when it leaves the 4th router?",
    options: ["64", "60", "59", "58"],
    answer: "60",
    explanation: "Each router decrements the TTL field by 1. Traversing 4 routers decrements TTL by 4. Remaining TTL = 64 - 4 = 60."
  },
  {
    id: "cn_04",
    conceptId: "cn_tcp_udp",
    subject: "cn",
    type: "theoretical",
    question: "Which protocol is connectionless and does not guarantee packet delivery or ordering?",
    options: ["TCP", "UDP", "HTTP", "FTP"],
    answer: "UDP",
    explanation: "User Datagram Protocol (UDP) is a connectionless transport-layer protocol designed for speed, without reliability overhead."
  },
  {
    id: "cn_05",
    conceptId: "cn_http_https",
    subject: "cn",
    type: "theoretical",
    question: "Which port does HTTPS run on by default?",
    options: ["80", "22", "443", "8080"],
    answer: "443",
    explanation: "HTTP runs on port 80; HTTPS (HTTP over SSL/TLS) runs on port 443 by default."
  },
  {
    id: "cn_06",
    conceptId: "cn_ip_addressing",
    subject: "cn",
    type: "numerical",
    question: "In IPv4 classful addressing, what is the default subnet mask for a Class B network?",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.224"],
    answer: "255.255.0.0",
    explanation: "Class B default subnet mask is 16 bits (255.255.0.0)."
  },
  {
    id: "cn_07",
    conceptId: "cn_arp",
    subject: "cn",
    type: "theoretical",
    question: "What is the primary function of the Address Resolution Protocol (ARP)?",
    options: ["Map domain names to IP addresses", "Map IP addresses to MAC addresses", "Filter incoming packets", "Assign dynamic IP addresses"],
    answer: "Map IP addresses to MAC addresses",
    explanation: "ARP resolves Layer 3 IP addresses to Layer 2 MAC addresses within a local network segment."
  },
  {
    id: "cn_08",
    conceptId: "cn_flow_control",
    subject: "cn",
    type: "numerical",
    question: "A sender transmits frames using Stop-and-Wait protocol. If transmission delay is 1ms and propagation delay is 9ms, what is link efficiency?",
    options: ["5%", "10%", "19%", "5.26%"],
    answer: "5.26%",
    explanation: "Efficiency = Tx / (Tx + 2*Tp) = 1 / (1 + 2*9) = 1 / 19 = 5.26%."
  },
  {
    id: "cn_09",
    conceptId: "cn_dns",
    subject: "cn",
    type: "theoretical",
    question: "Which DNS query type demands that the queried name server resolve the request completely, returning the final IP address?",
    options: ["Iterative query", "Recursive query", "Reverse query", "Authoritative query"],
    answer: "Recursive query",
    explanation: "A recursive query requires the queried DNS resolver to find the IP address itself, forwarding queries to other servers as needed."
  },
  {
    id: "cn_10",
    conceptId: "cn_flow_control",
    subject: "cn",
    type: "theoretical",
    question: "What mechanism is used in TCP to handle flow control?",
    options: ["Three-way handshake", "Sliding Window", "Slow Start", "Dijkstra's Algorithm"],
    answer: "Sliding Window",
    explanation: "TCP uses a sliding window protocol to throttle transmission speed matching the receiver's available buffer space."
  },
  {
    id: "cn_11",
    conceptId: "cn_ip_addressing",
    subject: "cn",
    type: "numerical",
    question: "How many bits are in an IPv6 address?",
    options: ["32 bits", "64 bits", "128 bits", "256 bits"],
    answer: "128 bits",
    explanation: "IPv6 addresses are 128 bits long (four times larger than the 32-bit IPv4 address)."
  },
  {
    id: "cn_12",
    conceptId: "cn_routing_protocols",
    subject: "cn",
    type: "theoretical",
    question: "Which BGP routing protocol category routes traffic between Autonomous Systems (AS)?",
    options: ["Interior BGP (iBGP)", "Exterior BGP (eBGP)", "OSPF", "RIP"],
    answer: "Exterior BGP (eBGP)",
    explanation: "eBGP is used to route traffic and exchange routing updates between different Autonomous Systems."
  },
  {
    id: "cn_13",
    conceptId: "cn_subnetting",
    subject: "cn",
    type: "numerical",
    question: "If a /24 network is subnetted into /26 subnets, how many subnets are created?",
    options: ["2", "4", "8", "16"],
    answer: "4",
    explanation: "Borrowing bits = 26 - 24 = 2 bits. Total subnets = 2^2 = 4 subnets."
  },
  {
    id: "cn_14",
    conceptId: "cn_dhcp",
    subject: "cn",
    type: "theoretical",
    question: "Which protocol automatically assigns IP addresses to devices joining a network?",
    options: ["DNS", "DHCP", "ARP", "NAT"],
    answer: "DHCP",
    explanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses, subnet masks, and gateway values to network hosts."
  },
  {
    id: "cn_15",
    conceptId: "cn_3way_handshake",
    subject: "cn",
    type: "numerical",
    question: "What is the TCP connection handshake packet sequence?",
    options: ["SYN -> ACK -> SYN-ACK", "SYN -> SYN-ACK -> ACK", "SYN -> ACK -> DATA", "CONNECT -> ACCEPT -> ESTABLISHED"],
    answer: "SYN -> SYN-ACK -> ACK",
    explanation: "The TCP 3-way handshake sequence is Client SYN, Server SYN-ACK, and Client ACK."
  },
  {
    id: "cn_16",
    conceptId: "cn_nat",
    subject: "cn",
    type: "theoretical",
    question: "What is NAT overload (PAT) used for?",
    options: ["Encrypting local network files", "Mapping multiple private IPs to a single public IP using different source ports", "Increasing subnet sizes dynamically", "Routing packets based on link speed"],
    answer: "Mapping multiple private IPs to a single public IP using different source ports",
    explanation: "PAT (Port Address Translation) maps multiple private IPs to a single public IP by modifying TCP/UDP source ports."
  },
  {
    id: "cn_17",
    conceptId: "cn_flow_control",
    subject: "cn",
    type: "numerical",
    question: "If bandwidth is 10 Mbps and propagation delay is 20ms, what is the Bandwidth-Delay Product (BDP)?",
    options: ["200,000 bits", "400,000 bits", "20,000 bits", "2,000,000 bits"],
    answer: "200,000 bits",
    explanation: "BDP = Bandwidth * One-way Delay = 10 * 10^6 * 0.02 = 200,000 bits."
  },
  {
    id: "cn_18",
    conceptId: "cn_osi_model",
    subject: "cn",
    type: "theoretical",
    question: "Which layer of the OSI model encrypts and decrypts payloads (like SSL/TLS operations)?",
    options: ["Application Layer", "Presentation Layer", "Session Layer", "Transport Layer"],
    answer: "Presentation Layer",
    explanation: "The Presentation Layer handles syntax representations, data encryption, compression, and decryption."
  },
  {
    id: "cn_19",
    conceptId: "cn_subnetting",
    subject: "cn",
    type: "numerical",
    question: "What is the subnet address for Host 192.168.1.55 with subnet mask 255.255.255.240 (/28)?",
    options: ["192.168.1.0", "192.168.1.32", "192.168.1.48", "192.168.1.64"],
    answer: "192.168.1.48",
    explanation: "Subnets go in steps of 16 (256-240). Subnet boundaries: 0, 16, 32, 48, 64. 55 falls in the 192.168.1.48 subnet."
  },
  {
    id: "cn_20",
    conceptId: "cn_routing_protocols",
    subject: "cn",
    type: "theoretical",
    question: "Which routing protocol uses Dijkstra's link-state algorithm?",
    options: ["RIP", "BGP", "OSPF", "NAT"],
    answer: "OSPF",
    explanation: "OSPF (Open Shortest Path First) is a link-state routing protocol that uses Dijkstra's algorithm to calculate shortest paths."
  },
  {
    id: "cn_21",
    conceptId: "cn_physical_layer",
    subject: "cn",
    type: "numerical",
    question: "What is the maximum data rate possible on a noiseless 3 kHz channel sending binary signals?",
    options: ["3000 bps", "6000 bps", "9000 bps", "12000 bps"],
    answer: "6000 bps",
    explanation: "By Nyquist Theorem, Capacity = 2 * Bandwidth * log2(L) = 2 * 3000 * log2(2) = 6000 bps."
  },
  {
    id: "cn_22",
    conceptId: "cn_physical_layer",
    subject: "cn",
    type: "theoretical",
    question: "What is the purpose of the MAC address?",
    options: ["To identify subnets logically", "To identify a network interface controller (NIC) uniquely on a local link", "To route packets across Autonomous Systems", "To manage TCP sequence numbers"],
    answer: "To identify a network interface controller (NIC) uniquely on a local link",
    explanation: "MAC addresses are physical hardware identifiers burned into the NIC, used for local link node-to-node delivery."
  },
  {
    id: "cn_23",
    conceptId: "cn_dns",
    subject: "cn",
    type: "numerical",
    question: "What is the port number for DNS queries?",
    options: ["80", "53", "25", "110"],
    answer: "53",
    explanation: "Domain Name System (DNS) queries run on port 53 (usually over UDP)."
  },
  {
    id: "cn_24",
    conceptId: "cn_arp",
    subject: "cn",
    type: "theoretical",
    question: "Which of the following describes ARP Spoofing?",
    options: ["Sending redundant ICMP ping packets", "Sending fake ARP replies to bind an attacker's MAC address with a target gateway IP", "Scanning ports of a router", "Exhausting DHCP IP addresses"],
    answer: "Sending fake ARP replies to bind an attacker's MAC address with a target gateway IP",
    explanation: "ARP Spoofing redirects victim network traffic through the attacker's network card by sending forged ARP responses."
  },
  {
    id: "cn_25",
    conceptId: "cn_data_link",
    subject: "cn",
    type: "theoretical",
    question: "What does the sliding window protocol's 'selective repeat' variation do when a packet is lost?",
    options: ["Retransmit all packets from the lost packet onward", "Retransmit only the specific lost packet", "Tear down connection immediately", "Ignore the loss and proceed"],
    answer: "Retransmit only the specific lost packet",
    explanation: "Selective Repeat buffers out-of-order packets and requests retransmission of only the specific frame that was lost or corrupted."
  },
  // ==========================================
  // DATABASE MANAGEMENT SYSTEMS (25 Questions)
  // ==========================================
  {
    id: "dbms_01",
    conceptId: "dbms_rdbms_basics",
    subject: "dbms",
    type: "theoretical",
    question: "Which of the following database engines is an open-source object-relational database system (ORDBMS)?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    answer: "PostgreSQL",
    explanation: "PostgreSQL is a powerful, open-source object-relational database system (ORDBMS) that supports both relational SQL and non-relational JSON queries."
  },
  {
    id: "dbms_02",
    conceptId: "dbms_keys",
    subject: "dbms",
    type: "theoretical",
    question: "What is a minimal superkey called?",
    options: ["Primary Key", "Foreign Key", "Candidate Key", "Unique Key"],
    answer: "Candidate Key",
    explanation: "A Candidate Key is a minimal superkey, meaning it is a set of attributes that uniquely identifies tuples, and no proper subset of it can do so."
  },
  {
    id: "dbms_03",
    conceptId: "dbms_normalization",
    subject: "dbms",
    type: "numerical",
    question: "A relation R(A, B, C, D) has functional dependencies: A -> B, B -> C, C -> D, D -> A. What is the highest normal form of R?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: "BCNF",
    explanation: "All attributes {A, B, C, D} are candidate keys since there is a circular dependency. Since every determinant is a superkey, R is in BCNF (Boyce-Codd Normal Form)."
  },
  {
    id: "dbms_04",
    conceptId: "dbms_joins",
    subject: "dbms",
    type: "numerical",
    question: "Table A has 5 rows and Table B has 10 rows. How many rows will be in their Cartesian Product (Cross Join)?",
    options: ["15", "5", "50", "0"],
    answer: "50",
    explanation: "A Cross Join yields the Cartesian Product: Size(A) * Size(B) = 5 * 10 = 50 rows."
  },
  {
    id: "dbms_05",
    conceptId: "dbms_indexes",
    subject: "dbms",
    type: "theoretical",
    question: "Which index type stores the actual data rows in the leaf nodes of the index structure itself?",
    options: ["Clustered Index", "Non-Clustered Index", "Hash Index", "Sparse Index"],
    answer: "Clustered Index",
    explanation: "In a Clustered Index, the physical order of data rows is determined by the index key, and leaf nodes contain the actual data rows."
  },
  {
    id: "dbms_06",
    conceptId: "dbms_acid",
    subject: "dbms",
    type: "theoretical",
    question: "Which ACID property guarantees that all database updates in a transaction are either fully committed or fully rolled back?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    answer: "Atomicity",
    explanation: "Atomicity ensures 'all-or-nothing' execution for database transactions."
  },
  {
    id: "dbms_07",
    conceptId: "dbms_transactions",
    subject: "dbms",
    type: "theoretical",
    question: "Which transaction concurrency anomaly occurs when a transaction reads data written by a concurrent uncommitted transaction?",
    options: ["Dirty Read", "Non-repeatable Read", "Phantom Read", "Lost Update"],
    answer: "Dirty Read",
    explanation: "A Dirty Read occurs when a transaction reads uncommitted changes of another transaction that might later roll back."
  },
  {
    id: "dbms_08",
    conceptId: "dbms_locking",
    subject: "dbms",
    type: "theoretical",
    question: "In Two-Phase Locking (2PL), once a transaction releases a lock, what phase does it enter?",
    options: ["Growing Phase", "Shrinking Phase", "Commit Phase", "Locked Phase"],
    answer: "Shrinking Phase",
    explanation: "Under 2PL, a transaction cannot acquire any locks once it releases a lock. The release marks the start of the Shrinking Phase."
  },
  {
    id: "dbms_09",
    conceptId: "dbms_nosql_basics",
    subject: "dbms",
    type: "theoretical",
    question: "According to the CAP Theorem, in the presence of a Network Partition (P), a database system must choose between:",
    options: ["Consistency and Availability", "Concurrency and Durability", "Atomicity and Isolation", "Speed and Security"],
    answer: "Consistency and Availability",
    explanation: "The CAP Theorem states that in the event of a network partition (P), a distributed system must trade off Availability (A) for Consistency (C) or vice-versa."
  },
  {
    id: "dbms_10",
    conceptId: "dbms_mongodb",
    subject: "dbms",
    type: "theoretical",
    question: "MongoDB is categorized as which type of NoSQL database?",
    options: ["Key-Value Store", "Document Store", "Wide-Column Store", "Graph Database"],
    answer: "Document Store",
    explanation: "MongoDB stores data records as BSON (binary JSON) documents, which makes it a Document Store."
  },
  {
    id: "dbms_11",
    conceptId: "dbms_redis",
    subject: "dbms",
    type: "theoretical",
    question: "Which caching pattern writes data to the cache only when there is a cache miss during a read request?",
    options: ["Write-Through", "Write-Back", "Cache-Aside (Lazy Loading)", "Write-Around"],
    answer: "Cache-Aside (Lazy Loading)",
    explanation: "In Cache-Aside, the application queries the cache first. If a miss occurs, it fetches data from the database, writes it to the cache, and returns it."
  },
  {
    id: "dbms_12",
    conceptId: "dbms_rdbms_basics",
    subject: "dbms",
    type: "numerical",
    question: "What is the default port number for a PostgreSQL server?",
    options: ["3306", "5432", "27017", "6379"],
    answer: "5432",
    explanation: "PostgreSQL defaults to port 5432, whereas MySQL defaults to 3306, MongoDB to 27017, and Redis to 6379."
  },
  {
    id: "dbms_13",
    conceptId: "dbms_keys",
    subject: "dbms",
    type: "theoretical",
    question: "A foreign key constraint enforces which type of database integrity?",
    options: ["Entity Integrity", "Referential Integrity", "Domain Integrity", "User-Defined Integrity"],
    answer: "Referential Integrity",
    explanation: "Referential Integrity ensures that relationships between tables remain consistent, preventing orphaned foreign key references."
  },
  {
    id: "dbms_14",
    conceptId: "dbms_normalization",
    subject: "dbms",
    type: "theoretical",
    question: "Which normal form requires removing transitive dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: "3NF",
    explanation: "3NF is achieved when a relation is in 2NF and there are no transitive functional dependencies (i.e. non-prime attributes depending on other non-prime attributes)."
  },
  {
    id: "dbms_15",
    conceptId: "dbms_joins",
    subject: "dbms",
    type: "numerical",
    question: "If Table X has rows with IDs {1, 2, 3} and Table Y has rows with IDs {2, 3, 4}, how many rows are returned by an Inner Join on ID?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    explanation: "Inner Join returns only matching keys: {2, 3}, resulting in exactly 2 rows."
  },
  {
    id: "dbms_16",
    conceptId: "dbms_indexes",
    subject: "dbms",
    type: "theoretical",
    question: "Why are B+ Trees preferred over B-Trees for database disk indexes?",
    options: ["All data points are stored in leaf nodes, allowing faster sequential range scans", "They require less memory", "They have a lower height limit", "B+ Trees do not require keys"],
    answer: "All data points are stored in leaf nodes, allowing faster sequential range scans",
    explanation: "In B+ Trees, leaf nodes are linked sequentially, allowing very fast range scans, whereas B-Tree data is scattered across all tree nodes."
  },
  {
    id: "dbms_17",
    conceptId: "dbms_acid",
    subject: "dbms",
    type: "theoretical",
    question: "Which ACID property guarantees that committed transaction data persists even in the event of a power crash or system failure?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    answer: "Durability",
    explanation: "Durability ensures transaction updates are written to non-volatile storage (like SSD/HDD) to survive crashes."
  },
  {
    id: "dbms_18",
    conceptId: "dbms_transactions",
    subject: "dbms",
    type: "theoretical",
    question: "Which SQL transaction isolation level completely prevents Dirty Reads, Non-repeatable Reads, and Phantom Reads?",
    options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
    answer: "Serializable",
    explanation: "Serializable is the highest isolation level. It serializes transaction access to prevent all concurrency anomalies."
  },
  {
    id: "dbms_19",
    conceptId: "dbms_locking",
    subject: "dbms",
    type: "theoretical",
    question: "What is a deadlock in a database system?",
    options: ["A hardware disc failure", "A cycle of transactions where each is waiting for locks held by others", "A network timeout", "A slow query"],
    answer: "A cycle of transactions where each is waiting for locks held by others",
    explanation: "Deadlock occurs when Transaction A waits for a lock held by Transaction B, while Transaction B waits for a lock held by Transaction A."
  },
  {
    id: "dbms_20",
    conceptId: "dbms_nosql_basics",
    subject: "dbms",
    type: "theoretical",
    question: "Which schema layout properties are associated with NoSQL databases compared to traditional SQL?",
    options: ["Rigid relational tables", "Dynamic, flexible schema models", "Strict normalization", "No join queries allowed at all"],
    answer: "Dynamic, flexible schema models",
    explanation: "NoSQL databases allow flexible schema layouts (key-value, document, graphs, columns) without strict table schemas."
  },
  {
    id: "dbms_21",
    conceptId: "dbms_mongodb",
    subject: "dbms",
    type: "theoretical",
    question: "Which pipeline stage in MongoDB's aggregation framework filters documents matching a specified query criteria?",
    options: ["$project", "$match", "$group", "$filter"],
    answer: "$match",
    explanation: "In MongoDB, '$match' filters the input documents to pass only matching documents to the next pipeline stage."
  },
  {
    id: "dbms_22",
    conceptId: "dbms_redis",
    subject: "dbms",
    type: "numerical",
    question: "What is the typical time complexity of set/get operations in a Redis key-value store?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(1)",
    explanation: "Redis is an in-memory key-value store utilizing hash tables, yielding O(1) time complexity for single key reads and writes."
  },
  {
    id: "dbms_23",
    conceptId: "dbms_rdbms_basics",
    subject: "dbms",
    type: "theoretical",
    question: "In RDBMS, what does referential integrity prevent?",
    options: ["Duplicate columns", "Orphaned rows in child tables", "Slow queries", "Unindexed lookups"],
    answer: "Orphaned rows in child tables",
    explanation: "Referential integrity (enforced by foreign keys) prevents child tables from referencing parent rows that do not exist or have been deleted."
  },
  {
    id: "dbms_24",
    conceptId: "dbms_normalization",
    subject: "dbms",
    type: "numerical",
    question: "If a relation is in BCNF, is it guaranteed to be in 3NF?",
    options: ["Yes, always", "No, never", "Only if it has single-attribute keys", "Only if it is also in 4NF"],
    answer: "Yes, always",
    explanation: "BCNF is a stricter form of 3NF. Any relation in BCNF is also guaranteed to be in 3NF, 2NF, and 1NF."
  },
  {
    id: "dbms_25",
    conceptId: "dbms_joins",
    subject: "dbms",
    type: "theoretical",
    question: "Which type of join returns all rows from the left table, and the matched rows from the right table, filling with NULLs if there is no match?",
    options: ["Inner Join", "Left Outer Join", "Right Outer Join", "Full Outer Join"],
    answer: "Left Outer Join",
    explanation: "Left Outer Join retains all records from the left table, matching records from the right table, and returns NULL for unmatched entries."
  },
  {
    id: "dbms_26",
    conceptId: "dbms_storage_engines",
    subject: "dbms",
    type: "theoretical",
    question: "Which MySQL storage engine is the default and provides ACID transaction support and row-level locking?",
    options: ["MyISAM", "InnoDB", "Memory", "CSV"],
    answer: "InnoDB",
    explanation: "InnoDB is the default transactional storage engine for MySQL, providing ACID transactions, foreign keys, and row-level locking, whereas MyISAM uses table-level locks and does not support transactions."
  },
  {
    id: "dbms_27",
    conceptId: "dbms_storage_engines",
    subject: "dbms",
    type: "numerical",
    question: "If a database page size is 16 KB and a row size is 400 bytes, what is the maximum number of rows that can fit into a single database page (excluding header overhead)?",
    options: ["40", "41", "32", "50"],
    answer: "40",
    explanation: "Rows per page = Page Size / Row Size = 16,384 bytes / 400 bytes = 40.96. Thus, exactly 40 complete rows fit on a single page."
  },
  {
    id: "dbms_28",
    conceptId: "dbms_er_diagrams",
    subject: "dbms",
    type: "theoretical",
    question: "In an Entity-Relationship (ER) diagram, what does a double ellipse represent?",
    options: ["Weak Entity", "Multivalued Attribute", "Key Attribute", "Derived Attribute"],
    answer: "Multivalued Attribute",
    explanation: "A double ellipse represents a multivalued attribute (an attribute that can contain multiple values, e.g. Phone Numbers), whereas a dashed ellipse represents a derived attribute."
  },
  {
    id: "dbms_29",
    conceptId: "dbms_er_diagrams",
    subject: "dbms",
    type: "theoretical",
    question: "What constraint specifies that a subclass entity must belong to at least one subclass in the specialization?",
    options: ["Total Participation Constraint", "Partial Participation Constraint", "Disjoint Constraint", "Overlapping Constraint"],
    answer: "Total Participation Constraint",
    explanation: "The Total Participation (double line) constraint specifies that every entity in the superclass set must participate in the specialization (must belong to at least one subclass)."
  },
  {
    id: "dbms_30",
    conceptId: "dbms_views_ctes",
    subject: "dbms",
    type: "theoretical",
    question: "What is the primary difference between a standard View and a Materialized View?",
    options: ["Standard view can be indexed", "Materialized view physically stores the query result on disk and must be refreshed", "Standard view is stored on disk", "Materialized view contains only metadata"],
    answer: "Materialized View physically stores the query result on disk and must be refreshed",
    explanation: "A standard view is a virtual table containing only the query statement metadata. A materialized view physically caches the query results on disk for speed and must be refreshed when base tables change."
  },
  {
    id: "dbms_31",
    conceptId: "dbms_views_ctes",
    subject: "dbms",
    type: "theoretical",
    question: "Which SQL clause is used to define a Common Table Expression (CTE)?",
    options: ["USING", "WITH", "AS", "HAVING"],
    answer: "WITH",
    explanation: "A Common Table Expression (CTE) is defined using the WITH clause, providing a temporary named result set within a single SELECT, INSERT, UPDATE, or DELETE query."
  },
  {
    id: "dbms_32",
    conceptId: "dbms_procedures_triggers",
    subject: "dbms",
    type: "theoretical",
    question: "Which database trigger type executes once for each modified row during an UPDATE statement?",
    options: ["Statement-level Trigger", "Row-level Trigger", "DDL Trigger", "Instead-Of Trigger"],
    answer: "Row-level Trigger",
    explanation: "A Row-level trigger (defined with FOR EACH ROW) executes once for every row modified by the transaction, whereas a statement-level trigger executes only once per SQL statement."
  },
  {
    id: "dbms_33",
    conceptId: "dbms_procedures_triggers",
    subject: "dbms",
    type: "theoretical",
    question: "In PL/SQL or stored procedures, what database object acts as a pointer to iterate through query result rows one by one?",
    options: ["Index", "Trigger", "Cursor", "View"],
    answer: "Cursor",
    explanation: "A Cursor is a database pointer used to fetch, traverse, and process multi-row query result sets sequentially inside stored procedures."
  },
  {
    id: "dbms_34",
    conceptId: "dbms_storage_engines",
    subject: "dbms",
    type: "theoretical",
    question: "Which index type is commonly built dynamically on top of frequently accessed InnoDB pages to speed up point searches (known as AHI)?",
    options: ["Adaptive Hash Index", "Secondary B+ Tree Index", "Clustered Primary Index", "Inverted Index"],
    answer: "Adaptive Hash Index",
    explanation: "AHI (Adaptive Hash Index) is a feature in MySQL InnoDB that monitors index searches and dynamically builds hash indexes on top of B+ Tree pages for frequently accessed points."
  },
  {
    id: "dbms_35",
    conceptId: "dbms_views_ctes",
    subject: "dbms",
    type: "numerical",
    question: "In a recursive CTE calculating factorial numbers, if the anchor query returns value 1, and the recursive query is 'SELECT n+1 FROM cte WHERE n < 5', how many iterations does the recursive query perform?",
    options: ["5", "4", "6", "3"],
    answer: "4",
    explanation: "Initial state: 1. Iteration 1 (n=1 < 5 -> yields 2). Iteration 2 (n=2 < 5 -> yields 3). Iteration 3 (n=3 < 5 -> yields 4). Iteration 4 (n=4 < 5 -> yields 5). Next check (n=5 < 5 is false) terminates. So it runs exactly 4 iterations."
  },
  {
    id: "sys_01",
    conceptId: "sys_scaling",
    subject: "system_design",
    type: "theoretical",
    question: "What is horizontal scaling (scaling out)?",
    options: ["Adding more CPU/RAM to an existing single server", "Adding more servers/machines to the resource pool", "Using a faster storage controller", "Reducing the server load by turning off services"],
    answer: "Adding more servers/machines to the resource pool",
    explanation: "Horizontal scaling involves adding more machines to the resource pool to distribute traffic, whereas vertical scaling (scaling up) means upgrading resources (CPU/RAM) of a single node."
  },
  {
    id: "sys_02",
    conceptId: "sys_scaling",
    subject: "system_design",
    type: "theoretical",
    question: "Which component is crucial in a horizontally scaled system to distribute incoming HTTP traffic across a pool of application servers?",
    options: ["Database Replication Group", "Load Balancer", "Consistent Hashing Ring", "CDN edge server"],
    answer: "Load Balancer",
    explanation: "A Load Balancer intercepts incoming client traffic and distributes it evenly among available backend application instances to ensure scalability and reliability."
  },
  {
    id: "sys_03",
    conceptId: "sys_caching",
    subject: "system_design",
    type: "theoretical",
    question: "What caching write policy writes updates directly to both the cache and the backing database store synchronously before completing the request?",
    options: ["Write-Around", "Write-Back", "Write-Through", "Cache-Aside"],
    answer: "Write-Through",
    explanation: "Write-Through writes updates to both the cache and database synchronously, ensuring data consistency but incurring high write latency. Write-Back writes to the cache first and updates the database asynchronously."
  },
  {
    id: "sys_04",
    conceptId: "sys_caching",
    subject: "system_design",
    type: "theoretical",
    question: "What cache eviction policy discards the items that haven't been accessed for the longest duration first?",
    options: ["LFU (Least Frequently Used)", "FIFO (First In First Out)", "LRU (Least Recently Used)", "RR (Random Replacement)"],
    answer: "LRU (Least Recently Used)",
    explanation: "LRU (Least Recently Used) keeps track of read/write history and discards the item that has not been accessed for the longest period of time when the cache is full."
  },
  {
    id: "sys_05",
    conceptId: "sys_sharding",
    subject: "system_design",
    type: "theoretical",
    question: "What database sharding issue occurs when a single partition receives a disproportionate amount of read/write traffic due to an uneven distribution key?",
    options: ["Rebalancing issue", "Celebrity/Hotspot Problem", "Split-brain scenario", "Quorum consensus failure"],
    answer: "Celebrity/Hotspot Problem",
    explanation: "The Celebrity or Hotspot problem occurs when keys that are extremely popular (e.g. data relating to a celebrity account) sit on the same shard, overloading that specific partition while others sit idle."
  },
  {
    id: "sys_06",
    conceptId: "sys_sharding",
    subject: "system_design",
    type: "numerical",
    question: "In consistent hashing, if there are 3 physical server nodes and we map them to a ring using 100 virtual nodes per server, what is the total number of points on the consistent hashing ring?",
    options: ["300", "3", "103", "30"],
    answer: "300",
    explanation: "Total points = Physical Servers * Virtual Nodes per Server = 3 * 100 = 300 points on the hash ring."
  },
  {
    id: "sys_07",
    conceptId: "sys_dns_load_balancing",
    subject: "system_design",
    type: "theoretical",
    question: "Which load balancing algorithm sends requests to servers based on their current connection count, preferring nodes with the lowest traffic weight?",
    options: ["Round Robin", "Least Connections", "IP Hash", "Weighted Round Robin"],
    answer: "Least Connections",
    explanation: "The Least Connections algorithm directs requests to the server node with the lowest active connection count, making it highly effective for sessions of variable durations."
  },
  {
    id: "sys_08",
    conceptId: "sys_microservices",
    subject: "system_design",
    type: "theoretical",
    question: "What microservice architectural pattern prevents a failing downstream service from cascading failures and bringing down the entire upstream calling ecosystem?",
    options: ["API Gateway", "Circuit Breaker", "Service Registry", "Distributed Tracing"],
    answer: "Circuit Breaker",
    explanation: "The Circuit Breaker pattern monitors service calls. If failures exceed a threshold, it trips (opens), immediately returning fallback errors without hitting the broken service, protecting downstream systems."
  },
  {
    id: "sys_09",
    conceptId: "sys_messaging_queues",
    subject: "system_design",
    type: "theoretical",
    question: "What is the core difference between Apache Kafka and standard message brokers like RabbitMQ?",
    options: ["RabbitMQ supports pub-sub model only", "Kafka stores messages persistently on a distributed append-only log allowing replay, while RabbitMQ typically deletes messages once acknowledged", "Kafka is single-threaded", "RabbitMQ is faster for large data streams"],
    answer: "Kafka stores messages persistently on a distributed append-only log allowing replay, while RabbitMQ typically deletes messages once acknowledged",
    explanation: "Apache Kafka acts as a distributed log where messages are retained on disk for a configured duration, allowing consumers to replay streams. RabbitMQ is a queue-based broker where messages are popped and cleared upon acknowledgement."
  },
  {
    id: "sys_10",
    conceptId: "sys_consistency_cap",
    subject: "system_design",
    type: "theoretical",
    question: "In the CAP theorem, what does Partition Tolerance (P) guarantee?",
    options: ["The database never splits", "The system continues to function despite arbitrary message loss or system component isolation/partitions", "Every node reads identical values simultaneously", "All writes are replicated to every machine in under 1 second"],
    answer: "The system continues to function despite arbitrary message loss or system component isolation/partitions",
    explanation: "Partition Tolerance means the distributed network continues to operate correctly even if communication lines break or nodes are partitioned from one another."
  },
  {
    id: "sys_11",
    conceptId: "sys_consistency_cap",
    subject: "system_design",
    type: "theoretical",
    question: "According to the PACELC theorem, if there is a partition (P), how does the system choose between (A) and (C); Else (E), how does it choose between what?",
    options: ["Availability (A) and Consistency (C); Else (E) Latency (L) and Consistency (C)", "Availability (A) and Partition Tolerance (P); Else (E) Latency (L) and Throughput (T)", "Authority (A) and Control (C); Else (E) Load (L) and Cost (C)", "Availability (A) and Consistency (C); Else (E) Security (S) and Reliability (R)"],
    answer: "Availability (A) and Consistency (C); Else (E) Latency (L) and Consistency (C)",
    explanation: "PACELC expands CAP: If there is a Partition (P), trade off Availability (A) vs Consistency (C); Else (E), when the system is running normally, trade off Latency (L) vs Consistency (C)."
  },
  {
    id: "sys_12",
    conceptId: "sys_design_patterns",
    subject: "system_design",
    type: "theoretical",
    question: "Which design pattern is used to notify multiple objects automatically about any state changes in a subject they are subscribed to?",
    options: ["Singleton Pattern", "Factory Method Pattern", "Observer Pattern", "Strategy Pattern"],
    answer: "Observer Pattern",
    explanation: "The Observer pattern establishes a one-to-many dependency, so when the state of the subject changes, all subscribers are notified and updated automatically."
  },
  {
    id: "sys_13",
    conceptId: "sys_sharding",
    subject: "system_design",
    type: "theoretical",
    question: "Why does Consistent Hashing minimize data movement when a new database node is added to the system?",
    options: ["It replicates data to every single node", "Only keys mapping to the newly added node are moved, leaving other keys unaffected", "It stops the hashing ring from accepting writes", "It uses secondary indexes to locate keys"],
    answer: "Only keys mapping to the newly added node are moved, leaving other keys unaffected",
    explanation: "In Consistent Hashing, keys are mapped to a ring. Adding or removing a node only impacts keys located between the new node and its counter-clockwise neighbor, leaving the rest of the key allocations intact."
  },
  {
    id: "sys_14",
    conceptId: "sys_dns_load_balancing",
    subject: "system_design",
    type: "theoretical",
    question: "What DNS load balancing technique returns a list of multiple server IP addresses, rotating the order on consecutive queries?",
    options: ["Anycast DNS", "GeoDNS", "Round Robin DNS", "Dynamic DNS"],
    answer: "Round Robin DNS",
    explanation: "Round Robin DNS returns a list of multiple IPs for a single domain name, rotating the order to distribute client requests across multiple servers."
  },
  {
    id: "sys_15",
    conceptId: "sys_microservices",
    subject: "system_design",
    type: "theoretical",
    question: "What microservice component serves as a reverse proxy, routing requests, consolidating API calls, and handling authentication/rate-limiting at the entry boundary?",
    options: ["Service Registry", "API Gateway", "Message Broker", "Circuit Breaker"],
    answer: "API Gateway",
    explanation: "An API Gateway acts as the single entry point for all clients, abstracting the internal microservice micro-topology, and handling routing, token validation, rate-limiting, and metric aggregations."
  },
  {
    id: "sys_16",
    conceptId: "sys_databases_sql_nosql",
    subject: "system_design",
    type: "theoretical",
    question: "Under the PACELC theorem, how is a NoSQL Key-Value database like Redis typically classified?",
    options: ["PA/EL (Partition Active, Else Latency)", "PC/EC (Partition Consistent, Else Consistency)", "PA/EC (Partition Active, Else Consistency)", "PC/EL (Partition Consistent, Else Latency)"],
    answer: "PA/EL (Partition Active, Else Latency)",
    explanation: "Redis is built for high availability and sub-millisecond latency. During network partitions, it remains active (A), and under normal operations, it prioritizes low latency (L) by serving reads from memory asynchronously."
  },
  {
    id: "sys_17",
    conceptId: "sys_databases_sql_nosql",
    subject: "system_design",
    type: "theoretical",
    question: "Which NoSQL data model organizes records using dynamic row keys, column families, and timestamps, commonly utilized in Apache Cassandra or Bigtable?",
    options: ["Document Store", "Graph Database", "Wide-Column / Column-Family Store", "Key-Value Store"],
    answer: "Wide-Column / Column-Family Store",
    explanation: "Wide-column stores partition data based on row keys and group related column elements together as column families on disk, enabling massive horizontal writes and scans."
  },
  {
    id: "sys_18",
    conceptId: "sys_replication_models",
    subject: "system_design",
    type: "theoretical",
    question: "In distributed database replication, what consensus protocol uses a leader election where candidate nodes request votes from a majority quorum?",
    options: ["Two-Phase Commit", "Raft Consensus Algorithm", "Consistent Hashing Ring", "Compensating Transactions"],
    answer: "Raft Consensus Algorithm",
    explanation: "Raft is a consensus protocol designed for manageability. It splits consensus into leader election (requiring majority vote check), log replication, and safety guarantees."
  },
  {
    id: "sys_19",
    conceptId: "sys_replication_models",
    subject: "system_design",
    type: "theoretical",
    question: "What replication lag issue occurs when a client writes data to a master database, queries a slave database replica that has not updated, and fails to see their own changes?",
    options: ["Monotonic read anomaly", "Write-skew anomaly", "Read-your-own-writes inconsistency", "Dirty write conflict"],
    answer: "Read-your-own-writes inconsistency",
    explanation: "Read-your-own-writes consistency guarantees that if a client updates a field, they will always see that update on subsequent requests. This is resolved by routing the user's reads to the leader database for a small window after writes."
  },
  {
    id: "sys_20",
    conceptId: "sys_communication_protocols",
    subject: "system_design",
    type: "theoretical",
    question: "What HTTP/2 protocol feature allows a single TCP connection to concurrently handle multiple request-response streams without experiencing head-of-line blocking at the application level?",
    options: ["Server Push", "Header Compression (HPACK)", "Multiplexing", "Keep-Alive Ping"],
    answer: "Multiplexing",
    explanation: "Multiplexing divides HTTP requests and responses into binary frames, allowing multiple streams to interleave over a single TCP connection concurrently, bypassing head-of-line blocking."
  },
  {
    id: "sys_21",
    conceptId: "sys_communication_protocols",
    subject: "system_design",
    type: "theoretical",
    question: "Which communication model is unidirectional from server to client, running continuously over a persistent HTTP/HTTPS connection using standard text/event-stream payloads?",
    options: ["WebSockets", "Server-Sent Events (SSE)", "gRPC Bidirectional Streaming", "Long Polling"],
    answer: "Server-Sent Events (SSE)",
    explanation: "Server-Sent Events (SSE) is a lightweight, standardized unidirectional protocol letting servers stream real-time updates to clients over standard HTTP connections, unlike WebSockets which is full-duplex."
  },
  {
    id: "sys_22",
    conceptId: "sys_distributed_transactions",
    subject: "system_design",
    type: "theoretical",
    question: "In the Saga pattern for distributed transactions, how does the system rollback states across microservices if a step midway through the transaction fails?",
    options: ["The coordinator issues a global rollback lock blocking all DB commits", "The Saga coordinator triggers compensating transactions to undo prior successful steps in reverse sequence", "It drops all microservice database tables", "It relies on MySQL automatic foreign key cascades across the network"],
    answer: "The Saga coordinator triggers compensating transactions to undo prior successful steps in reverse sequence",
    explanation: "Because Saga does not use global database locks, successfully committed local transactions cannot be rolled back. Instead, the coordinator triggers compensating transactions (undo actions) in reverse order to restore semantic consistency."
  },
  {
    id: "sys_23",
    conceptId: "sys_distributed_transactions",
    subject: "system_design",
    type: "theoretical",
    question: "What is a major disadvantage of the Two-Phase Commit (2PC) protocol in distributed databases?",
    options: ["It does not guarantee consistency", "It is a blocking protocol; if the coordinator crashes during the vote phase, database resource locks are held indefinitely", "It does not support SQL queries", "It resolves split-brain scenarios automatically"],
    answer: "It is a blocking protocol; if the coordinator crashes during the vote phase, database resource locks are held indefinitely",
    explanation: "Two-Phase Commit (2PC) is synchronous and blocking. If the coordinator fails before sending commit/abort messages, participants wait indefinitely holding active database locks, limiting scalability."
  }

];