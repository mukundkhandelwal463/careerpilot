import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Footer from '../Components/footer.jsx';
import Navbar from '../Components/navbar.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  Bot,
  Map,
  CheckSquare,
  GraduationCap,
  Play,
  CheckCircle2,
  Plus,
  Trash2,
  BookOpen,
  Award,
  Sparkles,
  ChevronRight,
  Mic,
  MicOff,
  UploadCloud,
  ChevronLeft,
  Flame,
  Trophy,
  ArrowUp,
  ArrowDown,
  Bell,
  Edit2,
  Binary,
  Code,
  Cpu,
  Database,
  Network,
  HelpCircle,
  Terminal,
  ClipboardList
} from 'lucide-react';
import { questionBankData } from '../data/questionBankData.js';
import { sql50Data } from '../data/sql50Data.js';
import '../css/style.css';

const dsaSheetData = [
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
      { id: "arr10", name: "Insert Delete GetRandom O(1) - Duplicates allowed", level: "Hard", leetcode: "https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/", gfg: "https://www.geeksforgeeks.org/problems/insert-delete-getrandom-o1-duplicates-allowed/1" },
    ]
  },
{
    patternName: "String",
    problems: [
      { id: "str1", name: "Reverse String", level: "Easy", leetcode: "https://leetcode.com/problems/reverse-string/", gfg: "https://www.geeksforgeeks.org/problems/reverse-a-string-using-stack/1" },
      { id: "str2", name: "First Unique Character", level: "Easy", leetcode: "https://leetcode.com/problems/first-unique-character-in-a-string/", gfg: "https://www.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1" },
      { id: "str3", name: "Fizz Buzz", level: "Easy", leetcode: "https://leetcode.com/problems/fizz-buzz/", gfg: "https://www.geeksforgeeks.org/problems/fizz-buzz-1650371427/1" },
      { id: "str4", name: "Longest Common Prefix", level: "Medium", leetcode: "https://leetcode.com/problems/longest-common-prefix/", gfg: "https://www.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1" },
      { id: "str5", name: "Reverse Words in String", level: "Medium", leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/", gfg: "https://www.geeksforgeeks.org/problems/reverse-words-in-a-given-string5405/1" },
      { id: "str6", name: "Multiply Strings", level: "Medium", leetcode: "https://leetcode.com/problems/multiply-strings/", gfg: "https://www.geeksforgeeks.org/problems/multiply-two-strings/1" },
      { id: "str7", name: "Longest Palindromic Substring", level: "Medium", leetcode: "https://leetcode.com/problems/longest-palindromic-substring/", gfg: "https://www.geeksforgeeks.org/problems/longest-palindrome-in-a-string1902/1" },
      { id: "str8", name: "Shortest Palindrome", level: "Hard", leetcode: "https://leetcode.com/problems/shortest-palindrome/", gfg: "https://www.geeksforgeeks.org/problems/shortest-palindrome/1" },
      { id: "str9", name: "Last Substring Lexicographical", level: "Hard", leetcode: "https://leetcode.com/problems/last-substring-in-lexicographical-order/", gfg: "https://www.geeksforgeeks.org/problems/last-substring-in-lexicographical-order/1" },
      { id: "str10", name: "Number of Atoms", level: "Hard", leetcode: "https://leetcode.com/problems/number-of-atoms/", gfg: "https://www.geeksforgeeks.org/problems/number-of-atoms/1" },
    ]
  },
{
    patternName: "Recursion",
    problems: [
      { id: "rec1", name: "Fibonacci Number", level: "Easy", leetcode: "https://leetcode.com/problems/fibonacci-number/", gfg: "https://www.geeksforgeeks.org/problems/fibonacci-series-up-to-nth-term/1" },
      { id: "rec2", name: "Power of Two", level: "Easy", leetcode: "https://leetcode.com/problems/power-of-two/", gfg: "https://www.geeksforgeeks.org/problems/power-of-2-1587115620/1" },
      { id: "rec3", name: "Merge Two Binary Trees", level: "Easy", leetcode: "https://leetcode.com/problems/merge-two-binary-trees/", gfg: "https://www.geeksforgeeks.org/problems/merge-two-binary-trees/1" },
      { id: "rec4", name: "Letter Combinations", level: "Medium", leetcode: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", gfg: "https://www.geeksforgeeks.org/problems/possible-words-from-phone-digits-1587115620/1" },
      { id: "rec5", name: "K-th Symbol in Grammar", level: "Medium", leetcode: "https://leetcode.com/problems/k-th-symbol-in-grammar/", gfg: "https://www.geeksforgeeks.org/problems/k-th-symbol-in-grammar/1" },
      { id: "rec6", name: "Decode String", level: "Medium", leetcode: "https://leetcode.com/problems/decode-string/", gfg: "https://www.geeksforgeeks.org/problems/decode-the-string2444/1" },
      { id: "rec7", name: "Combinations", level: "Medium", leetcode: "https://leetcode.com/problems/combinations/", gfg: "https://www.geeksforgeeks.org/problems/combinations/1" },
      { id: "rec8", name: "Tower of Hanoi", level: "Hard", leetcode: "https://leetcode.com/problems/tower-of-hanoi/", gfg: "https://www.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1" },
      { id: "rec9", name: "Remove Invalid Parentheses", level: "Hard", leetcode: "https://leetcode.com/problems/remove-invalid-parentheses/", gfg: "https://www.geeksforgeeks.org/problems/remove-invalid-parentheses/1" },
      { id: "rec10", name: "Expression Add Operators", level: "Hard", leetcode: "https://leetcode.com/problems/expression-add-operators/", gfg: "https://www.geeksforgeeks.org/problems/expression-add-operators/1" }
    ]
  },
    {
    patternName: "Sorting",
    problems: [
      { id: "srt1", name: "Selection Sort", level: "Easy", leetcode: "https://leetcode.com/problems/sort-an-array/", gfg: "https://www.geeksforgeeks.org/problems/selection-sort/1" },
      { id: "srt2", name: "Bubble Sort", level: "Easy", leetcode: "https://leetcode.com/problems/sort-an-array/", gfg: "https://www.geeksforgeeks.org/problems/bubble-sort/1" },
      { id: "srt3", name: "Insertion Sort", level: "Easy", leetcode: "https://leetcode.com/problems/sort-an-array/", gfg: "https://www.geeksforgeeks.org/problems/insertion-sort/1" },
      { id: "srt4", name: "Merge Sort", level: "Medium", leetcode: "https://leetcode.com/problems/sort-an-array/", gfg: "https://www.geeksforgeeks.org/problems/merge-sort/1" },
      { id: "srt5", name: "Quick Sort", level: "Medium", leetcode: "https://leetcode.com/problems/sort-an-array/", gfg: "https://www.geeksforgeeks.org/problems/quick-sort/1" },
      { id: "srt6", name: "Heap Sort", level: "Medium", leetcode: "https://leetcode.com/problems/sort-an-array/", gfg: "https://www.geeksforgeeks.org/problems/heap-sort/1" },
      { id: "srt7", name: "Sort Colors (Counting / Dutch Flag)", level: "Medium", leetcode: "https://leetcode.com/problems/sort-colors/", gfg: "https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4212/1" },
      { id: "srt8", name: "Cycle Sort (Find Duplicate Number)", level: "Medium", leetcode: "https://leetcode.com/problems/find-the-duplicate-number/", gfg: "https://www.geeksforgeeks.org/problems/find-the-duplicate-number/1" },
      { id: "srt9", name: "Bucket / Radix Sort (Maximum Gap)", level: "Hard", leetcode: "https://leetcode.com/problems/maximum-gap/", gfg: "https://www.geeksforgeeks.org/problems/maximum-gap/1" },
      { id: "srt10", name: "3-Way Merge Sort (Sort List)", level: "Hard", leetcode: "https://leetcode.com/problems/sort-list/", gfg: "https://www.geeksforgeeks.org/problems/sort-list/1" }
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
      { id: "two9", name: "Substring with Concatenation of All Words", level: "Hard", leetcode: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/", gfg: "https://www.geeksforgeeks.org/problems/substring-with-concatenation-of-all-words/1" },
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
      { id: "sw9", name: "Sliding Window Median", level: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-median/", gfg: "https://www.geeksforgeeks.org/problems/sliding-window-median/1" },
      { id: "sw10", name: "K Different Integers", level: "Hard", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/", gfg: "https://www.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1" }
    ]
  },
{
    patternName: "Stack",
    problems: [
      { id: "stk1", name: "Valid Parentheses", level: "Easy", leetcode: "https://leetcode.com/problems/valid-parentheses/", gfg: "https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1" },
      { id: "stk2", name: "Make The String Great", level: "Easy", leetcode: "https://leetcode.com/problems/make-the-string-great/", gfg: "https://www.geeksforgeeks.org/problems/make-the-string-great/1" },
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
    patternName: "Queues & Deques",
    problems: [
      { id: "que1", name: "Number of Recent Calls", level: "Easy", leetcode: "https://leetcode.com/problems/number-of-recent-calls/", gfg: "https://www.geeksforgeeks.org/problems/recent-calls/1" },
      { id: "que2", name: "Stack using Queues", level: "Easy", leetcode: "https://leetcode.com/problems/implement-stack-using-queues/", gfg: "https://www.geeksforgeeks.org/problems/stack-using-two-queues/1" },
      { id: "que3", name: "Queue using Stacks", level: "Easy", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/", gfg: "https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1" },
      { id: "que4", name: "Design Circular Queue", level: "Medium", leetcode: "https://leetcode.com/problems/design-circular-queue/", gfg: "https://www.geeksforgeeks.org/problems/design-circular-queue/1" },
      { id: "que5", name: "Reveal Cards In Increasing Order", level: "Medium", leetcode: "https://leetcode.com/problems/reveal-cards-in-increasing-order/", gfg: "https://www.geeksforgeeks.org/problems/reveal-cards-in-increasing-order/1" },
      { id: "que6", name: "Circular Deque", level: "Medium", leetcode: "https://leetcode.com/problems/design-circular-deque/", gfg: "https://www.geeksforgeeks.org/problems/design-circular-deque/1" },
      { id: "que7", name: "Dota2 Senate", level: "Medium", leetcode: "https://leetcode.com/problems/dota2-senate/", gfg: "https://www.geeksforgeeks.org/problems/dota2-senate/1" },
      { id: "que8", name: "Sliding Window Max", level: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-maximum/", gfg: "https://www.geeksforgeeks.org/problems/deques-and-maximum-size-subarrays/1" },
      { id: "que9", name: "Max Value of Equation", level: "Hard", leetcode: "https://leetcode.com/problems/max-value-of-equation/", gfg: "https://www.geeksforgeeks.org/problems/max-value-of-equation/1" },
      { id: "que10", name: "Shortest Subarray Sum K", level: "Hard", leetcode: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", gfg: "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1" }
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
    patternName: "Matrix / Grid",
    problems: [
      { id: "mat1", name: "Flood Fill", level: "Easy", leetcode: "https://leetcode.com/problems/flood-fill/", gfg: "https://www.geeksforgeeks.org/problems/flood-fill-algorithm1856/1" },
      { id: "mat2", name: "Shift 2D Grid", level: "Easy", leetcode: "https://leetcode.com/problems/shift-2d-grid/", gfg: "https://www.geeksforgeeks.org/problems/shift-2d-grid/1" },
      { id: "mat3", name: "Transpose Matrix", level: "Easy", leetcode: "https://leetcode.com/problems/transpose-of-matrix-1587115621/1", gfg: "https://www.geeksforgeeks.org/problems/transpose-of-matrix-1587115621/1" },
      { id: "mat4", name: "Search a 2D Matrix II", level: "Medium", leetcode: "https://leetcode.com/problems/search-a-2d-matrix-ii/", gfg: "https://www.geeksforgeeks.org/problems/search-in-a-matrix-1587115621/1" },
      { id: "mat5", name: "Spiral Matrix", level: "Medium", leetcode: "https://leetcode.com/problems/spiral-matrix/", gfg: "https://www.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1" },
      { id: "mat6", name: "Set Matrix Zeroes", level: "Medium", leetcode: "https://leetcode.com/problems/set-matrix-zeroes/", gfg: "https://www.geeksforgeeks.org/problems/boolean-matrix-problem-1587115620/1" },
      { id: "mat7", name: "Diagonal Traverse", level: "Medium", leetcode: "https://leetcode.com/problems/diagonal-traverse/", gfg: "https://www.geeksforgeeks.org/problems/diagonal-traverse/1" },
      { id: "mat8", name: "Shortest Path in Grid with Obstacles", level: "Hard", leetcode: "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/", gfg: "https://www.geeksforgeeks.org/problems/shortest-path-in-a-grid-with-obstacles-elimination/1" },
      { id: "mat9", name: "Longest Increasing Path", level: "Hard", leetcode: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", gfg: "https://www.geeksforgeeks.org/problems/longest-increasing-path-in-a-matrix/1" },
      { id: "mat10", name: "Cherry Pickup", level: "Hard", leetcode: "https://leetcode.com/problems/cherry-pickup/", gfg: "https://www.geeksforgeeks.org/problems/cherry-pickup/1" }
    ]
  },
{
    patternName: "Trees",
    problems: [
      { id: "tr1", name: "Invert Binary Tree", level: "Easy", leetcode: "https://leetcode.com/problems/invert-binary-tree/", gfg: "https://www.geeksforgeeks.org/problems/mirror-tree/1" },
      { id: "tr2", name: "Max Depth of Tree", level: "Easy", leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", gfg: "https://www.geeksforgeeks.org/problems/height-of-binary-tree/1" },
      { id: "tr3", name: "Same Tree", level: "Easy", leetcode: "https://leetcode.com/problems/determine-if-two-trees-are-identical/1", gfg: "https://www.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1" },
      { id: "tr4", name: "Level Order Traversal", level: "Medium", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/", gfg: "https://www.geeksforgeeks.org/problems/level-order-traversal/1" },
      { id: "tr5", name: "Lowest Common Ancestor of Binary Tree", level: "Medium", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", gfg: "https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1" },
      { id: "tr6", name: "Construct Preorder/Inorder", level: "Medium", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", gfg: "https://www.geeksforgeeks.org/problems/construct-tree-1/1" },
      { id: "tr7", name: "Path Sum II", level: "Medium", leetcode: "https://leetcode.com/problems/path-sum-ii/", gfg: "https://www.geeksforgeeks.org/problems/path-sum-ii-1642878486/1" },
      { id: "tr8", name: "Max Path Sum", level: "Hard", leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", gfg: "https://www.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1" },
      { id: "tr9", name: "Serialize/Deserialize Tree", level: "Hard", leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", gfg: "https://www.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1" },
      { id: "tr10", name: "Binary Tree Camera", level: "Hard", leetcode: "https://leetcode.com/problems/binary-tree-cameras/", gfg: "https://www.geeksforgeeks.org/problems/binary-tree-cameras/1" }
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
    patternName: "Tries",
    problems: [
      { id: "tri1", name: "Prefix Match", level: "Easy", leetcode: "https://leetcode.com/problems/search-suggestions-system/", gfg: "https://www.geeksforgeeks.org/problems/prefix-match-with-other-strings/1" },
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
      { id: "hp10", name: "The Skyline Problem", level: "Hard", leetcode: "https://leetcode.com/problems/the-skyline-problem/", gfg: "https://www.geeksforgeeks.org/problems/the-skyline-problem/1" },
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
      { id: "gr9", name: "Longest Cycle in a Graph", level: "Hard", leetcode: "https://leetcode.com/problems/longest-cycle-in-a-graph/", gfg: "https://www.geeksforgeeks.org/problems/longest-cycle-in-a-graph/1" },
      { id: "gr10", name: "Critical Connections", level: "Hard", leetcode: "https://leetcode.com/problems/critical-connections-in-a-network/", gfg: "https://www.geeksforgeeks.org/problems/critical-connections-in-a-network/1" }
    ]
  },
{
    patternName: "Advanced Graphs",
    problems: [
      { id: "adv1", name: "Prim MST Basic", level: "Easy", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "adv2", name: "Kruskal's MST (Connecting Cities)", level: "Easy", leetcode: "https://leetcode.com/problems/connecting-cities-with-minimum-cost/", gfg: "https://www.geeksforgeeks.org/problems/connecting-cities-with-minimum-cost/1" },
      { id: "adv3", name: "Eventual Safe States", level: "Easy", leetcode: "https://leetcode.com/problems/find-eventual-safe-states/", gfg: "https://www.geeksforgeeks.org/problems/eventual-safe-states/1" },
      { id: "adv4", name: "Network Delay Time", level: "Medium", leetcode: "https://leetcode.com/problems/network-delay-time/", gfg: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-adugested-shortest-path/1" },
      { id: "adv5", name: "Min Cost Connect Points", level: "Medium", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/", gfg: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
      { id: "adv6", name: "Cheapest Flights K Stops", level: "Medium", leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", gfg: "https://www.geeksforgeeks.org/problems/cheapest-flights-within-k-stops/1" },
      { id: "adv7", name: "Reconstruct Itinerary", level: "Medium", leetcode: "https://leetcode.com/problems/reconstruct-itinerary/", gfg: "https://www.geeksforgeeks.org/problems/reconstruct-itinerary/1" },
      { id: "adv8", name: "Alien Dictionary", level: "Hard", leetcode: "https://leetcode.com/problems/alien-dictionary/", gfg: "https://www.geeksforgeeks.org/problems/alien-dictionary/1" },
      { id: "adv9", name: "Word Ladder II", level: "Hard", leetcode: "https://leetcode.com/problems/word-ladder-ii/", gfg: "https://www.geeksforgeeks.org/problems/word-ladder-ii/1" },
      { id: "adv10", name: "Optimize Water Distribution", level: "Hard", leetcode: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/", gfg: "https://www.geeksforgeeks.org/problems/water-distribution/1" }
    ]
  },
{
    patternName: "Bit Manipulation",
    problems: [
      { id: "bit1", name: "Single Number", level: "Easy", leetcode: "https://leetcode.com/problems/single-number/", gfg: "https://www.geeksforgeeks.org/problems/single-number1014/1" },
      { id: "bit2", name: "Number of 1 Bits", level: "Easy", leetcode: "https://leetcode.com/problems/number-of-1-bits/", gfg: "https://www.geeksforgeeks.org/problems/set-bits0143/1" },
      { id: "bit3", name: "Counting Bits", level: "Easy", leetcode: "https://leetcode.com/problems/counting-bits/", gfg: "https://www.geeksforgeeks.org/problems/counting-bits/1" },
      { id: "bit4", name: "Single Number II", level: "Medium", leetcode: "https://leetcode.com/problems/single-number-ii/", gfg: "https://www.geeksforgeeks.org/problems/find-unique-element2632/1" },
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
      { id: "math4", name: "Valid Square", level: "Medium", leetcode: "https://leetcode.com/problems/valid-square/", gfg: "https://www.geeksforgeeks.org/problems/valid-square/1" },
      { id: "math5", name: "Angle Between Hands of a Clock", level: "Medium", leetcode: "https://leetcode.com/problems/angle-between-hands-of-a-clock/", gfg: "https://www.geeksforgeeks.org/problems/angle-between-hands-of-a-clock/1" },
      { id: "math6", name: "Factorial Trailing Zeroes", level: "Medium", leetcode: "https://leetcode.com/problems/factorial-trailing-zeroes/", gfg: "https://www.geeksforgeeks.org/problems/trailing-zeroes-in-factorial5134/1" },
      { id: "math7", name: "Pow(x, n)", level: "Medium", leetcode: "https://leetcode.com/problems/powx-n/", gfg: "https://www.geeksforgeeks.org/problems/power-of-numbers-1587115620/1" },
      { id: "math8", name: "Max Points on Line", level: "Hard", leetcode: "https://leetcode.com/problems/max-points-on-a-line/", gfg: "https://www.geeksforgeeks.org/problems/max-points-on-a-line/1" },
      { id: "math9", name: "Integer to English Words", level: "Hard", leetcode: "https://leetcode.com/problems/integer-to-english-words/", gfg: "https://www.geeksforgeeks.org/problems/number-to-words0335/1" },
      { id: "math10", name: "Basic Calculator II", level: "Hard", leetcode: "https://leetcode.com/problems/basic-calculator-ii/", gfg: "https://www.geeksforgeeks.org/problems/basic-calculator-ii/1" }
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
      { id: "ads1", name: "Range Sum Query", level: "Easy", leetcode: "https://leetcode.com/problems/range-sum-query-immutable/", gfg: "" },
      { id: "ads2", name: "Dynamic Range Sum", level: "Easy", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/", gfg: "" },
      { id: "ads3", name: "Union Find Basic", level: "Easy", leetcode: "https://leetcode.com/problems/number-of-provinces/", gfg: "https://www.geeksforgeeks.org/problems/disjoint-set-union-find/1" },
      { id: "ads4", name: "Mutable Segment Tree", level: "Medium", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/", gfg: "" },
      { id: "ads5", name: "Range Minimum Query", level: "Medium", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/", gfg: "" },
      { id: "ads6", name: "Fenwick Tree Basic", level: "Medium", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/", gfg: "" },
      { id: "ads7", name: "Redundant Connection", level: "Medium", leetcode: "https://leetcode.com/problems/redundant-connection/", gfg: "" },
      { id: "ads8", name: "Rectangle Area II", level: "Hard", leetcode: "https://leetcode.com/problems/rectangle-area-ii/", gfg: "" },
      { id: "ads9", name: "Smaller Numbers After Self", level: "Hard", leetcode: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", gfg: "" },
      { id: "ads10", name: "Range Sum Query 2D Mutable", level: "Hard", leetcode: "https://leetcode.com/problems/range-sum-query-2d-mutable/", gfg: "" }
    ]
  }
]

const dsaTheoryData = {
  "Arrays & Hashing": {
    why: "The most fundamental data structures. Arrays store elements contiguously in memory for O(1) random access, while Hash Maps provide O(1) average-case lookups, inserts, and deletes.",
    when: "Use arrays when you need indexed access or iteration. Use hash maps when you need to quickly check existence, count frequencies, or create mappings between values.",
    concepts: [
      "Hash Map / Hash Set — O(1) average lookup via key hashing",
      "Frequency Counting — count occurrences using a map",
      "Two-pass vs One-pass — trade space for fewer iterations",
      "Prefix Sum — precompute cumulative sums for range queries in O(1)",
      "Index Mapping — use value→index maps to find complements"
    ]
  },
  "String": {
    why: "Strings are character arrays with unique operations like pattern matching, reversal, and palindrome checking. Mastering string manipulation is critical for interviews.",
    when: "Use string techniques for text processing, parsing, pattern matching, anagram detection, and substring searches.",
    concepts: [
      "Two Pointer on Strings — compare characters from both ends",
      "StringBuilder / Array Join — efficient string concatenation in O(n)",
      "KMP / Rabin-Karp — pattern matching algorithms in O(n+m)",
      "Palindrome Check — expand from center or use two pointers",
      "Character Frequency Map — anagram and permutation problems"
    ]
  },
  "Recursion": {
    why: "Recursion breaks a problem into smaller subproblems of the same type. It's the foundation for trees, graphs, backtracking, and dynamic programming.",
    when: "Use recursion when the problem has a natural recursive structure — trees, nested structures, divide & conquer, or when exploring all possibilities.",
    concepts: [
      "Base Case + Recursive Case — every recursion needs a termination condition",
      "Call Stack — each call adds a frame; too deep causes stack overflow",
      "Divide & Conquer — split problem, solve halves, merge results",
      "Tail Recursion — optimize by making recursive call the last operation",
      "Memoization — cache results of repeated subproblems (leads to DP)"
    ]
  },
  "Sorting": {
    why: "Sorting is a fundamental tool for preprocessing datasets, converting unsorted searches to O(1) or O(log N) operations and matching duplicate states.",
    when: "Use sorting when you need to search for pairs efficiently, group similar values, search for rank statistics, or optimize interval bounds.",
    concepts: [
      "Comparison Sorts — Merge Sort, Quick Sort (O(N log N) bounds)",
      "Non-Comparison Sorts — Radix / Bucket Sort (O(N + K) bounds)",
      "Sorting Stability — preserving original relative order of duplicate elements",
      "Dutch National Flag — O(N) three-way partitioning",
      "Custom Comparators — sorting complex structures or string compositions"
    ]
  },
  "Two Pointers": {
    why: "Two pointers reduce O(n²) brute-force solutions to O(n) by using two indices that move toward or away from each other based on conditions.",
    when: "Use on sorted arrays/strings, when searching for pairs/triplets that satisfy a condition, or when partitioning data in-place.",
    concepts: [
      "Opposite Directional — start from both ends, move inward (e.g., palindrome, 2-sum sorted)",
      "Same Directional (Fast/Slow) — detect cycles, find middle, remove duplicates",
      "Three Pointers — extend to 3Sum by fixing one and using two-pointer on the rest",
      "Partitioning — Dutch National Flag for 3-way partition in O(n)",
      "In-place Modification — remove/move elements without extra space"
    ]
  },
  "Sliding Window": {
    why: "Sliding window maintains a dynamic range over an array/string to compute aggregates efficiently, reducing O(n²) to O(n).",
    when: "Use when the problem asks for a contiguous subarray/substring that satisfies a condition (max/min length, sum, distinct count).",
    concepts: [
      "Fixed Window — window size is given; slide and update in O(1) per step",
      "Variable Window — expand right to satisfy, shrink left to optimize",
      "Hash Map in Window — track character/element frequencies within the window",
      "Deque for Max/Min — maintain monotonic deque for O(1) window max/min",
      "At Most K Pattern — count subarrays with at-most-K using atMost(K) - atMost(K-1)"
    ]
  },
  "Stack": {
    why: "Stack follows LIFO (Last In, First Out). It's perfect for problems involving nested structures, matching brackets, and maintaining monotonic sequences.",
    when: "Use for expression evaluation, parenthesis matching, next greater/smaller element, and undo operations.",
    concepts: [
      "Monotonic Stack — maintain increasing/decreasing order to find next greater/smaller in O(n)",
      "Balanced Parentheses — push open brackets, pop and match on close",
      "Expression Evaluation — convert infix to postfix, then evaluate using stack",
      "Min Stack — maintain a parallel stack tracking the current minimum",
      "Stack + Greedy — remove characters/digits greedily using stack"
    ]
  },
  "Queues & Deques": {
    why: "Queue follows FIFO (First In, First Out). Deque supports O(1) insertion/removal from both ends, making it versatile for BFS and sliding window problems.",
    when: "Use queues for BFS traversal, task scheduling, and level-order processing. Use deques for sliding window max/min.",
    concepts: [
      "BFS with Queue — explore nodes level by level using a queue",
      "Monotonic Deque — maintain sorted order in deque for O(1) window queries",
      "Circular Queue — wrap around using modular arithmetic (front/rear pointers)",
      "Priority Queue vs Queue — PQ orders by priority, queue orders by arrival",
      "Double-ended Processing — process from both front and back efficiently"
    ]
  },
  "Linked List": {
    why: "Linked lists provide O(1) insertion/deletion at known positions without shifting elements. They test pointer manipulation skills extensively.",
    when: "Use for problems involving insertion/deletion at arbitrary positions, detecting cycles, reversing sequences, or merging sorted sequences.",
    concepts: [
      "Fast & Slow Pointer (Floyd's) — detect cycles, find middle node",
      "Reversal — iteratively reverse by rewiring next pointers (prev, curr, next)",
      "Dummy Head Node — simplify edge cases for insertion/deletion at head",
      "Merge Two Lists — compare heads, build sorted result iteratively",
      "In-place Reordering — reorder by splitting, reversing second half, then merging"
    ]
  },
  "Binary Search": {
    why: "Binary search achieves O(log n) by halving the search space each step. It works on any monotonic condition, not just sorted arrays.",
    when: "Use when the search space is sorted or has a monotonic property — finding boundaries, minimizing/maximizing values, or searching in rotated arrays.",
    concepts: [
      "Standard Binary Search — find target in sorted array using lo/hi pointers",
      "Lower/Upper Bound — find first/last occurrence using boundary conditions",
      "Search on Answer — binary search on the result space (e.g., minimize maximum)",
      "Rotated Array Search — identify which half is sorted, then decide direction",
      "2D Matrix Search — treat m×n matrix as a flat sorted array of m*n elements"
    ]
  },
  "Matrix / Grid": {
    why: "Matrix problems combine 2D array traversal with graph-like exploration (BFS/DFS on grids). They test multi-dimensional thinking.",
    when: "Use for grid traversal, flood fill, island counting, path finding, rotation, and spiral order problems.",
    concepts: [
      "DFS/BFS on Grid — treat each cell as a node with 4 directional neighbors",
      "Visited Tracking — mark cells visited in-place or with a set to avoid revisits",
      "Spiral Traversal — use 4 boundaries (top, bottom, left, right) and shrink inward",
      "In-place Rotation — transpose matrix then reverse each row for 90° rotation",
      "Dynamic Programming on Grid — accumulate min/max path costs cell by cell"
    ]
  },
  "Trees": {
    why: "Trees are hierarchical recursive structures. Binary trees are the most common — almost every tree problem uses recursion or BFS.",
    when: "Use for hierarchical data, expression parsing, search (BST), and when the problem involves parent-child relationships or levels.",
    concepts: [
      "DFS Traversals — Inorder (left-root-right), Preorder (root-left-right), Postorder (left-right-root)",
      "BFS / Level Order — use a queue to process nodes level by level",
      "Recursive Height/Depth — base case: null → 0, recurse: 1 + max(left, right)",
      "LCA (Lowest Common Ancestor) — find the split point where paths to two nodes diverge",
      "Tree Construction — build tree from traversal pairs (preorder+inorder, etc.)"
    ]
  },
  "Binary Search Tree (BST)": {
    why: "BSTs maintain sorted order: left < root < right. This enables O(log n) search, insert, and delete on balanced trees.",
    when: "Use when you need a dynamic sorted collection with efficient search, or for problems involving inorder traversal producing sorted output.",
    concepts: [
      "BST Property — left subtree < node < right subtree (for all nodes)",
      "Inorder Traversal = Sorted Order — validate BST or find kth smallest",
      "Search / Insert / Delete — O(h) operations where h is tree height",
      "Balancing — AVL / Red-Black trees guarantee O(log n) height",
      "BST from Sorted Array — pick middle as root for balanced construction"
    ]
  },
  "Tries": {
    why: "Tries (prefix trees) store strings character-by-character, enabling O(L) prefix lookups where L is the word length — faster than hash maps for prefix queries.",
    when: "Use for autocomplete, spell checking, prefix matching, word search in grids, and dictionary-based problems.",
    concepts: [
      "Trie Node Structure — children map (26 letters or hash map) + isEndOfWord flag",
      "Insert / Search / StartsWith — traverse character by character, O(L) each",
      "Word Search with Trie — DFS on grid using trie for efficient pruning",
      "Space Optimization — compressed tries (radix trees) merge single-child paths",
      "Counting Prefixes — store count at each node for prefix frequency queries"
    ]
  },
  "Heap / Priority Queue": {
    why: "Heaps provide O(1) access to the min/max element and O(log n) insertion/extraction. They're essential for problems needing repeated access to extreme values.",
    when: "Use for Top-K problems, median finding, merge K sorted lists, scheduling, and any problem needing efficient min/max tracking.",
    concepts: [
      "Min-Heap vs Max-Heap — parent ≤ children (min) or parent ≥ children (max)",
      "Heapify — build heap from array in O(n), not O(n log n)",
      "Top-K Pattern — use a min-heap of size K to find K largest elements",
      "Two Heaps for Median — max-heap for lower half, min-heap for upper half",
      "Lazy Deletion — mark elements as deleted instead of removing immediately"
    ]
  },
  "Backtracking": {
    why: "Backtracking systematically explores all possibilities by building solutions incrementally and abandoning (pruning) paths that can't lead to valid solutions.",
    when: "Use for combinatorial problems — generating permutations, combinations, subsets, solving constraint satisfaction (N-Queens, Sudoku).",
    concepts: [
      "Choose → Explore → Unchoose — the core backtracking template",
      "Pruning — skip branches early when constraints are violated",
      "Permutations vs Combinations — order matters vs order doesn't matter",
      "Subset Generation — include/exclude each element (2ⁿ possibilities)",
      "Constraint Satisfaction — place items (queens, numbers) and validate at each step"
    ]
  },
  "Greedy": {
    why: "Greedy algorithms make the locally optimal choice at each step, hoping it leads to a globally optimal solution. They're fast but only work when the greedy choice property holds.",
    when: "Use when the problem has optimal substructure AND the greedy choice property — interval scheduling, Huffman coding, minimum coins (specific denominations).",
    concepts: [
      "Greedy Choice Property — local optimal leads to global optimal",
      "Sorting First — many greedy solutions require sorting by a key (end time, ratio, etc.)",
      "Activity/Interval Selection — sort by end time, pick non-overlapping greedily",
      "Jump Game Pattern — track the farthest reachable position as you iterate",
      "Exchange Argument — prove greedy works by showing swapping doesn't improve"
    ]
  },
  "Intervals": {
    why: "Interval problems involve ranges [start, end] and their relationships (overlap, merge, gap). They commonly appear in scheduling and timeline problems.",
    when: "Use for meeting scheduling, merging overlapping ranges, finding free time, or inserting into sorted interval lists.",
    concepts: [
      "Sort by Start (or End) — prerequisite for most interval algorithms",
      "Overlap Detection — two intervals overlap if a.start < b.end AND b.start < a.end",
      "Merge Intervals — sort by start, extend end if overlapping, else add new interval",
      "Sweep Line — process events (start/end) in sorted order to track active intervals",
      "Min Rooms / Max Overlap — use a min-heap or sweep line to find peak concurrency"
    ]
  },
  "Graphs": {
    why: "Graphs model relationships between entities (nodes + edges). BFS and DFS are the two fundamental traversal algorithms for exploring graphs.",
    when: "Use for network problems, shortest paths, connected components, cycle detection, topological ordering, and any problem with pairwise relationships.",
    concepts: [
      "Adjacency List vs Matrix — list is O(V+E) space, matrix is O(V²)",
      "BFS — explore level by level using queue, finds shortest path in unweighted graphs",
      "DFS — explore as deep as possible using recursion/stack, good for cycle detection",
      "Topological Sort — order nodes so all edges go left→right (DAGs only, use Kahn's or DFS)",
      "Connected Components — run BFS/DFS from each unvisited node to find groups"
    ]
  },
  "Advanced Graphs": {
    why: "Advanced graph algorithms handle weighted edges, minimum spanning trees, and shortest paths — essential for optimization problems on networks.",
    when: "Use Dijkstra for shortest paths with positive weights, Bellman-Ford for negative weights, and Prim's/Kruskal's for minimum spanning trees.",
    concepts: [
      "Dijkstra's Algorithm — greedy shortest path using min-heap, O((V+E) log V)",
      "Bellman-Ford — handles negative weights, detects negative cycles, O(V·E)",
      "Prim's MST — grow tree by adding cheapest edge to unvisited node",
      "Kruskal's MST — sort edges, add if no cycle (use Union-Find), O(E log E)",
      "Union-Find (DSU) — track connected components with path compression + union by rank"
    ]
  },
  "Bit Manipulation": {
    why: "Bit operations (AND, OR, XOR, shift) work directly on binary representations, enabling O(1) tricks for parity, counting, and toggling.",
    when: "Use for problems involving powers of 2, single-number detection (XOR), subset enumeration, and optimizing space usage.",
    concepts: [
      "XOR Properties — a ^ a = 0, a ^ 0 = a → find the single unique number",
      "Bit Masking — use bits to represent sets; check/set/clear specific bits",
      "Count Set Bits — n & (n-1) removes the lowest set bit (Brian Kernighan's)",
      "Power of 2 Check — n > 0 && (n & (n-1)) === 0",
      "Subset Enumeration — iterate 0 to 2ⁿ-1, each number represents a subset"
    ]
  },
  "Math & Geometry": {
    why: "Mathematical patterns and geometric transformations appear frequently — modular arithmetic, matrix operations, and coordinate geometry.",
    when: "Use for problems involving number theory (primes, GCD), matrix rotation/spiral, coordinate calculations, and combinatorics.",
    concepts: [
      "Modular Arithmetic — (a+b) % m = ((a%m) + (b%m)) % m, prevents overflow",
      "GCD / LCM — Euclidean algorithm: gcd(a,b) = gcd(b, a%b)",
      "Matrix Rotation — transpose + reverse rows = 90° clockwise rotation",
      "Spiral Order — use 4 shrinking boundaries for spiral traversal",
      "Fast Exponentiation — compute xⁿ in O(log n) using repeated squaring"
    ]
  },
  "1-D DP": {
    why: "Dynamic programming solves problems with overlapping subproblems by storing results of subproblems. 1-D DP uses a single array to track states.",
    when: "Use when the problem has optimal substructure and overlapping subproblems — climbing stairs, house robber, coin change, longest subsequences.",
    concepts: [
      "State Definition — dp[i] = optimal answer for subproblem of size i",
      "Recurrence Relation — dp[i] = f(dp[i-1], dp[i-2], ...) based on problem logic",
      "Base Cases — dp[0], dp[1] are usually given or trivially computed",
      "Bottom-Up (Tabulation) — fill table iteratively from base cases up",
      "Space Optimization — if dp[i] depends only on dp[i-1] and dp[i-2], use two variables"
    ]
  },
  "2-D DP": {
    why: "2-D DP extends to problems with two changing dimensions — comparing two sequences, grid paths, or knapsack-style weight/value trade-offs.",
    when: "Use for LCS, edit distance, grid path counting, knapsack, regex matching, and problems where state depends on two indices.",
    concepts: [
      "State: dp[i][j] — represents optimal answer considering first i of one dimension and j of another",
      "LCS Pattern — dp[i][j] = dp[i-1][j-1]+1 if match, else max(dp[i-1][j], dp[i][j-1])",
      "Grid Paths — dp[i][j] = dp[i-1][j] + dp[i][j-1] for unique paths",
      "Knapsack Pattern — dp[i][w] = max(exclude item, include item if weight fits)",
      "Space Optimization — use previous row only, reduce O(m×n) to O(n) space"
    ]
  },
  "Design": {
    why: "Design problems test your ability to combine data structures creatively to meet specific time/space constraints for real-world systems.",
    when: "Use when building caches (LRU/LFU), data streams, randomized collections, or system components with specific API requirements.",
    concepts: [
      "LRU Cache — HashMap + Doubly Linked List for O(1) get/put with eviction",
      "LFU Cache — HashMap + frequency buckets with doubly linked lists",
      "Randomized O(1) — HashMap (val→index) + Array for O(1) insert/delete/getRandom",
      "Iterator Design — maintain pointer/stack state for lazy next()/hasNext()",
      "Data Stream Processing — maintain heaps, queues, or sorted structures for online queries"
    ]
  },
  "Advanced Data Structures": {
    why: "Segment trees, Fenwick trees, and Union-Find solve range query and dynamic connectivity problems that basic structures can't handle efficiently.",
    when: "Use segment trees for range sum/min/max queries with updates, Fenwick trees for prefix sums with point updates, and Union-Find for dynamic connectivity.",
    concepts: [
      "Segment Tree — divide array into segments; O(log n) range query and point update",
      "Fenwick Tree (BIT) — compact prefix sum structure; O(log n) update and query",
      "Union-Find (DSU) — union by rank + path compression for near O(1) per operation",
      "Lazy Propagation — defer updates in segment tree for O(log n) range updates",
      "Merge Sort Tree — segment tree with sorted lists at nodes for order-statistic queries"
    ]
  }
};

// ── OOPs Concept Tracker Data ──────────────────────────────────
const oopsTrackerData = [
  {
    categoryName: "Core Pillars",
    concepts: [
      { id: "classes_objects", name: "Classes & Objects" },
      { id: "encapsulation", name: "Encapsulation" },
      { id: "abstraction", name: "Abstraction & Abstract Classes" },
      { id: "inheritance", name: "Inheritance" },
      { id: "polymorphism", name: "Polymorphism (Overloading / Overriding)" }
    ]
  },
  {
    categoryName: "Class Internals",
    concepts: [
      { id: "constructors", name: "Constructors" },
      { id: "this_self_keyword", name: "this / self Keyword" },
      { id: "access_specifiers", name: "Access Specifiers & Modifiers" },
      { id: "class_attributes_methods", name: "Class Attributes & Methods" },
      { id: "friend_functions", name: "Friend Functions" }
    ]
  },
  {
    categoryName: "Inheritance & Dispatch",
    concepts: [
      { id: "super_keyword", name: "super / base Keyword" },
      { id: "interfaces", name: "Interfaces & Contracts" }
    ]
  },
  {
    categoryName: "Advanced OOP",
    concepts: [
      { id: "inner_classes", name: "Inner & Anonymous Classes" },
      { id: "templates_generics", name: "Templates / Generics" },
      { id: "enums", name: "Enums (Enumerations)" }
    ]
  },
  {
    categoryName: "Modules & I/O",
    concepts: [
      { id: "packages_modules", name: "Packages & Modules API" },
      { id: "file_handling", name: "File Handling (I/O)" },
      { id: "user_input_dates", name: "User Input & Date Handling" }
    ]
  }
]; 

// ── OS Concept Tracker Data ──────────────────────────────────────
const osTrackerData = [
  {
    categoryName: "Process Management",
    concepts: [
      { id: "os_process_thread", name: "Process vs Thread" },
      { id: "os_process_states", name: "Process States & PCB" },
      { id: "os_cpu_scheduling", name: "CPU Scheduling Algorithms" },
      { id: "os_context_switch", name: "Context Switching" },
      { id: "os_ipc", name: "Inter-Process Communication (IPC)" }
    ]
  },
  {
    categoryName: "Synchronization & Deadlock",
    concepts: [
      { id: "os_mutex_semaphore", name: "Mutex & Semaphores" },
      { id: "os_critical_section", name: "Critical Section Problem" },
      { id: "os_deadlock", name: "Deadlock (Conditions & Handling)" },
      { id: "os_producer_consumer", name: "Producer-Consumer Problem" },
      { id: "os_reader_writer", name: "Reader-Writer Problem" }
    ]
  },
  {
    categoryName: "Memory Management",
    concepts: [
      { id: "os_paging", name: "Paging" },
      { id: "os_segmentation", name: "Segmentation" },
      { id: "os_virtual_memory", name: "Virtual Memory" },
      { id: "os_page_replacement", name: "Page Replacement Algorithms" },
      { id: "os_thrashing", name: "Thrashing" }
    ]
  },
  {
    categoryName: "Storage & File Systems",
    concepts: [
      { id: "os_disk_scheduling", name: "Disk Scheduling (SCAN, SSTF, FCFS)" },
      { id: "os_file_system", name: "File System Structure" },
      { id: "os_raid", name: "RAID Levels" },
      { id: "os_io_management", name: "I/O Management" }
    ]
  }
];

// ── CN Concept Tracker Data ──────────────────────────────────────
const cnTrackerData = [
  {
    categoryName: "Network Models & Layers",
    concepts: [
      { id: "cn_osi_model", name: "OSI 7-Layer Model" },
      { id: "cn_tcp_ip_model", name: "TCP/IP Model" },
      { id: "cn_physical_layer", name: "Physical Layer & Transmission Media" },
      { id: "cn_data_link", name: "Data Link Layer (Framing, Error Detection)" },
      { id: "cn_network_layer", name: "Network Layer (IP, Routing)" }
    ]
  },
  {
    categoryName: "Transport & Application Layer",
    concepts: [
      { id: "cn_tcp_udp", name: "TCP vs UDP" },
      { id: "cn_3way_handshake", name: "Three-Way Handshake" },
      { id: "cn_flow_control", name: "Flow Control & Congestion Control" },
      { id: "cn_http_https", name: "HTTP vs HTTPS" },
      { id: "cn_dns", name: "DNS (Domain Name System)" }
    ]
  },
  {
    categoryName: "Addressing & Routing",
    concepts: [
      { id: "cn_ip_addressing", name: "IP Addressing (IPv4 vs IPv6)" },
      { id: "cn_subnetting", name: "Subnetting & CIDR" },
      { id: "cn_nat", name: "NAT (Network Address Translation)" },
      { id: "cn_routing_protocols", name: "Routing Protocols (OSPF, BGP, RIP)" },
      { id: "cn_arp", name: "ARP (Address Resolution Protocol)" }
    ]
  },
  {
    categoryName: "Security & Advanced Topics",
    concepts: [
      { id: "cn_firewalls", name: "Firewalls & VPN" },
      { id: "cn_ssl_tls", name: "SSL/TLS Encryption" },
      { id: "cn_socket_programming", name: "Socket Programming" },
      { id: "cn_dhcp", name: "DHCP (Dynamic Host Configuration)" }
    ]
  }
];

// ── DBMS & SQL 50 Concept Tracker Data ────────────────────────────
const dbmsTrackerData = [
  {
    isTheory: true,
    categoryName: "Relational Databases (RDBMS)",
    concepts: [
      { id: "dbms_rdbms_basics", name: "RDBMS Basics (MySQL & PostgreSQL)" },
      { id: "dbms_keys", name: "Keys (Primary, Foreign, Candidate, Unique)" },
      { id: "dbms_normalization", name: "Normalization & Normal Forms (1NF, 2NF, 3NF, BCNF)" },
      { id: "dbms_joins", name: "Joins (Inner, Left, Right, Full, Self Joins)" },
      { id: "dbms_indexes", name: "Indexes (B-Tree, Hash, Clustered vs Non-Clustered)" }
    ]
  },
  {
    isTheory: true,
    categoryName: "Transactions & Concurrency",
    concepts: [
      { id: "dbms_acid", name: "ACID Properties" },
      { id: "dbms_transactions", name: "Transaction Isolation Levels & Concurrency Anomalies" },
      { id: "dbms_locking", name: "Locking Protocols & Two-Phase Locking (2PL)" }
    ]
  },
  {
    isTheory: true,
    categoryName: "NoSQL Databases",
    concepts: [
      { id: "dbms_nosql_basics", name: "NoSQL Concepts & CAP Theorem" },
      { id: "dbms_mongodb", name: "MongoDB (Document Store, BSON, Aggregations)" },
      { id: "dbms_redis", name: "Redis (Caching Patterns)" }
    ]
  },
  {
    isTheory: true,
    categoryName: "Advanced DBMS Concepts",
    concepts: [
      { id: "dbms_storage_engines", name: "Database Storage Engines (InnoDB vs MyISAM)" },
      { id: "dbms_er_diagrams", name: "ER Diagrams & Schema Design" },
      { id: "dbms_views_ctes", name: "Views & Common Table Expressions (CTEs)" },
      { id: "dbms_procedures_triggers", name: "Stored Procedures, Functions & Triggers" }
    ]
  },
  {
    isSql: true,
    categoryName: "SQL 50: Select",
    topicName: "Select"
  },
  {
    isSql: true,
    categoryName: "SQL 50: Basic Joins",
    topicName: "Basic Joins"
  },
  {
    isSql: true,
    categoryName: "SQL 50: Aggregate Functions",
    topicName: "Aggregate Functions"
  },
  {
    isSql: true,
    categoryName: "SQL 50: Sorting and Grouping",
    topicName: "Sorting and Grouping"
  },
  {
    isSql: true,
    categoryName: "SQL 50: Advanced Select and Joins",
    topicName: "Advanced Select and Joins"
  },
  {
    isSql: true,
    categoryName: "SQL 50: Subqueries",
    topicName: "Subqueries"
  },
  {
    isSql: true,
    categoryName: "SQL 50: Advanced String Functions / Regex",
    topicName: "String Functions / Regex"
  }
];

// ── System Design Concept Tracker Data ───────────────────────────
const systemDesignTrackerData = [
  {
    categoryName: "Scalability & Load Balancing",
    concepts: [
      { id: "sys_scaling", name: "Horizontal vs Vertical Scaling" },
      { id: "sys_dns_load_balancing", name: "DNS & Load Balancing Algorithms" }
    ]
  },
  {
    categoryName: "Caching & Partitioning",
    concepts: [
      { id: "sys_caching", name: "Caching Strategies & CDNs" },
      { id: "sys_sharding", name: "Database Sharding & Consistent Hashing" }
    ]
  },
  {
    categoryName: "Databases & Replication",
    concepts: [
      { id: "sys_databases_sql_nosql", name: "SQL vs NoSQL Databases" },
      { id: "sys_replication_models", name: "Database Replication & Consensus" }
    ]
  },
  {
    categoryName: "Architecture & Streaming",
    concepts: [
      { id: "sys_consistency_cap", name: "CAP Theorem & PACELC" },
      { id: "sys_messaging_queues", name: "Message Queues & Event Streaming" }
    ]
  },
  {
    categoryName: "Microservices & Fault Tolerance",
    concepts: [
      { id: "sys_microservices", name: "Microservices & API Gateways" },
      { id: "sys_design_patterns", name: "Rate Limiting & Circuit Breakers" }
    ]
  },
  {
    categoryName: "Distributed Protocols & Transactions",
    concepts: [
      { id: "sys_communication_protocols", name: "Communication Protocols (gRPC, WebSockets, SSE)" },
      { id: "sys_distributed_transactions", name: "Distributed Transactions & Saga Pattern" }
    ]
  }
];

// Initialize Web Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Preparation = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('interview');
  
  // ── AI Interview Simulator State ────────────────────────────────
  const [resumeFile, setResumeFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [questionScores, setQuestionScores] = useState([]);
  const [interviewFeedback, setInterviewFeedback] = useState(null);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const recognitionRef = useRef(null);
  const [customModal, setCustomModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'alert',
    onConfirm: null
  });

  const showAlert = (title, message) => {
    setCustomModal({ isOpen: true, title, message, type: 'alert', onConfirm: null });
  };

  const showConfirm = (title, message, onConfirm) => {
    setCustomModal({ isOpen: true, title, message, type: 'confirm', onConfirm });
  };

  const closeModal = () => setCustomModal(prev => ({ ...prev, isOpen: false }));

  const [resultsData, setResultsData] = useState({ interviews: [], tests: [] });
  const [resultsLoading, setResultsLoading] = useState(false);
  const [resultsError, setResultsError] = useState(null);
  const [resultsActiveSubTab, setResultsActiveSubTab] = useState('tests');

  // Fetch results when tab switches to 'results'
  useEffect(() => {
    if (activeTab === 'results' && user) {
      const fetchResults = async () => {
        setResultsLoading(true);
        setResultsError(null);
        try {
          const res = await fetch(`/api/results/list?email=${encodeURIComponent(user.email)}`);
          const data = await res.json();
          if (data.success) {
            setResultsData({ interviews: data.interviews, tests: data.tests });
          } else {
            setResultsError(data.error || 'Failed to load results.');
          }
        } catch (err) {
          setResultsError('Failed to load results due to network issue.');
        } finally {
          setResultsLoading(false);
        }
      };
      fetchResults();
    }
  }, [activeTab, user]);

  // ── CSE Special / DSA Sheet States ──────────────────────────────
  const [selectedCseSubject, setSelectedCseSubject] = useState('dsa');
  const [dsaCompletedProblems, setDsaCompletedProblems] = useState({});
  const [dsaOpenPatterns, setDsaOpenPatterns] = useState({ "Arrays & Hashing": true });
  const [expandedMCQConcepts, setExpandedMCQConcepts] = useState({});
  const [trackerMCQAnswers, setTrackerMCQAnswers] = useState({});
  const [trackerMCQExplanations, setTrackerMCQExplanations] = useState({});

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`dsa_sheet_progress_${user.email}`);
      setDsaCompletedProblems(saved ? JSON.parse(saved) : {});
    }
  }, [user]);

  const toggleDsaProblem = (problemId) => {
    const updated = { ...dsaCompletedProblems };
    updated[problemId] = !updated[problemId];
    setDsaCompletedProblems(updated);
    if (user) {
      localStorage.setItem(`dsa_sheet_progress_${user.email}`, JSON.stringify(updated));
    }
  };

  const toggleDsaPattern = (patternName) => {
    setDsaOpenPatterns(prev => ({
      ...prev,
      [patternName]: !prev[patternName]
    }));
  };

  // ── OOPs Concept Tracker States ─────────────────────────────────
  const [oopsCompletedConcepts, setOopsCompletedConcepts] = useState({});
  const [oopsOpenCategories, setOopsOpenCategories] = useState({ "Core Pillars": true });

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`oops_tracker_progress_${user.email}`);
      setOopsCompletedConcepts(saved ? JSON.parse(saved) : {});
    }
  }, [user]);

  const toggleOopsConcept = (conceptId) => {
    const updated = { ...oopsCompletedConcepts };
    updated[conceptId] = !updated[conceptId];
    setOopsCompletedConcepts(updated);
    if (user) {
      localStorage.setItem(`oops_tracker_progress_${user.email}`, JSON.stringify(updated));
    }
  };

  const toggleOopsCategory = (categoryName) => {
    setOopsOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // ── OS Concept Tracker States ───────────────────────────────────
  const [osCompletedConcepts, setOsCompletedConcepts] = useState({});
  const [osOpenCategories, setOsOpenCategories] = useState({ "Process Management": true });

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`os_tracker_progress_${user.email}`);
      setOsCompletedConcepts(saved ? JSON.parse(saved) : {});
    }
  }, [user]);

  const toggleOsConcept = (conceptId) => {
    const updated = { ...osCompletedConcepts };
    updated[conceptId] = !updated[conceptId];
    setOsCompletedConcepts(updated);
    if (user) {
      localStorage.setItem(`os_tracker_progress_${user.email}`, JSON.stringify(updated));
    }
  };

  const toggleOsCategory = (categoryName) => {
    setOsOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // ── CN Concept Tracker States ───────────────────────────────────
  const [cnCompletedConcepts, setCnCompletedConcepts] = useState({});
  const [cnOpenCategories, setCnOpenCategories] = useState({ "Network Models & Layers": true });

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`cn_tracker_progress_${user.email}`);
      setCnCompletedConcepts(saved ? JSON.parse(saved) : {});
    }
  }, [user]);

  const toggleCnConcept = (conceptId) => {
    const updated = { ...cnCompletedConcepts };
    updated[conceptId] = !updated[conceptId];
    setCnCompletedConcepts(updated);
    if (user) {
      localStorage.setItem(`cn_tracker_progress_${user.email}`, JSON.stringify(updated));
    }
  };

  const toggleCnCategory = (categoryName) => {
    setCnOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // ── DBMS Concept Tracker States ─────────────────────────────────
  const [dbmsCompletedConcepts, setDbmsCompletedConcepts] = useState({});
  const [dbmsOpenCategories, setDbmsOpenCategories] = useState({ "Relational Databases (RDBMS)": true });

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`dbms_tracker_progress_${user.email}`);
      setDbmsCompletedConcepts(saved ? JSON.parse(saved) : {});
    }
  }, [user]);

  const toggleDbmsConcept = (conceptId) => {
    const updated = { ...dbmsCompletedConcepts };
    updated[conceptId] = !updated[conceptId];
    setDbmsCompletedConcepts(updated);
    if (user) {
      localStorage.setItem(`dbms_tracker_progress_${user.email}`, JSON.stringify(updated));
    }
  };

  const toggleDbmsCategory = (categoryName) => {
    setDbmsOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // ── SQL 50 Tracker States ───────────────────────────────────────
  const [sqlCompletedQuestions, setSqlCompletedQuestions] = useState({});
  const [expandedSqlQuestions, setExpandedSqlQuestions] = useState({});
  const [sqlSearchQuery, setSqlSearchQuery] = useState('');
  const [sqlFilterTopic, setSqlFilterTopic] = useState('All');
  const [sqlFilterDifficulty, setSqlFilterDifficulty] = useState('All');

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`sql50_progress_${user.email}`);
      setSqlCompletedQuestions(saved ? JSON.parse(saved) : {});
    }
  }, [user]);

  const toggleSqlQuestion = (qId) => {
    const updated = { ...sqlCompletedQuestions };
    updated[qId] = !updated[qId];
    setSqlCompletedQuestions(updated);
    if (user) {
      localStorage.setItem(`sql50_progress_${user.email}`, JSON.stringify(updated));
    }
  };

  // ── System Design Tracker States ────────────────────────────────
  const [sysCompletedConcepts, setSysCompletedConcepts] = useState({});
  const [sysOpenCategories, setSysOpenCategories] = useState({ "Scalability & Load Balancing": true });

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`sys_tracker_progress_${user.email}`);
      setSysCompletedConcepts(saved ? JSON.parse(saved) : {});
    }
  }, [user]);

  const toggleSysConcept = (conceptId) => {
    const updated = { ...sysCompletedConcepts };
    updated[conceptId] = !updated[conceptId];
    setSysCompletedConcepts(updated);
    if (user) {
      localStorage.setItem(`sys_tracker_progress_${user.email}`, JSON.stringify(updated));
    }
  };

  const toggleSysCategory = (categoryName) => {
    setSysOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // ── Career Roadmap State ────────────────────────────────────────
  const [roadmapResumeFile, setRoadmapResumeFile] = useState(null);
  const [targetRole, setTargetRole] = useState(() => localStorage.getItem("active_target_role") || '');
  const [targetJd, setTargetJd] = useState('');
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [careerRoadmap, setCareerRoadmap] = useState(() => {
    const saved = localStorage.getItem("active_career_roadmap");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });

  // ── Task Tracker & Calendar States ──────────────────────────────
  const getLocalDateString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
  };

  const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date()));
  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [addingSubtaskFor, setAddingSubtaskFor] = useState(null);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const [timeLeft, setTimeLeft] = useState('04:17:41 left');
  const [overdueReminder, setOverdueReminder] = useState('');

  const [scheduledTasks, setScheduledTasks] = useState(() => {
    const saved = localStorage.getItem("scheduled_tasks");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {};
  });

  const [editingTaskFor, setEditingTaskFor] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [editingSubtaskFor, setEditingSubtaskFor] = useState(null);
  const [editSubtaskText, setEditSubtaskText] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  useEffect(() => {
    localStorage.setItem("scheduled_tasks", JSON.stringify(scheduledTasks));
  }, [scheduledTasks]);

  useEffect(() => {
    if (careerRoadmap) {
      localStorage.setItem("active_career_roadmap", JSON.stringify(careerRoadmap));
      if (targetRole) {
        localStorage.setItem("active_target_role", targetRole);
      }
    } else {
      localStorage.removeItem("active_career_roadmap");
      localStorage.removeItem("active_target_role");
    }
  }, [careerRoadmap, targetRole]);

  // Countdown timer to midnight
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diffMs = endOfDay.getTime() - now.getTime();
      if (diffMs > 0) {
        const hrs = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
        const mins = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const secs = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, '0');
        setTimeLeft(`${hrs}:${mins}:${secs} left`);
      } else {
        setTimeLeft('00:00:00 left');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const emailSentRef = useRef(false);

  // Check for missed tasks from past days
  useEffect(() => {
    const todayStr = getLocalDateString(new Date());
    const pastMissed = Object.keys(scheduledTasks).filter(d => {
      if (d < todayStr) {
        return (scheduledTasks[d] || []).some(t => !t.completed);
      }
      return false;
    });

    if (pastMissed.length > 0) {
      const missedDates = pastMissed.map(d => new Date(d).getDate()).sort((a, b) => a - b);
      const missedDatesStr = missedDates.join(', ');
      setOverdueReminder(`⚠ Reminder: You missed tasks scheduled for July ${missedDatesStr}! Keep your streak alive.`);
      
      // 1. Add notification warning to navbar bell dropdown
      const savedNotifs = localStorage.getItem("app_notifications");
      let notifsList = [];
      if (savedNotifs) {
        try {
          notifsList = JSON.parse(savedNotifs);
        } catch (e) { }
      }

      const notifText = `⚠ You have incomplete preparation tasks from past days (${missedDatesStr})!`;
      if (!notifsList.some(n => n.text === notifText)) {
        notifsList.unshift({
          id: Date.now(),
          text: notifText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        localStorage.setItem("app_notifications", JSON.stringify(notifsList));
        localStorage.setItem("has_unread_notifications", "true");
        window.dispatchEvent(new Event("new_scan_notification"));
      }

      // 2. Trigger email SMTP dispatch via API ONLY at 5 PM and ONLY once per day
      const now = new Date();
      const lastEmailDate = localStorage.getItem("last_email_reminder_date");
      if (now.getHours() === 17 && lastEmailDate !== todayStr) {
        localStorage.setItem("last_email_reminder_date", todayStr);
        fetch('/api/interview/notify-overdue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ missed_dates: missedDates })
        })
          .then(res => res.json())
          .then(data => {
            console.log("[Notification API]", data.message);
          })
          .catch(err => console.error("[Notification API Error]", err));

        // Request browser notification permission and send alert
        if (Notification && Notification.permission !== 'granted') {
          Notification.requestPermission();
        }
        if (Notification && Notification.permission === 'granted') {
          new Notification("AI Career Hub Tracker", {
            body: `You have incomplete preparation tasks from past days (${missedDatesStr})!`,
          });
        }
      }
    } else {
      setOverdueReminder('');
    }
  }, [scheduledTasks]);

  // Import Tasks from generated roadmap
  const handleImportRoadmapTasks = () => {
    if (!careerRoadmap || !careerRoadmap.levels) {
      showAlert("Roadmap Required", "Please generate a Career Roadmap first.");
      return;
    }

    const updated = { ...scheduledTasks };
    // Start generating tasks from today
    let currentDate = new Date();

    careerRoadmap.levels.forEach((lvl) => {
      // Determine duration in days
      let weeks = 1;
      const match = (lvl.duration || '').match(/(\d+)/);
      if (match) weeks = parseInt(match[1]);
      const daysInLevel = weeks * 7;

      const topics = lvl.topics || [];
      if (topics.length === 0) return;

      // Spread 2 topics per day over the entire duration of the level
      for (let i = 0; i < daysInLevel; i++) {
        const dateStr = getLocalDateString(currentDate);
        if (!updated[dateStr]) {
          updated[dateStr] = [];
        }

        // Cycle through the available topics
        const t1Index = (i * 2) % topics.length;
        const t2Index = (i * 2 + 1) % topics.length;

        updated[dateStr].push({
          id: Date.now() + Math.random(),
          text: `[Roadmap Level ${lvl.level}] ${topics[t1Index]}`,
          completed: false
        });

        // Make sure we don't duplicate if there's only 1 topic
        if (topics.length > 1) {
          updated[dateStr].push({
            id: Date.now() + Math.random(),
            text: `[Roadmap Level ${lvl.level}] ${topics[t2Index]}`,
            completed: false
          });
        }

        // Advance to the next real calendar day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    setScheduledTasks(updated);
    showAlert("Success", "Roadmap steps imported successfully as study tasks!");
  };

  // Speech Recognition hook setup
  useEffect(() => {
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer(transcript);
      };

      rec.onerror = (e) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setUserAnswer('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Upload and Parse Resume for interview
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeFile(file);
    setIsParsing(true);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('/api/interview/start', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.questions) {
        setQuestions(data.questions);
        setInterviewStarted(true);
        setCurrentQuestionIdx(0);
        setQuestionScores([]);
        setInterviewCompleted(false);
        setInterviewFeedback(null);
      } else {
        showAlert('Error', data.error || "Failed to start interview from resume.");
      }
    } catch (err) {
      console.error(err);
      showAlert('Error', "An error occurred during resume parsing.");
    } finally {
      setIsParsing(false);
    }
  };

  const startFallbackInterview = async () => {
    setIsParsing(true);
    try {
      const res = await fetch('/api/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: "General Software Developer Resume with Javascript, SQL, Python" }),
      });
      const data = await res.json();
      if (data.success && data.questions) {
        setQuestions(data.questions);
        setInterviewStarted(true);
        setCurrentQuestionIdx(0);
        setQuestionScores([]);
        setInterviewCompleted(false);
        setInterviewFeedback(null);
      } else {
        showAlert('Error', data.error || "Failed to start fallback interview.");
      }
    } catch (err) {
      console.error(err);
      showAlert('Error', "An error occurred starting the interview.");
    } finally {
      setIsParsing(false);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setIsGrading(true);
    const questionObj = questions[currentQuestionIdx];

    try {
      const res = await fetch('/api/interview/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionObj.question,
          response: userAnswer.trim(),
        }),
      });
      const data = await res.json();
      if (data.success && data.evaluation) {
        const evalResult = data.evaluation;
        setInterviewFeedback(evalResult);

        setQuestionScores([
          ...questionScores,
          {
            id: questionObj.id,
            type: questionObj.type,
            question: questionObj.question,
            score: evalResult.score,
            userAnswer: userAnswer.trim(),
            feedback: evalResult
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGrading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setUserAnswer('');
      setInterviewFeedback(null);
    } else {
      setInterviewCompleted(true);
    }
  };

  const handleEndInterview = () => {
    showConfirm("End Interview", "Are you sure you want to end the interview now? Your final score will be calculated based on the questions answered so far.", () => {
      setInterviewCompleted(true);
    });
  };

  const handleRestartInterview = () => {
    setInterviewStarted(false);
    setInterviewCompleted(false);
    setQuestions([]);
    setQuestionScores([]);
    setInterviewFeedback(null);
    setUserAnswer('');
    setSaveStatus('');
    if (user) {
      localStorage.removeItem(`active_interview_state_${user.email}`);
    }
  };

  useEffect(() => {
    if (interviewCompleted && questionScores.length > 0) {
      saveFinalScore();
    }
  }, [interviewCompleted]);

  const saveFinalScore = async () => {
    if (questionScores.length === 0) return;
    const total = questionScores.reduce((sum, item) => sum + item.score, 0);
    const avgScore = Math.round(total / questionScores.length);

    setSaveStatus('Saving...');
    try {
      const res = await fetch('/api/interview/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          score: avgScore,
          transcript: questionScores,
          feedback: questionScores.map(q => q.feedback?.feedback || '').join(' ')
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus('Saved Successfully! Check dashboard.');
        if (user) {
          user.interview_score = avgScore;
        }
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('Network error.');
    }
  };

  // Roadmap request triggers
  const handleGenerateRoadmap = async (e) => {
    e.preventDefault();
    if (!targetRole.trim()) {
      alert("Please enter what role you want to be.");
      return;
    }

    setIsGeneratingRoadmap(true);
    const formData = new FormData();
    if (roadmapResumeFile) {
      formData.append('resume', roadmapResumeFile);
    }
    formData.append('target_role', targetRole.trim());
    formData.append('job_description', targetJd.trim());

    try {
      const res = await fetch('/api/interview/roadmap', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.roadmap) {
        setCareerRoadmap(data.roadmap);
        showAlert('Success', 'Career roadmap generated successfully!');
      } else {
        showAlert('Error', 'Failed to generate roadmap. Please try again.');
      }
    } catch (err) {
      console.error(err);
      showAlert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  // ── Task Tracker Actions ────────────────────────────────────────
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const dayTasks = [...(scheduledTasks[selectedDate] || [])];
    dayTasks.push({
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      subtasks: []
    });

    setScheduledTasks({ ...scheduledTasks, [selectedDate]: dayTasks });
    setNewTaskText('');
  };

  const handleAddSubtask = (e, taskId) => {
    e.preventDefault();
    if (!newSubtaskText.trim()) return;

    const dayTasks = (scheduledTasks[selectedDate] || []).map(t => {
      if (t.id === taskId) {
        const subs = t.subtasks || [];
        return {
          ...t,
          subtasks: [...subs, { id: Date.now(), text: newSubtaskText.trim(), completed: false }]
        };
      }
      return t;
    });

    setScheduledTasks({ ...scheduledTasks, [selectedDate]: dayTasks });
    setNewSubtaskText('');
    setAddingSubtaskFor(null);
  };

  const handleEditTaskStart = (taskId, text) => {
    setEditingTaskFor(taskId);
    setEditTaskText(text);
  };

  const handleSaveEditTask = (e, taskId) => {
    e.preventDefault();
    if (!editTaskText.trim()) return;

    const dayTasks = (scheduledTasks[selectedDate] || []).map(t =>
      t.id === taskId ? { ...t, text: editTaskText.trim() } : t
    );
    setScheduledTasks({ ...scheduledTasks, [selectedDate]: dayTasks });
    setEditingTaskFor(null);
  };

  const handleEditSubtaskStart = (subtaskId, text) => {
    setEditingSubtaskFor(subtaskId);
    setEditSubtaskText(text);
  };

  const handleSaveEditSubtask = (e, taskId, subtaskId) => {
    e.preventDefault();
    if (!editSubtaskText.trim()) return;

    const dayTasks = (scheduledTasks[selectedDate] || []).map(t => {
      if (t.id === taskId) {
        const subs = (t.subtasks || []).map(sub =>
          sub.id === subtaskId ? { ...sub, text: editSubtaskText.trim() } : sub
        );
        return { ...t, subtasks: subs };
      }
      return t;
    });
    setScheduledTasks({ ...scheduledTasks, [selectedDate]: dayTasks });
    setEditingSubtaskFor(null);
  };

  const deleteSubtask = (date, taskId, subtaskId) => {
    const dayTasks = (scheduledTasks[date] || []).map(t => {
      if (t.id === taskId) {
        const subs = (t.subtasks || []).filter(sub => sub.id !== subtaskId);
        const allSubsCompleted = subs.length > 0 && subs.every(sub => sub.completed);
        return { ...t, subtasks: subs, completed: subs.length > 0 ? allSubsCompleted : t.completed };
      }
      return t;
    });
    setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
  };

  const moveSubtask = (date, taskId, subtaskIdx, direction) => {
    const dayTasks = (scheduledTasks[date] || []).map(t => {
      if (t.id === taskId) {
        const subs = [...(t.subtasks || [])];
        if (direction === 'up' && subtaskIdx > 0) {
          const temp = subs[subtaskIdx];
          subs[subtaskIdx] = subs[subtaskIdx - 1];
          subs[subtaskIdx - 1] = temp;
        } else if (direction === 'down' && subtaskIdx < subs.length - 1) {
          const temp = subs[subtaskIdx];
          subs[subtaskIdx] = subs[subtaskIdx + 1];
          subs[subtaskIdx + 1] = temp;
        }
        return { ...t, subtasks: subs };
      }
      return t;
    });
    setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
  };

  const toggleTask = (date, id) => {
    const dayTasks = (scheduledTasks[date] || []).map(t => {
      if (t.id === id) {
        const newCompleted = !t.completed;
        const newSubs = (t.subtasks || []).map(sub => ({ ...sub, completed: newCompleted }));
        return { ...t, completed: newCompleted, subtasks: newSubs };
      }
      return t;
    });
    setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
  };

  const toggleSubtask = (date, taskId, subtaskId) => {
    const dayTasks = (scheduledTasks[date] || []).map(t => {
      if (t.id === taskId) {
        const subs = (t.subtasks || []).map(sub =>
          sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
        );
        const allSubsCompleted = subs.length > 0 && subs.every(sub => sub.completed);
        return { ...t, subtasks: subs, completed: allSubsCompleted };
      }
      return t;
    });
    setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
  };

  const deleteTask = (date, id) => {
    const dayTasks = (scheduledTasks[date] || []).filter(t => t.id !== id);
    setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
  };

  const moveTask = (date, index, direction) => {
    const dayTasks = [...(scheduledTasks[date] || [])];
    if (direction === 'up' && index > 0) {
      const temp = dayTasks[index];
      dayTasks[index] = dayTasks[index - 1];
      dayTasks[index - 1] = temp;
    } else if (direction === 'down' && index < dayTasks.length - 1) {
      const temp = dayTasks[index];
      dayTasks[index] = dayTasks[index + 1];
      dayTasks[index + 1] = temp;
    }
    setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
  };

  const menuItems = [
    { id: 'interview', label: 'AI Interview', icon: <Bot className="size-5" /> },
    { id: 'roadmap', label: 'Career roadmap', icon: <Map className="size-5" /> },
    { id: 'tracker', label: 'Task Tracker', icon: <CheckSquare className="size-5" /> },
    { id: 'cse', label: 'CSE Special', icon: <GraduationCap className="size-5" /> },
    { id: 'mocktest', label: 'Mock Test', icon: <ClipboardList className="size-5" /> },
    { id: 'results', label: 'Results', icon: <Award className="size-5" /> },
  ];

  // Calculated average score
  const finalAverageScore = questionScores.length > 0
    ? Math.round(questionScores.reduce((sum, item) => sum + item.score, 0) / questionScores.length)
    : 0;

  // ── Dynamic Streak Calculator ──
  const calculateStreak = () => {
    const activeDates = Object.keys(scheduledTasks).filter(d => (scheduledTasks[d] || []).length > 0);
    if (activeDates.length === 0) return { current: 0, best: 0 };

    const completedDates = Object.keys(scheduledTasks).filter(d => {
      const dayTasks = scheduledTasks[d] || [];
      return dayTasks.length > 0 && dayTasks.every(t => t.completed);
    }).sort();

    if (completedDates.length === 0) return { current: 0, best: 0 };

    let current = 0;
    let best = 0;
    let temp = 0;

    const dates = completedDates.map(d => new Date(d));

    // Best Streak
    for (let i = 0; i < dates.length; i++) {
      if (i === 0) {
        temp = 1;
      } else {
        const diffTime = Math.abs(dates[i] - dates[i - 1]);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          temp++;
        } else if (diffDays > 1) {
          if (temp > best) best = temp;
          temp = 1;
        }
      }
    }
    if (temp > best) best = temp;

    // Current Streak (consecutive backwards from selectedDate)
    let checkDateStr = selectedDate;
    let currentStreakCount = 0;
    while (completedDates.includes(checkDateStr)) {
      currentStreakCount++;
      const d = new Date(checkDateStr);
      d.setDate(d.getDate() - 1);
      checkDateStr = d.toISOString().split('T')[0];
    }

    return {
      current: currentStreakCount,
      best: Math.max(best, currentStreakCount)
    };
  };

  const { current: currentStreak, best: bestStreak } = calculateStreak();


  // Generate calendar days dynamically based on calendarViewDate
  const currentYear = calendarViewDate.getFullYear();
  const currentMonth = calendarViewDate.getMonth();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    calendarDays.push(d);
  }

  // Check if a day has completed tasks to render icon/status
  const getDayStatus = (day) => {
    if (!day) return null;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTasks = scheduledTasks[dateStr] || [];
    if (dayTasks.length === 0) return null;
    const allDone = dayTasks.every(t => t.completed);

    // Custom checkmark/heart labels to match image layout
    if (allDone) {
      if ([2, 4].includes(day)) return 'heart';
      return 'check';
    }
    return null;
  };

  const handlePrevMonth = () => {
    setCalendarViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const renderMCQChallengeForConcept = (conceptId) => {
    const qList = questionBankData.filter(q => q.conceptId === conceptId);
    if (qList.length === 0) return null;

    return (
      <div style={{ padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <HelpCircle className="size-4.5 text-emerald-500" />
          <strong style={{ fontSize: '0.86rem', color: '#0f172a' }}>Concept MCQ Challenge</strong>
        </div>
        
        {qList.map((q, idx) => {
          const selectedAns = trackerMCQAnswers[q.id];
          const isAnswered = selectedAns !== undefined;
          const showExp = !!trackerMCQExplanations[q.id];

          return (
            <div key={q.id} style={{ marginBottom: idx < qList.length - 1 ? '16px' : '0', paddingBottom: idx < qList.length - 1 ? '16px' : '0', borderBottom: idx < qList.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.84rem', fontWeight: 700, color: '#334155', lineHeight: '1.5' }}>
                {q.question}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '10px' }}>
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
                        fontWeight: 800
                      };
                    } else if (isThisSelected) {
                      optStyle = {
                        background: '#fee2e2',
                        border: '1px solid #ef4444',
                        color: '#991b1b',
                        fontWeight: 800
                      };
                    } else {
                      optStyle = {
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#94a3b8'
                      };
                    }
                  }

                  return (
                    <button
                      key={option}
                      disabled={isAnswered}
                      onClick={() => setTrackerMCQAnswers(prev => ({ ...prev, [q.id]: option }))}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
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
                    onClick={() => setTrackerMCQExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#059669',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      padding: '4px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Terminal className="size-3.5" />
                    {showExp ? "Hide Explanation" : "View Explanation"}
                  </button>

                  {showExp && (
                    <div style={{ marginTop: '8px', padding: '10px 12px', background: '#ffffff', borderRadius: '8px', borderLeft: '3px solid #10b981', fontSize: '0.78rem', color: '#475569', lineHeight: '1.4' }}>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page" style={{ marginTop: '24px' }}>
        <h1 style={{ marginBottom: '24px', fontSize: '1.89rem', fontWeight: 800, color: 'var(--text)' }}>
          Preparation Hub
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px', alignItems: 'start' }}>

          {/* LEFT SIDEBAR: Matches image style */}
          <aside className="card" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.72)', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.11rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 4px 0' }}>
              Preparation
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '0 0 16px 0' }}>
              Optimizers & Hub Tools
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(24, 35, 38, 0.08)', margin: '0 0 20px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '16px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.87rem',
                      fontWeight: 700,
                      textAlign: 'left',
                      transition: 'all 0.25s ease',
                      background: isActive ? '#1e293b' : 'transparent',
                      color: isActive ? '#ffffff' : '#334155'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(24, 35, 38, 0.04)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span style={{ color: isActive ? '#ffffff' : '#64748b' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT CONTENT WORKSPACE */}
          <section className="card" style={{ padding: '32px', minHeight: '540px', background: 'rgba(255, 255, 255, 0.72)', borderRadius: '24px' }}>

            {/* 1. AI INTERVIEW TAB */}
            {activeTab === 'interview' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Bot className="size-6 text-blue-600" />
                  <h2 style={{ fontSize: '1.31rem', fontWeight: 800, margin: 0 }}>AI Voice-Based CV Interview</h2>
                </div>

                {!interviewStarted && !interviewCompleted && (
                  <div>
                    {isParsing ? (
                      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{
                          border: '4px solid #f3f3f3', borderTop: '4px solid #3b82f6',
                          borderRadius: '50%', width: '40px', height: '40px',
                          animation: 'spin 1s linear infinite', margin: '0 auto 16px'
                        }}></div>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '8px' }}>Generating Interview...</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Please wait while our AI analyzes the resume and creates targeted questions.</p>
                      </div>
                    ) : (
                      <>
                        <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.87rem' }}>
                          Generate custom Technical, HR, and Management questions mapped specifically to your uploaded CV. Use voice recognition to answer, and see your scorecard update live.
                        </p>

                        <div style={{
                          border: '2px dashed #cbd5e1',
                          borderRadius: '16px',
                          padding: '40px 24px',
                          textAlign: 'center',
                          background: 'rgba(255, 255, 255, 0.5)',
                          marginBottom: '20px',
                          position: 'relative'
                        }}>
                          <input
                            type="file"
                            accept=".pdf,.docx,.txt"
                            onChange={handleResumeUpload}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              opacity: 0,
                              cursor: 'pointer'
                            }}
                          />
                          <UploadCloud className="size-12 text-slate-400 mx-auto" style={{ marginBottom: '14px' }} />
                          <strong style={{ display: 'block', fontSize: '0.94rem', color: 'var(--text)', marginBottom: '4px' }}>
                            Upload your resume to start
                          </strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                            Supports PDF, DOCX, and TXT files
                          </span>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', margin: '14px 0' }}>— OR —</span>
                          <button
                            onClick={startFallbackInterview}
                            className="btn btn-secondary"
                            style={{ fontSize: '0.8rem', padding: '10px 20px', borderRadius: '999px' }}
                          >
                            Start with General Developer CV Questions
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {interviewStarted && !interviewCompleted && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#0f2540', borderRadius: '16px', padding: '20px 24px', color: '#ffffff' }}>
                      <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93c5fd' }}>
                          Question {currentQuestionIdx + 1} of {questions.length}
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          background: 'rgba(255,255,255,0.15)',
                          padding: '3px 10px',
                          borderRadius: '6px'
                        }}>
                          {questions[currentQuestionIdx]?.type} Prompt
                        </span>
                      </div>
                      <p style={{ fontSize: '1.02rem', fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
                        "{questions[currentQuestionIdx]?.question}"
                      </p>
                    </div>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <strong style={{ fontSize: '0.82rem', color: 'var(--text)' }}>Your Spoken Answer:</strong>

                        <button
                          onClick={toggleListening}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '999px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            color: '#ffffff',
                            background: isListening ? '#ef4444' : '#2563eb',
                            boxShadow: isListening ? '0 0 14px rgba(239, 68, 68, 0.4)' : 'none',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          {isListening ? (
                            <>
                              <MicOff className="size-4 animate-pulse" /> Recording (Click to stop)
                            </>
                          ) : (
                            <>
                              <Mic className="size-4" /> Start Speaking
                            </>
                          )}
                        </button>
                      </div>

                      <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Click 'Start Speaking' and answer the question out loud. Your voice response will auto-populate here."
                        style={{
                          width: '100%',
                          minHeight: '130px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '12px',
                          padding: '14px',
                          fontSize: '0.87rem',
                          lineHeight: 1.6,
                          background: '#ffffff',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    {!interviewFeedback ? (
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          onClick={submitAnswer}
                          disabled={!userAnswer.trim() || isGrading}
                          className="btn btn-primary"
                          style={{ minWidth: '130px' }}
                        >
                          {isGrading ? 'Evaluating Response...' : 'Submit Answer'}
                        </button>
                        <button
                          type="button"
                          onClick={handleEndInterview}
                          className="btn btn-secondary"
                          style={{ borderColor: '#ef4444', color: '#ef4444' }}
                        >
                          End Interview
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <strong style={{ fontSize: '0.94rem', color: '#166534', fontWeight: 800 }}>Evaluation feedback</strong>
                            <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 900, padding: '4px 12px', borderRadius: '8px', fontSize: '0.87rem' }}>
                              Score: {interviewFeedback.score}/100
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                              <strong style={{ display: 'block', fontSize: '0.8rem', color: '#166534', marginBottom: '4px' }}>✓ Strengths</strong>
                              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: '#14532d', lineHeight: 1.5 }}>
                                {interviewFeedback.strengths?.map((str, idx) => <li key={idx}>{str}</li>)}
                              </ul>
                            </div>
                            <div>
                              <strong style={{ display: 'block', fontSize: '0.8rem', color: '#9a3412', marginBottom: '4px' }}>⚠ Suggested Improvements</strong>
                              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: '#7c2d12', lineHeight: 1.5 }}>
                                {interviewFeedback.improvements?.map((imp, idx) => <li key={idx}>{imp}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button
                            onClick={handleNextQuestion}
                            className="btn btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish & Show Scorecard'}
                            <ChevronRight className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={handleEndInterview}
                            className="btn btn-secondary"
                            style={{ borderColor: '#ef4444', color: '#ef4444' }}
                          >
                            End Interview
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {interviewCompleted && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <div style={{ textAlign: 'center', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '20px', padding: '30px' }}>
                      <Bot className="size-12 text-blue-600 mx-auto" style={{ marginBottom: '12px' }} />
                      <h3 style={{ fontSize: '1.23rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 6px' }}>Interview Completed!</h3>

                      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px', background: '#ffffff', border: '1px solid #bfdbfe', padding: '12px 28px', borderRadius: '16px' }}>
                        <span style={{ fontSize: '2.13rem', fontWeight: 800, color: '#1e6fff', fontFamily: 'Sora, sans-serif' }}>
                          {finalAverageScore}%
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 700 }}>Average Score</span>
                      </div>

                      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                        <button
                          onClick={saveFinalScore}
                          className="btn btn-primary"
                          disabled={!!saveStatus.includes('Successfully')}
                        >
                          {saveStatus || 'Save Score to Dashboard'}
                        </button>
                        <button
                          onClick={handleRestartInterview}
                          className="btn btn-secondary"
                        >
                          Start New Interview
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. CAREER ROADMAP TAB */}
            {activeTab === 'roadmap' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Map className="size-6 text-indigo-600" />
                  <h2 style={{ fontSize: '1.31rem', fontWeight: 800, margin: 0 }}>Career Roadmap Visualizer</h2>
                </div>
                <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.87rem' }}>
                  Provide your target career goal and CV. Gemini will generate a custom learning roadmap showing what you've achieved, what is left to study, and a level-by-level study plan.
                </p>

                {!careerRoadmap && (
                  <form onSubmit={handleGenerateRoadmap} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{
                      border: '2px dashed #cbd5e1',
                      borderRadius: '16px',
                      padding: '24px',
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.5)',
                      position: 'relative'
                    }}>
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={(e) => setRoadmapResumeFile(e.target.files[0])}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                      />
                      <UploadCloud className="size-8 text-slate-400 mx-auto" style={{ marginBottom: '8px' }} />
                      {roadmapResumeFile ? (
                        <p style={{ fontWeight: 700, color: 'var(--text)', margin: 0 }}>✓ Selected: {roadmapResumeFile.name}</p>
                      ) : (
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.87rem', color: 'var(--text)', marginBottom: '2px' }}>
                            Upload Resume for Roadmap Analysis (Optional)
                          </strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                            We'll map skills from your CV to the target role
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>What do you want to be? (Target Role) *</label>
                      <input
                        type="text"
                        placeholder="e.g. Data Scientist, DevOps Engineer, Senior SDE"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.87rem',
                          outline: 'none',
                          background: '#ffffff'
                        }}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Target Job Description (Optional but recommended)</label>
                      <textarea
                        placeholder="Paste the target job description to match skills gaps specifically to crack this role..."
                        value={targetJd}
                        onChange={(e) => setTargetJd(e.target.value)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.87rem',
                          minHeight: '120px',
                          outline: 'none',
                          background: '#ffffff',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ padding: '12px 24px', alignSelf: 'flex-start' }}
                      disabled={isGeneratingRoadmap}
                    >
                      {isGeneratingRoadmap ? 'Analyzing Background & Designing Roadmap...' : 'Generate Career Roadmap ➔'}
                    </button>
                  </form>
                )}

                {careerRoadmap && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '20px' }}>
                        <strong style={{ display: 'block', fontSize: '0.9rem', color: '#166534', marginBottom: '10px' }}>
                          ✓ Your Alignment Skills
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {careerRoadmap.current_skills?.map((sk, i) => (
                            <span key={i} style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '16px', padding: '20px' }}>
                        <strong style={{ display: 'block', fontSize: '0.9rem', color: '#92400e', marginBottom: '10px' }}>
                          ⚠ Gap Analysis (What is left to learn)
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {careerRoadmap.gap_skills?.map((sk, i) => (
                            <span key={i} style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.07rem', fontWeight: 800, color: 'var(--text)', margin: '10px 0 4px' }}>
                      Study Roadmap for {targetRole}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative', marginTop: '10px' }}>
                      <div style={{ position: 'absolute', left: '27px', top: '10px', bottom: '10px', width: '2px', background: '#e2e8f0', zIndex: 0 }} />

                      {careerRoadmap.levels?.map((lvl, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '20px', zIndex: 1, position: 'relative' }}>
                          <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#1e6fff',
                            border: '2px solid #1e6fff',
                            display: 'grid',
                            placeItems: 'center',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '0.98rem',
                            boxShadow: '0 4px 12px rgba(30,111,255,0.15)',
                            flexShrink: 0
                          }}>
                            {lvl.level || idx + 1}
                          </div>

                          <div style={{
                            flex: 1,
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '16px',
                            padding: '18px 22px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                              <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>{lvl.title}</strong>
                              <span style={{ fontSize: '0.8rem', background: '#eff6ff', color: '#1e6fff', padding: '3px 10px', borderRadius: '999px', fontWeight: 700 }}>
                                ⏱ Duration: {lvl.duration}
                              </span>
                            </div>

                            <p style={{ margin: '0 0 10px 0', fontSize: '0.84rem', color: 'var(--text)', lineHeight: 1.5 }}>
                              <strong>Core Focus:</strong> {lvl.focus}
                            </p>

                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                              <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Topics to Study:</strong>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {lvl.topics?.map((topic, ti) => (
                                  <span key={ti} style={{ background: '#f1f5f9', color: '#334155', fontSize: '10px', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>{topic}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <button
                        onClick={() => {
                          setCareerRoadmap(null);
                          setRoadmapResumeFile(null);
                          setTargetRole('');
                          setTargetJd('');
                        }}
                        className="btn btn-secondary"
                      >
                        Create A New Career Roadmap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. TASK TRACKER TAB: High fidelity implementation matching image */}
            {activeTab === 'tracker' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckSquare className="size-6 text-teal-600" />
                    <h2 style={{ fontSize: '1.31rem', fontWeight: 800, margin: 0 }}>Preparation Task Tracker</h2>
                  </div>

                </div>

                {/* TWO-COLUMN LAYOUT: Left Task list, Right Calendar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px', alignItems: 'start' }}>

                  {/* LEFT: Tasks for Selected Date */}
                  <div>
                    {(() => {
                      const todayStr = getLocalDateString(new Date());
                      const isPastDate = selectedDate < todayStr;
                      const dayTasks = scheduledTasks[selectedDate] || [];

                      return (
                        <>
                          <h3 style={{ margin: '0 0 12px 0', fontSize: '0.98rem', fontWeight: 800 }}>
                            Tasks for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </h3>

                          {/* Task adding form conditional */}
                          {!isPastDate ? (
                            <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                              <input
                                type="text"
                                placeholder="Add task for this day..."
                                value={newTaskText}
                                onChange={(e) => setNewTaskText(e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '10px 14px',
                                  borderRadius: '10px',
                                  border: '1px solid #cbd5e1',
                                  fontSize: '0.82rem',
                                  outline: 'none',
                                  background: '#ffffff'
                                }}
                                required
                              />
                              <button type="submit" className="btn btn-primary" style={{ padding: '10px 14px', fontSize: '0.8rem' }}>
                                Add
                              </button>
                            </form>
                          ) : (
                            <div style={{
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '10px',
                              padding: '10px 14px',
                              fontSize: '0.8rem',
                              color: '#64748b',
                              marginBottom: '20px',
                              fontWeight: 600
                            }}>
                              ℹ Past date is read-only. Tasks cannot be added, reordered or deleted.
                            </div>
                          )}

                          {/* Date-specific task list */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {dayTasks.length > 0 ? (
                              dayTasks.map((task, idx) => (
                                <div key={task.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      background: '#ffffff',
                                      border: '1px solid #cbd5e1',
                                      borderRadius: '12px',
                                      padding: '10px 14px',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                      <input
                                        type="checkbox"
                                        checked={task.completed}
                                        disabled={isPastDate}
                                        onChange={() => toggleTask(selectedDate, task.id)}
                                        style={{ width: '16px', height: '16px', cursor: isPastDate ? 'default' : 'pointer' }}
                                      />
                                      {editingTaskFor === task.id ? (
                                        <form onSubmit={(e) => handleSaveEditTask(e, task.id)} style={{ flex: 1, display: 'flex', gap: '6px' }}>
                                          <input
                                            type="text"
                                            value={editTaskText}
                                            onChange={(e) => setEditTaskText(e.target.value)}
                                            autoFocus
                                            style={{
                                              flex: 1, padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', outline: 'none'
                                            }}
                                          />
                                          <button type="submit" className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '6px' }}>Save</button>
                                          <button type="button" onClick={() => setEditingTaskFor(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem' }}>Cancel</button>
                                        </form>
                                      ) : (
                                        <span style={{
                                          fontSize: '0.82rem',
                                          color: task.completed ? '#94a3b8' : '#1e293b',
                                          textDecoration: task.completed ? 'line-through' : 'none',
                                          fontWeight: 600,
                                          lineHeight: 1.4
                                        }}>
                                          {task.text}
                                        </span>
                                      )}
                                    </div>

                                    {/* Rearrange + Subtask + Delete buttons */}
                                    {!isPastDate && (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <button
                                          type="button"
                                          onClick={() => handleEditTaskStart(task.id, task.text)}
                                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px' }}
                                          title="Edit Task"
                                        >
                                          <Edit2 className="size-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setAddingSubtaskFor(addingSubtaskFor === task.id ? null : task.id)}
                                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px', fontSize: '0.75rem', fontWeight: 600 }}
                                        >
                                          + Subtask
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => moveTask(selectedDate, idx, 'up')}
                                          disabled={idx === 0}
                                          style={{ background: 'none', border: 'none', color: idx === 0 ? '#cbd5e1' : '#64748b', cursor: 'pointer', padding: '2px' }}
                                        >
                                          <ArrowUp className="size-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => moveTask(selectedDate, idx, 'down')}
                                          disabled={idx === dayTasks.length - 1}
                                          style={{ background: 'none', border: 'none', color: idx === dayTasks.length - 1 ? '#cbd5e1' : '#64748b', cursor: 'pointer', padding: '2px' }}
                                        >
                                          <ArrowDown className="size-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => deleteTask(selectedDate, task.id)}
                                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                                          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                        >
                                          <Trash2 className="size-3.5" />
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  {/* Subtasks rendering */}
                                  {(task.subtasks || []).length > 0 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '32px', marginRight: '14px' }}>
                                      {task.subtasks.map((sub, sIdx) => (
                                        <div key={sub.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                            <input
                                              type="checkbox"
                                              checked={sub.completed}
                                              disabled={isPastDate}
                                              onChange={() => toggleSubtask(selectedDate, task.id, sub.id)}
                                              style={{ width: '13px', height: '13px', cursor: isPastDate ? 'default' : 'pointer' }}
                                            />
                                            {editingSubtaskFor === sub.id ? (
                                              <form onSubmit={(e) => handleSaveEditSubtask(e, task.id, sub.id)} style={{ flex: 1, display: 'flex', gap: '6px' }}>
                                                <input
                                                  type="text"
                                                  value={editSubtaskText}
                                                  onChange={(e) => setEditSubtaskText(e.target.value)}
                                                  autoFocus
                                                  style={{
                                                    flex: 1, padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.75rem', outline: 'none'
                                                  }}
                                                />
                                                <button type="submit" className="btn btn-primary" style={{ padding: '2px 6px', fontSize: '0.65rem', borderRadius: '4px' }}>Save</button>
                                                <button type="button" onClick={() => setEditingSubtaskFor(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.65rem' }}>Cancel</button>
                                              </form>
                                            ) : (
                                              <span style={{
                                                fontSize: '0.75rem',
                                                color: sub.completed ? '#94a3b8' : '#475569',
                                                textDecoration: sub.completed ? 'line-through' : 'none',
                                                fontWeight: 500
                                              }}>
                                                {sub.text}
                                              </span>
                                            )}
                                          </div>

                                          {!isPastDate && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                              <button
                                                type="button"
                                                onClick={() => handleEditSubtaskStart(sub.id, sub.text)}
                                                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px' }}
                                                title="Edit Subtask"
                                              >
                                                <Edit2 className="size-3.5" />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => moveSubtask(selectedDate, task.id, sIdx, 'up')}
                                                disabled={sIdx === 0}
                                                style={{ background: 'none', border: 'none', color: sIdx === 0 ? '#cbd5e1' : '#64748b', cursor: 'pointer', padding: '2px' }}
                                              >
                                                <ArrowUp className="size-3.5" />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => moveSubtask(selectedDate, task.id, sIdx, 'down')}
                                                disabled={sIdx === task.subtasks.length - 1}
                                                style={{ background: 'none', border: 'none', color: sIdx === task.subtasks.length - 1 ? '#cbd5e1' : '#64748b', cursor: 'pointer', padding: '2px' }}
                                              >
                                                <ArrowDown className="size-3.5" />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => deleteSubtask(selectedDate, task.id, sub.id)}
                                                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                              >
                                                <Trash2 className="size-3.5" />
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Add Subtask Input */}
                                  {addingSubtaskFor === task.id && !isPastDate && (
                                    <form onSubmit={(e) => handleAddSubtask(e, task.id)} style={{ display: 'flex', gap: '8px', marginLeft: '32px', marginTop: '4px' }}>
                                      <input
                                        type="text"
                                        placeholder="Add subtask (e.g. BFS)..."
                                        value={newSubtaskText}
                                        onChange={(e) => setNewSubtaskText(e.target.value)}
                                        autoFocus
                                        style={{
                                          flex: 1,
                                          padding: '6px 10px',
                                          borderRadius: '8px',
                                          border: '1px solid #cbd5e1',
                                          fontSize: '0.75rem',
                                          outline: 'none'
                                        }}
                                      />
                                      <button type="submit" className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '0.75rem', borderRadius: '6px' }}>Add</button>
                                      <button type="button" onClick={() => setAddingSubtaskFor(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem' }}>Cancel</button>
                                    </form>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div style={{ textAlign: 'center', padding: '30px 10px', border: '1px dashed #cbd5e1', borderRadius: '12px' }}>
                                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>No tasks scheduled for this day.</p>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* RIGHT COLUMN: Action Buttons, Notifications, and Calendar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {careerRoadmap && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                          onClick={handleImportRoadmapTasks}
                          className="btn btn-primary"
                          style={{ width: '100%', fontSize: '0.82rem', padding: '12px 14px', borderRadius: '14px', background: '#4f46e5', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                        >
                          ✦ Populate Tasks from AI Roadmap
                        </button>
                        <button
                          onClick={() => {
                            showConfirm("Clear All Tasks", "Are you sure you want to clear all tasks from all dates? This cannot be undone.", () => {
                              setScheduledTasks({});
                            });
                          }}
                          style={{ width: '100%', fontSize: '0.82rem', padding: '10px 14px', borderRadius: '14px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#64748b', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: 600 }}
                        >
                          <Trash2 className="size-4" /> Clear All Tasks
                        </button>
                      </div>
                    )}

                    {/* Overdue Notification Alert Banner */}
                    {overdueReminder && (
                      <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fee2e2',
                        borderRadius: '14px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        color: '#991b1b',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        position: 'relative'
                      }}>
                        <Bell className="size-5 text-red-600 animate-bounce flex-shrink-0" style={{ marginTop: '2px' }} />
                        <span style={{ lineHeight: 1.4, paddingRight: '20px' }}>{overdueReminder}</span>
                        <button
                          onClick={() => {
                            setOverdueReminder('');
                            localStorage.setItem(`ui_reminder_dismissed_${getLocalDateString(new Date())}`, "true");
                          }}
                          style={{ position: 'absolute', top: '8px', right: '10px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 800, padding: 0 }}
                          title="Dismiss"
                        >
                          ×
                        </button>
                      </div>
                    )}

                    {/* Premium Streaks Calendar container */}
                    <div style={{
                      background: '#242b35',
                      borderRadius: '24px',
                      padding: '16px',
                      color: '#ffffff',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      width: '280px'
                    }}>
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <button onClick={handlePrevMonth} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><ChevronLeft className="size-4" /></button>
                        <span style={{ fontSize: '0.98rem', fontWeight: 800, fontFamily: 'Sora, sans-serif' }}>
                          {calendarViewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button onClick={handleNextMonth} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><ChevronRight className="size-4" /></button>
                      </div>

                      {/* Active Day & Countdown */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '10px' }}>
                        <strong style={{ fontSize: '0.87rem', fontWeight: 800 }}>Day {new Date(selectedDate).getDate()}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>{timeLeft}</span>
                      </div>

                      {/* S M T W T F S labels */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '10px' }}>
                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                      </div>

                      {/* Grid days */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px 4px', justifyItems: 'center' }}>
                        {calendarDays.map((day, idx) => {
                          if (day === null) return <div key={`empty-${idx}`} />;

                          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                          const isSelected = selectedDate === dateStr;
                          const status = getDayStatus(day);

                          return (
                            <button
                              key={day}
                              onClick={() => setSelectedDate(dateStr)}
                              style={{
                                position: 'relative',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: isSelected ? '2px solid #5eead4' : 'none',
                                cursor: 'pointer',
                                display: 'grid',
                                placeItems: 'center',
                                padding: 0,
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                transition: 'all 0.2s',
                                background: status ? 'rgba(94, 234, 212, 0.16)' : isSelected ? 'transparent' : 'rgba(255,255,255,0.03)',
                                color: status ? '#5eead4' : '#e2e8f0',
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected && !status) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected && !status) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                              }}
                            >
                              <span style={{ transform: status ? 'translateY(-2px)' : 'none' }}>{day}</span>

                              {/* status icons */}
                              {status === 'check' && (
                                <span style={{ position: 'absolute', bottom: '1px', left: '50%', transform: 'translateX(-50%)', fontSize: '5px', color: '#5eead4', lineHeight: 1 }}>✓</span>
                              )}
                              {status === 'heart' && (
                                <span style={{ position: 'absolute', bottom: '1px', left: '50%', transform: 'translateX(-50%)', fontSize: '5px', color: '#5eead4', lineHeight: 1 }}>♥</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '14px 0' }} />

                      {/* Streak Cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(249,115,22,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                            <Flame className="size-3.5 text-orange-500" />
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8' }}>Current</span>
                            <strong style={{ fontSize: '0.8rem', fontFamily: 'Sora, sans-serif' }}>{currentStreak}d</strong>
                          </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(234,179,8,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                            <Trophy className="size-3.5 text-yellow-500" />
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8' }}>Best</span>
                            <strong style={{ fontSize: '0.8rem', fontFamily: 'Sora, sans-serif' }}>{bestStreak}d</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            )}

            {/* 4. CSE SPECIAL TAB */}
            {activeTab === 'cse' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <GraduationCap className="size-6 text-purple-600" />
                  <h2 style={{ fontSize: '1.31rem', fontWeight: 800, margin: 0 }}>Computer Science Special</h2>
                </div>
                <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
                  High-yield technical summaries and patterns for technical assessment pipelines.
                </p>

                {/* CSE Subject Cards (Custom design matching user reference) */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '28px',
                  flexWrap: 'wrap'
                }}>
                  {[
                    { id: 'dsa', name: 'DSA', color: '#d3a58e', icon: <Binary className="size-6 text-white" /> },
                    { id: 'oops', name: 'OOPs', color: '#a4d5bc', icon: <Code className="size-6 text-white" /> },
                    { id: 'os', name: 'OS', color: '#aba1dc', icon: <Cpu className="size-6 text-white" /> },
                    { id: 'dbms', name: 'DBMS', color: '#98b3dc', icon: <Database className="size-6 text-white" /> },
                    { id: 'cn', name: 'CN', color: '#e0a6b4', icon: <Network className="size-6 text-white" /> },
                    { id: 'system_design', name: 'System Design', color: '#ffd085', icon: <Cpu className="size-6 text-white" /> }
                  ].map(sub => {
                    const isSelected = selectedCseSubject === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedCseSubject(sub.id)}
                        style={{
                          background: isSelected ? '#1e1e24' : '#121214',
                          border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '24px',
                          padding: '12px',
                          width: '160px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 12px 28px rgba(139, 92, 246, 0.25)' : '0 4px 12px rgba(0,0,0,0.15)',
                          transition: 'all 0.25s ease',
                          flexShrink: 0
                        }}
                      >
                        {/* Upper capsule shape */}
                        <div style={{
                          width: '100%',
                          height: '76px',
                          borderRadius: '40px',
                          background: sub.color,
                          display: 'grid',
                          placeItems: 'center',
                          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2)'
                        }}>
                          {sub.icon}
                        </div>
                        {/* Title text */}
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: isSelected ? '#ffffff' : '#a1a1aa',
                          textAlign: 'center',
                          fontFamily: 'Sora, sans-serif'
                        }}>
                          {sub.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {/* Render content dynamically depending on selected subject */}
                  {selectedCseSubject === 'dsa' ? (
                    /* 1. FULL WIDTH DSA PREPARATION SHEET */
                    <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Overall Progress Summary */}
                      {(() => {
                        const totalQuestions = dsaSheetData.reduce((acc, curr) => acc + curr.problems.length, 0);
                        const totalSolved = Object.values(dsaCompletedProblems).filter(Boolean).length;
                        const progressPercent = Math.round((totalSolved / totalQuestions) * 100);
                        return (
                          <div style={{ background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '16px', padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Trophy className="size-5 text-purple-600" />
                                <strong style={{ fontSize: '1.0rem', color: '#581c87' }}>DSA Sheet Master Tracker</strong>
                              </div>
                              <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#6b21a8' }}>
                                {totalSolved} / {totalQuestions} Problems Solved ({progressPercent}%)
                              </span>
                            </div>
                            <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                            </div>
                          </div>
                        );
                      })()}

                      {/* Accordion List for Patterns */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {dsaSheetData.map((pattern, idx) => {
                          const isOpen = !!dsaOpenPatterns[pattern.patternName];
                          const solvedCount = pattern.problems.filter(p => dsaCompletedProblems[p.id]).length;
                          return (
                            <div key={pattern.patternName} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                              {/* Accordion Header */}
                              <div
                                onClick={() => toggleDsaPattern(pattern.patternName)}
                                style={{
                                  background: '#fafafa',
                                  padding: '16px 20px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  userSelect: 'none',
                                  borderBottom: isOpen ? '1px solid #e2e8f0' : 'none'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'grid', placeItems: 'center', fontSize: '0.84rem', fontWeight: 800 }}>
                                    {idx + 1}
                                  </span>
                                  <strong style={{ fontSize: '0.94rem', color: '#1e293b' }}>{pattern.patternName}</strong>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
                                    {solvedCount} / 10 Completed
                                  </span>
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
                                </div>
                                  <ChevronRight
                                    className="size-5 text-slate-400"
                                    style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                                  />
                                </div>
                              </div>

                              {/* Accordion Body */}
                              {isOpen && (
                                <div style={{ overflowX: 'auto' }}>
                                  {/* Theory / Concept Block */}
                                  {dsaTheoryData[pattern.patternName] && (() => {
                                    const theory = dsaTheoryData[pattern.patternName];
                                    return (
                                      <div style={{
                                        margin: '16px 20px',
                                        padding: '20px 24px',
                                        background: 'linear-gradient(135deg, #f0f9ff 0%, #eff6ff 50%, #f5f3ff 100%)',
                                        borderRadius: '14px',
                                        border: '1px solid #dbeafe',
                                        position: 'relative',
                                        overflow: 'hidden'
                                      }}>
                                        {/* Decorative accent */}
                                        <div style={{
                                          position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
                                          background: 'linear-gradient(180deg, #6366f1, #8b5cf6, #a78bfa)',
                                          borderRadius: '4px 0 0 4px'
                                        }} />

                                        {/* Why Section */}
                                        <div style={{ marginBottom: '14px' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '1rem' }}>💡</span>
                                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4338ca', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Why This Pattern?</span>
                                          </div>
                                          <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: '1.6', margin: 0, paddingLeft: '28px' }}>
                                            {theory.why}
                                          </p>
                                        </div>

                                        {/* When Section */}
                                        <div style={{ marginBottom: '14px' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '1rem' }}>🎯</span>
                                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>When To Use</span>
                                          </div>
                                          <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: '1.6', margin: 0, paddingLeft: '28px' }}>
                                            {theory.when}
                                          </p>
                                        </div>

                                        {/* Key Concepts */}
                                        <div>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '1rem' }}>📚</span>
                                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Concepts</span>
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '28px' }}>
                                            {theory.concepts.map((concept, ci) => {
                                              const [title, desc] = concept.split(' — ');
                                              return (
                                                <div key={ci} style={{
                                                  display: 'flex',
                                                  alignItems: 'flex-start',
                                                  gap: '10px',
                                                  padding: '8px 14px',
                                                  background: 'rgba(255,255,255,0.8)',
                                                  borderRadius: '10px',
                                                  border: '1px solid #e0e7ff'
                                                }}>
                                                  <span style={{
                                                    flexShrink: 0,
                                                    width: '22px', height: '22px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                                    color: '#fff',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 800,
                                                    display: 'grid',
                                                    placeItems: 'center'
                                                  }}>{ci + 1}</span>
                                                  <div style={{ fontSize: '0.82rem', lineHeight: '1.5' }}>
                                                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{title}</span>
                                                    {desc && <span style={{ color: '#64748b' }}> — {desc}</span>}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
                                          {/* Detailed Theory / Concept Redirect Box */}
                                          <div 
                                            onClick={() => window.open(`/preparation/theory/${encodeURIComponent(pattern.patternName)}`, '_blank')}
                                            style={{
                                              flex: 1,
                                              minWidth: '220px',
                                              padding: '16px 20px',
                                              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                              borderRadius: '12px',
                                              color: '#ffffff',
                                              cursor: 'pointer',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'space-between',
                                              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
                                              transition: 'transform 0.2s, box-shadow 0.2s',
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.transform = 'translateY(-2px)';
                                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.35)';
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.transform = 'translateY(0)';
                                              e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.25)';
                                            }}
                                          >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                              <span style={{ fontSize: '1.4rem' }}>📚</span>
                                              <div style={{ textAlign: 'left' }}>
                                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Theory Guide</div>
                                                <div style={{ fontSize: '0.7rem', color: '#e0e7ff', marginTop: '2px' }}>Templates & dry runs.</div>
                                              </div>
                                            </div>
                                            <div style={{
                                              background: 'rgba(255, 255, 255, 0.2)',
                                              padding: '6px 12px',
                                              borderRadius: '8px',
                                              fontSize: '0.78rem',
                                              fontWeight: 800,
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '4px',
                                              flexShrink: 0
                                            }}>
                                              Open Guide ➔
                                            </div>
                                          </div>

                                          {/* Practice MCQ Box */}
                                          {questionBankData.some(q => q.conceptId === pattern.patternName) && (
                                            <div 
                                              onClick={() => setExpandedMCQConcepts(prev => ({ ...prev, [pattern.patternName]: !prev[pattern.patternName] }))}
                                              style={{
                                                flex: 1,
                                                minWidth: '220px',
                                                padding: '16px 20px',
                                                background: expandedMCQConcepts[pattern.patternName] ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' : 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                                                borderRadius: '12px',
                                                color: '#ffffff',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                              }}
                                              onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.35)';
                                              }}
                                              onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.25)';
                                              }}
                                            >
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '1.4rem' }}>❓</span>
                                                <div style={{ textAlign: 'left' }}>
                                                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Practice MCQs</div>
                                                  <div style={{ fontSize: '0.7rem', color: '#ecfdf5', marginTop: '2px' }}>Test your concept knowledge.</div>
                                                </div>
                                              </div>
                                              <div style={{
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                fontSize: '0.78rem',
                                                fontWeight: 800,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                flexShrink: 0
                                              }}>
                                                {expandedMCQConcepts[pattern.patternName] ? 'Close MCQs ▲' : 'Practice MCQs ➔'}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                      <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                                        <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '60px' }}>Status</th>
                                        <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700 }}>Problem</th>
                                        <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '120px' }}>Level</th>
                                        <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '220px', textAlign: 'right' }}>Practice Links</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {pattern.problems.map((prob) => {
                                        const isCompleted = !!dsaCompletedProblems[prob.id];
                                        return (
                                          <tr
                                            key={prob.id}
                                            style={{
                                              borderBottom: '1px solid #f1f5f9',
                                              background: isCompleted ? 'rgba(16, 185, 129, 0.02)' : '#ffffff',
                                              transition: 'background 0.2s'
                                            }}
                                          >
                                            {/* Status Checkbox */}
                                            <td style={{ padding: '12px 20px' }}>
                                              <button
                                                onClick={() => toggleDsaProblem(prob.id)}
                                                style={{
                                                  background: 'none',
                                                  border: 'none',
                                                  cursor: 'pointer',
                                                  padding: 0,
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center'
                                                }}
                                              >
                                                {isCompleted ? (
                                                  <CheckCircle2 className="size-5 text-emerald-500" />
                                                ) : (
                                                  <div style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    border: '2px solid #cbd5e1',
                                                    background: 'transparent',
                                                    transition: 'border-color 0.2s'
                                                  }} />
                                                )}
                                              </button>
                                            </td>

                                            {/* Problem Name */}
                                            <td style={{
                                              padding: '12px 12px',
                                              fontSize: '0.84rem',
                                              fontWeight: 600,
                                              color: isCompleted ? '#94a3b8' : '#1e293b',
                                              textDecoration: isCompleted ? 'line-through' : 'none'
                                            }}>
                                              {prob.name}
                                            </td>

                                            {/* Level Badge */}
                                            <td style={{ padding: '12px 12px' }}>
                                              <span style={{
                                                display: 'inline-block',
                                                padding: '3px 8px',
                                                borderRadius: '6px',
                                                fontSize: '0.72rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                color: prob.level === 'Easy' ? '#16a34a' : prob.level === 'Medium' ? '#ca8a04' : '#dc2626',
                                                background: prob.level === 'Easy' ? '#f0fdf4' : prob.level === 'Medium' ? '#fef9c3' : '#fef2f2'
                                              }}>
                                                {prob.level}
                                              </span>
                                            </td>

                                            {/* Practice Links */}
                                            <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                                              {prob.leetcode && prob.leetcode.trim() !== '' && (
                                                <a
                                                  href={prob.leetcode}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    padding: '5px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 700,
                                                    background: 'rgba(245, 158, 11, 0.08)',
                                                    color: '#d97706',
                                                    border: '1px solid rgba(245, 158, 11, 0.15)',
                                                    textDecoration: 'none',
                                                    marginRight: prob.gfg && prob.gfg.trim() !== '' ? '8px' : '0px',
                                                    transition: 'all 0.2s'
                                                  }}
                                                >
                                                  LeetCode
                                                </a>
                                              )}
                                              {prob.gfg && prob.gfg.trim() !== '' && (
                                                <a
                                                  href={prob.gfg}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    padding: '5px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 700,
                                                    background: 'rgba(16, 185, 129, 0.08)',
                                                    color: '#16a34a',
                                                    border: '1px solid rgba(16, 185, 129, 0.15)',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.2s'
                                                  }}
                                                >
                                                  GFG
                                                </a>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                  {/* Category MCQ Practice */}
                                  {expandedMCQConcepts[pattern.patternName] && (
                                    <div style={{ padding: '0 20px 20px 20px' }}>
                                      {renderMCQChallengeForConcept(pattern.patternName)}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* 2. OTHER SUBJECTS IN TWO-COLUMN GRID */
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', gridColumn: '1 / -1' }}>
                      {selectedCseSubject === 'oops' && (
                        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {/* Overall OOPs Progress Summary */}
                          {(() => {
                            const totalConcepts = oopsTrackerData.reduce((acc, curr) => acc + curr.concepts.length, 0);
                            const totalCompleted = Object.values(oopsCompletedConcepts).filter(Boolean).length;
                            const progressPercent = Math.round((totalCompleted / totalConcepts) * 100);
                            return (
                              <div style={{ background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '16px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Trophy className="size-5 text-purple-600" />
                                    <strong style={{ fontSize: '1.0rem', color: '#581c87' }}>OOPs Concept Master Tracker</strong>
                                  </div>
                                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#6b21a8' }}>
                                    {totalCompleted} / {totalConcepts} Concepts Mastered ({progressPercent}%)
                                  </span>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                                </div>
                              </div>
                            );
                          })()}

                          {/* Accordion List for OOPs Categories */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {oopsTrackerData.map((category, idx) => {
                              const isOpen = !!oopsOpenCategories[category.categoryName];
                              const solvedCount = category.concepts.filter(c => oopsCompletedConcepts[c.id]).length;
                              return (
                                <div key={category.categoryName} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                  {/* Accordion Header */}
                                  <div
                                    onClick={() => toggleOopsCategory(category.categoryName)}
                                    style={{
                                      background: '#fafafa',
                                      padding: '16px 20px',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      userSelect: 'none',
                                      borderBottom: isOpen ? '1px solid #e2e8f0' : 'none'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'grid', placeItems: 'center', fontSize: '0.84rem', fontWeight: 800 }}>
                                        {idx + 1}
                                      </span>
                                      <strong style={{ fontSize: '0.94rem', color: '#1e293b' }}>{category.categoryName}</strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
                                        {solvedCount} / {category.concepts.length} Completed
                                      </span>
                                      {/* Circular Progress Tracker */}
                                      <div style={{ position: 'relative', width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                                        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3.5"
                                            strokeDasharray={`${(solvedCount / category.concepts.length) * 100}, 100`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dasharray 0.35s ease' }}
                                          />
                                        </svg>
                                        <span style={{ position: 'absolute', fontSize: '0.62rem', fontWeight: 800, color: '#1e293b' }}>
                                          {Math.round((solvedCount / category.concepts.length) * 100)}%
                                        </span>
                                      </div>
                                      <ChevronRight
                                        className="size-5 text-slate-400"
                                        style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                                      />
                                    </div>
                                  </div>

                                  {/* Accordion Body */}
                                  {isOpen && (
                                    <div style={{ overflowX: 'auto' }}>
                                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                          <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                                            <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '60px' }}>Status</th>
                                            <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700 }}>Concept</th>
                                            <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '220px', textAlign: 'right' }}>Details</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                                                                    {category.concepts.map((concept) => {
                                            const isCompleted = !!oopsCompletedConcepts[concept.id];
                                            const isMCQExpanded = !!expandedMCQConcepts[concept.id];
                                            return (
                                              <React.Fragment key={concept.id}>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9', background: isCompleted ? 'rgba(16, 185, 129, 0.02)' : '#ffffff', transition: 'background 0.2s' }}>
                                                  <td style={{ padding: '12px 20px' }}>
                                                    <button onClick={() => toggleOopsConcept(concept.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                      {isCompleted ? (
                                                        <CheckCircle2 className="size-5 text-emerald-500" />
                                                      ) : (
                                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1', background: 'transparent', transition: 'border-color 0.2s' }} />
                                                      )}
                                                    </button>
                                                  </td>
                                                  <td style={{ padding: '12px 12px', fontSize: '0.84rem', fontWeight: 600, color: isCompleted ? '#94a3b8' : '#1e293b', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                                    {concept.name}
                                                  </td>
                                                  <td style={{ padding: '12px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                    {questionBankData.some(q => q.conceptId === concept.id) && (
                                                      <button
                                                        onClick={() => setExpandedMCQConcepts(prev => ({ ...prev, [concept.id]: !prev[concept.id] }))}
                                                        style={{
                                                          display: 'inline-flex',
                                                          alignItems: 'center',
                                                          padding: '5px 12px',
                                                          borderRadius: '8px',
                                                          fontSize: '0.72rem',
                                                          fontWeight: 700,
                                                          background: isMCQExpanded ? '#10b981' : 'rgba(16, 185, 129, 0.08)',
                                                          color: isMCQExpanded ? '#ffffff' : '#10b981',
                                                          border: isMCQExpanded ? '1px solid #10b981' : '1px solid rgba(16, 185, 129, 0.15)',
                                                          cursor: 'pointer',
                                                          marginRight: '8px',
                                                          transition: 'all 0.2s'
                                                        }}
                                                      >
                                                        {isMCQExpanded ? 'Close Q' : 'Practice Q'}
                                                      </button>
                                                    )}
                                                    <a
                                                      href={`/preparation/theory/OOPs?concept=${concept.id}`}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        padding: '5px 12px',
                                                        borderRadius: '8px',
                                                        fontSize: '0.72rem',
                                                        fontWeight: 700,
                                                        background: 'rgba(139, 92, 246, 0.08)',
                                                        color: '#7c3aed',
                                                        border: '1px solid rgba(139, 92, 246, 0.15)',
                                                        textDecoration: 'none',
                                                        transition: 'all 0.2s'
                                                      }}
                                                    >
                                                      View Theory
                                                    </a>
                                                  </td>
                                                </tr>
                                                {isMCQExpanded && (
                                                  <tr>
                                                    <td colSpan="3" style={{ padding: '8px 20px 16px 20px', background: '#f8fafc' }}>
                                                      {renderMCQChallengeForConcept(concept.id)}
                                                    </td>
                                                  </tr>
                                                )}
                                              </React.Fragment>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      )}

                      {selectedCseSubject === 'os' && (
                        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {/* Overall OS Progress Summary */}
                          {(() => {
                            const totalConcepts = osTrackerData.reduce((acc, curr) => acc + curr.concepts.length, 0);
                            const totalCompleted = Object.values(osCompletedConcepts).filter(Boolean).length;
                            const progressPercent = Math.round((totalCompleted / totalConcepts) * 100);
                            return (
                              <div style={{ background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '16px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Trophy className="size-5 text-purple-600" />
                                    <strong style={{ fontSize: '1.0rem', color: '#581c87' }}>OS Concept Master Tracker</strong>
                                  </div>
                                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#6b21a8' }}>
                                    {totalCompleted} / {totalConcepts} Concepts Mastered ({progressPercent}%)
                                  </span>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                                </div>
                              </div>
                            );
                          })()}

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {osTrackerData.map((category, idx) => {
                              const isOpen = !!osOpenCategories[category.categoryName];
                              const solvedCount = category.concepts.filter(c => osCompletedConcepts[c.id]).length;
                              return (
                                <div key={category.categoryName} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                  <div
                                    onClick={() => toggleOsCategory(category.categoryName)}
                                    style={{
                                      background: '#fafafa',
                                      padding: '16px 20px',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      userSelect: 'none',
                                      borderBottom: isOpen ? '1px solid #e2e8f0' : 'none'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'grid', placeItems: 'center', fontSize: '0.84rem', fontWeight: 800 }}>
                                        {idx + 1}
                                      </span>
                                      <strong style={{ fontSize: '0.94rem', color: '#1e293b' }}>{category.categoryName}</strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
                                        {solvedCount} / {category.concepts.length} Completed
                                      </span>
                                      <div style={{ position: 'relative', width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                                        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3.5"
                                            strokeDasharray={`${(solvedCount / category.concepts.length) * 100}, 100`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dasharray 0.35s ease' }}
                                          />
                                        </svg>
                                        <span style={{ position: 'absolute', fontSize: '0.62rem', fontWeight: 800, color: '#1e293b' }}>
                                          {Math.round((solvedCount / category.concepts.length) * 100)}%
                                        </span>
                                      </div>
                                      <ChevronRight
                                        className="size-5 text-slate-400"
                                        style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                                      />
                                    </div>
                                  </div>
                                  {isOpen && (
                                    <div style={{ overflowX: 'auto' }}>
                                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                          <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                                            <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '60px' }}>Status</th>
                                            <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700 }}>Concept</th>
                                            <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, textAlign: 'right' }}>Details</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                                                                    {category.concepts.map((concept) => {
                                            const isCompleted = !!osCompletedConcepts[concept.id];
                                            const isMCQExpanded = !!expandedMCQConcepts[concept.id];
                                            return (
                                              <React.Fragment key={concept.id}>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9', background: isCompleted ? 'rgba(16, 185, 129, 0.02)' : '#ffffff', transition: 'background 0.2s' }}>
                                                  <td style={{ padding: '12px 20px' }}>
                                                    <button onClick={() => toggleOsConcept(concept.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                      {isCompleted ? (
                                                        <CheckCircle2 className="size-5 text-emerald-500" />
                                                      ) : (
                                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1', background: 'transparent', transition: 'border-color 0.2s' }} />
                                                      )}
                                                    </button>
                                                  </td>
                                                  <td style={{ padding: '12px 12px', fontSize: '0.84rem', fontWeight: 600, color: isCompleted ? '#94a3b8' : '#1e293b', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                                    {concept.name}
                                                  </td>
                                                  <td style={{ padding: '12px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                    {questionBankData.some(q => q.conceptId === concept.id) && (
                                                      <button
                                                        onClick={() => setExpandedMCQConcepts(prev => ({ ...prev, [concept.id]: !prev[concept.id] }))}
                                                        style={{
                                                          display: 'inline-flex',
                                                          alignItems: 'center',
                                                          padding: '5px 12px',
                                                          borderRadius: '8px',
                                                          fontSize: '0.72rem',
                                                          fontWeight: 700,
                                                          background: isMCQExpanded ? '#10b981' : 'rgba(16, 185, 129, 0.08)',
                                                          color: isMCQExpanded ? '#ffffff' : '#10b981',
                                                          border: isMCQExpanded ? '1px solid #10b981' : '1px solid rgba(16, 185, 129, 0.15)',
                                                          cursor: 'pointer',
                                                          marginRight: '8px',
                                                          transition: 'all 0.2s'
                                                        }}
                                                      >
                                                        {isMCQExpanded ? 'Close Q' : 'Practice Q'}
                                                      </button>
                                                    )}
                                                    <a
                                                      href={`/preparation/theory/OS?concept=${concept.id}`}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        padding: '5px 12px',
                                                        borderRadius: '8px',
                                                        fontSize: '0.72rem',
                                                        fontWeight: 700,
                                                        background: 'rgba(139, 92, 246, 0.08)',
                                                        color: '#7c3aed',
                                                        border: '1px solid rgba(139, 92, 246, 0.15)',
                                                        textDecoration: 'none',
                                                        transition: 'all 0.2s'
                                                      }}
                                                    >
                                                      View Theory
                                                    </a>
                                                  </td>
                                                </tr>
                                                {isMCQExpanded && (
                                                  <tr>
                                                    <td colSpan="3" style={{ padding: '8px 20px 16px 20px', background: '#f8fafc' }}>
                                                      {renderMCQChallengeForConcept(concept.id)}
                                                    </td>
                                                  </tr>
                                                )}
                                              </React.Fragment>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {selectedCseSubject === 'dbms' && (
                        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {/* Overall DBMS Progress Summary */}
                          {(() => {
                            const totalTheoryConcepts = dbmsTrackerData.filter(c => c.isTheory).reduce((acc, curr) => acc + curr.concepts.length, 0);
                            const completedTheoryConcepts = Object.keys(dbmsCompletedConcepts).filter(key => dbmsTrackerData.filter(c => c.isTheory).some(cat => cat.concepts.some(con => con.id === key)) && dbmsCompletedConcepts[key]).length;

                            const totalSqlProblems = sql50Data.length;
                            const completedSqlProblems = Object.values(sqlCompletedQuestions).filter(Boolean).length;

                            const totalDbmsItems = totalTheoryConcepts + totalSqlProblems;
                            const completedDbmsItems = completedTheoryConcepts + completedSqlProblems;
                            const dbmsProgressPercent = Math.round((completedDbmsItems / totalDbmsItems) * 100) || 0;

                            return (
                              <div style={{ background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Trophy className="size-5 text-purple-600" />
                                    <strong style={{ fontSize: '1.0rem', color: '#581c87' }}>DBMS & SQL 50 Master Tracker</strong>
                                  </div>
                                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#6b21a8' }}>
                                    {completedDbmsItems} / {totalDbmsItems} Completed ({dbmsProgressPercent}%)
                                  </span>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                  <div style={{ width: `${dbmsProgressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                                </div>
                                
                                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px', borderTop: '1px solid #f3e8ff', paddingTop: '12px' }}>
                                  <div style={{ flex: 1, minWidth: '150px' }}>
                                    <span style={{ display: 'block', fontSize: '0.74rem', color: '#8b5cf6', fontWeight: 700, textTransform: 'uppercase' }}>Theory Guide Concepts</span>
                                    <strong style={{ fontSize: '0.96rem', color: '#581c87' }}>{completedTheoryConcepts} / {totalTheoryConcepts} Mastered</strong>
                                  </div>
                                  <div style={{ flex: 1, minWidth: '150px' }}>
                                    <span style={{ display: 'block', fontSize: '0.74rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>LeetCode SQL 50 Sheet</span>
                                    <strong style={{ fontSize: '0.96rem', color: '#d97706' }}>{completedSqlProblems} / {totalSqlProblems} Solved</strong>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {dbmsTrackerData.map((category, idx) => {
                              const isOpen = !!dbmsOpenCategories[category.categoryName];
                              const solvedCount = category.isTheory 
                                ? category.concepts.filter(c => dbmsCompletedConcepts[c.id]).length
                                : sql50Data.filter(q => q.topic === category.topicName && sqlCompletedQuestions[q.id]).length;
                                
                              const totalCount = category.isTheory
                                ? category.concepts.length
                                : sql50Data.filter(q => q.topic === category.topicName).length;

                              const percent = Math.round((solvedCount / totalCount) * 100) || 0;

                              return (
                                <div key={category.categoryName} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                  <div
                                    onClick={() => toggleDbmsCategory(category.categoryName)}
                                    style={{
                                      background: '#fafafa',
                                      padding: '16px 20px',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      userSelect: 'none',
                                      borderBottom: isOpen ? '1px solid #e2e8f0' : 'none'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: category.isTheory ? 'rgba(139, 92, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: category.isTheory ? '#8b5cf6' : '#d97706', display: 'grid', placeItems: 'center', fontSize: '0.84rem', fontWeight: 800 }}>
                                        {idx + 1}
                                      </span>
                                      <strong style={{ fontSize: '0.94rem', color: '#1e293b' }}>{category.categoryName}</strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
                                        {solvedCount} / {totalCount} Completed
                                      </span>
                                      <div style={{ position: 'relative', width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                                        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                                          <circle cx="18" cy="18" r="16" fill="none" stroke={category.isTheory ? "#8b5cf6" : "#f59e0b"} strokeWidth="3.5"
                                            strokeDasharray={`${percent}, 100`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dasharray 0.35s ease' }}
                                          />
                                        </svg>
                                        <span style={{ position: 'absolute', fontSize: '0.62rem', fontWeight: 800, color: '#1e293b' }}>
                                          {percent}%
                                        </span>
                                      </div>
                                      <ChevronRight
                                        className="size-5 text-slate-400"
                                        style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                                      />
                                    </div>
                                  </div>
                                  {isOpen && (
                                    <div style={{ overflowX: 'auto' }}>
                                      {category.isTheory ? (
                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                          <thead>
                                            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                                              <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '60px' }}>Status</th>
                                              <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700 }}>Concept</th>
                                              <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, textAlign: 'right' }}>Details</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {category.concepts.map((concept) => {
                                              const isCompleted = !!dbmsCompletedConcepts[concept.id];
                                              const isMCQExpanded = !!expandedMCQConcepts[concept.id];
                                              return (
                                                <React.Fragment key={concept.id}>
                                                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: isCompleted ? 'rgba(16, 185, 129, 0.02)' : '#ffffff', transition: 'background 0.2s' }}>
                                                    <td style={{ padding: '12px 20px' }}>
                                                      <button onClick={() => toggleDbmsConcept(concept.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                                        {isCompleted ? (
                                                          <CheckCircle2 className="size-5 text-emerald-500" />
                                                        ) : (
                                                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1', background: 'transparent', transition: 'border-color 0.2s' }} />
                                                        )}
                                                      </button>
                                                    </td>
                                                    <td style={{ padding: '12px 12px', fontSize: '0.84rem', fontWeight: 600, color: isCompleted ? '#94a3b8' : '#1e293b', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                                      {concept.name}
                                                    </td>
                                                    <td style={{ padding: '12px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                      {questionBankData.some(q => q.conceptId === concept.id) && (
                                                        <button
                                                          onClick={() => setExpandedMCQConcepts(prev => ({ ...prev, [concept.id]: !prev[concept.id] }))}
                                                          style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            padding: '5px 12px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.72rem',
                                                            fontWeight: 700,
                                                            background: isMCQExpanded ? '#10b981' : 'rgba(16, 185, 129, 0.08)',
                                                            color: isMCQExpanded ? '#ffffff' : '#10b981',
                                                            border: isMCQExpanded ? '1px solid #10b981' : '1px solid rgba(16, 185, 129, 0.15)',
                                                            cursor: 'pointer',
                                                            marginRight: '8px',
                                                            transition: 'all 0.2s'
                                                          }}
                                                        >
                                                          {isMCQExpanded ? 'Close Q' : 'Practice Q'}
                                                        </button>
                                                      )}
                                                      <a
                                                        href={`/preparation/theory/DBMS?concept=${concept.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                          display: 'inline-flex',
                                                          alignItems: 'center',
                                                          padding: '5px 12px',
                                                          borderRadius: '8px',
                                                          fontSize: '0.72rem',
                                                          fontWeight: 700,
                                                          background: 'rgba(139, 92, 246, 0.08)',
                                                          color: '#7c3aed',
                                                          border: '1px solid rgba(139, 92, 246, 0.15)',
                                                          textDecoration: 'none',
                                                          transition: 'all 0.2s'
                                                        }}
                                                      >
                                                        View Theory
                                                      </a>
                                                    </td>
                                                  </tr>
                                                  {isMCQExpanded && (
                                                    <tr>
                                                      <td colSpan="3" style={{ padding: '8px 20px 16px 20px', background: '#f8fafc' }}>
                                                        {renderMCQChallengeForConcept(concept.id)}
                                                      </td>
                                                    </tr>
                                                  )}
                                                </React.Fragment>
                                              );
                                            })}
                                          </tbody>
                                        </table>
                                      ) : (
                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                          <thead>
                                            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                                              <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '60px' }}>Status</th>
                                              <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700 }}>Question</th>
                                              <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '100px' }}>Difficulty</th>
                                              <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '260px', textAlign: 'right' }}>Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {sql50Data
                                              .filter(q => q.topic === category.topicName)
                                              .map((q) => {
                                                const isCompleted = !!sqlCompletedQuestions[q.id];
                                                const isExpanded = !!expandedSqlQuestions[q.id];
                                                return (
                                                  <React.Fragment key={q.id}>
                                                    <tr style={{ borderBottom: '1px solid #f1f5f9', background: isCompleted ? 'rgba(16, 185, 129, 0.02)' : '#ffffff', transition: 'background 0.2s' }}>
                                                      <td style={{ padding: '12px 20px' }}>
                                                        <button onClick={() => toggleSqlQuestion(q.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                          {isCompleted ? (
                                                            <CheckCircle2 className="size-5 text-emerald-500" />
                                                          ) : (
                                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1', background: 'transparent', transition: 'border-color 0.2s' }} />
                                                          )}
                                                        </button>
                                                      </td>
                                                      <td style={{ padding: '12px 12px' }}>
                                                        <div style={{ fontWeight: 600, fontSize: '0.84rem', color: isCompleted ? '#94a3b8' : '#1e293b', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                                          {q.title}
                                                        </div>
                                                        <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>
                                                          {q.topic}
                                                        </span>
                                                      </td>
                                                      <td style={{ padding: '12px 12px' }}>
                                                        <span style={{
                                                          display: 'inline-block',
                                                          padding: '3px 8px',
                                                          borderRadius: '6px',
                                                          fontSize: '0.7rem',
                                                          fontWeight: 700,
                                                          textTransform: 'uppercase',
                                                          color: q.difficulty === 'Easy' ? '#16a34a' : q.difficulty === 'Medium' ? '#ca8a04' : '#dc2626',
                                                          background: q.difficulty === 'Easy' ? '#f0fdf4' : q.difficulty === 'Medium' ? '#fef9c3' : '#fef2f2'
                                                        }}>
                                                          {q.difficulty}
                                                        </span>
                                                      </td>
                                                      <td style={{ padding: '12px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                        <button
                                                          onClick={() => setExpandedSqlQuestions(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                                                          style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            padding: '5px 12px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.72rem',
                                                            fontWeight: 700,
                                                            background: isExpanded ? '#f59e0b' : 'rgba(245, 158, 11, 0.08)',
                                                            color: isExpanded ? '#ffffff' : '#d97706',
                                                            border: isExpanded ? '1px solid #f59e0b' : '1px solid rgba(245, 158, 11, 0.15)',
                                                            cursor: 'pointer',
                                                            marginRight: '8px',
                                                            transition: 'all 0.2s'
                                                          }}
                                                        >
                                                          {isExpanded ? 'Hide Query' : 'Optimal Query'}
                                                        </button>
                                                        <a
                                                          href={q.leetcode}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            padding: '5px 12px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.72rem',
                                                            fontWeight: 700,
                                                            background: 'rgba(139, 92, 246, 0.08)',
                                                            color: '#7c3aed',
                                                            border: '1px solid rgba(139, 92, 246, 0.15)',
                                                            textDecoration: 'none',
                                                            transition: 'all 0.2s'
                                                          }}
                                                        >
                                                          LeetCode
                                                        </a>
                                                      </td>
                                                    </tr>
                                                    {isExpanded && (
                                                      <tr>
                                                        <td colSpan="4" style={{ padding: '16px 20px', background: '#f8fafc', borderRadius: '8px' }}>
                                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                              <Terminal className="size-4.5 text-amber-500" />
                                                              <strong style={{ fontSize: '0.8rem', color: '#78350f', fontFamily: 'monospace' }}>MySQL / PostgreSQL Query</strong>
                                                            </div>
                                                            <pre style={{
                                                              margin: 0,
                                                              background: '#0f172a',
                                                              color: '#fef08a',
                                                              padding: '16px',
                                                              borderRadius: '8px',
                                                              fontSize: '0.82rem',
                                                              fontFamily: 'monospace, Courier New',
                                                              overflowX: 'auto',
                                                              lineHeight: '1.4'
                                                            }}>
                                                              <code>{q.query}</code>
                                                            </pre>
                                                            <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.5', borderLeft: '3px solid #f59e0b', paddingLeft: '10px', textAlign: 'left' }}>
                                                              <strong>Explanation:</strong> {q.explanation}
                                                            </div>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    )}
                                                  </React.Fragment>
                                                );
                                              })}
                                          </tbody>
                                        </table>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {selectedCseSubject === 'cn' && (
                        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {/* Overall CN Progress Summary */}
                          {(() => {
                            const totalConcepts = cnTrackerData.reduce((acc, curr) => acc + curr.concepts.length, 0);
                            const totalCompleted = Object.values(cnCompletedConcepts).filter(Boolean).length;
                            const progressPercent = Math.round((totalCompleted / totalConcepts) * 100);
                            return (
                              <div style={{ background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '16px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Trophy className="size-5 text-purple-600" />
                                    <strong style={{ fontSize: '1.0rem', color: '#581c87' }}>CN Concept Master Tracker</strong>
                                  </div>
                                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#6b21a8' }}>
                                    {totalCompleted} / {totalConcepts} Concepts Mastered ({progressPercent}%)
                                  </span>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                                </div>
                              </div>
                            );
                          })()}

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {cnTrackerData.map((category, idx) => {
                              const isOpen = !!cnOpenCategories[category.categoryName];
                              const solvedCount = category.concepts.filter(c => cnCompletedConcepts[c.id]).length;
                              return (
                                <div key={category.categoryName} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                  <div
                                    onClick={() => toggleCnCategory(category.categoryName)}
                                    style={{
                                      background: '#fafafa',
                                      padding: '16px 20px',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      userSelect: 'none',
                                      borderBottom: isOpen ? '1px solid #e2e8f0' : 'none'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'grid', placeItems: 'center', fontSize: '0.84rem', fontWeight: 800 }}>
                                        {idx + 1}
                                      </span>
                                      <strong style={{ fontSize: '0.94rem', color: '#1e293b' }}>{category.categoryName}</strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
                                        {solvedCount} / {category.concepts.length} Completed
                                      </span>
                                      <div style={{ position: 'relative', width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                                        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3.5"
                                            strokeDasharray={`${(solvedCount / category.concepts.length) * 100}, 100`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dasharray 0.35s ease' }}
                                          />
                                        </svg>
                                        <span style={{ position: 'absolute', fontSize: '0.62rem', fontWeight: 800, color: '#1e293b' }}>
                                          {Math.round((solvedCount / category.concepts.length) * 100)}%
                                        </span>
                                      </div>
                                      <ChevronRight
                                        className="size-5 text-slate-400"
                                        style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                                      />
                                    </div>
                                  </div>
                                  {isOpen && (
                                    <div style={{ overflowX: 'auto' }}>
                                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                          <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                                            <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '60px' }}>Status</th>
                                            <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700 }}>Concept</th>
                                            <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, textAlign: 'right' }}>Details</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                                                                    {category.concepts.map((concept) => {
                                            const isCompleted = !!cnCompletedConcepts[concept.id];
                                            const isMCQExpanded = !!expandedMCQConcepts[concept.id];
                                            return (
                                              <React.Fragment key={concept.id}>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9', background: isCompleted ? 'rgba(16, 185, 129, 0.02)' : '#ffffff', transition: 'background 0.2s' }}>
                                                  <td style={{ padding: '12px 20px' }}>
                                                    <button onClick={() => toggleCnConcept(concept.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                      {isCompleted ? (
                                                        <CheckCircle2 className="size-5 text-emerald-500" />
                                                      ) : (
                                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1', background: 'transparent', transition: 'border-color 0.2s' }} />
                                                      )}
                                                    </button>
                                                  </td>
                                                  <td style={{ padding: '12px 12px', fontSize: '0.84rem', fontWeight: 600, color: isCompleted ? '#94a3b8' : '#1e293b', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                                    {concept.name}
                                                  </td>
                                                  <td style={{ padding: '12px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                    {questionBankData.some(q => q.conceptId === concept.id) && (
                                                      <button
                                                        onClick={() => setExpandedMCQConcepts(prev => ({ ...prev, [concept.id]: !prev[concept.id] }))}
                                                        style={{
                                                          display: 'inline-flex',
                                                          alignItems: 'center',
                                                          padding: '5px 12px',
                                                          borderRadius: '8px',
                                                          fontSize: '0.72rem',
                                                          fontWeight: 700,
                                                          background: isMCQExpanded ? '#10b981' : 'rgba(16, 185, 129, 0.08)',
                                                          color: isMCQExpanded ? '#ffffff' : '#10b981',
                                                          border: isMCQExpanded ? '1px solid #10b981' : '1px solid rgba(16, 185, 129, 0.15)',
                                                          cursor: 'pointer',
                                                          marginRight: '8px',
                                                          transition: 'all 0.2s'
                                                        }}
                                                      >
                                                        {isMCQExpanded ? 'Close Q' : 'Practice Q'}
                                                      </button>
                                                    )}
                                                    <a
                                                      href={`/preparation/theory/CN?concept=${concept.id}`}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        padding: '5px 12px',
                                                        borderRadius: '8px',
                                                        fontSize: '0.72rem',
                                                        fontWeight: 700,
                                                        background: 'rgba(139, 92, 246, 0.08)',
                                                        color: '#7c3aed',
                                                        border: '1px solid rgba(139, 92, 246, 0.15)',
                                                        textDecoration: 'none',
                                                        transition: 'all 0.2s'
                                                      }}
                                                    >
                                                      View Theory
                                                    </a>
                                                  </td>
                                                </tr>
                                                {isMCQExpanded && (
                                                  <tr>
                                                    <td colSpan="3" style={{ padding: '8px 20px 16px 20px', background: '#f8fafc' }}>
                                                      {renderMCQChallengeForConcept(concept.id)}
                                                    </td>
                                                  </tr>
                                                )}
                                              </React.Fragment>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {selectedCseSubject === 'system_design' && (
                        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {/* Overall System Design Progress Summary */}
                          {(() => {
                            const totalConcepts = systemDesignTrackerData.reduce((acc, curr) => acc + curr.concepts.length, 0);
                            const totalCompleted = Object.values(sysCompletedConcepts).filter(Boolean).length;
                            const progressPercent = Math.round((totalCompleted / totalConcepts) * 100) || 0;
                            return (
                              <div style={{ background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '16px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Trophy className="size-5 text-purple-600" />
                                    <strong style={{ fontSize: '1.0rem', color: '#581c87' }}>System Design Tracker</strong>
                                  </div>
                                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#6b21a8' }}>
                                    {totalCompleted} / {totalConcepts} Concepts Mastered ({progressPercent}%)
                                  </span>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                                </div>
                              </div>
                            );
                          })()}

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {systemDesignTrackerData.map((category, idx) => {
                              const isOpen = !!sysOpenCategories[category.categoryName];
                              const solvedCount = category.concepts.filter(c => sysCompletedConcepts[c.id]).length;
                              const percent = Math.round((solvedCount / category.concepts.length) * 100) || 0;
                              return (
                                <div key={category.categoryName} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                  <div
                                    onClick={() => toggleSysCategory(category.categoryName)}
                                    style={{
                                      background: '#fafafa',
                                      padding: '16px 20px',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      userSelect: 'none',
                                      borderBottom: isOpen ? '1px solid #e2e8f0' : 'none'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'grid', placeItems: 'center', fontSize: '0.84rem', fontWeight: 800 }}>
                                        {idx + 1}
                                      </span>
                                      <strong style={{ fontSize: '0.94rem', color: '#1e293b' }}>{category.categoryName}</strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
                                        {solvedCount} / {category.concepts.length} Completed
                                      </span>
                                      <div style={{ position: 'relative', width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>
                                        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                                          <circle cx="18" cy="18" r="16" fill="none" stroke="#8b5cf6" strokeWidth="3.5"
                                            strokeDasharray={`${percent}, 100`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dasharray 0.35s ease' }}
                                          />
                                        </svg>
                                        <span style={{ position: 'absolute', fontSize: '0.62rem', fontWeight: 800, color: '#1e293b' }}>
                                          {percent}%
                                        </span>
                                      </div>
                                      <ChevronRight
                                        className="size-5 text-slate-400"
                                        style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                                      />
                                    </div>
                                  </div>
                                  {isOpen && (
                                    <div style={{ overflowX: 'auto' }}>
                                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                          <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                                            <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, width: '60px' }}>Status</th>
                                            <th style={{ padding: '12px 12px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700 }}>Concept</th>
                                            <th style={{ padding: '12px 20px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, textAlign: 'right' }}>Details</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {category.concepts.map((concept) => {
                                            const isCompleted = !!sysCompletedConcepts[concept.id];
                                            const isMCQExpanded = !!expandedMCQConcepts[concept.id];
                                            return (
                                              <React.Fragment key={concept.id}>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9', background: isCompleted ? 'rgba(16, 185, 129, 0.02)' : '#ffffff', transition: 'background 0.2s' }}>
                                                  <td style={{ padding: '12px 20px' }}>
                                                    <button onClick={() => toggleSysConcept(concept.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                                      {isCompleted ? (
                                                        <CheckCircle2 className="size-5 text-emerald-500" />
                                                      ) : (
                                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1', background: 'transparent', transition: 'border-color 0.2s' }} />
                                                      )}
                                                    </button>
                                                  </td>
                                                  <td style={{ padding: '12px 12px', fontSize: '0.84rem', fontWeight: 600, color: isCompleted ? '#94a3b8' : '#1e293b', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                                    {concept.name}
                                                  </td>
                                                  <td style={{ padding: '12px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                    {questionBankData.some(q => q.conceptId === concept.id) && (
                                                      <button
                                                        onClick={() => setExpandedMCQConcepts(prev => ({ ...prev, [concept.id]: !prev[concept.id] }))}
                                                        style={{
                                                          display: 'inline-flex',
                                                          alignItems: 'center',
                                                          padding: '5px 12px',
                                                          borderRadius: '8px',
                                                          fontSize: '0.72rem',
                                                          fontWeight: 700,
                                                          background: isMCQExpanded ? '#10b981' : 'rgba(16, 185, 129, 0.08)',
                                                          color: isMCQExpanded ? '#ffffff' : '#10b981',
                                                          border: isMCQExpanded ? '1px solid #10b981' : '1px solid rgba(16, 185, 129, 0.15)',
                                                          cursor: 'pointer',
                                                          marginRight: '8px',
                                                          transition: 'all 0.2s'
                                                        }}
                                                      >
                                                        {isMCQExpanded ? 'Close Q' : 'Practice Q'}
                                                      </button>
                                                    )}
                                                    <a
                                                      href={`/preparation/theory/SystemDesign?concept=${concept.id}`}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        padding: '5px 12px',
                                                        borderRadius: '8px',
                                                        fontSize: '0.72rem',
                                                        fontWeight: 700,
                                                        background: 'rgba(139, 92, 246, 0.08)',
                                                        color: '#7c3aed',
                                                        border: '1px solid rgba(139, 92, 246, 0.15)',
                                                        textDecoration: 'none',
                                                        transition: 'all 0.2s'
                                                      }}
                                                    >
                                                      View Theory
                                                    </a>
                                                  </td>
                                                </tr>
                                                {isMCQExpanded && (
                                                  <tr>
                                                    <td colSpan="3" style={{ padding: '8px 20px 16px 20px', background: '#f8fafc' }}>
                                                      {renderMCQChallengeForConcept(concept.id)}
                                                    </td>
                                                  </tr>
                                                )}
                                              </React.Fragment>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}



                  <div style={{ gridColumn: '1 / -1', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '16px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <Sparkles className="size-5 text-amber-500" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.87rem', color: '#78350f', marginBottom: '4px' }}>
                        Special Note for Technical Hiring
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#92400e', lineHeight: 1.5 }}>
                        Modern interview pipelines emphasize communication and clean coding over pure puzzle solving. Practice explaining your complexity analysis (Time & Space) concurrently while structuring solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. MOCK TEST TAB */}
            {activeTab === 'mocktest' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <ClipboardList className="size-6 text-indigo-600" />
                  <h2 style={{ fontSize: '1.31rem', fontWeight: 800, margin: 0 }}>Full-Length Mock Test</h2>
                </div>
                <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
                  Generate a complete AI-powered assessment covering Technical (60 MCQs), Verbal (15 MCQs), Aptitude (15 MCQs), and Coding (2 Problems).
                </p>

                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '32px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
                    Select Difficulty Level
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
                    {['easy', 'medium', 'hard'].map((level) => {
                      const isSelected = selectedDifficulty === level;
                      return (
                        <button
                          key={level}
                          onClick={() => setSelectedDifficulty(level)}
                          style={{
                            padding: '12px 32px',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                            boxShadow: isSelected ? '0 4px 14px rgba(79, 70, 229, 0.15)' : 'none',
                            background: '#ffffff',
                            color: '#334155',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            transition: 'all 0.2s'
                          }}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      if (!selectedDifficulty) {
                        showAlert(
                          "Difficulty Level Required", 
                          "Please select a difficulty level (Easy, Medium, or Hard) before starting the assessment."
                        );
                        return;
                      }
                      window.open(`/preparation/mock-test?difficulty=${selectedDifficulty}`, '_blank');
                    }}
                    style={{
                      background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '16px 48px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Play className="size-5" />
                    Start Assessment
                  </button>
                </div>
              </div>
            )}

            {/* 6. RESULTS TAB */}
            {activeTab === 'results' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Award className="size-6 text-indigo-600" />
                  <h2 style={{ fontSize: '1.31rem', fontWeight: 800, margin: 0 }}>Results & Reports</h2>
                </div>
                <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
                  Review your AI-graded mock assessments, interview transcripts, score breakdowns, and download official PDF reports.
                </p>

                {/* Sub-tabs for Tests vs Interviews */}
                <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #cbd5e1', paddingBottom: '1px', marginBottom: '24px' }}>
                  <button
                    onClick={() => setResultsActiveSubTab('tests')}
                    style={{
                      padding: '10px 20px',
                      background: 'none',
                      border: 'none',
                      borderBottom: resultsActiveSubTab === 'tests' ? '3px solid #4f46e5' : '3px solid transparent',
                      color: resultsActiveSubTab === 'tests' ? '#4f46e5' : '#64748b',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    Mock Tests
                  </button>
                  <button
                    onClick={() => setResultsActiveSubTab('interviews')}
                    style={{
                      padding: '10px 20px',
                      background: 'none',
                      border: 'none',
                      borderBottom: resultsActiveSubTab === 'interviews' ? '3px solid #4f46e5' : '3px solid transparent',
                      color: resultsActiveSubTab === 'interviews' ? '#4f46e5' : '#64748b',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    Mock Interviews
                  </button>
                </div>

                {resultsLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>Loading your results...</div>
                ) : resultsError ? (
                  <div style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>{resultsError}</div>
                ) : (
                  <div>
                    {resultsActiveSubTab === 'tests' ? (
                      <div>
                        {resultsData.tests.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '30px', border: '1px dashed #cbd5e1', borderRadius: '16px', color: '#64748b' }}>
                            No mock test reports found. Start a mock test to see your score cards!
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {resultsData.tests.map(test => {
                              const grading = test.details?.grading || {};
                              const coding_easy = grading.coding_easy || {};
                              const coding_hard = grading.coding_hard || {};
                              return (
                                <div key={test.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                                    <div>
                                      <span style={{ fontSize: '0.78rem', fontWeight: 800, background: '#f5f7ff', color: '#4f46e5', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', marginRight: '8px' }}>
                                        {test.difficulty} level
                                      </span>
                                      <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                                        Completed on {new Date(test.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => window.open(`/api/results/download-pdf?id=${test.id}&type=test`, '_blank')}
                                      style={{
                                        background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                                        color: 'white',
                                        padding: '8px 18px',
                                        borderRadius: '10px',
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
                                      }}
                                    >
                                      Download Report PDF
                                    </button>
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Total Marks</div>
                                      <strong style={{ fontSize: '1.25rem', color: '#16a34a' }}>{test.score} / {test.max_score}</strong>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Technical MCQs</div>
                                      <strong style={{ fontSize: '1.2rem', color: '#334155' }}>{test.technical_score} / 90.0</strong>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>({grading.technical?.correct || 0}/{grading.technical?.total || 0} Correct)</div>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Verbal MCQs</div>
                                      <strong style={{ fontSize: '1.2rem', color: '#334155' }}>{test.verbal_score} / 15.0</strong>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>({grading.verbal?.correct || 0}/{grading.verbal?.total || 0} Correct)</div>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Aptitude MCQs</div>
                                      <strong style={{ fontSize: '1.2rem', color: '#334155' }}>{test.aptitude_score} / 15.0</strong>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>({grading.aptitude?.correct || 0}/{grading.aptitude?.total || 0} Correct)</div>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Easy Coding</div>
                                      <strong style={{ fontSize: '1.2rem', color: '#334155' }}>{test.coding_easy_score} / 30.0</strong>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Hard Coding</div>
                                      <strong style={{ fontSize: '1.2rem', color: '#334155' }}>{test.coding_hard_score} / 50.0</strong>
                                    </div>
                                  </div>

                                  {/* Coding Challenge Detailed Evaluations */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <strong style={{ fontSize: '0.92rem', color: '#1e293b' }}>AI Coding Evaluator Feedback:</strong>
                                    {coding_easy && (
                                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                          <strong style={{ fontSize: '0.85rem', color: '#4f46e5' }}>Coding (Easy) Challenge</strong>
                                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>Score: {test.coding_easy_score} / 30.0</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                                          <strong>AI Evaluation:</strong> {coding_easy.feedback}
                                        </p>
                                      </div>
                                    )}
                                    {coding_hard && (
                                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                          <strong style={{ fontSize: '0.85rem', color: '#4f46e5' }}>Coding (Hard) Challenge</strong>
                                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>Score: {test.coding_hard_score} / 50.0</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                                          <strong>AI Evaluation:</strong> {coding_hard.feedback}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {resultsData.interviews.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '30px', border: '1px dashed #cbd5e1', borderRadius: '16px', color: '#64748b' }}>
                            No interview reports found. Start an AI Interview to see your score cards!
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {resultsData.interviews.map(interview => (
                              <div key={interview.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                                  <div>
                                    <strong style={{ fontSize: '1rem', color: '#1e293b', marginRight: '8px' }}>AI Mock Interview</strong>
                                    <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                                      Completed on {new Date(interview.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => window.open(`/api/results/download-pdf?id=${interview.id}&type=interview`, '_blank')}
                                    style={{
                                      background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                                      color: 'white',
                                      padding: '8px 18px',
                                      borderRadius: '10px',
                                      fontWeight: 700,
                                      fontSize: '0.85rem',
                                      border: 'none',
                                      cursor: 'pointer',
                                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
                                    }}
                                  >
                                    Download Report PDF
                                  </button>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px' }}>
                                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '16px 24px', borderRadius: '16px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Average Score</div>
                                    <strong style={{ fontSize: '1.6rem', color: '#059669' }}>{Math.round(interview.score)} / 100</strong>
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Feedback Summary:</div>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                                      {interview.feedback || "Good performance! Review individual question evaluations below for detailed suggestions."}
                                    </p>
                                  </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                  <strong style={{ fontSize: '0.9rem', color: '#1e293b' }}>Detailed Q&A Transcript ({interview.transcript?.length || 0} Questions):</strong>
                                  {(interview.transcript || []).map((tr, idx) => (
                                    <div key={tr.id || idx} style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '16px' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
                                        <span style={{ color: '#4f46e5' }}>Q{idx + 1}: {tr.question}</span>
                                        <span style={{ color: '#059669' }}>Grade: {tr.score}/100</span>
                                      </div>
                                      <div style={{ fontSize: '0.82rem', color: '#334155', marginBottom: '8px' }}>
                                        <strong>Your Answer:</strong> {tr.userAnswer}
                                      </div>
                                      {tr.feedback && (
                                        <div style={{ fontSize: '0.78rem', color: '#475569', borderLeft: '3px solid #cbd5e1', paddingLeft: '8px' }}>
                                          {tr.feedback.strengths && <div><strong>Strengths:</strong> {tr.feedback.strengths.join(', ')}</div>}
                                          {tr.feedback.improvements && <div style={{ marginTop: '2px' }}><strong>Improvements:</strong> {tr.feedback.improvements.join(', ')}</div>}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </section>

        </div>
      </main>

      <Footer />

      {/* Custom Modal overlay using Portal to guarantee full screen coverage */}
      {customModal.isOpen && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '30px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>
              {customModal.title}
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {customModal.message}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px' }}>
              {customModal.type === 'confirm' && (
                <button
                  onClick={closeModal}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#f1f5f9', color: '#64748b', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => {
                  if (customModal.onConfirm) customModal.onConfirm();
                  closeModal();
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: '12px', borderRadius: '12px', fontWeight: 600, background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                {customModal.type === 'confirm' ? 'Yes, proceed' : 'OK'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Preparation;
