---
title: js ES6+语法
createDate: 2025-03-09
updateDate: 2025-03-09
tags: js es6
excerpt: js的各种高级特性
---

# ES6

## 数据类型方法
### String
#### 重复 repeat
* `str.repeat( n )`【返回 重复 n 次的 str 字符串】
	* 参数如果是小数，会被取整

#### 转码 fromCharCode
* Unicode 码点返回对应字符
```js
String.fromCharCode(0x20BB7)
// "ஷ"
```
---
### object
#### 参数对比 is
* 语法：**`Object.is(参数1 , 参数2)`**【判断数据是否相同 ,相同true 不相同false】
```js
+0 == -0;    // true
+0 === -0;   // true
NaN == NaN;  // false

"-------es6--------";
Object.is(+0, -0);    // false
Object.is(NaN, NaN);  // true
```

#### 合并 assign
* 实行的是`浅拷贝`，而不是深拷贝。只拷贝第一层的基本数据类型
```js
let obj1 = { a: 1 };
let obj2 = { b: 2 };
let obj3 = Object.assign(obj1, obj2)
console.log(obj3); // {a: 1, b: 2}
```

#### PrototypeOf
* **继承父类原型上的方法**，传入原型对象
* **设置原型对象 `Object.setPrototypeOf`**
```js
let obj1 = {}
let obj2 = {
    callA() {
        console.log('我欲修仙');
    },
    callB() {
        console.log('法力无边');
    }
}
Object.setPrototypeOf(obj1, obj2);
obj1.callA(); // 我欲修仙
obj1.callB(); // 法力无边
```
* **获取原型对象 `Object.getPrototypeOf`**
```js
console.log(Object.getPrototypeOf(obj1));
// callA: ƒ callA()
// callB: ƒ callB()
// [[Prototype]]: Object
```
---
### Number
#### 有限数 isFinite
- **`Number.isFinite`**判断一个数是否为有限数（就是可以写成分数的数）
```js
console.log(Number.isFinite(100)); // true
console.log(Number.isFinite(100 / 0)); // false
```

#### 字符串转整数 parseInt
```js
console.log(Number.parseInt('123abc'));     // 123
console.log(Number.parseInt('abc123'));     // NaN
console.log(Number.parseInt('123.123abc')); // 123
```

#### 字符串转浮点数 parseInt
```js
console.log(Number.parseFloat('123abc'));     // 123
console.log(Number.parseFloat('abc123'));     // NaN
console.log(Number.parseFloat('123.123abc')); // 123.123
```

#### 是否为整数 isInteger
```js
console.log(Number.isInteger(123));     // true
console.log(Number.isInteger('123'));   // false
console.log(Number.isInteger(123.456)); // false
```
---
### Math
#### 判断 正数 负数 零 sign
```js
console.log(Math.sign(100));   // 1
console.log(Math.sign(0));     // 0
console.log(Math.sign(-2000)); // -1
```

#### 其他方法
* **抹掉小数** **`Math.trunc`**
	```js
	console.log(Math.trunc(3.14)); // 3
	```
---

### 数组
```js
Array.some(_=>_);   // 一个元素满足条件返回 true

Array.every(_=>_);  // 所有元素满足条件返回 true
```


## 数据类型属性
### Number
#### 最小精度  EPSILON
 *  `Number.EPSILON`是 js 表示的最小精度
	* `EPSILON`属性的值接近于 2.2204460492503130808472633361816E-16

	```js
	// 精度判断
	function equal(a, b) {
	    return Math.abs(a - b) < Number.EPSILON
	}
	console.log(0.1 + 0.2 === 0.3);       // false
	console.log(equal((0.1 + 0.2), 0.3)); // true
	```

#### 二进制和八进制（其）
```js
let b = 0b1000; // 二进制  【0b 开头】
let o = 0o777;  // 八进制  【0 | 0o 开头】
let x = 0xff;   // 十六进制 【0x 开头】
```
---
## 新特性
### 作用域
* `var`
	* 作用于域（`函数`）
	* 有变量名提升
	* 相同作用域内能重复声明

* `let`
    - 作用于块（ `{ } ( )` ）
    - 无变量名提升
    - 相同作用域内不能重复声明（包括先var声明或后var声明）
        - 抱错：Identifier 'a' has already been declared（标识符“a”已经声明）
    - 暂时性死亡
	    - 对象内（/块:不确定）和对象外有相同的变量名，优先执行对象内变量
		```js
			var a = 200;
		{
		    console.log(a);  // Cannot access 'a' before initialization
		    let a = 100      // （在初始化之前不能访问'a'）
		    console.log(a);
		}
		```

* `const`
	* 声明常量，不可被修改【对引用数据类型来说是引用地址】
	* 其余同let
---
### 箭头函数
* 语法
```js
// 普通函数：
function(){}
// 箭头函数：
() => {}

// 定义函数
var ranNum = (num) => {
	return parseInt(Math.random() * num + 1);
};

// 只有一个形参和一行代码时，省略 () 和 return
arr.forEach( e => console.log(e));
```
-   **注意**
    1.  箭头函数内的`this`指向上`一层this`（外层。**特别的是**，**实例化**对象内的箭头函数属性内的**this**还是**指向实例化的对象
    2. this是静态的．this 始终指向函数声明时所在作用域下的 this的值

    4.  箭头函数不能用new来创建构造函数的实例，普通函数可以（因为箭头函数创建的时候程序不会为它创建construct方法，也就是没有构造能力，用完就丢掉了，不像普通函数重复利用，因此也不需要构造函数原型，也就是不会自动生成prototype属性）
    5.  程序不会给箭头函数创建arguments对象（没有arguments）
    6.  普通函数中的this是动态的，而箭头函数中的this指向的是紧紧包裹箭头函数的那个对象（定义时决定的）
    7.  箭头函数不能通过**bind、call、apply**来改变this的值，但依然可以调用这几个方法（只是this的值不受这几个方法控制）
---
### 解构
* **解构数组**
```js
function dataArr() {
    return ['一', '二', [3, 4]]
}
let [a, b, [c, d], e] = dataArr(); 
// 一 二 3 4 undefined

let [a, ...arr] = dataArr()
// a [除了a]

let {2:a, 3:b } = dataArr(); 
// 二 [c, d]
```

* **解构对象**
```js
function dataObj() {
    return { name: '张三', age: "20", hobby: ["唱", "跳", "rap"] }
}
let { name, age: a, hobby: h } = dataObj();
console.log(name, a, h); // 张三 20 ["唱", "跳", "rap"]

// 不要某个属性（剩下的属性在newObj中）
let {name, ...newObj} = dataObj()
// newObj中没有name
```

* **解构形参**
```js
function demo(str, { age, hobby }) {
    console.log(str, age, hobby);  // 张三 20 唱跳rap
}
demo("张三", { age: 20, hobby: "唱跳rap" })
```

* **嵌套解构**
```js
let obj = {
    name: '张三',
    age: "20",
    data: {
        hobby: ["唱", "跳", "rap"],
        height: '10000cm'
    }
}
let { data: { hobby: [chang, tiao, rap] } } = obj
```
---
### 展开运算符
* 语法：`...`（三个点）

* **合并数组**
	* `arr =  [...arr1, ...arr2]`
	* 深拷贝一层数据

* **合并对象**【es9】
	* `data = {...data, ...obj}`
	* obj的属性和data属性重复时，obj覆盖data的属性

* **作为实参**
	```js
	function demo() {
		console.log(arguments); // Arguments(3) [1, 2, 3]
	}
	demo(...[1, 2, 3])
	```

* **作为形参（rest参数）**
	```js
	// ----------------情况一----------------
	function add(...arr) { 
		console.log(arr) // 传入的 1  2  3 转换为 [1, 2, 3]
	}
	add(1, 2, 3); // 6
	
	// ----------------情况二----------------
	// 把没有形参承接的实参组成数组
	function add(str, ...arr) {
		console.log(str) // xian
		console.log(arr) // [1,2,3]
	}
	add("xian", 1, 2, 3)
	```
---
### 模板字符串
* 语法
	* `字符串${变量}字符串`
	```js
	console.log(`现在时间的：${new Date().toLocaleDateString()}`);
	```
* 特点
	1. 换行不需要+连接
	2. 可在${}里嵌套，运算公式，调用函数

* 标签模板，标签函数（用于过滤数据）
```js
let name = "张三"
let age = 10;
// ----------- ES6 -----------
let str = demo`${name}今年${age}`;
// template：变量 切割的字符串数组
// data：变量数组，记得用...
function demo(template, ...data) {
    console.log('template: ', template); // (3) ["", "今年", "",]
    console.log(data);                   // (2) ["张三", 10]
    let s = ''
    data.forEach((e, i) => {
        s += template[i] + e;
    })
    return s + template[template.length - 1]; // 返回的值赋给str
}
console.log(str);  // 张三今年10
```
---
### 函数默认值
```js
//---------- ES5 ----------
function demo(str, hobby) {
    hobby = hobby || "唱跳rap"
    console.log(str, hobby);
}
demo("张三")
//---------- ES6 ----------
function demo(str, hobby = "唱跳rap") {
    console.log(str, hobby);
}
demo("张三")
```
---
### Symbol 数据类型
* [详情](https://es6.ruanyifeng.com/#docs/symbol)
* **特点**
	* Symbol 的值是唯一的，用来解决命名冲突的问题
	* Symbol 值不能与其他数据进行运算，会报错
	* Symbol 定义的对象属性不能使用for...in循环遍历，但是可以使用Reflect.ownKeys来获取对象的所有键名
	* 类似字符串的数据类型，但不是字符串

* **创建**
	* **`Symbol()`**
	* **`Symbol.for()`**
		* symbol.for访问的是一个全局的symbol表，如果有了就访问对应对象，没有就重新创建
	```js
	let s = Symbol();
	console.log(s, typeof s); // Symbol() "symbol"
	let s1 = Symbol('xian');  // Symbol(xian)，里边的字符串相当于一个注释
	let s2 = Symbol('xian');  // Symbol(xian)
	console.log(s1 === s2);   // false【相当于有两张100，但编号不一样】
	
	// 函数对象
	let s4 = Symbol.for('xian');
	let s5 = Symbol.for('xian');
	console.log(s4, typeof s4); // Symbol(xian) "symbol"
	console.log(s4 === s5);     // true，可以通过描述字符串获取唯一Symbol
	```

* **使用场景**
	* 向对象中添加属性或方法
		```js
		let game = {
		    name: '毒奶粉'
		}
		// 描述对象
		let direction = {
		    up: Symbol(),
		    down: Symbol(),
		}
		// 添加方法，因为Symbol上一个唯一值，所以不会重复
		game[direction.up] = () => {
		    console.log('向上移动');
		}
		game[direction.down] = () => {
		    console.log('向下移动');
		}
		// 调用方法
		game[direction.up](); 
		```

* **内置 Symbol 值**，指向语言内部使用的方法，都是自动执行的
	* **`Symbol.hasInstance`**
		* 使用`instanceof`时触发，并把左边的参数传进，且`return`的值决定结果
		* 相当于重写了 instanceof
		```js
		class Person {
			// 调用instanceof时触发
		    static [Symbol.hasInstance](param) {  
		        console.log(param);        // {}
		        return true
		    }
		}
		let o = {};
		console.log(o instanceof Person);  //  true
		```
	* [还有很多](https://es6.ruanyifeng.com/#docs/symbol)

### 迭代器 Generator
* **简介**：迭代器(lterator)是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构`只要部署lterator接口，就可以完成遍历操作`。
* ES6创造了一种新的遍历命令for...of循环，lterator接口主要供 for...of消费
* 原生具备iterator接口的数据(可用for of 遍历)
	* `Array`，`Arguments`，`set`，`Map`，`String`，`TypedArray`，`NodeList`

* es5封装
	```js
	function iterator(arr) {
	    var i = 0;
	    return {
	        next() {
	            var done = arr.length > i;
	            var value = done ? arr[i++] : undefined
	            return {
	                value,
	                done
	            }
	        }
	    }
	}
	let iter = iterator(['唱', '跳', 'rap'])
	console.log(iter.next()); // {value: "唱", done: true}
	console.log(iter.next()); // {value: "跳", done: true}
	console.log(iter.next()); // {value: "rap", done: true}
	console.log(iter.next()); // {value: undefined, done: false}
	```

* **定义一个迭代器**
	```js
	let obj = {
	    name: '小明',
	    hobby: ['唱', '跳', 'rap'],
	    // 自定义一个迭代器，按照意愿进行迭代
	    [Symbol.iterator]() {
	        index = 0;
	        return {
	            next: () => {
	                const done = index === this.hobby.length;
	                const value = this.hobby[index];
	                index++;
	                return { value, done }
	            }
	        }
	    }
	}
	for (const key of obj) {
	    console.log(key); // 唱，跳，rap
	}
	```
---
### for of 遍历
* 注意
	* 不能遍历普通对象，因为没有遍历器
	* 可遍历 map对象，set数组，基本数组
```js
-------------------------数组-------------------------
let arr = ['唱', '跳', 'rap']
for (const key of arr) {    
    console.log(key);  // 唱
}                         跳
                          rap

-------------------------对象-------------------------
var obj = new Map();
obj.set("a", "苹果");
obj.set("b", "香蕉");
//           解构
for (let [key, value] of obj) {
    console.log(`${key} --- ${value}`);  // a --- 苹果
}										 // b --- 香蕉									    
```
---
### 生成器
* 生成器函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同
```js
function * gen(){
    yield '111';  // 通过yield将代码分成一段一段通过next执行
    yield '222';
    yield '333';
}
let iterator = gen();
console.log(iterator.next()); // {value: "111", done: false}
console.log(iterator.next()); // {value: "222", done: false}
console.log(iterator.next()); // {value: "333", done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

```js
function* iterator(arr) {
    for (const key of arr) {
        yield key
    }
}
let iter = iterator(['唱', '跳', 'rap'])
console.log(iter.next()); //{value: "唱", done: false}
console.log(iter.next()); //{value: "跳", done: false}
console.log(iter.next()); //{value: "rap", done: false}
console.log(iter.next()); //{value: undefined, done: true}
```
* **订单实例**
	```js
	function getUser() {
	    setTimeout(() => {
	        let data = '用户数据'
	        iterator.next(data)
	    }, 1000);
	}
	function getOrders() {
	    setTimeout(() => {
	        let data = '用户订单'
	        iterator.next(data)
	    }, 1000);
	}
	function getGoods() {
	    setTimeout(() => {
	        let data = '商品数据'
	        iterator.next(data)
	    }, 1000);
	}
	function* gen() {
	    let user = yield getUser();
	    console.log(user);   // 用户数据
	    let orders = yield getOrders();
	    console.log(orders); // 用户订单
	    let goods = yield getGoods();
	    console.log(goods);  // 商品数据
	}
	let iterator = gen();
	iterator.next();
	```
---
### 模块化 module
* **`优点`**
	* 防止命名冲突
	* 代码复用
	* 搞维护性

- **`注意`**
    - 未脚手架环境中引入：script标签加上  `type="module"`
    - import会被webpack提升至最上面执行

* **`export`**：导出【分别暴露，统一暴露，默认暴露】
	```js
	let info = "张三";
	let data = [1, 2, 3]
	
	// 1.default 添加是再引入文件import赋值变量
	export default { info };  // 输出单个对象
	// 2.不添加default关键字,import引入时候必须结构   二选一
	export { info, data };    // 输出多个对象
	```

* **`import`**：导入
```js
// 导入单个对象
import { info } from './js/data.js'
import info from './js/data.js'

// 导入多个对象
import { info, data } from './js/data.js'
```

* `* as` 导入全部
```html
<script type="module"> // type为必须
	 import * as obj from './data.js'  // 全部导入到obj中
	 console.log(obj); // call: (...)
					   // person: (...)
</script>
```
别名
```js
import { odd } from './odd'
import { odd as oodd } from './odd'
```


```js
export let person = {
    name: 'xian',
    age: 100
}

export function call() {
    console.log('go! go!');
}
```

* **`混合导入导出`**
```js
import React,{ Component } from './react'
new React.Component();  // 我是默认暴露的Component
new Component();        // 我是分别暴露的Component
```

```js
let React = {  }

React.Component = class Component {
    constructor() {
        console.log('我是默认暴露的Component');
    }
}
// 分别暴露
export class Component {
    constructor() {
        console.log('我是分别暴露的Component');
    }
}
// 默认暴露
export default React;
```
---
### 对象新特性
* **`对象冻结`**
	* 语法：`const obj = Object.freeze( { } )`
	```js
	const obj = Object.freeze({
			name: "张三",    // 可以赋值，之后不能被修改
	});
	obj.name = "李四";       // 不会报错，但不会赋值
	obj.age = 20;           // 不会报错，但不会赋值
	
	console.log(obj.name);  // "张三"
	console.log(obj.age);   // undefined
	```

* **`语法糖`**
	```js
	let a = 1,
	    b = 2;
	// --------- ES5 ---------
	var obj = {
	    a: a,
	    b: b,
	    add: function () {
	        return this.a + this.b
	    }
	}
	// --------- ES6 ---------
	// 值的变量名等于对象键名时，可省略值（对应值必须存在，否则报错）
	// 定义函数可省略 : function
	var obj = {
	    a,
	    b,
	    add() {
	        return this.a + this.b
	    }
	}
	```

* **`变量键`**（变量写在 [ ] 里）[ ] 里支持计算
	```js
	let n = 'name'
	let obj = {
	    [n]: '张三'
	}
	console.log(obj);  // {name: "张三"}
	obj.name;    // 张三
	obj[n];      // 张三
	obj."name";  // 语法错误，点后不能直接跟字符串
	obj["name"]; // 张三
	```

### Reflect反射
- 暂无
---
### 其他特性
* **关于严格模式**
    -   ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
    -   **避免限制**
        -   设定全局性的严格模式，是合法的
        -   把函数包在一个无参数的立即执行函数里面

* **立即执行函数**
```js
(() => console.log('立即执行'))();

(function () {
    console.log('立即执行');
})()
```

* **函数名称优先级**
```js
var add = function () {
}
console.log(add.name); // add

var add = function superadd() {
}
console.log(add.name); // superadd
// 总结:
// 这个就是函数优先级问题
// 函数内比函数外优先级高
```
---
## Class 类
- 注意点
	- 构造器里只能返回引用数据类型，返回基本数据类型贼转为返回实例对象，默认返回实例对象
---
### 创建类
* 注意
	* 类内部的方法会自动开启严格模式
* **ES5**
	```js
	function Demo(params) {
			// 同构造函数
	}
	Demo.prototype.info = function () { }  // 原型
	```

* **ES6**
	* 构造器不是必须的
	```js
	class Demo {
	    constructor(params) { 
	        // 构造函数
	    }
	    info() { }  // 原型
	}
	```
---
### 继承
* 注意
	* 只会继承原型方法，变量会自动放在构造函数内
	* 子类可以重写父类的方法
	* `super` 要在 `this` 赋值前面
	* 如果子类没有 `constructor` 则自动调用父组件的 `constructor`
```js
class Person {
    constructor(obj) {
        this.name = obj.name;
        this.age = obj.age
    }
    info() {
        console.log(`名字：${this.name}，年龄：${this.age}`);
    }
	asd = '测试'; // 原型内的变量自动放在构造函数内
}

class JO extends Person {
    constructor(obj) {
        super(obj)  // super为必须，哪怕不传参
        this.hobby = obj.hobby;
    }
}
let jo = new JO({
    name: '张三',
    age: 20,
    hobby: ['唱', '跳', 'rap']
});

jo.info() // 名字：张三，年龄：20
```
---
### 静态方法 / 属性
* 不需要实例化，直接使用
```js
class Person {
    static info(){
        console.log('静态方法，不需要new直接调用');
    }
	static name = 'xian';
}
Person.info();  // 静态方法，不需要new直接调用
console.log(Person.name); // xian
```
---
### 属性扩展 set get
* 可以做数据判断
-   `set` 添加数据
-   `get` 查询数据
```js
class Person {
    constructor() {
        this.eatFood = [];
    }
    set eat(data) {
        this.eatFood.push(data);
    }
    get eat() {
        return this.eatFood
    }
}
let p = new Person()
p.eat = '香蕉';     // 调用set 添加数据
p.eat = '苹果';
console.log(p.eat); // 调用get (2) ["香蕉", "苹果"]
```
---
### super
* 在类的方法中super就表示当前类的父类，如 super.say()
---
## 新内置对象
* set、map、promise
### set
* `功能`：存储值，且内容不能重复
```js
let s = new Set(["汉堡包", "薯条", "薯条"]);  // 不会重复
console.log(s);   // {"汉堡包", "薯条"} "object"
```
* `方法`
```js
let s = new Set(["汉堡包", "薯条"]);
// 添加
s.add('可乐')        // {"汉堡包", "薯条", "可乐"}
// 删除指定
s.delete('汉堡包')   // {"薯条", "可乐"}
// 删除全部
s.clear()   
// 是否包含
s.had(xxx)  // true / false
```
* **一些用法**
	* 去重并集
		```js
		arr1 = [1, 2];
		arr2 = [2, 3];
		let binji = [...new Set([...arr1, ...arr2])];
		```
	* 去重交集
		```js
		arr1 = [1, 2];
		arr2 = [2, 3];
		jiaoji = [...new Set(arr1.filter(_ => new Set(arr2).has(_)))]
		```
	* 差集
		```js
		arr1 = [1, 2];
		arr2 = [2, 3];
		// arr1和arr2的差集
		var chaji = arr1.filter(_ => !new Set(arr2).has(_)) 
		// arr2和arr1的差集
		var chaji = arr2.filter(_ => !new Set(arr1).has(_)) 
		```
---
### map
* `功能`：存储键值对，键和值可以是任何对象，重复则旧内容会被覆盖
```js
let map = new Map([
    ['name', '张三'],
    [function hobby() { }, ['唱', '跳', 'rap']]
])
console.log(map); // 0: {"name" => "张三"}
									   1: {function hobby() { } => Array(3)}
```
* `方法`
```js
// 添加
map.set('age', 20) // 0: {"name" => "张三"}
                      1: {function hobby() { } => Array(3)}
                      2: {"age" => 20}
// 删除
map.delete('age')  // 0: {"name" => "张三"}
                      1: {function hobby() { } => Array(3)}
// 清空集合，返回undefined
map.clear()         
// 是否包含
map.had(xxx)  // true / false
// 返回map集合元素个数
map.size
```
---
### Promise
* 前往详情：[[C1_Promis]]
---
### Proxy 代理
* 语法：`let p = new Proxy(target, handler);`
	* 注意：`handler` **不能** 设置为 `null` ，会抛出一个错误——`Cannot create proxy with a non-object as target or handler`！

* demo
	```js
	let p = new Proxy(obj, {
	    get(target, key, receiver) {  // 实例对象
	        return target[key];
	    },
	    set(target, key, value) {     // 赋予的值
	        target[key] = value;
	        return value
	    },
	})
	```

* API（handler下配置）
	* get方法
		```js
		let p = new Proxy({}, {
		    get(target, key, receiver) {
		        return receiver;
		    }
		})
		```
		-   **target**：指向代理的对象{ }
		-   **key**：指向键名
		-   **receiver**：指向实例对象
	- set方法

* [无操作转发代理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy#%E6%97%A0%E6%93%8D%E4%BD%9C%E8%BD%AC%E5%8F%91%E4%BB%A3%E7%90%86)
	```js
	let target = {};
	let p = new Proxy(target, {});
	p.a = 37;                 // 操作转发到目标
	console.log(target.a);    // 37. 操作已经被正确地转发
	```
---
### Error 异常
```js
if (prop === 'age') {
  if (!Number.isInteger(value)) {
    throw new TypeError('age不是数值型');
  }
  if (value > 200) {
    throw new RangeError('age似乎无效');
  }
}
```
---
# ES7
## 方法扩展
### 包含 includes【String】
* 返回值：true或false
-  判断**是否包含**指定字符串
    - **`str.includes(" ")`**
- 判断**开头**是否包含指定字符串
    - **`str.startsWith(" ")`**
- 判断**结尾**是否包含指定字符串
    - **`str.endsWith(" ")`**
---
### 包含 includes【Array】
```js
let arr = [1, 2, 3]
console.log(arr.includes(1));   // true
console.log(arr.includes(111)); // false
```
---
## 新特性
### 幂运算
```js
let numB = 2 ** 3;
let numA = Math.pow(2, 3);
console.log(numA); // 8
console.log(numB); // 8
```
---
# ES8
## Object 方法扩展
### 键组 keys
```js
let obj = {
	name: 'xian',
	age: 100,
}
console.log(Object.keys(obj));   // ["name", "age"]
```
---
### 值组 values
```js
let obj = {
	name: 'xian',
	age: 100,
}
console.log(Object.values(obj)); // ["xian", 100]
```
---
### 键值组 entries
* 将对象转为二维数组，可以用来创建Map，可以达成for of遍历对象（对象没有遍历器）
```js
let obj = {
	name: 'xian',
	age: 100,
}
console.log(Object.entries(obj)); // [ ["name", "xian"], ["age", 100] ]
```
---
### 对象描述 getOwnPropertyDescriptors
* 返回对象属性的描述对象
* 可用于克隆
```js
let obj = {         // age:
    name: 'xian',   //     configurable: true   是否可删除
    age: 100,       //     enumerable: true     是否可枚举
}                   //     value: 100
                    //     writable: true       是否可写
console.log(Object.getOwnPropertyDescriptors(obj)); 
```
---
## 新特性
### async 和 await
* 异步终极解决方案
* 前往详情：[[C1_Promis]]
---
# ES9
## 正则扩展
### 命名捕获分组 groups
* 对正则捕获的结果添加一个对象对应捕获的字符串，更易于后期维护
* 没有命名捕获分组前
	```js
	let str = '<a href="http://www.xian.com">法力无边</a>';
	const reg = /<a href="(.*)">(.*)<\/a>/;
	console.log(reg.exec(str)); // 一个数组，对应完整字符串和两个括号内容
	// ["<a href=\"http://www.xian.com\">法力无边</a>", 
	// "http://www.xian.com", 
	// "法力无边"]
	```
* **使用命名捕获**
	```js
	let str = '<a href="http://www.xian.com">法力无边</a>';
	const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/;
	console.log(reg.exec(str)); // 多一个属性 groups，其余不变
	reg.exec(str).groups;  // groups:{
	                       //   text: "法力无边"
	                       //   url: "http://www.xian.com"
	                       // }
	```
---
## 新特性
### 展开运算符升级
* **合并对象**
	* `data = {...data, ...obj}`
	* obj的属性和data属性重复时，obj覆盖data的属性
---
* **Rest参数**
	```js
	let p = {
	    name: '张三',
	    age: 100,
	    hobby: '唱，跳，rap',
	}
	demo(p);
	function demo({ name, ...other }) {
	    console.log(name);  // 张三
	    console.log(other); // {age: 100, hobby: "唱，跳，rap"}
	}
	```
---
### for await of
* 遍历 **promise** 数组，当前结果为 resolve 时，执行下一个 promise 对象的 resolve方法，期间并不会进行阻塞
* 适用于根据多个id请求多个数据，且按顺序返回（请求不会阻塞，所以会很快）
	```js
	function pro(time) {
	    return new Promise((resolve, reject) => {
	        setTimeout(() => {
	            resolve(time)
	        }, time)
	    })
	}
	
	let arr = [pro(2000), pro(1000), pro(3000)]
	
	async function test() {
	    for await (const res of arr) {   // res 为成功时返回的结果
	        console.log(res)             // 2000,1000,3000
	    }
	}
	test()
	```
---

### 反向断言
* [详情](https://www.bilibili.com/video/BV1uK411H7on?p=56&spm_id_from=pageDriver)
---
### dotAll
* [详情](https://www.bilibili.com/video/BV1uK411H7on?p=57&spm_id_from=pageDriver)
---
# ES10
## 扩展方法
### fromEntries【Object】
* **二维数组转对象**，Entries的逆向操作
	```js
	let arr = [
	    ['name', '张三'],
	    ['age', '123'],
	]
	let obj = Object.fromEntries(arr)
	console.log(obj); // {name: "张三", age: "123"}
	```
* **Map转普通对象**
	```js
	let map = new Map();
	map.set('name', '张三');
	map.set('age', 123);
	
	let obj = Object.fromEntries(map);
	console.log(obj); // {name: "张三", age: 123}
	```
---
### trimStart【String】
* 清楚开头空格
	```js
	let str = '    xian    '
	console.log(str.trimStart());  // 'xian    '
	```

### trimEnd【String】
* 清楚末尾空格
	```js
	let str = '    xian    '
	console.log(str.trimEnd());  // '    xian'
	```
---
### flat 降维【Array】
* **将二维数组降为一维数组**
```js
let arr = [1, 2, [3, 4]];
arr.flat()  // [1, 2, 3, 4] 【默认flat(1)】
```
* **自定义降维**
```js
let arr = [0, [1, [2, [3, [4, [5, [6]]]]]]]
arr.flat(5) // [0, 1, 2, 3, 4, 5, [6]]
```

### flatMap【Array】
* 如果Map返回的是一个数组，则打平数组
```js
let arrA = [[1], [2], [3, 4]]
var arrB = arrA.map(_ => _);     // [[1], [2], [3, 4]]
var arrB = arrA.flatMap(_ => _); // [1, 2, 3, 4]
console.log(arrB);
```
---
### description【Symbol】
* 获取Symbol变量的标识字符串
```js
let person = Symbol('张三');
console.log(person.description); // 张三
```
---
# ES11
## 扩展方法
### allSettled【Promise】
* `始终返回成功`的Promise对象，结果为传入的Promise数组返回的结果数组
```js
function getUser() {
    return new Promise((res, rej) => {
        res('小红')
    })
}
function getGoods() {  
    return new Promise((res, rej) => {
        rej('出错啦!')
    })
}                                // 传入Promise数组
const result = Promise.allSettled([getUser(), getGoods()]);
// PromiseResult：0: {status: "fulfilled", value: "小红"}
//                1: {status: "rejected", reason: "出错啦!"}
```
---
### matchAll【正则】
* **[批量提取](https://www.bilibili.com/video/BV1uK411H7on?p=64&spm_id_from=pageDriver)**
---
## 新特性
### 对象私有属性 (#)
* 使用#标识的属性为私有属性，外部无法直接获取，只能在类内部使用
```js
class Person {
    name;
    #age;
    constructor(name, age) {
        this.name = name;
        this.#age = age;
    }
    showAge(){
        console.log(this.#age);
    }
}

let xiaohong = new Person('小红', 123);
console.log(xiaohong);      // {name: "小红", #age: 123}
console.log(xiaohong.name); // 小红
console.log(xiaohong.#age); // 报错，私有属性不能被外部直接访问
xiaohong.showAge();         // 123
```
---
### 可选链操作符 ?.
* `?`相当于一个判断符，如果前面的有，就进入下一层级
```js
let obj = {}
// console.log(obj.msg.name);   // 报错
console.log(obj?.msg?.name);    // undefined
console.log(obj?.getData?.());  // undefined
```
* 表达式在 `??` 的左侧 运算符求值为`undefined`或`null`，返回其右侧。
```js
let obj = {
    name: '小红',
    flag: false,
}
let name = obj.name ?? '无名';
let flag = obj.flag ?? '这是一个flag';

console.log(name);  // 小红
console.log(flag);  // false【false为返回左边的值】
```
---
### 动态 import
* 按需加载`import`，相当于`import`懒加载，能够提高性能
	* 返回一个`Promise`对象，导入的结果在`PromiseResult`里
	```js
	setTimeout(() => {
	    import('./hello.js').then(res => {
	        res.hello(); // 你好
	    })
	}, 1000);
	```
---
### 数据类型 BigInt
* 大整形，在普通整形后加个n，`let num = 123n`。
* **注意点**
	* 不能传入浮点数
	* BigInt类型的数据必须和BigInt类型的数据运算
* **声明**
	```js
	// 字面量声明
	let num = 123n;
	console.log(num, typeof num);  // 123n "bigint"
	
	// 函数声明 
	let sum = 456;
	sum = BigInt(sum);
	console.log(sum, typeof sum);  // 456n "bigint"
	```
* **demo**
```js
let max = Number.MAX_SAFE_INTEGER;
console.log(max);      // 9007199254740991
console.log(max + 1);  // 9007199254740992
console.log(max + 2);  // 9007199254740992【超出最大值，无法继续相加】

console.log(BigInt(max));             // 9007199254740991n
console.log(BigInt(max) + BigInt(1)); // 9007199254740992n
console.log(BigInt(max) + BigInt(2)); // 9007199254740993n
```
---
### 全局属性 globalThis
* 不管在什么环境，始终指向全局对象
	* 在浏览器中， `globalThis`始终指向`Window`
	* 在node.js中，`globalThis`始终指向`glabal`
```js
console.log(globalThis); // Window
```
---
# ES12
##  扩展方法
### 替换全部 replaceAll 【String】
```js
let str = 'aaa小明aaaa';
str = str.replaceAll('a','')
console.log(str); // 小明
```
---
### any【Promise】
* 与 `Promise.all()` 正好相反
* 接收一个Promise可迭代对象，只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise` 。如果可迭代对象中没有一个 `promise` 成功（即所有的 `promises` 都失败/拒绝），就返回一个失败的 `promise`
```js
function getUser() {
    return new Promise((res, rej) => {
        rej('获取用户失败')
    })
}
function getGoods() {
    return new Promise((res, rej) => {
        res('商品')
    })
}
Promise.any([getUser(), getGoods()]).then(res => {
    console.log(res); // 商品
})
```
---
## 新特性
### 数字分隔符
* 可以在数字之间创建可视化分隔符，通过 `_` 下划线来分割数字，使数字更具可读性
	```js
	const money = 1_000_000_000;
	// 等价于
	const money = 1000000000;
	```
---
### 逻辑赋值运算符
* 可以用来设置默认值
	```js
	a ||= b  // （a有值时忽略，a无值时a=b）
	//等价于
	a = a || (a = b)
	
	a &&= b
	//等价于
	a = a && (a = b)
	
	a ??= b
	//等价于
	a = a ?? (a = b)
	```
---
### 赋值运算符
* 逻辑AND `&&=` ：如果左操作数为真，将右操作数分配给左操作数
	```js
	let obj = {
	    name: '小红'
	}
	// 旧写法
	if (obj.name) {
	    obj.name = '小明'
	}
	console.log(obj);  // 小明
	// 新写法
	obj.name &&= '张三';
	console.log(obj);  // 张三
	```
---
* 空合并 `??=` ：如果左操作数为假，将右操作数分配给左操作数
```js
let obj = {};
obj.name ??= '张三';
console.log(obj); // 张三
```
---
### WeakRef
* [详情](https://juejin.cn/post/7019996264355856420)

---
