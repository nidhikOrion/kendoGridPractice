
import { GridColumn, type GridCustomCellProps } from "@progress/kendo-react-grid";
import type { ColumnConfig } from "../../models/grid.type";
import { HeaderCustomCell } from "./CustomHeaders";
import { HeaderExpandCollapseCell } from "./HeaderExpandCollapseCell";
import { useExpandCollapse } from "../../hooks/useKendoContext";
import CustomFilterCell from "./CustomFilterCell";
import { CustomColumnMenu } from "../CustomColumnMenu";


export const CustomColorCodeCell = (props: GridCustomCellProps ) => {
    const available = !(props.dataItem.col1 > 5);
    // const noBgr = { backgroundColor: '' };
    const redBgr = { backgroundColor: 'red' };
    const customBgr = { backgroundColor: "rgb(152,255,152, 0.3)" };
    return (
        <td {...props.tdProps} style={available ? redBgr : customBgr}>
            {props.children}
        </td>
    );
};

function columns({ baseColumns, processedData }: { baseColumns: ColumnConfig[], processedData: any }) {
    const cols: React.ReactNode[] = [];

    const { expandCollapse } = useExpandCollapse()
    
    baseColumns.forEach(col => {
       
        const isExpanded = col?.field != null && typeof col.field !== 'object' && Boolean(expandCollapse[String(col.field)]);

        return (
            col?.collapseInfo ?
                cols.push(
                    <GridColumn
                        key={col.field}
                        field={col.field}
                        width={col.width}
                        cells={{ headerCell: HeaderExpandCollapseCell}}
                      
                        children={[
                            // Base column as JSX
                            <GridColumn
                                field={col.field}
                                title={col.title}
                                width={col.width}
                                headerClassName={col.blue ? 'blue-header' : col.orange?"orange-header":""}
                                
                                cells={{
                                    filterCell:CustomFilterCell,
                                    headerCell: HeaderCustomCell,
                                   data:( (col.field == "col1") ? (CustomColorCodeCell) : undefined) as React.ComponentType<GridCustomCellProps> | undefined
                                }} />,
                            // Dynamic columns as JSX                        
                            ...(isExpanded ?
                                (col?.collapseInfo ?? []).map((item, i) => (
                                    <GridColumn
                                        key={`${i}`}
                                        width={item.width}
                                        id={String(item.id)}
                                        field={item?.field ?? `extra ${i}`}
                                        title={item?.title ?? `extra ${i}`}
                                        headerClassName={col.blue ? 'blue-header-extra' : ''}
                                           columnMenu={CustomColumnMenu}
                                    />
                                )) : []
                            )
                        ]}
                    >
                    </GridColumn>
                ) : cols.push(
                    <GridColumn
                        key={col.field}
                        width={col.width}
                        locked={col.locked}
                        children={[
                            <GridColumn
                                key={col.field}
                                locked={col.locked}
                                field={col.field}
                                title={col.title}
                                width={col.width}
                                sortable           
                                headerClassName={col.blue ? 'blue-header' : ''}
                                filter={
                                    typeof processedData?.[0]?.[col.field] === 'number'
                                        ? 'numeric'
                                        : 'text'
                                }
                                columnMenu={CustomColumnMenu}
                            />]}
                    />
                ))
    })

    return cols;
};

export { columns }