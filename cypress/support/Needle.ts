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
function longestPalindrome(s: string): number {
  const map: Record<string, number> = {};
  for (const char of s) {
    map[char] = (map[char] || 0) + 1;
  }
  let length = 0;
  let oddFound = false;
  for (const val of Object.values(map)) {
    if (val % 2 === 0) {
      length += val;
    } else {
      length += val - 1;
      oddFound = true;
    }
  }
  if (oddFound) {
    length += 1;
  }
  return length;
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

function reverseWords(s: string): string{ 
    return s.split(' ').reduce((acc: string[], word) => {
        acc.push(word.split('').reverse().join('')
        );
        return acc},[]).join(' ');
    

}
class _Node {
    val: number
    children: _Node[]
    constructor(val: number, children: []) {
        this.val = (val === undefined ? 0 : val);
        this.children = (children === undefined ? [] : children);
    }
    
}

function postorder(root: _Node) : number[] { 
    if (!root) return [];
    if (root.children == null) return [root.val];
    const result: number[] = [];
    for(const child of root.children) {
        result.push(...postorder(child));
    }
    result.push(root.val);
    return result

}

function canPlaceFlowers(nums: number[], n: number): boolean {
    for (let i = 0; i < nums.length; i++) {
        const left = (i === 0) ? 0 : nums[i - 1];
        const right = (i === nums.length) ? 0 : nums[i + 1]; 
        if (left === 0 && right === 0) {
            nums[i] = 1 
            n--
            
        }
        if (n === 0) return true;
    }
    return n <= 0;
}
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val: number, left: TreeNode | null, right: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function mergeTrees(node1: TreeNode | null, node2: TreeNode | null): TreeNode | null { 
    if (!node1) return node2;
    if (!node2) return node1; 
    if (!node1 && !node2) return null;
    node1.val += node2.val;
    node1.left = mergeTrees (node1.left, node2.left);
    node1.right = mergeTrees (node1.right, node2.right);
    return node1;
    
}

function maximumProduct(nums: number[]): number {
    nums.sort((a,b) => a - b);
    const n = nums.length;
    return Math.max(nums[0] * nums[1] * nums[n - 1], nums[n - 1] * nums[n - 2] * nums[n - 3]);
}

function averageOfLevels(root: TreeNode ): number[] {
    const result: number[] = [];   
    const queue: TreeNode[] = [root];
    const size = queue.length; 
    let sum = 0 
    while (queue.length > 0) {
        
    
        for (let i = 0; i < size; i++) {
         
            const node = queue.shift();
            sum += node!.val;
            if (node!.left) queue.push(node!.left)
            if (node!.right) queue.push(node!.right)

        }
        result.push(sum / size);
    }
    return result
}
function findMaxAverage(nums: number[], k: number): number { 
    let maxSum = 0 
    for (let i = 0; i < k; i++) {
        maxSum +=nums[i] 
    }
    let windowSum = maxSum; 
    for (let i = k; i < nums.length; i++) {
        windowSum += nums[i]
        windowSum -= nums[i - k]
        maxSum = Math.max(maxSum, windowSum)
    }
    return maxSum / k
}

function findErrorNums(nums: number[]): number[] {
    const map: Map<number, number> = new Map(); 
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    let missing = -1
    let duplicate = -1
    for (let i = 1; i <= nums.length; i++) { 
        if (!map.has(i)) {
            missing = i
        }
        if (map.get(i)! === 2) {
            duplicate = i
        }
    }
    return [duplicate, missing]

} 
function findTarget(root: TreeNode, k : number): boolean {
    if (!root) return false; 
    const seen: Set<number> = new Set;  
    function dsf(node: TreeNode): boolean { 
        if (seen.has(k - node.val)) {
            return true 
        }
        seen.add(node.val)
        return dsf(node.left!) || dsf(node.right!)
    
    }
    return dsf(root)
} 
function imageSmoother(img: number[][]): number[][] {
    const m = img.length;
    const n = img[0].length;
    const result: number[][] = [];
    for (let i = 0; i < m; i++) {
        result.push(new Array(n).fill(0));
    } 
    for (let i = 0; i < m; i++){
        for (let j = 0; j < n; j++) {
            let sum = 0;
            let count = 0; 
            for (let x = -1; x <= 1; x++) {
                for(let y = -1; y <= 1; y++) {
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
        
        if(node.val <min && node.val > secondMin) {
            secondMin = node.val
        }
        
        dfs(node.left!);
        dfs(node.right!);
    }

    dfs(root);
    return secondMin === Infinity ? -1 : secondMin;
     
}

function isPal(str: string, left : number, right : number): boolean {

    while (left < right) {
        if (str[left] !== str[right]) {
            return false
        }
        left++
        right--
    }
    return true 
}
function validPalindrome(str: string): boolean {
    let left = 0 
    let right = str.length - 1;
    while (left < right) {
        if (str[left] === str[right]) {
            left++
            right --
        }
        else {
            isPal(str, left + 1, right) || isPal(str, left, right - 1)
        }
    }
    return true

}

function calPoints(ops: string[]): number {
    const stack: number[] = [];
    for (const op of ops) {
        if (op === "C") {
            stack.pop();
        }
        else if (op === "D") {
            const last = stack[stack.length - 1] as number;
            stack.push(last * 2);
        }
        else if (op === "+") {
            const last = stack[stack.length - 1] as number;
            const secorndLast = stack[stack.length - 2] as number;
            stack.push(last + secorndLast);
        }
        else {
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
    let lastIndex: Map<number, number> = new Map() 
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

function shortestCompletingWord(liscensePlate: string, words: string[]): string {
    //lam sach chuoi 
    const cleaned = liscensePlate.toLowerCase().replace(/[^a-z]/g, ''); 
    //dem so lan xuat hien cua liscense plate
    const count: Map<string, number> = new Map();  
    for (const char of cleaned) {
        count.set(char, (count.get(char) || 0) + 1);
    }
    let result = '';
    //dem chuoi 
    for (const word of words) {
        const wordCount: Map<string, number> = new Map();
        for (const c of word) {
            wordCount.set(c, (wordCount.get(c) || 0) + 1);
        }
        let valid = true 
        for (const [char, freq] of count.entries()) {
            if((wordCount.get(char) || 0) < freq) {
                valid = false;
                break;
            }
        }
        if (valid) {
            if(result === '' || word.length < result.length) {
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
    let count = 0 
    for (const stone of stones) {
        if(jewels.includes(stone)) {
            count++;
        }
    }
    return count;
}

function searchInsert(nums: number[], target: number): number{
    let left = 0; 
    let right = nums.length - 1 
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid
        }
        else if (nums[mid] > target) {
            right = mid -1 
        }
        else {
            left = mid +1 
        }
    }
    return left;    

}
function searchInsert2(nums: number[], target: number): number{
    for (let i = 0; i < nums.length; i++){
        if(nums[i] >= target) {
            return i;
        }
    }
    return nums.length;
}

function minSubArrayLen(nums: number[], target: number): number {
    let left = 0;  
    let sum = 0; 
    let minLength = Infinity; 
    for (let right = 0; right < nums.length; right++){
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
        }
        else {
            stack.push(num);
        }
    }
    return stack.length;
}

function canThreePartsEqualSum(nums: number[]): boolean{
    const totalSum = nums.reduce((acc, val) => acc + val, 0);
    if (totalSum % 3 !== 0) return false; 
    const target = totalSum / 3 
    let sum = 0;
    let count =0 
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
        count.set(num, (count.get(num)|| 0) + 1);
    }
    const values = [...count.values()];
    const minCount = Math.min(...values);    
    for (let c = 2; c <= minCount; c++) {
        if (values.every(val => val % c === 0)) {
            return true;
        }
    }
    return false;
}
function arrayRankTransform(nums: number[]): number[] {
    const sorted = nums.sort((a, b) => a - b);
    const map: Map<number, number> = new Map();
    for (const num of sorted) {
        map.set(num,map.get(num)||0 +1)
    }
    let rank =1 
    for (const [key, value] of map.entries()) { 
        map.set(key, rank);
        rank++;
    }
    return nums.map(num => map.get(num) as number);

}
function isPrefixOfWord(str: string, searchWord : string): number {
    const split = str.split(" ");
    for (let i = 0; i < split.length; i++) {
        if (split[i].startsWith(searchWord)) {
          return i + 1;
        }
    }
    return -1
}

function slowestKey(releaseTimes: number[], keyPressed: string): string {
    const duration: number[] = []
    duration.push(releaseTimes[0]);
    for (let i = 1; i < releaseTimes.length; i++) { 
        duration.push(releaseTimes[i] - releaseTimes[i - 1]);
    }
    const arr: string[] = [];
    const max = Math.max(...duration);
    for (let i = 0; i < duration.length; i++) {
        
        if(duration[i]===max) {
            arr.push(keyPressed[i]);
            
            
        }
    }
    arr.sort();
    return arr[arr.length - 1];
}
function halvesAreAlike(str: string): boolean {
    const array: string[] = [];
    for (let i = 0; i < str.length; i+=str.length/2) {
        array.push(str.slice(i, i + str.length/2));
    }
    let result : number[] =[]
    const compare = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
    for (let i = 0; i < array.length; i++) {
        let count = 0
        for(const char of array[i]) {
            compare.forEach(letter => {
                if (char === letter) {
                    count++ 
                }
            })
        }
        result.push(count);

    }
    
        
    return result[0] === result[1]; 

}
     
function minOperations(nums: number[]): number {
    let count = 0 
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= nums[i - 1]) {
            const needed = nums[i - 1] + 1 
            count += needed - nums[i]
            nums[i] = needed
        }
    }
    return count
    
}
function construct2DArray(original: number[], m : number, n: number): number[][]{
    if (m * n !== original.length) return []; 
    const result : number[][] =[]
    for (let i = 0; i < m; i++) {
        const row: number[] = []
        for (let j = 0; j < n; j++) {
            row.push(original[i * n + j]);
        }
        result.push(row);

    }
    return result
    
        
    
   
}
function minimumMoves(s: string): number {
    let i = 0 
    let count = 0 
    while (s.length > 0) {
        if (s[i] === "X") {
            i += 3 
            count++
        }
        else {
            i++
        }
    }
    return count 
}
function twoOutOfThree(nums1 : number[], nums2 : number[], nums3 : number[]) : number[] {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2) 
    const set3 = new Set(nums3) 
    const result: number[] = []
    for (const n1 of nums1) {
        if(set2.has(n1) || set3.has(n1)) {
            result.push(n1)
        }
    }
    for (const n2 of nums2) {
        if(set1.has(n2) || set3.has(n2)) {
            result.push(n2)
        }
    }
    for (const n3 of nums3) {
        if(set1.has(n3) || set2.has(n3)) {
            result.push(n3)
        }
    }
    return [...new Set(result)];
};
function kthDistinct(arr: string[], k: number): string {
    const map: Map<string, number> = new Map() 
    for (const a of arr) {
        map.set(a,(map.get(a) || 0) + 1)
    }
    const result : string[] = []
    for (const [key, value] of map) {
        if (value === 1) {
            result.push(key)
        }
    }
    for (let i = 0; i < result.length; i++) {
        if (i === k - 1) {
            return result[i]
        }
        
    }
    return ""
}
function smallestEqual(nums: number[]): number {
    const result: number[] = []

    for (let i = 0; i < nums.length; i++) {
        if (i % 10 === nums[i]) {
            result.push(i)
        }
    }
    if (result.length === 0) return -1;
    return Math.min(...result);
}
function checkString(str: string): boolean {
    let seenB = false 
    for(const char of str) {
        if (char === "b") {
            seenB = true 
        }
        else if (char === "a" && seenB) {
            return false
        }
    }
    return true
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