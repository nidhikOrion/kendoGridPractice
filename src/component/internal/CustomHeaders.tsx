import { HeaderThElement } from "@progress/kendo-react-data-tools";
import type { GridCustomHeaderCellProps } from "@progress/kendo-react-grid";

export const HeaderCustomCell = (props: GridCustomHeaderCellProps) => {
    return (<>
        <HeaderThElement
            columnId={props.thProps?.columnId || ''}
            {...props.thProps}
            style={{
                height: "250px"
            }}
        >
            {props.children}
        </HeaderThElement>
    </>
    );
}