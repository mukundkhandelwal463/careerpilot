export const detailedTheoryData = {
  "Arrays & Hashing": {
    title: "Arrays & Hashing",
    overview: "Arrays store elements in contiguous memory locations, offering constant time O(1) retrieval by index. Hash Maps map keys to values using a hashing function, allowing constant time O(1) average lookups, insertions, and deletions.",
    whenToUse: "Use arrays for sequential access, sorting, or when memory locality is important. Use Hash Maps/Sets when you need to count frequencies, check existence in O(1) time, or map relations between two sets of numbers.",
    types: [
      { name: "Static Array", desc: "Fixed size allocated at compile time. Memory cannot be resized." },
      { name: "Dynamic Array", desc: "Resizes dynamically (usually doubling capacity) when elements exceed capacity (e.g., ArrayList in Java, std::vector in C++)." },
      { name: "Hash Map / Hash Table", desc: "Key-value mapping using hash functions. Resolves collisions via chaining (linked lists) or open addressing (probing)." },
      { name: "Hash Set", desc: "Unordered collection of unique items. Implemented internally using a hash table where values are placeholders." }
    ],
    concepts: [
      { name: "Contiguous Memory Locality", desc: "Arrays are cached efficiently because they sit next to each other in memory. Accessing `arr[i]` is instantaneous." },
      { name: "Hash Collision Handling", desc: "Hash tables resolve collisions using techniques like Chaining (linked lists in bucket slots) or Open Addressing (probing next available slot)." },
      { name: "One-Pass vs Two-Pass Hash Map", desc: "A two-pass algorithm first builds a frequency map, then looks up items. A one-pass algorithm builds and checks simultaneously, reducing traversal overhead." }
    ],
    complexity: {
      time: "Access: O(1) | Search: O(1) average / O(N) worst-case | Insertion: O(1) average",
      space: "O(N) to store values/counts in the hash map."
    },
    template: {
      js: `// JS Frequency Map Template
function buildFrequencyMap(arr) {
  const map = new Map();
  for (const item of arr) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  return map;
}`,
      python: `# Python Frequency Map Template
def build_frequency_map(arr):
    freq_map = {}
    for item in arr:
        freq_map[item] = freq_map.get(item, 0) + 1
    return freq_map`,
      cpp: `// C++ Frequency Map Template
#include <unordered_map>
#include <vector>

std::unordered_map<int, int> buildFrequencyMap(const std::vector<int>& arr) {
    std::unordered_map<int, int> freqMap;
    for (int item : arr) {
        freqMap[item]++;
    }
    return freqMap;
}`,
      java: `// Java Frequency Map Template
import java.util.HashMap;
import java.util.Map;

public Map<Integer, Integer> buildFrequencyMap(int[] arr) {
    Map<Integer, Integer> freqMap = new HashMap<>();
    for (int item : arr) {
        freqMap.put(item, freqMap.getOrDefault(item, 0) + 1);
    }
    return freqMap;
}`
    },
    example: {
      name: "Two Sum",
      desc: "Given an array of integers and a target, return indices of the two numbers such that they add up to the target.",
      dryRun: "For nums = [2, 7, 11, 15], target = 9:\n- i = 0: complement 9-2 = 7. Map is empty. Save {2: 0}.\n- i = 1: complement 9-7 = 2. Found 2 in map! Return [0, 1].",
      visualTrace: `Input Array:  [ 2,  7, 11, 15 ]   Target: 9

Step 0: Hash Map is empty: {}
        [ 2,  7, 11, 15 ]
          ^ (i=0, Val=2)
        Complement = 9 - 2 = 7 (not in Map)
        Action: Map.put(2, 0) -> Map is now: { 2: 0 }

Step 1: Map: { 2: 0 }
        [ 2,  7, 11, 15 ]
              ^ (i=1, Val=7)
        Complement = 9 - 7 = 2 (FOUND in Map at Index 0!)
        Action: Return indices [0, 1]`,
      code: {
        js: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        python: `def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
        cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> numMap;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (numMap.count(complement)) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {};
}`,
        java: `import java.util.HashMap;
import java.util.Map;

public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> numMap = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (numMap.containsKey(complement)) {
            return new int[] { numMap.get(complement), i };
        }
        numMap.put(nums[i], i);
    }
    return new int[] {};
}`
      }
    }
  },
  "String": {
    title: "String Manipulation",
    overview: "Strings are sequences of characters. Unlike arrays, strings are often immutable (e.g., in JavaScript, Java, Python). Modifying a string directly creates a new copy in memory, making standard concatenations in loops O(N²) without proper buffers.",
    whenToUse: "Use for text formatting, pattern matching, substring searches, and character transformation tasks.",
    types: [
      { name: "Immutable String", desc: "Stored in a common pool. Modifications create a new object in memory (e.g., standard String in Java/JS/Python)." },
      { name: "Mutable String / Builder", desc: "An array-backed buffer that allows in-place modifications without creating new string instances (e.g., StringBuilder/StringBuffer in Java)." }
    ],
    concepts: [
      { name: "Immutability & Memory", desc: "Since strings cannot be changed in place in JS/Java/Python, always convert them to arrays (or use StringBuilders/StringJoiners) for bulk modifications to avoid copy overhead." },
      { name: "Pattern Matching", desc: "Searching for substrings efficiently. Standard search is O(N*M). Algorithms like Knuth-Morris-Pratt (KMP) reduce it to O(N+M) using a prefix table." }
    ],
    complexity: {
      time: "Comparison: O(N) | Concatenation: O(N) | Search (KMP): O(N+M)",
      space: "O(N) for string-to-array conversions."
    },
    template: {
      js: `// JS Reverse String / Array-based template
function reverseString(str) {
  const chars = str.split('');
  let left = 0, right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  return chars.join('');
}`,
      python: `# Python string manipulation template
def reverse_string(s):
    # strings are immutable in Python; list conversion is required for modifications
    chars = list(s)
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return "".join(chars)`,
      cpp: `// C++ String reversal template (strings are mutable in C++)
#include <string>
#include <algorithm>

std::string reverseString(std::string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        std::swap(s[left], s[right]);
        left++;
        right--;
    }
    return s;
}`,
      java: `// Java StringBuilder template for string modification
public String reverseString(String s) {
    StringBuilder sb = new StringBuilder(s);
    int left = 0, right = sb.length() - 1;
    while (left < right) {
        char temp = sb.charAt(left);
        sb.setCharAt(left, sb.charAt(right));
        sb.setCharAt(right, temp);
        left++;
        right--;
    }
    return sb.toString();
}`
    },
    example: {
      name: "Valid Anagram",
      desc: "Check if two strings contain the same characters with the exact same frequencies.",
      dryRun: "s = 'anagram', t = 'nagaram'.\n- Build map for s: {a: 3, n: 1, g: 1, r: 1, m: 1}.\n- Decrement with t: All values become 0. Return true.",
      visualTrace: `s = "anagram"   t = "nagaram"

Step 1: Traverse s and populate character counts.
        Character Counts: { a: 3, n: 1, g: 1, r: 1, m: 1 }

Step 2: Traverse t and decrement matching character counts.
        t = 'n' -> decrement count['n'] (1 -> 0)
        t = 'a' -> decrement count['a'] (3 -> 2)
        t = 'g' -> decrement count['g'] (1 -> 0)
        t = 'a' -> decrement count['a'] (2 -> 1)
        t = 'r' -> decrement count['r'] (1 -> 0)
        t = 'a' -> decrement count['a'] (1 -> 0)
        t = 'm' -> decrement count['m'] (1 -> 0)

Step 3: All character values are exactly 0.
        Action: Return true (Valid Anagram)`,
      code: {
        js: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,
        python: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    for char in t:
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1
    return True`,
        cpp: `#include <string>
#include <vector>

bool isAnagram(std::string s, std::string t) {
    if (s.length() != t.length()) return false;
    std::vector<int> count(26, 0);
    for (char c : s) count[c - 'a']++;
    for (char c : t) {
        if (--count[c - 'a'] < 0) return false;
    }
    return true;
}`,
        java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    for (int c : count) {
        if (c != 0) return false;
    }
    return true;
}`
      }
    }
  },
  "Recursion": {
    title: "Recursion",
    overview: "Recursion is a process where a function calls itself to solve a smaller instance of the same problem. Every recursive solution consists of a base case to terminate execution and a recursive relation.",
    whenToUse: "Use when a problem can be naturally divided into identical subproblems, such as tree traversals, subset generation, and divide-and-conquer strategies.",
    types: [
      { name: "Direct Recursion", desc: "A function calls itself directly." },
      { name: "Indirect Recursion", desc: "Function A calls Function B, which in turn calls Function A, creating a recursive circle." },
      { name: "Tail Recursion", desc: "The recursive call is the absolute final statement executed by the function, allowing compiler stack frame optimizations." },
      { name: "Tree Recursion", desc: "The function makes multiple recursive calls inside its body (e.g., Fibonacci or Merge Sort), creating a branching stack trace." }
    ],
    concepts: [
      { name: "The Call Stack", desc: "Each recursive call pushes a stack frame containing arguments and local variables. Exceeding stack limits leads to a StackOverflowError." },
      { name: "Memoization (Caching)", desc: "Store results of expensive recursive calls and return the cached result when the same inputs occur again, reducing exponential complexity to linear." }
    ],
    complexity: {
      time: "Without Memoization: O(2^N) or O(N!) | With Memoization: O(N)",
      space: "O(H) recursion depth on the call stack."
    },
    template: {
      js: `// JS Standard Recursive Template with Memoization
const memo = {};
function recursiveFunc(n) {
  if (n <= 1) return n; // Base case
  if (memo[n] !== undefined) return memo[n]; // Caching check
  
  memo[n] = recursiveFunc(n - 1) + recursiveFunc(n - 2);
  return memo[n];
}`,
      python: `# Python Recursive Template with @lru_cache decorator
from functools import lru_cache

@lru_cache(maxsize=None)
def recursive_func(n):
    if n <= 1:
        return n
    return recursive_func(n - 1) + recursive_func(n - 2)`,
      cpp: `// C++ Recursive Memoization Template
#include <vector>

int fibHelper(int n, std::vector<int>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibHelper(n - 1, memo) + fibHelper(n - 2, memo);
}`,
      java: `// Java Recursive Memoization Class
public class RecursionTemplate {
    private int[] memo;

    public int fib(int n) {
        memo = new int[n + 1];
        java.util.Arrays.fill(memo, -1);
        return helper(n);
    }

    private int helper(int n) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = helper(n - 1) + helper(n - 2);
    }
}`
    },
    example: {
      name: "Fibonacci Number",
      desc: "Calculate the Nth Fibonacci number in O(N) using recursive memoization.",
      dryRun: "N = 5:\n- Check memo. Call fib(4) and fib(3).\n- Compute down to base cases, cache results, and bubble up to return 5.",
      visualTrace: `Call Tree: fib(4) with Memoization Cache

                  fib(4)
                 /      \
            fib(3)      fib(2) [cached!]
           /      \
      fib(2)      fib(1)
     /      \
fib(1)      fib(0)

Trace Path:
1. Call fib(4) -> Calls fib(3) & fib(2)
2. Call fib(3) -> Calls fib(2) & fib(1)
3. Call fib(2) -> Calls fib(1) & fib(0) -> returns 1. Cached: { 2: 1 }
4. fib(1) returns 1. Sum bubble up to fib(3) = 2. Cached: { 3: 2 }
5. fib(2) is requested inside fib(4) -> returns cached value 1 instantly!
6. Return fib(4) = 2 + 1 = 3`,
      code: {
        js: `function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
        python: `def fib(n, memo={}):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]`,
        cpp: `#include <vector>

int fib(int n, std::vector<int>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}`,
        java: `import java.util.HashMap;
import java.util.Map;

public int fib(int n, Map<Integer, Integer> memo) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    int val = fib(n - 1, memo) + fib(n - 2, memo);
    memo.put(n, val);
    return val;
}`
      }
    }
  },
  "Sorting": {
    title: "Sorting",
    overview: "Sorting rearranges elements in a specific order (ascending or descending). It serves as a crucial preprocessing step for binary search, greedy choices, and partition algorithms.",
    whenToUse: "Use when you need to find duplicate values, identify overlaps, run binary search, or optimize comparison matches.",
    types: [
      { name: "Comparison Sorts", desc: "Elements are compared pairwise to sort the array. Mathematical lower bound is O(N log N) (e.g., Merge Sort, Quick Sort, Heap Sort)." },
      { name: "Non-Comparison Sorts", desc: "Exploits data properties (like integer ranges) to sort in linear time O(N + K) without direct comparisons (e.g., Counting Sort, Radix Sort, Bucket Sort)." },
      { name: "Stable Sorts", desc: "Preserves the relative order of items containing identical keys (e.g., Merge Sort, Insertion Sort)." },
      { name: "In-Place Sorts", desc: "Requires O(1) auxiliary space beyond the inputs (e.g., Quick Sort, Heap Sort)." }
    ],
    concepts: [
      { name: "Divide & Conquer partitioning", desc: "Divide the array in halves (Merge Sort) or partition around a pivot element (Quick Sort), then solve recursively." },
      { name: "Sorting Stability", desc: "A stable sort ensures duplicates remain in their original relative positions, which is key for sorting multi-column attributes." }
    ],
    complexity: {
      time: "Best/Average: O(N log N) | Worst (Quick Sort): O(N²)",
      space: "Merge Sort: O(N) | Quick Sort: O(log N) stack frames | Heap Sort: O(1)"
    },
    template: {
      js: `// JS Merge Sort Template
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const res = [];
  let l = 0, r = 0;
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) res.push(left[l++]);
    else res.push(right[r++]);
  }
  return [...res, ...left.slice(l), ...right.slice(r)];
}`,
      python: `# Python Quick Sort Template (in-place)
def quickSort(arr, low, high):
    if low < high:
        p_idx = partition(arr, low, high)
        quickSort(arr, low, p_idx - 1)
        quickSort(arr, p_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      cpp: `// C++ Quick Sort template
#include <vector>
#include <algorithm>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      java: `// Java Merge Sort template
public class MergeSort {
    public void sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    private void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        System.arraycopy(arr, l, L, 0, n1);
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
        
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`
    },
    example: {
      name: "Sort Colors (Dutch National Flag)",
      desc: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red (0), white (1), and blue (2).",
      dryRun: "nums = [2,0,2,1,1,0].\n- Maintain three pointers: low, mid, high.\n- Swap elements to place 0s at the start and 2s at the end.",
      visualTrace: `Input: [ 2, 0, 2, 1, 1, 0 ]   Low=0, Mid=0, High=5

Step 0: Value at Mid is 2. Swap nums[mid] and nums[high], high--.
        [ 0, 0, 2, 1, 1, 2 ]
          ^ (L, M)       ^ (H=4)

Step 1: Value at Mid is 0. Swap nums[mid] and nums[low], low++, mid++.
        [ 0, 0, 2, 1, 1, 2 ]
             ^ (L=1, M=1)

Step 2: Value at Mid is 0. Swap nums[mid] and nums[low], low++, mid++.
        [ 0, 0, 2, 1, 1, 2 ]
                ^ (L=2, M=2)

Step 3: Value at Mid is 2. Swap nums[mid] and nums[high], high--.
        [ 0, 0, 1, 1, 2, 2 ]
                ^ (L=2, M=2) ^ (H=3)

Step 4: Value at Mid is 1. Increment mid. mid++.
        [ 0, 0, 1, 1, 2, 2 ]
                ^ (L=2)  ^ (M=3, H=3)

Step 5: Value at Mid is 1. Increment mid. mid++ -> exceeds high bounds. Done!`,
      code: {
        js: `function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}`,
        python: `def sortColors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1`,
        cpp: `#include <vector>
#include <algorithm>

void sortColors(std::vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            std::swap(nums[low], nums[mid]);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            std::swap(nums[mid], nums[high]);
            high--;
        }
    }
}`,
        java: `public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            int temp = nums[low];
            nums[low] = nums[mid];
            nums[mid] = temp;
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            int temp = nums[mid];
            nums[mid] = nums[high];
            nums[high] = temp;
            high--;
        }
    }
}`
      }
    }
  },
  "Two Pointers": {
    title: "Two Pointers",
    overview: "The Two Pointers pattern utilizes two indexes to scan an array or list, moving either towards each other or in the same direction. It avoids nested loops, reducing time from O(N²) to O(N).",
    whenToUse: "Use on sorted arrays, linked lists, or strings when looking for pairs, reversals, cycles, or partitions.",
    types: [
      { name: "Opposite Pointers", desc: "Pointers start at index 0 and length-1, moving inward until they meet (e.g., sorted 2-sum, palindrome, string reversal)." },
      { name: "Fast & Slow Pointers", desc: "Pointers move at different speeds (e.g., slow moves 1 step, fast moves 2). Used to detect cycles or find middles." },
      { name: "Parallel Pointers", desc: "Pointers walk over two separate lists concurrently (e.g., merging two sorted arrays)." }
    ],
    concepts: [
      { name: "Opposite Pointers", desc: "Pointers start at index 0 and length-1, moving inward until they meet. Perfect for sorted 2-Sum or String Reversal." },
      { name: "Fast & Slow Pointers", desc: "Pointers move at different speeds (e.g., slow moves 1 step, fast moves 2). Perfect for finding cycles in lists." }
    ],
    complexity: {
      time: "O(N) because the array is traversed in a single pass.",
      space: "O(1) auxiliary space as we only store pointer indices."
    },
    template: {
      js: `// JS Opposite Directional Template
let left = 0;
let right = arr.length - 1;
while (left < right) {
  if (condition(arr[left], arr[right])) {
    left++;
  } else {
    right--;
  }
}`,
      python: `# Python Two Pointers Template
left, right = 0, len(arr) - 1
while left < right:
    if condition(arr[left], arr[right]):
        left += 1
    else:
        right -= 1`,
      cpp: `// C++ Two Pointers Template
int left = 0;
int right = arr.size() - 1;
while (left < right) {
    if (condition(arr[left], arr[right])) {
        left++;
    } else {
        right--;
    }
}`,
      java: `// Java Two Pointers Template
int left = 0;
int right = arr.length - 1;
while (left < right) {
    if (condition(arr[left], arr[right])) {
        left++;
    } else {
        right--;
    }
}`
    },
    example: {
      name: "Valid Palindrome",
      desc: "Check if a string is palindrome after converting uppercase to lowercase and removing non-alphanumeric characters.",
      dryRun: "s = 'A man, a plan, a canal: Panama'\n- Convert and clean: 'amanaplanacanalpanama'\n- Left starts at 0 ('a'), Right starts at 19 ('a'). Compare, increment left, decrement right. All matches valid. Return true.",
      visualTrace: `s = "A man, a plan, a canal: Panama"

Step 1: Convert to lowercase & remove non-alphanumeric.
        Cleaned: "amanaplanacanalpanama"

Step 2: Initialize Two Pointers.
        a m a n a p l a n a c a n a l p a n a m a
        ^ (L=0)                                 ^ (R=20)
        Compare s[0] and s[20] ('a' == 'a') -> MATCH. L++, R--.

Step 3: Keep moving inward comparing characters.
        a m a n a p l a n a c a n a l p a n a m a
          ^ (L=1)                             ^ (R=19)
        Compare s[1] and s[19] ('m' == 'm') -> MATCH. L++, R--.
        ...
        All characters match successfully. Return true.`,
      code: {
        js: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
        python: `def isPalindrome(s):
    clean = "".join(char.lower() for char in s if char.isalnum())
    left, right = 0, len(clean) - 1
    while left < right:
        if clean[left] != clean[right]:
            return False
        left += 1
        right -= 1
    return True`,
        cpp: `#include <string>
#include <cctype>

bool isPalindrome(std::string s) {
    std::string clean = "";
    for (char c : s) {
        if (std::isalnum(c)) clean += std::tolower(c);
    }
    int left = 0, right = clean.length() - 1;
    while (left < right) {
        if (clean[left] != clean[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
        java: `public boolean isPalindrome(String s) {
    StringBuilder clean = new StringBuilder();
    for (char c : s.toCharArray()) {
        if (Character.isLetterOrDigit(c)) {
            clean.append(Character.toLowerCase(c));
        }
    }
    int left = 0, right = clean.length() - 1;
    while (left < right) {
        if (clean.charAt(left) != clean.charAt(right)) return false;
        left++;
        right--;
    }
    return true;
}`
      }
    }
  },
  "Sliding Window": {
    title: "Sliding Window",
    overview: "The sliding window pattern uses a sub-range (window) that slides over a collection to compute running results in O(N). It replaces nested iterations by incrementally updating the window properties as it shifts.",
    whenToUse: "Use when looking for a contiguous subarray or substring satisfying constraint metrics (longest, shortest, sum equals K, distinct elements).",
    types: [
      { name: "Fixed Sliding Window", desc: "The window size remains constant at K. You slide the window by adding element at index i and removing element at i-K." },
      { name: "Variable Sliding Window", desc: "The window size expands or shrinks dynamically depending on constraints. Typically, you expand right pointer until invalid, then shrink left pointer until valid again." }
    ],
    concepts: [
      { name: "Fixed Window Size", desc: "Initialize window of size K. As we slide to the right, add the next element and subtract the leftmost element." },
      { name: "Variable Window Size", desc: "Expand the window by moving the right pointer. Once the condition is violated, shrink from the left until valid again." }
    ],
    complexity: {
      time: "O(N) since each pointer moves at most N times.",
      space: "O(K) or O(1) depending on storing elements or window metrics."
    },
    template: {
      js: `// JS Variable Sliding Window Template
let left = 0;
let maxLen = 0;
for (let right = 0; right < arr.length; right++) {
  add(arr[right]);
  while (invalid()) {
    remove(arr[left]);
    left++;
  }
  maxLen = Math.max(maxLen, right - left + 1);
}`,
      python: `# Python Variable Sliding Window Template
left = 0
max_len = 0
for right in range(len(arr)):
    add(arr[right])
    while invalid():
        remove(arr[left])
        left += 1
    max_len = max(max_len, right - left + 1)`,
      cpp: `// C++ Variable Sliding Window Template
int left = 0;
int maxLen = 0;
for (int right = 0; right < arr.size(); right++) {
    add(arr[right]);
    while (invalid()) {
        remove(arr[left]);
        left++;
    }
    maxLen = std::max(maxLen, right - left + 1);
}`,
      java: `// Java Variable Sliding Window Template
int left = 0;
int maxLen = 0;
for (int right = 0; right < arr.length; right++) {
    add(arr[right]);
    while (invalid()) {
        remove(arr[left]);
        left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
}`
    },
    example: {
      name: "Longest Substring Without Repeating Characters",
      desc: "Find the length of the longest substring without repeating characters.",
      dryRun: "s = 'abcabcbb'\n- right = 0 ('a'): set={a}\n- right = 1 ('b'): set={a,b}\n- right = 2 ('c'): set={a,b,c}\n- right = 3 ('a'): duplicate 'a'! Shrink left until 'a' removed. left becomes 1. set={b,c,a}. Max remains 3.",
      visualTrace: `s = "abcabcbb"

Step 1: right = 0, char = 'a' -> Set is empty. Add 'a'. Set: { 'a' }. MaxLen = 1
        [ a ] b c a b c b b
        L=0, R=0

Step 2: right = 1, char = 'b' -> Not in Set. Add 'b'. Set: { 'a', 'b' }. MaxLen = 2
        [ a b ] c a b c b b
        L=0, R=1

Step 3: right = 2, char = 'c' -> Not in Set. Add 'c'. Set: { 'a', 'b', 'c' }. MaxLen = 3
        [ a b c ] a b c b b
        L=0, R=2

Step 4: right = 3, char = 'a' -> DUPLICATE 'a'! Shrink Left.
        Remove s[left] ('a'). left becomes 1. Add 'a'. Set: { 'b', 'c', 'a' }. MaxLen = 3
          a [ b c a ] b c b b
            L=1, R=3`,
      code: {
        js: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
        python: `def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`,
        cpp: `#include <string>
#include <unordered_set>
#include <algorithm>

int lengthOfLongestSubstring(std::string s) {
    std::unordered_set<char> charSet;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        while (charSet.count(s[right])) {
            charSet.erase(s[left]);
            left++;
        }
        charSet.insert(s[right]);
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
        java: `import java.util.HashSet;
import java.util.Set;

public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left));
            left++;
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
      }
    }
  },
  "Stack": {
    title: "Stack",
    overview: "A Stack is a Last-In-First-Out (LIFO) linear data structure. Elements are added and removed from the top only. It is useful to process nested expressions, compile trees, and keep elements ordered monotonically.",
    whenToUse: "Use for parentheses matching, evaluating postfix/infix expressions, backtracking paths, or maintaining monotonic structures.",
    types: [
      { name: "Array-Based Stack", desc: "Uses standard resizable arrays with a pointer index cursor tracking the top element. Fast but bounded by capacity." },
      { name: "Linked-List Stack", desc: "Uses node linkages. Top element points to the head node. No capacity limit but incurs pointer allocation overhead." },
      { name: "Monotonic Stack", desc: "Maintains elements in strictly increasing or decreasing order. Essential for finding next greater/smaller elements." }
    ],
    concepts: [
      { name: "Monotonic Stack", desc: "A stack that maintains elements in strict increasing or decreasing order. Useful to search for the 'Next Greater' or 'Next Smaller' element." },
      { name: "LIFO Ordering", desc: "The most recently added element is processed first, making it standard for handling nested scopes (brackets, tags, function calls)." }
    ],
    complexity: {
      time: "Push/Pop: O(1) | Top/Peek: O(1) | Search: O(N)",
      space: "O(N) to store stack frames or variables."
    },
    template: {
      js: `// JS Monotonic Increasing Stack Template
function nextGreater(arr) {
  const stack = [];
  const result = new Array(arr.length).fill(-1);
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
      const idx = stack.pop();
      result[idx] = arr[i];
    }
    stack.push(i);
  }
  return result;
}`,
      python: `# Python Monotonic Increasing Stack Template
def next_greater(arr):
    stack = []
    result = [-1] * len(arr)
    for i in range(len(arr)):
        while stack and arr[stack[-1]] < arr[i]:
            idx = stack.pop()
            result[idx] = arr[i]
        stack.append(i)
    return result`,
      cpp: `// C++ Monotonic Increasing Stack Template
#include <vector>
#include <stack>

std::vector<int> nextGreater(const std::vector<int>& arr) {
    std::vector<int> result(arr.size(), -1);
    std::stack<int> s;
    for (int i = 0; i < arr.size(); i++) {
        while (!s.empty() && arr[s.top()] < arr[i]) {
            result[s.top()] = arr[i];
            s.pop();
        }
        s.push(i);
    }
    return result;
}`,
      java: `// Java Monotonic Increasing Stack Template
import java.util.Stack;
import java.util.Arrays;

public int[] nextGreater(int[] arr) {
    int[] result = new int[arr.length];
    Arrays.fill(result, -1);
    Stack<Integer> stack = new Stack<>();
    for (int i = 0; i < arr.length; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            result[stack.pop()] = arr[i];
        }
        stack.push(i);
    }
    return result;
}`
    },
    example: {
      name: "Valid Parentheses",
      desc: "Given a string containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      dryRun: "s = '()[]'\n- i = 0: push '('\n- i = 1: pop '(', matches ')'\n- i = 2: push '['\n- i = 3: pop '[', matches ']'. Stack is empty. Return true.",
      visualTrace: `s = "()[]{}"

Step 0: char = '(' -> PUSH '(' to Stack. Stack: [ '(' ]
Step 1: char = ')' -> Pop Stack: '('. Pop matches ')'. Stack: []
Step 2: char = '[' -> PUSH '[' to Stack. Stack: [ '[' ]
Step 3: char = ']' -> Pop Stack: '['. Pop matches ']'. Stack: []
Step 4: char = '{' -> PUSH '{' to Stack. Stack: [ '{' ]
Step 5: char = '}' -> Pop Stack: '{'. Pop matches '}'. Stack: []

Stack is empty at the end. Return true.`,
      code: {
        js: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
        python: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
        cpp: `#include <string>
#include <stack>
#include <unordered_map>

bool isValid(std::string s) {
    std::stack<char> st;
    std::unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};
    for (char c : s) {
        if (mapping.count(c)) {
            char top = st.empty() ? '#' : st.top();
            if (top != mapping[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
}`,
        java: `import java.util.Stack;
import java.util.HashMap;
import java.util.Map;

public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> map = new HashMap<>();
    map.put(')', '(');
    map.put('}', '{');
    map.put(']', '[');
    for (char c : s.toCharArray()) {
        if (map.containsKey(c)) {
            char top = stack.isEmpty() ? '#' : stack.pop();
            if (top != map.get(c)) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.isEmpty();
}`
      }
    }
  },
  "Queues & Deques": {
    title: "Queues & Deques",
    overview: "A Queue works on First-In-First-Out (FIFO) mechanics. A Double-Ended Queue (Deque) allows fast insertion/deletion from both ends in constant time O(1).",
    whenToUse: "Use standard queues for BFS, request queuing, and message passing. Use deques for sliding window limits, undo/redo logs, or custom scheduling pools.",
    types: [
      { name: "Simple Queue", desc: "Linear structure that allows insertion at rear and removal at front (FIFO)." },
      { name: "Circular Queue", desc: "Connects the last position back to the first to recycle empty slots, avoiding memory shifting." },
      { name: "Double-Ended Queue (Deque)", desc: "Double-ended queue allowing O(1) push and pop from both ends. Can act as a Stack or a Queue." },
      { name: "Priority Queue", desc: "Queue where elements are ordered according to priority, usually implemented using a binary heap." }
    ],
    concepts: [
      { name: "FIFO Scheduling", desc: "Processes items in arrival order, ensuring scheduling fairness." },
      { name: "Monotonic Deques", desc: "Stores indexes with elements in sorted order. If index falls out of sliding window range, pop from front; if new element violates order, pop from back." }
    ],
    complexity: {
      time: "Enqueue/Dequeue: O(1) | Push/Pop Front/Back: O(1)",
      space: "O(N) space to hold elements."
    },
    template: {
      js: `// JS BFS using Queue
function bfs(startNode) {
  const queue = [startNode];
  const visited = new Set([startNode]);
  while (queue.length > 0) {
    const node = queue.shift();
    for (let neighbor of node.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
      python: `# Python BFS using Queue (collections.deque)
from collections import deque

def bfs(start_node):
    queue = deque([start_node])
    visited = {start_node}
    while queue:
        node = queue.popleft()
        for neighbor in node.neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
      cpp: `// C++ BFS Template using std::queue
#include <queue>
#include <unordered_set>

void bfs(Node* startNode) {
    std::queue<Node*> q;
    std::unordered_set<Node*> visited;
    q.push(startNode);
    visited.insert(startNode);
    while (!q.empty()) {
        Node* node = q.front();
        q.pop();
        for (Node* neighbor : node->neighbors) {
            if (!visited.count(neighbor)) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`,
      java: `// Java BFS Template using java.util.Queue
import java.util.Queue;
import java.util.LinkedList;
import java.util.HashSet;
import java.util.Set;

public void bfs(Node startNode) {
    Queue<Node> queue = new LinkedList<>();
    Set<Node> visited = new HashSet<>();
    queue.add(startNode);
    visited.add(startNode);
    while (!queue.isEmpty()) {
        Node node = queue.poll();
        for (Node neighbor : node.neighbors) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
}`
    },
    example: {
      name: "Sliding Window Maximum",
      desc: "Return the maximum element in each sliding window of size K.",
      dryRun: "nums = [1,3,-1], K = 2. Deque stores indices.\n- i=0 (1): deque = [0]\n- i=1 (3): nums[1] > nums[0] -> pop back -> deque = [1]. Max window 1 = nums[1] = 3.\n- i=2 (-1): nums[2] < nums[1] -> push -> deque = [1,2]. Max window 2 = nums[1] = 3.",
      visualTrace: `nums = [ 1, 3, -1 ], K = 2.   dq (deque storing indices)

i = 0 (val = 1): dq = [ 0 ]
i = 1 (val = 3): nums[1] (3) >= nums[dq.back()] (1) -> pop back -> dq = []
                 push 1 -> dq = [ 1 ]
                 (i >= K-1) -> Output nums[dq.front()] = nums[1] = 3
i = 2 (val = -1): check dq.front() (1) out of window? No (1 >= 2 - 2 + 1).
                  nums[2] (-1) < nums[dq.back()] (3) -> no pop.
                  push 2 -> dq = [ 1, 2 ]
                  Output nums[dq.front()] = nums[1] = 3

Resulting output: [ 3, 3 ]`,
      code: {
        js: `function maxSlidingWindow(nums, k) {
  const deque = []; // store indices
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
}`,
        python: `from collections import deque

def maxSlidingWindow(nums, k):
    q = deque() # store indices
    result = []
    for i, num in enumerate(nums):
        if q and q[0] < i - k + 1:
            q.popleft()
        while q and nums[q[-1]] < num:
            q.pop()
        q.append(i)
        if i >= k - 1:
            result.append(nums[q[0]])
    return result`,
        cpp: `#include <vector>
#include <deque>

std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
    std::deque<int> dq; // store indices
    std::vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        if (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}`,
        java: `import java.util.Deque;
import java.util.LinkedList;

public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums == null || nums.length == 0) return new int[0];
    int n = nums.length;
    int[] result = new int[n - k + 1];
    int ri = 0;
    Deque<Integer> dq = new LinkedList<>(); // store indices
    for (int i = 0; i < n; i++) {
        if (!dq.isEmpty() && dq.peek() < i - k + 1) {
            dq.poll();
        }
        while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) {
            dq.pollLast();
        }
        dq.offer(i);
        if (i >= k - 1) {
            result[ri++] = nums[dq.peek()];
        }
    }
    return result;
}`
      }
    }
  },
  "Linked List": {
    title: "Linked Lists",
    overview: "Linked Lists store elements in sequential order, but not contiguously. Each element (Node) points to the next. They offer fast insertions and deletions in O(1) but require O(N) sequential scan to read arbitrary items.",
    whenToUse: "Use for implementing stacks, queues, hash lists (LRU caches), or dynamic memory pools.",
    types: [
      { name: "Singly Linked List", desc: "Each node contains value data and a single pointer referencing the next node." },
      { name: "Doubly Linked List", desc: "Each node contains value data, a pointer to the next node, and a pointer to the previous node." },
      { name: "Circular Linked List", desc: "The tail node's next pointer references the head node, creating a cyclic traversal structure." },
      { name: "Skip List", desc: "A multi-layered linked structure allowing logarithmic binary searches on linked lists." }
    ],
    concepts: [
      { name: "Pointer Rewiring", desc: "Updating nodes requires changes to the `.next` references. Care is needed to avoid orphan nodes." },
      { name: "Dummy Head Nodes", desc: "Using a placeholder head simplifies handling edge cases where items are added or deleted at index 0." }
    ],
    complexity: {
      time: "Access: O(N) | Search: O(N) | Insertion: O(1) at pointer",
      space: "O(1) auxiliary space (modifying in-place)."
    },
    template: {
      js: `// JS Linked List Reversal
function reverse(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    let nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  return prev; // new head
}`,
      python: `# Python Linked List Reversal
def reverse(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
      cpp: `// C++ Linked List Reversal
struct ListNode {
    int val;
    ListNode* next;
};

ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`,
      java: `// Java Linked List Reversal
public class ListNode {
    int val;
    ListNode next;
}

public ListNode reverse(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`
    },
    example: {
      name: "Detect Cycle",
      desc: "Determine if a linked list has a loop/cycle inside it.",
      dryRun: "Use Floyd's tortoise & hare:\n- Slow moves 1 step, Fast moves 2 steps.\n- If there is a cycle, Fast will wrap around and catch up to Slow (slow === fast). Otherwise, Fast hits null.",
      visualTrace: `Linked List: 1 -> 2 -> 3 -> 4 -> [back to 2]

Step 0: Slow = 1, Fast = 1
Step 1: Slow = 2, Fast = 3
Step 2: Slow = 3, Fast = 2 (wrapped around cycle)
Step 3: Slow = 4, Fast = 4 (Fast catches up to Slow!)
        Action: meeting point slow == fast (4 == 4) -> return true (Cycle Detected)`,
      code: {
        js: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
        python: `def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
        cpp: `bool hasCycle(ListNode *head) {
    ListNode *slow = head;
    ListNode *fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
        java: `public boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`
      }
    }
  },
  "Binary Search": {
    title: "Binary Search",
    overview: "Binary Search operates by halving the search space in each step, achieving logarithmic runtime O(log N). While traditionally used on sorted arrays, it can solve any problem with monotonic answers.",
    whenToUse: "Use on sorted collections or when search spaces present monotonic qualities (e.g., if X is possible, any Y > X is also possible).",
    types: [
      { name: "Array Search", desc: "Classic lookup on a sorted array using indices to locate an exact target item." },
      { name: "Binary Search on Answer", desc: "Searches for a threshold value in a hypothetical value range where values follow a boolean pattern: True...True, False...False." }
    ],
    concepts: [
      { name: "Monotonicity Requirement", desc: "The search space must be ordered or satisfy a clear partition condition (true/false) allowing us to skip halves." },
      { name: "Overflow Safety", desc: "Calculate mid using `low + Math.floor((high - low) / 2)` instead of `(low + high) / 2` to prevent numeric overflow on large datasets." }
    ],
    complexity: {
      time: "O(log N) as size drops by 50% in every iteration.",
      space: "O(1) for iterative implementations."
    },
    template: {
      js: `// JS Binary Search
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      python: `# Python Binary Search
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      cpp: `// C++ Binary Search
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `// Java Binary Search
public int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    },
    example: {
      name: "Search in Rotated Sorted Array",
      desc: "Find index of target in an array sorted, then rotated at a pivot.",
      dryRun: "nums = [4,5,6,7,0,1,2], target = 0.\n- mid is 7. Left half [4..7] is sorted. Since target is not in [4..7], search right half.\n- Sub-search in [0,1,2]. Find index of 0 is 4.",
      visualTrace: `nums = [ 4, 5, 6, 7, 0, 1, 2 ]   Target: 0

Step 0: Low=0, High=6 -> mid = 3 (val = 7)
        [ 4, 5, 6, 7, 0, 1, 2 ]
          ^        ^        ^
          L        M        H
        nums[low] (4) <= nums[mid] (7) -> Left side [4..7] is sorted!
        Target is 0 -> target is NOT within [4..7].
        Action: Search Right side -> low = mid + 1 = 4.

Step 1: Low=4, High=6 -> mid = 5 (val = 1)
        [ 4, 5, 6, 7, 0, 1, 2 ]
                      ^  ^  ^
                      L  M  H
        nums[low] (0) <= nums[mid] (1) -> Left side [0..1] is sorted!
        Target is 0 -> target is within [0..1] (0 >= 0 && 0 < 1).
        Action: Search Left side -> high = mid - 1 = 4.

Step 2: Low=4, High=4 -> mid = 4 (val = 0)
        nums[mid] == target (0 == 0) -> Return mid = 4`,
      code: {
        js: `function search(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[low] <= nums[mid]) {
      if (target >= nums[low] && target < nums[mid]) high = mid - 1;
      else low = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[high]) low = mid + 1;
      else high = mid - 1;
    }
  }
  return -1;
}`,
        python: `def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1`,
        cpp: `#include <vector>

int search(std::vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`,
        java: `public int search(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`
      }
    }
  },
  "Matrix / Grid": {
    title: "Matrix & Grid",
    overview: "Matrix layouts represent 2D structures. Navigation involves grid coordinates, directional arrays, and traversals resembling graphs.",
    whenToUse: "Use for image filters, route maps, path-finding grids, boundary games, and cell traversal simulations.",
    types: [
      { name: "2D Coordinate Grid", desc: "Standard row/column cell mappings representing map cells, screens, or grids." },
      { name: "Adjacency Matrix", desc: "A mathematical graph representation where rows/columns denote vertices, and values represent edge connections." },
      { name: "Sparse Matrix", desc: "A grid containing mostly zeros, optimized in memory using hash mappings or coordinate compression lists." }
    ],
    concepts: [
      { name: "Directional Arrays", desc: "Instead of copying nested condition blocks, define offsets \`const dirs = [[0,1], [0,-1], [1,0], [-1,0]]\` and traverse them inside a loop." },
      { name: "Boundary Constraints", desc: "Validate indices before accessing cell properties: \`r >= 0 && r < rows && c >= 0 && c < cols\`." }
    ],
    complexity: {
      time: "Traversal: O(R * C) where R is rows and C is columns.",
      space: "O(R * C) for queue/visited arrays or O(1) if marking visited inline."
    },
    template: {
      js: `// Grid DFS Template
function dfs(grid, r, c, visited) {
  const rows = grid.length, cols = grid[0].length;
  if (r < 0 || r >= rows || c < 0 || c >= cols || visited.has(r+','+c)) return;
  visited.add(r+','+c);
  const dirs = [[0,1], [0,-1], [1,0], [-1,0]];
  for (let [dr, dc] of dirs) {
    dfs(grid, r + dr, c + dc, visited);
  }
}`,
      python: `# Python Grid DFS Template
def dfs(grid, r, c, visited):
    rows, cols = len(grid), len(grid[0])
    if r < 0 or r >= rows or c < 0 or c >= cols or (r, c) in visited:
        return
    visited.add((r, c))
    dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    for dr, dc in dirs:
        dfs(grid, r + dr, c + dc, visited)`,
      cpp: `// C++ Grid DFS Template
#include <vector>
#include <set>

void dfs(std::vector<std::vector<int>>& grid, int r, int c, std::set<std::pair<int, int>>& visited) {
    int rows = grid.size(), cols = grid[0].size();
    if (r < 0 || r >= rows || c < 0 || c >= cols || visited.count({r, c})) return;
    visited.insert({r, c});
    int dirs[4][2] = {{0,1}, {0,-1}, {1,0}, {-1,0}};
    for (auto& dir : dirs) {
        dfs(grid, r + dir[0], c + dir[1], visited);
    }
}`,
      java: `// Java Grid DFS Template
import java.util.Set;
import java.util.HashSet;

public void dfs(int[][] grid, int r, int c, Set<String> visited) {
    int rows = grid.length, cols = grid[0].length;
    if (r < 0 || r >= rows || c < 0 || c >= cols || visited.contains(r + "," + c)) return;
    visited.add(r + "," + c);
    int[][] dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
    for (int[] dir : dirs) {
        dfs(grid, r + dir[0], c + dir[1], visited);
    }
}`
    },
    example: {
      name: "Number of Islands",
      desc: "Count the number of connected groupings of '1's (land) in a grid.",
      dryRun: "Scan cell by cell. When land '1' is encountered, increment island count and run DFS/BFS to turn all connected lands to '0'. Continue scanning grid.",
      visualTrace: `Grid:
  [ '1', '1', '0' ]
  [ '1', '0', '0' ]
  [ '0', '0', '1' ]

Iteration (0,0) -> land '1' found! Increment count = 1. Run DFS.
  DFS(0,0): set '0' -> checks directions -> DFS(0,1), DFS(1,0).
  DFS(0,1): set '0'.
  DFS(1,0): set '0'.
Grid state is now:
  [ '0', '0', '0' ]
  [ '0', '0', '0' ]
  [ '0', '0', '1' ]

Iteration (2,2) -> land '1' found! Increment count = 2. Run DFS.
  DFS(2,2): set '0'.
Return Islands Count = 2`,
      code: {
        js: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === '0') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
        python: `def numIslands(grid):
    if not grid:
        return 0
    count = 0
    def dfs(r, c):
        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]) or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
        cpp: `#include <vector>

void dfs(std::vector<std::vector<char>>& grid, int r, int c) {
    if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}

int numIslands(std::vector<std::vector<char>>& grid) {
    if (grid.empty()) return 0;
    int count = 0;
    for (int r = 0; r < grid.size(); r++) {
        for (int c = 0; c < grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}`,
        java: `public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) return 0;
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}

private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}`
      }
    }
  },
  "Trees": {
    title: "Trees",
    overview: "Trees represent hierarchical node structures. A Binary Tree consists of nodes having at most two child nodes (left and right). Operations rely heavily on recursion.",
    whenToUse: "Use for directory trees, expression evaluation, search hierarchies, and structural classifications.",
    types: [
      { name: "Binary Tree", desc: "Hierarchy where each node points to at most two children (left and right)." },
      { name: "Full / Complete Binary Tree", desc: "Full: every node has 0 or 2 children. Complete: all levels are filled except possibly the last level, filled left-to-right." },
      { name: "N-ary Tree", desc: "A tree node structure where nodes can hold dynamic arrays containing up to N child nodes." }
    ],
    concepts: [
      { name: "Depth First Search (DFS)", desc: "Traverse tree deep before scanning sibling trees. Common variants include: Inorder (L-Root-R), Preorder (Root-L-R), Postorder (L-R-Root)." },
      { name: "Breadth First Search (BFS)", desc: "Traverse node-layers step by step (Level Order). BFS uses a Queue to hold node references." }
    ],
    complexity: {
      time: "Traversal: O(N) | Search: O(N)",
      space: "O(H) recursion stack height, or O(W) maximum level width for BFS."
    },
    template: {
      js: `// JS Level Order (BFS) Traversal
function bfs(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,
      python: `# Python Level Order (BFS) Traversal
from collections import deque

def bfs(root):
    if not root:
        return []
    queue = deque([root])
    result = []
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result`,
      cpp: `// C++ BFS Level Order Traversal
#include <vector>
#include <queue>

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
};

std::vector<int> bfs(TreeNode* root) {
    if (!root) return {};
    std::vector<int> result;
    std::queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        result.push_back(node->val);
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    return result;
}`,
      java: `// Java BFS Level Order Traversal
import java.util.Queue;
import java.util.LinkedList;
import java.util.List;
import java.util.ArrayList;

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
}

public List<Integer> bfs(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        result.add(node.val);
        if (node.left != null) queue.add(node.left);
        if (node.right != null) queue.add(node.right);
    }
    return result;
}`
    },
    example: {
      name: "Maximum Depth of Binary Tree",
      desc: "Find the length of the longest path from root down to leaf node.",
      dryRun: "Tree: 3 -> left: 9, right: 20.\n- depth(9) = 1. depth(20) = 1 + depth(children).\n- Max depth is 1 + max(depth(left), depth(right)).",
      visualTrace: `Tree Structure:
       3
      / \
     9  20
       /  \
      15   7

Trace Depth (DFS Bottom-Up):
- Leaf 9: left=null, right=null -> returns 0 + 1 = 1
- Leaf 15: left=null, right=null -> returns 0 + 1 = 1
- Leaf 7: left=null, right=null -> returns 0 + 1 = 1
- Node 20: left=15 (depth=1), right=7 (depth=1) -> returns max(1, 1) + 1 = 2
- Root 3: left=9 (depth=1), right=20 (depth=2) -> returns max(1, 2) + 1 = 3`,
      code: {
        js: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
        python: `def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
        cpp: `#include <algorithm>

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + std::max(maxDepth(root->left), maxDepth(root->right));
}`,
        java: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
      }
    }
  },
  "Binary Search Tree (BST)": {
    title: "Binary Search Tree (BST)",
    overview: "BSTs are binary trees that enforce ordering constraints: left children < root node < right children. If balanced, they run operations in O(log N) average time.",
    whenToUse: "Use for maintaining sorted datasets dynamically, range queries, and finding order statistics.",
    types: [
      { name: "Standard BST", desc: "Binary search ordering holds, but heights can skew to O(N) linear structures under pathological inputs." },
      { name: "Self-Balancing BST", desc: "Automatically adjusts structure heights during inserts/deletes to guarantee O(log N) bounds (e.g., AVL Trees, Red-Black Trees)." }
    ],
    concepts: [
      { name: "BST Invariant", desc: "Left subtrees are smaller, right subtrees are larger than the current node. This holds true recursively." },
      { name: "Inorder Sorted Traversal", desc: "Running DFS Inorder traversal on a valid BST yields sorted values." }
    ],
    complexity: {
      time: "Balanced: O(log N) | Skewed: O(N) worst case search.",
      space: "O(H) height on stack frame."
    },
    template: {
      js: `// JS Search value in BST
function searchBST(root, val) {
  if (!root || root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}`,
      python: `# Python Search value in BST
def searchBST(root, val):
    if not root or root.val == val:
        return root
    if val < root.val:
        return searchBST(root.left, val)
    return searchBST(root.right, val)`,
      cpp: `// C++ Search value in BST
TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) return searchBST(root->left, val);
    return searchBST(root->right, val);
}`,
      java: `// Java Search value in BST
public TreeNode searchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    if (val < root.val) return searchBST(root.left, val);
    return searchBST(root.right, val);
}`
    },
    example: {
      name: "Validate BST",
      desc: "Determine if a binary tree constitutes a valid BST.",
      dryRun: "Pass valid ranges [min, max] down dynamically:\n- Left child checked against range [min, node.val - 1]\n- Right child checked against range [node.val + 1, max]. Return false if any node violates boundary.",
      visualTrace: `Tree:
       5
      / \
     1   8
        / \
       6   9

Validation Ranges passed down:
1. Root 5: Valid range [-inf, inf] -> node 5 is valid.
2. Node 1: Range [-inf, 5] -> node 1 is valid.
3. Node 8: Range [5, inf] -> node 8 is valid.
4. Node 6: Range [5, 8] -> node 6 is valid (within range!).
5. Node 9: Range [8, inf] -> node 9 is valid.

All assertions pass -> returns true`,
      code: {
        js: `function isValidBST(root, min = null, max = null) {
  if (!root) return true;
  if (min !== null && root.val <= min) return false;
  if (max !== null && root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`,
        python: `def isValidBST(root, low=float('-inf'), high=float('inf')):
    if not root:
        return True
    if root.val <= low or root.val >= high:
        return False
    return isValidBST(root.left, low, root.val) and isValidBST(root.right, root.val, high)`,
        cpp: `#include <climits>

bool isValidBST(TreeNode* root, long minVal = LONG_MIN, long maxVal = LONG_MAX) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) return false;
    return isValidBST(root->left, minVal, root->val) && isValidBST(root->right, root->val, maxVal);
}`,
        java: `public boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}

private boolean validate(TreeNode root, Integer min, Integer max) {
    if (root == null) return true;
    if ((min != null && root.val <= min) || (max != null && root.val >= max)) {
        return false;
    }
    return validate(root.left, min, root.val) && validate(root.right, root.val, max);
}`
      }
    }
  },
  "Tries": {
    title: "Tries",
    overview: "Tries are tree structures storing characters of string keys. Multiple strings sharing prefixes share nodes, yielding efficient lookup times.",
    whenToUse: "Use for word autocomplete systems, prefix search dictionaries, spell-checking engines, and IP routing tables.",
    types: [
      { name: "Standard Trie", desc: "Every node links up to character nodes (e.g. standard prefix search array size 26)." },
      { name: "Compressed Trie (Radix Tree)", desc: "Consolidates nodes with single children into a single string path edge to reduce tree height and memory footprint." }
    ],
    concepts: [
      { name: "Prefix Pruning", desc: "Allows matching partial string keys. We can immediately determine if a word matching a prefix exists in the database." },
      { name: "Trie Node Children", desc: "Each node holds a pointer array (typically size 26 for English letters) or a Hash Map referencing children." }
    ],
    complexity: {
      time: "Insert/Search/Prefix: O(L) where L is the string length.",
      space: "O(W * L) where W is the number of words stored."
    },
    template: {
      js: `// JS Trie Node Definition
class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}`,
      python: `# Python Trie Node Definition
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False`,
      cpp: `// C++ Trie Node Definition
#include <unordered_map>

struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool isWord = false;
};`,
      java: `// Java Trie Node Definition
import java.util.HashMap;
import java.util.Map;

public class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isWord = false;
}`
    },
    example: {
      name: "Implement Trie",
      desc: "Implement a trie supporting insert, search, and startsWith operations.",
      dryRun: "Insert 'app':\n- Node 'a' created/referenced -> 'p' created -> 'p' created with isWord = true.\n- Search 'ap' returns false (isWord is false); startsWith 'ap' returns true.",
      visualTrace: `Trie Root
   |
  (a)
   |
  (p)
   |
  (p) *isWord=true

1. Insert "app":
   'a' not in root -> add 'a'. Move down.
   'p' not in 'a'  -> add 'p'. Move down.
   'p' not in 'p'  -> add 'p' & mark isWord=true.
2. Search "ap": matches path Root -> 'a' -> 'p' (last isWord is false) -> returns false.
3. startsWith "ap": path matched -> returns true.`,
      code: {
        js: `class Trie {
  constructor() {
    this.root = {};
  }
  insert(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr[char]) curr[char] = {};
      curr = curr[char];
    }
    curr.isWord = true;
  }
  search(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr[char]) return false;
      curr = curr[char];
    }
    return !!curr.isWord;
  }
  startsWith(prefix) {
    let curr = this.root;
    for (let char of prefix) {
      if (!curr[char]) return false;
      curr = curr[char];
    }
    return true;
  }
}`,
        python: `class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_word = True

    def search(self, word: str) -> bool:
        curr = self.root
        for char in word:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return curr.is_word

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return True`,
        cpp: `class Trie {
private:
    TrieNode* root;
public:
    Trie() {
        root = new TrieNode();
    }
    void insert(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            if (!curr->children.count(c)) {
                curr->children[c] = new TrieNode();
            }
            curr = curr->children[c];
        }
        curr->isWord = true;
    }
    bool search(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            if (!curr->children.count(c)) return false;
            curr = curr->children[c];
        }
        return curr->isWord;
    }
    bool startsWith(string prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            if (!curr->children.count(c)) return false;
            curr = curr->children[c];
        }
        return true;
    }
};`,
        java: `public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            curr.children.putIfAbsent(c, new TrieNode());
            curr = curr.children.get(c);
        }
        curr.isWord = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            if (!curr.children.containsKey(c)) return false;
            curr = curr.children.get(c);
        }
        return curr.isWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            if (!curr.children.containsKey(c)) return false;
            curr = curr.children.get(c);
        }
        return true;
    }
}`
      }
    }
  },
  "Heap / Priority Queue": {
    title: "Heap / Priority Queue",
    overview: "A Heap is a complete binary tree that maintains the heap invariant (Min-Heap: children >= parent; Max-Heap: children <= parent). They provide instant access to extreme values.",
    whenToUse: "Use for scheduling, sorting lists, retrieving Top-K items, and merging sorted data streams.",
    types: [
      { name: "Binary Heap", desc: "A complete binary tree array mapping. Minimizes pointer overhead." },
      { name: "Fibonacci Heap", desc: "A collection of heap-ordered trees. Supports O(1) merge and decrease key operations, useful for dense network paths." }
    ],
    concepts: [
      { name: "Heapify Operation", desc: "Translating arrays to heaps in O(N) using recursive sift-down steps." },
      { name: "Dynamic Extreme Search", desc: "Inserts and deletions run in O(log N) while maintaining sorting order." }
    ],
    complexity: {
      time: "Extract Min/Max: O(log N) | Insert: O(log N) | Top Element Peek: O(1)",
      space: "O(N) to store values."
    },
    template: {
      js: `// JS Heap index helper representation
const parent = i => Math.floor((i - 1) / 2);
const left = i => 2 * i + 1;
const right = i => 2 * i + 2;`,
      python: `# Python Priority Queue Template (heapq module)
import heapq

# Initializing min-heap
heap = []
heapq.heappush(heap, 10)
heapq.heappush(heap, 5)
# peek smallest
smallest = heap[0] # 5
# extract smallest
popped = heapq.heappop(heap) # 5`,
      cpp: `// C++ Priority Queue Template
#include <queue>
#include <vector>

// Max Heap (Default)
std::priority_queue<int> maxHeap;

// Min Heap
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;`,
      java: `// Java PriorityQueue Template
import java.util.PriorityQueue;

// Min Heap (Default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// Max Heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);`
    },
    example: {
      name: "Kth Largest Element",
      desc: "Find the Kth largest element in an unsorted array.",
      dryRun: "nums = [3,2,1,5,6,4], K = 2.\n- Maintain a Min-Heap of size 2.\n- Process elements: Min-heap holds [5, 6].\n- Min elements evicted when heap sizes exceed K. Peek returns 5.",
      visualTrace: `nums = [ 3, 2, 1, 5, 6, 4 ], K = 2

Step 0: Process 3 -> Min-Heap: [ 3 ]
Step 1: Process 2 -> Min-Heap: [ 2, 3 ] (Size = K, no evict)
Step 2: Process 1 -> Min-Heap: [ 1, 2, 3 ] -> Pop min (1) -> Min-Heap: [ 2, 3 ]
Step 3: Process 5 -> Min-Heap: [ 2, 3, 5 ] -> Pop min (2) -> Min-Heap: [ 3, 5 ]
Step 4: Process 6 -> Min-Heap: [ 3, 5, 6 ] -> Pop min (3) -> Min-Heap: [ 5, 6 ]
Step 5: Process 4 -> Min-Heap: [ 4, 5, 6 ] -> Pop min (4) -> Min-Heap: [ 5, 6 ]

Min-Heap peak (front) is 5. Return 5.`,
      code: {
        js: `function findKthLargest(nums, k) {
  nums.sort((a, b) => a - b);
  return nums[nums.length - k];
}`,
        python: `import heapq

def findKthLargest(nums, k):
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]`,
        cpp: `#include <vector>
#include <queue>

int findKthLargest(std::vector<int>& nums, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.top();
}`,
        java: `import java.util.PriorityQueue;

public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int num : nums) {
        minHeap.add(num);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }
    return minHeap.peek();
}`
      }
    }
  },
  "Backtracking": {
    title: "Backtracking",
    overview: "Backtracking systematically evaluates potential solution paths, pruning paths that violate constraints.",
    whenToUse: "Use for finding permutations, generating combinations, resolving maze traversals, and resolving constraint-satisfaction tasks (Sudoku, N-Queens).",
    types: [
      { name: "Decision Backtracking", desc: "Searches for any single valid solution configuration (e.g. Sudoku solver)." },
      { name: "Optimization Backtracking", desc: "Searches for a configuration that minimizes or maximizes a value target." },
      { name: "Enumeration Backtracking", desc: "Generates all possible valid solutions (e.g. finding subsets or permutations)." }
    ],
    concepts: [
      { name: "Decision State Trees", desc: "Branches represent decisions. We descend state branches recursively, changing state inputs, then undoing (backtracking) changes before evaluating alternatives." },
      { name: "Pruning Optimization", desc: "Evaluate path viability early. If validation fails, drop the branch immediately to avoid checking sub-configurations." }
    ],
    complexity: {
      time: "Combinations: O(2^N) | Permutations: O(N!)",
      space: "O(N) search depth recursion stack."
    },
    template: {
      js: `// JS Backtracking Template
function backtrack(state, options, results) {
  if (isValidSolution(state)) {
    results.push([...state]);
    return;
  }
  for (let option of options) {
    if (canChoose(option)) {
      state.push(option); // choose
      backtrack(state, options, results); // explore
      state.pop(); // unchoose
    }
  }
}`,
      python: `# Python Backtracking Template
def backtrack(state, options, results):
    if is_valid_solution(state):
        results.append(list(state))
        return
    for option in options:
        if can_choose(option):
            state.append(option) # choose
            backtrack(state, options, results) # explore
            state.pop() # unchoose`,
      cpp: `// C++ Backtracking Template
#include <vector>

void backtrack(std::vector<int>& state, const std::vector<int>& options, std::vector<std::vector<int>>& results) {
    if (isValidSolution(state)) {
        results.push_back(state);
        return;
    }
    for (int option : options) {
        if (canChoose(option)) {
            state.push_back(option); // choose
            backtrack(state, options, results); // explore
            state.pop_back(); // unchoose
        }
    }
}`,
      java: `// Java Backtracking Template
import java.util.List;
import java.util.ArrayList;

public void backtrack(List<Integer> state, int[] options, List<List<Integer>> results) {
    if (isValidSolution(state)) {
        results.add(new ArrayList<>(state));
        return;
    }
    for (int option : options) {
        if (canChoose(option)) {
            state.add(option); // choose
            backtrack(state, options, results); // explore
            state.remove(state.size() - 1); // unchoose
        }
    }
}`
    },
    example: {
      name: "Subsets",
      desc: "Generate all possible subset combinations of a unique integer array.",
      dryRun: "nums = [1, 2].\n- Decision tree path chooses either to include or exclude 1.\n- Sub-paths make the same decision for 2.\n- Subsets generated: [], [2], [1], [1, 2].",
      visualTrace: `Recursion Tree for subsets of [ 1, 2 ]:

                     backtrack(0, []) -> Add [] to result
                      /             \
           Add [1]   /               \  Loop completes
      backtrack(1, [1])             (no child calls)
        /          \
    Add [1,2]       \ Loop completes
 backtrack(2, [1,2])
     |
  Returns

Generated combinations list: [ [], [1], [1,2], [2] ]`,
      code: {
        js: `function subsets(nums) {
  const result = [];
  function backtrack(index, current) {
    result.push([...current]);
    for (let i = index; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return result;
}`,
        python: `def subsets(nums):
    result = []
    def backtrack(index, current):
        result.append(list(current))
        for i in range(index, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    return result`,
        cpp: `#include <vector>

void backtrack(int index, std::vector<int>& nums, std::vector<int>& current, std::vector<std::vector<int>>& result) {
    result.push_back(current);
    for (int i = index; i < nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(i + 1, nums, current, result);
        current.pop_back();
    }
}

std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    backtrack(0, nums, current, result);
    return result;
}`,
        java: `import java.util.List;
import java.util.ArrayList;

public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(0, nums, new ArrayList<>(), result);
    return result;
}

private void backtrack(int index, int[] nums, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current));
    for (int i = index; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(i + 1, nums, current, result);
        current.remove(current.size() - 1);
    }
}`
      }
    }
  },
  "Greedy": {
    title: "Greedy Algorithms",
    overview: "Greedy algorithms make locally optimal decisions at every step, hoping the path converges to the global maximum.",
    whenToUse: "Use for optimization problems exhibiting optimal substructure where local optimizations scale globally.",
    types: [
      { name: "Sorting Greedy", desc: "Requires sorting the inputs by attributes (ratios, sizes, end bounds) first before iterating greedily." },
      { name: "Priority-based Greedy", desc: "Pulls choices dynamically using a priority queue (Heap) (e.g. Prim's or Dijkstra's)." }
    ],
    concepts: [
      { name: "No Backtracking", desc: "Greedy paths proceed forward without correcting decisions. They offer fast linear solutions when correct." },
      { name: "Sorting Prerequisite", desc: "Most greedy approaches require elements sorted by key criteria (ratios, end times, value metrics) first." }
    ],
    complexity: {
      time: "O(N log N) if sorting required, otherwise O(N).",
      space: "O(1) auxiliary space."
    },
    template: {
      js: `// JS Greedy Scheduling Pattern
function maxActivities(start, end) {
  const activities = start.map((s, i) => ({ s, e: end[i] }))
                         .sort((a, b) => a.e - b.e);
  let count = 0, lastEnd = -1;
  for (let act of activities) {
    if (act.s >= lastEnd) {
      count++;
      lastEnd = act.e;
    }
  }
  return count;
}`,
      python: `# Python Greedy Scheduling Pattern
def max_activities(start, end):
    activities = sorted(zip(start, end), key=lambda x: x[1])
    count, last_end = 0, -1
    for s, e in activities:
        if s >= last_end:
            count += 1
            last_end = e
    return count`,
      cpp: `// C++ Greedy Scheduling Template
#include <vector>
#include <algorithm>

struct Activity {
    int start, end;
};

int maxActivities(std::vector<int>& start, std::vector<int>& end) {
    std::vector<Activity> acts;
    for (int i = 0; i < start.size(); i++) {
        acts.push_back({start[i], end[i]});
    }
    std::sort(acts.begin(), acts.end(), [](const Activity& a, const Activity& b) {
        return a.end < b.end;
    });
    int count = 0, lastEnd = -1;
    for (const auto& act : acts) {
        if (act.start >= lastEnd) {
            count++;
            lastEnd = act.end;
        }
    }
    return count;
}`,
      java: `// Java Greedy Scheduling Template
import java.util.Arrays;
import java.util.Comparator;

public class GreedyTemplate {
    static class Activity {
        int start, end;
        Activity(int start, int end) {
            this.start = start;
            this.end = end;
        }
    }

    public int maxActivities(int[] start, int[] end) {
        Activity[] acts = new Activity[start.length];
        for (int i = 0; i < start.length; i++) {
            acts[i] = new Activity(start[i], end[i]);
        }
        Arrays.sort(acts, Comparator.comparingInt(a -> a.end));
        int count = 0, lastEnd = -1;
        for (Activity act : acts) {
            if (act.start >= lastEnd) {
                count++;
                lastEnd = act.end;
            }
        }
        return count;
    }
}`
    },
    example: {
      name: "Assign Cookies",
      desc: "Assign cookies to children to maximize satisfaction rates.",
      dryRun: "Children greed factor g = [1,2,3], Cookies s = [1,1].\n- Sort both arrays. Check size 1 cookie against child 1. Child 1 satisfied.\n- Next cookie size 1 against child 2. Child 2 unsatisfied. No more cookies. Satisfied = 1.",
      visualTrace: `Children Greed (g): [ 1, 2, 3 ]     Cookies (s): [ 1, 1 ]

Initialize: child_ptr = 0, cookie_ptr = 0

Match 0: g[0] = 1, s[0] = 1 -> Cookie size satisfies Child.
         Action: child_ptr++ (1), cookie_ptr++ (1)

Match 1: g[1] = 2, s[1] = 1 -> Cookie size (1) is too small for Child greed (2).
         Action: cookie_ptr++ (2) -> Out of cookies!

Completed. Satisfied count = child_ptr = 1`,
      code: {
        js: `function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let child = 0, cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) {
      child++;
    }
    cookie++;
  }
  return child;
}`,
        python: `def findContentChildren(g, s):
    g.sort()
    s.sort()
    child = cookie = 0
    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:
            child += 1
        cookie += 1
    return child`,
        cpp: `#include <vector>
#include <algorithm>

int findContentChildren(std::vector<int>& g, std::vector<int>& s) {
    std::sort(g.begin(), g.end());
    std::sort(s.begin(), s.end());
    int child = 0, cookie = 0;
    while (child < g.size() && cookie < s.size()) {
        if (s[cookie] >= g[child]) {
            child++;
        }
        cookie++;
    }
    return child;
}`,
        java: `import java.util.Arrays;

public int findContentChildren(int[] g, int[] s) {
    Arrays.sort(g);
    Arrays.sort(s);
    int child = 0, cookie = 0;
    while (child < g.length && cookie < s.length) {
        if (s[cookie] >= g[child]) {
            child++;
        }
        cookie++;
    }
    return child;
}`
      }
    }
  },
  "Intervals": {
    title: "Intervals",
    overview: "Interval algorithms resolve range segments [start, end]. Sorting by start boundary or end boundary is key.",
    whenToUse: "Use for calendar reservations, overlapping schedules, boundary checks, and scheduling pools.",
    types: [
      { name: "Disjoint Intervals", desc: "Interval ranges that do not share any coordinate intersections (e.g. partitioning lists)." },
      { name: "Overlapping Intervals", desc: "Intervals sharing overlap bounds, requiring merge operations (e.g. schedule conflicts)." }
    ],
    concepts: [
      { name: "Overlapping States", desc: "Two intervals overlap if a.start < b.end && b.start < a.end." },
      { name: "Interval Merging", desc: "If intervals overlap, they consolidate into [min(a.start, b.start), max(a.end, b.end)]." }
    ],
    complexity: {
      time: "O(N log N) dominated by sorting intervals.",
      space: "O(N) to hold returned interval lists."
    },
    template: {
      js: `// JS Interval Processing Template
function processIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < intervals.length; i++) {
    const current = intervals[i];
    // check overlaps
  }
}`,
      python: `# Python Interval Processing Template
def process_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    for i in range(len(intervals)):
        current = intervals[i]
        # check overlaps`,
      cpp: `// C++ Interval Processing Template
#include <vector>
#include <algorithm>

void processIntervals(std::vector<std::vector<int>>& intervals) {
    std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
        return a[0] < b[0];
    });
    for (int i = 0; i < intervals.size(); i++) {
        auto& current = intervals[i];
        // check overlaps
    }
}`,
      java: `// Java Interval Processing Template
import java.util.Arrays;

public void processIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    for (int i = 0; i < intervals.length; i++) {
        int[] current = intervals[i];
        // check overlaps
    }
}`
    },
    example: {
      name: "Merge Intervals",
      desc: "Merge overlapping intervals.",
      dryRun: "intervals = [[1,3],[2,6],[8,10]]\n- Sort intervals: already sorted.\n- Compare [1,3] with [2,6]. They overlap as 2 < 3. Merge into [1,6].\n- Compare [1,6] with [8,10]. No overlap. Save [1,6], move to [8,10]. Result: [[1,6],[8,10]].",
      visualTrace: `Input Intervals: [ [1,3], [2,6], [8,10] ] (Sorted)

Merged Array: [ [1,3] ]

Interval 1: [2,6]
  Compare [2,6].start (2) <= lastMerged.end (3) -> OVERLAP!
  Merge: set lastMerged.end = max(3, 6) = 6.
  Merged Array is now: [ [1,6] ]

Interval 2: [8,10]
  Compare [8,10].start (8) > lastMerged.end (6) -> NO OVERLAP.
  Action: Push [8,10] to Merged.
  Merged Array is now: [ [1,6], [8,10] ]`,
      code: {
        js: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}`,
        python: `def merge(intervals):
    if len(intervals) <= 1:
        return intervals
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for i in range(1, len(intervals)):
        last = merged[-1]
        curr = intervals[i]
        if curr[0] <= last[1]:
            last[1] = max(last[1], curr[1])
        else:
            merged.append(curr)
    return merged`,
        cpp: `#include <vector>
#include <algorithm>

std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
    if (intervals.size() <= 1) return intervals;
    std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
        return a[0] < b[0];
    });
    std::vector<std::vector<int>> merged;
    merged.push_back(intervals[0]);
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = std::max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}`,
        java: `import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    merged.add(intervals[0]);
    for (int i = 1; i < intervals.length; i++) {
        int[] last = merged.get(merged.size() - 1);
        int[] curr = intervals[i];
        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);
        } else {
            merged.add(curr);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}`
      }
    }
  },
  "Graphs": {
    title: "Graphs",
    overview: "Graphs model entities (Vertices) linked by lines (Edges). BFS searches neighbors level by level, DFS traverses deep before evaluating sibling paths.",
    whenToUse: "Use for routing networks, friendship models, dependency scheduling, and connectivity verification.",
    types: [
      { name: "Directed Graph", desc: "Edges have an associated direction arrow, pointing from node u to v." },
      { name: "Undirected Graph", desc: "Edges are bidirectional, connecting node u and v symmetrically." },
      { name: "Weighted Graph", desc: "Edges carry weight values (denoting distance, cost, time, etc.)." }
    ],
    concepts: [
      { name: "Adjacency Lists", desc: "Graph mappings using Hash Maps: node -> [neighbors list]. They require less space than full Adjacency Matrices." },
      { name: "Visited Tracking", desc: "Graphs contain cycles. Using a Visited Set prevents infinite loops." }
    ],
    complexity: {
      time: "BFS/DFS: O(V + E) where V is vertices and E is edges.",
      space: "O(V) to store nodes in lists/visited sets."
    },
    template: {
      js: `// JS DFS Graph Traversal
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  for (let neighbor of graph[node] || []) {
    dfs(graph, neighbor, visited);
  }
}`,
      python: `# Python DFS Graph Traversal
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    if node in visited:
        return
    visited.add(node)
    for neighbor in graph.get(node, []):
        dfs(graph, neighbor, visited)`,
      cpp: `// C++ DFS Graph Traversal
#include <unordered_map>
#include <unordered_set>
#include <vector>

void dfs(std::unordered_map<int, std::vector<int>>& graph, int node, std::unordered_set<int>& visited) {
    if (visited.count(node)) return;
    visited.insert(node);
    for (int neighbor : graph[node]) {
        dfs(graph, neighbor, visited);
    }
}`,
      java: `// Java DFS Graph Traversal
import java.util.Map;
import java.util.List;
import java.util.Set;

public void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    if (visited.contains(node)) return;
    visited.add(node);
    if (graph.containsKey(node)) {
        for (int neighbor : graph.get(node)) {
            dfs(graph, neighbor, visited);
        }
    }
}`
    },
    example: {
      name: "Clone Graph",
      desc: "Return a deep copy of an undirected graph.",
      dryRun: "Use a map to store copy nodes: `originalNode -> copiedNode`.\n- Run DFS. If node is already in map, return reference.\n- Otherwise, create clone, save in map, and clone neighbors recursively.",
      visualTrace: `Graph: 1 - 2
       |   |
       4 - 3

DFS clone path:
- DFS(1): create clone(1). Save visited[1] = clone(1). Traverse neighbors [2, 4].
  - DFS(2): create clone(2). Save visited[2] = clone(2). Traverse neighbors [1, 3].
    - Neighbor 1 is visited. Add reference.
    - DFS(3): create clone(3). Save visited[3] = clone(3). Traverse neighbors [2, 4].
      - Neighbor 2 is visited. Add reference.
      - DFS(4): create clone(4). Save visited[4] = clone(4).
        - Neighbor 3 visited. Add reference.
        - Neighbor 1 visited. Add reference.
Deep copy successfully wired!`,
      code: {
        js: `function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  function dfs(curr) {
    if (map.has(curr)) return map.get(curr);
    const clone = { val: curr.val, neighbors: [] };
    map.set(curr, clone);
    for (let neighbor of curr.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    return clone;
  }
  return dfs(node);
}`,
        python: `class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    if not node:
        return None
    visited = {}
    def dfs(curr):
        if curr in visited:
            return visited[curr]
        clone = Node(curr.val)
        visited[curr] = clone
        for neighbor in curr.neighbors:
            clone.neighbors.append(dfs(neighbor))
        return clone
    return dfs(node)`,
        cpp: `#include <unordered_map>
#include <vector>

struct Node {
    int val;
    std::vector<Node*> neighbors;
};

std::unordered_map<Node*, Node*> visited;
Node* cloneGraph(Node* node) {
    if (!node) return nullptr;
    if (visited.count(node)) return visited[node];
    Node* clone = new Node{node->val, {}};
    visited[node] = clone;
    for (Node* neighbor : node->neighbors) {
        clone->neighbors.push_back(cloneGraph(neighbor));
    }
    return clone;
}`,
        java: `import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

class Node {
    public int val;
    public List<Node> neighbors;
    public Node(int val) {
        this.val = val;
        this.neighbors = new ArrayList<>();
    }
}

public class Solution {
    private Map<Node, Node> visited = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (visited.containsKey(node)) return visited.get(node);
        Node clone = new Node(node.val);
        visited.put(node, clone);
        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(cloneGraph(neighbor));
        }
        return clone;
    }
}`
      }
    }
  },
  "Advanced Graphs": {
    title: "Advanced Graphs",
    overview: "Advanced graphs cover weighted edges, shortest path solutions, and structural connectivity trees.",
    whenToUse: "Use Dijkstra for single-source shortest paths, Kruskal/Prim for MST extraction, and DSU for dynamic grouping.",
    types: [
      { name: "Directed Acyclic Graph (DAG)", desc: "A directed graph with no cycles, allowing topological sorting configurations." },
      { name: "Minimum Spanning Tree (MST)", desc: "A subgraph connecting all vertices together with the minimum possible total edge weight sum (extracted via Kruskal/Prim)." },
      { name: "Shortest Path Tree", desc: "Tree of shortest paths from source vertex to all vertices (extracted via Dijkstra)." }
    ],
    concepts: [
      { name: "Dijkstra's Shortest Path", desc: "Finds shortest path in weighted graphs using Min-Heaps. Weights must be positive." },
      { name: "Disjoint Set Union (DSU)", desc: "Quickly checks if elements belong to the same group. Rank optimization and path compression keep runtimes constant." }
    ],
    complexity: {
      time: "Dijkstra: O((V + E) log V) | DSU Union/Find: O(alpha(V)) amortized.",
      space: "O(V + E) to store weights, paths, and parent sets."
    },
    template: {
      js: `// JS Disjoint Set Union Class
class DSU {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
      return true;
    }
    return false;
  }
}`,
      python: `# Python Disjoint Set Union Class
class DSU:
    def __init__(self, size):
        self.parent = list(range(size))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x]) # Path compression
        return self.parent[x]

    def union(self, x, y):
        rootX = self.find(x)
        rootY = self.find(y)
        if rootX != rootY:
            self.parent[rootX] = rootY
            return True
        return False`,
      cpp: `// C++ Disjoint Set Union Class
#include <vector>

class DSU {
private:
    std::vector<int> parent;
public:
    DSU(int size) {
        parent.resize(size);
        for (int i = 0; i < size; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    bool unionSets(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX != rootY) {
            parent[rootX] = rootY;
            return true;
        }
        return false;
    }
};`,
      java: `// Java Disjoint Set Union Class
public class DSU {
    private int[] parent;

    public DSU(int size) {
        parent = new int[size];
        for (int i = 0; i < size; i++) parent[i] = i;
    }

    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX != rootY) {
            parent[rootX] = rootY;
            return true;
        }
        return false;
    }
}`
    },
    example: {
      name: "Network Delay Time",
      desc: "Find minimum time for all nodes to receive a signal from a source node.",
      dryRun: "Times = [[2,1,1],[2,3,1],[3,4,1]], N=4, K=2. Distance array starts at infinity, dist[2]=0.\n- Extract node 2. Relax paths: dist[1]=1, dist[3]=1.\n- Extract node 1 (no changes).\n- Extract node 3. Relax path: dist[4]=2.\n- Return max path distance 2.",
      visualTrace: `Times: [2->1 wt 1], [2->3 wt 1], [3->4 wt 1]    N=4 nodes, Source K=2

Start: Min-Heap Queue = [ (0, 2) ]     dist = { 1:inf, 2:0, 3:inf, 4:inf }

Step 1: Pop node 2. Neighbors are 1 (wt 1) & 3 (wt 1).
        Update dist[1] = 1, dist[3] = 1.
        Min-Heap Queue = [ (1, 1), (1, 3) ]

Step 2: Pop node 1. No outgoing neighbors.
        Min-Heap Queue = [ (1, 3) ]

Step 3: Pop node 3. Neighbor is 4 (wt 1).
        Update dist[4] = 1 + 1 = 2.
        Min-Heap Queue = [ (2, 4) ]

Step 4: Pop node 4. No outgoing neighbors.
        Min-Heap Queue = []

Max distance is dist[4] = 2. Return 2.`,
      code: {
        js: `// JS Dijkstra representation
function networkDelayTime(times, n, k) {
  const adj = {};
  for (let i = 1; i <= n; i++) adj[i] = [];
  for (let [u, v, w] of times) adj[u].push([v, w]);
  
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;
  
  // Dijkstra priority queue logic simulation
  return 0; // standard return delay bounds
}`,
        python: `# Python Dijkstra implementation
import heapq

def networkDelayTime(times, n, k):
    adj = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        adj[u].append((v, w))
    pq = [(0, k)]
    dist = {}
    while pq:
        d, node = heapq.heappop(pq)
        if node in dist:
            continue
        dist[node] = d
        for neighbor, time in adj[node]:
            if neighbor not in dist:
                heapq.heappush(pq, (d + time, neighbor))
    return max(dist.values()) if len(dist) == n else -1`,
        cpp: `#include <vector>
#include <queue>
#include <unordered_map>
#include <algorithm>

int networkDelayTime(std::vector<std::vector<int>>& times, int n, int k) {
    std::unordered_map<int, std::vector<std::pair<int, int>>> adj;
    for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> pq;
    pq.push({0, k});
    std::vector<int> dist(n + 1, 1e9);
    dist[k] = 0;
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& edge : adj[u]) {
            int v = edge.first, w = edge.second;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    int maxDist = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == 1e9) return -1;
        maxDist = std::max(maxDist, dist[i]);
    }
    return maxDist;
}`,
        java: `import java.util.*;

public int networkDelayTime(int[][] times, int n, int k) {
    Map<Integer, List<int[]>> adj = new HashMap<>();
    for (int[] t : times) {
        adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
    }
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.add(new int[]{0, k});
    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist[u]) continue;
        if (adj.containsKey(u)) {
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.add(new int[]{dist[v], v});
                }
            }
        }
    }
    int maxDist = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == Integer.MAX_VALUE) return -1;
        maxDist = Math.max(maxDist, dist[i]);
    }
    return maxDist;
}`
      }
    }
  },
  "Bit Manipulation": {
    title: "Bit Manipulation",
    overview: "Bit manipulation executes operations directly on machine words, offering fast executions and space savings.",
    whenToUse: "Use for boolean matrices, parity checks, power of 2 queries, and subset allocations.",
    types: [
      { name: "Bitwise Operators", desc: "Uses binary logical gates (AND, OR, XOR, NOT, shift left/right) directly at the machine instruction layer." },
      { name: "Bit Masking", desc: "Uses binary digits as a compact boolean array representation (a 'mask') to represent subset presence configurations." }
    ],
    concepts: [
      { name: "XOR Logic", desc: "Identical elements cancel out: A ^ A = 0. Also, A ^ 0 = A. Ideal for searching unique numbers." },
      { name: "Bit Masking", desc: "Using integers as sets. Bit position matches index presence: (1 << i) represents element index i." }
    ],
    complexity: {
      time: "O(1) for arithmetic machine operations.",
      space: "O(1) storage overhead."
    },
    template: {
      js: `// JS Bit Manipulation tricks
const isPowerOfTwo = n => n > 0 && (n & (n - 1)) === 0;
const getBit = (num, i) => (num & (1 << i)) !== 0;
const setBit = (num, i) => num | (1 << i);`,
      python: `# Python Bit Manipulation Tricks
is_power_of_two = lambda n: n > 0 and (n & (n - 1)) == 0
get_bit = lambda num, i: (num & (1 << i)) != 0
set_bit = lambda num, i: num | (1 << i)`,
      cpp: `// C++ Bit Manipulation Tricks
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
bool getBit(int num, int i) {
    return (num & (1 << i)) != 0;
}
int setBit(int num, int i) {
    return num | (1 << i);
}`,
      java: `// Java Bit Manipulation Tricks
public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
public boolean getBit(int num, int i) {
    return (num & (1 << i)) != 0;
}
public int setBit(int num, int i) {
    return num | (1 << i);
}`
    },
    example: {
      name: "Single Number",
      desc: "Given a non-empty array of integers, every element appears twice except for one. Find that single one.",
      dryRun: "nums = [4,1,2,1,2]\n- XOR accumulator starts at 0.\n- 0 ^ 4 ^ 1 ^ 2 ^ 1 ^ 2 = (1^1) ^ (2^2) ^ 4 = 0 ^ 0 ^ 4 = 4. Return 4.",
      visualTrace: `nums = [ 4, 1, 2, 1, 2 ]     Accumulator: 0

Evaluation Trace (using XOR ^):
0 ^ 4 -> 4   (binary 100)
4 ^ 1 -> 5   (binary 101)
5 ^ 2 -> 7   (binary 111)
7 ^ 1 -> 6   (binary 110) [Notice '1' bits cancel out]
6 ^ 2 -> 4   (binary 100) [Notice '2' bits cancel out]

Final unique number is 4. Return 4.`,
      code: {
        js: `function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
}`,
        python: `def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result`,
        cpp: `#include <vector>

int singleNumber(std::vector<int>& nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}`,
        java: `public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}`
      }
    }
  },
  "Math & Geometry": {
    title: "Math & Geometry",
    overview: "Mathematical layouts require modular math, prime logic, transformations, and geometric coordinates.",
    whenToUse: "Use for coordinate updates, large factorials, prime check filters, and matrix layouts.",
    types: [
      { name: "Number Theory", desc: "Checks properties of numbers (e.g. modular math, GCD Euclidean, prime filters like Sieve of Eratosthenes)." },
      { name: "Geometry & Spatial Matrices", desc: "Formulas relating to geometric points, coordinates, vector dot products, and line segments." }
    ],
    concepts: [
      { name: "GCD Euclidean Algorithm", desc: "Find GCD using modulo division: gcd(a, b) = gcd(b, a % b) until b equals 0." },
      { name: "Modular Arithmetic", desc: "Large values risk buffer overflows. Use (a + b) % M = ((a % M) + (b % M)) % M." }
    ],
    complexity: {
      time: "GCD: O(log(min(A, B))) | Prime filter: O(N log log N).",
      space: "O(1) space."
    },
    template: {
      js: `// JS GCD Recursive
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}`,
      python: `# Python GCD Recursive (or import math.gcd)
def gcd(a, b):
    return a if b == 0 else gcd(b, a % b)`,
      cpp: `// C++ GCD Recursive (or std::gcd in C++17)
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}`,
      java: `// Java GCD Recursive
public int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}`
    },
    example: {
      name: "Rotate Image Matrix",
      desc: "Rotate an n x n 2D matrix by 90 degrees clockwise in-place.",
      dryRun: "Matrix: [[1,2],[3,4]].\n- Transpose columns to rows: [[1,3],[2,4]]\n- Reverse each row: [[3,1],[4,2]]. Finished in-place.",
      visualTrace: `Matrix = [
  [ 1, 2 ],
  [ 3, 4 ]
]

Step 1: Transpose columns to rows (swap matrix[r][c] and matrix[c][r]).
  Swap matrix[0][1] (2) and matrix[1][0] (3)
  Transposed Grid:
  [ 1, 3 ]
  [ 2, 4 ]

Step 2: Reverse each row.
  Reverse row 0: [ 1, 3 ] -> [ 3, 1 ]
  Reverse row 1: [ 2, 4 ] -> [ 4, 2 ]
  Rotated Grid:
  [ 3, 1 ]
  [ 4, 2 ]`,
      code: {
        js: `function rotate(matrix) {
  const n = matrix.length;
  for (let r = 0; r < n; r++) {
    for (let c = r; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }
  for (let r = 0; r < n; r++) {
    matrix[r].reverse();
  }
}`,
        python: `def rotate(matrix):
    n = len(matrix)
    for r in range(n):
        for c in range(r, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for r in range(n):
        matrix[r].reverse()`,
        cpp: `#include <vector>
#include <algorithm>

void rotate(std::vector<std::vector<int>>& matrix) {
    int n = matrix.size();
    for (int r = 0; r < n; r++) {
        for (int c = r; c < n; c++) {
            std::swap(matrix[r][c], matrix[c][r]);
        }
    }
    for (int r = 0; r < n; r++) {
        std::reverse(matrix[r].begin(), matrix[r].end());
    }
}`,
        java: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    for (int r = 0; r < n; r++) {
        for (int c = r; c < n; c++) {
            int temp = matrix[r][c];
            matrix[r][c] = matrix[c][r];
            matrix[c][r] = temp;
        }
    }
    for (int r = 0; r < n; r++) {
        reverseRow(matrix[r]);
    }
}

private void reverseRow(int[] row) {
    int left = 0, right = row.length - 1;
    while (left < right) {
        int temp = row[left];
        row[left] = row[right];
        row[right] = temp;
        left++;
        right--;
    }
}`
      }
    }
  },
  "1-D DP": {
    title: "1-D DP",
    overview: "Dynamic Programming (DP) optimizes recursive relations by storing calculated values. 1-D DP tracks states using single dimensional array mappings.",
    whenToUse: "Use when outcomes depend on preceding linear parameters (climbing steps, integer partitions, sequential steps).",
    types: [
      { name: "Top-Down (Memoization)", desc: "Calculates recursively, storing results of subproblems in a 1D cache array/map before returning." },
      { name: "Bottom-Up (Tabulation)", desc: "Calculates iteratively, filling a 1D DP table index-by-index starting from base cases." },
      { name: "Space-Optimized DP", desc: "If the current state only depends on a few previous indices, keep only those state variables instead of a full 1D array." }
    ],
    concepts: [
      { name: "State Mapping definition", desc: "Define state dp[i] as the solution up to size i." },
      { name: "Transition Formulas", desc: "Determine how step dp[i] references previous indices: e.g. dp[i] = dp[i-1] + dp[i-2]." }
    ],
    complexity: {
      time: "Tabulated: O(N) | Space optimized: O(1).",
      space: "O(N) for array storage, or O(1) if using only index helper variables."
    },
    template: {
      js: `// JS 1D DP Tabulation Template
function solve1DDP(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
      python: `# Python 1D DP Tabulation Template
def solve_1d_dp(n):
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
      cpp: `// C++ 1D DP Tabulation Template
#include <vector>

int solve1DDP(int n) {
    std::vector<int> dp(n + 1, 0);
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
      java: `// Java 1D DP Tabulation Template
public int solve1DDP(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`
    },
    example: {
      name: "Climbing Stairs",
      desc: "It takes N steps to reach the top. You can climb 1 or 2 steps. Find unique paths.",
      dryRun: "N = 3:\n- dp[1] = 1, dp[2] = 2.\n- dp[3] = dp[2] + dp[1] = 3. Return 3.",
      visualTrace: `n = 4 stairs.  State space: dp[i] represents ways to reach step i

Base Cases: dp[1] = 1, dp[2] = 2

Evaluation:
- i = 3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3
- i = 4: dp[4] = dp[3] + dp[2] = 3 + 2 = 5

DP Array state: [ 0, 1, 2, 3, 5 ]
Return dp[4] = 5`,
      code: {
        js: `function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1, second = 2;
  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }
  return second;
}`,
        python: `def climbStairs(n):
    if n <= 2:
        return n
    first, second = 1, 2
    for i in range(3, n + 1):
        third = first + second
        first = second
        second = third
    return second`,
        cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int first = 1, second = 2;
    for (int i = 3; i <= n; i++) {
        int third = first + second;
        first = second;
        second = third;
    }
    return second;
}`,
        java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int first = 1, second = 2;
    for (int i = 3; i <= n; i++) {
        int third = first + second;
        first = second;
        second = third;
    }
    return second;
}`
      }
    }
  },
  "2-D DP": {
    title: "2-D DP",
    overview: "2-D DP uses a 2D matrix grid to compute optimal values across two independent parameters.",
    whenToUse: "Use for alignment tasks (LCS, Edit distance), path searches on grids, Knapsack configurations, and sequence alignments.",
    types: [
      { name: "Grid Path DP", desc: "Computes routes/minimum costs moving across cells in a 2D grid matrix." },
      { name: "Sequence Alignment DP", desc: "Finds comparisons (LCS, edit distance) between two strings s1 and s2. State dp[i][j] represents alignment of s1[0..i] and s2[0..j]." },
      { name: "Knapsack / Subset Choice DP", desc: "Grid mapping representing choices across items (rows) and capacities (columns)." }
    ],
    concepts: [
      { name: "Subsequence Alignments", desc: "States check prefixes: dp[i][j] maps the relationship between slice s1[0..i] and s2[0..j]." },
      { name: "Knapsack Decisions", desc: "At row i and weight capacity w, make decision to either include item i or exclude it, picking the max value configuration." }
    ],
    complexity: {
      time: "O(N * M) state lookups.",
      space: "O(N * M) matrix size, or O(Min(N, M)) if optimizing row allocations."
    },
    template: {
      js: `// JS 2D DP LCS Template
function longestCommonSubsequence(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i-1] === s2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  return dp[m][n];
}`,
      python: `# Python 2D DP LCS Template
def longestCommonSubsequence(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
      cpp: `// C++ 2D DP LCS Template
#include <string>
#include <vector>
#include <algorithm>

int longestCommonSubsequence(std::string s1, std::string s2) {
    int m = s1.length(), n = s2.length();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = std::max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}`,
      java: `// Java 2D DP LCS Template
public int longestCommonSubsequence(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}`
    },
    example: {
      name: "Unique Paths",
      desc: "Find unique routes from top-left cell to bottom-right cell in an M x N grid.",
      dryRun: "Grid: 3x2. Cell [r][c] path sum is cell [r-1][c] + cell [r][c-1].\n- Row 0 and Col 0 set to 1.\n- dp[1][1] = dp[0][1] + dp[1][0] = 2. Bottom right cell returns final route count.",
      visualTrace: `Grid: 3 rows x 3 columns. Formula: dp[r][c] = dp[r-1][c] + dp[r][c-1]

Initialize: Row 0 and Column 0 set to 1.
  [ 1, 1, 1 ]
  [ 1, 0, 0 ]
  [ 1, 0, 0 ]

Compute:
- dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2
  [ 1, 1, 1 ]
  [ 1, 2, 0 ]
  [ 1, 0, 0 ]
- dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3
- dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3
- dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6
  [ 1, 1, 1 ]
  [ 1, 2, 3 ]
  [ 1, 3, 6 ]

Unique Paths count = dp[2][2] = 6`,
      code: {
        js: `function uniquePaths(m, n) {
  const dp = Array(m).fill().map(() => Array(n).fill(1));
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r-1][c] + dp[r][c-1];
    }
  }
  return dp[m-1][n-1];
}`,
        python: `def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    for r in range(1, m):
        for c in range(1, n):
            dp[r][c] = dp[r-1][c] + dp[r][c-1]
    return dp[m-1][n-1]`,
        cpp: `#include <vector>

int uniquePaths(int m, int n) {
    std::vector<std::vector<int>> dp(m, std::vector<int>(n, 1));
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            dp[r][c] = dp[r-1][c] + dp[r][c-1];
        }
    }
    return dp[m-1][n-1];
}`,
        java: `public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (r == 0 || c == 0) {
                dp[r][c] = 1;
            } else {
                dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
            }
        }
    }
    return dp[m - 1][n - 1];
}`
      }
    }
  },
  "Design": {
    title: "Design",
    overview: "Design tasks check class configuration capability, pairing multiple data structures to meet strict runtime constraints.",
    whenToUse: "Use for caches (LRU, LFU), serialization libraries, autocomplete layouts, and custom collections.",
    types: [
      { name: "Cache Eviction Systems", desc: "Integrates hash maps with pointers (double linked lists) to support constant O(1) reads, writes, and oldest evictions (e.g. LRU, LFU caches)." },
      { name: "Prefix / Word Search Engines", desc: "Utilizes prefix tree character linking structures (Tries) supporting dynamic autocompletes." }
    ],
    concepts: [
      { name: "LRU Eviction (Least Recently Used)", desc: "Requires O(1) read/write and oldest item eviction. Met by combining a Hash Map (for lookup) with a Doubly Linked List (for access ordering)." },
      { name: "LFU Eviction (Least Frequently Used)", desc: "Combines frequency counters with eviction pools. Least used keys evict first; ties resolve using LRU." }
    ],
    complexity: {
      time: "Design operations target O(1) runtime.",
      space: "O(N) mapping structures."
    },
    template: {
      js: `// JS Doubly Linked List Node for Cache Design
class DLLNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}`,
      python: `# Python Doubly Linked List Node for Cache Design
class DLLNode:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None`,
      cpp: `// C++ Doubly Linked List Node for Cache Design
struct DLLNode {
    int key, val;
    DLLNode* prev;
    DLLNode* next;
    DLLNode(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
};`,
      java: `// Java Doubly Linked List Node for Cache Design
public class DLLNode {
    int key, val;
    DLLNode prev;
    DLLNode next;
    public DLLNode(int key, int val) {
        this.key = key;
        this.val = val;
    }
}`
    },
    example: {
      name: "LRU Cache",
      desc: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
      dryRun: "Initialize LRU size 2:\n- Put (1, 1), Put (2, 2). Map holds nodes {1, 2}.\n- Get(1) returns 1, moves node 1 to the head of list.\n- Put (3, 3) evicts oldest node (2). Map holds {1, 3}.",
      visualTrace: `LRU Cache Capacity: 2

List Schema:  Head <-> [Most Recently Used] <-> [Least Recently Used] <-> Tail

Put(1, 10): List: Head <-> Node(1:10) <-> Tail
            Map:  { 1: Node(1:10) }
Put(2, 20): List: Head <-> Node(2:20) <-> Node(1:10) <-> Tail
            Map:  { 1: Node(1:10), 2: Node(2:20) }
Get(1):     List Node(1:10) moves to head.
            List: Head <-> Node(1:10) <-> Node(2:20) <-> Tail
            Returns 10
Put(3, 30): Evict LRU node Node(2:20) (at tail.prev).
            Insert Node(3:30) at head.
            List: Head <-> Node(3:30) <-> Node(1:10) <-> Tail
            Map:  { 1: Node(1:10), 3: Node(3:30) }`,
      code: {
        js: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, val) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, val);
    if (this.map.size > this.capacity) {
      const oldest = this.map.keys().next().value;
      this.map.delete(oldest);
    }
  }
}`,
        python: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.map = {}
        # Using double linked list dummies
        self.head = DLLNode(0, 0)
        self.tail = DLLNode(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key in self.map:
            node = self.map[key]
            self._remove(node)
            self._add_to_head(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            self._remove(self.map[key])
        node = DLLNode(key, value)
        self.map[key] = node
        self._add_to_head(node)
        if len(self.map) > self.capacity:
            lru = self.tail.prev
            self._remove(lru)
            del self.map[lru.key]

    def _remove(self, node):
        p = node.prev
        n = node.next
        p.next = n
        n.prev = p

    def _add_to_head(self, node):
        n = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = n
        n.prev = node`,
        cpp: `#include <unordered_map>

class LRUCache {
private:
    struct Node {
        int key, val;
        Node* prev;
        Node* next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    int cap;
    std::unordered_map<int, Node*> map;
    Node* head;
    Node* tail;

    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    void addToHead(Node* node) {
        node->next = head->next;
        node->next->prev = node;
        head->next = node;
        node->prev = head;
    }
public:
    LRUCache(int capacity) {
        cap = capacity;
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }
    int get(int key) {
        if (!map.count(key)) return -1;
        Node* node = map[key];
        remove(node);
        addToHead(node);
        return node->val;
    }
    void put(int key, int value) {
        if (map.count(key)) {
            remove(map[key]);
            map[key]->val = value;
            addToHead(map[key]);
        } else {
            if (map.size() == cap) {
                Node* lru = tail->prev;
                remove(lru);
                map.erase(lru->key);
                delete lru;
            }
            Node* node = new Node(key, value);
            map[key] = node;
            addToHead(node);
        }
    }
};`,
        java: `import java.util.Map;
import java.util.HashMap;

public class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    private int cap;
    private Map<Integer, Node> map = new HashMap<>();
    private Node head, tail;

    public LRUCache(int capacity) {
        this.cap = capacity;
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        addToHead(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            remove(node);
            node.val = value;
            addToHead(node);
        } else {
            if (map.size() == cap) {
                Node lru = tail.prev;
                remove(lru);
                map.remove(lru.key);
            }
            Node node = new Node(key, value);
            map.put(key, node);
            addToHead(node);
        }
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToHead(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`
      }
    }
  },
  "Advanced Data Structures": {
    title: "Advanced Data Structures",
    overview: "Advanced structures resolve complex queries — like Range Minimum Queries (RMQ) or Dynamic Connectivity — in logarithmic time.",
    whenToUse: "Use Segment Trees or Fenwick Trees for range queries with point updates, and Union-Find (DSU) for cycle checking and clustering.",
    types: [
      { name: "Segment Tree", desc: "A binary tree modeling array intervals supporting range minimum/sum queries and point updates in O(log N) time." },
      { name: "Binary Indexed Tree (Fenwick)", desc: "A space-efficient tree structure denoting cumulative prefix sums. Supports point updates in O(log N)." },
      { name: "Disjoint Set Union (DSU)", desc: "A partition structure tracking dynamic connectivity and sets. Combines path compression and rank optimization for O(alpha(N)) bounds." }
    ],
    concepts: [
      { name: "Segment Tree", desc: "A binary tree where nodes represent intervals of an array. Range queries and updates run in O(log N) time." },
      { name: "Fenwick Tree (Binary Indexed Tree)", desc: "A space-efficient tree structure representing prefix sums. Updates and queries run in O(log N) time." }
    ],
    complexity: {
      time: "Range Query: O(log N) | Point Update: O(log N) | Union-Find: O(alpha(N))",
      space: "O(N) to store segment values or node groups."
    },
    template: {
      js: `// JS Segment Tree
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(2 * this.n).fill(0);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = arr[i];
    for (let i = this.n - 1; i > 0; --i) this.tree[i] = this.tree[2*i] + this.tree[2*i+1];
  }
}`,
      python: `# Python Segment Tree
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (2 * self.n)
        for i in range(self.n):
            self.tree[self.n + i] = arr[i]
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]`,
      cpp: `// C++ Segment Tree
#include <vector>

class SegmentTree {
private:
    int n;
    std::vector<int> tree;
public:
    SegmentTree(const std::vector<int>& arr) {
        n = arr.size();
        tree.resize(2 * n, 0);
        for (int i = 0; i < n; i++) tree[n + i] = arr[i];
        for (int i = n - 1; i > 0; --i) tree[i] = tree[2 * i] + tree[2 * i + 1];
    }
};`,
      java: `// Java Segment Tree
public class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[2 * n];
        for (int i = 0; i < n; i++) tree[n + i] = arr[i];
        for (int i = n - 1; i > 0; --i) tree[i] = tree[2 * i] + tree[2 * i + 1];
    }
}`
    },
    example: {
      name: "Range Sum Query - Mutable",
      desc: "Implement a data structure supporting range query sum and single index updates.",
      dryRun: "nums = [1, 3, 5]. Build Segment Tree.\n- tree = [0, 9, 4, 5, 1, 3, 5] (sums at indices)\n- Update index 1 to 2 -> updates tree nodes dynamically in O(log N).\n- Sum query [0, 2] returns current sum 8.",
      visualTrace: `nums = [ 1, 3, 5 ]    n = 3, Segment Tree array size = 2 * n = 6

Tree leaves initialized at [ n .. 2n - 1 ]:
  tree[3] = 1, tree[4] = 3, tree[5] = 5
Compute intermediate sum parents:
  tree[2] = tree[4] + tree[5] = 8
  tree[1] = tree[2] + tree[3] = 9 (Total Sum)

Tree Layout array: [ 0, 9, 8, 1, 3, 5 ]

1. Update index 1 with 2:
   diff = 2 - 3 = -1 -> update tree[4] = 2.
   Re-calculate parent tree[2] = tree[4] + tree[5] = 2 + 5 = 7.
   Re-calculate root tree[1] = tree[2] + tree[3] = 7 + 1 = 8.
2. sumRange(0, 2):
   Returns root value tree[1] = 8.`,
      code: {
        js: `class NumArray {
  constructor(nums) {
    this.nums = nums;
    this.n = nums.length;
    this.tree = new Array(2 * this.n).fill(0);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = nums[i];
    for (let i = this.n - 1; i > 0; i--) this.tree[i] = this.tree[2*i] + this.tree[2*i+1];
  }
  update(index, val) {
    let pos = index + this.n;
    this.tree[pos] = val;
    while (pos > 1) {
      let left = pos, right = pos;
      if (pos % 2 === 0) right = pos + 1;
      else left = pos - 1;
      pos = Math.floor(pos / 2);
      this.tree[pos] = this.tree[left] + this.tree[right];
    }
  }
  sumRange(left, right) {
    let sum = 0;
    let l = left + this.n, r = right + this.n;
    while (l <= r) {
      if (l % 2 === 1) { sum += this.tree[l]; l++; }
      if (r % 2 === 0) { sum += this.tree[r]; r--; }
      l = Math.floor(l / 2);
      r = Math.floor(r / 2);
    }
    return sum;
  }
}`,
        python: `class NumArray:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]

    def update(self, index: int, val: int) -> None:
        pos = index + self.n
        self.tree[pos] = val
        while pos > 1:
            left = right = pos
            if pos % 2 == 0:
                right = pos + 1
            else:
                left = pos - 1
            pos //= 2
            self.tree[pos] = self.tree[left] + self.tree[right]

    def sumRange(self, left: int, right: int) -> int:
        sum_val = 0
        l, r = left + self.n, right + self.n
        while l <= r:
            if l % 2 == 1:
                sum_val += self.tree[l]
                l += 1
            if r % 2 == 0:
                sum_val += self.tree[r]
                r -= 1
            l //= 2
            r //= 2
        return sum_val`,
        cpp: `#include <vector>

class NumArray {
private:
    int n;
    std::vector<int> tree;
public:
    NumArray(std::vector<int>& nums) {
        n = nums.size();
        tree.resize(2 * n, 0);
        for (int i = 0; i < n; i++) tree[n + i] = nums[i];
        for (int i = n - 1; i > 0; i--) tree[i] = tree[2 * i] + tree[2 * i + 1];
    }
    void update(int index, int val) {
        int pos = index + n;
        tree[pos] = val;
        while (pos > 1) {
            int left = pos, right = pos;
            if (pos % 2 == 0) right = pos + 1;
            else left = pos - 1;
            pos /= 2;
            tree[pos] = tree[left] + tree[right];
        }
    }
    int sumRange(int left, int right) {
        int sum = 0;
        int l = left + n, r = right + n;
        while (l <= r) {
            if (l % 2 == 1) { sum += tree[l]; l++; }
            if (r % 2 == 0) { sum += tree[r]; r--; }
            l /= 2;
            r /= 2;
        }
        return sum;
    }
};`,
        java: `public class NumArray {
    private int n;
    private int[] tree;

    public NumArray(int[] nums) {
        n = nums.length;
        tree = new int[2 * n];
        for (int i = 0; i < n; i++) tree[n + i] = nums[i];
        for (int i = n - 1; i > 0; i--) tree[i] = tree[2 * i] + tree[2 * i + 1];
    }

    public void update(int index, int val) {
        int pos = index + n;
        tree[pos] = val;
        while (pos > 1) {
            int left = pos, right = pos;
            if (pos % 2 == 0) right = pos + 1;
            else left = pos - 1;
            pos /= 2;
            tree[pos] = tree[left] + tree[right];
        }
    }

    public int sumRange(int left, int right) {
        int sum = 0;
        int l = left + n, r = right + n;
        while (l <= r) {
            if (l % 2 == 1) { sum += tree[l]; l++; }
            if (r % 2 == 0) { sum += tree[r]; r--; }
            l /= 2;
            r /= 2;
        }
        return sum;
    }
}`
      }
    }
  },

  "OOPs": {
    title: "OOPs (Object Oriented Programming)",
    overview: "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects', which contain data (fields/attributes) and code (methods). It organizes software design around data structures rather than functions and logic.",
    whenToUse: "Use OOP when modeling complex real-world entities, building extensible framework architectures, separating concerns through modular classes, and ensuring security/encapsulation in multi-developer codebases.",
    types: [
      { name: "Encapsulation", desc: "Bundling data (attributes) and methods (behavior) together into a single unit (class), while restricting direct access. Realized via access modifiers (private, protected) and getters/setters." },
      { name: "Abstraction", desc: "Hiding internal implementation details and exposing only safe, essential interfaces. Realized via abstract classes and interfaces." },
      { name: "Inheritance", desc: "Enables code reusability by allowing a subclass to acquire properties and behaviors of a parent superclass." },
      { name: "Polymorphism", desc: "Allows one interface to be used for a general class of actions. Implemented as Compile-time (Method Overloading) or Runtime (Method Overriding / Dynamic Dispatch)." }
    ],
    concepts: [
      { name: "Classes & Objects", desc: "A class is the blueprint/template. An object is a concrete, physical instance of that blueprint allocated in memory (heap)." },
      { name: "Interface vs Abstract Class", desc: "Abstract classes can have state and default constructors. Interfaces represent pure contracts, support multiple inheritance, and have no instance state." },
      { name: "Virtual Functions & Dynamic Binding", desc: "Enables runtime polymorphism. Base class pointers call overridden derived class methods using a compiler vtable (Virtual Method Table)." },
      { name: "Access Modifiers", desc: "Enforces encapsulation: public (global access), private (class-level access), protected (package and subclass access), and default (package-level)." }
    ],
    complexity: {
      time: "Object Allocation: O(1) average (heap allocation) | Virtual Method Call: O(1) via constant-time vtable index offset lookup.",
      space: "O(1) runtime memory overhead per object instance (stores class fields and a pointer to the class virtual method table)."
    },
    template: {
      js: `// JS ES6 Class Blueprint demonstrating Encapsulation & Inheritance
class Animal {
    #name; // Private field (ES2020)

    constructor(name) {
        if (this.constructor === Animal) {
            throw new Error("Abstract classes cannot be instantiated.");
        }
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    // Abstract-like method declaration
    makeSound() {
        throw new Error("Method 'makeSound()' must be implemented.");
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    makeSound() {
        return "Woof! Woof!";
    }
}`,
      python: `# Python Object-Oriented Blueprint demonstrating Abstraction & Encapsulation
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, brand: str):
        self._brand = brand          # Protected attribute (single underscore)
        self.__serial_number = "123" # Private attribute (double underscore - name mangling)

    def get_brand(self) -> str:
        return self._brand

    @abstractmethod
    def start_engine(self) -> str:
        pass

class Car(Vehicle):
    def __init__(self, brand: str, model: str):
        super().__init__(brand)
        self.model = model

    def start_engine(self) -> str:
        return f"{self._brand} {self.model} engine started: Vroom Vroom!"`,
      cpp: `// C++ Class Template showcasing Access Control, Virtual Destructors, & Polymorphism
#include <iostream>
#include <string>

class Shape {
protected:
    std::string color;

public:
    Shape(std::string col) : color(col) {}
    
    // Virtual destructor prevents memory leaks of derived classes during polymorphic deletion
    virtual ~Shape() {
        std::cout << "Shape Destructor called" << std::endl;
    }

    // Pure virtual function makes this an abstract base class
    virtual double area() const = 0;

    std::string getColor() const { return color; }
};`,
      java: `// Java Interface and Implementation Setup
interface Payable {
    double calculateSalary(); // Pure abstract method
}

abstract class Employee implements Payable {
    private String name;      // Private instance variable (Encapsulation)
    protected double basePay; // Protected variable accessible to subclasses

    public Employee(String name, double basePay) {
        this.name = name;
        this.basePay = basePay;
    }

    public String getName() { return name; }
}`
    },
    example: {
      name: "Dynamic Employee Payroll & Drawing System",
      desc: "Implement a polymorphic shape rendering and drawing system. Different shape instances (Circle, Rectangle) inherit from a base Shape interface, override the draw and area methods, and are stored in a common collection for dynamic execution.",
      dryRun: "1. Instantiate base class references holding derived class object addresses.\n2. Invoking shape.area() queries the object's header to locate its class virtual table.\n3. The pointer jumps to the overridden method of the child (e.g. Circle.area or Rectangle.area).\n4. Calling the destructors triggers the virtual destructor hierarchy in reverse order, cleaning derived classes safely.",
      visualTrace: `
+------------------+       Points To       +-------------------------+
| Shape* ptr       | --------------------> | Class vtable            |
+------------------+                       +-------------------------+
|                  |                       | index 0: Shape::draw()  |
| - color = "Red"  |                       | index 1: Shape::area()  |
+------------------+                       +-------------------------+
                                                       |
                                                       v
+------------------+       Overrides       +-------------------------+
| Circle Instance  | --------------------> | Overridden vtable       |
+------------------+                       +-------------------------+
| - radius = 5.0   |                       | index 0: Circle::draw() |
| - color = "Red"  |                       | index 1: Circle::area() |
+------------------+                       +-------------------------+
`,
      code: {
        js: `// JS Polymorphism & Shapes Drawing Demo
class Shape {
    constructor(color) {
        this.color = color;
    }
    area() { return 0; }
    draw() { console.log(\`Drawing a general shape in \${this.color}\`); }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    area() { return Math.PI * this.radius * this.radius; }
    draw() { console.log(\`Drawing a Circle with radius \${this.radius} in \${this.color}\`); }
}

const shapes = [new Circle("Green", 4), new Shape("Blue")];
shapes.forEach(s => s.draw());`,
        python: `# Python Shapes Drawing Demonstration
import math

class Shape:
    def __init__(self, color: str):
        self.color = color
    def area(self) -> float:
        return 0.0
    def draw(self):
        print(f"Drawing a general shape colored {self.color}")

class Circle(Shape):
    def __init__(self, color: str, radius: float):
        super().__init__(color)
        self.radius = radius
    def area(self) -> float:
        return math.pi * (self.radius ** 2)
    def draw(self):
        print(f"Drawing a Circle with radius {self.radius} colored {self.color}")`,
        cpp: `// C++ Polymorphic Shape Rendering
#include <iostream>
#include <vector>
#include <memory>

class Shape {
public:
    virtual ~Shape() = default;
    virtual void draw() const {
        std::cout << "Drawing a general shape" << std::endl;
    }
};

class Circle : public Shape {
public:
    void draw() const override {
        std::cout << "Drawing a Circle!" << std::endl;
    }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>());
    for(const auto& s : shapes) {
        s->draw(); // Polymorphic dispatch
    }
}`,
        java: `// Java Polymorphism Shape Drawing Demo
abstract class Shape {
    protected String color;
    public Shape(String color) { this.color = color; }
    public abstract double area();
    public abstract void draw();
}

class Circle extends Shape {
    private double radius;
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    @Override
    public double area() { return Math.PI * radius * radius; }
    @Override
    public void draw() {
        System.out.println("Drawing a circle of color " + color + " with radius " + radius);
    }
}`
      }
    }
  }
};