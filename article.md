## react-use

## ➡ React 组件的发展
### 1. 功能（无状态）组件   Functional (Stateless) Component

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 2. 类（有状态）组件   Class (Stateful) Component
```jsx
class Welcome extends React.Component {
	state = {
		name: ‘tori’,
	}
  componentDidMount() {
		fetch(…);
		…
	}
  render() {
    return (
		<>
			<h1>Hello, {this.state.name}</h1>
			<button onClick={() => this.setState({name: ‘007’})}>改名</button>
		</>
	  );
  }
}
```

### 3. 渲染组件 Presentational Component
```jsx
const Hello = (props) => {
  return (
    <div>
      <h1>Hello! {props.name}</h1>
    </div>
  )
}
```
> 
### 📢 总结： 
* 函数组件一定是无状态组件，展示型组件一般是无状态组件；
* 类组件既可以是有状态组件，又可以是无状态组件；
* 容器型组件一般是有状态组件。
* 划分的原则概括为： *分而治之、高内聚、低耦合*；
> 通过以上组件之间的组合一般能实现所有的也无需求。

### 4. Higher order components (HOC) 高阶组件

> HOC 主要是抽离状态，将重复的受控组件的逻辑抽离到高阶组件中，以新的props传给受控组件中，高阶组件中可以操作props传入受控组件。
> 常见的高阶组件：Redux的connect， react-router的withRouter等等。
```jsx
Class HocFactory extends React.Component {
	constructor(props) {
		super(props)
	}
	// 操作props
	…
	render() {
		const newProps = {…};
		return (Component) => <Component {…newProps} />;
	}
} 

Const Authorized = (Component) => (permission) => {
	return Class Authorized extends React.Component {
		…
		render() {
			const isAuth = ‘’;
			return isAuth ? <Component /> : <NoMatch />;
		}
	}
}


import { bindActionCreators } from ‘redux’;
import { connect } from ‘react-redux';

// 所有页面action集合
import * as actions from './actions';

// 缓存actions, 避免render重新加载
let cachedActions;

// action通过bindActionCreators绑定dispatch,
const bindActions = (dispatch, ownProps) => {
  if (!cachedActions) {
    cachedActions = {
      dispatch,
      actions: bindActionCreators(actions, dispatch),
    };
  }

  return cachedActions;
};

const connectWithActions = (mapStateToProps: MapStateToProps, mergeProps, options) => (
  component,
) => connect(mapStateToProps, bindActions, mergeProps, options)(component);

export default connectWithActions;

// 类似还有 log中间件 样子的等等。
```

#### HOC的不足
* 可以发现HOC产生了许多无用的组件，加深了组件层级，性能和调试受影响。
* 多个HOC 同时嵌套，劫持props， 命名可能会冲突，且内部无法判断Props是来源于那个HOC。

### 5. Render Props
> *Render Props 你可以把它理解成 JavaScript 中的回调函数*
```jsx
// 实现一个控制modal visible的高阶组件
class ToggleVisible extends React.Component {
	state = {
		visible: false
	};
	toggle = () => {
		this.setState({visible: !this.state.visible});
	}
	render() {
		return (
			<>{this.props.children({visible, toggle})}</>
		);
	}
}
//使用
const EditUser = () => (
	<ToggleVisible>
		{({visible, toggle}) => (<>
			<Modal visible={visible}/>
			<Button onClick={toggle}>打开/关闭modal</Button>
		</>)}
	</ToggleVisible>
)
```

#### 📢 优点
* 组件复用不会产生多余的嵌套。
* 不用担心props命名问题。

### 6. 组合式组件（Compound Component）
子组件所需要的props在父组件会封装好，引用子组件的时候就没必要传递所有props了。组合组件核心的两个方法是React.Children.map和React.cloneElement。
> [参考文章](https://mp.weixin.qq.com/s/3mdP7ulz_mfDPTpUUFlBNA)

```jsx
class GroupButton extends React.PureComponent {
  state = {
    activeIndex: 0
  };
  render() {
    return (
      <>
        {React.Children.map(this.props.children, (child, index) =>
          child.type
            ? React.cloneElement(child, {
                active: this.state.activeIndex === index,
                onClick: () => {
                  this.setState({ activeIndex: index });
                  this.props.onChange(child.props.value);
                }
              })
            : child
        )}
      </>
    );
  }
}
// 用法
<GroupButton
  onChange={e => {
    console.log(“onChange”, e);
  }}
>
  <Button value="red">red</Button>
  <Button value="yellow">yellow</Button>
  <Button value=“blue”>blue</Button>
  <Button value="white">white</Button>
</GroupButton>


```

🙊 废话正式结束，开始进入正题。。。

## 👍 React hooks
*解决了哪些问题？*
* 避免地狱式嵌套，可读性提高。
* 函数式组件，比class更容易理解。
* 生命周期太多太复杂。
* 解决HOC和Render Props的缺点。
* UI 和 逻辑更容易分离。

#### useState
*useState* 
>  📢 函数组件有状态了
[DEMO1](https://codesandbox.io/s/shy-river-qy4ey)
```jsx
function Example() {
  const [count, setCount] = useState(0);
	const [obj, setData] = useState({});
	const [show, setShow] = useState(false);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

#### useEffect
> 📢 忘记生命周期，记住副作用
[*DEMO2*](https://codesandbox.io/s/reverent-kepler-f6bgg)
```jsx
function Hook2() {
  const [data, setData] = useState();
  useEffect(() => {
    console.log("useEffect");
  });
  return (
    <div>
      {(() => {
        console.log("render");
        return null;
      })()}
      <p>data: {JSON.stringify(data)}</p>
    </div>
  );
}
```

执行结果：
![](http://blog.toringo.cn/DFFBEDE1-3A7E-4A6C-A683-181378EAC3E1.png?guogai)

*结论*：
	* useEffect 是在render之后生效执行的。

*[DEMO3](https://codesandbox.io/s/floral-browser-21euu)*
```jsx
import React, { useState, useEffect, useRef } from “react”;
function Demo3() {
  const [data, setData] = useState();
  useEffect(() => {
    console.log("useEffect—[]”);
    fetch(“https://www.mxnzp.com/api/lottery/common/latest?code=ssq”)
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  }, []);

  useEffect(() => {
    console.log("useEffect ---> 无依赖");
  });

  useEffect(() => {
    console.log(“useEffect 依赖data： data发生了变化”);
  }, [data]);

  return (
    <div>
      <p>data: {JSON.stringify(data)}</p>
    </div>
  );
}
export default Demo3;
```

执行结果：
![](http://blog.toringo.cn/E613F99C-231D-4534-B62E-600180DE0C90.png?guogai)

*结论*
	* effect在render后按照前后顺序执行。
	* effect在没有任何依赖的情况下，render后每次都按照顺序执行。
	* effect内部执行是异步的。
	* 依赖`[]`可以实现类似`componentDidMount`的作用，但最好忘记生命周期， 只记副作用。

*[DEMO4](https://codesandbox.io/s/beautiful-hooks-3sslc)*
```jsx
import React, { useState, useEffect, useRef } from "react";

function Demo4() {
  useEffect(() => {
    console.log(“useEffect1”);
    const timeId = setTimeout(() => {
      console.log(“useEffect1-setTimeout-2000”);
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  useEffect(() => {
    console.log("useEffect2");
    const timeId = setInterval(() => {
      console.log("useEffect2-setInterval-1000");
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, []);
  return (
    <div>
      {(() => {
        console.log(“render”);
        return null;
      })()}
      <p>demo4</p>
    </div>
  );
}
export default Demo4;
```
执行结果：
![](http://blog.toringo.cn/C38DA86D-22A1-4945-855E-B112E5318DB0.png?guogai)

*结论：*
	* effect回调函数是按照先后顺序同时执行的。
	* effect的回调函数返回一个匿名函数，相当于`componentUnMount`的钩子函数，一般是remove eventLisenter， clear timeId等，主要是组件卸载后防止内存泄漏。

#### useContext 
[传送门](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)
```jsx
const value = useContext(MyContext);
// MyContext 为 context 对象（React.createContext 的返回值） 
// useContext 返回MyContext的返回值。
// 当前的 context 值由上层组件中距离当前组件最近的<MyContext.Provider> 的 value prop 决定。
```

[DEMO5](https://codesandbox.io/s/blissful-sinoussi-2gl4z)
```jsx
import React, { useContext, useState } from “react”;
const MyContext = React.createContext();
function Demo5() {
  const [value, setValue] = useState("init”);
  console.log(“Demo5”);
  return (
    <div>
      {(() => {
        console.log("render");
        return null;
      })()}
      <button onClick={() => {
        console.log('click：更新value')
        setValue(`${Date.now()}_newValue`)
      }}>
        改变value
      </button>
      <MyContext.Provider value={value}>
        <Child1 />
        <Child2 />
      </MyContext.Provider>
    </div>
  );
}

function Child1() {
  const value = useContext(MyContext);
  console.log(“Child1-value”, value);
  return <div>Child1-value: {value}</div>;
}

function Child2(props) {
  console.log(‘Child2’)
  return <div>Child2</div>;
}
```

执行结果：
![](http://blog.toringo.cn/20191206185241.png?guogai)

*结论：*
	*  useContext 的组件总会在 context 值变化时重新渲染， 所以`<MyContext.Provider>`包裹的越多，层级越深，性能会造成影响。
	* `<MyContext.Provider>` 的 value 发生变化时候， 包裹的组件无论是否订阅content value，所有组件都会从新渲染。

*demo 中child2 不应该rerender, 如何避免不必要的render？*  
使用React.memo优化。
```jsx
const Child2 = React.memo((props) => {
  return <div>Child2</div>;
})
```

执行结果：
![](http://blog.toringo.cn/20191206185402.png?guogai)

*注意：*
默认情况下React.memo只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。 
[参考链接](https://github.com/facebook/react/issues/15156#issuecomment-474590693)



###




#### useRef


#### useHook 自定义



[React hooks: not magic, just arrays - Rudi Yardley - Medium](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/
[深入理解：React hooks是如何工作的？ - 知乎](https://zhuanlan.zhihu.com/p/81528320)





*SOLID 原则*
S – Single Responsibility Principle *单一职责*原则
O – Open/Closed Principle *开放/封闭*原则
L – Liskov Substitution Principle *里氏替换*原则
I – Interface Segregation Principle *接口隔离*原则
D – Dependency Inversion Principle *依赖倒转*原则

分而治之，高内聚， 低耦合


如果你刻意地想要从某些异步回调中读取 /最新的/ state，你可以用  [一个 ref](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)  来保存它，修改它，并从中读取。



使用reducer有助于将读取与写入分开





























/>/***多伸懒腰，对身体好***
