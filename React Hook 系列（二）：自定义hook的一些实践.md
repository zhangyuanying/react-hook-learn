## React Hook 系列（二）：自定义hook的一些实践

![](http://blog.toringo.cn/IMG_20191013_175712R.jpg?guogai)

<p align="right"style="color: #666;">——Smartisan Pro 2S 摄于·北京</p>

## 前言

从React 16.8 稳定版hook发布近一年多，使用hook并不普遍，原因可能有两方面: 一、官方并没有完全取代class；二、迭代项目完全hook话需要成本，官方也不推荐。恰巧新项目伊始，就全面采用hook，这也是写这篇文章的原由，接上一篇 ，这篇主要是自定义hook的一些实践， 不一定是最佳，希望我的一点分享总结，能给认真阅读的你带来收益。[源码在这，，，](https://github.com/toringo/react-hook-learn)，[在线demo](https://codesandbox.io/s/currying-sunset-s921v)。

## 正文

> 下面是项目中一些有代表性的hook，目前也是项目中的一些最佳实践。

### 🐤 1. HOC 到 Render Props 再到 hook

业务代码常用实现双向绑定， 分别用以上三种实现，如下：

HOC写法

```jsx
const HocBind = WrapperComponent =>
  class extends React.Component {
    state = {
      value: this.props.initialValue
    };
    onChange = e => {
      this.setState({ value: e.target.value });
      if (this.props.onChange) {
        this.props.onChange(e.target.value);
      }
    };
    render() {
      const newProps = {
        value: this.state.value,
        onChange: this.onChange
      };
      return <WrapperComponent {...newProps} />;
    }
  };
// 用法
const Input = props => (
  <>
    <p>HocBind实现 value:{props.value}</p>
    <input placeholder="input" {...props} />
  </>
);
const HocInput = HocBind(Input);
<HocInput
  initialValue="init"
  onChange={val => {
    console.log("HocInput", val);
  }}
/>
```

Render Props写法

```jsx
// props 两个参数initialValue 输入，onChange输出
class HocBind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue
    };
  }
  onChange = e => {
    this.setState({ value: e.target.value });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };
  render() {
    return (
      <>
        {this.props.children({
          value: this.state.value,
          onChange: this.onChange
        })}
      </>
    );
  }
}
// 用法
<HocBind
  initialValue="init"
  onChange={val => {
    console.log("HocBind", val);
  }}
>
  {props => (
    <>
      <p>HocBind实现 value:{props.value}</p>
      <input placeholder="input" {...props} />
    </>
  )}
</HocBind>
```

再看hook写法

```jsx
// initialValue默认输入
function useBind(initialValue) {
  const [value, setValue] = useState(initialValue || "");
  const onChange = e => {
    setValue(e.target.value);
  };
  return { value, onChange };
}
// 用法
function InputBind() {
  const inputProps = useBind("init");
  return (
    <p>
      <p>useBind实现 value:{inputProps.value}</p>
      <input {...inputProps} />
    </p>
  );
}
```

比较发现，HOC和`render props`方式都会侵入代码，使得代码阅读性下降，也不够优雅，组件内部暴露的value值，在外部也很难拿到， 反观 hook 的写法，逻辑完全解耦，使用场景最大化且不侵入代码，在组件顶层可以拿到双向绑定的值，比之前优雅很多。 [源码](https://github.com/toringo/react-hook-learn/blob/master/src/components/use-hook/use-bind.js)

**总结**

* hook 可读性高，也易于维护。
* hook 不会侵入代码， 不会造成嵌套。
* hook UI和逻辑彻底拆分，更容易复用。

### 🐤 2.  摆脱重复fetch, 自定义useFetch

fetch数据基本是最常见的需要封装逻辑，先看看我第一版的`useFetch`：

```jsx
function useFetch(fetch, params) {
  const [data, setData] = useState({});

  const fetchApi = useCallback(async () => {
    const res = await fetch(params);
    if (res.code === 1) {
      setData(res.data);
    }
  }, [fetch, params]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return data;
}
// 用法
import { getSsq } from "../api";
function Ssq() {
  const data = useFetch(getSsq, { code: "ssq" });
  return <div>双色球开奖号码：{data.openCode}</div>;
}
// api导出方法
export const getSsq = params => {
  const url =
    "https://www.mxnzp.com/api/lottery/common/latest?" + objToString(params);
  return fetch(url).then(res => res.json());
};
```

**结果：** CPU爆表💥，浏览器陷入死循环，思考一下， why?

`fix bug`开始，更改一下调用方式：

```jsx
...
const params = useMemo(() => ({ code: "ssq" }), []);  
const data = useFetch(getSsq, params);
...
```

🤡惊讶，是想要的结果，但是，why？(如果你不知道，欢迎查阅[React Hook 系列一])，因为调用`useFetch(getSsq, { code: "ssq" });` 第二个参数在useFetch中被useCallback依赖，页面的执行过程：`render => 执行useEffect  => 调用useCallback方法 => 更新data => render => useEffect => 调用useCallback方法 判断依赖是否变化 确定是否跳过这次执行 ...` ，对于useCallback 来说 params  对象每次都是新的对象， 所以这个渲染流程会一直执行，造成死循环。useMemo的作用就是帮你缓存params且返回一个[memoized](https://en.wikipedia.org/wiki/Memoization)的值， 当useMemo的依赖值没有变化，memoized就是不变的，所以useCallback会跳过此次执行。

你以为就这样结束了？

诡异的微笑😎😜，每次在使用useFetch都需要用useMemo包裹params，一点儿也不优雅，再改改？

要解决的问题：如何保持params不变时，保持唯一？

首先想到`JSON.stringify`，码上`const data = useFetch(getSsq, JSON.stringify({ code: "ssq" }))`, 再见吧，烦人的对象，每当参数不变时他就是个不变的字符串，在fetch传入的时候`JSON.parse(params)`， 🤩好机智。但是好像哪里不对， 这要是被大佬看到，大佬： “emmmm，你这还是不够优雅，虽然问题解决了，再改改？“，我说：”嗯！！！“。

`useState`， 对就是他， 他可以缓存params，经过他包裹的，当他没有变化时useCallback和useEffect都认为他是不变的，会跳过执行回调，于是乎useFetch变成了以下样子：

```jsx
function useFetch(fetch, params) {
  const [data, setData] = useState({});
  const [newParams] = useState(params);
  const fetchApi = useCallback(async () => {
    console.log("useCallback");
    const res = await fetch(newParams);
    if (res.code === 1) {
      setData(res.data);
    }
  }, [fetch, newParams]);

  useEffect(() => {
    console.log("useEffect");
    fetchApi();
  }, [fetchApi]);

  return data;
}
// 调用
const data = useFetch(getSsq, { code: "ssq" });
```

👏👏👏欣喜若狂。

我： ”大佬， 这样好像没啥问题了“。

大佬：”emmm, 我要更新以下参数，还会fetch数据吗？“

我： ”嗯？！？“

大佬： "你再看看？"

我：”好（怯怯的说，注意读 轻声）“

那好，不就是想更新params吗，**更新**肯定是用户的操作， 多以暴露更新`newParams`的方法就OK吧，于是：

```jsx
function useFetch(fetch, params) {
  ...
  const doFetch = useCallback(rest => {
    setNewParams(rest);
  }, []);
  return { data, doFetch };
}
// 调用
const { data, doFetch } = useFetch(getSsq, { code: "ssq" });
console.log("render");
return (
  <div>
  	开奖号码：{data.openCode}
  	<button onClick={() => doFetch({ code: "fc3d" })}>福彩3D</button>
  </div>
);
```

🙃🙂🙃🙂淡定微笑。

不行，这次不能让大佬说 **你在看看吧**， 我必须未雨绸缪，fetch数据的场景我必需分析一下：

* 页面首次进入或刷新。
* 用户改变fetch数据的参数时。
* 用户点击modal后加载数据， 或者当请求参数依赖某个数据的有无才会fetch数据。
* 在不改变参数的情况下，用户手动点击刷新页面按钮。
* fetch数据时页面loading。

第三、四、五果然不满足，辛亏啊。。。差点又🐶， 于是5分钟后：

```
function useFetch(fetch, params, visible = true) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [newParams, setNewParams] = useState(params);
  const fetchApi = useCallback(async () => {
    console.log("useCallback");
    if (visible) {
      setLoading(true);
      const res = await fetch(newParams);
      if (res.code === 1) {
        setData(res.data);
      }
      setLoading(false);
    }
  }, [fetch, newParams, visible]);

  useEffect(() => {
    console.log("useEffect");
    fetchApi();
  }, [fetchApi]);

  const doFetch = useCallback(rest => {
    setNewParams(rest);
  }, []);

  const reFetch = () => {
    setNewParams(Object.assign({}, newParams));
  };
  return {
    loading,
    data,
    doFetch,
    reFetch
  };
}
```

最后大佬说，这个版本目前能满足业务的需求，先用用看，emmmm，🍻🍻🍻。[源码](https://github.com/toringo/react-hook-learn/blob/master/src/components/use-hook/use-fetch.js)

但是`useFetch`还可以封装的更健壮，不需要传入api方法，直接将fetch的参数以及过程封装起来，系列文章写完，计划基于原生fetch封装 useFetch 轮子， 期待ing...

### 🐤 3. 扯淡的table，自定义useTable

为什么要写这个hook哪， 先看看没有useTable之前的代码，前提我们使用了ant-design。

```jsx
const rowSelection = {
  selectedRowKeys,
  onChange: this.onSelectChange,
};
<Table
  rowKey="manage_ip"
  pagination={{
    ...pagination,
      total,
      current: pagination.page,
  }}
  onChange={p => {
    getSearchList({ page: p.current, pageSize: p.pageSize });
  }}
  rowSelection={rowSelection}
  loading={{ spinning: loading.OperationComputeList, delay: TABLE_DELAY }}
  columns={columns}
  dataSource={list}
/>

```

哇，类似中台系统，每个页面基本都有个table，且都长得很相似，重复代码有点多，于是乎开始想如何偷懒。

首先有table的每个页面基本都涉及到分页，都是重复的逻辑，所以先搞个usePagination来处理分页的逻辑达到复用，输入值为默认值，暴露change供用户操作，那么：

```jsx
export const defaultPagination = {
  pageSize: 10,
  current: 1
};
function usePagination(config = defaultPagination) {
  const [pagination, setPagination] = useState({
    pageSize: config.pageSize || defaultPagination.pageSize,
    current: config.page || config.defaultCurrent || defaultPagination.current
  });

  const paginationConfig = useMemo(() => {
    return {
      ...defaultPagination,
      showTotal: total =>
        `每页 ${pagination.pageSize} 条  第 ${pagination.current}页 共 ${total}`,
      ...config,
      pageSize: pagination.pageSize,
      current: pagination.current,
      onChange: (current, pageSize) => {
        if (config.onChange) {
          config.onChange(current, pageSize);
        }
        setPagination({ pageSize, current });
      },
      onShowSizeChange: (current, pageSize) => {
        if (config.onChange) {
          config.onChange(current, pageSize);
        }
        setPagination({ pageSize, current });
      }
    };
  }, [config, pagination]);

  return paginationConfig;
}

```

以上用户的操作逻辑和change后的动作解耦， total作为fetch后动态变化的，所以不能省略。尝试直接在Pagination组件中使用，也没有问题。

同理rowSelection作为公共的逻辑，也可以按照以上的逻辑，将其自定义成hook：

```
const { rowSelection, selectedList, selectedRowKey, resetSelection } = useRowSelection(options);
// options 为rowSelection的所有属性，可不输入。
// rowSelection, selectedList, selectedRowKey为暴露属性和已选数据。
// resetSelection 取消所有选中

```

就长这样，很简单：

```jsx
function useRowSelection(options = {}) {
  const [selectedList, setSelectedList] = useState(options.selectedList || []);
  const [selectedRowKey, setSelectedRowKeys] = useState(
    options.selectedRowKey || []
  );
  const rowSelection = useMemo(() => {
    return {
      columnWidth: "44px",
      ...options,
      selectedList,
      selectedRowKey,
      onChange: (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedList(selectedRows);
        if (options.onChange) {
          options.onChange(selectedRowKeys, selectedRows);
        }
      }
    };
    // 操作完取消选中
    const resetSelection = useCallback(() => {
      setSelectedList([]);
      setSelectedRowKeys([]);
    }, []);
  }, [selectedList, selectedRowKey, options]);
  return { rowSelection, selectedList, selectedRowKey, resetSelection };
}

```

最终table用起来可能长这样：

```jsx
const { data = {}, loading, doFetch } = useFetch(getJokes, {
  page: 1
});
const pagination = usePagination({
  total: data.totalCount,
  onChange: (page, limit) => {
    doFetch({ page, limit });
  }
});
const { rowSelection, selectedList, selectedRowKey, resetSelection } = useRowSelection();
const columns = [
  { title: "笑话内容", dataIndex: "content" },
  { title: "更新时间", dataIndex: "updateTime" }
];
console.log("render");
return (
  <Table
    rowKey="content"
    loading={loading}
    pagination={pagination}
    rowSelection={rowSelection}
    columns={columns}
    dataSource={data.list}
    />
);

```

👎👊👎不是说好的useTable吗， 现在也没见着个人影啊，好好下面开始useTable的由来。

经过观察pagination和dataSource都依赖fetch后的数据, 所以fetch的过程可以放在useTable中，rowSelection也只需返回值配置项即可，只有columns和rowKey是依赖页面的业务逻辑不需要封装，需要用户操作的只需暴露交给用户，其他的只是返回默认值即可，那useTable 的样子大概出来了：

```jsx
const [tableProps, resetSelection, selectedList, selectedRowKey] = useTable({
  fetch:fetchData
  params: {},
	pagination: {
		// init
		onChange: () => {...},
	},
	rowSelection: {
		// init
		onChange: () => {...},
	},
});
<Table rowKey='id' columns={columns} {...tableProps} />

```

不过 `table` 还需要能filter，幸好table有个`onChange`的API 暴露了分页搜索和排序的所有响应，所以：

```jsx
import { useCallback } from "react";
import usePagination, { defaultPagination } from "./use-pagination";
import useFetch from "./use-fetch";
import useRowSelection from "./use-row-selection";

function useTable(options) {
  const { data = {}, loading, doFetch: dofetch, reFetch } = useFetch(
    options.fetch,
    {
      ...defaultPagination,
      ...options.params
    }
  );

  const tableProps = {
    dataSource: data.list,
    loading,
    onChange: (
      pagination,
      filters,
      sorter,
      extra: { currentDataSource: [] }
    ) => {
      if (options.onChange) {
        options.onChange(pagination, filters, sorter, extra);
      }
    }
  };

  const { paginationConfig, setPagination } = usePagination({
    total: data.totalCount,
    ...(options.pagination || {}),
    onChange: (page, pageSize) => {
      if (!options.onChange) {
        if (options.pagination && options.pagination.onChange) {
          options.pagination.onChange(page, pageSize);
        } else {
          doFetch({ page, pageSize });
        }
      }
    }
  });
  if (options.pagination === false) {
    tableProps.pagination = false;
  } else {
    tableProps.pagination = paginationConfig;
  }

  const {
    rowSelection,
    selectedList,
    selectedRowKeys,
    resetSelection
  } = useRowSelection(
    typeof options.rowSelection === "object" ? options.rowSelection : {}
  );
  if (options.rowSelection) {
    tableProps.rowSelection = rowSelection;
  }

  const doFetch = useCallback(
    params => {
      dofetch(params);
      if (params.page) {
        setPagination({
          pageSize: paginationConfig.pageSize,
          current: params.page
        });
      }
    },
    [paginationConfig, setPagination, dofetch]
  );

  return {
    tableProps,
    resetSelection,
    selectedList,
    selectedRowKeys,
    doFetch,
    reFetch
  };
}
export default useTable;

// 用法
const {
  tableProps,
  resetSelection,
  selectedList,
  selectedRowKeys,
  doFetch,
  reFetch
} = useTable({
  fetch: getJokes,
  params: null,
  onChange: (
    pagination,
    filters,
    sorter,
    extra: { currentDataSource: [] }
  ) => {
  // doFetch({ page: pagination.current, ...filters });
  console.log("onChange", pagination, filters, sorter, extra);
}
// pagination: false
// pagination: true
// pagination: {
//   onChange: (page, pageSize) => {
//     console.log("pagination", page, pageSize);
//     doFetch({ page, pageSize });
//   }
// },
// rowSelection: false,
// rowSelection: true
// rowSelection: {
//   onChange: (rowKey, rows) => {
//     console.log("rowSelection", rowKey, rows);
//   }
// }
});

<Table rowKey="content" columns={columns} {...tableProps} />

```

以上可以满足目前业务关于table的所有需求，欢迎来踩。  

**总结：**

* 不要试图在公共组件写入业务逻辑（也不要试图猜测用户的操作后的相应）。
* 健壮的组件需要默认值，也允许用户去修改默认值。

### 🐤 4. 其他

其他与页面副作用相关的工具函数都可以抽象成hook, 例如基于`Rxjs` 的`use-observable`，定时器 `use-interval` ，基于localStorage 的封装 `use-localStorage` ，基于Form的`use-form`,  基于Modal的`use-modal` 等等。

### 🐤 5. 总结

`hook` 真香🤡🤡，代码可读性提高，比HOC、Render Props更优雅， UI和逻辑耦合度更低，组件复用程度趋于最大化；当然Hook也不是万能的，复杂的数据管理还需要类似redux的工具，譬如redux 有 middleware， 而hook没有， 所以技术选型还需从业务的角度去衡量。一点总结如下：

* **一般自定义 hook 只负责逻辑，不负责渲染。**
* **公共逻辑 hook尽量细分，按照组件的单一原则划分，单一hook只负责单一的职责。**
* **复杂的计算可以考虑用 useCallback, useMemo 去优化。**



---

**微信：gwt385260 欢迎交流🤝🤝🤝~**









