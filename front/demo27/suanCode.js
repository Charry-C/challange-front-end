// 三数之和
var threeSum = function (a) {
    let now = 0, left = now + 1, right = a.length - 1, retArr = []
    a.sort((a, b) => a - b)
    if (a[now] > 0) return retArr
    while (a[now] <= 0 && left < right) {
        // 去重操作
        if (a[now - 1] === a[now]) {
            now++
            right = a.length - 1
            left = now + 1
            continue
        }
        if (a[right] === a[right + 1]) {
            right--
            left = now + 1
            continue
        }
        let sum = a[now] + a[left] + a[right]
        if (sum == 0) {
            retArr.push([a[now], a[left], a[right]])
            left++
            right--
        }
        if (sum < 0) left++
        if (sum > 0) right--
        if (left >= right) {
            now++
            left = now + 1
            right = a.length - 1
        }
    }
    return retArr
}
threeSum([-1, 0, 1, 2, -1, -4])


// 合并两个有序数组
// 下面展示一种节省时间与空间的写法，结合了题意才能想到这么用
// 解法一：（三指针）
var merge = function (nums1, m, nums2, n) {
    let k = m + n - 1, i = m - 1, j = n - 1
    while (k >= 0) {
        // 如果nums2数组的指针都小于0了，证明合并完了，那就直接return
        if (j < 0) {
            return nums1
        }
        // 这里注意else还包含了一种情况，就是num1的指针小于0了，那么就证明
        // nums1的值全都跑到后面去了，那么剩下的就只需要把num2的填上即可
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i]
            i--
        } else {
            nums1[k] = nums2[j]
            j--
        }
        k--
    }
    return nums1
}