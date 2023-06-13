function calculateMinCost() {
  //your code here
  function minCostOfRopes(ropes) {
  // Create a min-heap priority queue
  const pq = new MinHeap();

  // Insert the ropes into the priority queue
  ropes.forEach((rope) => {
    pq.insert(rope);
  });

  let cost = 0;

  // Connect ropes until only one is left
  while (pq.size() > 1) {
    // Extract the two smallest ropes
    const rope1 = pq.extractMin();
    const rope2 = pq.extractMin();

    // Connect the ropes
    const connectedRope = rope1 + rope2;

    // Add the cost of connecting the ropes
    cost += connectedRope;

    // Insert the connected rope back to the priority queue
    pq.insert(connectedRope);
  }

  return cost;
}

// MinHeap class implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    const minValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.size() > 0) {
      this.heap[0] = lastValue;
      this.heapifyDown(0);
    }

    return minValue;
  }

  heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      [this.heap[smallestIndex], this.heap[index]] = [this.heap[index], this.heap[smallestIndex]];
      this.heapifyDown(smallestIndex);
    }
  }
}

// Get the input from the user
const input = document.getElementById('input').value;
const ropes = input.split(',').map(Number);

// Calculate the minimum cost of ropes
const minCost = minCostOfRopes(ropes);

// Display the result
const resultDiv = document.getElementById('result');
resultDiv.textContent = minCost.toString();

  
  
}  
