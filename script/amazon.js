function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // pick random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // swap array[i] with array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Example usage:
let mobiles = ["iPhone", "Samsung", "Xiaomi", "OnePlus", "Pixel", "Realme"];

console.log("Before shuffle:", mobiles);

let shuffled = shuffle([...mobiles]); // use spread to not change original
console.log("After shuffle:", shuffled);
