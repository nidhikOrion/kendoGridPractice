import { useEffect, useState } from 'react';
import type { GridItem } from '../models/grid.type';
import { fetchGridData } from '../api/gridApi';

const PAGE_SIZE = 10;

export const useKendoGridData = () => {
  const [pageState, setPageState] = useState({ skip: 0, take: PAGE_SIZE });
  const [data, setData] = useState<GridItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /* -------- fetch base grid data -------- */
  useEffect(() => {
    let mounted = true;

    setLoading(true);
    fetchGridData(pageState.skip, pageState.take)
      .then(res => {
        if (!mounted) return;
        setData(res.data);
        setTotal(res.total);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [pageState]);

  return {
    data,
    total,
    loading,
    pageState,
    setPageState
  };
};
