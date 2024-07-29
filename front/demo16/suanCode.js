const createTreeII = require('../tool')

// 1. 二叉树的所有路径
// 就是一个深度优先的递归，遇到tree.left = null && tree.right = null 就返回
// 返回值：数组(从下往上往前加arr.unshift())
var binaryTreePath = function (tree) {
    let Larr = [], Rarr = [], Lpath, Rpath
    if (tree.left == null && tree.right == null) {
        return [[tree.value]]
    }

    if (tree.left !== null) {
        Lpath = binaryTreePath(tree.left)
        Lpath.forEach((L) => {
            Larr.push([tree.value, ...L])
        })
    }
    if (tree.right !== null) {
        Rpath = binaryTreePath(tree.right)
        Rpath.forEach((R) => {
            Rarr.push([tree.value, ...R])
        })
    }
    // 合并左右子树路径
    return Larr.concat(Rarr)
}
var binaryTreePaths = function (tree) {
    console.log(binaryTreePath(tree));
};
binaryTreePaths(createTreeII([1, 2, 3, 5, 6]))



// 2. 左叶子之和
var sumOfLeftLeaves = function (tree) {
    return getLeftLeaf(tree, 0)
};

var getLeftLeaf = function (tree, tag) {
    if (!tree) return 0

    if (tree.left == null && tree.right == null && tag) {
        return tree.value
    }
    let Ltree = 0, Rtree = 0
    if (tree.left !== null) {
        Ltree = getLeftLeaf(tree.left, 1)
    }
    if (tree.right !== null) {
        Rtree = getLeftLeaf(tree.right, 0)
    }
    return Ltree + Rtree
}
console.log(sumOfLeftLeaves(createTreeII([3, 9, 20, null, null, 15, 7])));



// 3. 树左下角的值
// 思路：用到了比较大小的擂台思想，可以采用递归依次寻找最深的那个左叶子
// 发现如果还有更深的就覆盖，没有就保留
// 返回值：{ value: tree.value,deep: k,tag: tag }
var findBottomLeftValue = function (tree) {
    return getLeft(tree)
};


var getLeft = function (tree, tag = 0, k = 1) {
    if (tree.left == null && tree.right == null) {
        return {
            value: tree.value,
            deep: k,
            tag: tag
        }
    }
    let Rval = { value: null, deep: null, tag: null }
    let Tval = { value: null, deep: null, tag: null }
    if (tree.left !== null) {
        Tval = getLeft(tree.left, 1, k + 1)
    }
    if (tree.right !== null) {
        Rval = getLeft(tree.right, 0, k + 1)
    }
    // 对比逻辑：一个是底层，一个是左边
    // 对比顺序：先底层再左边
    if (Tval.deep >= Rval.deep && Tval.tag) {
        return Tval
    }
    if (Tval.deep < Rval.deep && Rval.tag) {
        return Rval
    }
    if (Tval.deep >= Rval.deep) {
        return Tval
    }
    if (Tval.deep < Rval.deep) {
        return Rval
    }
}
// findBottomLeftValue(createTreeII([0, null, -1]))

// 层序遍历也是个不错的解法，在层序遍历while中再套一层for循环
// 就可以实现将同一层的全部出队，然后还能让下一层的全部入队
// 每次循环都是找第一个出队的，就可以实现：“最底层，最左边”
// 妙！



// 4. 路径总和
// 这题与 “1. 二叉树的所有路径” 类似，不过下面的算暴力写法，return完才寻找
// 还有一个思路是用 减法，然后回溯(把值加回去)
var hasPathSum = function (tree, targetSum) {
    return getSum(tree)
};


var getSum = function (tree) {
    if (tree.left == null && tree.right == null) return [tree.value]

    let Lsum = [], Rsum = []
    if (tree.left !== null) {
        Lsum = getSum(tree.left).map(item => item + tree.value)
    }
    if (tree.right !== null) {
        Rsum = getSum(tree.right).map(item => item + tree.value)
    }
    return Lsum.concat(Rsum)
}
console.log(hasPathSum(createTreeII([1, 2, 3, 4, 5, 6, 7])));
