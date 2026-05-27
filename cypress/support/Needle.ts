export function getDuplicatedSubString(stri1: string, str2: string): number {
  for (let i = 0; i < stri1.length - str2.length; i++) {
    const subString = stri1.substring(i, i + str2.length);
    if (subString === str2) {
      return i;
    }
  }
  return -1;
}

export function geLastWord(s: string): number {
  const words = s.trim().split(" ");
  return words[words.length - 1].length;
}
export function plusOne(nums: number[]): number[] | undefined {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < 9) {
      nums[i]++;
      return nums;
    }
    nums[i] === 0;
    nums.unshift(1);
    return nums;
  }
}
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function reveseListNode(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = null;
  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

function containsDuplicate(nums: number[]): boolean {
  const numSet: Set<number> = new Set();
  for (const num of nums) {
    if (numSet.has(num)) {
      return true;
    }
    numSet.add(num);
  }
  return false;
}
function summaryRanges(nums: number[]): string[] {
  const result: string[] = [];
  let start: number | null = null;
  nums.forEach((num, i) => {
    if (start === null) {
      start = num;
    }
    if (i === nums.length - 1 || nums[i + 1] !== num + 1) {
      result.push(start === num ? `${start}` : `${start}->${num}`);
      start = null;
    }
  });

  return result;
}

function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}

function fizzBuzz(n: number): string[] {
  const result: string[] = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(i.toString());
    }
  }
  return result;
}

function thirdMax(nums: number[]): number {
  const uniqueNums: Set<number> = new Set(nums);
  const sortedNums: number[] = Array.from(uniqueNums).sort((a, b) => b - a);
  return sortedNums.length >= 3 ? sortedNums[2] : sortedNums[0];
}
function checkRecord(s: string): boolean {
  let countA = 0;
  let countL = 0;
  for (const char of s) {
    if (char === "A") {
      countA++;
      countL = 0;
      if (countA > 1) return false;
    } else if (char === "L") {
      countL++;
      countA = 0;
      if (countL === 3) return false;
    } else {
      countL = 0;
    }
  }
  return true;
}

function reverseWords(s: string): string {
  return s
    .split(" ")
    .reduce((acc: string[], word) => {
      acc.push(word.split("").reverse().join(""));
      return acc;
    }, [])
    .join(" ");
}
class _Node {
  val: number;
  children: _Node[];
  constructor(val: number, children: []) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}

function postorder(root: _Node): number[] {
  if (!root) return [];
  if (root.children == null) return [root.val];
  const result: number[] = [];
  for (const child of root.children) {
    result.push(...postorder(child));
  }
  result.push(root.val);
  return result;
}

function canPlaceFlowers(nums: number[], n: number): boolean {
  for (let i = 0; i < nums.length; i++) {
    const left = i === 0 ? 0 : nums[i - 1];
    const right = i === nums.length ? 0 : nums[i + 1];
    if (left === 0 && right === 0) {
      nums[i] = 1;
      n--;
    }
    if (n === 0) return true;
  }
  return n <= 0;
}
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null, right: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function mergeTrees(
  node1: TreeNode | null,
  node2: TreeNode | null
): TreeNode | null {
  if (!node1) return node2;
  if (!node2) return node1;
  if (!node1 && !node2) return null;
  node1.val += node2.val;
  node1.left = mergeTrees(node1.left, node2.left);
  node1.right = mergeTrees(node1.right, node2.right);
  return node1;
}

function maximumProduct(nums: number[]): number {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  return Math.max(
    nums[0] * nums[1] * nums[n - 1],
    nums[n - 1] * nums[n - 2] * nums[n - 3]
  );
}

function averageOfLevels(root: TreeNode): number[] {
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  const size = queue.length;
  let sum = 0;
  while (queue.length > 0) {
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      sum += node!.val;
      if (node!.left) queue.push(node!.left);
      if (node!.right) queue.push(node!.right);
    }
    result.push(sum / size);
  }
  return result;
}
function findMaxAverage(nums: number[], k: number): number {
  let maxSum = 0;
  for (let i = 0; i < k; i++) {
    maxSum += nums[i];
  }
  let windowSum = maxSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i];
    windowSum -= nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum / k;
}

function findErrorNums(nums: number[]): number[] {
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  let missing = -1;
  let duplicate = -1;
  for (let i = 1; i <= nums.length; i++) {
    if (!map.has(i)) {
      missing = i;
    }
    if (map.get(i)! === 2) {
      duplicate = i;
    }
  }
  return [duplicate, missing];
}
function findTarget(root: TreeNode, k: number): boolean {
  if (!root) return false;
  const seen: Set<number> = new Set();
  function dsf(node: TreeNode): boolean {
    if (seen.has(k - node.val)) {
      return true;
    }
    seen.add(node.val);
    return dsf(node.left!) || dsf(node.right!);
  }
  return dsf(root);
}
function imageSmoother(img: number[][]): number[][] {
  const m = img.length;
  const n = img[0].length;
  const result: number[][] = [];
  for (let i = 0; i < m; i++) {
    result.push(new Array(n).fill(0));
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      let count = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const newX = i + x;
          const newY = j + y;
          if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
            sum += img[newX][newY];
            count++;
          }
        }
      }
      result[i][j] = Math.floor(sum / count);
    }
  }
  return result;
}
function findSecondMinimumValue(root: TreeNode): number {
  if (!root) return -1;
  let min = root.val;
  let secondMin = Infinity;
  function dfs(node: TreeNode | null) {
    if (!node) return -1;

    if (node.val < min && node.val > secondMin) {
      secondMin = node.val;
    }

    dfs(node.left!);
    dfs(node.right!);
  }

  dfs(root);
  return secondMin === Infinity ? -1 : secondMin;
}

function isPal(str: string, left: number, right: number): boolean {
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
function validPalindrome(str: string): boolean {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] === str[right]) {
      left++;
      right--;
    } else {
      isPal(str, left + 1, right) || isPal(str, left, right - 1);
    }
  }
  return true;
}

function calPoints(ops: string[]): number {
  const stack: number[] = [];
  for (const op of ops) {
    if (op === "C") {
      stack.pop();
    } else if (op === "D") {
      const last = stack[stack.length - 1] as number;
      stack.push(last * 2);
    } else if (op === "+") {
      const last = stack[stack.length - 1] as number;
      const secorndLast = stack[stack.length - 2] as number;
      stack.push(last + secorndLast);
    } else {
      stack.push(parseInt(op));
    }
  }
  let sum = 0;
  for (const score of stack) {
    sum += score;
  }
  return sum;
}

function findShortestSubArray(nums: number[]): number {
  let count: Map<number, number> = new Map();
  let firstIndex: Map<number, number> = new Map();
  let lastIndex: Map<number, number> = new Map();
  //count so lan xuat hien
  for (let i = 0; i < nums.length; i++) {
    count.set(nums[i], (count.get(nums[i]) || 0) + 1);
    if (!firstIndex.has(nums[i])) {
      firstIndex.set(nums[i], i);
    }
    lastIndex.set(nums[i], i);
  }
  let degree = 0;
  for (const freq of count.values()) {
    degree = Math.max(degree, freq);
  }
  let minLength = nums.length;
  for (const [num, freq] of count.entries()) {
    if (freq === degree) {
      const length = lastIndex.get(num)! - firstIndex.get(num)! + 1;
      minLength = Math.min(minLength, length);
    }
  }
  return minLength;
}

function shortestCompletingWord(
  liscensePlate: string,
  words: string[]
): string {
  //lam sach chuoi
  const cleaned = liscensePlate.toLowerCase().replace(/[^a-z]/g, "");
  //dem so lan xuat hien cua liscense plate
  const count: Map<string, number> = new Map();
  for (const char of cleaned) {
    count.set(char, (count.get(char) || 0) + 1);
  }
  let result = "";
  //dem chuoi
  for (const word of words) {
    const wordCount: Map<string, number> = new Map();
    for (const c of word) {
      wordCount.set(c, (wordCount.get(c) || 0) + 1);
    }
    let valid = true;
    for (const [char, freq] of count.entries()) {
      if ((wordCount.get(char) || 0) < freq) {
        valid = false;
        break;
      }
    }
    if (valid) {
      if (result === "" || word.length < result.length) {
        result = word;
      }
    }
  }
  return result;
}

function isToeplitzMatrix(maxtrix: number[][]): boolean {
  const m = maxtrix.length;
  const n = maxtrix[0].length;
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (maxtrix[i][j] !== maxtrix[i - 1][j - 1]) {
        return false;
      }
    }
  }
  return true;
}

function numJewelsInStones(jewels: string, stones: string): number {
  let count = 0;
  for (const stone of stones) {
    if (jewels.includes(stone)) {
      count++;
    }
  }
  return count;
}

function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
function searchInsert2(nums: number[], target: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) {
      return i;
    }
  }
  return nums.length;
}

function minSubArrayLen(nums: number[], target: number): number {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLength === Infinity ? 0 : minLength;
}

function removeDuplicates(nums: number[]): number {
  const stack: number[] = [];
  for (const num of nums) {
    if (stack.length > 0 && stack[stack.length - 1] === num) {
      stack.pop();
    } else {
      stack.push(num);
    }
  }
  return stack.length;
}

function canThreePartsEqualSum(nums: number[]): boolean {
  const totalSum = nums.reduce((acc, val) => acc + val, 0);
  if (totalSum % 3 !== 0) return false;
  const target = totalSum / 3;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum === target) {
      count++;
      sum = 0;
    }
  }
  return count >= 3;
}

function sortedSquares(nums: number[]): number[] {
  const result: number[] = [];
  for (const num of nums) {
    result.push(num * num);
  }
  return result.sort((a, b) => a - b);
}

function hasGroupsSizeX(nums: number[]): boolean {
  const count: Map<number, number> = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  const values = [...count.values()];
  const minCount = Math.min(...values);
  for (let c = 2; c <= minCount; c++) {
    if (values.every((val) => val % c === 0)) {
      return true;
    }
  }
  return false;
}
function arrayRankTransform(nums: number[]): number[] {
  const sorted = nums.sort((a, b) => a - b);
  const map: Map<number, number> = new Map();
  for (const num of sorted) {
    map.set(num, map.get(num) || 0 + 1);
  }
  let rank = 1;
  for (const [key, value] of map.entries()) {
    map.set(key, rank);
    rank++;
  }
  return nums.map((num) => map.get(num) as number);
}
function isPrefixOfWord(str: string, searchWord: string): number {
  const split = str.split(" ");
  for (let i = 0; i < split.length; i++) {
    if (split[i].startsWith(searchWord)) {
      return i + 1;
    }
  }
  return -1;
}

function slowestKey(releaseTimes: number[], keyPressed: string): string {
  const duration: number[] = [];
  duration.push(releaseTimes[0]);
  for (let i = 1; i < releaseTimes.length; i++) {
    duration.push(releaseTimes[i] - releaseTimes[i - 1]);
  }
  const arr: string[] = [];
  const max = Math.max(...duration);
  for (let i = 0; i < duration.length; i++) {
    if (duration[i] === max) {
      arr.push(keyPressed[i]);
    }
  }
  arr.sort();
  return arr[arr.length - 1];
}
function halvesAreAlike(str: string): boolean {
  const array: string[] = [];
  for (let i = 0; i < str.length; i += str.length / 2) {
    array.push(str.slice(i, i + str.length / 2));
  }
  let result: number[] = [];
  const compare = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  for (let i = 0; i < array.length; i++) {
    let count = 0;
    for (const char of array[i]) {
      compare.forEach((letter) => {
        if (char === letter) {
          count++;
        }
      });
    }
    result.push(count);
  }

  return result[0] === result[1];
}

function minOperations(nums: number[]): number {
  let count = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      const needed = nums[i - 1] + 1;
      count += needed - nums[i];
      nums[i] = needed;
    }
  }
  return count;
}
function construct2DArray(
  original: number[],
  m: number,
  n: number
): number[][] {
  if (m * n !== original.length) return [];
  const result: number[][] = [];
  for (let i = 0; i < m; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      row.push(original[i * n + j]);
    }
    result.push(row);
  }
  return result;
}
function minimumMoves(s: string): number {
  let i = 0;
  let count = 0;
  while (s.length > 0) {
    if (s[i] === "X") {
      i += 3;
      count++;
    } else {
      i++;
    }
  }
  return count;
}
function twoOutOfThree(
  nums1: number[],
  nums2: number[],
  nums3: number[]
): number[] {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  const set3 = new Set(nums3);
  const result: number[] = [];
  for (const n1 of nums1) {
    if (set2.has(n1) || set3.has(n1)) {
      result.push(n1);
    }
  }
  for (const n2 of nums2) {
    if (set1.has(n2) || set3.has(n2)) {
      result.push(n2);
    }
  }
  for (const n3 of nums3) {
    if (set1.has(n3) || set2.has(n3)) {
      result.push(n3);
    }
  }
  return [...new Set(result)];
}
function kthDistinct(arr: string[], k: number): string {
  const map: Map<string, number> = new Map();
  for (const a of arr) {
    map.set(a, (map.get(a) || 0) + 1);
  }
  const result: string[] = [];
  for (const [key, value] of map) {
    if (value === 1) {
      result.push(key);
    }
  }
  for (let i = 0; i < result.length; i++) {
    if (i === k - 1) {
      return result[i];
    }
  }
  return "";
}
function smallestEqual(nums: number[]): number {
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (i % 10 === nums[i]) {
      result.push(i);
    }
  }
  if (result.length === 0) return -1;
  return Math.min(...result);
}
function checkString(str: string): boolean {
  let seenB = false;
  for (const char of str) {
    if (char === "b") {
      seenB = true;
    } else if (char === "a" && seenB) {
      return false;
    }
  }
  return true;
}
function capitalizeTitle(title: string): string {
  const words = title.split(" ");
  let result = "";
  for (const word of words) {
    if (word.length > 2) {
      result += word[0].toUpperCase() + word.slice(1).toLowerCase() + " ";
    } else {
      result += word.toLowerCase() + " ";
    }
  }
  return result.trim();
}
function reverse(x: number): number {
  const toString = x.toString();
  const reversedString = toString.split("").reverse().join("");
  const reversedNumber = parseInt(reversedString) * Math.sign(x);
  if (
    reversedNumber < -Math.pow(2, 31) ||
    reversedNumber > Math.pow(2, 31) - 1
  ) {
    return 0;
  }
  return reversedNumber;
}
function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          result.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }
  return result;
}
function checkValid(matrix: number[][]): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  const array: number[] = [];

  for (let i = 1; i <= m; i++) {
    array.push(i);
  }
  array.sort((a, b) => a - b);

  for (let i = 0; i < m; i++) {
    const compareArray: number[] = [];
    const compareColumn: number[] = [];
    for (let j = 0; j < n; j++) {
      compareArray.push(matrix[i][j]);
      compareColumn.push(matrix[j][i]);
    }
    compareArray.sort((a, b) => a - b);
    compareColumn.sort((a, b) => a - b);
    if (compareColumn.join("") !== array.join("")) {
      return false;
    }
    if (compareArray.join("") !== array.join("")) {
      return false;
    }
  }
  return true;
}
function divideString(s: string, k: number, fill: string): string[] {
  const result: string[] = [];
  const remain = s.length % k;
  const fillCount = remain === 0 ? 0 : k - remain;
  s += fill.repeat(fillCount);
  for (let i = 0; i < s.length; i += k) {
    result.push(s.slice(i, i + k));
  }
  return result;
}
function countElements(nums: number[]): number {
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  let count = 0;
  for (const num of nums) {
    if (num > min && num < max) {
      count++;
    }
  }
  return count;
}
function multiply(num1: number) {
  return num1 * 2;
}
function findFinalValue(nums: number[], original: number): number {
  const set: Set<number> = new Set(nums);
  while (set.has(original)) {
    const next = original * 2;
    if (set.has(next)) {
      original = next;
    } else {
      return next;
    }
  }
  return original;
}
function sortEvenOdd(nums: number[]): number[] {
  const evenArray: number[] = [];
  const oddArray: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
      evenArray.push(nums[i]);
    } else {
      oddArray.push(nums[i]);
    }
  }
  evenArray.sort((a, b) => a - b);
  oddArray.sort((a, b) => b - a);
  const result: number[] = [];
  let evenIndex = 0;
  let oddIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
      result.push(evenArray[evenIndex]);
      evenIndex++;
    } else {
      result.push(oddArray[oddIndex]);
      oddIndex++;
    }
  }
  return result;
}
function numberOfPairs(nums: number[]): number[] {
  const result: number[] = [];
  const count: Map<number, number> = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  let pair = 0;
  let remain1 = 0;
  for (const [key, value] of count) {
    const remain = value % 2;
    pair += Math.floor(value / 2);
    if (remain !== 0) {
      remain1 = remain;
    }
  }
  result.push(pair);
  result.push(remain1);
  return result;
}
function strongPasswordCheckerII(password: string): boolean {
  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;
  let hasSpecial = false;
  if (password.length < 8) return false;
  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (char >= "a" && char <= "z") {
      hasLower = true;
    } else if (char >= "A" && char <= "Z") {
      hasUpper = true;
    } else if (char >= "0" && char <= "9") {
      hasDigit = true;
    } else if ("!@#$%^&*()-+".includes(char)) {
      hasSpecial = true;
    }
    if (i > 0 && char === password[i - 1]) {
      return false;
    }
  }
  return hasLower && hasUpper && hasDigit && hasSpecial;
}

function repeatedCharacter(str: string): string {
  const index: number[] = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] === str[j]) {
        index.push(j);
      }
    }
  }
  index.sort((a, b) => a - b);
  for (let i = 0; i < str.length; i++) {
    if (i === index[0]) {
      return str[i];
    }
  }
  return "";
}

function minimumOperations(nums: number[]): number {
  const set = new Set<number>();
  for (const num of nums) {
    if (num !== 0) {
      set.add(num);
    }
  }
  return set.size;
}
function arithmeticTriplets(nums: number[], diff: number): number {
  let count = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[j] - nums[i] === diff && nums[k] - nums[j] === diff) {
          count++;
        }
      }
    }
  }
  return count;
}

function answerQueries(nums: number[], queries: number[]): number[] {
  const sortedNums = nums.sort((a, b) => a - b);
  const prefixSum: number[] = [];
  const result: number[] = [];
  let sum = 0;
  for (const num of sortedNums) {
    sum += num;
    prefixSum.push(sum);
  }
  for (const q of queries) {
    let count = 0;
    for (let i = 0; i < prefixSum.length; i++) {
      const p = prefixSum[i];
      if (p <= q) {
        count = i + 1;
      } else {
        break;
      }
    }
    result.push(count);
  }
  return result;
}
function findSubarrays(nums: number[]): boolean {
  const result: number[] = [];
  let sum = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    sum = nums[i] + nums[i + 1];
    result.push(sum);
  }

  if (result.length === 0) return false;
  result.sort((a, b) => a - b);
  let count = 1;
  for (let i = 0; i < result.length; i++) {
    if (result[i] === result[i + 1]) {
      count++;
    }
  }
  if (count >= 2) {
    return true;
  }
  return false;
}
function mostFrequentEven(nums: number[]): number {
  const result: number[] = [];
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    if (num % 2 === 0) {
      map.set(num, (map.get(num) || 0) + 1);
    }
  }
  const max = Math.max(...map.values());
  for (const [key, value] of map) {
    if (value === max) {
      result.push(key);
    }
  }
  return result.length === 0 ? -1 : Math.min(...result);
}

function sortPeople(people: string[], heights: number[]): string[] {
  const map: Map<number, string> = new Map();
  for (let i = 0; i < people.length; i++) {
    map.set(heights[i], people[i]);
  }
  heights.sort((a, b) => b - a);
  const result: string[] = [];
  for (const height of heights) {
    result.push(map.get(height)!);
  }
  return result;
}
function equalFrequency(word: string): boolean {
  for (let i = 0; i < word.length; i++) {
    let result = "";
    for (let j = 0; j < word.length; j++) {
      if (i !== j) {
        result += word[j];
      }
    }
    const map: Map<string, number> = new Map();
    for (const char of result) {
      map.set(char, (map.get(char) || 0) + 1);
    }
    const set = new Set(map.values());
    if (set.size === 1) {
      return true;
    }
  }
  return false;
}

function commonFactors(a: number, b: number): number {
  const result: number[] = [];
  const min = Math.min(a, b);
  for (let i = 1; i <= min; i++) {
    if (a % i === 0 && b % i === 0) {
      result.push(i);
    }
  }
  return result.length;
}
function unequalTriplets(nums: number[]): number {
  let count = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] !== nums[j] && nums[i] !== nums[k] && nums[j] !== nums[k]) {
          count++;
        }
      }
    }
  }
  return count;
}
function similarPairs(words: string[]): number {
  let count = 0;
  for (let i = 0; i < words.length - 1; i++) {
    const set1 = new Set(words[i]);
    for (let j = i + 1; j < words.length; j++) {
      const set2 = new Set(words[j]);
      if (set1.size === set2.size) {
        let valid = true;
        for (const char of set1) {
          if (!set2.has(char)) {
            valid = false;
            break;
          }
        }
        if (valid) {
          count++;
        }
      }
    }
  }
  return count;
}
function getCommon(nums1: number[], nums2: number[]): number {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  let min = Infinity;
  for (const s1 of nums1) {
    if (set2.has(s1)) {
      min = Math.min(min, s1);
    }
  }

  return min === Infinity ? -1 : min;
}
function separateDigits(nums: number[]): number[] {
  const result: number[] = [];
  for (const num of nums) {
    const split = num.toString().split("");
    for (const s of split) {
      result.push(parseInt(s));
    }
  }
  return result;
}
function findTheArrayConcVal(nums: number[]): number {
  let value = 0;
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    if (left === right) {
      value += nums[left];
    } else {
      const concat = Number(nums[left].toString() + nums[right].toString());
      value += concat;
    }
  }
  return value;
}
function leftRightDifference(nums: number[]): number[] {
  const leftSum: number[] = [];
  const rightSum: number[] = [];
  let sum1 = 0;
  rightSum.push(0);
  for (let i = 1; i < nums.length; i++) {
    leftSum.push(sum1);
    sum1 += nums[i - 1];
  }
  let sum = 0;
  for (let j = nums.length - 1; j > 0; j--) {
    sum += nums[j];
    rightSum.push(sum);
  }
  rightSum.reverse();
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    result.push(Math.abs(leftSum[i] - rightSum[i]));
  }
  return result;
}
function minNumber(nums1: number[], nums2: number[]): number {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  const result: number[] = [];
  for (const num of nums1) {
    if (set2.has(num)) {
      result.push(num);
    } else {
      const min1 = Math.min(...nums1);
      const min2 = Math.min(...nums2);
      const str1 = Number(min1.toString() + min2.toString());
      const str2 = Number(min2.toString() + min1.toString());
      const str = Math.min(str1, str2);
      result.push(str);
    }
  }
  return result.sort((a, b) => a - b)[0];
}
function countPairs(nums: number[], target: number): number {
  let count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }
  return count++;
}
function isAcronym(words: string[], s: string): boolean {
  let acronym = "";
  for (const word of words) {
    acronym += word[0];
  }
  return acronym === s;
}
function numberGame(nums: number[]): number[] {
  const result: number[] = [];
  const sorted = nums.sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i += 2) {
    const temp: number[] = [];
    for (let j = i; j < i + 2 && j < sorted.length; j++) {
      temp.push(sorted[j]);
    }
    temp.sort((a, b) => b - a);
    result.push(...temp);
  }
  return result;
}
function missingInteger(nums: number[]): number {
  const set: Set<number> = new Set(nums);
  const increase: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      increase.push(nums[i]);
    } else if (nums[i] > nums[i - 1] && nums[i] === nums[i - 1] + 1) {
      increase.push(nums[i]);
    } else {
      break;
    }
  }
  console.log(increase);
  const sum = increase.reduce((acc, val) => acc + val, 0);
  let result = sum;
  while (set.has(sum)) {
    result++;
  }
  return result;
}
function maxFrequencyElements(nums: number[]): number {
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  const max = Math.max(...map.values());
  const result: number[] = [];
  for (const [key, value] of map) {
    if (value === max) {
      result.push(value);
    }
  }

  return result.reduce((acc, val) => acc + val, 0);
}
function maxOperations(nums: number[]): number {
  let count = 0;
  if (nums.length === 2) return (count = 1);
  const result: number[][] = [];
  for (let i = 0; i <= nums.length - 2; i += 2) {
    result.push([nums[i], nums[i + 1]]);
  }
  console.log(result);
  let sum: number[] = [];
  for (const pair of result) {
    sum.push(pair.reduce((acc, val) => acc + val, 0));
  }
  for (const s of sum) {
    if (s === sum[0]) {
      count++;
    }
  }
  return count;
}
function isPossibleToSplit(nums: number[]): boolean {
  const sorted = nums.sort((a, b) => a - b);
  const num1: number[] = [];
  const num2: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i % 2 === 0) {
      num1.push(sorted[i]);
    } else {
      num2.push(sorted[i]);
    }
  }

  let mum1Even = true;
  let num2Even = true;
  for (let i = 0; i < num1.length; i++) {
    if (num1[i] === num1[i + 1]) {
      mum1Even = false;
      break;
    }
  }
  for (let i = 0; i < num2.length; i++) {
    if (num2[i] === num2[i + 1]) {
      num2Even = false;
      break;
    }
  }
  if (mum1Even && num2Even) {
    return true;
  }
  return false;
}
function threeSumClosest(nums: number[], target: number): number {
  let closet = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        if (Math.abs(sum - target) < Math.abs(closet - target)) {
          closet = sum;
        }
        if (closet === target) {
          return closet;
        }
      }
    }
  }
  return closet;
}
function divide(dividend: number, divisor: number): number {
  const result = dividend / divisor;
  return Math.ceil(result);
}
function minimumBoxes(apples: number[], capacities: number[]): number {
  const result: number[] = [];
  const sortedCapacities = capacities.sort((a, b) => b - a);
  const sumApples = apples.reduce((acc, val) => acc + val, 0);
  let sumSorted = 0;
  for (let i = 0; i < sortedCapacities.length; i++) {
    sumSorted += sortedCapacities[i];
    if (sumSorted >= sumApples) {
      return i + 1;
    }
  }
  return -1;
}
function isSubstringPresent(s: string): boolean {
  if (s.length < 2) return false;
  const reverseString = s.split("").reverse().join("");

  const result: string[] = [];
  for (let i = 0; i < s.length; i++) {
    result.push(s.slice(i, i + 2));
  }
  const subString: string[] = [];
  for (let i = 0; i < reverseString.length; i++) {
    subString.push(reverseString.slice(i, i + 2));
  }
  for (const r of result) {
    for (const s of subString) {
      if (r === s) {
        return true;
      }
    }
  }
  return false;
}
function maximumLengthSubstring(s: string) {
  const result: string[] = [];
  for (let i = 0; i < s.length; i++) {
    let temp = "";
    for (let j = i; j < s.length; j++) {
      temp += s[j];
      result.push(temp);
    }
  }
  console.log(result);
  let maxLen = 0;
  for (const r of result) {
    const map: Map<string, number> = new Map();
    for (const char of r) {
      map.set(char, (map.get(char) || 0) + 1);
    }
    let valid = true;
    for (const [key, value] of map) {
      if (value > 2) {
        valid = false;
        break;
      }
    }
    if (valid) {
      maxLen = Math.max(maxLen, r.length);
    }
  }
  return maxLen;
}
function sumOfTheDigitsOfHarshadNumber(n: number): number {
  const sum = n
    .toString()
    .split("")
    .reduce((acc, val) => acc + parseInt(val), 0);
  if (n % sum === 0) {
    return sum;
  }
  return -1;
}
function longestMonotonicSubarray(nums: number[]): number {
  let maxLen = 0;
  for (let i = 1; i < nums.length - 1; i++) {
    let inc = 1;
    let dec = 1;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] < nums[j]) {
        inc++;
        dec = 1;
      } else if (nums[i] > nums[j]) {
        dec++;
        inc = 1;
      } else {
        break;
      }
      maxLen = Math.max(maxLen, inc, dec);
    }
  }

  return maxLen;
}

function numberOfSpecialChars(s: string): number {
  const set = new Set(s);
  let count = 0;
  for (const char of set) {
    if (char === char.toLocaleLowerCase() && set.has(char.toUpperCase())) {
      count++;
    }
  }
  return count;
}
function addedInteger(nums1: number[], nums2: number[]): number {
  const result: number[] = [];
  const sorted1 = nums1.sort((a, b) => b - a);
  const sorted2 = nums2.sort((a, b) => b - a);
  for (let i = 0; i < nums1.length; i++) {
    result.push(sorted2[i] - sorted1[i]);
  }
  for (const r of result) {
    if (r === result[0]) {
      return r;
    }
  }
  return -1;
}
function satisfiesConditions(grids: number[][]): boolean {
  if (grids.length === 1) return true;
  for (let i = 0; i < grids.length; i++) {
    for (let j = 0; j < grids[0].length; j++) {
      if (i < grids.length - 1 && grids[i][j] !== grids[i + 1][j]) {
        return false;
      }
      if (j < grids[0].length - 1 && grids[i][j] !== grids[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}
function isArraySpecial(nums: number[]): boolean {
  const array: number[][] = [];
  for (let i = 0; i < nums.length - 1; i++) {
    array.push([nums[i], nums[i + 1]]);
  }
  console.log(array);
  if (array.length === 1) return true;
  let valid = false;
  for (const a of array) {
    if (
      (a[0] % 2 === 0 && a[1] % 2 !== 0) ||
      (a[0] % 2 !== 0 && a[1] % 2 === 0)
    ) {
      valid = true;
    }
  }
  return valid;
}
function numberOfPairs(nums1: number[], nums2: number[], k: number): number {
  let count = 0;
  for (let i = 0; i <= nums1.length - 1; i++) {
    for (let j = 0; j <= nums2.length - 1; j++) {
      if (nums1[i] % (nums2[j] * k) === 0) {
        count++;
      }
    }
  }
  return count;
}
function minimumChairs(s: string): number {
  let current = 0;
  let max = 0;
  for (const c of s) {
    if (c === "E") {
      current++;
      max = Math.max(max, current);
    } else {
      current--;
    }
  }
  return max;
}
function countCompleteDayPairs(hours: number[]): number {
  const result: number[][] = [];
  for (let i = 0; i < hours.length - 1; i++) {
    for (let j = i + 1; j < hours.length; j++) {
      if ((hours[i] + hours[j]) % 24 === 0) {
        result.push([hours[i], hours[j]]);
      }
    }
  }
  return result.length;
}
function clearDigits(s: string): string {
  const stack: string[] = [];
  for (const char of s) {
    if (char >= "0" && char <= "9") {
      if (s.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }
  return stack.join("");
}
function minimumOperations(nums: number[]): number {
  let count = 0;
  for (const num of nums) {
    if ((num + 1) % 3 || (num + 2) % 3) {
      count++;
    } else {
      continue;
    }
  }
  return count;
}
function numberOfAlternatingGroups(nums: number[]): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    const a = nums[i];
    const b = nums[(i + 1) % nums.length];
    const c = nums[(i + 2) % nums.length];
    if (a === c && b !== a && b !== c) {
      count++;
    }
  }
  return count;
}
function getEncryptedString(s: string, k: number): string {
  const result: string[] = [];
  const split = s.split("");
  result.push(split[k]);
  for (let i = 1; i <= split.length; i++) {
    result.push(split[(k + 1) % split.length]);
  }
  console.log(result);
  return result.join("");
}
function possibleStringCount(word: string): number {
  let count = 1;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === word[i + 1]) {
      count++;
    }
  }
  return count;
}
function isBalanced(nums: string): boolean {
  let evenSum = 0;
  let oddSum = 0;
  const split = nums.split("");
  for (let i = 0; i < split.length; i++) {
    if (i % 2 === 0) {
      evenSum += Number(split[i]);
    } else {
      oddSum += Number(split[i]);
    }
  }
  return evenSum === oddSum;
}
function smallestNumber(n: number, t: number): number {
  let checkingNumber = 0;
  while (checkingNumber >= n) {
    const prodDigit = checkingNumber
      .toString()
      .split("")
      .reduce((acc, val) => acc * parseInt(val), 0);
    if (prodDigit % t === 0) {
      return checkingNumber;
    }
    checkingNumber++;
  }
  return -1;
}
function hasIncreasingSubarrays(nums: number[], k: number): boolean {
  const result: number[] = [];
  for (let i = 0; i <= nums.length - k; i++) {
    let increase = true;
    for (let j = i; j < i + k - 1; j++) {
      if (nums[j] >= nums[j + 1]) {
        increase = false;
        break;
      }
    }

    if (increase) {
      result.push(i);
    }
  }
  for (let i = 0; i < result.length - 1; i++) {
    if (result[i] + k === result[i + 1]) {
      return true;
    }
  }
  return false;
}
function canAliceWin(n: number): boolean {
  n = n % 11;
  return n >= 10;
}
function minimumSumSubarray(nums: number[], l: number, r: number): number {
  const arrLen: number[] = [];
  for (let i = l; i <= r; i++) {
    arrLen.push(i);
  }
  console.log(arrLen);
  const result: number[][] = [];
  for (const a of arrLen) {
    for (let i = 0; i < nums.length; i++) {
      result.push(nums.slice(i, i + a));
    }
  }
  const minArray: number[] = [];
  for (const r of result) {
    const sum = r.reduce((acc, val) => acc + val, 0);
    if (sum > 0) {
      minArray.push(sum);
    }
  }

  return minArray.length === 0 ? -1 : Math.min(...minArray);
}
function findValidPair(s: string): string {
  const map: Map<string, number> = new Map();
  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i];
    const b = s[i + 1];
    if (a !== b && map.get(a) === Number(b) && map.get(b) === Number(a)) {
      return a + b;
    }
  }

  return "";
}
function maxDifference(s: string): number {
  const map: Map<string, number> = new Map();
  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  const values = [...map.values()];
  const odd: number[] = values.filter((val) => val % 2 !== 0);
  const even: number[] = values.filter((val) => val % 2 === 0);
  console.log(odd, even);
  const result: number[] = [];
  for (const o of odd) {
    for (const e of even) {
      const dif = o - e;
      result.push(dif);
    }
  }
  return Math.max(...result);
}
function transformArray(nums: number[]): number[] {
  const result: number[] = nums
    .reduce((acc: number[], val: number) => {
      acc.push(val % 2 === 0 ? 0 : 1);
      return acc;
    }, [])
    .sort((a, b) => a - b);
  return result;
}
function largestInteger(nums: number[], k: number): number {
  let max = -1;
  for (let i = 0; i < nums.length - k; i++) {
    const map: Map<number, number> = new Map();
    for (let j = i; j < i + k; j++) {
      map.set(nums[j], (map.get(nums[j]) || 0) + 1);
    }
    for (const [key, val] of map) {
      if (val === 1) {
        max = Math.max(max, key);
      }
    }
  }
  return max;
}
function maxSum(nums: number[]): number {
  const set: Set<number> = new Set(nums);
  const arr: number[] = [...set];
  const sum = [...set].reduce((acc, val) => acc + val, 0);
  let result = 0;
  if (sum < 0) {
    for (const a of arr) {
      if (a > 0) {
        result += a;
      }
    }
  } else {
    result = sum;
  }
  return result;
}
function firstStableIndex(nums: number[], k: number): number {
  let max = 0;
  let min = 0;
  let diff = 0;
  const index: number[] = [];
  const leftArray: number[] = [];

  for (let i = 0; i <= nums.length - 1; i++) {
    leftArray.push(nums[i]);
    max = Math.max(...leftArray);
    const rightArray: number[] = [];
    for (let j = i; j < nums.length; j++) {
      rightArray.push(nums[j]);
    }
    min = Math.min(...rightArray);
    diff = max - min;
    if (diff <= k) {
      index.push(i);
    }
  }
  return index.length === 0 ? -1 : Math.min(...index);
}
function findDegrees(matrix: number[][]): number[] {
  const result: number[] = [];
  for (const m of matrix) {
    let count = 0;
    for (const n of m) {
      if (n === 1) {
        count++;
      }
    }
    result.push(count);
  }
  return result;
}
function trafficSignal(timer: number): string {
  if (timer === 0) {
    return "green";
  }
  if (timer === 30) {
    return "yellow";
  }
  if (timer >= 30 && timer <= 90) {
    return "red";
  }
  return "Invalid";
}
function smallestIndex(nums: number[]): number {
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const sum = nums[i]
      .toString()
      .split("")
      .reduce((acc, val) => acc + Number(val), 0);
    if (sum === i) {
      result.push(i);
    }
  }
  return result.length === 0 ? -1 : Math.min(...result);
}
function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
  const sortedFruits = baskets.sort((a, b) => b - a);
  const sortedBaskets = fruits.sort((a, b) => b - a);
  let i = 0;
  let j = 0;
  while (i < sortedFruits.length && j < sortedBaskets.length) {
    if (sortedFruits[i] <= sortedBaskets[j]) {
      i++;
      j++;
    }
    j++;
  }
  return sortedBaskets.length - j;
}
function maxContainers(n: number, w: number, maxWeight: number): number {
  const mul = n * n * w;
  if (mul <= maxWeight) {
    return n * n;
  } else {
    return Math.floor(maxWeight / w);
  }
}
function reverseDegree(s: string): number {
  const character: string = "abcdefghijklmnopqrstuvwxyz";

  const map: Map<string, number> = new Map();
  for (let i = 0; i < 26; i++) {
    map.set(character[i], 26 - i);
  }
  let sum = 0;
  for (let j = 1; j <= s.length; j++) {
    if (map.get(s[j - 1])) {
      const product = map.get(s[j - 1])! * j;
      sum += product;
    }
  }
  return sum;
}
function minimumPairRemoval(nums: number[]): number {
  let i = 0;
  let count = 0;

  while (i < nums.length - 1) {
    if (nums[i] <= nums[i + 1]) {
      i++;
    } else {
      nums.splice(i, 2);
      count++;
      i = Math.max(0, i - 1);
    }
  }
  return count;
}
function minOperations(nums: number[], k: number): number {
  let i = 1;
  let count = 0;

  while (i < nums.length - 1) {
    const sum = nums.reduce((acc, val) => acc + val, 0);
    if (sum % k === 0) {
      return count;
    } else {
    }
  }
}
function findClosest(x: number, y: number, z: number): number {
  const first = Math.abs(z - x);
  const second = Math.abs(z - y);
  if (first < second) {
    return 1;
  } else if (first > second) {
    return 2;
  } else {
    return 0;
  }
}
function maxProduct(n: number): number {
  const split = n
    .toString()
    .split("")
    .map((n) => parseInt(n));
  const result: number[] = [];
  for (let i = 0; i < split.length; i++) {
    for (let j = i; j < split.length; j++) {
      if (i !== j) {
        result.push(split[i] * split[j]);
      }
    }
  }
  return Math.max(...result);
}
function maxFreqSum(s: string): number {
  const vowels: string = "aeiou";
  const map: Map<string, number> = new Map();
  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  let maxVowel = 0;
  let maxNonVowel = 0;
  for (const [key, val] of map) {
    if (vowels.includes(key)) {
      maxVowel = Math.max(maxVowel, val);
    } else {
      maxNonVowel = Math.max(maxNonVowel, val);
    }
  }
  return maxVowel + maxNonVowel;
}
function minCuttingCost(n: number, m: number, k: number): number {
  if (n <= k && m <= k) {
    return 0;
  } else if (n > k && m > k) {
    return Math.min(1 * (n - k), 1 * (m - k));
  } else if (n > k) {
    return 1 * (n - k);
  } else if (m > k) {
    return 1 * (m - k);
  } else {
    return 0;
  }
}
function generateTag(caption: string): string {
  let addedString = "#";

  const split = caption.split(" ");
  for (let i = 0; i < split.length; i++) {
    let str = split[i].toLowerCase();
    let word = "";
    if (i === 0) {
      word = str;
    } else {
      word = str.charAt(0).toUpperCase() + str.slice(1);
    }
    addedString += word;
  }
  return addedString.slice(0, 99);
}
function checkPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
function checkPrimeFrequency(nums: number[]): boolean {
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  for (const [key, val] of map) {
    if (checkPrime(val)) {
      return true;
    }
  }
  return false;
}
function validateCoupons(
  codes: string[],
  businessLines: string[],
  isActive: boolean[]
): string[] {
  const result: { code: string; line: string }[] = [];
  const businessList: string[] = [
    "electronics",
    "grocery",
    "pharmacy",
    "restaurant",
  ];
  const validLetters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < codes.length; i++) {
    let validCode = true;
    if (codes[i].length === 0) {
      validCode = false;
    }

    let validLine = true;
    let validActive = true;
    for (const char of codes[i]) {
      if (!validLetters.includes(char)) {
        validCode = false;
        break;
      }
    }
    if (!businessList.includes(businessLines[i])) {
      validLine = false;
    }
    if (isActive[i] === false) {
      validActive = false;
    }
    if (validCode && validLine && validActive) {
      result.push({ code: codes[i], line: businessLines[i] });
    }
  }
  result.sort((a, b) => {
    if (a.line === b.line) {
      return a.code.localeCompare(b.code);
    }
    return a.line.localeCompare(b.line);
  });
  return result.map((item) => item.code);
}
function checkDivisibility(n: number): boolean {
  const split = n
    .toString()
    .split("")
    .map((n) => parseInt(n));
  const plus = split.reduce((acc, val) => acc + val, 0);
  const mul = split.reduce((acc, val) => acc * val, 1);
  return (plus + mul) % n === 0;
}
function gcdOfOddEvenSums(n: number): number {
  let oddSum = 0;
  let evenSum = 0;
  for (let i = 1; i <= n * 2; i++) {
    if (i % 2 === 0) {
      evenSum += i;
    } else {
      oddSum += i;
    }
  }
  let max = 0;
  for (let i = 1; i <= n; i++) {
    if (evenSum % i === 0 && oddSum % i === 0) {
      max = Math.max(max, i);
    }
  }
  return max;
}
function getLeastFrequentDigit(n: number): number {
  const split = n
    .toString()
    .split("")
    .map((n) => parseInt(n));
  const map: Map<number, number> = new Map();
  for (const s of split) {
    map.set(s, (map.get(s) || 0) + 1);
  }
  let minNumber = Number.MAX_SAFE_INTEGER;
  const min = [...map.entries()].sort((a, b) => a[1] - b[1])[0][0];
  for (const [key, val] of map) {
    if (val === map.get(min)) {
      minNumber = Math.min(minNumber, key);
    }
  }
  return minNumber;
}
function recoverOrder(order: number[], friends: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < order.length; i++) {
    for (let j = 0; j < friends.length; j++) {
      if (order[i] === friends[j]) {
        result.push(order[i]);
      }
    }
  }
  return result;
}
function smallestAbsent(nums: number[]): number {
  let result = Infinity;
  const avg = Math.floor(nums.reduce((acc, val) => acc + val, 0) / nums.length);
  const max = Number.MAX_SAFE_INTEGER;
  const set = new Set(nums.sort((a, b) => a - b));
  for (let i = 0; i <= max; i++) {
    if (!set.has(i) && i > avg) {
      result = i;
      break;
    }
  }
  return result;
}
function earliestTime(tasks: number[][]): number {
  let min = tasks[0].reduce((acc, val) => acc + val, 0);
  for (const t of tasks) {
    const sum = t.reduce((acc, val) => acc + val, 0);
    min = Math.max(min, sum);
  }
  return min;
}
function maxKDistinct(nums: number[], k: number): number[] {
  const sorted = [...new Set(nums.sort((a, b) => b - a))];
  return sorted.slice(0, k);
}
function bitwiseOR(nums: number[]): number {
  let result = 0;
  for (const num of nums) {
    result |= num;
  }
  return result;
}
function evenNumberBitwiseORs(nums: number[]): number {
  const result: number[] = [];
  for (const num of nums) {
    if (num % 2 === 0) {
      result.push(num);
    }
  }
  return bitwiseOR(result);
}
function majorityFrequencyGroup(s: string): string {
  let result: string[] = [];
  const map: Map<string, number> = new Map();
  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  const groupChar: Map<number, string[]> = new Map();
  for (const [key, val] of map) {
    if (!groupChar.has(val)) {
      groupChar.set(val, []);
    }
    groupChar.get(val)?.push(key);
  }
  let groupCharMax = 1;
  for (const [key, val] of groupChar) {
    groupCharMax = Math.max(groupCharMax, val.length);
  }
  let maxKey = 0;
  for (const [key, val] of groupChar) {
    if (val.length === groupCharMax) {
      maxKey = Math.max(maxKey, key);
    }
  }
  return groupChar.get(maxKey)?.join("") || "";
}
function alternatingSum(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
      sum += nums[i];
    } else {
      sum -= nums[i];
    }
  }

  return sum;
}
function scoreBalance(s: string): boolean {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const map: Map<string, number> = new Map();
  for (let i = 1; i < 27; i++) {
    map.set(letters[i - 1], i);
  }
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      total += map.get(s[i])!;
    }
  }
  let leftSum = 0;
  let rightSum = 0;
  for (let i = 0; i < s.length - 1; i++) {
    if (map.has(s[i])) {
      leftSum += map.get(s[i])!;
    }
    rightSum = total - leftSum;
    if (leftSum === rightSum) {
      return true;
    }
  }
  return false;
}
function sumDivisibleByK(nums: number[], k: number): number {
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  const result: number[] = [];
  for (const [key, val] of map) {
    if (val % k === 0) {
      result.push(key);
    }
  }
  let sum = 0;
  for (const num of nums) {
    for (const r of result) {
      if (num === r) {
        sum += num;
      }
    }
  }
  return sum;
}
function missingMultiple(nums: number[], k: number): number {
  let max = Number.MAX_SAFE_INTEGER;
  const set = new Set([...nums.sort((a, b) => a - b)]);

  for (let i = 0; i < max; i++) {
    if (i % k === 0 && !set.has(i)) {
      return i;
    }
  }
  return -1;
}
function removeZeros(n: number): number {
  const split = n
    .toString()
    .split("")
    .map((n) => parseInt(n));
  const result: number[] = [];
  for (const s of split) {
    if (s === 0) {
      continue;
    } else {
      result.push(s);
    }
  }
  return parseInt(result.join(""));
}
function findMissingElements(nums: number[]): number[] {
  const result: number[] = [];
  const sorted = nums.sort((a, b) => a - b);
  const set = new Set([...sorted]);
  for (let i = sorted[0]; i <= sorted[sorted.length - 1]; i++) {
    if (!set.has(i)) {
      result.push(i);
    }
  }
  return result;
}

function reverseByType(s: string): string {
  const letters: string[] = [];
  const chars: string[] = [];
  for (const char of s) {
    if (char >= "a" && char <= "z") {
      letters.push(char);
    } else {
      chars.push(char);
    }
  }

  const str = s.split("");
  for (let i = 0; i < s.length; i++) {
    if (str[i] >= "a" && str[i] <= "z") {
      str[i] = letters.pop()!;
    } else {
      str[i] = chars.pop()!;
    }
  }
  return str.join("");
}
function countMonobit(n: number): number {
  let count = 0;
  const bits: string[] = [];
  for (let i = 0; i <= n; i++) {
    bits.push(i.toString(2));
  }
  for (const b of bits) {
    const set = new Set(b);
    if (set.size === 1) {
      count++;
    }
  }
  return count;
}
function toggleLightBulbs(bulbs: number[]): number[] {
  const set: Set<number> = new Set();
  for (let i = 0; i < bulbs.length; i++) {
    if (!set.has(bulbs[i])) {
      set.add(bulbs[i]);
    } else {
      set.delete(bulbs[i]);
    }
  }
  return [...set].sort((a, b) => a - b);
}
function minDistinctFreqPair(nums: number[]): number[] {
  const x: number = Math.min(...nums);
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  const result: number[] = [x];
  for (const [key, val] of map) {
    if (key !== x && val !== map.get(x)!) {
      result.push(key);
    }
  }
  return result.length === 0
    ? [-1, -1]
    : result.sort((a, b) => a - b).slice(0, 2);
}
function uniformArray(num1: number[]): boolean {
  const num2: number[] = [];
  for (let i = 0; i < num1.length; i++) {
    for (let j = i + 1; j < num1.length; j++) {
      if (i === j) {
        num2.push(num1[i]);
      } else {
        num2.push(num1[i] - num1[j]);
      }
    }
  }
  console.log(num2);
  let valid = false;
  const result: boolean[] = [];
  for (const r of num2) {
    if (r % 2 === 0) {
      valid = true;
      result.push(valid);
    } else {
      result.push(valid);
    }
  }
  console.log(result);
  for (const r of result) {
    if (r !== result[0]) {
      return false;
    }
  }
  return true;
}

function minAbsoluteDifference(nums: number[]): number {
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (
        (nums[i] === 1 && nums[j] === 2) ||
        (nums[i] === 2 && nums[j] === 1)
      ) {
        result.push(Math.abs(i - j));
      }
    }
  }
  return result.length === 0 ? -1 : Math.min(...result);
}
function strStr(haystack: string, needle: string): number {
  const n = needle.length;
  for (let i = 0; i <= haystack.length - n; i++) {
    const slice = haystack.slice(i, i + n);
    if (slice === needle) {
      return i;
    }
  }
  return -1;
}
function findDisappearedNumbers(nums: number[]): number[] {
  let result: number[] = [];
  const set: Set<number> = new Set(nums);
  for (let i = 1; i <= nums.length; i++) {
    if (!set.has(i)) {
      result.push(i);
    }
  }
  return result;
}
function findContentChildren(g: number[], s: number[]): number {
  let count = 0;
  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < s.length; j++) {
      if (g[i] <= s[j]) {
        s.splice(i, j);
        count++;
      }
    }
  }
  return count;
}
function numberOfLines(widths: number[], s: string): number[] {
  const result: number[] = [];
  const letters: string = "abcdefghijklmnopqrstuvwxyz";
  const map: Map<string, number> = new Map();
  for (let i = 0; i < letters.length; i++) {
    map.set(letters[i], widths[i]);
  }
  let score = 0;

  for (const str of s) {
    let count = 0;
    if (map.has(str)) {
      score += map.get(str)!;
      if (score <= 100) {
        count++;
      }
    }
  }
}
function findJudge(n: number, trust: number[][]): number {
  let result = -1;
  let valid = true;
  if (trust.length === 1) {
    return trust[0][1];
  }
  for (let i = 1; i < trust.length; i++) {
    if (trust[i][1] !== trust[0][1]) {
      valid = false;
    }
  }
  if (valid) {
    result = trust[0][1];
  }
  return result;
}
function gcdOfStrings(str1: string, str2: string): string {
  for (let i = 0; i < str1.length; i++) {
    const slice1 = str1.slice(i, i + 1);
    const slice2 = str2.slice(i, i + 1);
    const slice3 = str1.slice(i + 1);
    if (slice1 === slice2 && slice3 === slice2) {
      return slice1;
    }
  }
}
function countCharacters(words: string[], chars: string): number {
  const map: Map<string, number> = new Map();
  for (const char of chars) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  let length = 0;
  for (const word of words) {
    let valid = true;
    for (const char of word) {
      if (!map.has(char)) {
        valid = false;
        break;
      }
    }
    if (valid) {
      length += word.length;
    }
  }
  return length;
}
function minimumAbsDifference(arr: number[]): number[][] {
  arr.sort((a, b) => a - b);
  let compare = Math.abs(arr[0] - arr[1]);
  for (let i = 2; i < arr.length; i++) {
    if (Math.abs(arr[i] - arr[i - 1]) < compare) {
      compare = Math.abs(arr[i] - arr[i - 1]);
    }
  }
  console.log(compare);
  const result: number[][] = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === compare) {
      result.push([arr[i - 1], arr[i]]);
    }
  }
  return result;
}
function decompressRLElist(nums: number[]): number[] {
  const result: number[] = [];
  const temp: number[][] = [];
  for (let i = 0; i < nums.length; i += 2) {
    temp.push([nums[i], nums[i + 1]]);
  }
  for (let j = 0; j < temp.length; j++) {
    for (let k = 0; k < temp[j][0]; k++) {
      result.push(temp[j][1]);
    }
  }
  return result;
}
function sortByBits(arr: number[]): number[] {
  const map: Map<number, number> = new Map();
  for (const a of arr) {
    const bit = a.toString(2);
    let count1 = 0;
    for (const b of bit) {
      if (b === "1") {
        count1++;
      }
    }
    map.set(a, count1);
  }
  return arr.sort((a, b) => {
    if (map.get(a) === map.get(b)) {
      return a - b;
    }
    return map.get(a)! - map.get(b)!;
  });
}
function countLargestGroup(n: number): number {
  if (n < 10) return n;
  const map: Map<number, number> = new Map();
  const result: number[][] = [];
  for (let i = n; i >= 1; i--) {
    const split = i
      .toString()
      .split("")
      .map((n) => parseInt(n));
    let reduce = split.reduce((acc, val) => acc + val, 0);
    if (split.length === 1) {
      reduce = 0;
    }
    map.set(i, reduce);
  }
  for (const [key, val] of map) {
    if (val === 0) {
      continue;
    } else {
      result.push([key, val]);
    }
  }
  for (const r of result) {
  }
  return result.length;
}
function maxScore(s: string): number {
  if (s.split("").filter((char) => char === "0").length === s.length) return 1;
  let max = 0;
  for (let i = 0; i < s.length - 1; i++) {
    const left = s.slice(0, i + 1);
    const right = s.slice(i + 1);
    const leftScore = left.split("").filter((char) => char === "0").length;

    const rightScore = right
      .split("")
      .reduce((acc, val) => acc + Number(val), 0);
    max = Math.max(max, leftScore + rightScore);
  }
  return max;
}
function canBeEqual(target: number[], arr: number[]): boolean {
  const targetSort = target.sort((a, b) => a - b);
  const arrSort = arr.sort((a, b) => a - b);
  for (let i = 0; i < targetSort.length; i++) {
    if (targetSort[i] !== arrSort[i]) {
      return false;
    }
  }
  return true;
}
function countPairs(nums: number[], k: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j] && (nums[i] * nums[j]) % k === 0) {
        count++;
      }
    }
  }
  return count;
}
function countEven(num: number): number {
  let count = 0;
  for (let i = 2; i <= num; i++) {
    const str = i
      .toString()
      .split("")
      .map((n) => parseInt(n));
    const reduce = str.reduce((acc, val) => acc + val, 0);
    if (reduce % 2 === 0) {
      return count++;
    }
  }
  return count;
}
function prefixCount(words: string[], pref: string): number {
  let count = 0;
  for (const word of words) {
    if (word.startsWith(pref)) {
      count++;
    }
  }
  return count;
}
function mostFrequent(nums: number[], key: number): number {
  let max = 0;
  let result = 0;
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === key) {
      const target = nums[i + 1];
      map.set(target, (map.get(target) || 0) + 1);
    }
  }
  for (const [key, val] of map) {
    max = Math.max(max, val);
  }
  for (const [key, val] of map) {
    if (val === max) {
      result = key;
    }
  }
  return result;
}
function divideArray(nums: number[]): boolean {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i += 2) {
    if (nums[i] !== nums[i + 1]) {
      return false;
    }
  }
  return true;
}
function minBitFlips(start: number, goal: number): number {
  const startBit = start.toString(2);
  const goalBit = goal.toString(2);
  let count = 0;
  for (let i = startBit.length - 1; i <= 0; i--) {
    if (startBit[i] !== goalBit[i]) {
    }

    return count;
  }
}
function findKDistantIndices(nums: number[], key: number, k: number): number[] {
  const result: number[] = [];
  const index: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === key) {
      index.push(i);
    }
  }
  console.log(index);
  for (const ins of index) {
    for (let i = 0; i < nums.length; i++) {
      if (Math.abs(i - ins) <= k) {
        result.push(i);
      }
    }
  }
  return [...new Set(result)].sort((a, b) => a - b);
}
function removeDigit(number: string, digit: string) {
  let max = 0;
  for (let i = 0; i < number.length; i++) {
    if (number[i] === digit) {
      const newNum = number.slice(0, i) + number.slice(i + 1);
      max = Math.max(max, parseInt(newNum));
    }
  }
  return max.toString();
}
function checkDistances(s: string, distance: number[]): boolean {
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] === s[j]) {
        const dist = Math.abs(i - j - 1);
        const charCode = s[i].charCodeAt(0) - "a".charCodeAt(0);
        if (dist !== distance[charCode]) {
          return false;
        }
      }
    }
  }
  return true;
}
function smallestEvenMultiple(n: number): number {
  let max = Infinity;
  for (let i = n; i < max; i++) {
    if (i % n === 0 && i % 2 === 0) {
      max = i;
      break;
    }
  }
  return max;
}
function oddString(words: string[]): string {
  const mapCheck: Map<string, string[]> = new Map();
  const map: Map<string, number[]> = new Map();
  const letters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 26; i++) {
    map.set(letters[i], [i]);
  }
  for (const word of words) {
    const difference: number[] = [];
    for (let i = 1; i < word.length; i++) {
      if (map.has(word[i]) && map.has(word[i - 1])) {
        const diff = map.get(word[i])![0] - map.get(word[i - 1])![0];
        difference.push(diff);
      }
    }
    const key = difference.join(",");
    if (!mapCheck.has(key)) {
      mapCheck.set(key, []);
    }
    mapCheck.get(key)?.push(word);
  }
  for (const [key, val] of mapCheck) {
    if (val.length === 1) {
      return val[0];
    }
  }
  return "";
}
function convertTemperature(celsius: number): number[] {
  const fahrenheit = celsius * 1.8 + 32.0;
  const kelvin = celsius + 273.15;
  return [fahrenheit, kelvin];
}
function numberOfCuts(n: number): number {
  if (n % 2 === 0) {
    return n / 2;
  } else if (n === 1) {
    return 0;
  } else {
    return n;
  }
}
function deleteGreatestValue(grid: number[][]): number {
  for (const g of grid) {
    g.sort((a, b) => a - b);
  }
  const m = grid.length;
  const n = grid[0].length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let max = 0;
    for (let j = 0; j < m; j++) {
      max = Math.max(max, grid[j][i]);
    }
    sum += max;
  }
  return sum;
}

function captureForts(forts: number[]): number {
  if (
    forts.filter((f) => f === 1).length === 0 ||
    forts.filter((f) => f === -1).length === 0
  ) {
    return 0;
  }
  const mapCheck: Map<number, number[]> = new Map();
  for (let i = 0; i < forts.length; i++) {
    if (forts[i] !== 0) {
      if (!mapCheck.has(forts[i])) {
        mapCheck.set(forts[i], []);
      }
      mapCheck.get(forts[i])?.push(i);
    }
  }
  const values: number[][] = [];
  for (const [key, val] of mapCheck) {
    values.push([...val]);
  }
  const concat = values
    .reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => a - b);
  let max = 0;
  for (let j = 1; j < concat.length; j++) {
    let valid = true;
    const left = concat[j - 1];
    const right = concat[j];
    if (forts[left] !== forts[right]) {
      for (let i = left + 1; i < right; i++) {
        if (forts[i] !== 0) {
          valid = false;
          break;
        }
      }
      if (valid) {
        max = Math.max(max, right - left - 1);
      }
    }
  }
  return max;
}
function pickGifts(gifts: number[], k: number): number[] {
  gifts.sort((a, b) => b - a);
  const result: number[] = [];
  let sum = 0;
  let sqrt = 0;
  for (let i = 0; i < k; i++) {
    result.sort((a, b) => b - a);
    if (gifts[i] > result[result.length - 1]) {
      sqrt = Math.floor(Math.sqrt(gifts[i]));
      result.push(sqrt);
    } else {
      sqrt = Math.floor(Math.sqrt(result[result.length - 1]));
      result.push(sqrt);
    }
  }
  return result;
}
function passThePillow(n: number, timer: number): number {
  let count = 0;
  const result: number[] = [];
  for (let i = 0; i <= timer; i++) {
    if (count < n) {
      count++;
      result.push(count);
    } else {
      count--;
    }
  }
  return result[result.length - 1];
}
function vowelStrings(words: string[], left: number, right: number): number {
  let count = 0;
  const vowels = "aeiou";
  for (let i = left; i <= right; i++) {
    const first = words[i][0];
    const last = words[i][words[i].length - 1];
    if (vowels.includes(first) && vowels.includes(last)) {
      count++;
    }
  }
  return count;
}
function distMoney(money: number, children: number): number {
  if (money < children) return -1;
  if (money < 8) return -1;
  if (money / 8 === children) return children;
  if (Math.floor(money / 8) < children && money % 8 === 4)
    return children - Math.floor(money / 8);
  return -1;
}
function evenOddBit(n: number): number[] {
  const toBit = n.toString(2).split("").reverse();
  let even = 0;
  let odd = 0;
  for (let i = 0; i < toBit.length; i++) {
    if (toBit[i] === "1") {
      if (i % 2 === 0) {
        even++;
      } else {
        odd++;
      }
    }
  }
  return [even, odd];
}

function kItemsWithMaximumSum(
  numOnes: number,
  numZeros: number,
  numNegOnes: number,
  k: number
): number {
  const result: number[] = [];
  for (let i = 0; i < numOnes; i++) {
    result.push(1);
  }
  for (let i = 0; i < numZeros; i++) {
    result.push(0);
  }
  for (let i = 0; i < numNegOnes; i++) {
    result.push(-1);
  }
  result.sort((a, b) => b - a);
  return result.slice(0, k).reduce((acc, val) => acc + val, 0);
}
function findTheLongestBalancedSubstring(s: string): number {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const slice = s.slice(i, j + 1);
      const length = Math.floor(slice.length / 2);
      if (
        slice
          .slice(0, length)
          .split("")
          .every((char) => char === "0") &&
        slice
          .slice(length)
          .split("")
          .every((char) => char === "1")
      ) {
        max = Math.max(max, slice.length);
      }
    }
  }
  return max;
}
function diagonalPrime(nums: number[][]): number {
  let max = 0;
  function checkPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i < Math.floor(Math.sqrt(n)) + 1; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
  for (let i = 0; i < nums.length; i++) {
    let left = nums[i][i];
    let right = nums[i][nums.length - 1 - i];
    if (checkPrime(left) || checkPrime(right)) {
      max = Math.max(left, right);
    }
  }
  return max;
}
function distinctDifferenceArray(nums: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const left = new Set(nums.slice(0, i + 1));
    const right = new Set(nums.slice(i + 1));
    result.push(left.size - right.size);
  }
  return result;
}
function alternatingSubarray(nums: number[]): number {
  let lens = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    let validSlice = true;
    for (let j = i + 1; j < nums.length; j++) {
      const slice = nums.slice(i, j + 1);
      const result = [];
      for (let k = 1; k < slice.length; k++) {
        const minus = slice[k] - slice[k - 1];
        if (minus === 1 || minus === -1) {
          result.push(minus);
        }
      }
      console.log(result);
      if (result[0] !== 1) {
        validSlice = false;
        break;
      }
      for (let m = 1; m < result.length; m++) {
        if (result[m] !== -result[m - 1]) {
          validSlice = false;
          break;
        }
      }
      if (validSlice) {
        lens = Math.max(lens, slice.length);
      }
    }
  }
  return lens === 0 ? -1 : lens;
}
function isGood(nums: number[]): boolean {
  const max = Math.max(...nums);
  if (nums.length !== max) return false;
  nums.sort((a, b) => a - b);
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1);
  }
  console.log(map)
  for (let i = 0; i < nums.length; i++) {
    if(map.get(i) !== 1) {
      return false;
    }
    if(map.get(max) !== 2) {
      return false;
    }
  }
  return true;
}
function splitWordsBySeparator(words: string[], separator: string): string[] {
  const result: string[] = [];
  for(const word of words) {
    const split = word.split(separator).filter((s) => s.length > 0);
    for(const s of split) {
      result.push(s);
    }
  }
  console.log(result);
  return result;    
}
function accountBalanceAfterPurchase(purchaseAmount: number): number {
    const amount = Math.ceil(purchaseAmount / 10) * 10;
    return 100 - amount;
};
function finalString(s: string): string {
  let result = ""
    for(const char of s) {
      if(char ==="i") {
        result = result.split("").reverse().join("");

      }
      else {
        result += char;
      }
    }
    return result;
};
function furthestDistanceFromOrigin(moves : string) : number {
  let right = 0 
  let left = 0 
  let blank = 0 
  for(const move of moves) {
    if(move === "R") {
      right++;
    }
    else if(move === "L") {
      left++;
    }
    else {
      blank++;
    }
  }
  return Math.max(right - left, left - right) + blank;
}
function canBeEqual(s1: string, s2: string): boolean { 
  const even = [s1[0], s1[2]].sort().join("");
  const odd = [s1[1], s1[3]].sort().join("");
  const even2 = [s2[0], s2[2]].sort().join("");
  const odd2 = [s2[1], s2[3]].sort().join("");
  return even === even2 && odd === odd2;
};
function countSymmetricIntegers(low : number, high : number) : number {
  let count = 0;
  for(let i = low; i<= high; i++) {
    const convertStr = i.toString().length 
    if(convertStr % 2 === 0) {
      const split = i.toString().split("").map((n) => parseInt(n));
      const left = split.slice(0, split.length / 2).reduce((acc, val) => acc + val, 0);
      const right = split.slice(split.length / 2).reduce((acc, val) => acc + val, 0);
      if(left === right) {
        count++;
      }
  }
  }
  return count
}
function numberOfPoints(nums: number[][]): number {
    const result : number[] = [];
    for(const num of nums) {
        for(let i = num[0]; i <= num[1]; i++) {
            result.push(i);
        }
    }
    return new Set(result).size;
};
function sumIndicesWithKSetBits(nums : number[], k : number) : number {
  let count1 = 0 
  let sum = 0 
  for(let i =0 ; i< nums.length; i++) {
    const bit = i.toString(2).split("").filter((b) => b === "1").length;
    if(bit === k) {
      count1++;
      sum += nums[i];
    }
  }
  return count1 === 0 ? 0 : sum 
}
function maximumOddBinaryNumber(s: string): string {
  const count0 = s.split("").filter((char) => char === "0").length;
  const count1 = s.split("").filter((char) => char === "1").length;
  if(count1 === 0) {
    return "0";
  }
  return "1".repeat(count1 - 1) + "0".repeat(count0) + "1";
};
function minimumSum(nums: number[]) {
  const result: number[] = [];  
  for(let i =0 ; i< nums.length-2; i++) {
    let sum = 0 
    for(let j = i + 1; j < nums.length-1; j++) {
      for(let k = j + 1; k < nums.length; k++) {
        if(nums[i] < nums[j] && nums[k] < nums[j]) {
         sum = nums[i] + nums[j] + nums[k];
         result.push(sum);
        }
      }
  }
  }
  return result.length === 0 ? -1 : Math.min(...result);
  
};
function minOperations(nums: number[], k: number)  {
  const result : number[] = [];
  for(let i = nums.length-1; i >= 0; i--) {
    if(nums[i] <=k && !result.includes(nums[i])) {
      result.push(nums[i]);
    }
    if(result.length === k) {
      return result.length -i 
    }
    
  }
  
  return result.length
  
}
function getLongestSubsequence(words: string[], groups: number[]): string[] {

    let prev = groups[0];
    const result : string[] = []; 
    result.push(words[0]);
    for(let i =1 ; i < words.length; i++) {
       if(groups[i] ! ==prev) {
        result.push(words[i]);
        prev = groups[i];
       }
       
    }
    return result
};

function findChampion(grid: number[][]): number {
  let index =0 
  let max = 0 
    for(let i =0 ; i < grid.length; i++) {
      const sum = grid[i].reduce((acc,val) => acc+val,0) 
      if(sum > max) {
        max = sum;
        index = i;
      }

    }
    return index
};
function canMakeSquare(grid: string[][]): boolean {
    for(let i = 0; i< grid.length;i++) {
      if(grid[i][0] === grid[i+1][0] && grid[i][1] === grid[i+1][1] || grid[i][1] === grid[i+1][1] && grid[i][2] === grid[i+1][2]) {
        return true
      }
    }
    return false
};
function isValid(word: string): boolean {
    const numbers = "0123456789";
    let hasVowel = false
    let hasConsonant = false
    const vowels = "aeiou";
    if(word.length < 3) {
      return false
    }
  
    for(const char of word) {
      if(!(char >= "a" && char <= "z") && !(char >= "A" && char <= "Z") && !(char >= "0" && char <= "9")) {
        return false
      }
      if(vowels.includes(char)) {
        hasVowel = true
      }
      else if(
        (char >= "a" && char <= "z") ||
        (char >= "A" && char <= "Z")
    ) {
        hasConsonant = true;
    }
    }
    return hasVowel && hasConsonant

}
function findPermutationDifference(s: string, t: string): number {
    let sum = 0 
    const map1 = new Map()
    const map2 = new Map() 
    for(let i =0 ;i< s.length; i++) {
      map1.set(s[i], (map1.get(s[i]) || 0) + 1)
    }
    for(let i = 0; i < t.length; i++) {
      map2.set(t[i], (map2.get(t[i]) || 0) + 1)
    }
    for(const [key,val] of map1) { 
      sum += Math.abs(map1.get(key)! - map2.get(key)!)

    }
    return sum 
};

function getSmallestString(s: string): string { 
  for(let i = 0; i< s.length; i++) {
    
    const toNum = parseInt(s[i])
    const toNumNext = parseInt(s[i+1])
    const isSame = toNum % 2 === toNumNext % 2
    if(isSame && toNum > toNumNext) {
      return s.slice(0,i) + s[i+1]+ s[i] + s.slice(i+2)
    }
    
    
  }
  return s
    
};
function minChanges(n: number, k: number): number { 
  if(n === k) return 0 
  const bitN = n.toString(2)
  const bitK = k.toString(2)
  let count = -1
  for(let i =0 ; i< bitN.length; i++) {
     if(bitN[i] !== bitK[i]) {
      count++
     }
  }
  return count
    
};
function convertDateToBinary(date: string): string {
  const result : string[] = []
    const split = date.split("-")
    for(const s of split) {
      const toNum = parseInt(s) 
      const toBinary = toNum.toString(2)
      result.push(toBinary)
    }
    return result.join("-")
};
function smallestNumber(n: number): number {
  let num = n 
  while(true) {
    const bit = num.toString(2)
    const set = new Set(bit)
    if(set.size === 1 && set.has("1")) {
      return num
    }
    num++
  }
  return num 
};
function constructTransformedArray(nums: number[]): number[] {
    const result : number[] = [] 
    for(let i =0 ; i< nums.length; i++) {
      result.push(nums[nums[i % nums.length]])
    }
    return result
};
function isAdjacentDiffAtMostTwo(s: string): boolean {
    for(let i = 0; i< s.length; i++) {
      const first = parseInt(s[i])
      const second = parseInt(s[i+1])
      const abs = Math.abs(first - second)
      if(abs > 2) {
        return false
      }


    }
    return true
};
function concatHex36(n: number): string {
    const h1 = (n *n).toString(16)
    const h2 = (n *n*n).toString(36) 
    return (h1 + h2).toUpperCase()
};
function commonChars(words: string[]): string[] {
    const result :  string[] = [] 
    for(const word of words) {
      const set = new Set(word)
      for(const c of set) {
        let count = 0
        for(const w of words) {
          if(w.includes(c)) {
            count++
          }
        }
        if(count === words.length) {
          result.push(c)
        }
      }
    }
    return result
};
function minCostToMoveChips(position: number[]): number {
    let even = 0 
    let odd = 0 
    for(const pos of position) {
      if(pos % 2 === 0) {
        even++
      }
      else {
        odd++
      }
    }
    return Math.min(even, odd)
};
function freqAlphabets(s: string): string {
  let result = ""
  const letters = "abcdefghi"
  const digits = "jklmnopqrstuvwxyz"
  const map : Map<string, string> = new Map() 
  const map2 : Map<string, string> = new Map()
  for(let i =1; i<=9 ; i++){
    map.set(i.toString(), letters[i-1])
  }
  for(let i = 10; i<=26;i++) {
    map2.set(i.toString()+"#", digits[i-10])
  }
  
  for (let i = 0; i < s.length; i++) {

    if (i + 2 < s.length && s[i + 2] === "#") {

        const sub = s.slice(i, i + 3);

        result += map2.get(sub)!;

        i += 2;

    } else {

        result += map.get(s[i])!;
    }
}

  return result

    
};
function mostVisited(n: number, rounds: number[]): number[] {
    let result : number[] = [] 
    const first = rounds[0] 
    const last = rounds[rounds.length-1]
    if(first <= last) {
      for(let i = first; i <= last; i++) {
        result.push(i)
      }
    }
    else {
      for(let i = first; i <= n; i++) {
        result.push(i)
      }
      for(let i = 1; i <= last; i++) {
        result.push(i)
    }
    }
    return result
};
function limitOccurrences(nums: number[], k: number): number[] {
  const result : number[] = []
  const map : Map<number,number> = new Map() 
  for(const num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }
  for(const[key,val] of map) {
    if(val >= k) {
      for(let i =0 ; i <k; i++) {
        result.push(key)
      }
    }
    else {
      for(let i = 0 ; i< val ;i++){
        result.push(key)
      }
    }

  }
  return result
};
function minDeletion(s: string, k: number): number {
    const set = new Set(s) 
    const result = set.size - k  
    if(result === 0) return result
    const map : Map<string,number> = new Map()
    for(const char of s) {
      map.set(char, (map.get(char) || 0) + 1)
    }
    const sortedVal = new Map([...map.entries()].sort((a,b) => a[1] - b[1]))
    const keys = [...sortedVal.keys()].slice(0, result)
    let final = 0 
    for(const key of keys) {
      final +=  sortedVal.get(key)!
    }
    return final
    
    
    
    
};