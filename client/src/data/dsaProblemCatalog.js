// Comprehensive LeetCode-grade problem catalog for DSA Sheet
export const DSA_PROBLEM_CATALOG = {
  // ── 1. Arrays & Hashing ──────────────────────────────────────────
  "arr1": {
    name: "Two Sum",
    level: "Easy",
    tags: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0, 1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1, 2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." },
      { input: "nums = [3,3], target = 6", output: "[0, 1]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    testcases: [
      { input: "[2,7,11,15]\n9", expected: "[0, 1]", label: "Case 1" },
      { input: "[3,2,4]\n6", expected: "[1, 2]", label: "Case 2" },
      { input: "[3,3]\n6", expected: "[0, 1]", label: "Case 3" }
    ],
    templates: {
      "python": "class Solution:\\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\\n        # Write your code here\\n        pass\\n",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    vector<int> twoSum(vector<int>& nums, int target) {\\n        // Write your code here\\n        return {};\\n    }\\n};\\n",
      "java": "import java.util.*;\\n\\nclass Solution {\\n    public int[] twoSum(int[] nums, int target) {\\n        // Write your code here\\n        return new int[]{};\\n    }\\n}\\n",
      "javascript": "var twoSum = function(nums, target) {\\n    // Write your code here\\n    return [];\\n};\\n"
}
  },

  "arr2": {
    name: "Contains Duplicate",
    level: "Easy",
    tags: ["Array", "Hash Table", "Sorting"],
    companies: ["Apple", "Amazon", "Microsoft"],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "true", explanation: "1 occurs twice." },
      { input: "nums = [1,2,3,4]", output: "false", explanation: "All elements are distinct." },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    testcases: [
      { input: "[1, 2, 3, 1]", expected: "true", label: "Case 1" },
      { input: "[1, 2, 3, 4]", expected: "false", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\\n    def containsDuplicate(self, nums: list[int]) -> bool:\\n        # Write your code here\\n        pass\\n",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    bool containsDuplicate(vector<int>& nums) {\\n        // Write your code here\\n        return false;\\n    }\\n};\\n",
      "java": "import java.util.*;\\n\\nclass Solution {\\n    public boolean containsDuplicate(int[] nums) {\\n        // Write your code here\\n        return false;\\n    }\\n}\\n",
      "javascript": "var containsDuplicate = function(nums) {\\n    // Write your code here\\n    return false;\\n};\\n"
}
  },

  "arr3": {
    name: "Valid Anagram",
    level: "Easy",
    tags: ["Hash Table", "String", "Sorting"],
    companies: ["Bloomberg", "Amazon", "Meta"],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an **anagram** of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    testcases: [
      { input: "anagram\nnagaram", expected: "true", label: "Case 1" },
      { input: "rat\ncar", expected: "false", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\\n    def isAnagram(self, s: str, t: str) -> bool:\\n        # Write your code here\\n        pass\\n",
      "cpp": "#include <iostream>\\n#include <string>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    bool isAnagram(string s, string t) {\\n        // Write your code here\\n        return false;\\n    }\\n};\\n",
      "java": "import java.util.*;\\n\\nclass Solution {\\n    public boolean isAnagram(String s, String t) {\\n        // Write your code here\\n        return false;\\n    }\\n}\\n",
      "javascript": "var isAnagram = function(s, t) {\\n    // Write your code here\\n    return false;\\n};\\n"
}
  },

  "arr6": {
    name: "Product of Array Except Self",
    level: "Medium",
    tags: ["Array", "Prefix Sum"],
    companies: ["Amazon", "Apple", "Meta", "Google"],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24, 12, 8, 6]", explanation: "The product of all elements except nums[0] is 2*3*4 = 24." },
      { input: "nums = [-1,1,0,-3,3]", output: "[0, 0, 9, 0, 0]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."
    ],
    testcases: [
      { input: "[1,2,3,4]", expected: "[24, 12, 8, 6]", label: "Case 1" },
      { input: "[-1,1,0,-3,3]", expected: "[0, 0, 9, 0, 0]", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var groupAnagrams = function(strs) {\n    // Write your code here\n    return [];\n};\n"
}
  },

  "arr9": {
    name: "Max Chunks To Make Sorted II",
    level: "Hard",
    tags: ["Array", "Stack", "Monotonic Stack", "Greedy"],
    companies: ["Google", "Amazon"],
    description: `You are given an integer array \`arr\`.

We split \`arr\` into some number of **chunks** (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return *the largest number of chunks we can make to sort the array*.`,
    examples: [
      { input: "arr = [5,4,3,2,1]", output: "1", explanation: "Splitting into 2 or more chunks will not result in a sorted array after sorting individually." },
      { input: "arr = [2,1,3,4,4]", output: "4", explanation: "We can split into chunks: [2, 1], [3], [4], [4]." }
    ],
    constraints: [
      "1 <= arr.length <= 2000",
      "0 <= arr[i] <= 10^8"
    ],
    testcases: [
      { input: "[5,4,3,2,1]", expected: "1", label: "Case 1" },
      { input: "[2,1,3,4,4]", expected: "4", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\\n    def maxChunksToSorted(self, arr: list[int]) -> int:\\n        # Write your code here\\n        pass\\n",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    int maxChunksToSorted(vector<int>& arr) {\\n        // Write your code here\\n        return 0;\\n    }\\n};\\n",
      "java": "import java.util.*;\\n\\nclass Solution {\\n    public int maxChunksToSorted(int[] arr) {\\n        // Write your code here\\n        return 0;\\n    }\\n}\\n",
      "javascript": "var maxChunksToSorted = function(arr) {\\n    // Write your code here\\n    return 0;\\n};\\n"
}
  },

  // ── 2. String ────────────────────────────────────────────────────
  "str1": {
    name: "Reverse String",
    level: "Easy",
    tags: ["Two Pointers", "String"],
    companies: ["Amazon", "Microsoft"],
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with \`O(1)\` extra memory.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    testcases: [
      { input: "hello", expected: "olleh", label: "Case 1" },
      { input: "world", expected: "dlrow", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\n    def reverseString(self, s: list[str]) -> None:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write your code here\n    }\n};\n",
      "java": "class Solution {\n    public void reverseString(char[] s) {\n        // Write your code here\n    }\n}\n",
      "javascript": "var reverseString = function(s) {\n    // Write your code here\n};\n"
}
  },

  "str3": {
    name: "Fizz Buzz",
    level: "Easy",
    tags: ["Math", "String", "Simulation"],
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    description: `Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:
- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by \`3\` and \`5\`.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by \`3\`.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by \`5\`.
- \`answer[i] == i\` (as a string) if none of the above conditions are true.`,
    examples: [
      { input: "n = 3", output: '["1", "2", "Fizz"]' },
      { input: "n = 5", output: '["1", "2", "Fizz", "4", "Buzz"]' }
    ],
    constraints: ["1 <= n <= 10^4"],
    testcases: [
      { input: "3", expected: '["1", "2", "Fizz"]', label: "Case 1" },
      { input: "5", expected: '["1", "2", "Fizz", "4", "Buzz"]', label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var isPalindrome = function(s) {\n    // Write your code here\n    return false;\n};\n"
}
  },

  // ── 3. Recursion ─────────────────────────────────────────────────
  "rec1": {
    name: "Fibonacci Number",
    level: "Easy",
    tags: ["Math", "Dynamic Programming", "Recursion", "Memoization"],
    companies: ["Amazon", "Google", "Meta"],
    description: `The **Fibonacci numbers**, commonly denoted \`F(n)\` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from \`0\` and \`1\`. That is:
- \`F(0) = 0, F(1) = 1\`
- \`F(n) = F(n - 1) + F(n - 2)\`, for \`n > 1\`.

Given \`n\`, calculate \`F(n)\`.`,
    examples: [
      { input: "n = 2", output: "1", explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1." },
      { input: "n = 3", output: "2", explanation: "F(3) = F(2) + F(1) = 1 + 1 = 2." },
      { input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." }
    ],
    constraints: ["0 <= n <= 30"],
    testcases: [
      { input: "2", expected: "1", label: "Case 1" },
      { input: "3", expected: "2", label: "Case 2" },
      { input: "4", expected: "3", label: "Case 3" }
    ],
    templates: {
      "python": "class Solution:\n    def fib(self, n: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "class Solution {\npublic:\n    int fib(int n) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "class Solution {\n    public int fib(int n) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var fib = function(n) {\n    // Write your code here\n    return 0;\n};\n"
}
  },

  // ── 4. Two Pointers ──────────────────────────────────────────────
  "two1": {
    name: "Valid Palindrome",
    level: "Easy",
    tags: ["Two Pointers", "String"],
    companies: ["Meta", "Microsoft", "Amazon"],
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not a palindrome.' }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    testcases: [
      { input: "A man, a plan, a canal: Panama", expected: "true", label: "Case 1" },
      { input: "race a car", expected: "false", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\\n        # Write your code here\\n        pass\\n",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    vector<int> twoSum(vector<int>& numbers, int target) {\\n        // Write your code here\\n        return {};\\n    }\\n};\\n",
      "java": "import java.util.*;\\n\\nclass Solution {\\n    public int[] twoSum(int[] numbers, int target) {\\n        // Write your code here\\n        return new int[]{};\\n    }\\n}\\n",
      "javascript": "var twoSum = function(numbers, target) {\\n    // Write your code here\\n    return [];\\n};\\n"
}
  },

  // ── 5. Sliding Window ────────────────────────────────────────────
  "sw1": {
    name: "Buy & Sell Stock",
    level: "Easy",
    tags: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Apple", "Google"],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "In this case, no transactions are done and max profit = 0." }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    testcases: [
      { input: "[7,1,5,3,6,4]", expected: "5", label: "Case 1" },
      { input: "[7,6,4,3,1]", expected: "0", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxProfit(int[] prices) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxProfit = function(prices) {\n    // Write your code here\n    return 0;\n};\n"
}
  },

  // ── 6. Stack ─────────────────────────────────────────────────────
  "stk1": {
    name: "Valid Parentheses",
    level: "Easy",
    tags: ["String", "Stack"],
    companies: ["Amazon", "Google", "Meta", "Bloomberg"],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    testcases: [
      { input: "()", expected: "true", label: "Case 1" },
      { input: "()[]{}", expected: "true", label: "Case 2" },
      { input: "(]", expected: "false", label: "Case 3" }
    ],
    templates: {
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var isValid = function(s) {\n    // Write your code here\n    return false;\n};\n"
}
  },

  // ── 7. Binary Search ─────────────────────────────────────────────
  "bs1": {
    name: "Binary Search",
    level: "Easy",
    tags: ["Array", "Binary Search"],
    companies: ["Apple", "Microsoft", "Amazon"],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    testcases: [
      { input: "[-1,0,3,5,9,12]\n9", expected: "4", label: "Case 1" },
      { input: "[-1,0,3,5,9,12]\n2", expected: "-1", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n        return -1;\n    }\n};\n",
      "java": "class Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n        return -1;\n    }\n}\n",
      "javascript": "var search = function(nums, target) {\n    // Write your code here\n    return -1;\n};\n"
}
  },

  "arr4": {
    name: "Group Anagrams",
    level: "Medium",
    tags: ["Array", "Hash Table", "String", "Sorting"],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    description: `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in **any order**.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Bat has no anagrams. Nat and tan are anagrams. Ate, eat, tea are anagrams.' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' }
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    testcases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]', label: "Case 1" },
      { input: '[""]', expected: '[[""]]', label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\\n        # Write your code here\\n        pass\\n",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    vector<int> productExceptSelf(vector<int>& nums) {\\n        // Write your code here\\n        return {};\\n    }\\n};\\n",
      "java": "import java.util.*;\\n\\nclass Solution {\\n    public int[] productExceptSelf(int[] nums) {\\n        // Write your code here\\n        return new int[]{};\\n    }\\n}\\n",
      "javascript": "var productExceptSelf = function(nums) {\\n    // Write your code here\\n    return [];\\n};\\n"
}
  },

  "arr5": {
    name: "Top K Frequent Elements",
    level: "Medium",
    tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Heap / Priority Queue", "Bucket Sort"],
    companies: ["Amazon", "Meta", "Google"],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in **any order**.`,
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1, 2]", explanation: "1 appears 3 times, 2 appears 2 times." },
      { input: "nums = [1], k = 1", output: "[1]" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique."
    ],
    testcases: [
      { input: "[1,1,1,2,2,3]\n2", expected: "[1, 2]", label: "Case 1" },
      { input: "[1]\n1", expected: "[1]", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\\n        # Write your code here\\n        pass\\n",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    vector<int> topKFrequent(vector<int>& nums, int k) {\\n        // Write your code here\\n        return {};\\n    }\\n};\\n",
      "java": "import java.util.*;\\n\\nclass Solution {\\n    public int[] topKFrequent(int[] nums, int k) {\\n        // Write your code here\\n        return new int[]{};\\n    }\\n}\\n",
      "javascript": "var topKFrequent = function(nums, k) {\\n    // Write your code here\\n    return [];\\n};\\n"
}
  },

  "two4": {
    name: "3Sum",
    level: "Medium",
    tags: ["Array", "Two Pointers", "Sorting"],
    companies: ["Amazon", "Meta", "Google", "Apple"],
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.\n\nNotice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "nums[0] + nums[1] + nums[2] = -1 + 0 + 1 = 0." },
      { input: "nums = [0,1,1]", output: "[]", explanation: "The only possible triplet does not sum up to 0." },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    testcases: [
      { input: "[-1,0,1,2,-1,-4]", expected: "[[-1, -1, 2], [-1, 0, 1]]", label: "Case 1" },
      { input: "[0,0,0]", expected: "[[0, 0, 0]]", label: "Case 2" }
    ],
    templates: {
      "python": "class Solution:\\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\\n        # Write your code here\\n        pass\\n",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    vector<vector<int>> threeSum(vector<int>& nums) {\\n        // Write your code here\\n        return {};\\n    }\\n};\\n",
      "java": "import java.util.*;\\n\\nclass Solution {\\n    public List<List<Integer>> threeSum(int[] nums) {\\n        // Write your code here\\n        return new ArrayList<>();\\n    }\\n}\\n",
      "javascript": "var threeSum = function(nums) {\\n    // Write your code here\\n    return [];\\n};\\n"
}
  },

  "dp1_1": {
    name: "Climbing Stairs",
    level: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    companies: ["Amazon", "Google", "Apple"],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps." },
      { input: "n = 3", output: "3", explanation: "There are three ways: 1. 1 + 1 + 1, 2. 1 + 2, 3. 2 + 1." }
    ],
    constraints: ["1 <= n <= 45"],
    testcases: [
      { input: "2", expected: "2", label: "Case 1" },
      { input: "3", expected: "3", label: "Case 2" },
      { input: "5", expected: "8", label: "Case 3" }
    ],
    templates: {
      "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var climbStairs = function(n) {\n    // Write your code here\n    return 0;\n};\n"
}
  }
};

// ── LeetCode Problem Synthesizer for 100% Coverage ───────────────────
export function synthesizeLeetCodeProblem(prob, patternName = 'DSA') {
  const name = prob.name || 'Problem';
  const level = prob.level || 'Medium';
  const nameLower = name.toLowerCase();
  const patLower = patternName.toLowerCase();

  let category = 'array';
  if (nameLower.includes('tree') || nameLower.includes('bst') || patLower.includes('tree')) category = 'tree';
  else if (nameLower.includes('list') || patLower.includes('linked list')) category = 'linked_list';
  else if (nameLower.includes('string') || nameLower.includes('palindrome') || nameLower.includes('anagram') || patLower.includes('string')) category = 'string';
  else if (nameLower.includes('sort') || patLower.includes('sort')) category = 'sorting';
  else if (nameLower.includes('search') || patLower.includes('binary search')) category = 'binary_search';
  else if (nameLower.includes('graph') || nameLower.includes('island') || patLower.includes('graph')) category = 'graph';
  else if (patLower.includes('dp') || patLower.includes('dynamic') || nameLower.includes('ways') || nameLower.includes('subsequence')) category = 'dp';
  else if (patLower.includes('stack') || patLower.includes('parenthes')) category = 'stack';

  let description = '';
  let examples = [];
  let constraints = [];
  let testcases = [];
  let templates = {};

    if (category === 'sorting') {
    description = `Given an array of integers \`nums\`, sort the array in ascending order using the **${name}** algorithmic strategy and return the sorted array.`;
    examples = [
      { input: 'nums = [5, 2, 3, 1]', output: '[1, 2, 3, 5]', explanation: 'Elements sorted in non-decreasing order.' },
      { input: 'nums = [5, 1, 1, 2, 0, 0]', output: '[0, 0, 1, 1, 2, 5]' }
    ];
    constraints = ['1 <= nums.length <= 5 * 10^4', '-5 * 10^4 <= nums[i] <= 5 * 10^4'];
    testcases = [
      { input: '[5, 2, 3, 1]', expected: '[1, 2, 3, 5]', label: 'Case 1' },
      { input: '[5, 1, 1, 2, 0, 0]', expected: '[0, 0, 1, 1, 2, 5]', label: 'Case 2' }
    ];
    templates = {
      python: `class Solution:\n    def sortArray(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n`,
      java: `import java.util.*;\n\nclass Solution {\n    public int[] sortArray(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n`,
      javascript: `var sortArray = function(nums) {\n    // Write your code here\n    return [];\n};\n`
    };
  } else if (category === 'string') {
    description = `Given an input string \`s\`, apply the **${name}** algorithmic rules to return the transformed result or validate the specified condition.`;
    examples = [
      { input: 's = "racecar"', output: 'true', explanation: 'Condition satisfied for palindrome.' },
      { input: 's = "hello"', output: 'false', explanation: 'Condition not satisfied.' }
    ];
    constraints = ['1 <= s.length <= 10^5', 's consists of printable ASCII characters.'];
    testcases = [
      { input: 'racecar', expected: 'true', label: 'Case 1' },
      { input: 'hello', expected: 'false', label: 'Case 2' }
    ];
    templates = {
      python: `class Solution:\n    def solve(self, s: str) -> bool:\n        # Write your code here\n        pass\n`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool solve(string s) {\n        // Write your code here\n        return false;\n    }\n};\n`,
      java: `import java.util.*;\n\nclass Solution {\n    public boolean solve(String s) {\n        // Write your code here\n        return false;\n    }\n}\n`,
      javascript: `var solve = function(s) {\n    // Write your code here\n    return false;\n};\n`
    };
  } else {
    description = `Solve the **${name}** algorithmic challenge (${level} tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.`;
    examples = [
      { input: 'nums = [1, 2, 3, 4]', output: '[1, 2, 3, 4]', explanation: 'Standard input processed according to algorithm.' },
      { input: 'nums = [10, 20]', output: '[10, 20]' }
    ];
    constraints = ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'];
    testcases = [
      { input: '[1, 2, 3, 4]', expected: '[1, 2, 3, 4]', label: 'Case 1' },
      { input: '[10, 20]', expected: '[10, 20]', label: 'Case 2' }
    ];
    templates = {
      python: `class Solution:\n    def solve(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> solve(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n`,
      java: `import java.util.*;\n\nclass Solution {\n    public int[] solve(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n`,
      javascript: `var solve = function(nums) {\n    // Write your code here\n    return [];\n};\n`
    };
  }

  return {
    id: prob.id,
    title: name,
    difficulty: level,
    tags: [patternName, 'Algorithms', 'Data Structures'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description,
    examples,
    constraints,
    testcases,
    templates
  };
}

// ── Unified Problem Resolution Function ──────────────────────────────
export function getProblemDetails(prob, patternName = 'DSA') {
  if (!prob) return null;

  // 1. Exact catalog ID match
  if (DSA_PROBLEM_CATALOG[prob.id]) {
    const item = DSA_PROBLEM_CATALOG[prob.id];
    return {
      id: prob.id,
      title: item.name || prob.name,
      difficulty: prob.level || item.level || 'Medium',
      tags: [patternName, ...(item.tags || [])],
      companies: item.companies || ['Amazon', 'Google', 'Meta'],
      description: item.description,
      examples: item.examples,
      constraints: item.constraints,
      testcases: item.testcases,
      templates: item.templates
    };
  }

  // 2. Exact or fuzzy catalog name match
  const probNameLower = (prob.name || '').toLowerCase().trim();
  const catalogKey = Object.keys(DSA_PROBLEM_CATALOG).find(k => {
    const catName = (DSA_PROBLEM_CATALOG[k].name || '').toLowerCase().trim();
    return catName === probNameLower ||
      (probNameLower.length > 5 && (catName.includes(probNameLower) || probNameLower.includes(catName)));
  });

  if (catalogKey) {
    const item = DSA_PROBLEM_CATALOG[catalogKey];
    return {
      id: prob.id,
      title: prob.name,
      difficulty: prob.level || item.level || 'Medium',
      tags: [patternName, ...(item.tags || [])],
      companies: item.companies || ['Amazon', 'Google', 'Meta'],
      description: item.description,
      examples: item.examples,
      constraints: item.constraints,
      testcases: item.testcases,
      templates: item.templates
    };
  }

  // 3. Fallback synthesizer
  return synthesizeLeetCodeProblem(prob, patternName);
}
