const createTreeII = require('../tool')

// 1. 最小深度（使用递归）
// 返回值为左右子树的最小深度k
var minDepth = function (tree) {
    if (tree == null) return 0
    let k = 1
    return getMinDepth(tree, k + 1)
};
var getMinDepth = function (tree, k) {
    if (tree.left == null && tree.right == null) {
        return k - 1
    }
    // 没有左叶节点/右叶节点
    if (tree.left == null) {
        let Lmin = getMinDepth(tree.right, k + 1)
        return Lmin
    }
    if (tree.right == null) {
        let Rmin = getMinDepth(tree.left, k + 1)
        return Rmin
    }

    let Lmin = getMinDepth(tree.left, k + 1)
    let Rmin = getMinDepth(tree.right, k + 1)
    return Math.min(Lmin, Rmin)
}

// 2. 完全二叉树节点个数
// 用层序遍历直接秒了,还可以用递归（代码很简短，也不错）
var countNodes = function (tree) {
    let queue = [], count = 0
    if (tree == null) return count
    queue.push(tree)
    while (queue.length) {
        let item = queue.shift()
        count++
        if (!(item.left == null)) queue.push(item.left)
        if (!(item.right == null)) queue.push(item.right)
        if (item.left == null && item.right == null) continue
    }
    return count
};
console.log(countNodes(createTreeII([1, 2, 3, 4, 5, 6])));
// 递归写法
var countNodes = function (root) {
    if (root === null) {
        return 0;
    }
    return countNodes(root.left) + countNodes(root.right) + 1;

};

// 3. 平衡二叉树（左右子树的深度差<=1）
// 递归秒了
var isBalanced = function (tree) {
    if (tree == null) return true
    let k = 1
    return !getDepth(tree, k + 1) ? false : true
};
var getDepth = function (tree, k) {
    let Ldeep, Rdeep
    if (tree.left == null && tree.rightt == null) {
        return k - 1
    }
    else if (tree.left == null) {
        Ldeep = k - 1
        Rdeep = getDepth(tree.right, k + 1)
    }
    else if (tree.right == null) {
        Rdeep = k - 1
        Ldeep = getDepth(tree.left, k + 1)
    }
    else {
        Rdeep = getDepth(tree.right, k + 1)
        Ldeep = getDepth(tree.left, k + 1)
    }
    // 下面这一句代码很重要，连AI都没能帮我改出来，通过我自己review发现了这个问题，我的思路 没有问题！
    if (!Rdeep || !Ldeep) return false
    if (Math.abs(Ldeep - Rdeep) > 1) return false
    return Math.max(Ldeep, Rdeep)
}
isBalanced(createTreeII([3, 9, 20, null, null, 15, 7]))

