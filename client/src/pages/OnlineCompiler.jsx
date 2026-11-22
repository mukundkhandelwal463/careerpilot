import React, { useState } from 'react';
import Navbar from '../Components/navbar.jsx';
import LeetCodeWorkspace from '../Components/LeetCodeWorkspace.jsx';
import { DSA_PROBLEM_CATALOG } from '../data/dsaProblemCatalog.js';

const allCatalogProblems = Object.values(DSA_PROBLEM_CATALOG).map(p => ({
  ...p,
  patternName: p.tags?.[0] || 'DSA Sheet'
}));

export const DEFAULT_PROBLEMS = [
  {
    id: 'p1',
    number: 1,
    difficulty: 'Easy',
    title: '1. Two Sum',
    tags: ['Array', 'Hash Table', 'Two Pointers'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0, 1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
      'Follow-up: Can you come up with an algorithm that is less than O(n^2) time complexity?'
    ],
    testcases: [
      { input: '[2,7,11,15]\n9', expected: '[0, 1]', label: 'Case 1' },
      { input: '[3,2,4]\n6', expected: '[1, 2]', label: 'Case 2' },
      { input: '[3,3]\n6', expected: '[0, 1]', label: 'Case 3' }
    ],
    templates: {
      python: `import sys, json

def twoSum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

if __name__ == '__main__':
    lines = [line.strip() for line in sys.stdin.read().split('\\n') if line.strip()]
    if len(lines) >= 2:
        nums = json.loads(lines[0])
        target = int(lines[1])
        print(json.dumps(twoSum(nums, target)))
    else:
        print(twoSum([2, 7, 11, 15], 9))
`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (seen.count(comp)) return {seen[comp], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> ans = sol.twoSum(nums, target);
    cout << "[" << ans[0] << ", " << ans[1] << "]" << endl;
    return 0;
}
`,
      java: `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] res = twoSum(nums, target);
        System.out.println("[" + res[0] + ", " + res[1] + "]");
    }
}
`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
    return [];
}

// Sample execution
console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int retSize;
    int* res = twoSum(nums, 4, 9, &retSize);
    if (res) {
        printf("[%d, %d]\\n", res[0], res[1]);
        free(res);
    }
    return 0;
}
`
    }
  },
  {
    id: 'p2',
    number: 2,
    difficulty: 'Medium',
    title: '2. Add Two Numbers',
    tags: ['Linked List', 'Math', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google'],
    has_diagram: true,
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7, 0, 8]',
        explanation: '342 + 465 = 807. Result digits stored in reverse order are 7 -> 0 -> 8.'
      },
      {
        input: 'l1 = [0], l2 = [0]',
        output: '[0]',
        explanation: '0 + 0 = 0.'
      },
      {
        input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]',
        output: '[8, 9, 9, 9, 0, 0, 0, 1]',
        explanation: '9999999 + 9999 = 10009998.'
      }
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.'
    ],
    testcases: [
      { input: '[2,4,3]\n[5,6,4]', expected: '[7, 0, 8]', label: 'Case 1' },
      { input: '[0]\n[0]', expected: '[0]', label: 'Case 2' },
      { input: '[9,9,9,9,9,9,9]\n[9,9,9,9]', expected: '[8, 9, 9, 9, 0, 0, 0, 1]', label: 'Case 3' }
    ],
    templates: {
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)
        curr = dummy
        carry = 0
        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            total = val1 + val2 + carry
            carry = total // 10
            curr.next = ListNode(total % 10)
            curr = curr.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return dummy.next

if __name__ == '__main__':
    # Test case [2,4,3] + [5,6,4]
    l1 = ListNode(2, ListNode(4, ListNode(3)))
    l2 = ListNode(5, ListNode(6, ListNode(4)))
    sol = Solution()
    res = sol.addTwoNumbers(l1, l2)
    out = []
    while res:
        out.append(res.val)
        res = res.next
    print(out)
`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* curr = &dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int sum = carry;
            if (l1) { sum += l1->val; l1 = l1->next; }
            if (l2) { sum += l2->val; l2 = l2->next; }
            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            curr = curr->next;
        }
        return dummy.next;
    }
};

int main() {
    ListNode* l1 = new ListNode(2);
    l1->next = new ListNode(4);
    l1->next->next = new ListNode(3);
    ListNode* l2 = new ListNode(5);
    l2->next = new ListNode(6);
    l2->next->next = new ListNode(4);

    Solution sol;
    ListNode* res = sol.addTwoNumbers(l1, l2);
    cout << "[";
    while (res) {
        cout << res->val << (res->next ? ", " : "");
        res = res->next;
    }
    cout << "]" << endl;
    return 0;
}
`,
      java: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Main {
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) { sum += l1.val; l1 = l1.next; }
            if (l2 != null) { sum += l2.val; l2 = l2.next; }
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
        }
        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode l1 = new ListNode(2);
        l1.next = new ListNode(4);
        l1.next.next = new ListNode(3);
        ListNode l2 = new ListNode(5);
        l2.next = new ListNode(6);
        l2.next.next = new ListNode(4);
        ListNode res = addTwoNumbers(l1, l2);
        List<Integer> list = new ArrayList<>();
        while (res != null) {
            list.add(res.val);
            res = res.next;
        }
        System.out.println(list);
    }
}
`,
      javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;
    while (l1 !== null || l2 !== null || carry !== 0) {
        let sum = carry;
        if (l1) { sum += l1.val; l1 = l1.next; }
        if (l2) { sum += l2.val; l2 = l2.next; }
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
    }
    return dummy.next;
}

// Sample run [2,4,3] + [5,6,4] -> [7,0,8]
let l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
let l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
let res = addTwoNumbers(l1, l2);
let out = [];
while (res) {
    out.push(res.val);
    res = res.next;
}
console.log(JSON.stringify(out));
`,
      c: `#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* createNode(int val) {
    struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
    node->val = val;
    node->next = NULL;
    return node;
}

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode dummy;
    dummy.next = NULL;
    struct ListNode* curr = &dummy;
    int carry = 0;
    while (l1 != NULL || l2 != NULL || carry != 0) {
        int sum = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry = sum / 10;
        curr->next = createNode(sum % 10);
        curr = curr->next;
    }
    return dummy.next;
}

int main() {
    struct ListNode* l1 = createNode(2);
    l1->next = createNode(4);
    l1->next->next = createNode(3);
    struct ListNode* l2 = createNode(5);
    l2->next = createNode(6);
    l2->next->next = createNode(4);
    struct ListNode* res = addTwoNumbers(l1, l2);
    printf("[");
    while (res) {
        printf("%d%s", res->val, res->next ? ", " : "");
        res = res->next;
    }
    printf("]\\n");
    return 0;
}
`
    }
  },
  {
    id: 'p3',
    number: 146,
    difficulty: 'Hard',
    title: '146. LRU Cache',
    tags: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
    companies: ['Amazon', 'Bloomberg', 'Google', 'Meta', 'Uber'],
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) Cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); lRUCache.put(2, 2); lRUCache.get(1); // returns 1'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    testcases: [
      { input: '2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2', expected: '1\n-1', label: 'Case 1' }
    ],
    templates: {
      python: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

if __name__ == '__main__':
    lru = LRUCache(2)
    lru.put(1, 1)
    lru.put(2, 2)
    print("get(1):", lru.get(1))
    lru.put(3, 3)
    print("get(2):", lru.get(2))
`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> l;
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        if (m.find(key) == m.end()) return -1;
        l.splice(l.begin(), l, m[key]);
        return m[key]->second;
    }
    
    void put(int key, int value) {
        if (m.find(key) != m.end()) {
            l.splice(l.begin(), l, m[key]);
            m[key]->second = value;
            return;
        }
        if (l.size() == cap) {
            int d_key = l.back().first;
            l.pop_back();
            m.erase(d_key);
        }
        l.push_front({key, value});
        m[key] = l.begin();
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << "get(1): " << cache.get(1) << endl;
    cache.put(3, 3);
    cout << "get(2): " << cache.get(2) << endl;
    return 0;
}
`,
      java: `import java.util.*;

public class Main {
    static class LRUCache extends LinkedHashMap<Integer, Integer> {
        private int capacity;
        public LRUCache(int capacity) {
            super(capacity, 0.75f, true);
            this.capacity = capacity;
        }
        public int get(int key) {
            return super.getOrDefault(key, -1);
        }
        public void put(int key, int value) {
            super.put(key, value);
        }
        @Override
        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    }

    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        System.out.println("get(1): " + cache.get(1));
        cache.put(3, 3);
        System.out.println("get(2): " + cache.get(2));
    }
}
`,
      javascript: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log("get(1):", cache.get(1));
cache.put(3, 3);
console.log("get(2):", cache.get(2));
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("LRU Cache initialized with capacity 2.\\n");
    printf("put(1, 1), put(2, 2)\\n");
    printf("get(1) -> 1\\n");
    printf("put(3, 3) (evicts 2)\\n");
    printf("get(2) -> -1\\n");
    return 0;
}
`
    }
  }
];

export default function OnlineCompiler() {
  const [selectedProbIdx, setSelectedProbIdx] = useState(0);
  const [customProblem, setCustomProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [codes, setCodes] = useState({});
  const [evalResult, setEvalResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const currentProb = customProblem || DEFAULT_PROBLEMS[selectedProbIdx];
  const currentCode = codes[`${currentProb.id}_${selectedLanguage}`] !== undefined
    ? codes[`${currentProb.id}_${selectedLanguage}`]
    : (currentProb.templates?.[selectedLanguage] || '');

  const handleCodeChange = (newCode) => {
    setCodes(prev => ({ ...prev, [`${currentProb.id}_${selectedLanguage}`]: newCode }));
  };

  const handleLanguageChange = (newLang) => {
    setSelectedLanguage(newLang);
    if (!codes[`${currentProb.id}_${newLang}`] && currentProb.templates?.[newLang]) {
      setCodes(prev => ({ ...prev, [`${currentProb.id}_${newLang}`]: currentProb.templates[newLang] }));
    }
  };

  const handleRun = async (stdin, expectedOutput, testcases) => {
    setIsEvaluating(true);
    setEvalResult(null);

    try {
      const res = await fetch('/api/compiler/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          code: currentCode,
          stdin,
          expected_output: expectedOutput,
          testcases
        })
      });
      const data = await res.json();
      if (data.success && data.result) {
        setEvalResult(data.result);
      } else {
        setEvalResult({
          status: 'Execution Error',
          passed: false,
          output: data.error || 'Execution failed.'
        });
      }
    } catch (err) {
      setEvalResult({
        status: 'Network Error',
        passed: false,
        output: 'Failed to communicate with the compiler backend.'
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSubmit = () => {
    handleRun('', null, currentProb.testcases);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0c', color: '#f4f4f5' }}>
      <Navbar />

      <div style={{ maxWidth: '1720px', margin: '0 auto', padding: '16px 24px' }}>
        {/* Workspace Subheader */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            padding: '12px 20px',
            background: '#141416',
            borderRadius: '12px',
            border: '1px solid #27272a'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f4f4f5', letterSpacing: '-0.02em' }}>
              ⚡ Multi-Language Online Compiler
            </span>
            <span style={{ color: '#71717a' }}>|</span>
            <span style={{ color: '#10b981', fontSize: '0.84rem', fontWeight: 600 }}>
              Judge0 Cloud Engine (Python, C++, Java, JS, C)
            </span>
          </div>

          {/* Problem Selector Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {DEFAULT_PROBLEMS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProbIdx(idx);
                  setEvalResult(null);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: selectedProbIdx === idx ? '#10b981' : '#27272a',
                  background: selectedProbIdx === idx ? 'rgba(16, 185, 129, 0.15)' : '#18181b',
                  color: selectedProbIdx === idx ? '#10b981' : '#a1a1aa',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* LeetCode Workspace */}
        <LeetCodeWorkspace
          question={currentProb}
          language={selectedLanguage}
          code={currentCode}
          onCodeChange={handleCodeChange}
          onLanguageChange={handleLanguageChange}
          onRun={handleRun}
          onSubmit={handleSubmit}
          isEvaluating={isEvaluating}
          evalResult={evalResult}
          onPrevQuestion={() => {
            setCustomProblem(null);
            setSelectedProbIdx(Math.max(0, selectedProbIdx - 1));
          }}
          onNextQuestion={() => {
            setCustomProblem(null);
            setSelectedProbIdx(Math.min(DEFAULT_PROBLEMS.length - 1, selectedProbIdx + 1));
          }}
          hasPrev={selectedProbIdx > 0}
          hasNext={selectedProbIdx < DEFAULT_PROBLEMS.length - 1}
          sectionTitle={customProblem ? (customProblem.patternName || customProblem.name) : "Problem Solving IDE"}
          problemList={allCatalogProblems}
          onSelectProblem={(prob) => {
            setCustomProblem({
              ...prob,
              title: prob.name,
              difficulty: prob.level
            });
            setEvalResult(null);
          }}
        />
      </div>
    </div>
  );
}
