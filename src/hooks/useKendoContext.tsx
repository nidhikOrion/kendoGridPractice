import { createContext, useContext, useState } from "react";

type ColumnMap = Record<string, boolean>;

type ExpandCollapseProviderType = {
  expandCollapse: ColumnMap;
  setExpandCollapse: React.Dispatch<React.SetStateAction<ColumnMap>>;
};


export const ExpandCollapseContext = createContext<ExpandCollapseProviderType | undefined>(undefined);

export const ExpandCollapseProvider = ({ children }: { children: React.ReactNode }) => {
    const [expandCollapse, setExpandCollapse] = useState<ColumnMap>({})

 const value: ExpandCollapseProviderType = { expandCollapse, setExpandCollapse };
  return <ExpandCollapseContext.Provider value={value}>{children}</ExpandCollapseContext.Provider>;
};

// Safe hook: never undefined
export function useExpandCollapse() {
  const ctx = useContext(ExpandCollapseContext);
  if (!ctx) {
    throw new Error('useExpandCollapse must be used within a SelectedKendoProvider');
  }
  return ctx;
}

