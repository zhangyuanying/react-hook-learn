import React, { useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import useFetch from "../components/use-hook/use-fetch";
import { getJokes } from "../api";
import usePagination from "../components/use-hook/use-pagination";

function List() {
  const { data = {}, loading, doFetch } = useFetch(getJokes, {
    page: 1
  });

  const pagination = usePagination({
    total: data.totalCount,
    // page: 2,
    // pageSize: 2,
    // showQuickJumper: true,
    // showSizeChanger: true,
    // defaultCurrent: 2,
    // onShowSizeChange: () => {},
    // showTotal: total => total,
    onChange: (page, limit) => {
      doFetch({ page, limit });
    }
  });
  // console.log("getList", data, pagination);
  const columns = [
    { title: "笑话内容", dataIndex: "content" },
    { title: "更新时间", dataIndex: "updateTime" }
  ];
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handle = () => {
    setDisabled(true);
    setTimeout(() => {
      setCount(count + 1);
      setDisabled(false);
    }, 1000);
  };
  console.log("render");
  return (
    <>
      <p>
        <button onClick={handle} disabled={disabled}>
          {count}
        </button>
      </p>
      <Table
        rowKey="content"
        loading={loading}
        pagination={pagination}
        columns={columns}
        dataSource={data.list}
      />
      <Pagination {...pagination} />
    </>
  );
}

export default List;
