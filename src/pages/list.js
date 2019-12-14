import React from "react";
import { Table } from "antd";
import useFetch from "../components/use-hook/use-fetch";
import { getJokes } from "../api";
import usePagination from "../components/use-hook/use-pagination";

function List() {
  const { data = {}, loading, doFetch } = useFetch(getJokes, { page: 1 });

  const paginationConfig = usePagination({
    ...data,
    onChange: val => {
      doFetch(val);
    }
  });
  console.log("getList", data, paginationConfig);
  const columns = [
    { title: "笑话内容", dataIndex: "content" },
    { title: "更新时间", dataIndex: "updateTime" }
  ];
  // const pagination = {
  //   pageSize: data.limit || 10,
  //   current: data.page || 1,
  //   defaultCurrent: 1,
  //   showTotal: total => total,
  //   total: data.totalCount || 0,
  //   onChange: (page, pageSize) => {
  //     console.log("page, pageSize", page, pageSize);
  //   }
  // };
  return (
    <Table
      rowKey="content"
      loading={loading}
      pagination={paginationConfig}
      columns={columns}
      dataSource={data.list}
    />
  );
}

export default List;
