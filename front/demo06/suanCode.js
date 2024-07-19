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
testLink(reverseList(node))

function reverseList_simple(node) {
    let nowNode = new Node()
    while (node.next) {
        let nextNode = node
        node.next = nowNode
        nowNode = nextNode
        node = node.next
    }
    return node
}
testLink(reverseList_simple(node))
