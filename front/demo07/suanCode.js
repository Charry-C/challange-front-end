// 三数之和
function threeNumSum(arr, target) {
    let targetArr = []
    if (arr.length < 3) {
        return -1
    }
    for (let i = 0; i <= (arr.length) - 3; i++) {
        // 控制轮数
        for (let j = i + 1; j < arr.length - 1; j++) {
            let count = j + 1
            while (count < arr.length) {
                if (arr[i] + arr[j] + arr[count] === target) {
                    targetArr.push([arr[i], arr[j], arr[count]])
                }
                count++
            }
        }
    }
    return targetArr
}

console.log(threeNumSum([-1, 0, 1, 2, -1, -4], 0));

class Node {
    constructor(value = null, next = null) {
        this.value = value
        this.next = next
    }
}
function createLinkList(arr) {
    let len = arr.length
    if (len <= 0) {
        return
    }
    let node = new Node(arr[len - 1])
    if (len == 1) {
        return node
    }
    for (let i = len - 2; i >= 0; i--) {
        node = new Node(arr[i], node)
    }
    return node
}
function testLink(node, str = '新的测试：') {
    let myNode = node
    console.log('============', str, '=============');
    while (myNode) {
        console.log('遍历链表:', myNode.value);
        myNode = myNode.next
    }
}


// 1. 两两交换链表
// 随记一下，本来两两交换列表看的我很难受，完全不知道如何下手(看到上面那个题了吧，就是用来找一下自信的)
// 线画来画去十分混乱，看了一下视频一下子柳暗花明又一村！
// 思路，也可以说得到了一些算法思想
// 首先这个肯定是要遍历的，那么就得先找出规律 和 遍历的结束条件
// 如果没有加这个虚拟头节点，永远找不到规律 和 结束条件，这就和做几何数学题一样，那条辅助线不画出来根本没法做
// 加了虚拟头节点就十分清晰了（链表无非就是一堆箭头的指向问题嘛，所以不要把自己搞乱了，记录好这些箭头，重新赋值next的时候在图上断开就ok了）
// 题是刷不完的，思想很重要
function swapLinkList(node) {
    let head = new Node(0, node)
    let cur = head
    // 这里的顺序很重要,如果说"next"都不存在那么就会是undefined,undefined !== null >> true
    while (cur.next !== null && cur.next.next !== null) {
        let temp = cur.next
        let temp1 = cur.next.next.next
        cur.next = cur.next.next
        cur.next.next = temp
        temp.next = temp1
        cur = cur.next.next
    }
    return head.next
}

testLink(swapLinkList(createLinkList([1, 2, 3, 4, 5])))

// 2. 删除链表的倒数第N个节点
// 首先“倒数”先得处理，其次就是删除
// “倒数”可以采用栈的思想，那么就是递归，结束条件为next = null 然后返回开始计数
// return返回可以返回
function deletBackCountNode(node, n) {
    if (node.next == null) {
        return {
            node: node,
            n: n - 1
        }
    }
    let obj = deletBackCountNode(node.next, n)
    if (obj.n === 0) {
        node.next = obj.node.next
    }
    return {
        node: node,
        n: obj.n - 1
    }
}
let headNode = new Node(0, createLinkList([1, 2, 3, 4, 5]))
let retNode = deletBackCountNode(headNode, 1).node.next
testLink(retNode, '删除链表的倒数第N个节点')
// 不错，上面的写法在代码随想录中竟然没有，递归属于是玩明白了

// 学习一下双指针法
// 很妙的一种做法，快慢指针
// 1. 如何处理倒数的问题：先让指针往前走，再往回走（妙！）!!又有问题了，怎么往回走
// （！！！上面理解戳辣）：
/**
为啥要让快指针先行？
快指针先行n步，是为了找到倒数的第n个，可以把快指针就当作是最后一个
那么相对于快指针来说，慢指针就相当于在倒数的第n个了
为啥快指针先行了n+1步？
由于单链表中的next指针指向的是下一个节点，想要删除倒数第n个节点，自然要将操作指针慢指针指向倒数第n+1个节点，这样才能进行删除操作。
虚拟头节点dummyHead的作用是？
如果单链表中要删除的节点是头节点，这个头节点正好是dummyHead的下一个节点，如此即可统一起来删除操作而不必单独考虑。
 */
// 2. 如何删除，要删除第n个节点，就需要操作n-1节点才可以，因此需要让快指针变为n+1
function deletBackCountNode_doublePoint(node, n) {
    let head = new Node(0, node)
    let slow = head, quick = head
    // 先移动个n步，后面的循环移动到最后，形成一个倒数的差（妙！）
    while (n--) {
        quick = quick.next
    }
    // 这里为什么是quick.next的原因就是第2点
    while (quick.next) {
        quick = quick.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return head.next
}
testLink(deletBackCountNode_doublePoint(createLinkList([1, 2, 3]), 1), '双指针法')

// 3.链表相交
// 我的思路是用两个数组去保存链表的值，然后用滑动窗口去寻找
let head1 = createLinkList([1, 2, 3, 3, 5, 6])
let head2 = createLinkList([2, 6, 5, 1, 6])
function addValue(arr, node) {
    while (node) {
        arr.push(node.value)
        node = node.next
    }
    return arr
}
function crossLinkList(node1, node2) {
    let arr1 = [], arr2 = []
    arr1 = addValue(arr1, node1)
    arr2 = addValue(arr2, node2)
    let flag = false
    let cross = -1
    // 利用滑动窗口比较子数组（数组不行，转成字符串）是否相等
    // 循环控制的是窗口的大小
    for (let i = 1; i < Math.min(arr1.length, arr2.length); i++) {
        if (arr1.slice(arr1.length - i).join('') == arr2.slice(arr2.length - i).join('')) {
            flag = true
            cross = Math.min(arr1.length, arr2.length) - i
            continue
        }
    }
    console.log('相交的点的下标为:', cross);
}
crossLinkList(head1, head2)