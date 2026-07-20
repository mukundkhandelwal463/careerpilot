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
  BookMarked,
  Award,
  CircleDot,
  HelpCircle
} from 'lucide-react';
import { questionBankData } from '../data/questionBankData.js';

const oopsConcepts = [
  {
    "id": "classes_objects",
    "index": "01",
    "name": "Classes & Objects",
    "overview": "A class acts as the blueprint/definition. An object is a runtime instance of that blueprint allocated in memory (heap).",
    "detailedTheory": "Classes serve as templates for state and behavior, grouping variables and functions. Objects are instantiations containing actual data records in heap memory, referenced by stack-allocated pointers.",
    "dryRun": "1. The compiler registers the Class blueprint.\n2. Instantiation (e.g. Car c = new Car()) requests heap memory.\n3. The fields are initialized, and c stores the target heap memory address.",
    "visualTrace": "+---------------+         +--------------------------------+\n| Car c         | ------> | [Brand: \"Toyota\", Year: 2026]  |\n| (Reference)   |         | (Instance data allocated)      |\n+---------------+         +--------------------------------+",
    "code": {
      "java": "public class Main {\n    static class Car {\n        String brand;\n        int year;\n        \n        void drive() {\n            System.out.println(brand + \" is driving!\");\n        }\n    }\n    \n    public static void main(String[] args) {\n        Car myCar = new Car(); // Object creation\n        myCar.brand = \"Toyota\";\n        myCar.year = 2026;\n        myCar.drive();\n    }\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nclass Car {\npublic:\n    std::string brand;\n    int year;\n    \n    void drive() {\n        std::cout << brand << \" is driving!\\n\";\n    }\n};\n\nint main() {\n    Car myCar; // Stack instantiation\n    myCar.brand = \"Toyota\";\n    myCar.year = 2026;\n    myCar.drive();\n    return 0;\n}",
      "python": "class Car:\n    def __init__(self):\n        self.brand = \"\"\n        self.year = 0\n        \n    def drive(self):\n        print(f\"{self.brand} is driving!\")\n\n# Object instantiation\nmy_car = Car()\nmy_car.brand = \"Toyota\"\nmy_car.year = 2026\nmy_car.drive()",
      "js": "class Car {\n    constructor() {\n        this.brand = \"\";\n        this.year = 0;\n    }\n    \n    drive() {\n        console.log(`${this.brand} is driving!`);\n    }\n}\n\nconst myCar = new Car(); // Instantiation\nmyCar.brand = \"Toyota\";\nmyCar.year = 2026;\nmyCar.drive();"
    },
    "interviewQ": "What is the difference between a class and an object?",
    "interviewA": "A Class is a logical template that defines attributes and methods, consuming no memory until instantiated. An Object is a physical instance of a class allocated in memory (heap) at runtime."
  },
  {
    "id": "class_attributes_methods",
    "index": "02",
    "name": "Class Attributes & Methods",
    "overview": "Attributes store the state of the object, and methods represent its actions or behaviors.",
    "detailedTheory": "Attributes represent the data fields of a class (static/class-level are shared across instances, whereas instance-level variables belong to individual objects). Methods define the actions that operate on this data.",
    "dryRun": "1. Static variables (e.g. Counter.count) are initialized in metadata space.\n2. Every call to increment() accesses the shared static variable count.\n3. Instance fields (e.g. id) are allocated separately for each object.",
    "visualTrace": "Counter Class Metadata (Shared) ----> [count = 2]\n\nInstance 1 (id=101) ------------> [count increments to 1]\nInstance 2 (id=102) ------------> [count increments to 2]",
    "code": {
      "java": "class Counter {\n    static int count = 0; // Class Attribute\n    int id;               // Instance Attribute\n    \n    Counter(int id) {\n        this.id = id;\n    }\n    \n    void increment() {\n        count++; // Class Method behavior\n    }\n}",
      "cpp": "#include <iostream>\n\nclass Counter {\npublic:\n    static int count; // Class Attribute declaration\n    int id;\n    \n    Counter(int id) : id(id) {}\n    void increment() { count++; }\n};\n\nint Counter::count = 0; // Class Attribute definition",
      "python": "class Counter:\n    count = 0  # Class Attribute\n    \n    def __init__(self, cid):\n        self.id = cid  # Instance Attribute\n        \n    def increment(self):\n        Counter.count += 1  # Class Method action",
      "js": "class Counter {\n    static count = 0; // Class Attribute\n    constructor(id) {\n        this.id = id; // Instance Attribute\n    }\n    \n    increment() {\n        Counter.count++; // Static lookup\n    }\n}"
    },
    "interviewQ": "What are static methods and attributes?",
    "interviewA": "Static members belong to the class itself rather than any object instance. They are loaded once in memory when the class loader initializes, and are shared among all object instances."
  },
  {
    "id": "constructors",
    "index": "03",
    "name": "Constructors",
    "overview": "Special initialization methods called automatically when an object is instantiated. Supports overloading (default, parameterized, and copy).",
    "detailedTheory": "Constructors set initial state, acquire system resources, or initialize private variables when an object is constructed on the heap. Destructors clean up dynamically allocated pointers when object goes out of scope.",
    "dryRun": "1. Invoking new User() allocates memory.\n2. The matching constructor (default or parameterized) runs.\n3. Instance fields (e.g. username) are written to heap block.",
    "visualTrace": "new User(\"Mukund\") ---> Alloc Heap ---> Run User(String name) ---> Set this.username = \"Mukund\"",
    "code": {
      "java": "class User {\n    String username;\n    \n    User() { this.username = \"Guest\"; } // Default\n    User(String name) { this.username = name; } // Parameterized\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nclass User {\npublic:\n    std::string username;\n    User() { username = \"Guest\"; } // Default\n    User(std::string name) { username = name; } // Parameterized\n    ~User() { std::cout << \"Destructor clean\\n\"; } // Destructor\n};",
      "python": "class User:\n    def __init__(self, name=\"Guest\"): # Python simulates overloading via default params\n        self.username = name",
      "js": "class User {\n    constructor(name = \"Guest\") {\n        this.username = name;\n    }\n}"
    },
    "interviewQ": "What is a copy constructor?",
    "interviewA": "A copy constructor is a special constructor that instantiates a new object by cloning the member values of an existing object of the same class."
  },
  {
    "id": "this_self_keyword",
    "index": "04",
    "name": "this / self Keyword",
    "overview": "Refers to the current instance of the class inside its constructors or methods to resolve scope ambiguity.",
    "detailedTheory": "The 'this' reference (or 'self' in Python) is an implicit pointer passed to all non-static methods of a class, pointing directly to the object instance currently invoking the code block.",
    "dryRun": "1. Instantiate Point p = new Point(5).\n2. Constructor takes argument 'x'.\n3. 'this.x = x' maps parameter 'x' directly to the object instance field 'x'.",
    "visualTrace": "Method: setX(int x) ---> local 'x' hides instance 'x'.\nUse 'this->x' (C++) or 'this.x' (Java) to refer directly to the instance field.",
    "code": {
      "java": "class Point {\n    int x;\n    Point(int x) {\n        this.x = x; // 'this' resolves naming conflict\n    }\n}",
      "cpp": "class Point {\n    int x;\npublic:\n    Point(int x) {\n        this->x = x; // 'this' pointer access\n    }\n};",
      "python": "class Point:\n    def __init__(self, x):\n        self.x = x  # 'self' explicitly binds attribute to instance",
      "js": "class Point {\n    constructor(x) {\n        this.x = x; // Binds x to 'this' instance context\n    }\n}"
    },
    "interviewQ": "Why is 'self' explicit in Python but 'this' is implicit in Java?",
    "interviewA": "Python's design emphasizes explicit arguments over implicit binding. 'self' must be explicitly declared as the first parameter of any instance method, though Python passes it automatically when invoked."
  },
  {
    "id": "access_specifiers",
    "index": "05",
    "name": "Access Specifiers & Modifiers",
    "overview": "Controls visibility of class attributes and methods: public (global), private (class-only), protected (package/subclass).",
    "detailedTheory": "Access modifiers define structural boundaries. They limit visibility, preventing external modules from directly editing internal variables, enforcing encapsulation contracts.",
    "dryRun": "1. Try accessing private field from outside class -> compiler error.\n2. Access public fields -> resolves correctly.\n3. Access protected fields from a subclass -> resolves correctly.",
    "visualTrace": "Public field    ====> Access Anywhere\nProtected field ====> Access inside same package / derived subclass\nPrivate field   ====> Access ONLY inside own class methods",
    "code": {
      "java": "class Secure {\n    private String key = \"secret\";\n    protected int level = 2;\n    public String label = \"safe\";\n}",
      "cpp": "class Secure {\nprivate:\n    std::string key = \"secret\";\nprotected:\n    int level = 2;\npublic:\n    std::string label = \"safe\";\n};",
      "python": "class Secure:\n    def __init__(self):\n        self.label = \"safe\"       # Public\n        self._level = 2            # Protected (convention)\n        self.__key = \"secret\"      # Private (name mangling)",
      "js": "class Secure {\n    #key = \"secret\"; // Private field syntax\n    constructor() {\n        this.label = \"safe\";\n        this._level = 2; // Protected convention\n    }\n}"
    },
    "interviewQ": "What is name mangling in Python?",
    "interviewA": "Python prefixes private attributes (those with a double leading underscore, like `__key`) with `_ClassName` (e.g. `_Secure__key`) to prevent name clashes in subclasses, simulating private accessibility."
  },
  {
    "id": "encapsulation",
    "index": "06",
    "name": "Encapsulation",
    "overview": "Bundling state and behavior together within a class and shielding direct data access via private fields and getters/setters.",
    "detailedTheory": "Encapsulation ensures data integrity. Private variables hide raw values, and public access methods validate inputs (e.g. checking that a balance or deposit is never negative) before modifying the object's state.",
    "dryRun": "1. Call setBalance(-100.0).\n2. Setter checks input range, rejects, and preserves original balance state.",
    "visualTrace": "[User Request] ---> [Public setBalance(b)] ---> (Validation Guard: b > 0) ---> [Private field balance]",
    "code": {
      "java": "class BankAccount {\n    private double balance;\n    \n    public double getBalance() { return balance; }\n    public void setBalance(double b) {\n        if (b >= 0) this.balance = b;\n    }\n}",
      "cpp": "class BankAccount {\nprivate:\n    double balance;\npublic:\n    double getBalance() const { return balance; }\n    void setBalance(double b) {\n        if (b >= 0) balance = b;\n    }\n};",
      "python": "class BankAccount:\n    def __init__(self):\n        self.__balance = 0.0\n        \n    @property\n    def balance(self) -> float:\n        return self.__balance\n        \n    @balance.setter\n    def balance(self, b: float):\n        if b >= 0:\n            self.__balance = b",
      "js": "class BankAccount {\n    #balance = 0.0;\n    \n    get balance() { return this.#balance; }\n    set balance(b) {\n        if (b >= 0) this.#balance = b;\n    }\n}"
    },
    "interviewQ": "How does encapsulation support modularity?",
    "interviewA": "By keeping a class's internal state private, developers can modify internal implementations (like data types or validation logics) without affecting external modules that interface through public getters/setters."
  },
  {
    "id": "friend_functions",
    "index": "07",
    "name": "Friend Functions",
    "overview": "C++ specific feature allowing an external function or class access to private and protected attributes of a target class.",
    "detailedTheory": "Friend declarations bypass traditional encapsulation scopes. A class lists external helper functions or separate classes as 'friends', granting them private access rights.",
    "dryRun": "1. Declare 'friend class AuditLog' inside class Developer.\n2. Instantiate Developer on heap.\n3. AuditLog method directly reads developer's private 'skill' attribute without compiler errors.",
    "visualTrace": "[Developer Class: private skill] <---- (Friend Privilege) ---- [AuditLog Class: inspectDeveloper()]",
    "code": {
      "java": "// Java has no 'friend' keyword. Simulates it using package-private (default) access modifiers.",
      "cpp": "#include <iostream>\n#include <string>\n\nclass Developer {\nprivate:\n    std::string secretSkill = \"CUDA\";\npublic:\n    friend void auditSkill(const Developer& dev);\n};\n\nvoid auditSkill(const Developer& dev) {\n    std::cout << \"Developer secret: \" << dev.secretSkill << \"\\n\";\n}",
      "python": "# Python has no strict access enforcement. Bypasses prefixing to read fields directly.",
      "js": "// JavaScript does not support friend classes/functions. Scoping relies on closures or private classes."
    },
    "interviewQ": "Why should friend functions be used sparingly?",
    "interviewA": "Friend declarations weaken data hiding and encapsulation. Overusing them tightly couples classes, making the code harder to debug and refactor."
  },
  {
    "id": "inheritance",
    "index": "08",
    "name": "Inheritance",
    "overview": "Allows a class (subclass) to inherit attributes and behaviors from another parent class (superclass) for code reusability.",
    "detailedTheory": "Inheritance defines an 'IS-A' relationship. It supports modular hierarchies where child classes extend the properties of parent structures without rewriting common attributes.",
    "dryRun": "1. Dog class inherits from Animal.\n2. Instantiate Dog.\n3. Call eat(), which runs the parent Animal class method directly.",
    "visualTrace": "[Parent Class: Animal (eat)] <======= extends ======= [Child Class: Dog (bark)]",
    "code": {
      "java": "class Animal {\n    void eat() { System.out.println(\"Eating...\"); }\n}\nclass Dog extends Animal {\n    void bark() { System.out.println(\"Barking...\"); }\n}",
      "cpp": "#include <iostream>\n\nclass Animal {\npublic:\n    void eat() { std::cout << \"Eating...\\n\"; }\n};\nclass Dog : public Animal {\npublic:\n    void bark() { std::cout << \"Barking...\\n\"; }\n};",
      "python": "class Animal:\n    def eat(self):\n        print(\"Eating...\")\n\nclass Dog(Animal):\n    def bark(self):\n        print(\"Barking...\")",
      "js": "class Animal {\n    eat() {\n        console.log(\"Eating...\");\n    }\n}\nclass Dog extends Animal {\n    bark() {\n        console.log(\"Barking...\");\n    }\n}"
    },
    "interviewQ": "What is diamond problem in inheritance?",
    "interviewA": "The diamond problem occurs in multiple inheritance when a class inherits from two parent classes that both override the same base grandparent class method. It causes ambiguity during method dispatch."
  },
  {
    "id": "polymorphism",
    "index": "09",
    "name": "Polymorphism (Overloading / Overriding)",
    "overview": "Compile-time (Overloading) allows same method names with different signatures; Overriding is runtime (child redefines parent behavior).",
    "detailedTheory": "Runtime polymorphism enables dynamic method dispatch. At runtime, the compiler resolves virtual functions via a Virtual Method Table (vtable), invoking the override of the actual object type rather than the reference pointer type.",
    "dryRun": "1. Base class pointer holds derived class object: Shape s = new Circle().\n2. Invoke s.draw().\n3. Runtime environment queries vtable and dispatches Circle.draw() instead of Shape.draw().",
    "visualTrace": "Shape* ptr ----> [Circle Object on Heap] ----> [Circle class vtable] ----> Execute Circle::draw()",
    "code": {
      "java": "class MathAdd {\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n}\n\nclass Shape {\n    void draw() { System.out.println(\"Shape\"); }\n}\nclass Circle extends Shape {\n    @Override\n    void draw() { System.out.println(\"Circle\"); }\n}",
      "cpp": "#include <iostream>\n\nclass Shape {\npublic:\n    virtual void draw() { std::cout << \"Shape\\n\"; }\n};\nclass Circle : public Shape {\npublic:\n    void draw() override { std::cout << \"Circle\\n\"; }\n};",
      "python": "class MathAdd:\n    def add(self, a, b, c=0):\n        return a + b + c\n\nclass Shape:\n    def draw(self):\n        print(\"Shape\")\nclass Circle(Shape):\n    def draw(self):\n        print(\"Circle\")",
      "js": "class Shape {\n    draw() {\n        console.log(\"Shape\");\n    }\n}\nclass Circle extends Shape {\n    draw() {\n        console.log(\"Circle\");\n    }\n}"
    },
    "interviewQ": "Why is the virtual keyword needed in C++ but not in Java?",
    "interviewA": "In C++, methods are non-virtual by default to avoid pointer lookup overhead. In Java, all non-static methods are virtual by default, resolving polymorphically at runtime automatically."
  },
  {
    "id": "super_keyword",
    "index": "10",
    "name": "super / base Keyword",
    "overview": "Refers to the parent/base class constructor or methods to invoke base logic from a subclass.",
    "detailedTheory": "The 'super' keyword (or calling parent class constructors/methods) allows subclasses to pass parameters to base initializers, or run parent method behavior alongside overridden child logic.",
    "dryRun": "1. Instantiate derived Child class.\n2. Child constructor calls super(val) first.\n3. Parent constructor runs, allocating and initializing parent attributes.",
    "visualTrace": "new Child(10) ---> Child constructor ---> super(10) ---> Parent constructor initializes base variables",
    "code": {
      "java": "class Parent {\n    Parent(int x) { System.out.println(\"Parent: \" + x); }\n}\nclass Child extends Parent {\n    Child(int x) {\n        super(x);\n    }\n}",
      "cpp": "#include <iostream>\n\nclass Parent {\npublic:\n    Parent(int x) { std::cout << \"Parent: \" << x << \"\\n\"; }\n};\nclass Child : public Parent {\npublic:\n    Child(int x) : Parent(x) {}\n};",
      "python": "class Parent:\n    def __init__(self, x):\n        print(f\"Parent: {x}\")\n\nclass Child(Parent):\n    def __init__(self, x):\n        super().__init__(x)",
      "js": "class Parent {\n    constructor(x) {\n        console.log(\"Parent: \" + x);\n    }\n}\nclass Child extends Parent {\n    constructor(x) {\n        super(x);\n    }\n}"
    },
    "interviewQ": "Why must super() be the first statement in a constructor?",
    "interviewA": "Because a parent class must set up its initial state and declare its fields before the child class tries to overwrite or reference them. This prevents access to uninitialized memory."
  },
  {
    "id": "abstraction",
    "index": "11",
    "name": "Abstraction & Abstract Classes",
    "overview": "Defining base templates that cannot be instantiated, forcing derived classes to provide implementations for declared abstract methods.",
    "detailedTheory": "Abstract classes enforce standardization. They define common functional structures, fields, and constructors, leaving specific implementation details to derived subclasses.",
    "dryRun": "1. Try instantiating an abstract class directly -> compilation error.\n2. Inherit from abstract class in child class.\n3. Overriding all abstract methods allows instantiation of child class.",
    "visualTrace": "[Abstract Class: Vehicle (abstract start())] <=== cannot instantiate === [Object: new Car() (defines start())]",
    "code": {
      "java": "abstract class Vehicle {\n    abstract void start();\n}\nclass Car extends Vehicle {\n    void start() { System.out.println(\"Car started\"); }\n}",
      "cpp": "class Vehicle {\npublic:\n    virtual void start() = 0;\n};\nclass Car : public Vehicle {\npublic:\n    void start() override { std::cout << \"Car started\\n\"; }\n};",
      "python": "from abc import ABC, abstractmethod\n\nclass Vehicle(ABC):\n    @abstractmethod\n    def start(self):\n        pass\n\nclass Car(Vehicle):\n    def start(self):\n        print(\"Car started\")",
      "js": "class Vehicle {\n    constructor() {\n        if (this.constructor === Vehicle) {\n            throw new Error(\"Cannot instantiate abstract class Vehicle\");\n        }\n    }\n    start() {\n        throw new Error(\"start() must be implemented\");\n    }\n}\nclass Car extends Vehicle {\n    start() { console.log(\"Car started\"); }\n}"
    },
    "interviewQ": "Can an abstract class have constructors?",
    "interviewA": "Yes. Abstract classes can define constructors. They are called by derived child constructors via `super()` to initialize base fields."
  },
  {
    "id": "interfaces",
    "index": "12",
    "name": "Interfaces & Contracts",
    "overview": "A pure blueprint contract that subclasses must implement. Contains only abstract method signatures and static variables.",
    "detailedTheory": "Interfaces describe *what* a class does, not *how*. They allow unrelated classes to implement common contracts, supporting multiple inheritance structures which are restricted for standard class inheritance.",
    "dryRun": "1. Define interface Drivable.\n2. Class Truck 'implements' Drivable.\n3. Truck is forced to define drive() method at compilation.",
    "visualTrace": "Class Truck implements Drivable Interface ===> compile-time check forces define Drivable signatures",
    "code": {
      "java": "interface Drivable {\n    void drive();\n}\nclass Truck implements Drivable {\n    public void drive() { System.out.println(\"Truck driving\"); }\n}",
      "cpp": "class Drivable {\npublic:\n    virtual void drive() = 0;\n};\nclass Truck : public Drivable {\npublic:\n    void drive() override { std::cout << \"Truck driving\\n\"; }\n};",
      "python": "from abc import ABC, abstractmethod\n\nclass Drivable(ABC):\n    @abstractmethod\n    def drive(self):\n        pass",
      "js": "class Drivable {\n    drive() { throw new Error(\"drive() interface contract must be implemented\"); }\n}"
    },
    "interviewQ": "What is the difference between an Abstract Class and an Interface?",
    "interviewA": "An abstract class can hold instance state (variables) and constructors, supporting single inheritance. An interface represents a pure behavioral contract, holds no state, and supports multiple interface implementations."
  },
  {
    "id": "inner_classes",
    "index": "13",
    "name": "Inner & Anonymous Classes",
    "overview": "A nested class defined within an outer class scope. Anonymous classes are inline implementations of interfaces or bases.",
    "detailedTheory": "Inner classes link helper classes logically inside their parent modules. Anonymous classes implement short-lived interface stubs or action callbacks inline without defining explicit classes.",
    "dryRun": "1. Company class holds inner OfficeSpace class.\n2. Instantiate Outer: Company c = new Company().\n3. Instantiate Inner: Company.OfficeSpace o = c.new OfficeSpace(). o can access private fields of c.",
    "visualTrace": "Outer Instance (Company) [private companyName] <--- read scope --- Inner Instance (OfficeSpace)",
    "code": {
      "java": "class Company {\n    private String name = \"Tech Corp\";\n    \n    class OfficeSpace {\n        void printName() { System.out.println(name); }\n    }\n    \n    void run() {\n        Runnable r = new Runnable() {\n            public void run() { System.out.println(\"Anonymous thread running\"); }\n        };\n        r.run();\n    }\n}",
      "cpp": "class Company {\nprivate:\n    std::string name = \"Tech Corp\";\npublic:\n    class OfficeSpace {\n    public:\n        void printName() {\n            std::cout << \"Inner class instantiated\\n\";\n        }\n    };\n};",
      "python": "class Company:\n    def __init__(self):\n        self.name = \"Tech Corp\"\n        \n    class OfficeSpace:\n        def get_details(self):\n            return \"Nested class instance structure.\"",
      "js": "class Company {\n    constructor() {\n        this.name = \"Tech Corp\";\n        this.OfficeSpace = class {\n            constructor(outer) {\n                this.outerInstance = outer;\n            }\n            printName() { console.log(this.outerInstance.name); }\n        };\n    }\n}"
    },
    "interviewQ": "What are anonymous inner classes useful for?",
    "interviewA": "Anonymous classes are useful for declaring throwaway, one-off callbacks (like GUI button click handlers, event listeners, or quick Runnable threads) inline, reducing boilerplate."
  },
  {
    "id": "templates_generics",
    "index": "14",
    "name": "Templates / Generics",
    "overview": "Allows writing parameterizable, type-safe structures and functions (C++ templates / Java Generics) to handle different data types.",
    "detailedTheory": "Templates and Generics support parameterized type safety. Instead of defining separate classes for Integer lists and String lists, a generic class is typed at compile-time to handle any object.",
    "dryRun": "1. Declare generic Box<T>.\n2. Instantiate Box<Integer> and Box<String>.\n3. The compiler guarantees type checks during runtime operations.",
    "visualTrace": "Box<T> ---> Box<Integer> (Integers only) / Box<String> (Strings only)",
    "code": {
      "java": "class Box<T> {\n    private T item;\n    public void set(T item) { this.item = item; }\n    public T get() { return this.item; }\n}",
      "cpp": "template <typename T>\nclass Box {\nprivate:\n    T item;\npublic:\n    void set(T val) { item = val; }\n    T get() const { return item; }\n};",
      "python": "from typing import TypeVar, Generic\n\nT = TypeVar('T')\nclass Box(Generic[T]):\n    def __init__(self, item: T):\n        self.item = item",
      "js": "class Box {\n    constructor(item) {\n        this.item = item;\n    }\n}"
    },
    "interviewQ": "What is Type Erasure in Java?",
    "interviewA": "Type Erasure is the process where the Java compiler replaces generic type parameters (like `<T>`) with their bounds (like `Object`) at compile-time to ensure backward compatibility with older JVM versions."
  },
  {
    "id": "enums",
    "index": "15",
    "name": "Enums (Enumerations)",
    "overview": "A special data type representing a fixed set of predefined constant values (e.g. Days of the week, Departments).",
    "detailedTheory": "Enums represent self-documented type-safe constants. They replace error-prone string/integer keys, preventing invalid configurations from compile-time filters.",
    "dryRun": "1. Define Enum Status { ACTIVE, PENDING }.\n2. Set status variable to Status.ACTIVE.\n3. Trying to assign a random string yields a compiler type error.",
    "visualTrace": "Status variable limited to ===> [ACTIVE, PENDING, INACTIVE]",
    "code": {
      "java": "enum Status { ACTIVE, PENDING }\npublic class Main {\n    Status s = Status.ACTIVE;\n}",
      "cpp": "enum Status { ACTIVE, PENDING };\nint main() {\n    Status s = ACTIVE;\n}",
      "python": "from enum import Enum\nclass Status(Enum):\n    ACTIVE = 1\n    PENDING = 2",
      "js": "const Status = Object.freeze({\n    ACTIVE: 'ACTIVE',\n    PENDING: 'PENDING'\n});"
    },
    "interviewQ": "Why use Enums instead of static final constant variables?",
    "interviewA": "Enums provide compile-time type-safety, namespace grouping, and self-documented constant verification, preventing invalid integer values from being assigned."
  },
  {
    "id": "packages_modules",
    "index": "16",
    "name": "Packages & Modules API",
    "overview": "Grouping related classes and interfaces into logical packages/namespaces for scoping and import/export controls.",
    "detailedTheory": "Namespaces resolve naming collisions. Packages import libraries selectively and partition modules into decoupled code boundaries.",
    "dryRun": "1. Import com.api.Security.\n2. Reference Security class.\n3. Scoping resolves namespace, resolving name collisions dynamically.",
    "visualTrace": "App Root ---> com.core.Utils / com.api.Utils (No collision due to package separation)",
    "code": {
      "java": "package com.app.core;\nimport java.util.List;\nimport java.util.ArrayList;",
      "cpp": "namespace App {\n    namespace Core {\n        class Manager {};\n    }\n}",
      "python": "import sys\nfrom datetime import datetime",
      "js": "import React from 'react';\nexport default class UserControl {}"
    },
    "interviewQ": "What is the role of a package namespace?",
    "interviewA": "It structures massive projects cleanly, handles name collisions of classes, and controls module accessibility interfaces."
  },
  {
    "id": "file_handling",
    "index": "17",
    "name": "File Handling (I/O Operations)",
    "overview": "Reading and writing structured data streams directly to external text or binary files on disk.",
    "detailedTheory": "File handling transfers heap objects to persistent files. Streams (input/output) read and write raw strings or byte arrays to target physical drives.",
    "dryRun": "1. Open output file stream.\n2. Write text block.\n3. Close/flush stream safely to prevent resource leaks.",
    "visualTrace": "[VRAM Heap Buffer] ===== FileStream.write() =====> [Physical Disk log.txt]",
    "code": {
      "java": "import java.io.FileWriter;\nimport java.io.IOException;\n\nclass FileIO {\n    void write(String text) throws IOException {\n        FileWriter fw = new FileWriter(\"log.txt\");\n        fw.write(text);\n        fw.close();\n    }\n}",
      "cpp": "#include <fstream>\n\nclass FileIO {\n    void write(std::string text) {\n        std::ofstream outfile(\"log.txt\");\n        outfile << text;\n        outfile.close();\n    }\n};",
      "python": "class FileIO:\n    def write(self, text):\n        with open(\"log.txt\", \"w\") as f:\n            f.write(text)",
      "js": "import fs from 'fs';\nclass FileIO {\n    write(text) {\n        fs.writeFileSync('log.txt', text);\n    }\n}"
    },
    "interviewQ": "Why must file descriptors be closed?",
    "interviewA": "Active file handles consume system resources. Failing to close streams causes file locks, memory leaks, and block access exceptions on resource drives."
  },
  {
    "id": "user_input_dates",
    "index": "18",
    "name": "User Input & Date Handling",
    "overview": "Capturing console inputs from developers (Scanner/cin/input) and manipulating time/dates via core date libraries.",
    "detailedTheory": "User input streams read keystrokes from standard input (stdin). Date libraries encapsulate timestamp formatting, calendar calculations, and timezone offsets.",
    "dryRun": "1. Read std::cin user string.\n2. Fetch date timestamp.\n3. Log combined input message to execution terminal.",
    "visualTrace": "[User Keystrokes] ---> Scanner.nextLine() / cin ---> system processes with Date timestamp",
    "code": {
      "java": "import java.time.LocalDate;\nimport java.util.Scanner;\n\nclass ConsoleIO {\n    void run() {\n        Scanner scanner = new Scanner(System.in);\n        LocalDate date = LocalDate.now();\n        System.out.println(date.toString());\n    }\n}",
      "cpp": "#include <iostream>\n#include <ctime>\n\nclass ConsoleIO {\n    void run() {\n        std::string input;\n        std::cin >> input;\n        std::time_t t = std::time(nullptr);\n    }\n};",
      "python": "from datetime import datetime\n\nclass ConsoleIO:\n    def run(self):\n        user_val = input(\"Enter: \")\n        now = datetime.now()",
      "js": "class ConsoleIO {\n    run() {\n        const input = prompt(\"Enter: \");\n        const now = new Date();\n    }\n}"
    },
    "interviewQ": "Why is LocalDate thread-safe in Java 8?",
    "interviewA": "Because LocalDate is immutable. Once initialized, its value cannot be modified. Any operations yield new instances, protecting thread access states."
  }
];

const OopsTheory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [activeLang, setActiveLang] = useState('java'); // Java default
  const [selectedConceptId, setSelectedConceptId] = useState(() => {
    const fromUrl = searchParams.get('concept');
    if (fromUrl && oopsConcepts.some(c => c.id === fromUrl)) {
      return fromUrl;
    }
    return 'classes_objects';
  });
  const [completedConcepts, setCompletedConcepts] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});

  // Load completion state from local storage on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('completed_oops_concepts');
    if (saved) {
      try {
        setCompletedConcepts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync completion state to local storage
  const toggleConceptCompleted = (id, e) => {
    e.stopPropagation(); // Avoid selecting the concept when clicking checkbox
    let newCompleted;
    if (completedConcepts.includes(id)) {
      newCompleted = completedConcepts.filter(x => x !== id);
    } else {
      newCompleted = [...completedConcepts, id];
    }
    setCompletedConcepts(newCompleted);
    localStorage.setItem('completed_oops_concepts', JSON.stringify(newCompleted));
  };

  const handleSelectMCQ = (questionId, option) => {
    if (userAnswers[questionId] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    setRevealedExplanations(prev => ({ ...prev, [questionId]: true }));
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

  const selectedConcept = oopsConcepts.find(c => c.id === selectedConceptId) || oopsConcepts[0];
  const progressPercent = Math.round((completedConcepts.length / oopsConcepts.length) * 100);

  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1450px', margin: '40px auto', padding: '0 24px' }}>
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

        {/* OOPs Hero Section with Tracker */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
          borderRadius: '24px',
          padding: '36px 40px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(2, 44, 34, 0.08)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', color: '#a7f3d0', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  OOPs Concept Tracker
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>•</span>
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock className="size-4 text-emerald-400" /> Syllabus mastery progress
                </span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
                Object-Oriented Programming (OOPs)
              </h1>
              <p style={{ fontSize: '0.94rem', color: '#a7f3d0', maxWidth: '750px', lineHeight: '1.5', margin: 0 }}>
                Learn Classes, Objects, Abstraction, Encapsulation, Polymorphism, and Inheritance. Track your syllabus progress by checking off mastered concepts.
              </p>
            </div>


          </div>
        </div>

        {/* Dynamic Dual columns: Left - Concept boxes; Right - Detailed Explanation */}
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT: Tracker list / Boxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '800px', overflowY: 'auto', paddingRight: '4px' }}>
            {oopsConcepts.map((concept) => {
              const isSelected = concept.id === selectedConceptId;
              const isCompleted = completedConcepts.includes(concept.id);
              
              return (
                <div 
                  key={concept.id}
                  onClick={() => setSelectedConceptId(concept.id)}
                  style={{
                    background: isSelected ? 'linear-gradient(to right, #ecfdf5, #f0fdf4)' : '#ffffff',
                    border: isSelected ? '2px solid #10b981' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.06)' : '0 1px 3px rgba(0,0,0,0.01)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#a7f3d0';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    {/* Checkbox */}
                    <div 
                      onClick={(e) => toggleConceptCompleted(concept.id, e)}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: isCompleted ? '2px solid #10b981' : '2px solid #cbd5e1',
                        background: isCompleted ? '#10b981' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      {isCompleted && <Check className="size-3.5 text-white stroke-[3]" />}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>
                        Concept {concept.index}
                      </span>
                      <strong style={{
                        fontSize: '0.86rem',
                        color: isSelected ? '#065f46' : '#1e293b',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: '2px'
                      }}>
                        {concept.name}
                      </strong>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '10px',
                    background: isCompleted ? '#d1fae5' : '#f1f5f9',
                    color: isCompleted ? '#065f46' : '#64748b',
                    flexShrink: 0
                  }}>
                    {isCompleted ? 'Mastered' : 'Todo'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Selected Concept's Explanation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Core overview & detailed theory */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'grid', placeItems: 'center' }}>
                    <CircleDot className="size-5" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {selectedConcept.name}
                    </h2>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                      Syllabus Section {selectedConcept.index}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => toggleConceptCompleted(selectedConcept.id, e)}
                  style={{
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: completedConcepts.includes(selectedConcept.id) ? '#d1fae5' : '#059669',
                    color: completedConcepts.includes(selectedConcept.id) ? '#065f46' : '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}
                >
                  <Check className="size-4" />
                  {completedConcepts.includes(selectedConcept.id) ? 'Mastered' : 'Mark as Mastered'}
                </button>
              </div>

              <div style={{ padding: '20px', background: '#f8fafc', borderLeft: '4px solid #10b981', borderRadius: '8px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px 0' }}>Intuition</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                  {selectedConcept.overview}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>Deep Theory & Why We Use It</h4>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                  {selectedConcept.detailedTheory}
                </p>
              </div>
            </section>

            {/* Interactive multi-language blueprints */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f0fdf4', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
                    <Terminal className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Syntax & Implementation</h3>
                </div>

                {/* Language switcher */}
                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
                  {['java', 'cpp', 'python', 'js'].map(l => (
                    <button 
                      key={l}
                      onClick={() => setActiveLang(l)} 
                      style={{ 
                        border: 'none', 
                        padding: '6px 12px', 
                        fontSize: '0.78rem', 
                        fontWeight: 800, 
                        borderRadius: '8px', 
                        cursor: 'pointer', 
                        background: activeLang === l ? '#ffffff' : 'transparent', 
                        color: activeLang === l ? '#0f172a' : '#64748b', 
                        boxShadow: activeLang === l ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' 
                      }}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <pre style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '24px',
                  borderRadius: '16px',
                  fontSize: '0.88rem',
                  fontFamily: 'monospace, Courier New',
                  overflowX: 'auto',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <code>{selectedConcept.code[activeLang] || `// No direct implementation for ${activeLang.toUpperCase()} under this specific concept.`}</code>
                </pre>
                <button
                  onClick={() => handleCopy(selectedConcept.code[activeLang] || '', 'template')}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#e2e8f0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  {copiedTemplate ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </button>
              </div>
            </section>

            {/* Execution Trace & Dry Run */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                  <Sparkles className="size-5" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Visual Trace & Dry Run</h3>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>Execution Steps</h4>
                <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                  {selectedConcept.dryRun}
                </p>
              </div>

              {selectedConcept.visualTrace && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 10px 0' }}>Memory Representation Diagram</h4>
                  <pre style={{
                    background: '#0f172a',
                    color: '#38bdf8',
                    padding: '20px',
                    borderRadius: '12px',
                    fontSize: '0.86rem',
                    fontFamily: 'monospace, Courier New',
                    overflowX: 'auto',
                    lineHeight: '1.5',
                    border: '1px solid #1e293b',
                    margin: 0
                  }}>
                    <code>{selectedConcept.visualTrace}</code>
                  </pre>
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
                              <Terminal className="size-4" /> {/* Use Terminal instead of BookOpen */}
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

export default OopsTheory;
