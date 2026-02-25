import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Grid } from '@progress/kendo-react-grid';
import type { GridPageChangeEvent } from '@progress/kendo-react-grid';
import type {
  SortDescriptor,
  CompositeFilterDescriptor
} from '@progress/kendo-data-query';
import { process } from '@progress/kendo-data-query';
import { Loader } from '@progress/kendo-react-indicators';

import type { GridItem, ColumnConfig } from '../models/grid.type';
import { CustomToolbar } from './CustomGridToolbar';

import { fetchColumnConfig } from '../api/columnApi';
import { useKendoGridData } from '../hooks/useKendoGridData';
import EMTDropdown from '../pages/EMTDropdown';
import { columns } from "./internal/ColumnCell";
import ColorKey from './ColorKey';
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { ExcelExportColumn } from "@progress/kendo-react-excel-export";
import { PDFExport } from "@progress/kendo-react-pdf";


const KendoExpandableGrid: React.FC = () => {
  /* ---------- grid data (HOOK) ---------- */
  const {
    data,
    total,
    loading,
    pageState,
    setPageState,
  } = useKendoGridData();

  const excelExportRef = useRef<ExcelExport>(null);
  const pdfExportRef = useRef<PDFExport>(null);

  /* ---------- UI-only state ---------- */
  const [sort, setSort] = useState<SortDescriptor[]>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
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

  const handleExcelExport = () => {
    excelExportRef.current?.save();
  };

  const handlePDFExport = () => {
    pdfExportRef.current?.save();
  };

  const exportData = useMemo(() => {
    return process(data, {
      sort,
      filter: filter ?? undefined
    }).data;
  }, [data, sort, filter]);


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

  /* ---------- client-side sort + filter ---------- */
  const processedData = useMemo(() => {
    return process(data, {
      sort,
      filter: filter ?? undefined
    }).data as GridItem[];
  }, [data, sort, filter]);

  /* ---------- columns ---------- */

  const columnsData = columns({ baseColumns, processedData });

  const exportColumns = useMemo(() => {
    return baseColumns.map(col => (
      <ExcelExportColumn
        key={col.field}
        field={col.field}
        title={col.title}
        width={col.width || 150}
      />
    ));
  }, [baseColumns]);

  /* ---------- render ---------- */
  return (
    <div className="grid-page w-full flex flex-col relative">
      <EMTDropdown />
      <ColorKey />
      <CustomToolbar
        onExcelExport={handleExcelExport}

      />


      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
          <Loader type="infinite-spinner" size="large" />
        </div>
      )}
      <div className="bg-white">
        <ExcelExport
          data={exportData}
          ref={excelExportRef}
          fileName="Engagement_Report.xlsx"
        >
          {exportColumns}

          <Grid
            data={processedData}
            total={total}
            skip={pageState.skip}
            take={pageState.take}
            pageable
            sortable={{ allowUnsort: true, mode: 'single' }}
            sort={sort}
            filter={filter ?? undefined}
            scrollable="scrollable"
            resizable
            onPageChange={onPageChange}
            onSortChange={onSortChange}
            onFilterChange={onFilterChange}
          >
            {columnsData}
          </Grid>
        </ExcelExport>
      </div>
    </div >
  );
};

export default KendoExpandableGrid;
