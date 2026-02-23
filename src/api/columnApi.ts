import type { GridItem ,ColumnConfig} from '../models/grid.type';


export const fetchColumnConfig = async (): Promise<{
  base: ColumnConfig[];
  extra: ColumnConfig[];
}> => {
  const res = await fetch('http://localhost:4000/columns');
  return res.json();
};


export const fetchExtraData = async (): Promise<
  Record<number, Partial<GridItem>>
> => {
  const res = await fetch('http://localhost:4000/extraData');
  const extraData = await res.json();

  const mapped: Record<number, Partial<GridItem>> = {};

  extraData.forEach((e: any) => {
    const { gridId, ...rest } = e; 
    mapped[gridId] = rest;
  });

  return mapped;
};

