// gridApi.ts
// import type { GridItem } from '../models/grid.type';
import type { GridItem } from "../models/grid.type";
import datas from "./../../db.json"



export const fetchGridData =async (
  skip: number,
  take: number
) => {

  const res = datas.gridData.slice(skip, (skip + take));
  const extraData = datas.extraData.slice(skip, (skip + take));

  const gridMap = res.reduce((acc: any, item:GridItem ) => {
    const match = extraData.find(g => g.gridId === item.id)
    if (match) {
      const { gridId, ...rest } = match;
      acc.push({ ...item, ...rest })
    }
    return acc
  }, [])

  return { data: gridMap, total: datas.gridData.length }
};

