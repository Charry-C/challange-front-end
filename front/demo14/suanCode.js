// 1. 二叉树的最大深度,需要采用递归才行

// 返回值是递归的层数（返回层数前需要比对在该递归层的左右子树的最大层数）
var maxDepth = function (tree) {
    if (!tree) return 0
    let k = 1
    return calculateDepth(tree, k + 1)
};
var calculateDepth = function (tree, k) {
    if (tree.left == null && tree.right == null) {
        return k - 1
    }
    if (tree.left == null) {
        let Rmax = calculateDepth(tree.right, k + 1)
        return Rmax
    }
    if (tree.right == null) {
        let Lmax = calculateDepth(tree.left, k + 1)
        return Lmax
    }
    let Rmax = calculateDepth(tree.right, k + 1)
    let Lmax = calculateDepth(tree.left, k + 1)
    return Math.max(Lmax, Rmax)
}

let createTreeII = require('../tool')
console.log(maxDepth(createTreeII([3, 9, 20, null, null, 15, 7])));