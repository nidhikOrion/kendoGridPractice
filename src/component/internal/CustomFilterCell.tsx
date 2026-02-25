import { HeaderThElement } from "@progress/kendo-react-data-tools";
import type { GridFilterCellProps } from "@progress/kendo-react-grid";


export default function CustomFilterCell(props: GridFilterCellProps | any) {
  console.log("dsf", props)
  return (
    <HeaderThElement columnId={props.thProps?.columnId || ''} {...props.thProps}>
      {props.children}
    </HeaderThElement>
  )
}
