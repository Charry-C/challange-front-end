// 为了做下面的题，我先造一颗树出来
class Tree {
    // 树的基本结构（节点）
    constructor(value = null, left = null, right = null) {
        this.value = value
        this.left = left
        this.right = right
    }
}

// 要生成满二叉树，因此只需要传递层数k即可,value都为null或者0
var createTree = function (k) {
    const tree = new Tree()
    if (k <= 1) return tree

    tree.left = createTree(k - 1)
    tree.right = createTree(k - 1)

    return tree
}
console.log('4层的满二叉:', createTree(4));


// 用数组生成一颗树,需要注意一点：这里的树是同一层优先左边
// 返回的是节点
var createTreeII = function (arr, i = 1) {
    if (arr.length < 1) {
        return new Tree()
    }

    if (!arr[i - 1]) {
        return null
    }
    // 传入根节点的值
    let tree = new Tree()

    // 这里传i-1实际上是为了对应到下标
    // 这里折腾了半天，2*i 2*i+1  2*i 2*i-1,看上去好像一样
    // 实际上 一个会向前，一个会爆栈，应该用+而不是-
    tree.value = arr[i - 1]
    tree.left = createTreeII(arr, 2 * i)
    tree.right = createTreeII(arr, 2 * i + 1)

    return tree
}
console.log(createTreeII([1, 2, 3, 4, 5, 6, 7]));



// 满二叉树
// k层->2^k-1个节点
// 上面的结论实际上是从数学的角度（找规律得来的），而我们下面的程序需要从“树结构”的角度来计算
// 返回（自身+分支节点）
// 返回条件，当分支节点为null时
var treeNodeCount = function (tree) {
    // 左子树为空 / 右子树为空，返回自身节点数(1)
    if (!tree.left || !tree.right) {
        return 1
    }
    // 递归的关键其实就是找到每一次都要做的事 和 要返回什么
    // and 最后返回的条件
    let cLift = treeNodeCount(tree.left)
    let cRirht = treeNodeCount(tree.right)

    return cLift + cRirht + 1
}
console.log(treeNodeCount(createTree(4)));

// 完全二叉树（有节点顺序的树） -> 理解非完全二叉即可，是他的补集
// 除了当有右子树，没有左子树时即为 非完全二叉


// 二叉搜索树（有数值节点顺序的树）
//         10                    10
//     6       16            6
//   3   9   14  19        3   9

// 平衡二叉搜索树，在二叉搜索树的前提下，加一个平衡的条件(左右子树高度差<=1)
// map、set的增删操作实现的底层就是平衡二叉搜索 时间复杂度logn



const testTreeArr = [[1, 2, 3, 4], [], [1], [1, 2, 3, 4, 5, 6, 7, 8], [9, 8]]
/**
 * 遍历的测试函数
 * @param {Function} fn 
 */
const testTreeFn = function (fn, str = '遍历测试') {
    let treeArr = []
    let retArr = []
    testTreeArr.forEach((item) => {
        treeArr.push(createTreeII(item))
    })
    console.log(str);
    treeArr.forEach((tree) => {
        retArr.push(fn(tree))
    })
    return retArr
}


// 层序遍历，广度优先(Breadth-First-Search)
// 思路：一层层遍历，可以采用队列思想（发现层序遍历是先进先出）
// 存储加入队列的树，在shift出去时将其的左右子树加入到队列中
var floorSearch = function (tree) {
    let queue = []
    let arr = []
    queue.push(tree)
    while (queue.length) {
        let newTree = queue.shift()
        arr.push(newTree.value)
        if (newTree.left) queue.push(newTree.left)
        if (newTree.right) queue.push(newTree.right)
    }
    return arr
}

console.log(testTreeFn(floorSearch));


// 下面三种遍历均为 深度有限搜索(Depth-First-Search)
// 毫无疑问，肯定用的都是递归，大体感觉就是递归的顺序不一样就能写出下面三种
// 所以理论上写出一种，然后改变递归顺序即可

// 思路：返回条件 （左右子树都为null）

// 前序遍历
var frontSearch = function (tree) {
    console.log(tree.value);
    if (!tree.left && !tree.right) return null
    if (tree.left) frontSearch(tree.left)
    if (tree.right) frontSearch(tree.right)
}
console.log('前序遍历（中左右）');
frontSearch(createTreeII([5, 4, 6, 1, 2, 7, 8]))


// 中序遍历
var middleSearch = function (tree) {
    if (!tree.left && !tree.right) return tree.value
    if (tree.left) {
        let val = middleSearch(tree.left)
        val ? console.log(val) : ''
    }
    console.log(tree.value);
    if (tree.right) {
        let val = middleSearch(tree.right)
        val ? console.log(val) : ''
    }
}
console.log('中序遍历（左中右）');
middleSearch(createTreeII([5, 4, 6, 1, 2, 7, 8]))


// 后序遍历
var backSearch = function (tree) {
    if (!tree.left && !tree.right) return tree.value
    if (tree.left) {
        let val = backSearch(tree.left)
        val ? console.log(val) : ''
    }
    if (tree.right) {
        let val = backSearch(tree.right)
        val ? console.log(val) : ''
    }
    console.log(tree.value);
}

console.log('后序遍历（左右中）');
backSearch(createTreeII([5, 4, 6, 1, 2, 7, 8]))


// 翻转二叉树,一言递归
// 思路：交换同级左右节点，操作是在上一级进行操作
// 递归结束条件：左右子树为空
// 返回值：treeNode
// 乍一看，感觉很像翻转链表，回去看了一下翻转链表，确实是一个思路（把换好的节点给上一层递归）
var reverseTree = function (tree) {
    return reverse(tree)
}

var reverse = function (tree) {
    if (!tree.left && !tree.right) {
        return tree
    }
    // 本层交换下层节点
    let Lnode = reverse(tree.left)
    let Rnode = reverse(tree.right)
    tree.left = Rnode
    tree.right = Lnode
    return tree
}

console.log(reverseTree(createTreeII([4, 2, 7, 1, 3, 6, 9])));
