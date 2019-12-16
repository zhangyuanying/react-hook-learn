import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "antd";
import useFetch from "../components/use-hook/use-fetch";
import { getJokes } from "../api";
import usePagination from "../components/use-hook/use-pagination";
import useRowSelection from "../components/use-hook/use-row-selection";
import useTable from "../components/use-hook/use-table";

function List() {
  // const { data = {}, loading, doFetch } = useFetch(getJokes, {
  //   page: 1
  // });
  // const pagination = usePagination({
  //   total: data.totalCount,
  //   // page: 2,
  //   // pageSize: 2,
  //   // showQuickJumper: true,
  //   // showSizeChanger: true,
  //   // defaultCurrent: 2,
  //   // onShowSizeChange: () => {},
  //   // showTotal: total => total,
  //   onChange: (page, limit) => {
  //     doFetch({ page, limit });
  //   }
  // });
  // const { rowSelection, selectedList, selectedRowKey } = useRowSelection();

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
  const columns = [
    {
      title: "笑话内容",
      dataIndex: "content",
      sorter: (a, b) => a.content.length - b.content.length,
      // defaultSortOrder: "descend",
      filters: [
        {
          text: "Joe",
          value: "Joe"
        },
        {
          text: "Jim",
          value: "Jim"
        }
      ]
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      filters: [
        {
          text: "Joe",
          value: "Joe"
        },
        {
          text: "Jim",
          value: "Jim"
        }
      ]
    }
  ];
  console.log("render", selectedList, selectedRowKeys, tableProps);
  return (
    <div>
      <Table rowKey="content" columns={columns} {...tableProps} />
      <Button onClick={resetSelection}>resetSelection</Button>
      <Button onClick={() => doFetch({ page: 1, id: 12 })}>
        doFetch page=1
      </Button>
      <Button onClick={reFetch}>reFetch</Button>
    </div>
    // <Table
    //   rowKey="content"
    //   loading={loading}
    //   pagination={pagination}
    //   rowSelection={rowSelection}
    //   columns={columns}
    //   dataSource={data.list}
    // />
  );
}

export default List;
