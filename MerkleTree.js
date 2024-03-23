/* A Merkle tree 
A Merkle tree is a collection of hashes reduced to a single hash.
It is typical to see some enforcement property before "tree" to distinguish different types of tree data structures.
A Merkle Tree is a data structure that allows us to make efficient verifications that data belongs in a larger set of data.
The tree is a binary tree, meaning that each node has at most two children.
It is built by hashing pairs of nodes together until there is only one node left, the root.

In this tree each letter represents a hash, and combined letters represent concatenating hashes and hashing those together.

          Root 
        /      \
    ABCD        EFGHIJ
     |          /    \
    ABCD     EFGH     IJ
    / \      /   \     |
   AB  CD   EF   GH   IJ
  / \  / \  / \  / \  / \      
  A B  C D  E F  G H  I J

Hierarchy of the tree is as follows:
1. Root or Top - The single hash that represents the entire tree
2. Parent or Ancestor - A node that has children // In the blockchain context, "Ancestor" and "Parent" are often used interchangeably.
3. Child or Sibling - A node that has the same parent node
4. Leaf or Node - A node that has no children

The tree is built from the bottom up, starting with the leaves and working up to the root
In blockchain use cases, the leaves are the hashes of the transactions in the block.
The root hash is the only hash stored in the block header and is used to verify the integrity of the block's transactions.

Some tree vocabulary to keep in mind:
1. Key - The value used to identify a node in the tree (e.g. the hash of a transaction).
2. Edge - The connection between nodes in the tree.
3. Depth - The distance from the root to a node in the tree (e.g. the root has a depth of 0).
4. Height - The distance from a node to the farthest leaf in the tree (e.g. the root has a height of 3, meaning it is 3 edges away from the farthest leaf).
5. Sibling - Two nodes that share the same parent node in the tree (e.g. the two children of a parent node are siblings).
6. Ancestor - A node that is on the path from the root to another node in the tree (e.g. the root is an ancestor of all nodes in the tree).
7. Subtree - A tree that is a descendant of another tree (e.g. the left and right children of a node form subtrees of the parent tree).
7. Descendant - A node that is on the path from another node to the root in the tree (e.g. the leaves are descendants of the root).
*/

class MerkleTree {
    constructor(leaves, concat) {
        // Store the initial set of leaves
        this.leaves = leaves;
        // Store the function to concatenate and hash two leaves
        this.concat = concat;
    }

    // Methot to calculate the root of the tree
    getRoot(leaves = this.leaves) {
        // Base case: if there is only one leaf, return as the root
        if (leaves.length === 1) {
            return leaves[0];
        }
        // Temp. array to store the next layer of the tree
        const layer = [];
        for (let i = 0; i < leaves.length; i += 2) {
            const left = leaves[i]; // Get the current left leaf
            const right = leaves[i + 1]; // Get the current right leaf
            if (right) {
                // If there is a right leaf, concatenate and hash both leaves
                layer.push(this.concat(left, right));
            } else {
                // If there is no pair, (odd number of leaves), carry the leaf to the next layer
                layer.push(left);
            }
        }
        // Recursively calculate the root with the new layer
        return this.getRoot(layer);
    }

    // Method to get the proof of a leaf
    getProof(index, layer = this.leaves, proof = []) {
        // Base case: if there is only one leaf, return the proof
        if (layer.length === 1) return proof;
        // Temp. array to store the next layer of the tree
        const newLayer = [];
        for (let i = 0; i < layer.length; i += 2) {
            let left = layer[i]; // Get the current left leaf
            let right = layer[i + 1]; // Get the current right leaf (might be undefined)
            if (!right) {
                newLayer.push(left); // If there is no right leaf, carry the left leaf to the next layer
            } else {
                // If there is a right leaf, concatenate and hash both leaves and carry to the next layer
                newLayer.push(this.concat(left, right));

                // If the current leaf or its sibling is the leaf we are looking for, store the proof
                if (i === index || i === index - 1) {
                    let isLeft = !(index % 2); // Determine if the target leaf is on the left (even index)
                    proof.push({
                        data: isLeft ? right : left, // Add the sibling leaf to the proof
                        left: !isLeft, // Indicate if the sibling is on the left (opposite of the target leaf's position)
                    });
                }
            }
        }
        // Recursively call getProof for the next layer, adjusting the index to reflect the target leaf's position in the new layer
        return this.getProof(Math.floor(index / 2), newLayer, proof);
    }
}

// Function to verify a proof of a leaf
// Function takes the proof, the leaf, the root of the tree, and the concatenation function
function verifyProof(proof, node, root, concat) {
    let data = node; // Start with the leaf for which we are verifying the proof
    // Iterate through the proof
    for (let i = 0; i < proof.length; i++) {
        // If the current step's sibling node is on the left ...
        if (proof[i].left) {
            // Concatenate the current step's sibling node (on the left) with the current data
            // This simulates moving up one level in the tree, combining this node with its sibling
            data = concat(proof[i].data, data);
        } else {
            // If the current step's sibling node is on the right, concatenate the current data with the sibling
            data = concat(data, proof[i].data);
        }
    }
    // After reconstructing the path from the node to the root, check if the final result matches the given root
    return data === root;
}

// // Example usage of the MerkleTree class
// const tree1 = new MerkleTree(["A", "B"], (a, b) => a + b);
// console.log(tree1.getRoot()); // Expected output: 'AB'

// const tree2 = new MerkleTree(["A", "B", "C"], (a, b) => a + b);
// console.log(tree2.getRoot()); // Expected output: 'ABC'

// const tree3 = new MerkleTree(["A", "B", "C", "D"], (a, b) => a + b);
// console.log(tree3.getRoot()); // Expected output: 'ABCD'

// const tree4 = new MerkleTree(["A", "B", "C", "D", "E"], (a, b) => a + b);
// console.log(tree4.getRoot()); // Expected output: 'ABCDE'
