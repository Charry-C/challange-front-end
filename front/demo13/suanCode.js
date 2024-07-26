const createTreeII = require('../tool')
// GO ON 树的征程
// 对称二叉树
// 思考：递归然后一个个比较这个思路是不可能的，不同栈执行时机都不同
// 对称二叉 和 diff算法 ？似乎希望的效果是差不多的
// 递归的做法其实也是行不通的，如果说不是根对称其实还能用递归
// 本题想法是利用层序遍历，然后在一开始就划定好左右子树数组
// 发现一个对比数组相等的新思路 利用“字符串”的特性来对比

// 辅助函数
function floorMap(tree) {
    const queue = [], arr = [], map = new Map()
    let count = 0, k = 1, floorIndex = 1
    // 初始化队列
    queue.push(tree)
    while (queue.length) {
        let popItem = queue.shift()
        arr.push(popItem.value)
        count++
        map.set(k, arr.slice(Math.pow(2, k - 1) - 1, count))
        if (count >= floorIndex) {
            k++
            floorIndex = Math.pow(2, k) - 1
        }

        if (popItem.left) queue.push(popItem.left)
        if (popItem.right) queue.push(popItem.right)
    }
    return map
}
// 利用两个值，一个count 一个k + 一个公式即可确定目前是第几层
console.log(floorMap(createTreeII([1, 2, 2, 3, 4, 4, 3])));

var isSymmetric = function (root) {
    let myRoot = createTreeII(root)
    if (myRoot.left == null && myRoot.right == null) {
        return true
    }
    if (!myRoot.left && !myRoot.right) return false

    const Ltree = floorMap(myRoot.left)
    const Rtree = floorMap(myRoot.right)
    console.log(Ltree);
    console.log(Rtree);
    for (const [key, L] of Ltree) {
        if (key > 1 && L.length === 1) return false
        if (Rtree.get(key).join('') != L.reverse().join('')) return false
    }
    return true
};
console.log(isSymmetric([1, 2, 3]));

// 有个新思路，就是采用不同的递归遍历左右子树，然后把数组join('')进行比较
// Leetcode一样的代码死活过不去，不写了

