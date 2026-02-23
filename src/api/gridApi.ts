// gridApi.ts
import type { GridItem } from '../models/grid.type';

export const fetchGridData = async (
  skip: number,
  take: number
): Promise<{ data: GridItem[]; total: number }> => {

  const params = new URLSearchParams();
  params.append('_start', String(skip));
  params.append('_end', String(skip + take));

  const url = `http://localhost:4000/gridData?${params.toString()}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    data,
    total: Number(res.headers.get('X-Total-Count')) || 50
  };
};
