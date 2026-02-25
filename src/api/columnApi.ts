import data from "./../../db.json"


export const fetchColumnConfig = async ()=> {
  const res = await data.columns;
  return res
};

