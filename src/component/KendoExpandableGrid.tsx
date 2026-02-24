import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Grid } from '@progress/kendo-react-grid';
import type { GridPageChangeEvent } from '@progress/kendo-react-grid';
import type {
  SortDescriptor,
  CompositeFilterDescriptor
} from '@progress/kendo-data-query';
import { process } from '@progress/kendo-data-query';
import { Loader } from '@progress/kendo-react-indicators';
import AddIcon from "@mui/icons-material/Add";

import type { GridItem, ColumnConfig } from '../models/grid.type';
import { CustomToolbar } from './CustomGridToolbar';
// import { YellowRowWithPlus } from './CollapsibleHeader';
// import { EmptyAlignedRow } from './EmptyAlignedRow';
import { CustomColumnMenu } from './CustomColumnMenu';

import { fetchColumnConfig } from '../api/columnApi';
import { useKendoGridData } from '../hooks/useKendoGridData';
import EMTDropdown from '../pages/EMTDropdown';
// import { HeaderThElement } from '@progress/kendo-react-data-tools';
import { columns } from './internal/ColumnCell';
import ColorKey from './ColorKey';


const KendoExpandableGrid: React.FC = () => {
  /* ---------- grid data (HOOK) ---------- */
  const {
    data,
    total,
    loading,
    pageState,
    setPageState,
    // fetchExtraDataIfNeeded
  } = useKendoGridData();

  /* ---------- UI-only state ---------- */
  const [sort, setSort] = useState<SortDescriptor[]>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
  // const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const [baseColumns, setBaseColumns] = useState<ColumnConfig[]>([]);

  /* ---------- fetch column config ---------- */
  useEffect(() => {
    let active = true;

    (async () => {
      const { base } = await fetchColumnConfig();
      if (!active) return;

      setBaseColumns(base as ColumnConfig[]);
    })();

    return () => {
      active = false;
    };
  }, []);


  /* ---------- handlers ---------- */
  const onPageChange = useCallback((e: GridPageChangeEvent) => {
    setPageState({
      skip: e.page.skip,
      take: e.page.take
    });
  }, [setPageState]);

  const onSortChange = useCallback((e: any) => {
    setSort(e.sort);
  }, []);

  const onFilterChange = useCallback((e: any) => {
    setFilter(e.filter);
  }, []);

  // const toggleColumn = useCallback(
  //   async (field: string) => {
  //     setExpandedMap(prev => {
  //       const willExpand = !prev[field];

  //       if (willExpand) {
  //         fetchExtraDataIfNeeded(); // fire & forget
  //       }

  //       return {
  //         ...prev,
  //         [field]: willExpand
  //       };
  //     });
  //   },
  //   [fetchExtraDataIfNeeded]
  // );


  /* ---------- client-side sort + filter ---------- */
  const processedData = useMemo(() => {
    return process(data, {
      sort,
      filter: filter ?? undefined
    }).data as GridItem[];
  }, [data, sort, filter]);

  /* ---------- columns ---------- */

  const columnsData = columns({ baseColumns, processedData });

  /* ---------- render ---------- */
  return (
    <div className="grid-page w-full h-screen flex flex-col relative ">
      <EMTDropdown />
      {/* <div className="bg-[#efefef] border-y border-gray-300 h-9 flex items-center px-4 text-[13px] text-gray-800 cursor-pointer select-none hover:bg-[#e5e5e5] transition">
        <AddIcon sx={{ fontSize: 18 }} />
        <span className="ml-2 font-medium">Color Key</span>
      </div> */}
      <ColorKey/>
      <CustomToolbar />

      {/* <YellowRowWithPlus
        expandedMap={expandedMap}
        onToggle={toggleColumn}
        baseColumns={baseColumns}
      /> */}

      {/* <EmptyAlignedRow baseColumns={baseColumns} /> */}

      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
          <Loader type="infinite-spinner" size="large" />
        </div>
      )}

      <Grid
        data={processedData}
        total={total}
        skip={pageState.skip}
        take={pageState.take}
        pageable
        sortable={{ allowUnsort: true, mode: 'single' }}
        filterable={false}
        sort={sort}
        filter={filter ?? undefined}
        scrollable="scrollable"
        resizable
        selectable={false}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        onFilterChange={onFilterChange}
      >
        {columnsData}

        
      </Grid>
    </div>
  );
};

export default KendoExpandableGrid;
