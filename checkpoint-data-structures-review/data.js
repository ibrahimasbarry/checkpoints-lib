'use strict';
/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

//-----------------------------------------
// Stacks

function Stack () {
  // your code here
  this.data = [];
  this.tail = -1;
}

Stack.prototype.add = function (item) {
  // your code here
  if (this.tail < 0) {
    this.tail = 0;
  }
  this.data[this.tail++] = item;
  return this; // for chaining, do not edit
};

Stack.prototype.remove = function () {
  // your code here
  if (this.tail < 0) return;
  return this.data[--this.tail];
};

//-----------------------------------------
// Queues

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

function Queue () {
  // your code here
  this.data = [];
  this.head = -1;
  this.tail = -1;
}

Queue.prototype.add = function (item) {
  // your code here
  if (this.head <  0) {
    this.head = 0;
  }
  this.data[++this.tail] = item;
  return this; // for chaining, do not edit
};

Queue.prototype.remove = function () {
  // your code here
  if (this.head < 0) return;
  if (this.head === this.tail ) {
    var i = this.head;
    this.head = -1;
    this.tail = -1;
    return this.data[i];
  }
  return this.data[this.head++]
};

//-----------------------------------------
// Linked lists

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

function LinkedList () {
  this.head = this.tail = null;
}

function ListNode (item, prev, next) {
  this.item = item;
  this.next = next || null;
  this.prev = prev || null;
}

LinkedList.prototype.addToTail = function (item) {
  // your code here
  var node = new ListNode(item);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  }
  else {
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
  return this; // for chaining, do not edit
};

LinkedList.prototype.removeFromTail = function () {
  // your code here
  if (this.tail === null) return;
  var node = this.tail;
  if (this.tail.prev === null){
    this.head = this.tail = null;
    return node.item;
  }
  node = this.tail;
  this.tail = this.tail.prev;
  this.tail.next.prev = null;
  this.tail.next = null;
  return node.item;
};

LinkedList.prototype.forEach = function (iterator) {
  // your code here
  var node = this.head;
  while (node) {
    iterator(node.item);
    node = node.next;
  }
};

//-----------------------------------------
// Association lists

function Alist () {
  // your code here
  this.head = null;
}

function AlistNode (key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next;
}

Alist.prototype.set = function (key, value) {
  // your code here
  var node = new AlistNode(key, value, null);
  if (this.head === null) {
    this.head = node;
  } else {
    node.next = this.head;
    this.head = node;
  }
  return this; // for chaining; do not edit
};

Alist.prototype.get = function (key) {
  // your code here
  var node = this.head;
  while (node) {
    if (node.key === key) return node.value;
    node = node.next;
  }
};


//-----------------------------------------
// Hash tables

function hash (key) {
  var hashedKey = 0;
  for (var i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

function HashTable () {
  this.buckets = Array(20);
  // your code here
  for (var i = 0; i < this.buckets.length; i++){
    this.buckets[i] = new Alist();
  }
}

HashTable.prototype.set = function (key, value) {
  // your code here. DO NOT simply set a prop. on an obj., that is cheating.
  var index = hash(key);
  this.buckets[index].set(key, value);
  return this; // for chaining, do not edit
};

HashTable.prototype.get = function (key) {
  // your code here. DO NOT simply get a prop. from an obj., that is cheating.
  var index = hash(key);
  if (!this.buckets[index]) return;
  return this.buckets[index].get(key);
};

//-----------------------------------------
// Binary search trees

function BinarySearchTree (val) {
  // your code here
  this.value = val;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function (val) {
  // your code here
  if (this.value > val){
     if (this.left) this.left.insert(val);
     else this.left = new BinarySearchTree(val);
  }
  else {
    if (this.right) this.right.insert(val);
    else this.right = new BinarySearchTree(val);
  }
  return this; // for chaining, do not edit
};

BinarySearchTree.prototype.min = function () {
  // your code here
  var minNum = this.value;
  var node = this.left;
  while (node){
    minNum = node.value;
    node = node.left;
  }
  return minNum;
};

BinarySearchTree.prototype.max = function () {
  // your code here
  var maxNum = this.value;
  var node = this.right;
  while (node){
    maxNum = node.value;
    node = node.right;
  }
  return maxNum;
};

BinarySearchTree.prototype.contains = function (val) {
  // your code here
  if (this.value === val) return true;
  if (this.value >  val){
    if (this.left) {
      if (this.left.contains(val)) return true;
    }
  } else {
    if (this.right){
      if (this.right.contains(val)) return true;
    }
  }
  return false;
};

BinarySearchTree.prototype.traverse = function (iterator) {
  // your code here
  if (this.left) {
    this.left.traverse(iterator);
  }
  iterator(this.value);
  if (this.right) {
    this.right.traverse(iterator);
  }
};
