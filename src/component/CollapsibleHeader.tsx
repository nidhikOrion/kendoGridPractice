import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import type { ColumnConfig } from '../models/grid.type';

interface YellowRowProps {
  expandedMap: Record<string, boolean>;
  onToggle: (field: string) => void;
  baseColumns: ColumnConfig[];
  
}

export const YellowRowWithPlus: React.FC<YellowRowProps> = ({
  expandedMap,
  onToggle,
  baseColumns,
}) => {
  return (
    <div className="flex border-b border-gray-300 bg-gray-100">
      {baseColumns.map(col => {
        const isExpanded = expandedMap[col.field];

        return (
          <div
            key={col.field}
            style={{ width: col.width }}
            className={`
              h-8
              border-r border-gray-300
              flex items-center justify-center
              ${col.blue ? 'bg-yellow-200' : ''}
            `}
          >
            {col.isCollapsible && (
              <span
                className="cursor-pointer flex items-center"
                onClick={() => onToggle(col.field)}
              >
                {isExpanded ? (
                  <IndeterminateCheckBoxOutlinedIcon fontSize="medium" />
                ) : (
                  <AddBoxOutlinedIcon fontSize="medium" />
                )}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
