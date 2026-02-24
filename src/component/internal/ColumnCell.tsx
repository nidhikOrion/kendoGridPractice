
import { GridColumn } from "@progress/kendo-react-grid";
import type { ColumnConfig } from "../../models/grid.type";
import { HeaderCustomCell } from "./CustomHeaders";
import { HeaderExpandCollapseCell } from "./HeaderExpandCollapseCell";
import { useSelectedKendo } from "../../hooks/useKendoContext";

function columns({ baseColumns, processedData }: { baseColumns: ColumnConfig[], processedData: any }) {
    const cols: React.ReactNode[] = [];

    const { expandCollapse } = useSelectedKendo()


    baseColumns.forEach(col => {

        const isExpanded = col?.field != null && typeof col.field !== 'object' && Boolean(expandCollapse[String(col.field)]);


        return (
            col?.collapseInfo ?
                cols.push(
                    <GridColumn
                        key={col.field}
                        field={col.field}
                        cells={{ headerCell: HeaderExpandCollapseCell }}
                        children={[
                            // Base column as JSX
                            <GridColumn field={col.field} title={col.title} width={col.width} cells={{ headerCell: HeaderCustomCell }} />,
                            // Dynamic columns as JSX                       
                            ...(isExpanded ?
                                (col?.collapseInfo ?? []).map((item, i) => (
                                    <GridColumn
                                        key={`${i}`}
                                        id={String(item.id)}
                                        width={item.width}
                                        field={item?.field ?? `extra ${i}`}
                                        title={item?.title ?? `extra ${i}`}
                                        cells={{
                                            headerCell: HeaderCustomCell
                                        }}
                                    />
                                )) : []
                            )
                        ]}

                    >
                    </GridColumn>
                ) : cols.push(
                    <GridColumn
                        key={col.field}
                        children={[
                            <GridColumn
                                key={col.field}
                                field={col.field}
                                title={col.title}
                                width={col.width}
                                locked={col.locked}
                                headerClassName={col.blue ? 'blue-header' : ''}
                                sortable
                                cells={{ headerCell: HeaderCustomCell }}
                                filter={
                                    typeof processedData?.[0]?.[col.field] === 'number'
                                        ? 'numeric'
                                        : 'text'
                                }
                            />]}
                    />
                ))
    })

    return cols;
};

export { columns }