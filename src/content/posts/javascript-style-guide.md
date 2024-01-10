---
title: JavaScript样式风格指南
description: 一个JavaScript的代码书写风格指导
duration: 30分钟
publishDate: 2022-01-01
updatedDate: 2023-01-08
heroImage: /images/blog-placeholder-3.jpg
authors: Avenue-opposites
---

## 前言

本文是一个JavaScript的代码书写风格指导，主要参考了[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)和[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)，并结合自己的一些想法，总结出来的一套JavaScript代码书写风格指导。

### 为什么要有代码风格指导？

- 代码风格指导可以让代码更加统一，便于阅读和维护。
- 代码风格指导可以让代码更加规范，便于团队协作。
- 代码风格指导可以让代码更加优雅，便于提高开发效率。

## JavaScript数据类型

### 基本数据类型

- `undefined`：未定义
- `null`：空值
- `boolean`：布尔值
- `number`：数字
- `string`：字符串
- `symbol`：符号
- `bigint`：大整数

当使用基本数据类型时，可以直接操作其值。

```javascript
const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9
```

### 引用数据类型

- `object`：对象
- `array`：数组
- `function`：函数

当使用引用数据类型时，操作的是其引用。

```javascript
const foo = [1, 2];
const bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
```

## 命名

使用同一风格的命名可以让代码更加统一，便于阅读和维护。

### 变量和函数

- 使用驼峰命名法

```javascript
// bad
const foo_bar = 1;

// good
const fooBar = 1;
```

- 使用有意义的名称

```javascript
// bad

// 什么是a？
function a() {
  // ...
}

// good
function sum() {
  // ...
}
```

- 使用易于搜索的名称

```javascript
// bad
// 什么是86400000？
setTimeout(blastOff, 86400000);

// good
// 使用常量
const MILLISECONDS_IN_A_DAY = 86400000;
setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```

- 使用一致的命名规则

```javascript
// bad
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

// good
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
```

### 常量

- 使用大写字母和下划线命名

```javascript
// bad
const fooBar = 1;

// good
const FOO_BAR = 1;
```

### 类和构造函数

- 使用帕斯卡命名法

```javascript
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```

## 声明

使用const声明常量和let声明变量，不要使用var。

### 使用const声明常量

```javascript
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;
```

### 使用let声明变量

如果必须重新指定引用，请使用 let 代替 var。 eslint: [`no-var`](https://eslint.org/docs/rules/no-var.html)

```javascript
// bad
var count = 1;
if (condition) {
  count += 1;
}

// good
let count = 1;
if (condition) {
  count += 1;
}
```

### 块级作用域

- 使用const和let声明的变量和常量具有块级作用域

```javascript
{
  let a = 1;
  const b = 1;
  var c = 1;
}

console.log(a); // 引用错误
console.log(b); // 引用错误
console.log(c); // 1
```

### 暂时性死区

- 使用const和let声明的变量和常量具有暂时性死区, 在声明之前引用会报错

```javascript
console.log(a); // 引用错误
console.log(b); // 引用错误

let a = 1;
const b = 1;
```

### 不要重复声明

- 不要重复声明变量和常量

```javascript
// bad
let a = 1;
let a = 2;
const b = 1;
const b = 2;

// good
let a = 1;
a = 2;
const b = 1;
```

## 变量

### 不要链接变量赋值

> 为什么？链接变量赋值会创建隐式全局变量。

```javascript
// bad
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // The let keyword only applies to variable a; variables b and c become
  // global variables.
  let a = b = c = 1;
}());

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError

// the same applies for `const`
```

### 避免使用一元递增和递减

> 为什么？根据 eslint 文档，一元递增和递减语句需要自动插入分号，并且可能会导致应用程序中值递增或递减的静默错误。用 而不是 num++ 或 num ++ 等 num += 1 语句改变您的值也更具表现力。不允许一元递增和递减语句还可以防止无意中预递增/预递减值，这也可能导致程序中出现意外行为。

```javascript
// bad
const array = [1, 2, 3];
let num = 1;
num++;
--num;

let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}

// good
const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;

const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```

### 使用括号避免赋值违反max-len的规则

> 为什么？周围的 = 换行符可能会混淆工作分配的值。。

```javascript
// bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();

// bad
const foo
  = 'superLongLongLongLongLongLongLongLongString';

// good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);

// good
const foo = 'superLongLongLongLongLongLongLongLongString';
```

## 提升

### var声明提升

> 为什么？var声明会提升到其作用域的顶部，这可能会导致意外的结果（特别是对于初学者）。

```javascript
// 当var声明在函数里时，它会被提升到函数的顶部
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// 但是let声明不会被提升到块的顶部
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}
```

### 函数声明提升

> 为什么？函数声明会提升到其作用域的顶部，这可能会导致意外的结果（特别是对于初学者）。

```javascript
// 函数声明提升
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}

// 函数表达式不会提升
function example() {
  superPower(); // => TypeError: superPower is not a function

  const superPower = function () {
    console.log('Flying');
  };
}
```

### 变量、类和函数在使用之前应先定义

> 为什么？当变量、类或函数在使用之前被声明时，它可能会损害可读性，因为读者不会知道引用的东西是什么。对于读者来说，在遇到事物的使用之前，首先遇到事物的源代码（无论是从另一个模块导入的，还是在文件中定义的）要清楚得多。

```javascript
console.log(a); 
var a = 10;

fun();
function fun() {}

new A();
class A {
}

console.log(a); 
console.log(b); 
let a = 10;
const b = 5;


// good
var a = 10;
console.log(a); // 10

function fun() {}
fun();

class A {
}
new A();

let a = 10;
const b = 5;
console.log(a); // 10
console.log(b); // 5
```


## 比较运算符和等号

### 使用===和!==代替==和!=

> 为什么？==和!=会进行类型转换，===和!==不会进行类型转换。

```javascript
// bad
if (a == b) {
  // ...
}

// good
if (a === b) {
  // ...
}

// bad
if (a != b) {
  // ...
}

// good
if (a !== b) {
  // ...
}
```

### 条件语句会自动进行类型转换

> 为什么？当使用非布尔值作为条件语句时，会自动进行类型转换。

- 对象会转换为true
- undefined会转换为false
- null会转换为false
- 数字0、NaN会转换为false
- 空字符串会转换为false

### 使用switch时使用代码块和break

> 为什么？switch语句会自动进行类型转换，使用代码块和break可以避免意外的结果。

```javascript
// bad
switch (foo) {
  case 1:
    doSomething();
  case 2:
    doSomething();
  default:
    doSomething();
}

// good
switch (foo) {
  case 1: {
    doSomething();
    break;
  }
  case 2: {
    doSomething();
    break;
  }
  default: {
    doSomething();
  }
}
```

### 三元不应嵌套，一般为单行表达式

> 为什么？三元表达式本身就是一种简洁的语法，嵌套会导致代码难以阅读。

```javascript
// bad
// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// split into 2 separated ternary expressions
const maybeNull = value1 > value2 ? 'baz' : null;

// better
const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
```

## 避免不必要的三元表达式

> 为什么？虽然三元表达式可以节省代码，但是如果过度使用，会导致代码难以阅读。

```javascript
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;
const quux = a != null ? a : b;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
const quux = a ?? b;
```

### 将多个表达式使用括号包裹

> 为什么？这样更容易阅读。

```javascript
// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;

// bad
const bar = a ** b - 5 % d;

// bad
// one may be confused into thinking (a || b) && c
if (a || b && c) {
  return d;
}

// bad
const bar = a + b / c * d;

// good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

// good
const bar = a ** b - (5 % d);

// good
if (a || (b && c)) {
  return d;
}

// good
const bar = a + (b / c) * d;

// good
const bar = a + b / (c * d);
```

## 对象

### 使用字面量创建对象

```javascript
// bad
const obj = new Object();

// good
const obj = {};
```

### 创建动态属性时使用计算属性名

```javascript
function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```

### 使用对象方法简写

> 为什么？这样更短更具有描述性。

```javascript
// bad
const obj = {
  foo: function() {
    // ...
  },
  bar: function() {
    // ...
  },
};

// good
const obj = {
  foo() {
    // ...
  },
  bar() {
    // ...
  },
};
```

### 使用属性值简写

```javascript
const foo = 1;
const bar = 2;

// bad
const obj = {
  foo: foo,
  bar: bar,
};

// good
const obj = {
  foo,
  bar,
};
```

### 对简写的属性值进行分组

> 为什么？这样更容易看清楚哪些属性使用了简写。

```javascript
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

### 只对无效的标识符使用引号

这样做可以提高可读性，并且更容易被压缩。

> 为什么？一般来说，我们认为它在主观上更容易阅读。它改进了语法突出显示，并且也更容易被许多JS引擎优化。

```javascript
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

### 不要直接调用Object.prototype的方法

> 为什么？这些方法可能会被相关对象上的属性遮蔽 - 考虑 { hasOwnProperty: false } - 或者，对象可能是空对象 （ Object.create(null) ）。在这两种情况下，这将导致一个错误。

```javascript
const obj = {};

// bad
console.log(obj.hasOwnProperty(key)); // 可能被覆盖

// good
console.log(Object.prototype.hasOwnProperty.call(obj, key)); // 使用call方法

// best
const has = Object.prototype.hasOwnProperty; // 在模块范围内缓存查找
console.log(has.call(obj, key));
```

### 使用对象扩展运算符代替Object.assign进行浅拷贝

> 为什么？这样更容易创建浅拷贝。并且，这不会改变原始对象，这可能会在其他地方引起问题。

```javascript
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // 这会改变`original`对象
console.log(original); // => { a: 1, b: 2, c: 3 }

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // 将`original`对象浅拷贝到一个空对象中

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // 使用对象扩展运算符进行浅拷贝
```

## 数组

### 使用字面量创建数组

```javascript
// bad
const items = new Array();

// good
const items = [];
```

### 使用Array.push代替直接赋值


```javascript
const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

### 使用...(扩展运算符)复制数组

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

### 使用...将可迭代对象转换为数组

```javascript
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

### 使用Array.from将类数组转换为数组

```javascript
const arrayLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// bad
const arr = Array.prototype.slice.call(arrayLike);

// good
const arr = Array.from(arrayLike);
```

### 在数组方法的回调函数中使用return语句

如果函数体由返回没有副作用的表达式的单个语句组成，则可以省略返回值。否则，必须使用return语句。

> 为什么？因为这样更加简洁。

```javascript
// bad - 没有返回值，所以返回undefined
[1, 2, 3].map((x) => {
  const y = x + 1;
});

// good
[1, 2, 3].map((x) => x + 1);

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

### 数组的格式化

如果数组有多行，则在打开数组括号后和关闭（关闭）数组括号之前使用换行符

```javascript
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```

## 解构

### 在访问和使用对象的多个属性时使用对象解构

> 为什么？解构可避免为这些属性创建临时引用，也无需重复访问对象。重复对象访问会创建更多重复代码，需要更多的读取，并创造更多的错误机会。解构对象还提供了定义块中使用的对象结构的单个站点，而不是需要读取整个块来确定使用的内容。

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

### 使用数组解构

```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

### 使用对象解构

对多个返回值使用对象解构，而不是数组解构。

> 为什么？增加属性或者改变排序不会改变调用时的位置。

```javascript
// bad
function processInput(input) {
  // 然后就是一大堆逻辑
  return [left, right, top, bottom];
}

// 调用时需要考虑返回值的顺序
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // 然后就是一大堆逻辑
  return { left, right, top, bottom };
}

// 调用时只选择需要的数据
const { left, top } = processInput(input);
```

## 字符串

### 使用单引号

> 为什么？一般来说，我们认为它在主观上更容易阅读。它改进了语法突出显示，并且也更容易被许多JS引擎优化。主要是可以减少Shift键的使用。

```javascript
// bad
const name = "Capt. Janeway";

// bad - 模板文字应该包含插值或换行
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';
```

### 使用模板字符串代替字符串拼接

> 为什么？模板字符串更具可读性，更简洁。

```javascript
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

### 不要在字符串中使用eval

> 为什么？eval()是一个潜在的安全风险，并且会降低性能。

```javascript
// bad
eval('某些代码');
```

### 不要在字符串中使用无意义的转义字符

> 为什么？反斜杠增加了视觉复杂性，使代码难以阅读，因此应该只在必要时使用。

```javascript
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

## 函数

### 使用函数声明代替函数表达式

> 为什么？函数声明是具名的，所以它们在调用堆栈中更容易识别。另外，函数声明会在执行代码之前进行预升级，所以它们在整个脚本中都是可用的。

```javascript
// bad
const foo = function () {
  // ...
};

// good
function foo() {
  // ...
}
```

### 将立即调用的函数表达式包裹在括号中

> 为什么？立即调用的函数表达式是单个单元 - 包裹它们，使这显而易见。

```javascript
// immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());
```

### 不要在非函数块（if、while等）中声明函数

> 为什么？浏览器会允许你这样做，但是它们的解析表现不一致，这是一个坏消息。你可以使用命名函数表达式来达到相同的结果，但是更好的方式是将函数分配给一个函数声明。

```javascript
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

### 不要使用arguments作为参数名

> 为什么？arguments是函数的一个特殊变量,它是一个类数组对象，包含了函数调用时传入的所有参数。

```javascript
// bad
function foo(name, options, arguments) {
  // ...
}

// good
function foo(name, options, args) {
  // ...
}
```

### 不使用arguments而是使用剩余参数代替

> 为什么？剩余参数更简洁，不会导致类数组对象的额外参数。此外，剩余参数是一个真正的数组，而不是一个类数组对象，所以你可以调用数组上的方法，如sort、map、reduce、filter等。

```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

### 使用默认参数语法而不是改变函数参数

```javascript
// really bad
function handleThings(opts) {
  // 不！我们不应该改变函数参数。
  // 更加糟糕: 如果参数 opts 是 false 的话，它就会被设定为一个对象。
  // 但这样的写法会造成一些 Bugs。
  // （译注：参考下方的代码）
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

### 使用默认参数语法避免副作用

> 为什么？他们是隐式的，所以当你不传入参数时，它们不会被执行。并且，你可以在不与 undefined 混淆的情况下清除参数。

```javascript
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}

count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```

### 将默认参数放在最后

```javascript
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

### 不要使用Function构造函数创建函数

> 为什么？这种方法会将传入的字符串参数解析为代码，并且会在全局作用域中运行。这会导致非常不好的性能和安全问题。

```javascript
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');
```

### 函数签名中的间距

> 为什么？一致性是好的，而且这样看起来更清晰。

```javascript
// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a() {};
```

### 不要改变函数参数

> 为什么？操作对象参数会对原始调用者产生副作用。

```javascript
// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}
```

### 不用重新分配参数

> 为什么？重新分配参数会导致意外的行为，特别是当访问 `arguments` 对象时。它还可能导致优化问题，尤其是在V8中。

```javascript
// bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}

// good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}
```

### 使用扩展运算符调用可变参数函数

```javascript
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);
```

### 当有多个参数时应该换行

> 为什么？由于有多个参数，所以换行会更加清晰。

```javascript
// bad
function foo(bar,
             baz,
             quux) {
  // ...
}

// good
function foo(
  bar,
  baz,
  quux,
) {
  // ...
}

// bad
console.log(foo,
  bar,
  baz);

// good
console.log(
  foo,
  bar,
  baz,
);
```

## 箭头函数

### 当函数体只有一行时省略花括号

> 为什么？语法糖。当只有一行时，省略花括号可以使代码更加简洁。

```javascript
// bad
const add = (a, b) => {
  return a + b;
};

// good
const add = (a, b) => a + b;

// good
const fn = (a,b) => {
  const c = a * b;
  return a + c;
};

// 如果返回的是一个对象，需要使用括号包裹
const fn = (a,b) => ({a,b});
```

### 当参数只有一个时省略括号

> 为什么？语法糖。当只有一个参数时，省略括号可以使代码更加简洁。

```javascript
// bad
const mul = (x) => x * x;

// good
const mul = x => x * x;

//如果该参数需要解构，需要使用括号包裹
const mul = ({x,y}) => x * y;
```

### 当使用匿名(回调)函数时,使用箭头函数代替

> 为什么？因为箭头函数创造了新的一个this执行环境，所以不需要使用bind()方法或者that = this语句来获取外部的this。

```javascript
// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map(x =>  x * x);
```

### 如果表达式跨越多行,使用括号包裹

> 为什么？它清楚地显示了函数的开始和结束位置。

```javascript
// bad
['get', 'post', 'put'].map(httpMethod =>
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
);

// good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
));
```

## 类和构造函数

### 使用class

> 为什么？class是一个更简洁、更容易理解的创建对象的方法。

```javascript
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}

Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

### 使用extends继承

> 为什么？extends是一个更简洁、更容易理解的继承方法。

```javascript
// bad
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}

PeekableQueue.prototype = new Queue();

PeekableQueue.prototype.peek = function () {
  return this.queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

### 方法链式调用

> 为什么？这样可以使代码更加简洁。

```javascript
// bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);
```

### 使用链式调用时，每个方法在单独一行

> 为什么？这样可以使代码更加清晰。

```javascript
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();
``` 

### 重写toString()方法

> 为什么？编写自定义 toString() 方法没关系，只要确保它成功运行并且不会产生副作用即可。

```javascript
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```

### 避免重复的类成员

> 为什么？重复的类成员会导致代码冗余。

```javascript
// bad
class Foo {
  bar() { return 1; }
  bar() { return 2; }
}

// good
class Foo {
  bar() { return 1; }
}

// good
class Foo {
  bar() { return 2; }
}
```

### 没有使用this的类方法应该是静态的

> 为什么？静态方法更容易理解，因为它们不依赖于类的实例。当你的类方法不使用this时，你应该将它们写成静态方法。

```javascript
// bad
class Foo {
  bar() {
    console.log('bar');
  }
}

// good
class Foo {
  static bar() {
    console.log('bar');
  }
}
```

## 模块

### 始终使用模块（ import / export ）而不是非标准模块系统。

> 为什么？模块是未来，让我们开始使用未来的特性。

```javascript
// bad
const StyleGuide = require('./StyleGuide');
module.exports = StyleGuide.es6;

// good
import StyleGuide from './StyleGuide';
export default StyleGuide.es6;

// best
import { es6 } from './StyleGuide';
export default es6;
```

### 不要使用通配符导入

> 为什么？这样可以确保只有一个默认导出。

```javascript
// bad
import * as StyleGuide from './StyleGuide';

// good
import StyleGuide from './StyleGuide';
```

### 仅从一个位置的路径导入

> 为什么？非常重要的是，有一个清晰的路径，这样可以快速定位到导入的文件。

```javascript
// bad
import foo from '../foo';
// … some other imports … //
import { named1, named2 } from '../foo';

// good
import foo, { named1, named2 } from '../foo';

// good
import foo, {
  named1,
  named2,
} from '../foo';
```

### 不要导出可变的绑定

> 为什么？通常应该避免变量的可变性，但是如果你导出一个可变的绑定，它的使用者可能会改变它的值。

```javascript
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };
```

### 在只有一个导出时使用默认导出

> 为什么？为了鼓励更多的文件只有一个导出，这样可以提高可读性，并且有一个一致的 API。

```javascript
// bad
export function foo() {}

// good
export default function foo() {}
```

### 将所有的导入放在非导入语句之前

> 为什么？因为import是静态的，把它们放在顶部可以更好地看到文件的依赖关系。

```javascript
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
```

### 多行导入应该像多行数组和对象文字一样缩进

> 为什么？花括号的缩进方式可以清楚地看到每个导入的项目。

```javascript
// bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

// good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} from 'path';
```
## 迭代器和生成器

### 不要使用迭代器。使用JavaScript的高阶函数代替for-in或者for-of

> 为什么？这加强了我们不可变的规则。处理纯函数的返回值更容易。

```javascript
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best (keeping it functional)
const increasedByOne = numbers.map((num) => num + 1);
```

### 尽量不要使用生成器

> 为什么？生成器不能被编译到ES5，会导致代码不能运行。

## 属性

### 使用点符号访问属性

```javascript
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

### 使用变量访问属性

```javascript
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```

### 计算幂时使用幂运算符

```javascript
// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;
```