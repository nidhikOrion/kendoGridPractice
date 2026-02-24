import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ColorKey = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full border border-gray-300 bg-white text-[12px] mt-3">
      
      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        className="bg-[#efefef] border-b border-gray-300 h-9 flex items-center px-3 text-gray-800 cursor-pointer hover:bg-[#e5e5e5]"
      >
        {open ? <RemoveIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}
        <span className="ml-2 font-medium">Color Key</span>
      </div>

      {/* BODY */}
      {open && (
        <div className="divide-y divide-gray-300">

          {/* ROW 1 */}
          <div className="flex items-center pb-4  gap-3">
            
            {/* Green bar */}
            <div className="w-[450px] h-10 border border-gray-300 bg-white">
              <div className="h-full bg-green-600 w-full"></div>
            </div>

            <span className="text-gray-700">
              The overall Specified Process Activities % Complete
              (Excluding Annual Controls) is &gt; 90% complete
            </span>
          </div>

          {/* ROW 2 */}
          <div className="flex items-center pb-4  py-1 gap-3">
            <span className="text-gray-600 w-[450px] px-3">No Color</span>

            <span className="text-gray-700">
              The overall Specified Process Activities % Complete
              (Excluding Annual Controls) is &lt; 90% complete
            </span>
          </div>

        </div>
      )}
    </div>
  );
};

export default ColorKey;