

## useState 简单实现和原理浅谈

### 语法

```jsx
const [obj, setObj] = useState(?initialvalue); 
// obj 可以为任何数据结构
// 只有在初始化的时候用到，类似class组件中的this.state = initialvalue;
```

含义：声明一个叫 `obj` 的 `state` 变量，且声明一个 `setObj` 去改变这个变量。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。

按照含义，三步实现一个简单的 `useState`:

```jsx
function useState(initialvalue) {
  let obj = initialvalue;
  function setObj(value;) {
    obj = value;
  }
	return [obj, setObj];
}
function State() {
	const [, reRender] = React.useState();
	const [data, setData] = useState(0);
	console.log('data', data);
	return (
		<div>
			<p>模拟state - data1：{data}</p>
      <Button onClick={() => {
          setData(data + 1);
          reRender({});
      }}>
        setData++
      </Button>
		</div>
	);
}
```
结果：`data` 输出都是0，每次函数从新执行相当于useState重新执行， 每次a都会被赋值为initialvalue。那么如何让useState重新执行或者重新set时能记住上次的值？**全局变量**， 把变量提到useState函数外层。
第二版：
```jsx
let cache;
function useState(initialvalue) {
  cache = cache || initialvalue;
  function setObj(value;) {
    cache = value;
  }
	return [cache, setObj];
}
// 调用 
...
```
😀，好像成功了，能及时更新成功。
但是`react useState`在函数组件中可以多次调用，这个版本cache职能缓存最后一次调用useState的值。着里我们自然想到应该根据索引存入堆栈中。

```jsx
let _cache = [];
let index = 0;
function useState(init) {
  _cache[index] = _cache[index] || init;
  const cacheIndex = index; // 缓存index
  function setState(newState) {
    _cache[cacheIndex] = newState;
    console.log("useState", _cache, cacheIndex, index);
    index = 0;  // 每次render前useState函数都需重新调用，index也已经被缓存，所以在调用完setState需要将索引归为初始值。
  }
  return [_cache[index++], setState];
}
```

到这里简易的useState实现差不多， 但防止不同组件之间的命名冲突，使在不同组件之间有独立的作用域。

当然， 官方实现肯定不是这么简单，方式肯定也不同。  

下面分析一下官方hook 的实现方式：

>  首先，需要掌握hook的一些特点

- 初次渲染时初始状态会被创建。
- `update`时react会记住hook的状态（上面的例子也简单说明为什么需要记住）。
- react在渲染hook组件时，会按照hook的书写顺序去渲染状态。





## useEffect 简单实现和原理浅谈





## memoization 函数是如何提升性能的















[not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

[how-do-react-hooks-really-work](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)

[how-do-react-hooks-really-work 译文](https://zhuanlan.zhihu.com/p/81528320)

https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8