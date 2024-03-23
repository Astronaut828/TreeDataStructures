/*Trie

A trie is pronounced like "try". It comes from the word "retrieval".
This particular data structure works well with storing strings, especially ones with a many common prefixes.

Let's take a look at a trie:

             Root
              |
              H
            /   \
           A      E
          / \    / \
         N   T  L    I
        / \      \    \
       D   S      P    G
      / \               \
     Y   L               H
          \               \
           E               T
                            \
                             S       

In this trie, each node represents a single character.
The root node is the starting point of the trie.
*/

// Define a TrieNode class
class TrieNode {
    constructor(key) {
        this.key = key; // The character stored in this node
        this.children = {}; // A dictionary of child nodes
        this.isWord = false; // Flag that indicates if the character ends a word
    }
}

// Define a Trie class
class Trie {
    constructor() {
        this.root = new TrieNode(null); // The root node is empty
    }
    // Method to insert a word into the trie
    insert(word) {
        let node = this.root; // Start at the root node
        // Iterate over each character in the word
        for (let i = 0; i < word.length; i++) {
            const char = word[i]; // Get the current character
            // If the character is not in the children dictionary
            if (!node.children[char]) {
                node.children[char] = new TrieNode(char); // Add a new node for the character
            }
            node = node.children[char]; // Move to the child node
        }
        node.isWord = true; // Mark the last character as the end of a word
    }
    // Method to check if a word is in the trie
    contains(word) {
        let node = this.root; // Start at the root node
        // Iterate over each character in the word
        for (let i = 0; i < word.length; i++) {
            const char = word[i]; // Get the current character
            // If the character is not in the children dictionary
            if (!node.children[char]) {
                return false; // The word is not in the trie
            }
            node = node.children[char]; // Move to the child node
        }
        return node.isWord; // Return true if the last character is marked as the end of a word
    }
}


// Example usage:
// const trie = new Trie();

// // Test inserting words into the trie
// trie.insert("hello");
// trie.insert("world");
// trie.insert("how");
// trie.insert("are");
// trie.insert("you");

// // Test checking if words are in the trie
// console.log(trie.contains("hello")); // Output: true
// console.log(trie.contains("world")); // Output: true
// console.log(trie.contains("how")); // Output: true
// console.log(trie.contains("are")); // Output: true
// console.log(trie.contains("you")); // Output: true
// console.log(trie.contains("hi")); // Output: false
// console.log(trie.contains("there")); // Output: false
