import { HeaderThElement } from "@progress/kendo-react-data-tools";
import type { GridCustomHeaderCellProps } from "@progress/kendo-react-grid";


import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { useSelectedKendo } from "../../hooks/useKendoContext";


export function HeaderExpandCollapseCell(props: GridCustomHeaderCellProps) {
    const { expandCollapse, setExpandCollapse } = useSelectedKendo();

    const handleClick = (e: string) => {

        setExpandCollapse((prev: any) => {
            return { ...prev, [e]: !prev[e] }
        })
    }

    console.log("expandCollapse",expandCollapse)
    return (
        <HeaderThElement columnId={props.thProps?.columnId || ''}   {...props.thProps} style={{
            color: "red",

        }} onClick={() => handleClick(props.field as any)}>
            {expandCollapse[props.field as any] ? <IndeterminateCheckBoxOutlinedIcon fontSize="medium" /> : <AddBoxOutlinedIcon fontSize="medium" />}

        </HeaderThElement>
    )
}