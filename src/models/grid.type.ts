interface GridItem {
    id: number;  
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
    extra1?: number;
    extra2?: number;
    extra3?: number;
    extra4?: number;
}

interface ColumnConfig {
    field: keyof GridItem;
    title: string;
    width: number;
    locked?: boolean;
    blue?: boolean;
    isCollapsible?: boolean;
    collapseInfo?: (keyof GridItem)[];
}

export type { GridItem, ColumnConfig };

