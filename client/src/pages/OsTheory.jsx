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
  HelpCircle
} from 'lucide-react';
import { questionBankData } from '../data/questionBankData.js';

const osConcepts = [
  {
    "id": "os_process_thread",
    "index": "01",
    "name": "Process vs Thread",
    "overview": "A process is an executing program instance with independent resources. A thread is a lightweight execution unit inside a process sharing memory.",
    "detailedTheory": "A process is the OS's unit of resource allocation (has its own memory space, file descriptors, security context). Communicating between processes requires heavy IPC. A thread is the OS's unit of CPU scheduling. Threads of the same process share the code segment, data segment, and heap, but maintain separate stacks, registers, and program counters.",
    "dryRun": "1. OS creates process space (PCB, page tables).\n2. Main thread starts execution.\n3. Worker thread spawned -> Allocates new stack in the same memory space.\n4. Thread scheduling switches execution context with minimal register-only swap.",
    "visualTrace": "+-------------------------------------+\n| PROCESS MEMORY SPACE                |\n| +-------------+  +----------------+ |\n| | Heap / Data |  | Code Segment   | |\n| +-------------+  +----------------+ |\n|                                     |\n| +-------------+  +----------------+ |\n| | Thread 1    |  | Thread 2       | |\n| | Stack       |  | Stack          | |\n| +-------------+  +----------------+ |\n+-------------------------------------+",
    "code": {
      "cpp": "#include <iostream>\n#include <thread>\n\nvoid printMessage() {\n    std::cout << \"Hello from Thread!\\n\";\n}\n\nint main() {\n    // Spawning a lightweight thread\n    std::thread t1(printMessage);\n    t1.join();\n    return 0;\n}",
      "python": "import threading\n\ndef print_message():\n    print(\"Hello from Thread!\")\n\n# Create and start a thread\nt = threading.Thread(target=print_message)\nt.start()\nt.join()",
      "java": "public class ThreadExample {\n    public static void main(String[] args) {\n        Thread thread = new Thread(() -> {\n            System.out.println(\"Hello from Thread!\");\n        });\n        thread.start();\n    }\n}"
    },
    "interviewQ": "What is context switching overhead and why is it lower for threads?",
    "interviewA": "Context switching requires saving and loading state (registers, program counters, etc.). For processes, it also requires changing page tables (TLB invalidation/reload). Since threads share memory, a thread context switch does not require changing page tables, saving significant overhead."
  },
  {
    "id": "os_process_states",
    "index": "02",
    "name": "Process States & PCB",
    "overview": "Processes transition through various states (New, Ready, Running, Waiting, Terminated) managed by the OS via Process Control Blocks (PCB).",
    "detailedTheory": "The Process Control Block (PCB) is a data structure containing process metadata: Process ID (PID), Process State, Program Counter (PC), CPU Registers, Memory Limits, and List of Open Files. The state transitions are triggered by scheduler dispatches, interrupts, and I/O wait calls.",
    "dryRun": "1. Process Loaded -> New state.\n2. Put in ready queue -> Ready state.\n3. Dispatched to CPU -> Running state.\n4. I/O event requested -> Waiting state.\n5. I/O completes -> back to Ready state.\n6. Task completes -> Terminated state.",
    "visualTrace": " [New] ---> [Ready] <=======> [Running] ---> [Terminated]\n               ^                 |\n               |                 v\n               +---- [Waiting] <-+",
    "code": {
      "cpp": "// OS Kernel level structure approximation of PCB\nstruct PCB {\n    int pid;\n    int process_state; // 0: Ready, 1: Running, 2: Waiting\n    unsigned int program_counter;\n    unsigned int registers[16];\n    void* memory_limits;\n};",
      "python": "# Simulating Process state transit logic\nclass Process:\n    def __init__(self, pid):\n        self.pid = pid\n        self.state = \"NEW\"\n        \n    def transition(self, next_state):\n        print(f\"PID {self.pid}: {self.state} -> {next_state}\")\n        self.state = next_state",
      "java": "class PCB {\n    int pid;\n    String state;\n    int programCounter;\n    \n    public PCB(int pid) {\n        this.pid = pid;\n        this.state = \"NEW\";\n    }\n}"
    },
    "interviewQ": "What information does a PCB store?",
    "interviewA": "A PCB stores the Process ID, current state, CPU registers, scheduling priority, program counter (PC), CPU allocation time, memory management limits, and I/O status information (such as open files)."
  },
  {
    "id": "os_cpu_scheduling",
    "index": "03",
    "name": "CPU Scheduling Algorithms",
    "overview": "Determines which process gets CPU time using algorithms like FCFS, SJF, Priority, and Round Robin.",
    "detailedTheory": "Scheduling optimizes CPU utilization, throughput, turnaround time, waiting time, and response time. Non-preemptive algorithms (SJF, FCFS) let running processes finish. Preemptive algorithms (Round Robin, SRTF) dynamically interrupt processes based on time-slices (quantum) or dynamic attributes.",
    "dryRun": "Using Round Robin with quantum = 2:\n1. P1 (Burst=5), P2 (Burst=3) in queue.\n2. P1 runs for 2s (Remaining=3). P2 runs for 2s (Remaining=1).\n3. P1 runs for 2s (Remaining=1). P2 runs for 1s (Terminates).\n4. P1 runs for 1s (Terminates).",
    "visualTrace": "Gantt Chart (RR Quantum=2):\n|  P1  |  P2  |  P1  |  P2  |  P1  |\n0      2      4      6      7      8",
    "code": {
      "cpp": "// Simulating First Come First Served (FCFS) Wait Time Calculation\n#include <iostream>\n#include <vector>\n\nvoid findWaitingTime(const std::vector<int>& burst, std::vector<int>& wait) {\n    wait[0] = 0;\n    for (size_t i = 1; i < burst.size(); i++) {\n        wait[i] = wait[i-1] + burst[i-1];\n    }\n}",
      "python": "# Simulating Round Robin Queue scheduler\ndef round_robin(processes, quantum):\n    queue = list(processes.keys())\n    while queue:\n        p = queue.pop(0)\n        processes[p] -= quantum\n        if processes[p] > 0:\n            queue.append(p)\n        else:\n            print(f\"{p} finished.\")",
      "java": "import java.util.*;\npublic class SJFScheduler {\n    // Sort processes by burst time for Shortest Job First (Non-preemptive)\n    public static void schedule(int[] burstTimes) {\n        Arrays.sort(burstTimes);\n        // Run in sorted order\n    }\n}"
    },
    "interviewQ": "Explain Convoy Effect in FCFS scheduling.",
    "interviewA": "The Convoy Effect occurs when several short processes wait in the ready queue for one long, CPU-bound process to release the CPU. This leads to poor CPU and device utilization and high average waiting times.",
    "numericalExample": {
      "question": "Calculate the average Waiting Time (WT) and Turnaround Time (TAT) for the following processes using Shortest Job First (SJF) Non-preemptive scheduling. Processes: P1 (Burst=6, Arrival=0), P2 (Burst=8, Arrival=0), P3 (Burst=7, Arrival=0), P4 (Burst=3, Arrival=0).",
      "solution": "Order of execution (sorted by burst time): P4 (3), P1 (6), P3 (7), P2 (8).\n\nCompletion Times:\n- P4: 3\n- P1: 3 + 6 = 9\n- P3: 9 + 7 = 16\n- P2: 16 + 8 = 24\n\nTurnaround Time (Completion - Arrival):\n- P4: 3 - 0 = 3\n- P1: 9 - 0 = 9\n- P3: 16 - 0 = 16\n- P2: 24 - 0 = 24\nAvg TAT = (3 + 9 + 16 + 24) / 4 = 13.0 ms\n\nWaiting Time (Turnaround - Burst):\n- P4: 3 - 3 = 0\n- P1: 9 - 6 = 3\n- P3: 16 - 7 = 9\n- P2: 24 - 8 = 16\nAvg WT = (0 + 3 + 9 + 16) / 4 = 7.0 ms",
      "answer": "Average Waiting Time = 7.0 ms, Average Turnaround Time = 13.0 ms"
    }
  },
  {
    "id": "os_context_switch",
    "index": "04",
    "name": "Context Switching",
    "overview": "The mechanism to save the state of a running process and load the state of another.",
    "detailedTheory": "When the scheduler switches the CPU target, the kernel suspends the currently running process, saves its registers, stack pointer, and memory mappings into its PCB, and loads the saved values from the target PCB. Context switching is pure overhead since no useful user-space work is performed.",
    "dryRun": "1. CPU is running Process A.\n2. Timer interrupt fires -> Mode switch to Kernel.\n3. Kernel saves PC & Registers of A into PCB_A.\n4. Scheduler picks Process B.\n5. Kernel loads PC & Registers of B from PCB_B.\n6. Mode switch to User -> B begins executing.",
    "visualTrace": "Process A          OS Kernel          Process B\n Running ----(Interrupt)--->\n                     Save A State\n                     Load B State ----(Resume)--->\n                                                 Running",
    "code": {
      "cpp": "// CPU context layout structure\nstruct Context {\n    unsigned int r4, r5, r6, r7, r8, r9, r10, r11;\n    unsigned int sp; // Stack Pointer\n    unsigned int pc; // Program Counter\n};",
      "python": "# Pseudo simulation of State Saver/Loader\nclass CPUSimulator:\n    def __init__(self):\n        self.pc = 0\n        self.registers = {}\n\n    def switch_context(self, save_pcb, load_pcb):\n        save_pcb.pc = self.pc\n        self.pc = load_pcb.pc",
      "java": "class ContextSwitcher {\n    static void performSwitch(PCB current, PCB next) {\n        current.state = \"READY\";\n        next.state = \"RUNNING\";\n    }\n}"
    },
    "interviewQ": "What triggers a context switch?",
    "interviewA": "Context switches are triggered by multi-programming mechanisms: a timer interrupt (in preemptive multitasking), a hardware interrupt (such as completed I/O operations), or a voluntary yield (where a process blocks waiting for resource access)."
  },
  {
    "id": "os_ipc",
    "index": "05",
    "name": "Inter-Process Communication (IPC)",
    "overview": "Allows separate processes to exchange data using Shared Memory, Message Queues, Pipes, or Sockets.",
    "detailedTheory": "Because processes have distinct address spaces to protect memory isolation, they cannot share pointers. IPC bridges this via two primary models: 1. Shared Memory: OS maps a common physical memory region into the virtual address spaces of both processes (fastest). 2. Message Passing: Kernel buffers messages, requiring copy operations via system calls.",
    "dryRun": "Using UNIX Pipe:\n1. Process A calls fork() -> child created.\n2. Process A closes read end, writes to pipe buffer.\n3. Child closes write end, reads from pipe buffer.\n4. Synchronization is managed by the OS kernel.",
    "visualTrace": "Process A ---> [Write End] ===(OS Pipe Buffer)=== [Read End] ---> Process B",
    "code": {
      "cpp": "#include <iostream>\n#include <unistd.h>\n\nint main() {\n    int fd[2];\n    pipe(fd); // Creates a pipe\n    if (fork() == 0) {\n        close(fd[1]); // Child read\n        char buf[10];\n        read(fd[0], buf, 5);\n        std::cout << \"Child received: \" << buf << \"\\n\";\n    } else {\n        close(fd[0]); // Parent write\n        write(fd[1], \"Hello\", 5);\n    }\n    return 0;\n}",
      "python": "from multiprocessing import Process, Queue\n\ndef worker(q):\n    q.put(\"Message from child\")\n\nif __name__ == '__main__':\n    q = Queue()\n    p = Process(target=worker, args=(q,))\n    p.start()\n    print(q.get())\n    p.join()",
      "java": "import java.io.*;\n// Java simulates IPC via sockets or files\npublic class SystemPipeExample {\n    // Uses PipedInputStream and PipedOutputStream between threads\n}"
    },
    "interviewQ": "Compare Shared Memory and Message Passing IPC.",
    "interviewA": "Shared Memory is faster because it requires no system calls after mapping, but requires user-level synchronization (mutexes). Message Passing is slower due to kernel copying, but provides automatic synchronization and is easier to implement across networks."
  },
  {
    "id": "os_mutex_semaphore",
    "index": "06",
    "name": "Mutex & Semaphores",
    "overview": "Locks and signaling variables used to manage process/thread synchronization and prevent race conditions.",
    "detailedTheory": "A Mutex is a locking mechanism (binary: locked/unlocked) owned by the thread that acquired it. A Semaphore is a signaling mechanism. Counting Semaphore values represent the count of available resources. Binary Semaphore behaves like a mutex but lacks ownership semantics (any thread can release it).",
    "dryRun": "Using Semaphore (initial value S=1):\n1. Thread A executes wait(S) -> S becomes 0. Thread A enters critical section.\n2. Thread B executes wait(S) -> S <= 0, B is added to waiting queue.\n3. Thread A exits, executes signal(S) -> S becomes 1, B is woken up.",
    "visualTrace": "Semaphore S = 1\nThread A: wait(S)   [S = 0] ----> Entered CS\nThread B: wait(S)   [S < 0] ----> Blocked/Queued\nThread A: signal(S) [S = 1] ----> Thread B released",
    "code": {
      "cpp": "#include <iostream>\n#include <thread>\n#include <mutex>\n\nstd::mutex mtx;\nint counter = 0;\n\nvoid safeIncrement() {\n    mtx.lock();\n    counter++; // Safe from race conditions\n    mtx.unlock();\n}",
      "python": "import threading\n\nsem = threading.Semaphore(1)\n\ndef access_resource():\n    sem.acquire()\n    # Critical Section\n    sem.release()",
      "java": "import java.util.concurrent.Semaphore;\npublic class SemExample {\n    private static Semaphore sem = new Semaphore(2); // 2 resources\n    public static void runTask() throws InterruptedException {\n        sem.acquire();\n        // do work\n        sem.release();\n    }\n}"
    },
    "interviewQ": "What is the difference between a Mutex and a Binary Semaphore?",
    "interviewA": "A Mutex has ownership: only the thread that locks it can unlock it. A Semaphore has no ownership: any thread can invoke signal() to wake up a blocked thread waiting on the semaphore."
  },
  {
    "id": "os_critical_section",
    "index": "07",
    "name": "Critical Section Problem",
    "overview": "A code block accessing shared mutable state that must satisfy Mutual Exclusion, Progress, and Bounded Waiting.",
    "detailedTheory": "To safely resolve access conflicts, any design must satisfy: 1. Mutual Exclusion: If thread T is in critical section, no other thread can enter. 2. Progress: If CS is empty, only threads wishing to enter participate in deciding who gets in. 3. Bounded Waiting: A limit exists on the number of times other threads can enter before a requesting thread is granted access.",
    "dryRun": "Peterson's Algorithm:\n1. Thread 0 sets flag[0] = true, turn = 1.\n2. Thread 0 waits while flag[1] is true and turn == 1.\n3. Since Thread 1 isn't running, loop resolves, Thread 0 enters CS.\n4. On exit, Thread 0 sets flag[0] = false, allowing Thread 1 in.",
    "visualTrace": "Entry Section (Set Flag & Turn) ---> Critical Section ---> Exit Section (Reset Flag)",
    "code": {
      "cpp": "// Peterson's Algorithm for two threads (0 and 1)\n#include <atomic>\n\nstd::atomic<bool> flag[2] = {false, false};\nstd::atomic<int> turn = 0;\n\nvoid threadCode(int id) {\n    int other = 1 - id;\n    flag[id] = true;\n    turn = other;\n    while (flag[other] && turn == other) { /* busy wait */ }\n    // --- Critical Section ---\n    flag[id] = false;\n}",
      "python": "# Simulating Race Condition without synchronization\nimport threading\n\nval = 0\ndef increment():\n    global val\n    for _ in range(100000):\n        val += 1 # Multi-step CPU instruction prone to race conditions",
      "java": "public class SynchronizedCounter {\n    private int count = 0;\n    // Synchronized keyword guarantees mutual exclusion\n    public synchronized void increment() {\n        count++;\n    }\n}"
    },
    "interviewQ": "What are the three requirements for a solution to the Critical Section problem?",
    "interviewA": "1. Mutual Exclusion (only one process inside CS). 2. Progress (processes decide who enters next without deadlocking). 3. Bounded Waiting (no process waits indefinitely to enter CS)."
  },
  {
    "id": "os_deadlock",
    "index": "08",
    "name": "Deadlock (Conditions & Handling)",
    "overview": "A state where a set of processes are blocked because each process holds a resource and waits for another.",
    "detailedTheory": "Deadlock requires four simultaneous conditions (Coffman Conditions): 1. Mutual Exclusion (non-shareable resources). 2. Hold & Wait. 3. No Preemption. 4. Circular Wait. Methods to handle: Prevention (disallow conditions), Avoidance (Banker's Algorithm), Detection & Recovery, or Ignore (Ostrich Algorithm).",
    "dryRun": "Using Resource Allocation Graph:\n1. P1 holds R1, requests R2.\n2. P2 holds R2, requests R1.\n3. Cycle exists (P1 -> R2 -> P2 -> R1 -> P1).\n4. Deadlock occurred.",
    "visualTrace": "    +---> [Resource 1] --- Held By ---> [Process 1] ---+\n    |                                                   |\n    |                                                Waits For\n    |                                                   |\n  Waits For                                             v\n    |                                             [Resource 2]\n    |                                                   |\n    +--- Held By --- [Process 2] <----------------------+",
    "code": {
      "cpp": "// C++ simulation showing deadlock scenario\n#include <mutex>\n#include <thread>\n\nstd::mutex m1, m2;\n\nvoid threadA() {\n    m1.lock();\n    std::this_thread::sleep_for(std::chrono::milliseconds(10));\n    m2.lock(); // Blocks waiting for Thread B\n}\n\nvoid threadB() {\n    m2.lock();\n    std::this_thread::sleep_for(std::chrono::milliseconds(10));\n    m1.lock(); // Blocks waiting for Thread A\n}",
      "python": "# Banker's Algorithm Safe State Checker snippet\ndef is_safe(processes, avail, max_req, alloc):\n    need = [[max_req[i][j] - alloc[i][j] for j in range(len(avail))] for i in range(len(processes))]\n    # Verify if sequence exists where work >= need for remaining processes\n    return True",
      "java": "public class DeadlockPrevention {\n    // Acquire locks in a strict global hierarchy to prevent circular wait\n    public void lockResources(Object a, Object b) {\n        Object first = a.hashCode() < b.hashCode() ? a : b;\n        Object second = first == a ? b : a;\n        synchronized(first) {\n            synchronized(second) {\n                // Work safely\n            }\n        }\n    }\n}"
    },
    "interviewQ": "What are the Coffman conditions and how can we prevent deadlock?",
    "interviewA": "The conditions are Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Prevention works by eliminating at least one condition, e.g., requiring processes to request all resources at once (precludes Hold & Wait) or forcing a global resource locking order (precludes Circular Wait)."
  },
  {
    "id": "os_producer_consumer",
    "index": "09",
    "name": "Producer-Consumer Problem",
    "overview": "Classic synchronization problem with a bounded buffer where producers write and consumers read.",
    "detailedTheory": "A producer adds items to a bounded buffer, and a consumer removes items. We must prevent: 1. Producer writing to a full buffer (overflow). 2. Consumer reading from an empty buffer (underflow). 3. Multiple producers/consumers editing the write index concurrently. Handled via Semaphores (Empty, Full, Mutex).",
    "dryRun": "Buffer size = 3, Semaphores: Empty=3, Full=0, Mutex=1\n1. Producer: wait(Empty) -> Empty=2. wait(Mutex) -> Mutex=0. Write item. signal(Mutex) -> Mutex=1. signal(Full) -> Full=1.\n2. Consumer: wait(Full) -> Full=0. wait(Mutex) -> Mutex=0. Read item. signal(Mutex) -> Mutex=1. signal(Empty) -> Empty=3.",
    "visualTrace": "[Producer] ===> [Buffer (Item, Empty, Empty)] ===> [Consumer]",
    "code": {
      "cpp": "// Thread-safe queue simulation\n#include <queue>\n#include <mutex>\n#include <condition_variable>\n\nclass BoundedBuffer {\n    std::queue<int> q;\n    std::mutex mtx;\n    std::condition_variable cv_full, cv_empty;\npublic:\n    void produce(int val) {\n        std::unique_lock<std::mutex> lock(mtx);\n        q.push(val);\n        cv_empty.notify_one();\n    }\n};",
      "python": "# Simulating producer-consumer using queue module\nimport queue, threading, time\n\nbuf = queue.Queue(maxsize=5)\n\ndef producer():\n    buf.put(1)\n\ndef consumer():\n    item = buf.get()",
      "java": "import java.util.concurrent.BlockingQueue;\nimport java.util.concurrent.ArrayBlockingQueue;\npublic class ProdCons {\n    // BlockingQueue handles synchronization internally\n    BlockingQueue<Integer> q = new ArrayBlockingQueue<>(10);\n}"
    },
    "interviewQ": "Which semaphores are used in the Producer-Consumer problem?",
    "interviewA": "Three semaphores are used: 1. A Mutex (binary) to ensure exclusive access to the buffer. 2. 'Empty' (counting) initialized to buffer size to track free slots. 3. 'Full' (counting) initialized to 0 to track filled slots."
  },
  {
    "id": "os_reader_writer",
    "index": "10",
    "name": "Reader-Writer Problem",
    "overview": "Ensures multiple readers can access a database concurrently, but writers get exclusive access.",
    "detailedTheory": "We have shared data. Any number of reader threads can read concurrently. Only one writer thread can update data at a time (blocking readers and other writers). Variations: 1. First (No readers kept waiting unless writer has permission). 2. Second (If writer is waiting, no new readers can start reading).",
    "dryRun": "Readers=0. Semaphore mutex=1, writeBlock=1\n1. Reader 1 arrives -> wait(mutex) -> increment readers to 1 -> calls wait(writeBlock) -> locks writeBlock. signal(mutex).\n2. Reader 2 arrives -> wait(mutex) -> increment readers to 2. signal(mutex). Readers read concurrently.\n3. Writer arrives -> wait(writeBlock) -> blocks.\n4. Readers exit. Reader 2 exits -> decrements readers to 0 -> calls signal(writeBlock). Writer is woken up.",
    "visualTrace": "Readers: [R1, R2, R3] (Read Concurrently ok)\nWriter:  [W1] (Blocks until Readers = 0)",
    "code": {
      "cpp": "// Classic Reader-Writer solution\n#include <mutex>\n\nstd::mutex readMtx, writeMtx;\nint readCount = 0;\n\nvoid reader() {\n    readMtx.lock();\n    readCount++;\n    if (readCount == 1) writeMtx.lock(); // block writers\n    readMtx.unlock();\n    // -- Read --\n    readMtx.lock();\n    readCount--;\n    if (readCount == 0) writeMtx.unlock(); // free writers\n    readMtx.unlock();\n}",
      "python": "# Reader-writer lock simulation\nimport threading\n\nclass RWLock:\n    def __init__(self):\n        self.readers = 0\n        self.r_lock = threading.Lock()\n        self.w_lock = threading.Lock()",
      "java": "import java.util.concurrent.locks.ReentrantReadWriteLock;\npublic class DBShared {\n    private final ReentrantReadWriteLock rw = new ReentrantReadWriteLock();\n    public void read() {\n        rw.readLock().lock();\n        // read\n        rw.readLock().unlock();\n    }\n}"
    },
    "interviewQ": "What is reader starvation and how can it be resolved?",
    "interviewA": "If new readers continue arriving, the active reader count never drops to zero. As a result, a waiting writer starves. It is resolved by giving priority to writers: once a writer requests access, arriving readers are queued behind the writer."
  },
  {
    "id": "os_paging",
    "index": "11",
    "name": "Paging",
    "overview": "A memory management scheme that maps virtual memory to non-contiguous physical memory frames.",
    "detailedTheory": "A program's virtual space is divided into fixed-size chunks called Pages. Physical RAM is divided into matching chunks called Frames. The CPU uses Page Tables to translate Virtual Addresses (composed of Page Number 'p' and Offset 'd') to Physical Frames, preventing external fragmentation.",
    "dryRun": "Page Size = 4KB. Virtual Address = 8196 (Page = 2, Offset = 4).\n1. CPU checks Page Table for index 2.\n2. Entry maps Page 2 to Physical Frame 5.\n3. Frame address = 5 * 4096 = 20480.\n4. Physical Address = 20480 + 4 = 20484.",
    "visualTrace": "Virtual Address: [Page Number p | Offset d]\n                    |\n                    v (Page Table Lookup)\nPhysical Address: [Frame Number f | Offset d]",
    "code": {
      "cpp": "// Simulating Address translation\n#include <iostream>\n#include <vector>\n\nint translate(int virtualAddr, const std::vector<int>& pageTable, int pageSize) {\n    int pageNum = virtualAddr / pageSize;\n    int offset = virtualAddr % pageSize;\n    int frameNum = pageTable[pageNum];\n    return (frameNum * pageSize) + offset;\n}",
      "python": "# Simple page table mapping simulator\nclass MemoryManager:\n    def __init__(self, page_size):\n        self.page_size = page_size\n        self.page_table = {0: 4, 1: 7, 2: 2} # Virtual -> Frame\n\n    def get_physical(self, v_addr):\n        p = v_addr // self.page_size\n        d = v_addr % self.page_size\n        return (self.page_table[p] * self.page_size) + d",
      "java": "public class PageTableSimulator {\n    public static int getFrame(int[] pageTable, int page) {\n        return pageTable[page];\n    }\n}"
    },
    "interviewQ": "What is a Translation Lookaside Buffer (TLB)?",
    "interviewA": "A TLB is a fast, associative hardware cache inside the CPU MMU that stores recent virtual-to-physical address translations. It bypasses memory Page Table queries, reducing lookup times.",
    "numericalExample": {
      "question": "A system uses 32-bit virtual addresses and a 4 KB page size. Find the page number and the offset for the virtual address 34212.",
      "solution": "Virtual Address (VA) = 34212\nPage Size = 4 KB = 4096 bytes\n\nPage Number (p) = VA / Page Size\n               = 34212 / 4096\n               = 8 (Integer division)\n\nOffset (d) = VA % Page Size\n           = 34212 % 4096\n           = 34212 - (8 * 4096)\n           = 34212 - 32768\n           = 1444 bytes",
      "answer": "Page Number = 8, Offset = 1444"
    }
  },
  {
    "id": "os_segmentation",
    "index": "12",
    "name": "Segmentation",
    "overview": "A memory scheme dividing programs into variable-sized logical segments (Code, Stack, Heap).",
    "detailedTheory": "Unlike paging which is transparent to user code, segmentation matches the user's view of a program (variables, functions, stack, etc.). The Segment Table stores base address and limit length. If offset exceeds limit, CPU triggers a segmentation fault.",
    "dryRun": "CPU requests segment 1, offset 100.\n1. Segment Table index 1 lookup -> Base=2000, Limit=150.\n2. Offset 100 is checked against Limit 150 (100 < 150 is valid).\n3. Address = 2000 + 100 = 2100.\n4. If offset were 200, offset > limit -> triggers crash.",
    "visualTrace": "Segment Table:\n[Seg ID] | [Limit] | [Base Address]\n   1     |   150   |     2000\n   2     |   800   |     4500",
    "code": {
      "cpp": "struct SegmentTableEntry {\n    int limit;\n    int base;\n};\n\nint translateSeg(int seg, int offset, SegmentTableEntry table[]) {\n    if (offset >= table[seg].limit) return -1; // Segment Fault\n    return table[seg].base + offset;\n}",
      "python": "# Simulating Segment Table fault logic\ndef segment_access(seg_id, offset, segment_table):\n    entry = segment_table.get(seg_id)\n    if offset >= entry['limit']:\n        raise SegmentFault(\"Access out of bounds!\")\n    return entry['base'] + offset",
      "java": "public class SegmentationExample {\n    static class Segment {\n        int base, limit;\n    }\n}"
    },
    "interviewQ": "How does Paging differ from Segmentation?",
    "interviewA": "Paging splits memory into fixed-sized blocks, avoiding external fragmentation but suffering from internal fragmentation. Segmentation splits memory logically into variable-sized blocks, matching logical program modules but suffering from external fragmentation."
  },
  {
    "id": "os_virtual_memory",
    "index": "13",
    "name": "Virtual Memory",
    "overview": "A technique mapping virtual addresses to swap space, letting systems run programs larger than physical RAM.",
    "detailedTheory": "Virtual memory separates user logical memory from physical memory. It uses Demand Paging: load pages only when requested during execution. When a program references a page not present in RAM, a page fault exception triggers, prompting the OS to fetch the page from disk.",
    "dryRun": "CPU accesses Page 4 (Valid-Invalid bit is 'I' -> Page Fault):\n1. Trap to OS.\n2. OS locates page on disk (swap space).\n3. OS finds a free physical frame in RAM.\n4. OS reads page from disk to Frame.\n5. OS updates Page Table (bit = 'V').\n6. Instruction restarts.",
    "visualTrace": "Virtual Memory Space ===> Page Table (Present? No -> Fault) ===> Read Frame from Disk ===> Write to RAM",
    "code": {
      "cpp": "// Simulating a page fault flag check\nstruct PageEntry {\n    int frame_number;\n    bool is_present; // V/I bit\n};\n\nvoid accessPage(PageEntry& entry) {\n    if (!entry.is_present) {\n        // Trigger Page Fault ISR\n        entry.frame_number = 99; // Mock allocate frame\n        entry.is_present = true;\n    }\n}",
      "python": "# Simulating Demand Paging Page Fault triggers\nclass VirtualMemory:\n    def __init__(self):\n        self.ram = {}\n        self.disk = {1: \"Data1\", 2: \"Data2\"}\n        \n    def read(self, page_num):\n        if page_num not in self.ram:\n            print(\"PAGE FAULT: fetching from disk...\")\n            self.ram[page_num] = self.disk[page_num]\n        return self.ram[page_num]",
      "java": "public class VirtualMemSim {\n    // Simulates virtual addresses translating or trapping to swap space\n}"
    },
    "interviewQ": "What are the advantages of Virtual Memory?",
    "interviewA": "It permits physical memory sharing among multiple processes, runs applications larger than physical memory size, and decreases initial page load times by avoiding complete loads at startup."
  },
  {
    "id": "os_page_replacement",
    "index": "14",
    "name": "Page Replacement Algorithms",
    "overview": "Decides which memory page to swap out when RAM is full (FIFO, LRU, Optimal).",
    "detailedTheory": "If no free frame exists during a page fault, page replacement is required. FIFO replaces the oldest page. LRU replaces the page that has not been accessed for the longest time. Optimal replaces the page that will not be used for the longest future duration (theoretical baseline).",
    "dryRun": "References: 1, 2, 3, 2, 1, 4. Capacity = 3 frames. LRU:\n1. [1, -, -] Page Fault\n2. [1, 2, -] Page Fault\n3. [1, 2, 3] Page Fault\n4. [1, 2, 3] Hit (2 accessed, recency order: 2, 3, 1)\n5. [1, 2, 3] Hit (1 accessed, recency order: 1, 2, 3)\n6. 4 arrives. 3 is least recently used -> [1, 2, 4] Page Fault.",
    "visualTrace": "Frames: | 1 | 2 | 3 |  --> Access 2, 1 --> Frames: | 1 | 2 | 4 | (3 evicted for 4)",
    "code": {
      "cpp": "// Simulating FIFO Page Replacement\n#include <iostream>\n#include <vector>\n#include <queue>\n#include <unordered_set>\n\nint fifoPageFaults(const std::vector<int>& pages, int capacity) {\n    std::unordered_set<int> s;\n    std::queue<int> indexes;\n    int faults = 0;\n    for (int p : pages) {\n        if (s.find(p) == s.end()) {\n            if (s.size() == capacity) {\n                int val = indexes.front(); indexes.pop();\n                s.erase(val);\n            }\n            s.insert(p);\n            indexes.push(p);\n            faults++;\n        }\n    }\n    return faults;\n}",
      "python": "# Simulating LRU Page Replacement using deque/list\ndef lru_page_faults(pages, capacity):\n    frames = []\n    faults = 0\n    for p in pages:\n        if p not in frames:\n            if len(frames) == capacity:\n                frames.pop(0) # Evict oldest access\n            frames.append(p)\n            faults += 1\n        else:\n            frames.remove(p)\n            frames.append(p) # Move to end\n    return faults",
      "java": "import java.util.*;\npublic class OptimalPageReplacement {\n    // Evicts page that will not be accessed for the longest time in the future\n}"
    },
    "interviewQ": "Explain Belady's Anomaly.",
    "interviewA": "Belady's Anomaly is a phenomenon where increasing the number of physical frames results in an increase in the number of page faults. This occurs in FIFO page replacement, but never in stack-based algorithms like LRU.",
    "numericalExample": {
      "question": "Find the total number of page faults using Least Recently Used (LRU) algorithm with a frame capacity of 3. Page reference string: 7, 0, 1, 2, 0, 3, 0.",
      "solution": "Reference | Frames    | Fault?\n----------|-----------|-------\n7         | [7, -, -] | Yes (1)\n0         | [7, 0, -] | Yes (2)\n1         | [7, 0, 1] | Yes (3)\n2         | [2, 0, 1] | Yes (4) (Evict 7 - LRU)\n0         | [2, 0, 1] | No (Hit)\n3         | [2, 0, 3] | Yes (5) (Evict 1 - LRU)\n0         | [2, 0, 3] | No (Hit)",
      "answer": "5 Page Faults"
    }
  },
  {
    "id": "os_thrashing",
    "index": "15",
    "name": "Thrashing",
    "overview": "A condition where the CPU spends more time swapping pages in and out than executing instructions.",
    "detailedTheory": "Thrashing occurs when the collective active pages (working set) of all running processes exceed the physical memory size. As a result, pages are evicted shortly before they are accessed again, forcing constant disk access. CPU utilization drops, prompting the OS to load more processes, which makes thrashing worse.",
    "dryRun": "1. Multi-programming level is set too high.\n2. Available physical frames per process drop.\n3. Process A faults, evicts a page of Process B.\n4. Process B immediately faults, evicts a page of Process A.\n5. CPU sits idle waiting for swap disk I/O.",
    "visualTrace": "      /\\ (CPU Utilization)\n     /  \\\n    /    \\ <--- Thrashing starts here\n   /      \\\n  +--------+----------------------------> Multiprogramming Level",
    "code": {
      "cpp": "// Simulating Working Set Window tracker\n#include <vector>\n#include <unordered_set>\n\n// Returns true if size of working set exceeds threshold\nbool isThrashing(const std::vector<int>& history, int window, int maxAllowed) {\n    std::unordered_set<int> uniquePages;\n    for (size_t i = history.size() - window; i < history.size(); i++) {\n        uniquePages.insert(history[i]);\n    }\n    return uniquePages.size() > maxAllowed;\n}",
      "python": "# Simple logic demonstrating thrashing checks\ndef check_system_thrashing(page_fault_rate):\n    if page_fault_rate > 0.85:\n        return \"DECREASE MULTIPROGRAMMING LEVEL (Suspend processes)\"\n    return \"OK\"",
      "java": "public class ThrashingDetector {\n    // Monitored via CPU utilization vs Page Fault Rates\n}"
    },
    "interviewQ": "How do you prevent Thrashing?",
    "interviewA": "Thrashing is prevented by using local page replacement (so a process cannot steal frames from others) or by monitoring the Working Set Model (ensuring a process is suspended if its working set demands exceed its allocation)."
  },
  {
    "id": "os_disk_scheduling",
    "index": "16",
    "name": "Disk Scheduling (SCAN, SSTF, FCFS)",
    "overview": "Algorithms that determine the optimal order to service disk I/O track requests.",
    "detailedTheory": "Disk scheduling reduces disk seek time (the time for the read/write head to move to the target track). FCFS serves requests in arriving order. SSTF (Shortest Seek Time First) services requests closest to the head first. SCAN moves the head back and forth across the tracks like an elevator.",
    "dryRun": "Requests: 98, 183, 37. Head starts at 53. SSTF:\n1. Diff to 98 is 45, to 183 is 130, to 37 is 16.\n2. Go to 37 first. (Seek = 53 - 37 = 16).\n3. From 37, closest is 98. (Seek = 98 - 37 = 61).\n4. From 98, closest is 183. (Seek = 183 - 98 = 85).\n5. Total seek = 16 + 61 + 85 = 162 cylinders.",
    "visualTrace": "Track Path (SSTF):\n53 ---> 37 ---> 98 ---> 183",
    "code": {
      "cpp": "// Simulating SSTF Disk Scheduling\n#include <iostream>\n#include <vector>\n#include <cmath>\n#include <algorithm>\n\nint sstfDiskSeek(std::vector<int> req, int head) {\n    int seek = 0;\n    while (!req.empty()) {\n        auto closest = std::min_element(req.begin(), req.end(), [head](int a, int b) {\n            return std::abs(a - head) < std::abs(b - head);\n        });\n        seek += std::abs(*closest - head);\n        head = *closest;\n        req.erase(closest);\n    }\n    return seek;\n}",
      "python": "# Simulating FCFS Disk Seek calculation\ndef fcfs_disk(requests, head):\n    seek = 0\n    current = head\n    for r in requests:\n        seek += abs(r - current)\n        current = r\n    return seek",
      "java": "public class ScanDiskScheduling {\n    // Moves in one direction to edge, then reverses to resolve remaining tracks\n}"
    },
    "interviewQ": "What is starvation in SSTF and how does SCAN solve it?",
    "interviewA": "In SSTF, requests close to the disk head are served first. If new close requests continue arriving, distant requests starve. SCAN prevents this by moving in a steady direction to the disk edge, servicing all requests along the path.",
    "numericalExample": {
      "question": "Calculate the total seek operations (cylinder movements) for Shortest Seek Time First (SSTF) scheduling. Queue: 98, 183, 37, 122, 14. Initial head position: 53.",
      "solution": "Initial Head = 53\n\n1. Distance to: 98 (45), 183 (130), 37 (16), 122 (69), 14 (39).\n   Closest is 37. Seek = |53 - 37| = 16. New head = 37.\n2. From 37, distance to: 98 (61), 183 (146), 122 (85), 14 (23).\n   Closest is 14. Seek = |37 - 14| = 23. New head = 14.\n3. From 14, distance to: 98 (84), 183 (169), 122 (108).\n   Closest is 98. Seek = |14 - 98| = 84. New head = 98.\n4. From 98, distance to: 122 (24), 183 (85).\n   Closest is 122. Seek = |98 - 122| = 24. New head = 122.\n5. From 122, distance to: 183 (61).\n   Closest is 183. Seek = |122 - 183| = 61. New head = 183.\n\nTotal Seek = 16 + 23 + 84 + 24 + 61 = 208 cylinders.",
      "answer": "208 cylinders"
    }
  },
  {
    "id": "os_file_system",
    "index": "17",
    "name": "File System Structure",
    "overview": "Organizes disk space using structures like FAT, NTFS, and UNIX Inodes.",
    "detailedTheory": "A File System provides logical files over raw block storage. Allocation styles: 1. Contiguous (leads to external fragmentation). 2. Linked Allocation (file is a linked list of sectors; slow random access). 3. Indexed (uses index blocks like UNIX Inodes, storing direct and indirect block pointers).",
    "dryRun": "Accessing block 5 of an Indexed File:\n1. OS checks the file's Inode structure.\n2. Inode lists direct block addresses [102, 105, 109, 114, 120, ...].\n3. Address for index 5 is 120.\n4. CPU issues physical disk read to block 120.",
    "visualTrace": "Inode ---> [Direct Block Pointers (0-11)]\n      ---> [Single Indirect Pointer] ===> [Block Table]\n      ---> [Double Indirect Pointer]",
    "code": {
      "cpp": "// Approximating simple Inode structure\nstruct Inode {\n    int file_size;\n    int permissions;\n    int direct_blocks[12];\n    int indirect_block;\n};",
      "python": "# Simulating simple Linked List file allocation map\nclass LinkedAllocation:\n    def __init__(self):\n        self.fat = {0: 3, 3: 8, 8: -1} # End of file marker is -1\n\n    def get_blocks(self, start):\n        blocks = []\n        curr = start\n        while curr != -1:\n            blocks.append(curr)\n            curr = self.fat[curr]\n        return blocks",
      "java": "public class FileDescriptorSim {\n    // Simulates OS file descriptor table pointing to system open file tables\n}"
    },
    "interviewQ": "How do direct and indirect pointers in Inodes handle large file sizes?",
    "interviewA": "Direct pointers point to file data blocks. For larger files, the inode uses an indirect pointer that points to a block containing a list of block pointers. Double/triple indirect pointers point to multi-level indices, enabling gigabyte-scale files."
  },
  {
    "id": "os_raid",
    "index": "18",
    "name": "RAID Levels",
    "overview": "Redundant Array of Independent Disks (RAID) levels to improve write speed, read speed, or reliability.",
    "detailedTheory": "RAID combines physical disk drives into a single logical unit. RAID 0 uses striping (performance, no redundancy). RAID 1 uses mirroring (reliability, high overhead). RAID 5 uses block striping with distributed parity, balancing performance and reliability. RAID 10 combines RAID 1 and RAID 0.",
    "dryRun": "RAID 0 (2 disks):\n1. Write bytes [A, B, C, D].\n2. Disk 1 gets [A, C], Disk 2 gets [B, D] (Parallel write, fast).\n\nRAID 1 (2 disks):\n1. Write bytes [A, B].\n2. Disk 1 gets [A, B], Disk 2 gets [A, B] (Mirror copies).",
    "visualTrace": "RAID 0 (Striping):  [Disk 1: A, C]  [Disk 2: B, D]\nRAID 1 (Mirroring): [Disk 1: A, B]  [Disk 2: A, B]",
    "code": {
      "cpp": "// Simulating RAID 0 write splitting\n#include <iostream>\n#include <vector>\n#include <string>\n\nvoid raid0Write(const std::string& data, std::vector<char>& d1, std::vector<char>& d2) {\n    for (size_t i = 0; i < data.size(); i++) {\n        if (i % 2 == 0) d1.push_back(data[i]);\n        else d2.push_back(data[i]);\n    }\n}",
      "python": "# Simulating RAID 1 parity/mirror checks\ndef raid1_read(disk1_data, disk2_data):\n    if disk1_data == disk2_data:\n        return disk1_data\n    raise IntegrityError(\"Mirror data mismatch!\")",
      "java": "public class RaidParitySim {\n    // Simulates RAID 5 XOR parity checks: P = D1 ^ D2 ^ D3\n    public static int calculateParity(int d1, int d2, int d3) {\n        return d1 ^ d2 ^ d3;\n    }\n}"
    },
    "interviewQ": "What is the minimum disk requirement for RAID 5 and how does it recover from failure?",
    "interviewA": "The minimum requirement is 3 disks. RAID 5 distributes parity across all disks. If one disk fails, the missing data is reconstructed by executing an XOR operation on the remaining data and parity blocks.",
    "numericalExample": {
      "question": "A company sets up a RAID 5 array using five 2 TB hard drives. Calculate the total usable storage capacity and the storage overhead ratio.",
      "solution": "Number of drives (N) = 5\nCapacity per drive (C) = 2 TB\n\nUsable storage capacity for RAID 5 = (N - 1) * C\n                                  = (5 - 1) * 2 TB\n                                  = 4 * 2 TB\n                                  = 8 TB\n\nStorage Overhead = 1 drive capacity (for parity) = 2 TB\nOverhead Ratio = Parity Capacity / Total Capacity\n               = 2 TB / 10 TB = 20%",
      "answer": "Usable Capacity = 8 TB, Overhead = 20%"
    }
  },
  {
    "id": "os_io_management",
    "index": "19",
    "name": "I/O Management",
    "overview": "How the OS interacts with device controllers using Polling, Interrupts, and DMA.",
    "detailedTheory": "Device drivers communicate with controller registers. 1. Polling: CPU checks status registers in a loop (busy waiting, wasteful). 2. Interrupts: Controller sends a signal to wake the CPU. 3. Direct Memory Access (DMA): Controller transfers data blocks directly to RAM, interrupting the CPU only when the entire transfer finishes.",
    "dryRun": "Using DMA:\n1. CPU writes transfer details (source, dest, size) to DMA register.\n2. DMA controller executes block copy from device to RAM.\n3. CPU performs other tasks concurrently.\n4. Copy completes -> DMA sends interrupt to CPU.",
    "visualTrace": "CPU ---> Initiates DMA ---> Performs other operations...\nDevice Controller ===(DMA direct transfer)===> RAM\nDMA Controller ---> Interrupts CPU on completion",
    "code": {
      "cpp": "// Mock driver interface representing register polling\nbool isDeviceReady(volatile int* statusReg) {\n    while ((*statusReg & 0x01) == 0) {\n        // Busy wait (polling)\n    }\n    return true;\n}",
      "python": "# Simulating DMA controller trigger\nclass DMAController:\n    def transfer_to_ram(self, device, ram, blocks):\n        for b in blocks:\n            ram[b] = device.read(b)\n        # Trigger hardware interrupt\n        return \"INTERRUPT: DMA Completed\"",
      "java": "public class IODeviceDriver {\n    // Java interface calling native OS functions (JNI) for I/O operations\n}"
    },
    "interviewQ": "Why is DMA preferred over interrupt-driven I/O for large data transfers?",
    "interviewA": "Interrupt-driven I/O requires the CPU to handle every word transfer, causing massive interrupt overhead. DMA offloads this to a dedicated controller, reducing CPU interrupts to a single event at the end of the transfer."
  }
];

const OsTheory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [activeLang, setActiveLang] = useState('cpp'); // C++ default
  const [selectedConceptId, setSelectedConceptId] = useState(() => {
    const fromUrl = searchParams.get('concept');
    if (fromUrl && osConcepts.some(c => c.id === fromUrl)) {
      return fromUrl;
    }
    return 'os_process_thread';
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
    const saved = localStorage.getItem('completed_os_concepts');
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
    localStorage.setItem('completed_os_concepts', JSON.stringify(newCompleted));
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

  const selectedConcept = osConcepts.find(c => c.id === selectedConceptId) || osConcepts[0];

  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1450px', margin: '40px auto', padding: '0 24px' }}>
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

        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
          borderRadius: '24px',
          padding: '36px 40px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(30, 58, 138, 0.08)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  OS Masterclass
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>•</span>
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock className="size-4 text-blue-400" /> Operating Systems Syllabus
                </span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
                Operating Systems (OS) Notes
              </h1>
              <p style={{ fontSize: '0.94rem', color: '#93c5fd', maxWidth: '750px', lineHeight: '1.5', margin: 0 }}>
                Master Processes, Threads, Memory Management, CPU Scheduling, Synchronization, Deadlocks, File Systems, and I/O.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '800px', overflowY: 'auto', paddingRight: '4px' }}>
            {osConcepts.map((concept) => {
              const isSelected = concept.id === selectedConceptId;
              const isCompleted = completedConcepts.includes(concept.id);
              
              return (
                <div 
                  key={concept.id}
                  onClick={() => setSelectedConceptId(concept.id)}
                  style={{
                    background: isSelected ? 'linear-gradient(to right, #eff6ff, #dbeafe)' : '#ffffff',
                    border: isSelected ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.06)' : '0 1px 3px rgba(0,0,0,0.01)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#93c5fd';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div 
                      onClick={(e) => toggleConceptCompleted(concept.id, e)}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: isCompleted ? '2px solid #3b82f6' : '2px solid #cbd5e1',
                        background: isCompleted ? '#3b82f6' : 'transparent',
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
                        color: isSelected ? '#1e3a8a' : '#1e293b',
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
                    background: isCompleted ? '#dbeafe' : '#f1f5f9',
                    color: isCompleted ? '#1e3a8a' : '#64748b',
                    flexShrink: 0
                  }}>
                    {isCompleted ? 'Mastered' : 'Todo'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Core Overview & Detailed Theory */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'grid', placeItems: 'center' }}>
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
                    background: completedConcepts.includes(selectedConcept.id) ? '#dbeafe' : '#3b82f6',
                    color: completedConcepts.includes(selectedConcept.id) ? '#1e3a8a' : '#ffffff',
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

              <div style={{ padding: '20px', background: '#f8fafc', borderLeft: '4px solid #3b82f6', borderRadius: '8px', marginBottom: '20px' }}>
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

            {/* Implementation Blueprints */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#3b82f6', display: 'grid', placeItems: 'center' }}>
                    <Terminal className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Syntax & Implementation</h3>
                </div>

                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
                  {['cpp', 'python', 'java'].map(l => (
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
                  <code>{selectedConcept.code[activeLang] || `// No code snippet loaded.`}</code>
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

            {/* Visual Trace & Dry Run */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#3b82f6', display: 'grid', placeItems: 'center' }}>
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

            {/* Numerical Example & Solution */}
            {selectedConcept.numericalExample && (
              <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                    <Calculator className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Numerical Example & Solution</h3>
                </div>

                <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#166534', display: 'block', marginBottom: '8px' }}>
                    Problem: {selectedConcept.numericalExample.question}
                  </strong>
                  <div style={{ fontSize: '0.86rem', color: '#14532d', lineHeight: '1.6' }}>
                    <strong>Steps & Calculation:</strong>
                    <pre style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #dcfce7', marginTop: '8px', fontFamily: 'monospace', fontSize: '0.82rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                      {selectedConcept.numericalExample.solution}
                    </pre>
                    <div style={{ marginTop: '12px', fontSize: '0.9rem' }}>
                      <strong>Final Answer:</strong> <span style={{ fontWeight: 800, color: '#15803d' }}>{selectedConcept.numericalExample.answer}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

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

export default OsTheory;
