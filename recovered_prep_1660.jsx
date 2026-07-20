Created At: 2026-07-17T09:09:07Z
Completed At: 2026-07-17T09:09:07Z
File Path: `file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/Preparation.jsx`
Total Lines: 2638
Total Bytes: 170195
Showing lines 1 to 100
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import React, { useState, useEffect, useRef } from 'react';
2: import { Link } from 'react-router-dom';
3: import Navbar from '../Components/navbar.jsx';
4: import { useAuth } from '../contexts/AuthContext.jsx';
5: import {
6:   Bot,
7:   Map,
8:   CheckSquare,
9:   GraduationCap,
10:   Play,
11:   CheckCircle2,
12:   Plus,
13:   Trash2,
14:   BookOpen,
15:   Award,
16:   Sparkles,
17:   ChevronRight,
18:   Mic,
19:   MicOff,
20:   UploadCloud,
21:   ChevronLeft,
22:   Flame,
23:   Trophy,
24:   ArrowUp,
25:   ArrowDown,
26:   Bell,
27:   Edit2,
28:   Binary,
29:   Code,
30:   Cpu,
31:   Database,
32:   Network
33: } from 'lucide-react';
34: import '../css/style.css';
35: 
36: const dsaSheetData = [
37:   {
38:     patternName: "Arrays & Hashing",
39:     problems: [
40:       { id: "arr1", name: "Two Sum", level: "Easy", leetcode: "https://leetcode.com/problems/two-sum/", gfg: "https://www.geeksforgeeks.org/problems/two-sum-closest-to-zero1725/1" },
41:       { id: "arr2", name: "Contains Duplicate", level: "Easy", leetcode: "https://leetcode.com/problems/contains-duplicate/", gfg: "https://www.geeksforgeeks.org/problems/duplicate-elements-in-array/1" },
42:       { id: "arr3", name: "Valid Anagram", level: "Easy", leetcode: "https://leetcode.com/problems/valid-anagram/", gfg: "https://www.geeksforgeeks.org/problems/check-if-two-strings-are-k-anagrams-or-not/1" },
43:       { id: "arr4", name: "Group Anagrams", level: "Medium", leetcode: "https://leetcode.com/problems/group-anagrams/", gfg: "https://www.geeksforgeeks.org/problems/print-anagrams-together/1" },
44:       { id: "arr5", name: "Top K Frequent Elements", level: "Medium", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/", gfg: "https://www.geeksforgeeks.org/problems/top-k-frequent-elements-in-array--150821/1" },
45:       { id: "arr6", name: "Product of Array Except Self", level: "Medium", leetcode: "https://leetcode.com/problems/product-of-array-except-self/", gfg: "https://www.geeksforgeeks.org/problems/a-difference-of-values-and-indexes0302/1" },
46:       { id: "arr7", name: "Longest Consecutive Sequence", level: "Medium", leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/", gfg: "https://www.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/1" },
47:       { id: "arr8", name: "First Missing Positive", level: "Hard", leetcode: "https://leetcode.com/problems/first-missing-positive/", gfg: "https://www.geeksforgeeks.org/problems/first-missing-positive-1587115620/1" },
48:       { id: "arr9", name: "Max Chunks To Make Sorted II", level: "Hard", leetcode: "https://leetcode.com/problems/max-chunks-to-make-sorted-ii/", gfg: "https://www.geeksforgeeks.org/problems/max-chunks-to-make-sorted-ii/1" },
49:       { id: "arr10", name: "Subarrays with K Different Integers", level: "Hard", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/", gfg: "https://www.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1" }
50:     ]
51:   },
52:   {
53:     patternName: "Two Pointers",
54:     problems: [
55:       { id: "two1", name: "Valid Palindrome", level: "Easy", leetcode: "https://leetcode.com/problems/valid-palindrome/", gfg: "https://www.geeksforgeeks.org/problems/string-palindromic-or-not1624/1" },
56:       { id: "two2", name: "Move Zeroes", level: "Easy", leetcode: "https://leetcode.com/problems/move-zeroes/", gfg: "https://www.geeksforgeeks.org/problems/move-all-zeroes-to-end-of-array0751/1" },
57:       { id: "two3", name: "Merge Sorted Array", level: "Easy", leetcode: "https://leetcode.com/problems/merge-sorted-array/", gfg: "https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1" },
58:       { id: "two4", name: "3Sum", level: "Medium", leetcode: "https://leetcode.com/problems/3sum/", gfg: "https://www.geeksforgeeks.org/problems/3-sum-closest/1" },
59:       { id: "two5", name: "Container With Most Water", level: "Medium", leetcode: "https://leetcode.com/problems/container-with-most-water/", gfg: "https://www.geeksforgeeks.org/problems/container-with-most-water5612/1" },
60:       { id: "two6", name: "Two Sum II - Sorted", level: "Medium", leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", gfg: "https://www.geeksforgeeks.org/problems/two-sum-closest-to-zero1725/1" },
61:       { id: "two7", name: "Remove Duplicates II", level: "Medium", leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/", gfg: "https://www.geeksforgeeks.org/problems/remove-duplicate-elements-from-sorted-array/1" },
62:       { id: "two8", name: "Trapping Rain Water", level: "Hard", leetcode: "https://leetcode.com/problems/trapping-rain-water/", gfg: "https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1" },
63:       { id: "two9", name: "Shortest Subarray Sum K", level: "Hard", leetcode: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", gfg: "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1" },
64:       { id: "two10", name: "Valid Palindrome II", level: "Hard", leetcode: "https://leetcode.com/problems/valid-palindrome-ii/", gfg: "https://www.geeksforgeeks.org/problems/palindrome-string0817/1" }
65:     ]
66:   },
67:   {
68:     patternName: "Sliding Window",
69:     problems: [
70:       { id: "sw1", name: "Buy & Sell Stock", level: "Easy", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", gfg: "https://www.geeksforgeeks.org/problems/best-time-to-buy-and-sell-stock-1619460144/1" },
71:       { id: "sw2", name: "Min Diff High/Low of K", level: "Easy", leetcode: "https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/", gfg: "https://www.geeksforgeeks.org/problems/minimum-difference-between-highest-and-lowest-of-k-scores/1" },
72:       { id: "sw3", name: "Defuse the Bomb", level: "Easy", leetcode: "https://leetcode.com/problems/defuse-the-bomb/", gfg: "https://www.geeksforgeeks.org/problems/defuse-the-bomb/1" },
73:       { id: "sw4", name: "Longest Substring No Repeat", level: "Medium", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", gfg: "https://www.geeksforgeeks.org/problems/longest-distinct-characters-in-string5848/1" },
74:       { id: "sw5", name: "Longest Repeat Char Replace", level: "Medium", leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement/", gfg: "https://www.geeksforgeeks.org/problems/longest-repeating-character-replacement/1" },
75:       { id: "sw6", name: "Permutation in String", level: "Medium", leetcode: "https://leetcode.com/problems/permutation-in-string/", gfg: "https://www.geeksforgeeks.org/problems/permutation-in-string/1" },
76:       { id: "sw7", name: "Min Size Subarray Sum", level: "Medium", leetcode: "https://leetcode.com/problems/minimum-size-subarray-sum/", gfg: "https://www.geeksforgeeks.org/problems/minimum-size-subarray-sum/1" },
77:       { id: "sw8", name: "Min Window Substring", level: "Hard", leetcode: "https://leetcode.com/problems/minimum-window-substring/", gfg: "https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1" },
78:       { id: "sw9", name: "Sliding Window Max", level: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-maximum/", gfg: "https://www.geeksforgeeks.org/problems/deques-and-maximum-size-subarrays/1" },
79:       { id: "sw10", name: "K Different Integers", level: "Hard", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/", gfg: "https://www.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1" }
80:     ]
81:   },
82:   {
83:     patternName: "Stack",
84:     problems: [
85:       { id: "stk1", name: "Valid Parentheses", level: "Easy", leetcode: "https://leetcode.com/problems/valid-parentheses/", gfg: "https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1" },
86:       { id: "stk2", name: "Implement Queue using Stacks", level: "Easy", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/", gfg: "https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1" },
87:       { id: "stk3", name: "Min Stack", level: "Easy", leetcode: "https://leetcode.com/problems/min-stack/", gfg: "https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1" },
88:       { id: "stk4", name: "Evaluate Reverse Polish", level: "Medium", leetcode: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", gfg: "https://www.geeksforgeeks.org/problems/evaluate-postfix-expression1413/1" },
89:       { id: "stk5", name: "Generate Parentheses", level: "Medium", leetcode: "https://leetcode.com/problems/generate-parentheses/", gfg: "https://www.geeksforgeeks.org/problems/generate-all-parentheses/1" },
90:       { id: "stk6", name: "Daily Temperatures", level: "Medium", leetcode: "https://leetcode.com/problems/daily-temperatures/", gfg: "https://www.geeksforgeeks.org/problems/daily-temperatures/1" },
91:       { id: "stk7", name: "Car Fleet", level: "Medium", leetcode: "https://leetcode.com/problems/car-fleet/", gfg: "https://www.geeksforgeeks.org/problems/car-fleet/1" },
92:       { id: "stk8", name: "Largest Rect in Histogram", level: "Hard", leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/", gfg: "https://www.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1" },
93:       { id: "stk9", name: "Maximal Rectangle", level: "Hard", leetcode: "https://leetcode.com/problems/maximal-rectangle/", gfg: "https://www.geeksforgeeks.org/problems/max-rectangular-area-in-binary-matrix/1" },
94:       { id: "stk10", name: "Basic Calculator", level: "Hard", leetcode: "https://leetcode.com/problems/basic-calculator/", gfg: "https://www.geeksforgeeks.org/problems/basic-calculator/1" }
95:     ]
96:   },
97:   {
98:     patternName: "Binary Search",
99:     problems: [
100:       { id: "bs1", name: "Binary Search", level: "Easy", leetcode: "https://leetcode.com/problems/binary-search/", gfg: "https://www.geeksforgeeks.org/problems/binary-search-1587115620/1" },
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
