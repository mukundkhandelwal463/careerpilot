import os
import re

path = r"c:\Users\Mukund\PycharmProjects\Resume_Screener\client\src\pages\Preparation.jsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Locate and replace dsaSheetData boundaries
start_idx = content.find("const dsaSheetData = [")
end_idx = content.find("];", start_idx) + 2

if start_idx == -1 or end_idx == -1:
    print("Error: dsaSheetData boundaries not found")
    exit(1)

new_dsa_data = """const dsaSheetData = [
  {
    patternName: "Arrays & Hashing",
    problems: [
      { id: "arr1", name: "Two Sum", level: "Easy", leetcode: "https://leetcode.com/problems/two-sum/", gfg: "https://www.geeksforgeeks.org/problems/two-sum-closest-to-zero1725/1" },
      { id: "arr2", name: "Contains Duplicate", level: "Easy", leetcode: "https://leetcode.com/problems/contains-duplicate/", gfg: "https://www.geeksforgeeks.org/problems/duplicate-elements-in-array/1" },
      { id: "arr3", name: "Valid Anagram", level: "Easy", leetcode: "https://leetcode.com/problems/valid-anagram/", gfg: "https://www.geeksforgeeks.org/problems/check-if-two-strings-are-k-anagrams-or-not/1" },
      { id: "arr4", name: "Group Anagrams", level: "Medium", leetcode: "https://leetcode.com/problems/group-anagrams/", gfg: "https://www.geeksforgeeks.org/problems/print-anagrams-together/1" },
      { id: "arr5", name: "Top K Frequent Elements", level: "Medium", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/", gfg: "https://www.geeksforgeeks.org/problems/top-k-frequent-elements-in-array--150821/1" },
      { id: "arr6", name: "Product of Array Except Self", level: "Medium", leetcode: "https://leetcode.com/problems/product-of-array-except-self/", gfg: "https://www.geeksforgeeks.org/problems/a-difference-of-values-and-indexes0302/1" },
      { id: "arr7", name: "Longest Consecutive Sequence", level: "Medium", leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/", gfg: "https://www.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/1" },
      { id: "arr8", name: "First Missing Positive", level: "Hard", leetcode: "https://leetcode.com/problems/first-missing-positive/", gfg: "https://www.geeksforgeeks.org/problems/first-missing-positive-1587115620/1" },
      { id: "arr9", name: "Max Chunks To Make Sorted II", level: "Hard", leetcode: "https://leetcode.com/problems/max-chunks-to-make-sorted-ii/", gfg: "https://www.geeksforgeeks.org/problems/max-chunks-to-make-sorted-ii/1" },
      { id: "arr10", name: "Subarrays with K Different Integers", level: "Hard", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/", gfg: "https://www.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1" }
    ]
  },
  {
    patternName: "Two Pointers",
    problems: [
      { id: "two1", name: "Valid Palindrome", level: "Easy", leetcode: "https://leetcode.com/problems/valid-palindrome/", gfg: "https://www.geeksforgeeks.org/problems/string-palindromic-or-not1624/1" },
      { id: "two2", name: "Move Zeroes", level: "Easy", leetcode: "https://leetcode.com/problems/move-zeroes/", gfg: "https://www.geeksforgeeks.org/problems/move-all-zeroes-to-end-of-array0751/1" },
      { id: "two3", name: "Merge Sorted Array", level: "Easy", leetcode: "https://leetcode.com/problems/merge-sorted-array/", gfg: "https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1" },
      { id: "two4", name: "3Sum", level: "Medium", leetcode: "https://leetcode.com/problems/3sum/", gfg: "https://www.geeksforgeeks.org/problems/3-sum-closest/1" },
      { id: "two5", name: "Container With Most Water", level: "Medium", leetcode: "https://leetcode.com/problems/container-with-most-water/", gfg: "https://www.geeksforgeeks.org/problems/container-with-most-water5612/1" },
      { id: "two6", name: "Two Sum II - Sorted", level: "Medium", leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", gfg: "https://www.geeksforgeeks.org/problems/two-sum-closest-to-zero1725/1" },
      { id: "two7", name: "Remove Duplicates II", level: "Medium", leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/", gfg: "https://www.geeksforgeeks.org/problems/remove-duplicate-elements-from-sorted-array/1" },
      { id: "two8", name: "Trapping Rain Water", level: "Hard", leetcode: "https://leetcode.com/problems/trapping-rain-water/", gfg: "https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1" },
      { id: "two9", name: "Shortest Subarray Sum K", level: "Hard", leetcode: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", gfg: "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1" },
      { id: "two10", name: "Valid Palindrome II", level: "Hard", leetcode: "https://leetcode.com/problems/valid-palindrome-ii/", gfg: "https://www.geeksforgeeks.org/problems/palindrome-string0817/1" }
    ]
  },
  {
    patternName: "Sliding Window",
    problems: [
      { id: "sw1", name: "Buy & Sell Stock", level: "Easy", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", gfg: "https://www.geeksforgeeks.org/problems/best-time-to-buy-and-sell-stock-1619460144/1" },
      { id: "sw2", name: "Min Diff High/Low of K", level: "Easy", leetcode: "https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/", gfg: "https://www.geeksforgeeks.org/problems/minimum-difference-between-highest-and-lowest-of-k-scores/1" },
      { id: "sw3", name: "Defuse the Bomb", level: "Easy", leetcode: "https://leetcode.com/problems/defuse-the-bomb/", gfg: "https://www.geeksforgeeks.org/problems/defuse-the-bomb/1" },
      { id: "sw4", name: "Longest Substring No Repeat", level: "Medium", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", gfg: "https://www.geeksforgeeks.org/problems/longest-distinct-characters-in-string5848/1" },
      { id: "sw5", name: "Longest Repeat Char Replace", level: "Medium", leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement/", gfg: "https://www.geeksforgeeks.org/problems/longest-repeating-character-replacement/1" },
      { id: "sw6", name: "Permutation in String", level: "Medium", leetcode: "https://leetcode.com/problems/permutation-in-string/", gfg: "https://www.geeksforgeeks.org/problems/permutation-in-string/1" },
      { id: "sw7", name: "Min Size Subarray Sum", level: "Medium", leetcode: "https://leetcode.com/problems/minimum-size-subarray-sum/", gfg: "https://www.geeksforgeeks.org/problems/minimum-size-subarray-sum/1" },
      { id: "sw8", name: "Min Window Substring", level: "Hard", leetcode: "https://leetcode.com/problems/minimum-window-substring/", gfg: "https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1" },
      { id: "sw9", name: "Sliding Window Max", level: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-maximum/", gfg: "https://www.geeksforgeeks.org/problems/deques-and-maximum-size-subarrays/1" },
      { id: "sw10", name: "K Different Integers", level: "Hard", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/", gfg: "https://www.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1" }
    ]
  },
  {
    patternName: "Stack",
    problems: [
      { id: "stk1", name: "Valid Parentheses", level: "Easy", leetcode: "https://leetcode.com/problems/valid-parentheses/", gfg: "https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1" },
      { id: "stk2", name: "Implement Queue using Stacks", level: "Easy", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/", gfg: "https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1" },
      { id: "stk3", name: "Min Stack", level: "Easy", leetcode: "https://leetcode.com/problems/min-stack/", gfg: "https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1" },
      { id: "stk4", name: "Evaluate Reverse Polish", level: "Medium", leetcode: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", gfg: "https://www.geeksforgeeks.org/problems/evaluate-postfix-expression1413/1" },
      { id: "stk5", name: "Generate Parentheses", level: "Medium", leetcode: "https://leetcode.com/problems/generate-parentheses/", gfg: "https://www.geeksforgeeks.org/problems/generate-all-parentheses/1" },
      { id: "stk6", name: "Daily Temperatures", level: "Medium", leetcode: "https://leetcode.com/problems/daily-temperatures/", gfg: "https://www.geeksforgeeks.org/problems/daily-temperatures/1" },
      { id: "stk7", name: "Car Fleet", level: "Medium", leetcode: "https://leetcode.com/problems/car-fleet/", gfg: "https://www.geeksforgeeks.org/problems/car-fleet/1" },
      { id: "stk8", name: "Largest Rect in Histogram", level: "Hard", leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/", gfg: "https://www.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1" },
      { id: "stk9", name: "Maximal Rectangle", level: "Hard", leetcode: "https://leetcode.com/problems/maximal-rectangle/", gfg: "https://www.geeksforgeeks.org/problems/max-rectangular-area-in-binary-matrix/1" },
      { id: "stk10", name: "Basic Calculator", level: "Hard", leetcode: "https://leetcode.com/problems/basic-calculator/", gfg: "https://www.geeksforgeeks.org/problems/basic-calculator/1" }
    ]
  },
  {
    patternName: "Binary Search",
    problems: [
      { id: "bs1", name: "Binary Search", level: "Easy", leetcode: "https://leetcode.com/problems/binary-search/", gfg: "https://www.geeksforgeeks.org/problems/binary-search-1587115620/1" },
      { id: "bs2", name: "Search Insert Position", level: "Easy", leetcode: "https://leetcode.com/problems/search-insert-position/", gfg: "https://www.geeksforgeeks.org/problems/search-insert-position-of-k-in-a-sorted-array/1" },
      { id: "bs3", name: "First Bad Version", level: "Easy", leetcode: "https://leetcode.com/problems/first-bad-version/", gfg: "https://www.geeksforgeeks.org/problems/first-bad-version/1" },
      { id: "bs4", name: "Search 2D Matrix", level: "Medium", leetcode: "https://leetcode.com/problems/search-a-2d-matrix/", gfg: "https://www.geeksforgeeks.org/problems/search-in-a-matrix-1587115621/1" },
      { id: "bs5", name: "Find Min in Rotated Array", level: "Medium", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", gfg: "https://www.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3611/1" },
      { id: "bs6", name: "Search in Rotated Array", level: "Medium", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/", gfg: "https://www.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1" },
      { id: "bs7", name: "Time Based Key-Value Store", level: "Medium", leetcode: "https://leetcode.com/problems/time-based-key-value-store/", gfg: "https://www.geeksforgeeks.org/problems/time-based-key-value-store/1" },
      { id: "bs8", name: "Median of Two Sorted Arrays", level: "Hard", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/", gfg: "https://www.geeksforgeeks.org/problems/median-of-two-sorted-arrays1618/1" },
      { id: "bs9", name: "Split Array Largest Sum", level: "Hard", leetcode: "https://leetcode.com/problems/split-array-largest-sum/", gfg: "https://www.geeksforgeeks.org/problems/split-array-largest-sum--141634/1" },
      { id: "bs10", name: "Find Min in Rotated Array II", level: "Hard", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/", gfg: "https://www.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3611/1" }
    ]
  },
  {
    patternName: "Linked List",
    problems: [
      { id: "ll1", name: "Reverse Linked List", level: "Easy", leetcode: "https://leetcode.com/problems/reverse-linked-list/", gfg: "https://www.geeksforgeeks.org/problems/reverse-a-linked-list/1" },
      { id: "ll2", name: "Merge Two Sorted Lists", level: "Easy", leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/", gfg: "https://www.geeksforgeeks.org/problems/merge-two-sorted-linked-lists/1" },
      { id: "ll3", name: "Linked List Cycle", level: "Easy", leetcode: "https://leetcode.com/problems/linked-list-cycle/", gfg: "https://www.geeksforgeeks.org/problems/detect-loop-in-linked-list/1" },
      { id: "ll4", name: "Reorder List", level: "Medium", leetcode: "https://leetcode.com/problems/reorder-list/", gfg: "https://www.geeksforgeeks.org/problems/reorder-list/1" },
      { id: "ll5", name: "Remove Nth Node From End", level: "Medium", leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", gfg: "https://www.geeksforgeeks.org/problems/remove-nth-node-from-end-of-list/1" },
      { id: "ll6", name: "Copy List with Random Pointer", level: "Medium", leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/", gfg: "https://www.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1" },
      { id: "ll7", name: "Add Two Numbers", level: "Medium", leetcode: "https://leetcode.com/problems/add-two-numbers/", gfg: "https://www.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1" },
      { id: "ll8", name: "Merge k Sorted Lists", level: "Hard", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/", gfg: "https://www.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1" },
      { id: "ll9", name: "Reverse Nodes in k-Group", level: "Hard", leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/", gfg: "https://www.geeksforgeeks.org/problems/reverse-nodes-in-k-group-size/1" },
      { id: "ll10", name: "Linked List Cycle II", level: "Hard", leetcode: "https://leetcode.com/problems/linked-list-cycle-ii/", gfg: "https://www.geeksforgeeks.org/problems/find-length-of-loop/1" }
    ]
  },
  {
    patternName: "Trees",
    problems: [
      { id: "tr1", name: "Invert Binary Tree", level: "Easy", leetcode: "https://leetcode.com/problems/invert-binary-tree/", gfg: "https://www.geeksforgeeks.org/problems/mirror-tree/1" },
      { id: "tr2", name: "Max Depth of Tree", level: "Easy", leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", gfg: "https://www.geeksforgeeks.org/problems/height-of-binary-tree/1" },
      { id: "tr3", name: "Same Tree", level: "Easy", leetcode: "https://leetcode.com/problems/determine-if-two-trees-are-identical/1", gfg: "https://www.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1" },
      { id: "tr4", name: "Level Order Traversal", level: "Medium", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/", gfg: "https://www.geeksforgeeks.org/problems/level-order-traversal/1" },
      { id: "tr5", name: "LCA of BST", level: "Medium", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-in-a-bst/1", gfg: "https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-bst/1" },
      { id: "tr6", name: "Construct Preorder/Inorder", level: "Medium", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", gfg: "https://www.geeksforgeeks.org/problems/construct-tree-1/1" },
      { id: "tr7", name: "Validate BST", level: "Medium", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/", gfg: "https://www.geeksforgeeks.org/problems/check-for-bst/1" },
      { id: "tr8", name: "Max Path Sum", level: "Hard", leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", gfg: "https://www.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1" },
      { id: "tr9", name: "Serialize/Deserialize Tree", level: "Hard", leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", gfg: "https://www.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1" },
      { id: "tr10", name: "Binary Tree Camera", level: "Hard", leetcode: "https://leetcode.com/problems/binary-tree-cameras/", gfg: "https://www.geeksforgeeks.org/problems/binary-tree-cameras/1" }
    ]
  },
  {
    patternName: "Tries",
    problems: [
      { id: "tri1", name: "Longest Common Prefix", level: "Easy", leetcode: "https://leetcode.com/problems/longest-common-prefix/", gfg: "https://www.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1" },
      { id: "tri2", name: "Replace Words", level: "Easy", leetcode: "https://leetcode.com/problems/replace-words/", gfg: "https://www.geeksforgeeks.org/problems/replace-words/1" },
      { id: "tri3", name: "Longest Word Dictionary", level: "Easy", leetcode: "https://leetcode.com/problems/longest-word-in-dictionary/", gfg: "https://www.geeksforgeeks.org/problems/longest-word-in-dictionary/1" },
      { id: "tri4", name: "Implement Trie", level: "Medium", leetcode: "https://leetcode.com/problems/implement-trie-prefix-tree/", gfg: "https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1" },
      { id: "tri5", name: "Add/Search Word", level: "Medium", leetcode: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", gfg: "https://www.geeksforgeeks.org/problems/design-add-and-search-words-data-structure/1" },
      { id: "tri6", name: "Map Sum Pairs", level: "Medium", leetcode: "https://leetcode.com/problems/map-sum-pairs/", gfg: "https://www.geeksforgeeks.org/problems/map-sum-pairs/1" },
      { id: "tri7", name: "Extra Characters String", level: "Medium", leetcode: "https://leetcode.com/problems/extra-characters-in-a-string/", gfg: "https://www.geeksforgeeks.org/problems/extra-characters-in-a-string/1" },
      { id: "tri8", name: "Word Search II", level: "Hard", leetcode: "https://leetcode.com/problems/word-search-ii/", gfg: "https://www.geeksforgeeks.org/problems/word-search-ii/1" },
      { id: "tri9", name: "Prefix and Suffix Search", level: "Hard", leetcode: "https://leetcode.com/problems/prefix-and-suffix-search/", gfg: "https://www.geeksforgeeks.org/problems/prefix-and-suffix-search/1" },
      { id: "tri10", name: "Stream of Characters", level: "Hard", leetcode: "https://leetcode.com/problems/stream-of-characters/", gfg: "https://www.geeksforgeeks.org/problems/stream-of-characters/1" }
    ]
  },
  {
    patternName: "Backtracking",
    problems: [
      { id: "bt1", name: "Binary Watch", level: "Easy", leetcode: "https://leetcode.com/problems/binary-watch/", gfg: "https://www.geeksforgeeks.org/problems/binary-watch/1" },
      { id: "bt2", name: "Subset XOR Totals", level: "Easy", leetcode: "https://leetcode.com/problems/sum-of-all-subset-xor-totals/", gfg: "https://www.geeksforgeeks.org/problems/sum-of-all-subset-xor-totals/1" },
      { id: "bt3", name: "Generate Binary Strings", level: "Easy", leetcode: "https://leetcode.com/problems/generate-binary-strings-without-consecutive-1s/", gfg: "https://www.geeksforgeeks.org/problems/generate-all-binary-strings/1" },
      { id: "bt4", name: "Subsets", level: "Medium", leetcode: "https://leetcode.com/problems/subsets/", gfg: "https://www.geeksforgeeks.org/problems/subsets-1616664903/1" },
      { id: "bt5", name: "Permutations", level: "Medium", leetcode: "https://leetcode.com/problems/permutations/", gfg: "https://www.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1" },
      { id: "bt6", name: "Combination Sum", level: "Medium", leetcode: "https://leetcode.com/problems/combination-sum/", gfg: "https://www.geeksforgeeks.org/problems/combination-sum-1587115620/1" },
      { id: "bt7", name: "Word Search", level: "Medium", leetcode: "https://leetcode.com/problems/word-search/", gfg: "https://www.geeksforgeeks.org/problems/word-search/1" },
      { id: "bt8", name: "N-Queens", level: "Hard", leetcode: "https://leetcode.com/problems/n-queens/", gfg: "https://www.geeksforgeeks.org/problems/n-queen-problem0315/1" },
      { id: "bt9", name: "Sudoku Solver", level: "Hard", leetcode: "https://leetcode.com/problems/sudoku-solver/", gfg: "https://www.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1" },
      { id: "bt10", name: "Palindrome Partitioning", level: "Hard", leetcode: "https://leetcode.com/problems/palindrome-partitioning/", gfg: "https://www.geeksforgeeks.org/problems/palindromic-patitioning4845/1" }
    ]
  },
  {
    patternName: "Heap / Priority Queue",
    problems: [
      { id: "hp1", name: "Kth Largest in Stream", level: "Easy", leetcode: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", gfg: "https://www.geeksforgeeks.org/problems/kth-largest-element-in-a-stream/1" },
      { id: "hp2", name: "Last Stone Weight", level: "Easy", leetcode: "https://leetcode.com/problems/last-stone-weight/", gfg: "https://www.geeksforgeeks.org/problems/last-stone-weight/1" },
      { id: "hp3", name: "Relative Ranks", level: "Easy", leetcode: "https://leetcode.com/problems/relative-ranks/", gfg: "https://www.geeksforgeeks.org/problems/relative-ranks/1" },
      { id: "hp4", name: "Kth Largest in Array", level: "Medium", leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/", gfg: "https://www.geeksforgeeks.org/problems/k-largest-elements3736/1" },
      { id: "hp5", name: "Top K Frequent Words", level: "Medium", leetcode: "https://leetcode.com/problems/top-k-frequent-words/", gfg: "https://www.geeksforgeeks.org/problems/top-k-frequent-words/1" },
      { id: "hp6", name: "K Closest Points", level: "Medium", leetcode: "https://leetcode.com/problems/k-closest-points-to-origin/", gfg: "https://www.geeksforgeeks.org/problems/k-closest-points-to-origin/1" },
      { id: "hp7", name: "Task Scheduler", level: "Medium", leetcode: "https://leetcode.com/problems/task-scheduler/", gfg: "https://www.geeksforgeeks.org/problems/task-scheduler/1" },
      { id: "hp8", name: "Find Median from Stream", level: "Hard", leetcode: "https://leetcode.com/problems/find-median-from-data-stream/", gfg: "https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1" },
      { id: "hp9", name: "Smallest Range K Lists", level: "Hard", leetcode: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", gfg: "https://www.geeksforgeeks.org/problems/smallest-range-in-k-lists/1" },
      { id: "hp10", name: "Swim in Rising Water", level: "Hard", leetcode: "https://leetcode.com/problems/swim-in-rising-water/", gfg: "https://www.geeksforgeeks.org/problems/swim-in-rising-water/1" }
    ]
  },
  {
    patternName: "Graphs",
    problems: [
      { id: "gr1", name: "Star Graph Center", level: "Easy", leetcode: "https://leetcode.com/problems/find-center-of-star-graph/", gfg: "https://www.geeksforgeeks.org/problems/find-center-of-star-graph/1" },
      { id: "gr2", name: "Path Exists in Graph", level: "Easy", leetcode: "https://leetcode.com/problems/find-if-path-exists-in-graph/", gfg: "https://www.geeksforgeeks.org/problems/find-if-path-exists-in-graph/1" },
      { id: "gr3", name: "Island Perimeter", level: "Easy", leetcode: "https://leetcode.com/problems/island-perimeter/", gfg: "https://www.geeksforgeeks.org/problems/island-perimeter/1" },
      { id: "gr4", name: "Number of Islands", level: "Medium", leetcode: "https://leetcode.com/problems/number-of-islands/", gfg: "https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1" },
      { id: "gr5", name: "Clone Graph", level: "Medium", leetcode: "https://leetcode.com/problems/clone-graph/", gfg: "https://www.geeksforgeeks.org/problems/clone-graph/1" },
      { id: "gr6", name: "Max Area of Island", level: "Medium", leetcode: "https://leetcode.com/problems/max-area-of-island/", gfg: "https://www.geeksforgeeks.org/problems/max-area-of-island/1" },
      { id: "gr7", name: "Course Schedule", level: "Medium", leetcode: "https://leetcode.com/problems/course-schedule/", gfg: "https://www.geeksforgeeks.org/problems/prerequisite-tasks/1" },
      { id: "gr8", name: "Word Ladder", level: "Hard", leetcode: "https://leetcode.com/problems/word-ladder/", gfg: "https://www.geeksforgeeks.org/problems/word-ladder/1" },
      { id: "gr9", name: "Longest Path in Matrix", level: "Hard", leetcode: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", gfg: "https://www.geeksforgeeks.org/problems/longest-increasing-path-in-a-matrix/1" },
      { id: "gr10", name: "Critical Connections", level: "Hard", leetcode: "https://leetcode.com/problems/critical-connections-in-a-network/", gfg: "https://www.geeksforgeeks.org/problems/critical-connections-in-a-network/1" }
    ]
  },
  {
    patternName: "Advanced Graphs",
    problems: [
      { id: "adv1", name: "Prim MST Basic", level: "Easy", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "adv2", name: "Kruskal MST Basic", level: "Easy", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "adv3", name: "Eventual Safe States", level: "Easy", leetcode: "https://leetcode.com/problems/find-eventual-safe-states/", gfg: "https://www.geeksforgeeks.org/problems/eventual-safe-states/1" },
      { id: "adv4", name: "Network Delay Time", level: "Medium", leetcode: "https://leetcode.com/problems/network-delay-time/", gfg: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-adugested-shortest-path/1" },
      { id: "adv5", name: "Min Cost Connect Points", level: "Medium", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "adv6", name: "Cheapest Flights K Stops", level: "Medium", leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", gfg: "https://www.geeksforgeeks.org/problems/cheapest-flights-within-k-stops/1" },
      { id: "adv7", name: "Reconstruct Itinerary", level: "Medium", leetcode: "https://leetcode.com/problems/reconstruct-itinerary/", gfg: "https://www.geeksforgeeks.org/problems/reconstruct-itinerary/1" },
      { id: "adv8", name: "Alien Dictionary", level: "Hard", leetcode: "https://leetcode.com/problems/alien-dictionary/", gfg: "https://www.geeksforgeeks.org/problems/alien-dictionary/1" },
      { id: "adv9", name: "Swim in Rising Water", level: "Hard", leetcode: "https://leetcode.com/problems/swim-in-rising-water/", gfg: "https://www.geeksforgeeks.org/problems/swim-in-rising-water/1" },
      { id: "adv10", name: "Optimize Water Distribution", level: "Hard", leetcode: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/", gfg: "https://www.geeksforgeeks.org/problems/water-distribution/1" }
    ]
  },
  {
    patternName: "1-D DP",
    problems: [
      { id: "dp1_1", name: "Climbing Stairs", level: "Easy", leetcode: "https://leetcode.com/problems/climbing-stairs/", gfg: "https://www.geeksforgeeks.org/problems/count-ways-to-reach-the-nth-stair-1587115620/1" },
      { id: "dp1_2", name: "Min Cost Climb", level: "Easy", leetcode: "https://leetcode.com/problems/min-cost-climbing-stairs/", gfg: "https://www.geeksforgeeks.org/problems/min-cost-climbing-stairs/1" },
      { id: "dp1_3", name: "Maximum Subarray", level: "Easy", leetcode: "https://leetcode.com/problems/maximum-subarray/", gfg: "https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1" },
      { id: "dp1_4", name: "House Robber", level: "Medium", leetcode: "https://leetcode.com/problems/house-robber/", gfg: "https://www.geeksforgeeks.org/problems/stickler-theif-1587115621/1" },
      { id: "dp1_5", name: "Longest Increasing Subseq", level: "Medium", leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/", gfg: "https://www.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1" },
      { id: "dp1_6", name: "Coin Change", level: "Medium", leetcode: "https://leetcode.com/problems/coin-change/", gfg: "https://www.geeksforgeeks.org/problems/coin-change2448/1" },
      { id: "dp1_7", name: "Partition Equal Subset", level: "Medium", leetcode: "https://leetcode.com/problems/partition-equal-subset-sum/", gfg: "https://www.geeksforgeeks.org/problems/subset-sum-problem2014/1" },
      { id: "dp1_8", name: "Longest Valid Parentheses", level: "Hard", leetcode: "https://leetcode.com/problems/longest-valid-parentheses/", gfg: "https://www.geeksforgeeks.org/problems/longest-valid-parentheses5657/1" },
      { id: "dp1_9", name: "Decode Ways II", level: "Hard", leetcode: "https://leetcode.com/problems/decode-ways-ii/", gfg: "https://www.geeksforgeeks.org/problems/decode-ways-ii/1" },
      { id: "dp1_10", name: "Word Break II", level: "Hard", leetcode: "https://leetcode.com/problems/word-break-ii/", gfg: "https://www.geeksforgeeks.org/problems/word-break-ii/1" }
    ]
  },
  {
    patternName: "Intervals",
    problems: [
      { id: "int1", name: "Meeting Rooms", level: "Easy", leetcode: "https://leetcode.com/problems/meeting-rooms/", gfg: "https://www.geeksforgeeks.org/problems/meeting-rooms/1" },
      { id: "int2", name: "Summary Ranges", level: "Easy", leetcode: "https://leetcode.com/problems/summary-ranges/", gfg: "https://www.geeksforgeeks.org/problems/summary-ranges/1" },
      { id: "int3", name: "Remove Covered Intervals", level: "Easy", leetcode: "https://leetcode.com/problems/remove-covered-intervals/", gfg: "https://www.geeksforgeeks.org/problems/remove-covered-intervals/1" },
      { id: "int4", name: "Insert Interval", level: "Medium", leetcode: "https://leetcode.com/problems/insert-interval/", gfg: "https://www.geeksforgeeks.org/problems/insert-interval/1" },
      { id: "int5", name: "Merge Intervals", level: "Medium", leetcode: "https://leetcode.com/problems/merge-intervals/", gfg: "https://www.geeksforgeeks.org/problems/overlapping-intervals--170633/1" },
      { id: "int6", name: "Non-overlapping Intervals", level: "Medium", leetcode: "https://leetcode.com/problems/non-overlapping-intervals/", gfg: "https://www.geeksforgeeks.org/problems/non-overlapping-intervals/1" },
      { id: "int7", name: "Meeting Rooms II", level: "Medium", leetcode: "https://leetcode.com/problems/meeting-rooms-ii/", gfg: "https://www.geeksforgeeks.org/problems/meeting-rooms-ii/1" },
      { id: "int8", name: "Range Module", level: "Hard", leetcode: "https://leetcode.com/problems/range-module/", gfg: "https://www.geeksforgeeks.org/problems/range-module/1" },
      { id: "int9", name: "Data Stream Disjoint Intervals", level: "Hard", leetcode: "https://leetcode.com/problems/data-stream-as-disjoint-intervals/", gfg: "https://www.geeksforgeeks.org/problems/data-stream-as-disjoint-intervals/1" },
      { id: "int10", name: "Employee Free Time", level: "Hard", leetcode: "https://leetcode.com/problems/employee-free-time/", gfg: "https://www.geeksforgeeks.org/problems/employee-free-time/1" }
    ]
  },
  {
    patternName: "Greedy",
    problems: [
      { id: "grd1", name: "Assign Cookies", level: "Easy", leetcode: "https://leetcode.com/problems/assign-cookies/", gfg: "https://www.geeksforgeeks.org/problems/assign-cookies/1" },
      { id: "grd2", name: "Lemonade Change", level: "Easy", leetcode: "https://leetcode.com/problems/lemonade-change/", gfg: "https://www.geeksforgeeks.org/problems/lemonade-change/1" },
      { id: "grd3", name: "Can Place Flowers", level: "Easy", leetcode: "https://leetcode.com/problems/can-place-flowers/", gfg: "https://www.geeksforgeeks.org/problems/can-place-flowers/1" },
      { id: "grd4", name: "Jump Game", level: "Medium", leetcode: "https://leetcode.com/problems/jump-game/", gfg: "https://www.geeksforgeeks.org/problems/jump-game/1" },
      { id: "grd5", name: "Jump Game II", level: "Medium", leetcode: "https://leetcode.com/problems/jump-game-ii/", gfg: "https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1" },
      { id: "grd6", name: "Gas Station", level: "Medium", leetcode: "https://leetcode.com/problems/gas-station/", gfg: "https://www.geeksforgeeks.org/problems/circular-tour-1587115620/1" },
      { id: "grd7", name: "Hand of Straights", level: "Medium", leetcode: "https://leetcode.com/problems/hand-of-straights/", gfg: "https://www.geeksforgeeks.org/problems/hand-of-straights/1" },
      { id: "grd8", name: "Candy", level: "Hard", leetcode: "https://leetcode.com/problems/candy/", gfg: "https://www.geeksforgeeks.org/problems/candy/1" },
      { id: "grd9", name: "Patching Array", level: "Hard", leetcode: "https://leetcode.com/problems/patching-array/", gfg: "https://www.geeksforgeeks.org/problems/patching-array/1" },
      { id: "grd10", name: "Merge Triplets", level: "Hard", leetcode: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/", gfg: "https://www.geeksforgeeks.org/problems/merge-triplets/1" }
    ]
  },
  {
    patternName: "Advanced Graphs",
    problems: [
      { id: "adv1", name: "Prim MST Basic", level: "Easy", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "adv2", name: "Kruskal MST Basic", level: "Easy", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "adv3", name: "Eventual Safe States", level: "Easy", leetcode: "https://leetcode.com/problems/find-eventual-safe-states/", gfg: "https://www.geeksforgeeks.org/problems/eventual-safe-states/1" },
      { id: "adv4", name: "Network Delay Time", level: "Medium", leetcode: "https://leetcode.com/problems/network-delay-time/", gfg: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-adugested-shortest-path/1" },
      { id: "adv5", name: "Min Cost Connect Points", level: "Medium", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "adv6", name: "Cheapest Flights K Stops", level: "Medium", leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", gfg: "https://www.geeksforgeeks.org/problems/cheapest-flights-within-k-stops/1" },
      { id: "adv7", name: "Reconstruct Itinerary", level: "Medium", leetcode: "https://leetcode.com/problems/reconstruct-itinerary/", gfg: "https://www.geeksforgeeks.org/problems/reconstruct-itinerary/1" },
      { id: "adv8", name: "Alien Dictionary", level: "Hard", leetcode: "https://leetcode.com/problems/alien-dictionary/", gfg: "https://www.geeksforgeeks.org/problems/alien-dictionary/1" },
      { id: "adv9", name: "Swim in Rising Water", level: "Hard", leetcode: "https://leetcode.com/problems/swim-in-rising-water/", gfg: "https://www.geeksforgeeks.org/problems/swim-in-rising-water/1" },
      { id: "adv10", name: "Optimize Water Distribution", level: "Hard", leetcode: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/", gfg: "https://www.geeksforgeeks.org/problems/water-distribution/1" }
    ]
  },
  {
    patternName: "2-D DP",
    problems: [
      { id: "dp2_1", name: "Pascal Triangle", level: "Easy", leetcode: "https://leetcode.com/problems/pascals-triangle/", gfg: "https://www.geeksforgeeks.org/problems/pascal-triangle0652/1" },
      { id: "dp2_2", name: "Unique Paths Basic", level: "Easy", leetcode: "https://leetcode.com/problems/unique-paths/", gfg: "https://www.geeksforgeeks.org/problems/number-of-paths0927/1" },
      { id: "dp2_3", name: "Pascal Triangle II", level: "Easy", leetcode: "https://leetcode.com/problems/pascals-triangle-ii/", gfg: "https://www.geeksforgeeks.org/problems/pascal-triangle0652/1" },
      { id: "dp2_4", name: "Unique Paths II", level: "Medium", leetcode: "https://leetcode.com/problems/unique-paths-ii/", gfg: "https://www.geeksforgeeks.org/problems/unique-paths-in-a-grid--170647/1" },
      { id: "dp2_5", name: "Longest Common Subseq", level: "Medium", leetcode: "https://leetcode.com/problems/longest-common-subsequence/", gfg: "https://www.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1" },
      { id: "dp2_6", name: "Target Sum", level: "Medium", leetcode: "https://leetcode.com/problems/target-sum/", gfg: "https://www.geeksforgeeks.org/problems/target-sum-1626325950/1" },
      { id: "dp2_7", name: "Edit Distance", level: "Medium", leetcode: "https://leetcode.com/problems/edit-distance/", gfg: "https://www.geeksforgeeks.org/problems/edit-distance3702/1" },
      { id: "dp2_8", name: "Distinct Subsequences", level: "Hard", leetcode: "https://leetcode.com/problems/distinct-subsequences/", gfg: "https://www.geeksforgeeks.org/problems/distinct-occurrences/1" },
      { id: "dp2_9", name: "Burst Balloons", level: "Hard", leetcode: "https://leetcode.com/problems/burst-balloons/", gfg: "https://www.geeksforgeeks.org/problems/burst-balloons/1" },
      { id: "dp2_10", name: "Regex Matching", level: "Hard", leetcode: "https://leetcode.com/problems/regular-expression-matching/", gfg: "https://www.geeksforgeeks.org/problems/regular-expression-matching/1" }
    ]
  },
  {
    patternName: "Bit Manipulation",
    problems: [
      { id: "bit1", name: "Single Number", level: "Easy", leetcode: "https://leetcode.com/problems/single-number/", gfg: "https://www.geeksforgeeks.org/problems/single-number1014/1" },
      { id: "bit2", name: "Number of 1 Bits", level: "Easy", leetcode: "https://leetcode.com/problems/number-of-1-bits/", gfg: "https://www.geeksforgeeks.org/problems/set-bits0143/1" },
      { id: "bit3", name: "Counting Bits", level: "Easy", leetcode: "https://leetcode.com/problems/counting-bits/", gfg: "https://www.geeksforgeeks.org/problems/counting-bits/1" },
      { id: "bit4", name: "Subsets Bitwise", level: "Medium", leetcode: "https://leetcode.com/problems/subsets/", gfg: "https://www.geeksforgeeks.org/problems/subsets-1616664903/1" },
      { id: "bit5", name: "Sum of Two Integers", level: "Medium", leetcode: "https://leetcode.com/problems/sum-of-two-integers/", gfg: "https://www.geeksforgeeks.org/problems/sum-of-two-integers/1" },
      { id: "bit6", name: "Reverse Bits", level: "Medium", leetcode: "https://leetcode.com/problems/reverse-bits/", gfg: "https://www.geeksforgeeks.org/problems/reverse-bits3556/1" },
      { id: "bit7", name: "Bitwise AND Range", level: "Medium", leetcode: "https://leetcode.com/problems/bitwise-and-of-numbers-range/", gfg: "https://www.geeksforgeeks.org/problems/bitwise-and-of-the-range/1" },
      { id: "bit8", name: "Max Product Word Lengths", level: "Hard", leetcode: "https://leetcode.com/problems/maximum-product-of-word-lengths/", gfg: "https://www.geeksforgeeks.org/problems/maximum-product-of-word-lengths/1" },
      { id: "bit9", name: "Min One Bit Operations", level: "Hard", leetcode: "https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero/", gfg: "https://www.geeksforgeeks.org/problems/minimum-one-bit-operations/1" },
      { id: "bit10", name: "Integers Without Consecutive Ones", level: "Hard", leetcode: "https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/", gfg: "https://www.geeksforgeeks.org/problems/non-negative-integers-without-consecutive-ones/1" }
    ]
  },
  {
    patternName: "Math & Geometry",
    problems: [
      { id: "math1", name: "Happy Number", level: "Easy", leetcode: "https://leetcode.com/problems/happy-number/", gfg: "https://www.geeksforgeeks.org/problems/happy-number0518/1" },
      { id: "math2", name: "Plus One", level: "Easy", leetcode: "https://leetcode.com/problems/plus-one/", gfg: "https://www.geeksforgeeks.org/problems/plus-one/1" },
      { id: "math3", name: "Power of Three", level: "Easy", leetcode: "https://leetcode.com/problems/power-of-three/", gfg: "https://www.geeksforgeeks.org/problems/power-of-three/1" },
      { id: "math4", name: "Rotate Image", level: "Medium", leetcode: "https://leetcode.com/problems/rotate-image/", gfg: "https://www.geeksforgeeks.org/problems/rotate-by-90-degree-1587115621/1" },
      { id: "math5", name: "Spiral Matrix", level: "Medium", leetcode: "https://leetcode.com/problems/spiral-matrix/", gfg: "https://www.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1" },
      { id: "math6", name: "Set Matrix Zeroes", level: "Medium", leetcode: "https://leetcode.com/problems/set-matrix-zeroes/", gfg: "https://www.geeksforgeeks.org/problems/boolean-matrix-problem-1587115620/1" },
      { id: "math7", name: "Pow(x, n)", level: "Medium", leetcode: "https://leetcode.com/problems/powx-n/", gfg: "https://www.geeksforgeeks.org/problems/power-of-numbers-1587115620/1" },
      { id: "math8", name: "Max Points on Line", level: "Hard", leetcode: "https://leetcode.com/problems/max-points-on-a-line/", gfg: "https://www.geeksforgeeks.org/problems/max-points-on-a-line/1" },
      { id: "math9", name: "Integer to English Words", level: "Hard", leetcode: "https://leetcode.com/problems/integer-to-english-words/", gfg: "https://www.geeksforgeeks.org/problems/number-to-words0335/1" },
      { id: "math10", name: "Basic Calculator II", level: "Hard", leetcode: "https://leetcode.com/problems/basic-calculator-ii/", gfg: "https://www.geeksforgeeks.org/problems/basic-calculator-ii/1" }
    ]
  },
  {
    patternName: "String",
    problems: [
      { id: "str1", name: "Reverse String", level: "Easy", leetcode: "https://leetcode.com/problems/reverse-string/", gfg: "https://www.geeksforgeeks.org/problems/reverse-a-string-using-stack/1" },
      { id: "str2", name: "Valid Palindrome", level: "Easy", leetcode: "https://leetcode.com/problems/valid-palindrome/", gfg: "https://www.geeksforgeeks.org/problems/string-palindromic-or-not1624/1" },
      { id: "str3", name: "Fizz Buzz", level: "Easy", leetcode: "https://leetcode.com/problems/fizz-buzz/", gfg: "https://www.geeksforgeeks.org/problems/fizz-buzz-1650371427/1" },
      { id: "str4", name: "Longest Common Prefix", level: "Medium", leetcode: "https://leetcode.com/problems/longest-common-prefix/", gfg: "https://www.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1" },
      { id: "str5", name: "Reverse Words in String", level: "Medium", leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/", gfg: "https://www.geeksforgeeks.org/problems/reverse-words-in-a-given-string5405/1" },
      { id: "str6", name: "Multiply Strings", level: "Medium", leetcode: "https://leetcode.com/problems/multiply-strings/", gfg: "https://www.geeksforgeeks.org/problems/multiply-two-strings/1" },
      { id: "str7", name: "Longest Palindromic Substring", level: "Medium", leetcode: "https://leetcode.com/problems/longest-palindromic-substring/", gfg: "https://www.geeksforgeeks.org/problems/longest-palindrome-in-a-string1902/1" },
      { id: "str8", name: "Shortest Palindrome", level: "Hard", leetcode: "https://leetcode.com/problems/shortest-palindrome/", gfg: "https://www.geeksforgeeks.org/problems/shortest-palindrome/1" },
      { id: "str9", name: "Distinct Subsequences", level: "Hard", leetcode: "https://leetcode.com/problems/distinct-subsequences/", gfg: "https://www.geeksforgeeks.org/problems/distinct-occurrences/1" },
      { id: "str10", name: "Regular Expression Matching", level: "Hard", leetcode: "https://leetcode.com/problems/regular-expression-matching/", gfg: "https://www.geeksforgeeks.org/problems/regular-expression-matching/1" }
    ]
  },
  {
    patternName: "Recursion",
    problems: [
      { id: "rec1", name: "Fibonacci Number", level: "Easy", leetcode: "https://leetcode.com/problems/fibonacci-number/", gfg: "https://www.geeksforgeeks.org/problems/fibonacci-series-up-to-nth-term/1" },
      { id: "rec2", name: "Power of Two", level: "Easy", leetcode: "https://leetcode.com/problems/power-of-two/", gfg: "https://www.geeksforgeeks.org/problems/power-of-2-1587115620/1" },
      { id: "rec3", name: "Range Sum of BST", level: "Easy", leetcode: "https://leetcode.com/problems/range-sum-of-bst/", gfg: "https://www.geeksforgeeks.org/problems/range-sum-of-bst/1" },
      { id: "rec4", name: "Letter Combinations", level: "Medium", leetcode: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", gfg: "https://www.geeksforgeeks.org/problems/possible-words-from-phone-digits-1587115620/1" },
      { id: "rec5", name: "Generate Parentheses", level: "Medium", leetcode: "https://leetcode.com/problems/generate-parentheses/", gfg: "https://www.geeksforgeeks.org/problems/generate-all-parentheses/1" },
      { id: "rec6", name: "Permutations", level: "Medium", leetcode: "https://leetcode.com/problems/permutations/", gfg: "https://www.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1" },
      { id: "rec7", name: "Subsets", level: "Medium", leetcode: "https://leetcode.com/problems/subsets/", gfg: "https://www.geeksforgeeks.org/problems/subsets-1616664903/1" },
      { id: "rec8", name: "N-Queens", level: "Hard", leetcode: "https://leetcode.com/problems/n-queens/", gfg: "https://www.geeksforgeeks.org/problems/n-queen-problem0315/1" },
      { id: "rec9", name: "Sudoku Solver", level: "Hard", leetcode: "https://leetcode.com/problems/sudoku-solver/", gfg: "https://www.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1" },
      { id: "rec10", name: "Expression Add Operators", level: "Hard", leetcode: "https://leetcode.com/problems/expression-add-operators/", gfg: "https://www.geeksforgeeks.org/problems/expression-add-operators/1" }
    ]
  },
  {
    patternName: "Matrix / Grid",
    problems: [
      { id: "mat1", name: "Flood Fill", level: "Easy", leetcode: "https://leetcode.com/problems/flood-fill/", gfg: "https://www.geeksforgeeks.org/problems/flood-fill-algorithm1856/1" },
      { id: "mat2", name: "Island Perimeter", level: "Easy", leetcode: "https://leetcode.com/problems/island-perimeter/", gfg: "https://www.geeksforgeeks.org/problems/island-perimeter/1" },
      { id: "mat3", name: "Transpose Matrix", level: "Easy", leetcode: "https://leetcode.com/problems/transpose-of-matrix-1587115621/1", gfg: "https://www.geeksforgeeks.org/problems/transpose-of-matrix-1587115621/1" },
      { id: "mat4", name: "Rotate Image", level: "Medium", leetcode: "https://leetcode.com/problems/rotate-image/", gfg: "https://www.geeksforgeeks.org/problems/rotate-by-90-degree-1587115621/1" },
      { id: "mat5", name: "Spiral Matrix", level: "Medium", leetcode: "https://leetcode.com/problems/spiral-matrix/", gfg: "https://www.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1" },
      { id: "mat6", name: "Set Matrix Zeroes", level: "Medium", leetcode: "https://leetcode.com/problems/set-matrix-zeroes/", gfg: "https://www.geeksforgeeks.org/problems/boolean-matrix-problem-1587115620/1" },
      { id: "mat7", name: "Number of Islands", level: "Medium", leetcode: "https://leetcode.com/problems/number-of-islands/", gfg: "https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1" },
      { id: "mat8", name: "Word Search II", level: "Hard", leetcode: "https://leetcode.com/problems/word-search-ii/", gfg: "https://www.geeksforgeeks.org/problems/word-search-ii/1" },
      { id: "mat9", name: "Longest Increasing Path", level: "Hard", leetcode: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", gfg: "https://www.geeksforgeeks.org/problems/longest-increasing-path-in-a-matrix/1" },
      { id: "mat10", name: "Cherry Pickup", level: "Hard", leetcode: "https://leetcode.com/problems/cherry-pickup/", gfg: "https://www.geeksforgeeks.org/problems/cherry-pickup/1" }
    ]
  },
  {
    patternName: "Queues & Deques",
    problems: [
      { id: "que1", name: "Number of Recent Calls", level: "Easy", leetcode: "https://leetcode.com/problems/number-of-recent-calls/", gfg: "https://www.geeksforgeeks.org/problems/recent-calls/1" },
      { id: "que2", name: "Stack using Queues", level: "Easy", leetcode: "https://leetcode.com/problems/implement-stack-using-queues/", gfg: "https://www.geeksforgeeks.org/problems/stack-using-two-queues/1" },
      { id: "que3", name: "Queue using Stacks", level: "Easy", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/", gfg: "https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1" },
      { id: "que4", name: "Design Circular Queue", level: "Medium", leetcode: "https://leetcode.com/problems/design-circular-queue/", gfg: "https://www.geeksforgeeks.org/problems/design-circular-queue/1" },
      { id: "que5", name: "Task Scheduler", level: "Medium", leetcode: "https://leetcode.com/problems/task-scheduler/", gfg: "https://www.geeksforgeeks.org/problems/task-scheduler/1" },
      { id: "que6", name: "Circular Deque", level: "Medium", leetcode: "https://leetcode.com/problems/design-circular-deque/", gfg: "https://www.geeksforgeeks.org/problems/design-circular-deque/1" },
      { id: "que7", name: "Dota2 Senate", level: "Medium", leetcode: "https://leetcode.com/problems/dota2-senate/", gfg: "https://www.geeksforgeeks.org/problems/dota2-senate/1" },
      { id: "que8", name: "Sliding Window Max", level: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-maximum/", gfg: "https://www.geeksforgeeks.org/problems/deques-and-maximum-size-subarrays/1" },
      { id: "que9", name: "Max Value of Equation", level: "Hard", leetcode: "https://leetcode.com/problems/max-value-of-equation/", gfg: "https://www.geeksforgeeks.org/problems/max-value-of-equation/1" },
      { id: "que10", name: "Shortest Subarray Sum K", level: "Hard", leetcode: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", gfg: "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1" }
    ]
  },
  {
    patternName: "Binary Search Tree (BST)",
    problems: [
      { id: "bst1", name: "Search in BST", level: "Easy", leetcode: "https://leetcode.com/problems/search-in-a-binary-search-tree/", gfg: "https://www.geeksforgeeks.org/problems/search-a-node-in-bst/1" },
      { id: "bst2", name: "Convert Sorted Array to BST", level: "Easy", leetcode: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", gfg: "https://www.geeksforgeeks.org/problems/array-to-bst4443/1" },
      { id: "bst3", name: "Range Sum of BST", level: "Easy", leetcode: "https://leetcode.com/problems/range-sum-of-bst/", gfg: "https://www.geeksforgeeks.org/problems/range-sum-of-bst/1" },
      { id: "bst4", name: "Validate BST", level: "Medium", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/", gfg: "https://www.geeksforgeeks.org/problems/check-for-bst/1" },
      { id: "bst5", name: "Insert into BST", level: "Medium", leetcode: "https://leetcode.com/problems/insert-into-a-binary-search-tree/", gfg: "https://www.geeksforgeeks.org/problems/insert-a-node-in-a-bst/1" },
      { id: "bst6", name: "Lowest Common Ancestor BST", level: "Medium", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-in-a-bst/1", gfg: "https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-bst/1" },
      { id: "bst7", name: "Delete Node in BST", level: "Medium", leetcode: "https://leetcode.com/problems/delete-node-in-a-binary-search-tree/", gfg: "https://www.geeksforgeeks.org/problems/delete-a-node-from-bst/1" },
      { id: "bst8", name: "Recover BST", level: "Hard", leetcode: "https://leetcode.com/problems/recover-binary-search-tree/", gfg: "https://www.geeksforgeeks.org/problems/recover-a-bst/1" },
      { id: "bst9", name: "BST Iterator", level: "Hard", leetcode: "https://leetcode.com/problems/binary-search-tree-iterator/", gfg: "https://www.geeksforgeeks.org/problems/bst-iterator/1" },
      { id: "bst10", name: "Preorder to BST", level: "Hard", leetcode: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", gfg: "https://www.geeksforgeeks.org/problems/preorder-to-postorder4423/1" }
    ]
  },
  {
    patternName: "Design",
    problems: [
      { id: "dsg1", name: "Design Parking System", level: "Easy", leetcode: "https://leetcode.com/problems/design-parking-system/", gfg: "https://www.geeksforgeeks.org/problems/design-parking-system/1" },
      { id: "dsg2", name: "Design HashSet", level: "Easy", leetcode: "https://leetcode.com/problems/design-hashset/", gfg: "https://www.geeksforgeeks.org/problems/design-hashset/1" },
      { id: "dsg3", name: "Design HashMap", level: "Easy", leetcode: "https://leetcode.com/problems/design-hashmap/", gfg: "https://www.geeksforgeeks.org/problems/design-hashmap/1" },
      { id: "dsg4", name: "LRU Cache", level: "Medium", leetcode: "https://leetcode.com/problems/lru-cache/", gfg: "https://www.geeksforgeeks.org/problems/lru-cache/1" },
      { id: "dsg5", name: "Design Twitter", level: "Medium", leetcode: "https://leetcode.com/problems/design-twitter/", gfg: "https://www.geeksforgeeks.org/problems/design-twitter/1" },
      { id: "dsg6", name: "Insert Delete GetRandom O(1)", level: "Medium", leetcode: "https://leetcode.com/problems/insert-delete-getrandom-o1/", gfg: "https://www.geeksforgeeks.org/problems/insert-delete-getrandom-o1/1" },
      { id: "dsg7", name: "Design Browser History", level: "Medium", leetcode: "https://leetcode.com/problems/design-browser-history/", gfg: "https://www.geeksforgeeks.org/problems/design-browser-history/1" },
      { id: "dsg8", name: "LFU Cache", level: "Hard", leetcode: "https://leetcode.com/problems/lfu-cache/", gfg: "https://www.geeksforgeeks.org/problems/lfu-cache/1" },
      { id: "dsg9", name: "Design Autocomplete System", level: "Hard", leetcode: "https://leetcode.com/problems/design-search-autocomplete-system/", gfg: "https://www.geeksforgeeks.org/problems/design-search-autocomplete-system/1" },
      { id: "dsg10", name: "Design Snake Game", level: "Hard", leetcode: "https://leetcode.com/problems/design-snake-game/", gfg: "https://www.geeksforgeeks.org/problems/design-snake-game/1" }
    ]
  },
  {
    patternName: "Advanced Data Structures",
    problems: [
      { id: "ads1", name: "Range Sum Query", level: "Easy", leetcode: "https://leetcode.com/problems/range-sum-query-immutable/", gfg: "https://www.geeksforgeeks.org/problems/range-sum-query-immutable/1" },
      { id: "ads2", name: "Dynamic Range Sum", level: "Easy", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/", gfg: "https://www.geeksforgeeks.org/problems/range-sum-query-mutable/1" },
      { id: "ads3", name: "Min Cost Check", level: "Easy", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "ads4", name: "Mutable Segment Tree", level: "Medium", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/", gfg: "https://www.geeksforgeeks.org/problems/range-sum-query-mutable/1" },
      { id: "ads5", name: "Range Minimum Query", level: "Medium", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/", gfg: "https://www.geeksforgeeks.org/problems/range-minimum-query/1" },
      { id: "ads6", name: "Fenwick Tree Basic", level: "Medium", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/", gfg: "https://www.geeksforgeeks.org/problems/fenwick-tree/1" },
      { id: "ads7", name: "Disjoint Set Union", level: "Medium", leetcode: "https://leetcode.com/problems/number-of-provinces/", gfg: "https://www.geeksforgeeks.org/problems/disjoint-set-union/1" },
      { id: "ads8", name: "Rectangle Area II", level: "Hard", leetcode: "https://leetcode.com/problems/rectangle-area-ii/", gfg: "https://www.geeksforgeeks.org/problems/rectangle-area-ii/1" },
      { id: "ads9", name: "Smaller Numbers After Self", level: "Hard", leetcode: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", gfg: "https://www.geeksforgeeks.org/problems/count-of-smaller-numbers-after-self/1" },
      { id: "ads10", name: "Range Sum Query 2D Mutable", level: "Hard", leetcode: "https://leetcode.com/problems/range-sum-query-2d-mutable/", gfg: "https://www.geeksforgeeks.org/problems/range-sum-query-2d-mutable/1" }
    ]
  }
]"""

# 2. Add circular progress tracker in each DS accordion header using regex to avoid indentation mismatches
# We search for:
# <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
#   {solvedCount} / 10 Completed
# </span>

pattern = r"(<span\s+style=\{\{\s*fontSize:\s*'0\.8rem',\s*color:\s*'#64748b',\s*fontWeight:\s*600,\s*background:\s*'#f1f5f9',\s*padding:\s*'4px\s+10px',\s*borderRadius:\s*'20px'\s*\}\}>\s*\{solvedCount\}\s*/\s*10\s*Completed\s*</span>)"

replacement = r"""\1
                                {/* Circular Progress Tracker */}
                                <div style={{ position: 'relative', width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                                  <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="16"
                                      fill="none"
                                      stroke="#e2e8f0"
                                      strokeWidth="3.5"
                                    />
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="16"
                                      fill="none"
                                      stroke="#10b981"
                                      strokeWidth="3.5"
                                      strokeDasharray={`${(solvedCount / 10) * 100}, 100`}
                                      strokeLinecap="round"
                                      style={{ transition: 'stroke-dasharray 0.35s ease' }}
                                    />
                                  </svg>
                                  <span style={{ position: 'absolute', fontSize: '0.62rem', fontWeight: 800, color: '#1e293b' }}>
                                    {Math.round((solvedCount / 10) * 100)}%
                                  </span>
                                </div>"""

content_replaced = content[:start_idx] + new_dsa_data + content[end_idx:]

# Denominators (both 180 and 50 to 250)
content_replaced = content_replaced.replace("totalSolved / 180", "totalSolved / 250")
content_replaced = content_replaced.replace("totalSolved / 50", "totalSolved / 250")
content_replaced = content_replaced.replace("180 Problems Solved", "250 Problems Solved")
content_replaced = content_replaced.replace("50 Problems Solved", "250 Problems Solved")

new_content, count = re.subn(pattern, replacement, content_replaced)
if count > 0:
    print(f"Successfully added circular tracker in {count} locations!")
else:
    print("Warning: regex match failed!")

with open(path, "w", encoding="utf-8", newline="") as f:
    f.write(new_content)

print("Successfully replaced dsaSheetData and updated trackers!")
