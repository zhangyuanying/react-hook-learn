import { useState, useMemo, useCallback } from "react";

function useRowSelection(options = {}) {
  const [selectedList, setSelectedList] = useState(options.selectedList || []);
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    options.selectedRowKeys || []
  );
  const rowSelection = useMemo(
    () => ({
      columnWidth: "44px",
      ...options,
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedList(selectedRows);
        console.log("options.onChange", options.onChange, selectedRowKeys);
        if (options.onChange) {
          options.onChange(selectedRowKeys, selectedRows);
        }
      }
    }),
    [selectedRowKeys, options]
  );

  // 操作完取消选中
  const resetSelection = useCallback(() => {
    setSelectedList([]);
    setSelectedRowKeys([]);
  }, []);
  return { rowSelection, selectedList, selectedRowKeys, resetSelection };
}

export default useRowSelection;
