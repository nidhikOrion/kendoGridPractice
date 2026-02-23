import type { ColumnConfig } from '../models/grid.type';

interface EmptyAlignedRowProps {
  baseColumns: ColumnConfig[];
}


export const EmptyAlignedRow: React.FC<EmptyAlignedRowProps> = ({
  baseColumns
}) => {
  return (
    <div className="flex border-b border-gray-300 bg-gray-100">
      {baseColumns.map(col => (
        <div
          key={col.field}
          style={{ width: col.width }}
          className="h-4 border-r border-gray-300"
        />
      ))}
    </div>
  );
};

