import {
  GridColumnMenuFilter
} from '@progress/kendo-react-grid';

export const CustomColumnMenu = (props: any) => {
  return (
    <div className="k-columnmenu-filter-only">
      <GridColumnMenuFilter
        {...props}
        expanded={true}
      />
    </div>
  );
};
