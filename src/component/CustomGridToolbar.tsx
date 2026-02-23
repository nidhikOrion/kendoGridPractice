import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export const CustomToolbar = () => {
  return (
    <div className="flex items-center justify-between  bg-gray-100 px-2 py-1 text-sm border-b border-gray-300 mt-5">

      {/* LEFT TOOLBAR */}
      <div className="flex items-center gap-2">

        {/* Export */}
        <div className="flex items-center gap-1 rounded border border-gray-300 bg-gray-200 px-2 py-1 cursor-pointer">
          <DownloadIcon sx={{ fontSize: 16 }} />
          <span>Export</span>
        </div>

        {/* Save Changes */}
        <div className="flex items-center gap-1 rounded border border-gray-300 bg-gray-200 px-2 py-1 cursor-pointer">
          <SaveIcon sx={{ fontSize: 16 }} />
          <span>Save Changes</span>
        </div>

        {/* Red at Check-in date */}
        <div className="flex items-center gap-1 rounded border border-gray-300 bg-gray-200 px-2 py-1 cursor-pointer">
          <AutorenewIcon sx={{ fontSize: 16 }} />
          <span>Red at Check-in date</span>
        </div>

        {/* Checkboxes */}
        <label className="flex items-center gap-1 rounded border border-gray-300 bg-gray-200 px-2 py-1 cursor-pointer">
          <input type="checkbox" className="accent-blue-600" />
          <span>Show Only Monitored Opinions</span>
        </label>

        <label className="flex items-center gap-1 rounded border border-gray-300 bg-gray-200 px-2 py-1 cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-blue-600" />
          <span>Show Only Engagements</span>
        </label>

        <label className="flex items-center gap-1 rounded border border-gray-300 bg-gray-200 px-2 py-1 cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-blue-600" />
          <span>Show As Percentages</span>
        </label>
      </div>

      {/* RIGHT */}
      <div className="text-xs text-gray-600 whitespace-nowrap">
        <strong>Report As Of:</strong> 01/15/2026 02:26:12
      </div>

    </div>
  );
};
