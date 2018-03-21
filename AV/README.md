# Algorithm-Visualizations
### Background 
- Poisson-Disc Sampling vs. Random Sampling
  - Poisson-Disc: Candidates are chosen from a sampling area. The best candidate is the one that is farthest away from all previous samples. After candidates are created and distances measured, the best candidate becomes the new sample. Remaining candidates are discarded.
  - Uniform Random Sampling: results in severe under and oversampling where many samples are densely overpacked or overlapping.
- Fisher–Yates Shuffle and Quicksort
  - The Fisher-Yates Shuffle algorithm runs in linear time and uses constant space. It splits an array into two parts, the right (shuffled) and left (unshuffled) sides. Step by step, the algorithm randomly picks an element from the left and moves it to the right.
  - Quicksort: partitions an array into two parts by picking a pivot. The left of the pivot has elements less than the pivot while the right has elements greater than the pivot. It then recursively sorts the left and right parts. When a section has only one element left, recursion stops.
- Random Traversal Visualization 

### Functionality and MVP 
1. Poisson-Disc Algorithm 
2. Fisher-Yates Shuffling Algorithm 
3. Quicksort, Random Sampling, and Random Traversal
4. Using D3 to animate changes in candidates

### Wireframe
![](/wireframe.png)

### Architecture and Technologies
- d3
- JavaScript
- Canvas

### Implementation Timeline
Day 1: Poisson-Disc and Random Sampling (using same default settings for rendering generation of dots)

Day 2: Fisher-Yates and Quicksort (using the same default settings for rendering lines as shuffled/unshuffled)

Day 3: Quicksort (using the same default settings as Fisher-Yates portion for rendering lines as shuffled/unshuffled)

Day 4: Random Traversal visualization 