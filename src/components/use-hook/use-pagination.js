import { useState, useMemo } from "react";

export const defaultPagination = {
  pageSize: 10,
  page: 1
};

function usePagination(config = defaultPagination) {
  const [pagination, setPagination] = useState({
    pageSize: config.pageSize || defaultPagination.pageSize,
    current: config.page || config.defaultCurrent || defaultPagination.page
  });

  const paginationConfig = useMemo(() => {
    return {
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

  return { paginationConfig, setPagination };
}

export default usePagination;
