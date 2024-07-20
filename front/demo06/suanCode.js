// 代码随想录：链表章节-启动！
let testArr = [[1, 3, 4, 5, 5, 7], [1, 2, 6, 3, 4, 5, 6], [7, 7, 7, 7], []]
function testLink(node) {
    let myNode = node
    while (myNode) {
        console.log('遍历链表:', myNode.value);
        myNode = myNode.next
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

class Node {
    // this就是实例对象本身,从step2、3可以看出
    // 顺便再复习一下new的过程
    // 1.创建一个obj = {}
    // 2.obj.__proto__ = Node.prototype
    // 3.var result = Node(对应class Node的constructor).call(obj,value,next);
    // 4.return typeof result === 'object' ? result : obj
    // 使用Node类实际上是使用了ES6的语法糖，简化了后续需要继承的一些步骤
    // 且再class中定义好的方法就直接说Node构造函数的prototype上的方法了
    // 因此class和下面的实际上是异曲同工
    // function Node(value = null, next = null){
    //      this.value = value
    //      this.next = next
    // }
    // Node.prototype.addAtHead = function(){}
    constructor(value = null, next = null) {
        this.value = value
        this.next = next
    }
    get(index) {
        let count = 0
        let copyNode = this
        while (copyNode) {
            copyNode = copyNode.next
            count++
            if (count == index) {
                return copyNode.value
            }
        }
        return -1
    }
    addAtHead(val) {
        let retNode = new Node(val, this)
        return retNode
    }
    addAtTail(val) {
        let copyNode = this
        // 再复制一个
        let coopyyy = copyNode
        while (copyNode.next) {
            // 修改最后一个
            copyNode = copyNode.next
        }
        copyNode.next = new Node(val)
        return coopyyy
    }
    addAtIndex(index, val) {
        let len = 0
        let cyNode = this
        while (cyNode) {
            cyNode = cyNode.next
            len++
        }
        if (len === index) {
            return this.addAtTail(val)
        }
        if (index > len) {
            return this
        }
        if (index < 0) {
            return this.addAtHead(val)
        }

        let copyNode = this
        let count = 1
        let cccoopppyyy = copyNode
        while (copyNode) {
            if (index == count + 1) {
                let newNode = new Node(val, copyNode.next)
                copyNode.next = newNode
            }
            copyNode = copyNode.next
            count++
        }
        return cccoopppyyy

    }
    deleteAtIndex(index) {
        let retNode = new Node(null, this)
        let node = retNode
        let count = 0
        while (node.next) {
            if (count === index) {
                node.next = node.next.next
                return retNode.next
            }
            count++
            node = node.next
        }

    }
}

// testArr.forEach((e, index) => {
//     console.log(`========测试第${index + 1}个数组=========`);
//     testLink(createLinkList(e));
// })
function deleteItem(arr, target) {
    // 多加一个虚拟头来保证当第一个节点需要删除时可以和后面的逻辑相同（好思想啊！为了保证相同逻辑创建虚拟的，最后把虚拟的去掉）
    let node = new Node(null, createLinkList(arr))

    // 当我们既要保留原来的链表的头，又要让链表向前移动时，可以直接采用赋值的方式进行浅拷贝
    let retNode = node
    while (node.next) {
        if (node.next.value === target) {
            node.next = node.next.next
            // 继续查找是否还相等
            continue
        }
        // 当不相等时才能让现在的node=下一个node,不然就会漏，因为我们采用的是node.next.value去比对
        node = node.next
    }
    return retNode.next
}
// [1, 3, 4, 5, 5, 7]
// testLink(deleteItem(testArr[2], 7))

// 总结一下：这一题困住我的一点就是原本不知道可以通过赋值保留原本的引用，导致总是改了但是返回的却不对
// 还有一点没想到的就是 加虚拟头 的这个想法，再一点细节就是continue这个点了，整体还是由于不熟练链表的操作

// 2.设计链表（可以通过这题来熟悉链表的操作 与 提升代码实践能力）
let node = createLinkList(testArr[0])



// 3.翻转链表
function reverseList(node) {
    let stack = []
    while (node) {
        console.log('node.value:', node.value);
        stack.unshift(node.value)
        node = node.next
    }
    console.log(stack);
    return createLinkList(stack)
}
// testLink(reverseList(node))


// fix一下，之前写的存在问题
// 使用递归的思想，递归的思想怎么来的：我的想法是如果可以"动态"的控制node[next][next][next]的层数
// 那么我不就可以让node[next][next] = node[next],这样不就不会覆盖掉之前的节点了吗
// 递归要搞清楚 自己返回的那个最小单元是为了什么：这里是为了返回给上一层一个已经改变好node[next]的node
function reverseList_simple(node) {
    if (node.next == null) {
        stackArr.push(node)
        return node
    }
    let nextNode = reverseList_simple(node.next)
    nextNode.next = node
    return node
}
let stackArr = []
let copyNode = createLinkList([1, 2, 3, 4, 5])
let lastNode = reverseList_simple(copyNode).next = new Node()
testLink(stackArr[0])

// 修正我之前的误区，私以为改变了obj.a会影响到temp，却忘记了赋值其实赋的是引用（内存地址）
// 由于是地址不是数据，因此改变obj.a只是把obj.a的指针变了，并不会影响temp
let obj = {
    a: {
        b: 1
    }
}
let temp = obj.a
obj.a = null
console.log('ceshi:', temp);

// 双指针法,搞明白之前的误区就好解决了
function reverseNodeList(node) {
    if (node == null || node.next == null) {
        return node
    }
    let pre = null, cur = node
    while (cur) {
        let temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    return pre
}
testLink(reverseNodeList(createLinkList([9, 8, 7, 6, 5, 4, 3, 2, 1])))