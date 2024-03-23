// Binary Search Tree

// class Node is a blueprint for creating new nodes in the tree
class Node {
    // the constructor defines the properties of the node
    constructor(data) {
        this.data = data; // the value of the node
        this.left = null; // the left child of the node
        this.right = null; // the right child of the node
    }
}

// class Tree is a blueprint for creating new trees
class Tree {
    constructor() {
        // the constructor initializes the tree with a root node
        this.root = null;
    }

    // addNode method adds a new node to the tree
    addNode(node) {
        // if the tree is empty, the new node becomes the root
        if (this.root === null) {
            this.root = node;
        } else {
            // otherwise, call the insertNode method to add the new node to the tree
            this.insertNode(this.root, node);
        }
    }

    // insertNode method recursively adds a new node to the tree
    insertNode(current, newNode) {
        if (current.data > newNode.data) {
            // if the left child of the current node is null and the new node is less than the current node, add the new node as the left child
            if (current.left === null) {
                current.left = newNode;
            } else {
                // otherwise, recursively call the insertNode method on the left child
                this.insertNode(current.left, newNode);
            }
        } else {
            // if the right child of the current node is null and the new node is greater than the current node, add the new node as the right child
            if (current.right === null) {
                current.right = newNode;
            } else {
                // otherwise, recursively call the insertNode method on the right child
                this.insertNode(current.right, newNode);
            }
        }
    }

    // hasNode method checks if a node with a given value exists in the tree
    hasNode(data) {
        // current is the starting point for the search
        let current = this.root;
        // if current is null, the tree is empty, so return false
        if (current === null) {
            return false;
        }
        // otherwise, call the hasNode method with the current node
        // .data is the value of the current node
        if (current.data === data) {
            return true;
        }
        // if the value of the current node is greater than the data, search the left subtree
        // otherwise, search the right subtree, recursively calling the hasNode method
        if (current.data > data) {
            return this.hasNode(data, current.left);
        } else {
            return this.hasNode(data, current.right);
        }
    }
}

// Example usage:
// const tree = new Tree();
// tree.addNode(new Node(5));
// tree.addNode(new Node(3));
// tree.addNode(new Node(7));
// tree.addNode(new Node(2));
// tree.addNode(new Node(4));
// tree.addNode(new Node(6));

// console.log(tree.hasNode(5)); // true
// console.log(tree.hasNode(8)); // false
// console.log(tree.hasNode(2)); // true
// console.log(tree.hasNode(10)); // false
// console.log(tree.hasNode(4)); // true
// console.log(tree.hasNode(1)); // false
