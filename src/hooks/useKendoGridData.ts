import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GridItem } from '../models/grid.type';
import { fetchGridData } from '../api/gridApi';
import { fetchExtraData } from '../api/columnApi';

const PAGE_SIZE = 10;

export const useKendoGridData = () => {
  const [pageState, setPageState] = useState({ skip: 0, take: PAGE_SIZE });
  const [data, setData] = useState<GridItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [extraDataMap, setExtraDataMap] = useState<
    Record<number, Partial<GridItem>>
  >({});

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

  /* -------- lazy-load extra columns -------- */
  const fetchExtraDataIfNeeded = useCallback(async () => {
    if (Object.keys(extraDataMap).length > 0) return;

    const extraData = await fetchExtraData();
    setExtraDataMap(extraData);
  }, [extraDataMap]);

  /* -------- merge base + extra -------- */
  const mergedData = useMemo(() => {
    if (!Object.keys(extraDataMap).length) return data;

    return data.map(row => ({
      ...row,
      ...(extraDataMap[row.id] || {})
    }));
  }, [data, extraDataMap]);

  return {
    data: mergedData,
    total,
    loading,
    pageState,
    setPageState,
    fetchExtraDataIfNeeded
  };
};
