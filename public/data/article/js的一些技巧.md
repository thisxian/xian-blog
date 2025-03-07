---
title: js的一些技巧
date: 2022-05-14 18:28:12
abbrlink: a1e5ee21
tags:
  - javascript
categories: 前端
cover: >-
  https://img2.huashi6.com/images/resource/2015/11/16/5358h1372p0.png?imageMogr2/quality/100/interlace/1/thumbnail/2000x%3E/format/jpeg
---

## 打乱数组
```js
let arrA = [1, 2, 3, 4, 5, 6, 7, 8, 9]
arrA.sort(() => 0.5 - Math.random()) 
console.log(arrA) // [7, 4, 1, 6, 2, 5, 8, 9, 3]
```

## 数组去重
```js
let arr = ['唱', '唱', '唱', 'rap']
arr = [...new Set(arr)]
console.log(arr) // ['唱', 'rap']
```

## 快速交换两个变量的值
```js
let a = '唱', b = '跳'
[b, a] = [a, b]
console.log(b, a) // 唱 跳
```

## 初始化数组
- 说明
  - fill()：对数组进行填充

```js
let arrA = Array(5).fill(0)
console.log(arrA)  // [0, 0, 0, 0, 0]

let arrB = Array(5).fill().map(() => Array(5).fill(0))
console.log(arrB)  // [0, 0, 0, 0, 0]
                   // [0, 0, 0, 0, 0]
                   // [0, 0, 0, 0, 0]
                   // [0, 0, 0, 0, 0]
                   // [0, 0, 0, 0, 0]
```

## 获取数组最后一项
```js
let arr = ['唱', '跳', 'rap']
let end = arr.at(-1)
console.log(end) // rap
```

## 合并对象
- 注意点
  - 属性重复时后面的属性会覆盖前面的属性

```js
let dataA = {
    name: '张三',
    age: 0
}

let dataB = {
    name: '坤坤',
    hobby: ['唱', '跳', 'rap']
}

let dataC = { ...dataA, ...dataB }

console.log(dataC)  // age: 0
                    // name: "坤坤"
                    // hobby: ['唱', '跳', 'rap']
```

## 可选链操作符 ?.
* `?`相当于一个判断符，如果前面的有，就进入下一层级

```js
let obj = {}
// console.log(obj.msg)        // undefined
// console.log(obj.msg.name)   // 报错

// 获取属性
console.log(obj?.msg?.name)    // undefined
// 调用方法
console.log(obj?.getData?.())  // undefined
```

## 持续更新中