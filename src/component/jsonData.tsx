export interface GridItem {
  client: string;
  projectCode: string;
  projectName: string;
  opinion: string;
  col1: number;
  col2: number;
  col3: number;
  col4: number;
  col5: number;
  col6: number;

  // 🔵 extra (hidden initially)
  extra1?: number;
  extra2?: number;
  extra3?: number;
  extra4?: number;
}

export const gridData: GridItem[] = Array.from({ length: 25 }).map((_, i) => ({
  client: `Client ${i + 1}`,
  projectCode: `PRJ-${1000 + i}`,
  projectName: `Project ${i + 1}`,
  opinion: `Opinion ${i + 1}`,
  col1: Math.random() * 10,
  col2: Math.random() * 10,
  col3: Math.random() * 10,
  col4: Math.random() * 10,
  col5: Math.random() * 10,
  col6: Math.random() * 10,

  extra1: Math.random() * 10,
  extra2: Math.random() * 10,
  extra3: Math.random() * 10,
  extra4: Math.random() * 10
}));


export interface ColumnConfig {
  field: keyof GridItem;
  title: string;
  width: number;
  locked?: boolean;
  blue?: boolean;
  isCollapsible?: boolean;   // ONLY on parent column
  collapseInfo?: (keyof GridItem)[];
}


export const BASE_COLUMNS: ColumnConfig[] = [
  { field: 'client', title: 'Client Name', width: 155, locked: true },
  { field: 'projectCode', title: 'Project Code', width: 155, locked: true },
  { field: 'projectName', title: 'Project Name', width: 155, locked: true },
  { field: 'opinion', title: 'Opinion', width: 155, locked: true },

  // 🔵 BLUE (always visible)
  {
    field: 'col1',
    title: 'Col 1',
    width: 200,
    isCollapsible: true,
    collapseInfo: ['extra1', 'extra2', 'extra3', 'extra4']
  },
  { field: 'col2', title: 'Col 2', width: 200},
  { field: 'col3', title: 'Col 3', width: 200, blue: true },
  { field: 'col4', title: 'Col 4', width: 200, blue: true },

  // 🟢 NORMAL base columns
  { field: 'col5', title: 'Col 5', width: 200, blue: true },
  { field: 'col6', title: 'Col 6', width: 200, blue: true }
];


export const EXTRA_COLUMNS: ColumnConfig[] = [
  { field: 'extra1', title: 'Extra 1', width: 200 },
  { field: 'extra2', title: 'Extra 2', width: 200 },
  { field: 'extra3', title: 'Extra 3', width: 200 },
  { field: 'extra4', title: 'Extra 4', width: 200 }
];

