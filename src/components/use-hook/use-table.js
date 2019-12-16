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
