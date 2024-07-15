/*
 * @Author: Charryc 1121716938@qq.com
 * @Date: 2024-07-11 12:07:18
 * @LastEditors: Charryc 1121716938@qq.com
 * @LastEditTime: 2024-07-15 12:06:15
 * @FilePath: \手撕代码\front\demo02\demo02.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 基础数据结构
// 01.栈
const stack = []
    // 入栈
stack.push(0)
stack.push(1)
stack.push(2)
    // 出栈
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
    // >>> 2 1 0

// 02.队列
const queue = []
    // 入队
queue.push(0)
queue.push(1)
queue.push(2)
    // 出队
console.log(queue.shift());
console.log(queue.shift());
console.log(queue.shift());
    // >>> 0 1 2

// 03.链表

// 定义一个node节点
class Node{
    constructor(value = null, next = null){
        this.value = value
        this.next = next
    }
}

// 定义创建链表的函数，返回第一个链表节点
function CreateLinkList(arr){
    const len = arr.length
    if(len<=0){
        console.log('error');
        return
    }

    // node为最后的node先创建出来，是没有next的
    let node = new Node(arr[len-1])

    if(len==1) return node

    // 循环生成node链式表
    for(let i = len-2; i>=0; i--){
        // 这里不需要担心等号左边的node会被传到next的node中
        // 执行顺序是先等号右侧的表达式，因此next的node其实就是上一次的node
        node = new Node(arr[i], node)
    }
    return node
}

console.log(CreateLinkList([1,2,3,4]));
// >>> { value: 1, next: { value: 2, next: { value: 3, next: [Object] } } }

//04.集合（Set）
// 去重
const arr = [1, 1, 2, 2, 5] 
console.log(new Set(arr));
// 判断元素是否在数组中
console.log(new Set(arr).has(0));
// 取交集
const arr2 = [2,3,5,1,1]
const set = new Set(arr2)
console.log([...new Set(arr)].filter(item=>set.has(item)));

//05.字典(哈希: key:value)
const map = new Map()

// 增
map.set('key1', 'value1')
map.set('key2', 'value2')
map.set('key3', 'value3')

// 删
map.delete('key3')
map.clear()

// 改
map.set('key2', 'value222')

// 查
console.log(map.get('key1'));


//06.树
// 创建一棵二叉树,左侧就是索引为奇数的值，右边就是索引为偶数的值，传入索引超过值就返回root，不再生长
class TreeNode{
    // 定义树节点node的基本结构
    constructor(value = null, left = null, right = null){
        this.value = value
        this.left = left
        this.right = right 
    }
}

function createTree(arr, i){
    if(!arr[i]){
        return null
    }
    let node = new TreeNode(arr[i])

    // 创建左右节点
    if(i <= arr.length){
        node.left = createTree(arr, 2*i+1)
        node.right = createTree(arr, 2*i+2)
    }
    return node
}

let arrTree = [1, 2, 3, 4, 5, 6, 7];
let root = createTree(arrTree, 0);
console.log(root);

function levelOrderTraversal(root) {
    let arr = []
    if(root === null){
        return arr
    }
    let queue = []
    queue.push(root)
    while(queue.length > 0){
        // 取出队列第一个node，顺便出队，记录是第几层的node
        let node = queue.shift()
        console.log(node.value);
        if(node.left){
            queue.push(node.left)
        }
        if(node.right){
            queue.push(node.right)
        }
    }
}
levelOrderTraversal(root)



// TODO查询（先序遍历 中序遍历 后序遍历）
// 1. 先序遍历



// 2. 中序遍历



// 3. 后序遍历