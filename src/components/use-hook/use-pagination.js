import { useMemo } from "react";

function usePagination(config = {}) {
  const paginationConfig = useMemo(() => {
    return {
      pageSize: config.limit || 10,
      current: config.page || 1,
      defaultCurrent: 1,
      showTotal: total => total,
      total: config.totalCount || 0,
      onChange: (page, pageSize) => {
        config.onChange({ limit: pageSize, page });
      }
    };
  }, [config]);

  return paginationConfig;
}

export default usePagination;
