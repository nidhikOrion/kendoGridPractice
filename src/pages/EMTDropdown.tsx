
import { useState, type ChangeEvent } from 'react';
import FilterComponent from '../utils/filterComponent';
import LandingPageSummary from '../component/landingPageSummary';
import { RiAddLargeFill } from 'react-icons/ri';
import { HiMiniMinus } from 'react-icons/hi2';
import { FaPlay } from "react-icons/fa";
import { AiOutlineStop } from 'react-icons/ai';

export default function EMTDropdown() {
  const optionsAudit: string[] = ["2025", "2024", "2023"];
  const optionsBusiness: string[] = ["1", "2"];
  const optionsFiscal: string[] = ["All", "fiscal 1"];
  const optionsReport: string[] = ["02/15/2026", "01/10/2026"];
  const workFlow: string[] = ["Workflow 1", "Workflow 2"];
  const [auditYear, setAuditYear] = useState<string | number>("2025");
  const [businessUnit, setBusinessUnit] = useState<string | number>("2025");
  const [fiscalStatus, setFiscalStatus] = useState<string | number>("2025");
  const [reportAs, setReportAs] = useState<string | number>("2025");
  const [workFlowUnit, setWorkFlowUnit] = useState<string | number>("2025");
  const [isShowSummary, setIsShowSummary] = useState<boolean>(true);
  const handleAuditYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setAuditYear(e.currentTarget.value);
  }
  const handleBusinessUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setBusinessUnit(e.currentTarget.value);
  }
  const handleWorkFlowUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setWorkFlowUnit(e.currentTarget.value);
  }
  const handleFiscalStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFiscalStatus(e.currentTarget.value);
  }
  const handleReportAs = (e: ChangeEvent<HTMLSelectElement>) => {
    setReportAs(e.currentTarget.value);
  }

  return (<div className='border-4 border-gray-100  rounded-lg'>
    <div className='bg-gray-100 p-4'>
      <span className='flex items-center cursor-pointer text-[1.5rem] gap-2 font-bold '>
        {isShowSummary ? <HiMiniMinus onClick={() => setIsShowSummary(false)} /> : <RiAddLargeFill onClick={() => setIsShowSummary(true)} />}
        <h1>Landing Page Compliance Summary</h1>
      </span>
      {isShowSummary &&
        <LandingPageSummary yearField={auditYear} />
      }

    </div>
    {isShowSummary && (
      <>
        <div className="flex flex-wrap justify-around gap-y-4 my-8 w-full">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            <FilterComponent
              optionsData={optionsAudit}
              handleDropdown={handleAuditYear}
              selectedVal={auditYear}
              labelText="Audit Year"
            />

            <FilterComponent
              optionsData={workFlow}
              handleDropdown={handleWorkFlowUnit}
              selectedVal={workFlowUnit}
              labelText="Workflow Unit"
            />

            <FilterComponent
              optionsData={optionsFiscal}
              handleDropdown={handleFiscalStatus}
              selectedVal={fiscalStatus}
              labelText="Fiscal Year End Status"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            <FilterComponent
              optionsData={optionsBusiness}
              handleDropdown={handleBusinessUnit}
              selectedVal={businessUnit}
              labelText="Business Unit"
              showSelect
            />

            <FilterComponent
              optionsData={optionsReport}
              handleDropdown={handleReportAs}
              selectedVal={reportAs}
              labelText="Report as of"
            />

            <FilterComponent
              optionsData={optionsReport}
              handleDropdown={handleReportAs}
              selectedVal={reportAs}
              labelText="Report as of"
            />
          </div>
        </div>

        <div className="flex gap-2 m-2 justify-end">
          <button className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg border border-gray-300">
            <FaPlay /> Run Report
          </button>

          <button className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg border border-gray-300">
            <AiOutlineStop /> Clear Search
          </button>
        </div>
      </>
    )}
  </div>
  )
}


