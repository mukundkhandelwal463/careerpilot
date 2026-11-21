// Comprehensive LeetCode problem catalog for all 259 DSA Sheet problems
export const DSA_PROBLEM_CATALOG = {
  "arr1": {
    "name": "Two Sum",
    "level": "Easy",
    "tags": [
      "Arrays & Hashing",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Two Sum** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0, 1]",
        "explanation": "Result produced according to Two Sum algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 7, 11, 15]\n9",
        "expected": "[0, 1]",
        "label": "Case 1"
      },
      {
        "input": "[3, 2, 4]\n6",
        "expected": "[1, 2]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var twoSum = function(nums, target) {\n    // Write your code here\n};\n"
    }
  },
  "arr2": {
    "name": "Contains Duplicate",
    "level": "Easy",
    "tags": [
      "Arrays & Hashing",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Contains Duplicate** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "true",
        "explanation": "Result produced according to Contains Duplicate algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 1]",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "[1, 2, 3, 4]",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var containsDuplicate = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "arr3": {
    "name": "Valid Anagram",
    "level": "Easy",
    "tags": [
      "Arrays & Hashing",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Valid Anagram** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "output": "true",
        "explanation": "Result produced according to Valid Anagram algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"anagram\"\n\"nagaram\"",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "\"rat\"\n\"car\"",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var isAnagram = function(s, t) {\n    // Write your code here\n};\n"
    }
  },
  "arr4": {
    "name": "Group Anagrams",
    "level": "Medium",
    "tags": [
      "Arrays & Hashing",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Group Anagrams** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
        "explanation": "Result produced according to Group Anagrams algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        "expected": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
        "label": "Case 1"
      },
      {
        "input": "[\"\"]",
        "expected": "[[\"\"]]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var groupAnagrams = function(strs) {\n    // Write your code here\n};\n"
    }
  },
  "arr5": {
    "name": "Top K Frequent Elements",
    "level": "Medium",
    "tags": [
      "Arrays & Hashing",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Top K Frequent Elements** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1,1,1,2,2,3], k = 2",
        "output": "[1, 2]",
        "explanation": "Result produced according to Top K Frequent Elements algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 1, 1, 2, 2, 3]\n2",
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
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var topKFrequent = function(nums, k) {\n    // Write your code here\n};\n"
    }
  },
  "arr6": {
    "name": "Product of Array Except Self",
    "level": "Medium",
    "tags": [
      "Arrays & Hashing",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Product of Array Except Self** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "[24, 12, 8, 6]",
        "explanation": "Result produced according to Product of Array Except Self algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "[24, 12, 8, 6]",
        "label": "Case 1"
      },
      {
        "input": "[-1, 1, 0, -3, 3]",
        "expected": "[0, 0, 9, 0, 0]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var productExceptSelf = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "arr7": {
    "name": "Longest Consecutive Sequence",
    "level": "Medium",
    "tags": [
      "Arrays & Hashing",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Consecutive Sequence** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [100,4,200,1,3,2]",
        "output": "4",
        "explanation": "Result produced according to Longest Consecutive Sequence algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[100, 4, 200, 1, 3, 2]",
        "expected": "4",
        "label": "Case 1"
      },
      {
        "input": "[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]",
        "expected": "9",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var longestConsecutive = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "arr8": {
    "name": "First Missing Positive",
    "level": "Hard",
    "tags": [
      "Arrays & Hashing",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **First Missing Positive** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 0]",
        "output": "3",
        "explanation": "Result produced according to First Missing Positive algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 0]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[3, 4, -1, 1]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def firstMissingPositive(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int firstMissingPositive(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var firstMissingPositive = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "arr9": {
    "name": "Max Chunks To Make Sorted II",
    "level": "Hard",
    "tags": [
      "Arrays & Hashing",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Max Chunks To Make Sorted II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "arr = [2, 1, 3, 4, 4]",
        "output": "4",
        "explanation": "Result produced according to Max Chunks To Make Sorted II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 1, 3, 4, 4]",
        "expected": "4",
        "label": "Case 1"
      },
      {
        "input": "[5, 4, 3, 2, 1]",
        "expected": "1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxChunksToSorted(self, arr: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxChunksToSorted(vector<int>& arr) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxChunksToSorted(int[] arr) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxChunksToSorted = function(arr) {\n    // Write your code here\n};\n"
    }
  },
  "arr10": {
    "name": "Insert Delete GetRandom O(1) - Duplicates allowed",
    "level": "Hard",
    "tags": [
      "Arrays & Hashing",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Insert Delete GetRandom O(1) - Duplicates allowed** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Insert Delete GetRandom O(1) - Duplicates allowed algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def insertDeleteGetrandomO1DuplicatesAllowed(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int insertDeleteGetrandomO1DuplicatesAllowed(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int insertDeleteGetrandomO1DuplicatesAllowed(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var insertDeleteGetrandomO1DuplicatesAllowed = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "str1": {
    "name": "Reverse String",
    "level": "Easy",
    "tags": [
      "String",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Reverse String** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
        "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
        "explanation": "Result produced according to Reverse String algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]",
        "expected": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
        "label": "Case 1"
      },
      {
        "input": "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
        "expected": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def reverseString(self, s: list[str]) -> None:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write your code here\n        \n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public void reverseString(char[] s) {\n        // Write your code here\n        return null;\n    }\n}\n",
      "javascript": "var reverseString = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "str2": {
    "name": "First Unique Character",
    "level": "Easy",
    "tags": [
      "String",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **First Unique Character** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"leetcode\"",
        "output": "0",
        "explanation": "Result produced according to First Unique Character algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"leetcode\"",
        "expected": "0",
        "label": "Case 1"
      },
      {
        "input": "\"loveleetcode\"",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def firstUniqChar(self, s: str) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstUniqChar(string s) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int firstUniqChar(String s) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var firstUniqChar = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "str3": {
    "name": "Fizz Buzz",
    "level": "Easy",
    "tags": [
      "String",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Fizz Buzz** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "n = 3",
        "output": "[\"1\",\"2\",\"Fizz\"]",
        "explanation": "Result produced according to Fizz Buzz algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "3",
        "expected": "[\"1\", \"2\", \"Fizz\"]",
        "label": "Case 1"
      },
      {
        "input": "5",
        "expected": "[\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\"]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def fizzBuzz(self, n: int) -> list[str]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<String> fizzBuzz(int n) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var fizzBuzz = function(n) {\n    // Write your code here\n};\n"
    }
  },
  "str4": {
    "name": "Longest Common Prefix",
    "level": "Medium",
    "tags": [
      "String",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Common Prefix** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "strs = [\"flower\",\"flow\",\"flight\"]",
        "output": "\"fl\"",
        "explanation": "Result produced according to Longest Common Prefix algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[\"flower\",\"flow\",\"flight\"]",
        "expected": "\"fl\"",
        "label": "Case 1"
      },
      {
        "input": "[\"dog\",\"racecar\",\"car\"]",
        "expected": "\"\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def longestCommonPrefix(self, strs: list[str]) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String longestCommonPrefix(String[] strs) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var longestCommonPrefix = function(strs) {\n    // Write your code here\n};\n"
    }
  },
  "str5": {
    "name": "Reverse Words in String",
    "level": "Medium",
    "tags": [
      "String",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Reverse Words in String** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"the sky is blue\"",
        "output": "\"blue is sky the\"",
        "explanation": "Result produced according to Reverse Words in String algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"the sky is blue\"",
        "expected": "\"blue is sky the\"",
        "label": "Case 1"
      },
      {
        "input": "\"  hello world  \"",
        "expected": "\"world hello\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def reverseWords(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string reverseWords(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String reverseWords(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var reverseWords = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "str6": {
    "name": "Multiply Strings",
    "level": "Medium",
    "tags": [
      "String",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Multiply Strings** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "num1 = \"2\", num2 = \"3\"",
        "output": "\"6\"",
        "explanation": "Result produced according to Multiply Strings algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"2\"\n\"3\"",
        "expected": "\"6\"",
        "label": "Case 1"
      },
      {
        "input": "\"123\"\n\"456\"",
        "expected": "\"56088\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def multiply(self, num1: str, num2: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string multiply(string num1, string num2) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String multiply(String num1, String num2) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var multiply = function(num1, num2) {\n    // Write your code here\n};\n"
    }
  },
  "str7": {
    "name": "Longest Palindromic Substring",
    "level": "Medium",
    "tags": [
      "String",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Palindromic Substring** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"babad\"",
        "output": "\"bab\"",
        "explanation": "Result produced according to Longest Palindromic Substring algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"babad\"",
        "expected": "\"bab\"",
        "label": "Case 1"
      },
      {
        "input": "\"cbbd\"",
        "expected": "\"bb\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String longestPalindrome(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var longestPalindrome = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "str8": {
    "name": "Shortest Palindrome",
    "level": "Hard",
    "tags": [
      "String",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Shortest Palindrome** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Shortest Palindrome algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def shortestPalindrome(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestPalindrome(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int shortestPalindrome(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var shortestPalindrome = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "str9": {
    "name": "Last Substring Lexicographical",
    "level": "Hard",
    "tags": [
      "String",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Last Substring Lexicographical** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Last Substring Lexicographical algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lastSubstringLexicographical(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lastSubstringLexicographical(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lastSubstringLexicographical(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lastSubstringLexicographical = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "str10": {
    "name": "Number of Atoms",
    "level": "Hard",
    "tags": [
      "String",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Number of Atoms** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Number of Atoms algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def numberOfAtoms(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numberOfAtoms(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int numberOfAtoms(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var numberOfAtoms = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "rec1": {
    "name": "Fibonacci Number",
    "level": "Easy",
    "tags": [
      "Recursion",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Fibonacci Number** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Fibonacci Number algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def fibonacciNumber(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int fibonacciNumber(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int fibonacciNumber(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var fibonacciNumber = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "rec2": {
    "name": "Power of Two",
    "level": "Easy",
    "tags": [
      "Recursion",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Power of Two** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Power of Two algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def powerOfTwo(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int powerOfTwo(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int powerOfTwo(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var powerOfTwo = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "rec3": {
    "name": "Merge Two Binary Trees",
    "level": "Easy",
    "tags": [
      "Recursion",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Merge Two Binary Trees** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Merge Two Binary Trees algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def mergeTwoBinaryTrees(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int mergeTwoBinaryTrees(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int mergeTwoBinaryTrees(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var mergeTwoBinaryTrees = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "rec4": {
    "name": "Letter Combinations",
    "level": "Medium",
    "tags": [
      "Recursion",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Letter Combinations** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Letter Combinations algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def letterCombinations(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int letterCombinations(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int letterCombinations(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var letterCombinations = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "rec5": {
    "name": "K-th Symbol in Grammar",
    "level": "Medium",
    "tags": [
      "Recursion",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **K-th Symbol in Grammar** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to K-th Symbol in Grammar algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def kthSymbolInGrammar(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthSymbolInGrammar(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int kthSymbolInGrammar(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var kthSymbolInGrammar = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "rec6": {
    "name": "Decode String",
    "level": "Medium",
    "tags": [
      "Recursion",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Decode String** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Decode String algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def decodeString(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string decodeString(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String decodeString(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var decodeString = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "rec7": {
    "name": "Combinations",
    "level": "Medium",
    "tags": [
      "Recursion",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Combinations** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Combinations algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def combinations(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int combinations(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int combinations(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var combinations = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "rec8": {
    "name": "Tower of Hanoi",
    "level": "Hard",
    "tags": [
      "Recursion",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Tower of Hanoi** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Tower of Hanoi algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def towerOfHanoi(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int towerOfHanoi(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int towerOfHanoi(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var towerOfHanoi = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "rec9": {
    "name": "Remove Invalid Parentheses",
    "level": "Hard",
    "tags": [
      "Recursion",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Remove Invalid Parentheses** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "Result produced according to Remove Invalid Parentheses algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"()[]{}\"",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "\"(]\"",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var isValid = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "rec10": {
    "name": "Expression Add Operators",
    "level": "Hard",
    "tags": [
      "Recursion",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Expression Add Operators** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Expression Add Operators algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def expressionAddOperators(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int expressionAddOperators(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int expressionAddOperators(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var expressionAddOperators = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt1": {
    "name": "Selection Sort",
    "level": "Easy",
    "tags": [
      "Sorting",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Selection Sort** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Selection Sort algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def selectionSort(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> selectionSort(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] selectionSort(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var selectionSort = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt2": {
    "name": "Bubble Sort",
    "level": "Easy",
    "tags": [
      "Sorting",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Bubble Sort** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Bubble Sort algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def bubbleSort(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> bubbleSort(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] bubbleSort(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var bubbleSort = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt3": {
    "name": "Insertion Sort",
    "level": "Easy",
    "tags": [
      "Sorting",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Insertion Sort** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Insertion Sort algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def insertionSort(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> insertionSort(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] insertionSort(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var insertionSort = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt4": {
    "name": "Merge Sort",
    "level": "Medium",
    "tags": [
      "Sorting",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Merge Sort** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Merge Sort algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def mergeSort(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> mergeSort(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] mergeSort(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var mergeSort = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt5": {
    "name": "Quick Sort",
    "level": "Medium",
    "tags": [
      "Sorting",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Quick Sort** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Quick Sort algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def quickSort(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> quickSort(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] quickSort(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var quickSort = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt6": {
    "name": "Heap Sort",
    "level": "Medium",
    "tags": [
      "Sorting",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Heap Sort** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Heap Sort algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def heapSort(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> heapSort(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] heapSort(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var heapSort = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt7": {
    "name": "Sort Colors (Counting / Dutch Flag)",
    "level": "Medium",
    "tags": [
      "Sorting",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Sort Colors (Counting / Dutch Flag)** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Sort Colors (Counting / Dutch Flag) algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def sortColorsCountingDutchFlag(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> sortColorsCountingDutchFlag(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] sortColorsCountingDutchFlag(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var sortColorsCountingDutchFlag = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt8": {
    "name": "Cycle Sort (Find Duplicate Number)",
    "level": "Medium",
    "tags": [
      "Sorting",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Cycle Sort (Find Duplicate Number)** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Cycle Sort (Find Duplicate Number) algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def cycleSortFindDuplicateNumber(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> cycleSortFindDuplicateNumber(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] cycleSortFindDuplicateNumber(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var cycleSortFindDuplicateNumber = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt9": {
    "name": "Bucket / Radix Sort (Maximum Gap)",
    "level": "Hard",
    "tags": [
      "Sorting",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Bucket / Radix Sort (Maximum Gap)** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Bucket / Radix Sort (Maximum Gap) algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def bucketRadixSortMaximumGap(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> bucketRadixSortMaximumGap(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] bucketRadixSortMaximumGap(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var bucketRadixSortMaximumGap = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "srt10": {
    "name": "3-Way Merge Sort (Sort List)",
    "level": "Hard",
    "tags": [
      "Sorting",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **3-Way Merge Sort (Sort List)** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to 3-Way Merge Sort (Sort List) algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def 3wayMergeSortSortList(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> 3wayMergeSortSortList(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] 3wayMergeSortSortList(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var 3wayMergeSortSortList = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "two1": {
    "name": "Valid Palindrome",
    "level": "Easy",
    "tags": [
      "Two Pointers",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Valid Palindrome** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"A man, a plan, a canal: Panama\"",
        "output": "true",
        "explanation": "Result produced according to Valid Palindrome algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"A man, a plan, a canal: Panama\"",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "\"race a car\"",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isPalindrome(String s) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var isPalindrome = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "two2": {
    "name": "Move Zeroes",
    "level": "Easy",
    "tags": [
      "Two Pointers",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Move Zeroes** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [0, 1, 0, 3, 12]",
        "output": "[1, 3, 12, 0, 0]",
        "explanation": "Result produced according to Move Zeroes algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[0, 1, 0, 3, 12]",
        "expected": "[1, 3, 12, 0, 0]",
        "label": "Case 1"
      },
      {
        "input": "[0]",
        "expected": "[0]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def moveZeroes(self, nums: list[int]) -> None:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public void moveZeroes(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}\n",
      "javascript": "var moveZeroes = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "two3": {
    "name": "Merge Sorted Array",
    "level": "Easy",
    "tags": [
      "Two Pointers",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Merge Sorted Array** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        "output": "[1, 2, 2, 3, 5, 6]",
        "explanation": "Result produced according to Merge Sorted Array algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 0, 0, 0]\n3\n[2, 5, 6]\n3",
        "expected": "[1, 2, 2, 3, 5, 6]",
        "label": "Case 1"
      },
      {
        "input": "[1]\n1\n[]\n0",
        "expected": "[1]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        // Write your code here\n        \n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Write your code here\n        return null;\n    }\n}\n",
      "javascript": "var merge = function(nums1, m, nums2, n) {\n    // Write your code here\n};\n"
    }
  },
  "two4": {
    "name": "3Sum",
    "level": "Medium",
    "tags": [
      "Two Pointers",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **3Sum** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "Result produced according to 3Sum algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[-1, 0, 1, 2, -1, -4]",
        "expected": "[[-1, -1, 2], [-1, 0, 1]]",
        "label": "Case 1"
      },
      {
        "input": "[0, 1, 1]",
        "expected": "[]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var threeSum = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "two5": {
    "name": "Container With Most Water",
    "level": "Medium",
    "tags": [
      "Two Pointers",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Container With Most Water** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "Result produced according to Container With Most Water algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "expected": "49",
        "label": "Case 1"
      },
      {
        "input": "[1, 1]",
        "expected": "1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxArea(int[] height) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxArea = function(height) {\n    // Write your code here\n};\n"
    }
  },
  "two6": {
    "name": "Two Sum II - Sorted",
    "level": "Medium",
    "tags": [
      "Two Pointers",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Two Sum II - Sorted** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "numbers = [2,7,11,15], target = 9",
        "output": "[1, 2]",
        "explanation": "Result produced according to Two Sum II - Sorted algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 7, 11, 15]\n9",
        "expected": "[1, 2]",
        "label": "Case 1"
      },
      {
        "input": "[2, 3, 4]\n6",
        "expected": "[1, 3]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def twoSum(self, numbers: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] numbers) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var twoSum = function(numbers) {\n    // Write your code here\n};\n"
    }
  },
  "two7": {
    "name": "Remove Duplicates II",
    "level": "Medium",
    "tags": [
      "Two Pointers",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Remove Duplicates II** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Remove Duplicates II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def removeDuplicatesIi(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int removeDuplicatesIi(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int removeDuplicatesIi(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var removeDuplicatesIi = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "two8": {
    "name": "Trapping Rain Water",
    "level": "Hard",
    "tags": [
      "Two Pointers",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Trapping Rain Water** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6",
        "explanation": "Result produced according to Trapping Rain Water algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "expected": "6",
        "label": "Case 1"
      },
      {
        "input": "[4, 2, 0, 3, 2, 5]",
        "expected": "9",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int trap(int[] height) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var trap = function(height) {\n    // Write your code here\n};\n"
    }
  },
  "two9": {
    "name": "Substring with Concatenation of All Words",
    "level": "Hard",
    "tags": [
      "Two Pointers",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Substring with Concatenation of All Words** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Substring with Concatenation of All Words algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def substringWithConcatenationOfAllWords(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int substringWithConcatenationOfAllWords(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int substringWithConcatenationOfAllWords(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var substringWithConcatenationOfAllWords = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "two10": {
    "name": "Valid Palindrome II",
    "level": "Hard",
    "tags": [
      "Two Pointers",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Valid Palindrome II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"aba\"",
        "output": "true",
        "explanation": "Result produced according to Valid Palindrome II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"aba\"",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "\"abca\"",
        "expected": "true",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def validPalindrome(self, s: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool validPalindrome(string s) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean validPalindrome(String s) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var validPalindrome = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "sw1": {
    "name": "Buy & Sell Stock",
    "level": "Easy",
    "tags": [
      "Sliding Window",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Buy & Sell Stock** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "prices = [7, 1, 5, 3, 6, 4]",
        "output": "5",
        "explanation": "Result produced according to Buy & Sell Stock algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[7, 1, 5, 3, 6, 4]",
        "expected": "5",
        "label": "Case 1"
      },
      {
        "input": "[7, 6, 4, 3, 1]",
        "expected": "0",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxProfit(int[] prices) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxProfit = function(prices) {\n    // Write your code here\n};\n"
    }
  },
  "sw2": {
    "name": "Min Diff High/Low of K",
    "level": "Easy",
    "tags": [
      "Sliding Window",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Min Diff High/Low of K** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Min Diff High/Low of K algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def minDiffHighlowOfK(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDiffHighlowOfK(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int minDiffHighlowOfK(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var minDiffHighlowOfK = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "sw3": {
    "name": "Defuse the Bomb",
    "level": "Easy",
    "tags": [
      "Sliding Window",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Defuse the Bomb** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Defuse the Bomb algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def defuseTheBomb(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int defuseTheBomb(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int defuseTheBomb(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var defuseTheBomb = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "sw4": {
    "name": "Longest Substring No Repeat",
    "level": "Medium",
    "tags": [
      "Sliding Window",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Substring No Repeat** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "Result produced according to Longest Substring No Repeat algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcabcbb\"",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "\"bbbbb\"",
        "expected": "1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lengthOfLongestSubstring = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "sw5": {
    "name": "Longest Repeat Char Replace",
    "level": "Medium",
    "tags": [
      "Sliding Window",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Repeat Char Replace** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"ABAB\", k = 2",
        "output": "4",
        "explanation": "Result produced according to Longest Repeat Char Replace algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"ABAB\"\n2",
        "expected": "4",
        "label": "Case 1"
      },
      {
        "input": "\"AABABBA\"\n1",
        "expected": "4",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int characterReplacement(String s, int k) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var characterReplacement = function(s, k) {\n    // Write your code here\n};\n"
    }
  },
  "sw6": {
    "name": "Permutation in String",
    "level": "Medium",
    "tags": [
      "Sliding Window",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Permutation in String** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
        "output": "true",
        "explanation": "Result produced according to Permutation in String algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"ab\"\n\"eidbaooo\"",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "\"ab\"\n\"eidboaoo\"",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean checkInclusion(String s1, String s2) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var checkInclusion = function(s1, s2) {\n    // Write your code here\n};\n"
    }
  },
  "sw7": {
    "name": "Min Size Subarray Sum",
    "level": "Medium",
    "tags": [
      "Sliding Window",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Min Size Subarray Sum** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "target = 7, nums = [2,3,1,2,4,3]",
        "output": "2",
        "explanation": "Result produced according to Min Size Subarray Sum algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "7\n[2, 3, 1, 2, 4, 3]",
        "expected": "2",
        "label": "Case 1"
      },
      {
        "input": "4\n[1, 4, 4]",
        "expected": "1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def minSubArrayLen(self, target: int, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int minSubArrayLen(int target, int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var minSubArrayLen = function(target, nums) {\n    // Write your code here\n};\n"
    }
  },
  "sw8": {
    "name": "Min Window Substring",
    "level": "Hard",
    "tags": [
      "Sliding Window",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Min Window Substring** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
        "output": "\"BANC\"",
        "explanation": "Result produced according to Min Window Substring algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"ADOBECODEBANC\"\n\"ABC\"",
        "expected": "\"BANC\"",
        "label": "Case 1"
      },
      {
        "input": "\"a\"\n\"a\"",
        "expected": "\"a\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String minWindow(String s, String t) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var minWindow = function(s, t) {\n    // Write your code here\n};\n"
    }
  },
  "sw9": {
    "name": "Sliding Window Median",
    "level": "Hard",
    "tags": [
      "Sliding Window",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Sliding Window Median** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Sliding Window Median algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def slidingWindowMedian(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int slidingWindowMedian(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int slidingWindowMedian(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var slidingWindowMedian = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "sw10": {
    "name": "K Different Integers",
    "level": "Hard",
    "tags": [
      "Sliding Window",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **K Different Integers** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to K Different Integers algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def kDifferentIntegers(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kDifferentIntegers(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int kDifferentIntegers(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var kDifferentIntegers = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "stk1": {
    "name": "Valid Parentheses",
    "level": "Easy",
    "tags": [
      "Stack",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Valid Parentheses** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "Result produced according to Valid Parentheses algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"()[]{}\"",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "\"(]\"",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var isValid = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "stk2": {
    "name": "Make The String Great",
    "level": "Easy",
    "tags": [
      "Stack",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Make The String Great** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Make The String Great algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def makeTheStringGreat(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string makeTheStringGreat(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String makeTheStringGreat(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var makeTheStringGreat = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "stk3": {
    "name": "Min Stack",
    "level": "Easy",
    "tags": [
      "Stack",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Min Stack** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "[\"MinStack\",\"push\",\"getMin\"]",
        "output": "[null,null,-2]",
        "explanation": "Result produced according to Min Stack algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]",
        "expected": "[null,null,null,null,-3,null,0,-2]",
        "label": "Case 1"
      },
      {
        "input": "[]",
        "expected": "[]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def MinStack(self) -> None:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    void MinStack() {\n        // Write your code here\n        \n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public void MinStack() {\n        // Write your code here\n        return null;\n    }\n}\n",
      "javascript": "var MinStack = function() {\n    // Write your code here\n};\n"
    }
  },
  "stk4": {
    "name": "Evaluate Reverse Polish",
    "level": "Medium",
    "tags": [
      "Stack",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Evaluate Reverse Polish** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
        "output": "9",
        "explanation": "Result produced according to Evaluate Reverse Polish algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[\"2\",\"1\",\"+\",\"3\",\"*\"]",
        "expected": "9",
        "label": "Case 1"
      },
      {
        "input": "[\"4\",\"13\",\"5\",\"/\",\"+\"]",
        "expected": "6",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int evalRPN(String[] tokens) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var evalRPN = function(tokens) {\n    // Write your code here\n};\n"
    }
  },
  "stk5": {
    "name": "Generate Parentheses",
    "level": "Medium",
    "tags": [
      "Stack",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Generate Parentheses** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "n = 3",
        "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "explanation": "Result produced according to Generate Parentheses algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "3",
        "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "label": "Case 1"
      },
      {
        "input": "1",
        "expected": "[\"()\"]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<String> generateParenthesis(int n) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var generateParenthesis = function(n) {\n    // Write your code here\n};\n"
    }
  },
  "stk6": {
    "name": "Daily Temperatures",
    "level": "Medium",
    "tags": [
      "Stack",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Daily Temperatures** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "temperatures = [73,74,75,71,69,72,76,73]",
        "output": "[1, 1, 4, 2, 1, 1, 0, 0]",
        "explanation": "Result produced according to Daily Temperatures algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[73, 74, 75, 71, 69, 72, 76, 73]",
        "expected": "[1, 1, 4, 2, 1, 1, 0, 0]",
        "label": "Case 1"
      },
      {
        "input": "[30, 40, 50, 60]",
        "expected": "[1, 1, 1, 0]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var dailyTemperatures = function(temperatures) {\n    // Write your code here\n};\n"
    }
  },
  "stk7": {
    "name": "Car Fleet",
    "level": "Medium",
    "tags": [
      "Stack",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Car Fleet** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
        "output": "3",
        "explanation": "Result produced according to Car Fleet algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "12\n[10, 8, 0, 5, 3]\n[2, 4, 1, 1, 3]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "10\n[3]\n[3]",
        "expected": "1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int carFleet(int target, vector<int>& position, vector<int>& speed) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int carFleet(int target, int[] position, int[] speed) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var carFleet = function(target, position, speed) {\n    // Write your code here\n};\n"
    }
  },
  "stk8": {
    "name": "Largest Rect in Histogram",
    "level": "Hard",
    "tags": [
      "Stack",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Largest Rect in Histogram** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "heights = [2,1,5,6,2,3]",
        "output": "10",
        "explanation": "Result produced according to Largest Rect in Histogram algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 1, 5, 6, 2, 3]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4]",
        "expected": "4",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def largestRectangleArea(self, heights: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int largestRectangleArea(int[] heights) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var largestRectangleArea = function(heights) {\n    // Write your code here\n};\n"
    }
  },
  "stk9": {
    "name": "Maximal Rectangle",
    "level": "Hard",
    "tags": [
      "Stack",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Maximal Rectangle** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Maximal Rectangle algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maximalRectangle(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maximalRectangle(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maximalRectangle(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maximalRectangle = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "stk10": {
    "name": "Basic Calculator",
    "level": "Hard",
    "tags": [
      "Stack",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Basic Calculator** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Basic Calculator algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def basicCalculator(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int basicCalculator(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int basicCalculator(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var basicCalculator = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que1": {
    "name": "Number of Recent Calls",
    "level": "Easy",
    "tags": [
      "Queues & Deques",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Number of Recent Calls** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Number of Recent Calls algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def numberOfRecentCalls(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numberOfRecentCalls(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int numberOfRecentCalls(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var numberOfRecentCalls = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que2": {
    "name": "Stack using Queues",
    "level": "Easy",
    "tags": [
      "Queues & Deques",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Stack using Queues** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Stack using Queues algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def stackUsingQueues(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int stackUsingQueues(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int stackUsingQueues(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var stackUsingQueues = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que3": {
    "name": "Queue using Stacks",
    "level": "Easy",
    "tags": [
      "Queues & Deques",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Queue using Stacks** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Queue using Stacks algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def queueUsingStacks(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int queueUsingStacks(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int queueUsingStacks(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var queueUsingStacks = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que4": {
    "name": "Design Circular Queue",
    "level": "Medium",
    "tags": [
      "Queues & Deques",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Design Circular Queue** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Design Circular Queue algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def designCircularQueue(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int designCircularQueue(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int designCircularQueue(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var designCircularQueue = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que5": {
    "name": "Reveal Cards In Increasing Order",
    "level": "Medium",
    "tags": [
      "Queues & Deques",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Reveal Cards In Increasing Order** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Reveal Cards In Increasing Order algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def revealCardsInIncreasingOrder(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int revealCardsInIncreasingOrder(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int revealCardsInIncreasingOrder(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var revealCardsInIncreasingOrder = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que6": {
    "name": "Circular Deque",
    "level": "Medium",
    "tags": [
      "Queues & Deques",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Circular Deque** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Circular Deque algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def circularDeque(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int circularDeque(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int circularDeque(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var circularDeque = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que7": {
    "name": "Dota2 Senate",
    "level": "Medium",
    "tags": [
      "Queues & Deques",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Dota2 Senate** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Dota2 Senate algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def dota2Senate(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int dota2Senate(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int dota2Senate(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var dota2Senate = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que8": {
    "name": "Sliding Window Max",
    "level": "Hard",
    "tags": [
      "Queues & Deques",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Sliding Window Max** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Sliding Window Max algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def slidingWindowMax(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int slidingWindowMax(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int slidingWindowMax(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var slidingWindowMax = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que9": {
    "name": "Max Value of Equation",
    "level": "Hard",
    "tags": [
      "Queues & Deques",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Max Value of Equation** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Max Value of Equation algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxValueOfEquation(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxValueOfEquation(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxValueOfEquation(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxValueOfEquation = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "que10": {
    "name": "Shortest Subarray Sum K",
    "level": "Hard",
    "tags": [
      "Queues & Deques",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Shortest Subarray Sum K** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Shortest Subarray Sum K algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def shortestSubarraySumK(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestSubarraySumK(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int shortestSubarraySumK(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var shortestSubarraySumK = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ll1": {
    "name": "Reverse Linked List",
    "level": "Easy",
    "tags": [
      "Linked List",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Reverse Linked List** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5, 4, 3, 2, 1]",
        "explanation": "Result produced according to Reverse Linked List algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4, 5]",
        "expected": "[5, 4, 3, 2, 1]",
        "label": "Case 1"
      },
      {
        "input": "[1, 2]",
        "expected": "[2, 1]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var reverseList = function(head) {\n    // Write your code here\n};\n"
    }
  },
  "ll2": {
    "name": "Merge Two Sorted Lists",
    "level": "Easy",
    "tags": [
      "Linked List",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Merge Two Sorted Lists** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "list1 = [1,2,4], list2 = [1,3,4]",
        "output": "[1, 1, 2, 3, 4, 4]",
        "explanation": "Result produced according to Merge Two Sorted Lists algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 4]\n[1, 3, 4]",
        "expected": "[1, 1, 2, 3, 4, 4]",
        "label": "Case 1"
      },
      {
        "input": "[]\n[]",
        "expected": "[]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var mergeTwoLists = function(list1, list2) {\n    // Write your code here\n};\n"
    }
  },
  "ll3": {
    "name": "Linked List Cycle",
    "level": "Easy",
    "tags": [
      "Linked List",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Linked List Cycle** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "head = [3,2,0,-4], pos = 1",
        "output": "true",
        "explanation": "Result produced according to Linked List Cycle algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 2, 0, -4]\n1",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "[1]\n-1",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasCycle(ListNode* head) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean hasCycle(ListNode head) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var hasCycle = function(head) {\n    // Write your code here\n};\n"
    }
  },
  "ll4": {
    "name": "Reorder List",
    "level": "Medium",
    "tags": [
      "Linked List",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Reorder List** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "head = [1,2,3,4]",
        "output": "[1, 4, 2, 3]",
        "explanation": "Result produced according to Reorder List algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "[1, 4, 2, 3]",
        "label": "Case 1"
      },
      {
        "input": "[1, 2, 3, 4, 5]",
        "expected": "[1, 5, 2, 4, 3]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reorderList(ListNode* head) {\n        // Write your code here\n        \n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public void reorderList(ListNode head) {\n        // Write your code here\n        return null;\n    }\n}\n",
      "javascript": "var reorderList = function(head) {\n    // Write your code here\n};\n"
    }
  },
  "ll5": {
    "name": "Remove Nth Node From End",
    "level": "Medium",
    "tags": [
      "Linked List",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Remove Nth Node From End** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5], n = 2",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Remove Nth Node From End algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4, 5]\n2",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[1]\n1",
        "expected": "[]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var removeNthFromEnd = function(head, n) {\n    // Write your code here\n};\n"
    }
  },
  "ll6": {
    "name": "Copy List with Random Pointer",
    "level": "Medium",
    "tags": [
      "Linked List",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Copy List with Random Pointer** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5, 4, 3, 2, 1]",
        "explanation": "Result produced according to Copy List with Random Pointer algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4, 5]",
        "expected": "[5, 4, 3, 2, 1]",
        "label": "Case 1"
      },
      {
        "input": "[1, 2]",
        "expected": "[2, 1]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def copyListWithRandomPointer(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* copyListWithRandomPointer(ListNode* head) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode copyListWithRandomPointer(ListNode head) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var copyListWithRandomPointer = function(head) {\n    // Write your code here\n};\n"
    }
  },
  "ll7": {
    "name": "Add Two Numbers",
    "level": "Medium",
    "tags": [
      "Linked List",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Add Two Numbers** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "l1 = [2,4,3], l2 = [5,6,4]",
        "output": "[7, 0, 8]",
        "explanation": "Result produced according to Add Two Numbers algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 4, 3]\n[5, 6, 4]",
        "expected": "[7, 0, 8]",
        "label": "Case 1"
      },
      {
        "input": "[0]\n[0]",
        "expected": "[0]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var addTwoNumbers = function(l1, l2) {\n    // Write your code here\n};\n"
    }
  },
  "ll8": {
    "name": "Merge k Sorted Lists",
    "level": "Hard",
    "tags": [
      "Linked List",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Merge k Sorted Lists** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Merge k Sorted Lists algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def mergeKSortedLists(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> mergeKSortedLists(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] mergeKSortedLists(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var mergeKSortedLists = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ll9": {
    "name": "Reverse Nodes in k-Group",
    "level": "Hard",
    "tags": [
      "Linked List",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Reverse Nodes in k-Group** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5, 4, 3, 2, 1]",
        "explanation": "Result produced according to Reverse Nodes in k-Group algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4, 5]",
        "expected": "[5, 4, 3, 2, 1]",
        "label": "Case 1"
      },
      {
        "input": "[1, 2]",
        "expected": "[2, 1]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def reverseNodesInKgroup(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* reverseNodesInKgroup(ListNode* head) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode reverseNodesInKgroup(ListNode head) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var reverseNodesInKgroup = function(head) {\n    // Write your code here\n};\n"
    }
  },
  "ll10": {
    "name": "Linked List Cycle II",
    "level": "Hard",
    "tags": [
      "Linked List",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Linked List Cycle II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "head = [3,2,0,-4], pos = 1",
        "output": "tail connects to node index 1",
        "explanation": "Result produced according to Linked List Cycle II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 2, 0, -4]\n1",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[1, 2]\n0",
        "expected": "0",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* detectCycle(ListNode* head) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode detectCycle(ListNode head) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var detectCycle = function(head) {\n    // Write your code here\n};\n"
    }
  },
  "bs1": {
    "name": "Binary Search",
    "level": "Easy",
    "tags": [
      "Binary Search",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Binary Search** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [-1,0,3,5,9,12], target = 9",
        "output": "4",
        "explanation": "Result produced according to Binary Search algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[-1, 0, 3, 5, 9, 12]\n9",
        "expected": "4",
        "label": "Case 1"
      },
      {
        "input": "[-1, 0, 3, 5, 9, 12]\n2",
        "expected": "-1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var search = function(nums, target) {\n    // Write your code here\n};\n"
    }
  },
  "bs2": {
    "name": "Search Insert Position",
    "level": "Easy",
    "tags": [
      "Binary Search",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Search Insert Position** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Search Insert Position algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def searchInsertPosition(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int searchInsertPosition(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int searchInsertPosition(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var searchInsertPosition = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bs3": {
    "name": "First Bad Version",
    "level": "Easy",
    "tags": [
      "Binary Search",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **First Bad Version** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to First Bad Version algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def firstBadVersion(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstBadVersion(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int firstBadVersion(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var firstBadVersion = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bs4": {
    "name": "Search 2D Matrix",
    "level": "Medium",
    "tags": [
      "Binary Search",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Search 2D Matrix** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        "output": "true",
        "explanation": "Result produced according to Search 2D Matrix algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]\n3",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]\n13",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var searchMatrix = function(matrix, target) {\n    // Write your code here\n};\n"
    }
  },
  "bs5": {
    "name": "Find Min in Rotated Array",
    "level": "Medium",
    "tags": [
      "Binary Search",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Find Min in Rotated Array** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [3,4,5,1,2]",
        "output": "1",
        "explanation": "Result produced according to Find Min in Rotated Array algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 4, 5, 1, 2]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[4, 5, 6, 7, 0, 1, 2]",
        "expected": "0",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def findMin(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int findMin(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var findMin = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bs6": {
    "name": "Search in Rotated Array",
    "level": "Medium",
    "tags": [
      "Binary Search",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Search in Rotated Array** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 0",
        "output": "4",
        "explanation": "Result produced according to Search in Rotated Array algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[4, 5, 6, 7, 0, 1, 2]\n0",
        "expected": "4",
        "label": "Case 1"
      },
      {
        "input": "[4, 5, 6, 7, 0, 1, 2]\n3",
        "expected": "-1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var search = function(nums, target) {\n    // Write your code here\n};\n"
    }
  },
  "bs7": {
    "name": "Time Based Key-Value Store",
    "level": "Medium",
    "tags": [
      "Binary Search",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Time Based Key-Value Store** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Time Based Key-Value Store algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def timeBasedKeyvalueStore(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int timeBasedKeyvalueStore(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int timeBasedKeyvalueStore(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var timeBasedKeyvalueStore = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bs8": {
    "name": "Median of Two Sorted Arrays",
    "level": "Hard",
    "tags": [
      "Binary Search",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Median of Two Sorted Arrays** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Median of Two Sorted Arrays algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def medianOfTwoSortedArrays(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> medianOfTwoSortedArrays(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] medianOfTwoSortedArrays(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var medianOfTwoSortedArrays = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bs9": {
    "name": "Split Array Largest Sum",
    "level": "Hard",
    "tags": [
      "Binary Search",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Split Array Largest Sum** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Split Array Largest Sum algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def splitArrayLargestSum(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int splitArrayLargestSum(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int splitArrayLargestSum(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var splitArrayLargestSum = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bs10": {
    "name": "Find Min in Rotated Array II",
    "level": "Hard",
    "tags": [
      "Binary Search",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Find Min in Rotated Array II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [3,4,5,1,2]",
        "output": "1",
        "explanation": "Result produced according to Find Min in Rotated Array II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 4, 5, 1, 2]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[4, 5, 6, 7, 0, 1, 2]",
        "expected": "0",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def findMin(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int findMin(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var findMin = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "mat1": {
    "name": "Flood Fill",
    "level": "Easy",
    "tags": [
      "Matrix / Grid",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Flood Fill** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Flood Fill algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def floodFill(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int floodFill(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int floodFill(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var floodFill = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "mat2": {
    "name": "Shift 2D Grid",
    "level": "Easy",
    "tags": [
      "Matrix / Grid",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Shift 2D Grid** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "grid = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "1",
        "explanation": "Result produced according to Shift 2D Grid algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[[1, 0], [0, 1]]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def shift2dGrid(self, grid: list[list[int]]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shift2dGrid(vector<vector<int>>& grid) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int shift2dGrid(int[][] grid) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var shift2dGrid = function(grid) {\n    // Write your code here\n};\n"
    }
  },
  "mat3": {
    "name": "Transpose Matrix",
    "level": "Easy",
    "tags": [
      "Matrix / Grid",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Transpose Matrix** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "grid = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "1",
        "explanation": "Result produced according to Transpose Matrix algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[[1, 0], [0, 1]]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def transposeMatrix(self, grid: list[list[int]]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int transposeMatrix(vector<vector<int>>& grid) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int transposeMatrix(int[][] grid) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var transposeMatrix = function(grid) {\n    // Write your code here\n};\n"
    }
  },
  "mat4": {
    "name": "Search a 2D Matrix II",
    "level": "Medium",
    "tags": [
      "Matrix / Grid",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Search a 2D Matrix II** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "grid = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "1",
        "explanation": "Result produced according to Search a 2D Matrix II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[[1, 0], [0, 1]]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def searchA2dMatrixIi(self, grid: list[list[int]]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int searchA2dMatrixIi(vector<vector<int>>& grid) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int searchA2dMatrixIi(int[][] grid) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var searchA2dMatrixIi = function(grid) {\n    // Write your code here\n};\n"
    }
  },
  "mat5": {
    "name": "Spiral Matrix",
    "level": "Medium",
    "tags": [
      "Matrix / Grid",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Spiral Matrix** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "grid = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "1",
        "explanation": "Result produced according to Spiral Matrix algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[[1, 0], [0, 1]]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def spiralMatrix(self, grid: list[list[int]]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int spiralMatrix(vector<vector<int>>& grid) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int spiralMatrix(int[][] grid) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var spiralMatrix = function(grid) {\n    // Write your code here\n};\n"
    }
  },
  "mat6": {
    "name": "Set Matrix Zeroes",
    "level": "Medium",
    "tags": [
      "Matrix / Grid",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Set Matrix Zeroes** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "grid = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "1",
        "explanation": "Result produced according to Set Matrix Zeroes algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[[1, 0], [0, 1]]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def setMatrixZeroes(self, grid: list[list[int]]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int setMatrixZeroes(vector<vector<int>>& grid) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int setMatrixZeroes(int[][] grid) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var setMatrixZeroes = function(grid) {\n    // Write your code here\n};\n"
    }
  },
  "mat7": {
    "name": "Diagonal Traverse",
    "level": "Medium",
    "tags": [
      "Matrix / Grid",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Diagonal Traverse** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Diagonal Traverse algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def diagonalTraverse(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int diagonalTraverse(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int diagonalTraverse(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var diagonalTraverse = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "mat8": {
    "name": "Shortest Path in Grid with Obstacles",
    "level": "Hard",
    "tags": [
      "Matrix / Grid",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Shortest Path in Grid with Obstacles** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Shortest Path in Grid with Obstacles algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def shortestPathInGridWithObstacles(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestPathInGridWithObstacles(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int shortestPathInGridWithObstacles(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var shortestPathInGridWithObstacles = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "mat9": {
    "name": "Longest Increasing Path",
    "level": "Hard",
    "tags": [
      "Matrix / Grid",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Increasing Path** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Longest Increasing Path algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def longestIncreasingPath(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestIncreasingPath(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int longestIncreasingPath(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var longestIncreasingPath = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "mat10": {
    "name": "Cherry Pickup",
    "level": "Hard",
    "tags": [
      "Matrix / Grid",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Cherry Pickup** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Cherry Pickup algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def cherryPickup(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int cherryPickup(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int cherryPickup(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var cherryPickup = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "tr1": {
    "name": "Invert Binary Tree",
    "level": "Easy",
    "tags": [
      "Trees",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Invert Binary Tree** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [4,2,7,1,3,6,9]",
        "output": "[4, 7, 2, 9, 6, 3, 1]",
        "explanation": "Result produced according to Invert Binary Tree algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "expected": "[4, 7, 2, 9, 6, 3, 1]",
        "label": "Case 1"
      },
      {
        "input": "[2, 1, 3]",
        "expected": "[2, 3, 1]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        // Write your code here\n        \n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // Write your code here\n        return null;\n    }\n}\n",
      "javascript": "var invertTree = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "tr2": {
    "name": "Max Depth of Tree",
    "level": "Easy",
    "tags": [
      "Trees",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Max Depth of Tree** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Max Depth of Tree algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxDepth = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "tr3": {
    "name": "Same Tree",
    "level": "Easy",
    "tags": [
      "Trees",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Same Tree** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "p = [1,2,3], q = [1,2,3]",
        "output": "true",
        "explanation": "Result produced according to Same Tree algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3]\n[1, 2, 3]",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "[1, 2]\n[1, null, 2]",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var isSameTree = function(p, q) {\n    // Write your code here\n};\n"
    }
  },
  "tr4": {
    "name": "Level Order Traversal",
    "level": "Medium",
    "tags": [
      "Trees",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Level Order Traversal** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "[[3],[9,20],[15,7]]",
        "explanation": "Result produced according to Level Order Traversal algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "[[3], [9, 20], [15, 7]]",
        "label": "Case 1"
      },
      {
        "input": "[1]",
        "expected": "[[1]]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var levelOrder = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "tr5": {
    "name": "Lowest Common Ancestor of Binary Tree",
    "level": "Medium",
    "tags": [
      "Trees",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Lowest Common Ancestor of Binary Tree** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Lowest Common Ancestor of Binary Tree algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lowestCommonAncestorOfBinaryTree(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lowestCommonAncestorOfBinaryTree(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lowestCommonAncestorOfBinaryTree(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lowestCommonAncestorOfBinaryTree = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "tr6": {
    "name": "Construct Preorder/Inorder",
    "level": "Medium",
    "tags": [
      "Trees",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Construct Preorder/Inorder** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Construct Preorder/Inorder algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def constructPreorderinorder(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int constructPreorderinorder(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int constructPreorderinorder(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var constructPreorderinorder = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "tr7": {
    "name": "Path Sum II",
    "level": "Medium",
    "tags": [
      "Trees",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Path Sum II** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Path Sum II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def pathSumIi(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int pathSumIi(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int pathSumIi(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var pathSumIi = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "tr8": {
    "name": "Max Path Sum",
    "level": "Hard",
    "tags": [
      "Trees",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Max Path Sum** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Max Path Sum algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxPathSum(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxPathSum(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxPathSum(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxPathSum = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "tr9": {
    "name": "Serialize/Deserialize Tree",
    "level": "Hard",
    "tags": [
      "Trees",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Serialize/Deserialize Tree** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Serialize/Deserialize Tree algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def serializedeserializeTree(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int serializedeserializeTree(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int serializedeserializeTree(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var serializedeserializeTree = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "tr10": {
    "name": "Binary Tree Camera",
    "level": "Hard",
    "tags": [
      "Trees",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Binary Tree Camera** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Binary Tree Camera algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def binaryTreeCamera(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int binaryTreeCamera(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int binaryTreeCamera(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var binaryTreeCamera = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst1": {
    "name": "Search in BST",
    "level": "Easy",
    "tags": [
      "Binary Search Tree (BST)",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Search in BST** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Search in BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def searchInBst(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int searchInBst(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int searchInBst(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var searchInBst = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst2": {
    "name": "Convert Sorted Array to BST",
    "level": "Easy",
    "tags": [
      "Binary Search Tree (BST)",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Convert Sorted Array to BST** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [5, 2, 3, 1]",
        "output": "[1, 2, 3, 5]",
        "explanation": "Result produced according to Convert Sorted Array to BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[5, 2, 3, 1]",
        "expected": "[1, 2, 3, 5]",
        "label": "Case 1"
      },
      {
        "input": "[5, 1, 1, 2, 0, 0]",
        "expected": "[0, 0, 1, 1, 2, 5]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def convertSortedArrayToBst(self, nums: list[int]) -> list[int]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> convertSortedArrayToBst(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] convertSortedArrayToBst(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var convertSortedArrayToBst = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bst3": {
    "name": "Range Sum of BST",
    "level": "Easy",
    "tags": [
      "Binary Search Tree (BST)",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Range Sum of BST** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Range Sum of BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def rangeSumOfBst(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rangeSumOfBst(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rangeSumOfBst(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var rangeSumOfBst = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst4": {
    "name": "Validate BST",
    "level": "Medium",
    "tags": [
      "Binary Search Tree (BST)",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Validate BST** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Validate BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def validateBst(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int validateBst(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int validateBst(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var validateBst = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst5": {
    "name": "Insert into BST",
    "level": "Medium",
    "tags": [
      "Binary Search Tree (BST)",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Insert into BST** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Insert into BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def insertIntoBst(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int insertIntoBst(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int insertIntoBst(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var insertIntoBst = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst6": {
    "name": "Lowest Common Ancestor BST",
    "level": "Medium",
    "tags": [
      "Binary Search Tree (BST)",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Lowest Common Ancestor BST** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Lowest Common Ancestor BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lowestCommonAncestorBst(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lowestCommonAncestorBst(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lowestCommonAncestorBst(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lowestCommonAncestorBst = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst7": {
    "name": "Delete Node in BST",
    "level": "Medium",
    "tags": [
      "Binary Search Tree (BST)",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Delete Node in BST** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Delete Node in BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def deleteNodeInBst(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int deleteNodeInBst(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int deleteNodeInBst(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var deleteNodeInBst = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst8": {
    "name": "Recover BST",
    "level": "Hard",
    "tags": [
      "Binary Search Tree (BST)",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Recover BST** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Recover BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def recoverBst(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int recoverBst(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int recoverBst(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var recoverBst = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst9": {
    "name": "BST Iterator",
    "level": "Hard",
    "tags": [
      "Binary Search Tree (BST)",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **BST Iterator** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to BST Iterator algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def bstIterator(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int bstIterator(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int bstIterator(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var bstIterator = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "bst10": {
    "name": "Preorder to BST",
    "level": "Hard",
    "tags": [
      "Binary Search Tree (BST)",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Preorder to BST** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Preorder to BST algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def preorderToBst(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int preorderToBst(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int preorderToBst(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var preorderToBst = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "tri1": {
    "name": "Prefix Match",
    "level": "Easy",
    "tags": [
      "Tries",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Prefix Match** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Prefix Match algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def prefixMatch(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string prefixMatch(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String prefixMatch(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var prefixMatch = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "tri2": {
    "name": "Replace Words",
    "level": "Easy",
    "tags": [
      "Tries",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Replace Words** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Replace Words algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def replaceWords(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string replaceWords(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String replaceWords(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var replaceWords = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "tri3": {
    "name": "Longest Word Dictionary",
    "level": "Easy",
    "tags": [
      "Tries",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Word Dictionary** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Longest Word Dictionary algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def longestWordDictionary(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestWordDictionary(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String longestWordDictionary(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var longestWordDictionary = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "tri4": {
    "name": "Implement Trie",
    "level": "Medium",
    "tags": [
      "Tries",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Implement Trie** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Implement Trie algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def implementTrie(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int implementTrie(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int implementTrie(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var implementTrie = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "tri5": {
    "name": "Add/Search Word",
    "level": "Medium",
    "tags": [
      "Tries",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Add/Search Word** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Add/Search Word algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def addsearchWord(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string addsearchWord(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String addsearchWord(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var addsearchWord = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "tri6": {
    "name": "Map Sum Pairs",
    "level": "Medium",
    "tags": [
      "Tries",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Map Sum Pairs** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Map Sum Pairs algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def mapSumPairs(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int mapSumPairs(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int mapSumPairs(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var mapSumPairs = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "tri7": {
    "name": "Extra Characters String",
    "level": "Medium",
    "tags": [
      "Tries",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Extra Characters String** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Extra Characters String algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def extraCharactersString(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string extraCharactersString(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String extraCharactersString(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var extraCharactersString = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "tri8": {
    "name": "Word Search II",
    "level": "Hard",
    "tags": [
      "Tries",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Word Search II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Word Search II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def wordSearchIi(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string wordSearchIi(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String wordSearchIi(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var wordSearchIi = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "tri9": {
    "name": "Prefix and Suffix Search",
    "level": "Hard",
    "tags": [
      "Tries",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Prefix and Suffix Search** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Prefix and Suffix Search algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def prefixAndSuffixSearch(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string prefixAndSuffixSearch(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String prefixAndSuffixSearch(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var prefixAndSuffixSearch = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "tri10": {
    "name": "Stream of Characters",
    "level": "Hard",
    "tags": [
      "Tries",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Stream of Characters** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Stream of Characters algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def streamOfCharacters(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string streamOfCharacters(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String streamOfCharacters(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var streamOfCharacters = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "hp1": {
    "name": "Kth Largest in Stream",
    "level": "Easy",
    "tags": [
      "Heap / Priority Queue",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Kth Largest in Stream** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Kth Largest in Stream algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def kthLargestInStream(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthLargestInStream(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int kthLargestInStream(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var kthLargestInStream = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "hp2": {
    "name": "Last Stone Weight",
    "level": "Easy",
    "tags": [
      "Heap / Priority Queue",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Last Stone Weight** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Last Stone Weight algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lastStoneWeight(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lastStoneWeight(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lastStoneWeight(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lastStoneWeight = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "hp3": {
    "name": "Relative Ranks",
    "level": "Easy",
    "tags": [
      "Heap / Priority Queue",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Relative Ranks** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Relative Ranks algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def relativeRanks(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int relativeRanks(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int relativeRanks(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var relativeRanks = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "hp4": {
    "name": "Kth Largest in Array",
    "level": "Medium",
    "tags": [
      "Heap / Priority Queue",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Kth Largest in Array** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Kth Largest in Array algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def kthLargestInArray(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthLargestInArray(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int kthLargestInArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var kthLargestInArray = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "hp5": {
    "name": "Top K Frequent Words",
    "level": "Medium",
    "tags": [
      "Heap / Priority Queue",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Top K Frequent Words** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1,1,1,2,2,3], k = 2",
        "output": "[1, 2]",
        "explanation": "Result produced according to Top K Frequent Words algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 1, 1, 2, 2, 3]\n2",
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
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var topKFrequent = function(nums, k) {\n    // Write your code here\n};\n"
    }
  },
  "hp6": {
    "name": "K Closest Points",
    "level": "Medium",
    "tags": [
      "Heap / Priority Queue",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **K Closest Points** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to K Closest Points algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def kClosestPoints(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kClosestPoints(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int kClosestPoints(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var kClosestPoints = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "hp7": {
    "name": "Task Scheduler",
    "level": "Medium",
    "tags": [
      "Heap / Priority Queue",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Task Scheduler** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Task Scheduler algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def taskScheduler(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int taskScheduler(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int taskScheduler(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var taskScheduler = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "hp8": {
    "name": "Find Median from Stream",
    "level": "Hard",
    "tags": [
      "Heap / Priority Queue",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Find Median from Stream** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Find Median from Stream algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def findMedianFromStream(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMedianFromStream(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int findMedianFromStream(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var findMedianFromStream = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "hp9": {
    "name": "Smallest Range K Lists",
    "level": "Hard",
    "tags": [
      "Heap / Priority Queue",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Smallest Range K Lists** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5, 4, 3, 2, 1]",
        "explanation": "Result produced according to Smallest Range K Lists algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4, 5]",
        "expected": "[5, 4, 3, 2, 1]",
        "label": "Case 1"
      },
      {
        "input": "[1, 2]",
        "expected": "[2, 1]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def smallestRangeKLists(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* smallestRangeKLists(ListNode* head) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode smallestRangeKLists(ListNode head) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var smallestRangeKLists = function(head) {\n    // Write your code here\n};\n"
    }
  },
  "hp10": {
    "name": "The Skyline Problem",
    "level": "Hard",
    "tags": [
      "Heap / Priority Queue",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **The Skyline Problem** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to The Skyline Problem algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def theSkylineProblem(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int theSkylineProblem(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int theSkylineProblem(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var theSkylineProblem = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bt1": {
    "name": "Binary Watch",
    "level": "Easy",
    "tags": [
      "Backtracking",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Binary Watch** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Binary Watch algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def binaryWatch(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int binaryWatch(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int binaryWatch(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var binaryWatch = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bt2": {
    "name": "Subset XOR Totals",
    "level": "Easy",
    "tags": [
      "Backtracking",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Subset XOR Totals** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Subset XOR Totals algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def subsetXorTotals(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int subsetXorTotals(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int subsetXorTotals(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var subsetXorTotals = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bt3": {
    "name": "Generate Binary Strings",
    "level": "Easy",
    "tags": [
      "Backtracking",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Generate Binary Strings** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Generate Binary Strings algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def generateBinaryStrings(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string generateBinaryStrings(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String generateBinaryStrings(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var generateBinaryStrings = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "bt4": {
    "name": "Subsets",
    "level": "Medium",
    "tags": [
      "Backtracking",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Subsets** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
        "explanation": "Result produced according to Subsets algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3]",
        "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]",
        "label": "Case 1"
      },
      {
        "input": "[0]",
        "expected": "[[], [0]]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var subsets = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bt5": {
    "name": "Permutations",
    "level": "Medium",
    "tags": [
      "Backtracking",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Permutations** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        "explanation": "Result produced according to Permutations algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3]",
        "expected": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        "label": "Case 1"
      },
      {
        "input": "[0, 1]",
        "expected": "[[0, 1], [1, 0]]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def permute(self, nums: list[int]) -> list[list[int]]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}\n",
      "javascript": "var permute = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bt6": {
    "name": "Combination Sum",
    "level": "Medium",
    "tags": [
      "Backtracking",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Combination Sum** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Combination Sum algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def combinationSum(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int combinationSum(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int combinationSum(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var combinationSum = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bt7": {
    "name": "Word Search",
    "level": "Medium",
    "tags": [
      "Backtracking",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Word Search** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Word Search algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def wordSearch(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string wordSearch(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String wordSearch(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var wordSearch = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "bt8": {
    "name": "N-Queens",
    "level": "Hard",
    "tags": [
      "Backtracking",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **N-Queens** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to N-Queens algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def nqueens(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int nqueens(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int nqueens(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var nqueens = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bt9": {
    "name": "Sudoku Solver",
    "level": "Hard",
    "tags": [
      "Backtracking",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Sudoku Solver** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Sudoku Solver algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def sudokuSolver(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sudokuSolver(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int sudokuSolver(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var sudokuSolver = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bt10": {
    "name": "Palindrome Partitioning",
    "level": "Hard",
    "tags": [
      "Backtracking",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Palindrome Partitioning** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Palindrome Partitioning algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def palindromePartitioning(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int palindromePartitioning(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int palindromePartitioning(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var palindromePartitioning = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd1": {
    "name": "Assign Cookies",
    "level": "Easy",
    "tags": [
      "Greedy",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Assign Cookies** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Assign Cookies algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def assignCookies(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int assignCookies(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int assignCookies(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var assignCookies = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd2": {
    "name": "Lemonade Change",
    "level": "Easy",
    "tags": [
      "Greedy",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Lemonade Change** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Lemonade Change algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lemonadeChange(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lemonadeChange(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lemonadeChange(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lemonadeChange = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd3": {
    "name": "Can Place Flowers",
    "level": "Easy",
    "tags": [
      "Greedy",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Can Place Flowers** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Can Place Flowers algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def canPlaceFlowers(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int canPlaceFlowers(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int canPlaceFlowers(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var canPlaceFlowers = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd4": {
    "name": "Jump Game",
    "level": "Medium",
    "tags": [
      "Greedy",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Jump Game** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [2,3,1,1,4]",
        "output": "true",
        "explanation": "Result produced according to Jump Game algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 3, 1, 1, 4]",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "[3, 2, 1, 0, 4]",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean canJump(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var canJump = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd5": {
    "name": "Jump Game II",
    "level": "Medium",
    "tags": [
      "Greedy",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Jump Game II** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [2,3,1,1,4]",
        "output": "true",
        "explanation": "Result produced according to Jump Game II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 3, 1, 1, 4]",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "[3, 2, 1, 0, 4]",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean canJump(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var canJump = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd6": {
    "name": "Gas Station",
    "level": "Medium",
    "tags": [
      "Greedy",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Gas Station** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Gas Station algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def gasStation(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int gasStation(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int gasStation(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var gasStation = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd7": {
    "name": "Hand of Straights",
    "level": "Medium",
    "tags": [
      "Greedy",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Hand of Straights** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Hand of Straights algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def handOfStraights(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int handOfStraights(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int handOfStraights(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var handOfStraights = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd8": {
    "name": "Candy",
    "level": "Hard",
    "tags": [
      "Greedy",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Candy** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Candy algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def candy(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int candy(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int candy(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var candy = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd9": {
    "name": "Patching Array",
    "level": "Hard",
    "tags": [
      "Greedy",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Patching Array** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Patching Array algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def patchingArray(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int patchingArray(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int patchingArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var patchingArray = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "grd10": {
    "name": "Merge Triplets",
    "level": "Hard",
    "tags": [
      "Greedy",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Merge Triplets** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Merge Triplets algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def mergeTriplets(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int mergeTriplets(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int mergeTriplets(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var mergeTriplets = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "int1": {
    "name": "Meeting Rooms",
    "level": "Easy",
    "tags": [
      "Intervals",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Meeting Rooms** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Meeting Rooms algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def meetingRooms(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int meetingRooms(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int meetingRooms(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var meetingRooms = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "int2": {
    "name": "Summary Ranges",
    "level": "Easy",
    "tags": [
      "Intervals",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Summary Ranges** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Summary Ranges algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def summaryRanges(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int summaryRanges(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int summaryRanges(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var summaryRanges = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "int3": {
    "name": "Remove Covered Intervals",
    "level": "Easy",
    "tags": [
      "Intervals",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Remove Covered Intervals** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Remove Covered Intervals algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def removeCoveredIntervals(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int removeCoveredIntervals(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int removeCoveredIntervals(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var removeCoveredIntervals = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "int4": {
    "name": "Insert Interval",
    "level": "Medium",
    "tags": [
      "Intervals",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Insert Interval** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        "output": "[[1,5],[6,9]]",
        "explanation": "Result produced according to Insert Interval algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[1, 3], [6, 9]]\n[2, 5]",
        "expected": "[[1, 5], [6, 9]]",
        "label": "Case 1"
      },
      {
        "input": "[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]]\n[4, 8]",
        "expected": "[[1, 2], [3, 10], [12, 16]]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var insert = function(intervals, newInterval) {\n    // Write your code here\n};\n"
    }
  },
  "int5": {
    "name": "Merge Intervals",
    "level": "Medium",
    "tags": [
      "Intervals",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Merge Intervals** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        "output": "[[1,6],[8,10],[15,18]]",
        "explanation": "Result produced according to Merge Intervals algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[1, 3], [2, 6], [8, 10], [15, 18]]",
        "expected": "[[1, 6], [8, 10], [15, 18]]",
        "label": "Case 1"
      },
      {
        "input": "[[1, 4], [4, 5]]",
        "expected": "[[1, 5]]",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        // Write your code here\n        return {};\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        // Write your code here\n        return new int[]{};\n    }\n}\n",
      "javascript": "var merge = function(intervals) {\n    // Write your code here\n};\n"
    }
  },
  "int6": {
    "name": "Non-overlapping Intervals",
    "level": "Medium",
    "tags": [
      "Intervals",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Non-overlapping Intervals** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Non-overlapping Intervals algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def nonoverlappingIntervals(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int nonoverlappingIntervals(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int nonoverlappingIntervals(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var nonoverlappingIntervals = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "int7": {
    "name": "Meeting Rooms II",
    "level": "Medium",
    "tags": [
      "Intervals",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Meeting Rooms II** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Meeting Rooms II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def meetingRoomsIi(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int meetingRoomsIi(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int meetingRoomsIi(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var meetingRoomsIi = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "int8": {
    "name": "Range Module",
    "level": "Hard",
    "tags": [
      "Intervals",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Range Module** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Range Module algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def rangeModule(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rangeModule(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rangeModule(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var rangeModule = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "int9": {
    "name": "Data Stream Disjoint Intervals",
    "level": "Hard",
    "tags": [
      "Intervals",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Data Stream Disjoint Intervals** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Data Stream Disjoint Intervals algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def dataStreamDisjointIntervals(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int dataStreamDisjointIntervals(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int dataStreamDisjointIntervals(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var dataStreamDisjointIntervals = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "int10": {
    "name": "Employee Free Time",
    "level": "Hard",
    "tags": [
      "Intervals",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Employee Free Time** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Employee Free Time algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def employeeFreeTime(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int employeeFreeTime(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int employeeFreeTime(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var employeeFreeTime = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "gr1": {
    "name": "Star Graph Center",
    "level": "Easy",
    "tags": [
      "Graphs",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Star Graph Center** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Star Graph Center algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def starGraphCenter(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int starGraphCenter(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int starGraphCenter(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var starGraphCenter = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "gr2": {
    "name": "Path Exists in Graph",
    "level": "Easy",
    "tags": [
      "Graphs",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Path Exists in Graph** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Path Exists in Graph algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def pathExistsInGraph(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int pathExistsInGraph(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int pathExistsInGraph(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var pathExistsInGraph = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "gr3": {
    "name": "Island Perimeter",
    "level": "Easy",
    "tags": [
      "Graphs",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Island Perimeter** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Island Perimeter algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def islandPerimeter(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int islandPerimeter(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int islandPerimeter(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var islandPerimeter = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "gr4": {
    "name": "Number of Islands",
    "level": "Medium",
    "tags": [
      "Graphs",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Number of Islands** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],...]",
        "output": "1",
        "explanation": "Result produced according to Number of Islands algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
        "expected": "3",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int numIslands(char[][] grid) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var numIslands = function(grid) {\n    // Write your code here\n};\n"
    }
  },
  "gr5": {
    "name": "Clone Graph",
    "level": "Medium",
    "tags": [
      "Graphs",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Clone Graph** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Clone Graph algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def cloneGraph(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int cloneGraph(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int cloneGraph(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var cloneGraph = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "gr6": {
    "name": "Max Area of Island",
    "level": "Medium",
    "tags": [
      "Graphs",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Max Area of Island** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Max Area of Island algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxAreaOfIsland(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxAreaOfIsland(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxAreaOfIsland(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxAreaOfIsland = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "gr7": {
    "name": "Course Schedule",
    "level": "Medium",
    "tags": [
      "Graphs",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Course Schedule** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "output": "true",
        "explanation": "Result produced according to Course Schedule algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "2\n[[1, 0]]",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "2\n[[1, 0], [0, 1]]",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var canFinish = function(numCourses, prerequisites) {\n    // Write your code here\n};\n"
    }
  },
  "gr8": {
    "name": "Word Ladder",
    "level": "Hard",
    "tags": [
      "Graphs",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Word Ladder** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Word Ladder algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def wordLadder(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string wordLadder(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String wordLadder(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var wordLadder = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "gr9": {
    "name": "Longest Cycle in a Graph",
    "level": "Hard",
    "tags": [
      "Graphs",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Cycle in a Graph** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Longest Cycle in a Graph algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def longestCycleInAGraph(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestCycleInAGraph(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int longestCycleInAGraph(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var longestCycleInAGraph = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "gr10": {
    "name": "Critical Connections",
    "level": "Hard",
    "tags": [
      "Graphs",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Critical Connections** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Critical Connections algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def criticalConnections(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int criticalConnections(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int criticalConnections(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var criticalConnections = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "adv1": {
    "name": "Prim MST Basic",
    "level": "Easy",
    "tags": [
      "Advanced Graphs",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Prim MST Basic** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Prim MST Basic algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def primMstBasic(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int primMstBasic(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int primMstBasic(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var primMstBasic = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "adv3": {
    "name": "Eventual Safe States",
    "level": "Easy",
    "tags": [
      "Advanced Graphs",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Eventual Safe States** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Eventual Safe States algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def eventualSafeStates(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int eventualSafeStates(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int eventualSafeStates(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var eventualSafeStates = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "adv4": {
    "name": "Network Delay Time",
    "level": "Medium",
    "tags": [
      "Advanced Graphs",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Network Delay Time** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Network Delay Time algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def networkDelayTime(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int networkDelayTime(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int networkDelayTime(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var networkDelayTime = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "adv5": {
    "name": "Min Cost Connect Points",
    "level": "Medium",
    "tags": [
      "Advanced Graphs",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Min Cost Connect Points** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Min Cost Connect Points algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def minCostConnectPoints(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCostConnectPoints(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int minCostConnectPoints(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var minCostConnectPoints = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "adv6": {
    "name": "Cheapest Flights K Stops",
    "level": "Medium",
    "tags": [
      "Advanced Graphs",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Cheapest Flights K Stops** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Cheapest Flights K Stops algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def cheapestFlightsKStops(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int cheapestFlightsKStops(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int cheapestFlightsKStops(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var cheapestFlightsKStops = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "adv7": {
    "name": "Reconstruct Itinerary",
    "level": "Medium",
    "tags": [
      "Advanced Graphs",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Reconstruct Itinerary** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Reconstruct Itinerary algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def reconstructItinerary(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int reconstructItinerary(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int reconstructItinerary(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var reconstructItinerary = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "adv8": {
    "name": "Alien Dictionary",
    "level": "Hard",
    "tags": [
      "Advanced Graphs",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Alien Dictionary** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Alien Dictionary algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def alienDictionary(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int alienDictionary(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int alienDictionary(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var alienDictionary = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "adv9": {
    "name": "Word Ladder II",
    "level": "Hard",
    "tags": [
      "Advanced Graphs",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Word Ladder II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Word Ladder II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def wordLadderIi(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string wordLadderIi(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String wordLadderIi(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var wordLadderIi = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "adv10": {
    "name": "Optimize Water Distribution",
    "level": "Hard",
    "tags": [
      "Advanced Graphs",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Optimize Water Distribution** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Optimize Water Distribution algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def optimizeWaterDistribution(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int optimizeWaterDistribution(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int optimizeWaterDistribution(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var optimizeWaterDistribution = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit1": {
    "name": "Single Number",
    "level": "Easy",
    "tags": [
      "Bit Manipulation",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Single Number** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [2,2,1]",
        "output": "1",
        "explanation": "Result produced according to Single Number algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 2, 1]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[4, 1, 2, 1, 2]",
        "expected": "4",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int singleNumber(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var singleNumber = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit2": {
    "name": "Number of 1 Bits",
    "level": "Easy",
    "tags": [
      "Bit Manipulation",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Number of 1 Bits** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Number of 1 Bits algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def numberOf1Bits(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numberOf1Bits(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int numberOf1Bits(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var numberOf1Bits = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit3": {
    "name": "Counting Bits",
    "level": "Easy",
    "tags": [
      "Bit Manipulation",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Counting Bits** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Counting Bits algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def countingBits(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countingBits(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int countingBits(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var countingBits = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit4": {
    "name": "Single Number II",
    "level": "Medium",
    "tags": [
      "Bit Manipulation",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Single Number II** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [2,2,1]",
        "output": "1",
        "explanation": "Result produced according to Single Number II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[2, 2, 1]",
        "expected": "1",
        "label": "Case 1"
      },
      {
        "input": "[4, 1, 2, 1, 2]",
        "expected": "4",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int singleNumber(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var singleNumber = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit5": {
    "name": "Sum of Two Integers",
    "level": "Medium",
    "tags": [
      "Bit Manipulation",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Sum of Two Integers** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Sum of Two Integers algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def sumOfTwoIntegers(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumOfTwoIntegers(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int sumOfTwoIntegers(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var sumOfTwoIntegers = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit6": {
    "name": "Reverse Bits",
    "level": "Medium",
    "tags": [
      "Bit Manipulation",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Reverse Bits** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Reverse Bits algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def reverseBits(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int reverseBits(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int reverseBits(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var reverseBits = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit7": {
    "name": "Bitwise AND Range",
    "level": "Medium",
    "tags": [
      "Bit Manipulation",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Bitwise AND Range** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Bitwise AND Range algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def bitwiseAndRange(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int bitwiseAndRange(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int bitwiseAndRange(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var bitwiseAndRange = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit8": {
    "name": "Max Product Word Lengths",
    "level": "Hard",
    "tags": [
      "Bit Manipulation",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Max Product Word Lengths** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Max Product Word Lengths algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxProductWordLengths(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string maxProductWordLengths(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String maxProductWordLengths(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var maxProductWordLengths = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "bit9": {
    "name": "Min One Bit Operations",
    "level": "Hard",
    "tags": [
      "Bit Manipulation",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Min One Bit Operations** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Min One Bit Operations algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def minOneBitOperations(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minOneBitOperations(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int minOneBitOperations(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var minOneBitOperations = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "bit10": {
    "name": "Integers Without Consecutive Ones",
    "level": "Hard",
    "tags": [
      "Bit Manipulation",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Integers Without Consecutive Ones** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Integers Without Consecutive Ones algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def integersWithoutConsecutiveOnes(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int integersWithoutConsecutiveOnes(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int integersWithoutConsecutiveOnes(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var integersWithoutConsecutiveOnes = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math1": {
    "name": "Happy Number",
    "level": "Easy",
    "tags": [
      "Math & Geometry",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Happy Number** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Happy Number algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def happyNumber(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int happyNumber(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int happyNumber(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var happyNumber = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math2": {
    "name": "Plus One",
    "level": "Easy",
    "tags": [
      "Math & Geometry",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Plus One** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Plus One algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def plusOne(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int plusOne(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int plusOne(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var plusOne = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math3": {
    "name": "Power of Three",
    "level": "Easy",
    "tags": [
      "Math & Geometry",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Power of Three** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Power of Three algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def powerOfThree(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int powerOfThree(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int powerOfThree(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var powerOfThree = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math4": {
    "name": "Valid Square",
    "level": "Medium",
    "tags": [
      "Math & Geometry",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Valid Square** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Valid Square algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def validSquare(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int validSquare(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int validSquare(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var validSquare = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math5": {
    "name": "Angle Between Hands of a Clock",
    "level": "Medium",
    "tags": [
      "Math & Geometry",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Angle Between Hands of a Clock** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Angle Between Hands of a Clock algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def angleBetweenHandsOfAClock(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int angleBetweenHandsOfAClock(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int angleBetweenHandsOfAClock(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var angleBetweenHandsOfAClock = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math6": {
    "name": "Factorial Trailing Zeroes",
    "level": "Medium",
    "tags": [
      "Math & Geometry",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Factorial Trailing Zeroes** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Factorial Trailing Zeroes algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def factorialTrailingZeroes(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int factorialTrailingZeroes(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int factorialTrailingZeroes(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var factorialTrailingZeroes = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math7": {
    "name": "Pow(x, n)",
    "level": "Medium",
    "tags": [
      "Math & Geometry",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Pow(x, n)** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Pow(x, n) algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def powxN(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int powxN(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int powxN(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var powxN = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math8": {
    "name": "Max Points on Line",
    "level": "Hard",
    "tags": [
      "Math & Geometry",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Max Points on Line** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Max Points on Line algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxPointsOnLine(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxPointsOnLine(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxPointsOnLine(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxPointsOnLine = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "math9": {
    "name": "Integer to English Words",
    "level": "Hard",
    "tags": [
      "Math & Geometry",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Integer to English Words** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Integer to English Words algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def integerToEnglishWords(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string integerToEnglishWords(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String integerToEnglishWords(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var integerToEnglishWords = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "math10": {
    "name": "Basic Calculator II",
    "level": "Hard",
    "tags": [
      "Math & Geometry",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Basic Calculator II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Basic Calculator II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def basicCalculatorIi(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int basicCalculatorIi(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int basicCalculatorIi(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var basicCalculatorIi = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_1": {
    "name": "Climbing Stairs",
    "level": "Easy",
    "tags": [
      "1-D DP",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Climbing Stairs** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "n = 2",
        "output": "2",
        "explanation": "Result produced according to Climbing Stairs algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "2",
        "expected": "2",
        "label": "Case 1"
      },
      {
        "input": "3",
        "expected": "3",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var climbStairs = function(n) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_2": {
    "name": "Min Cost Climb",
    "level": "Easy",
    "tags": [
      "1-D DP",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Min Cost Climb** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "cost = [10,15,20]",
        "output": "15",
        "explanation": "Result produced according to Min Cost Climb algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[10, 15, 20]",
        "expected": "15",
        "label": "Case 1"
      },
      {
        "input": "[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]",
        "expected": "6",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def minCostClimbingStairs(self, cost: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCostClimbingStairs(vector<int>& cost) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int minCostClimbingStairs(int[] cost) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var minCostClimbingStairs = function(cost) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_3": {
    "name": "Maximum Subarray",
    "level": "Easy",
    "tags": [
      "1-D DP",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Maximum Subarray** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6",
        "explanation": "Result produced according to Maximum Subarray algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "expected": "6",
        "label": "Case 1"
      },
      {
        "input": "[1]",
        "expected": "1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var maxSubArray = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_4": {
    "name": "House Robber",
    "level": "Medium",
    "tags": [
      "1-D DP",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **House Robber** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "4",
        "explanation": "Result produced according to House Robber algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 1]",
        "expected": "4",
        "label": "Case 1"
      },
      {
        "input": "[2, 7, 9, 3, 1]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def rob(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rob(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var rob = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_5": {
    "name": "Longest Increasing Subseq",
    "level": "Medium",
    "tags": [
      "1-D DP",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Increasing Subseq** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [10,9,2,5,3,7,101,18]",
        "output": "4",
        "explanation": "Result produced according to Longest Increasing Subseq algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[10, 9, 2, 5, 3, 7, 101, 18]",
        "expected": "4",
        "label": "Case 1"
      },
      {
        "input": "[0, 1, 0, 3, 2, 3]",
        "expected": "4",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lengthOfLIS(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lengthOfLIS = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_6": {
    "name": "Coin Change",
    "level": "Medium",
    "tags": [
      "1-D DP",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Coin Change** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "coins = [1,2,5], amount = 11",
        "output": "3",
        "explanation": "Result produced according to Coin Change algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 5]\n11",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[2]\n3",
        "expected": "-1",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var coinChange = function(coins, amount) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_7": {
    "name": "Partition Equal Subset",
    "level": "Medium",
    "tags": [
      "1-D DP",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Partition Equal Subset** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1,5,11,5]",
        "output": "true",
        "explanation": "Result produced according to Partition Equal Subset algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 5, 11, 5]",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "[1, 2, 3, 5]",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def canPartition(self, nums: list[int]) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean canPartition(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var canPartition = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_8": {
    "name": "Longest Valid Parentheses",
    "level": "Hard",
    "tags": [
      "1-D DP",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Valid Parentheses** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "Result produced according to Longest Valid Parentheses algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"()[]{}\"",
        "expected": "true",
        "label": "Case 1"
      },
      {
        "input": "\"(]\"",
        "expected": "false",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        return false;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}\n",
      "javascript": "var isValid = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_9": {
    "name": "Decode Ways II",
    "level": "Hard",
    "tags": [
      "1-D DP",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Decode Ways II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Decode Ways II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def decodeWaysIi(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int decodeWaysIi(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int decodeWaysIi(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var decodeWaysIi = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp1_10": {
    "name": "Word Break II",
    "level": "Hard",
    "tags": [
      "1-D DP",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Word Break II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Word Break II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def wordBreakIi(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string wordBreakIi(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String wordBreakIi(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var wordBreakIi = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_1": {
    "name": "Pascal Triangle",
    "level": "Easy",
    "tags": [
      "2-D DP",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Pascal Triangle** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Pascal Triangle algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def pascalTriangle(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int pascalTriangle(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int pascalTriangle(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var pascalTriangle = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_2": {
    "name": "Unique Paths Basic",
    "level": "Easy",
    "tags": [
      "2-D DP",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Unique Paths Basic** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "m = 3, n = 7",
        "output": "28",
        "explanation": "Result produced according to Unique Paths Basic algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "3\n7",
        "expected": "28",
        "label": "Case 1"
      },
      {
        "input": "3\n2",
        "expected": "3",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int uniquePaths(int m, int n) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var uniquePaths = function(m, n) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_3": {
    "name": "Pascal Triangle II",
    "level": "Easy",
    "tags": [
      "2-D DP",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Pascal Triangle II** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Pascal Triangle II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def pascalTriangleIi(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int pascalTriangleIi(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int pascalTriangleIi(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var pascalTriangleIi = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_4": {
    "name": "Unique Paths II",
    "level": "Medium",
    "tags": [
      "2-D DP",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Unique Paths II** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "m = 3, n = 7",
        "output": "28",
        "explanation": "Result produced according to Unique Paths II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "3\n7",
        "expected": "28",
        "label": "Case 1"
      },
      {
        "input": "3\n2",
        "expected": "3",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int uniquePaths(int m, int n) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var uniquePaths = function(m, n) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_5": {
    "name": "Longest Common Subseq",
    "level": "Medium",
    "tags": [
      "2-D DP",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Longest Common Subseq** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Longest Common Subseq algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def longestCommonSubseq(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestCommonSubseq(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int longestCommonSubseq(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var longestCommonSubseq = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_6": {
    "name": "Target Sum",
    "level": "Medium",
    "tags": [
      "2-D DP",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Target Sum** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Target Sum algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def targetSum(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int targetSum(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int targetSum(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var targetSum = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_7": {
    "name": "Edit Distance",
    "level": "Medium",
    "tags": [
      "2-D DP",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Edit Distance** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "word1 = \"horse\", word2 = \"ros\"",
        "output": "3",
        "explanation": "Result produced according to Edit Distance algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"horse\"\n\"ros\"",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "\"intention\"\n\"execution\"",
        "expected": "5",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int minDistance(String word1, String word2) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var minDistance = function(word1, word2) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_8": {
    "name": "Distinct Subsequences",
    "level": "Hard",
    "tags": [
      "2-D DP",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Distinct Subsequences** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "s = \"abcdef\"",
        "output": "\"fedcba\"",
        "explanation": "Result produced according to Distinct Subsequences algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "\"abcdef\"",
        "expected": "\"fedcba\"",
        "label": "Case 1"
      },
      {
        "input": "\"xyz\"",
        "expected": "\"zyx\"",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def distinctSubsequences(self, s: str) -> str:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string distinctSubsequences(string s) {\n        // Write your code here\n        return \"\";\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public String distinctSubsequences(String s) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
      "javascript": "var distinctSubsequences = function(s) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_9": {
    "name": "Burst Balloons",
    "level": "Hard",
    "tags": [
      "2-D DP",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Burst Balloons** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Burst Balloons algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def burstBalloons(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int burstBalloons(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int burstBalloons(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var burstBalloons = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dp2_10": {
    "name": "Regex Matching",
    "level": "Hard",
    "tags": [
      "2-D DP",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Regex Matching** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Regex Matching algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def regexMatching(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int regexMatching(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int regexMatching(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var regexMatching = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg1": {
    "name": "Design Parking System",
    "level": "Easy",
    "tags": [
      "Design",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Design Parking System** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Design Parking System algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def designParkingSystem(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int designParkingSystem(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int designParkingSystem(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var designParkingSystem = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg2": {
    "name": "Design HashSet",
    "level": "Easy",
    "tags": [
      "Design",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Design HashSet** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Design HashSet algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def designHashset(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int designHashset(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int designHashset(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var designHashset = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg3": {
    "name": "Design HashMap",
    "level": "Easy",
    "tags": [
      "Design",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Design HashMap** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Design HashMap algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def designHashmap(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int designHashmap(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int designHashmap(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var designHashmap = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg4": {
    "name": "LRU Cache",
    "level": "Medium",
    "tags": [
      "Design",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **LRU Cache** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to LRU Cache algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lruCache(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lruCache(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lruCache(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lruCache = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg5": {
    "name": "Design Twitter",
    "level": "Medium",
    "tags": [
      "Design",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Design Twitter** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Design Twitter algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def designTwitter(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int designTwitter(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int designTwitter(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var designTwitter = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg6": {
    "name": "Insert Delete GetRandom O(1)",
    "level": "Medium",
    "tags": [
      "Design",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Insert Delete GetRandom O(1)** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Insert Delete GetRandom O(1) algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def insertDeleteGetrandomO1(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int insertDeleteGetrandomO1(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int insertDeleteGetrandomO1(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var insertDeleteGetrandomO1 = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg7": {
    "name": "Design Browser History",
    "level": "Medium",
    "tags": [
      "Design",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Design Browser History** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Design Browser History algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def designBrowserHistory(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int designBrowserHistory(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int designBrowserHistory(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var designBrowserHistory = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg8": {
    "name": "LFU Cache",
    "level": "Hard",
    "tags": [
      "Design",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **LFU Cache** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to LFU Cache algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def lfuCache(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lfuCache(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lfuCache(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var lfuCache = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg9": {
    "name": "Design Autocomplete System",
    "level": "Hard",
    "tags": [
      "Design",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Design Autocomplete System** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Design Autocomplete System algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def designAutocompleteSystem(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int designAutocompleteSystem(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int designAutocompleteSystem(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var designAutocompleteSystem = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "dsg10": {
    "name": "Design Snake Game",
    "level": "Hard",
    "tags": [
      "Design",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Design Snake Game** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Design Snake Game algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def designSnakeGame(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int designSnakeGame(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int designSnakeGame(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var designSnakeGame = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ads1": {
    "name": "Range Sum Query",
    "level": "Easy",
    "tags": [
      "Advanced Data Structures",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Range Sum Query** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Range Sum Query algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def rangeSumQuery(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rangeSumQuery(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rangeSumQuery(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var rangeSumQuery = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ads2": {
    "name": "Dynamic Range Sum",
    "level": "Easy",
    "tags": [
      "Advanced Data Structures",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Dynamic Range Sum** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Dynamic Range Sum algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def dynamicRangeSum(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int dynamicRangeSum(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int dynamicRangeSum(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var dynamicRangeSum = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ads3": {
    "name": "Union Find Basic",
    "level": "Easy",
    "tags": [
      "Advanced Data Structures",
      "Easy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Union Find Basic** algorithmic challenge (Easy tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Union Find Basic algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Easy tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def unionFindBasic(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int unionFindBasic(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int unionFindBasic(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var unionFindBasic = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ads4": {
    "name": "Mutable Segment Tree",
    "level": "Medium",
    "tags": [
      "Advanced Data Structures",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Mutable Segment Tree** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Mutable Segment Tree algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def mutableSegmentTree(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int mutableSegmentTree(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int mutableSegmentTree(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var mutableSegmentTree = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "ads5": {
    "name": "Range Minimum Query",
    "level": "Medium",
    "tags": [
      "Advanced Data Structures",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Range Minimum Query** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Range Minimum Query algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def rangeMinimumQuery(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rangeMinimumQuery(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rangeMinimumQuery(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var rangeMinimumQuery = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ads6": {
    "name": "Fenwick Tree Basic",
    "level": "Medium",
    "tags": [
      "Advanced Data Structures",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Fenwick Tree Basic** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Result produced according to Fenwick Tree Basic algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expected": "3",
        "label": "Case 1"
      },
      {
        "input": "[1, null, 2]",
        "expected": "2",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def fenwickTreeBasic(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int fenwickTreeBasic(TreeNode* root) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int fenwickTreeBasic(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var fenwickTreeBasic = function(root) {\n    // Write your code here\n};\n"
    }
  },
  "ads7": {
    "name": "Redundant Connection",
    "level": "Medium",
    "tags": [
      "Advanced Data Structures",
      "Medium"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Redundant Connection** algorithmic challenge (Medium tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Redundant Connection algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Medium tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def redundantConnection(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int redundantConnection(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int redundantConnection(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var redundantConnection = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ads8": {
    "name": "Rectangle Area II",
    "level": "Hard",
    "tags": [
      "Advanced Data Structures",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Rectangle Area II** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Rectangle Area II algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def rectangleAreaIi(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rectangleAreaIi(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rectangleAreaIi(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var rectangleAreaIi = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ads9": {
    "name": "Smaller Numbers After Self",
    "level": "Hard",
    "tags": [
      "Advanced Data Structures",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Smaller Numbers After Self** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Smaller Numbers After Self algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def smallerNumbersAfterSelf(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int smallerNumbersAfterSelf(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int smallerNumbersAfterSelf(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var smallerNumbersAfterSelf = function(nums) {\n    // Write your code here\n};\n"
    }
  },
  "ads10": {
    "name": "Range Sum Query 2D Mutable",
    "level": "Hard",
    "tags": [
      "Advanced Data Structures",
      "Hard"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "description": "Solve the **Range Sum Query 2D Mutable** algorithmic challenge (Hard tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "10",
        "explanation": "Result produced according to Range Sum Query 2D Mutable algorithmic rules."
      }
    ],
    "constraints": [
      "Optimal time complexity target for Hard tier.",
      "Input bounds conform to standard LeetCode specifications."
    ],
    "testcases": [
      {
        "input": "[1, 2, 3, 4]",
        "expected": "10",
        "label": "Case 1"
      },
      {
        "input": "[2, 4, 6]",
        "expected": "12",
        "label": "Case 2"
      }
    ],
    "templates": {
      "python": "class Solution:\n    def rangeSumQuery2dMutable(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rangeSumQuery2dMutable(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rangeSumQuery2dMutable(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n",
      "javascript": "var rangeSumQuery2dMutable = function(nums) {\n    // Write your code here\n};\n"
    }
  }
};

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
      title: prob.name || item.name,
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

  // Fallback if not found in catalog
  const cleanName = prob.name || 'Problem';
  const methodName = cleanName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  return {
    id: prob.id,
    title: cleanName,
    difficulty: prob.level || 'Medium',
    tags: [patternName],
    companies: ['Amazon', 'Google', 'Meta'],
    description: `Solve the **${cleanName}** algorithmic challenge (${prob.level || 'Medium'} tier).\n\nImplement an optimal solution addressing standard test cases, edge cases, and performance constraints.`,
    examples: [
      { input: 'nums = [1, 2, 3]', output: '6', explanation: 'Standard input processed according to algorithm.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5'
    ],
    testcases: [
      { input: '[1, 2, 3]', expected: '6', label: 'Case 1' }
    ],
    templates: {
      python: `class Solution:\n    def ${methodName}(self, nums: list[int]) -> int:\n        # Write your code here\n        pass\n`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int ${methodName}(vector<int>& nums) {\n        // Write your code here\n        return 0;\n    }\n};\n`,
      java: `import java.util.*;\n\nclass Solution {\n    public int ${methodName}(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n`,
      javascript: `var ${methodName} = function(nums) {\n    // Write your code here\n};\n`
    }
  };
}
