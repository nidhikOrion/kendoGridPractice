import { FaInfoCircle } from "react-icons/fa";
import { emtComplianceSummary } from "../utils/emtComplianceSummary";
import { Fragment } from "react/jsx-runtime";

const summary2025 = [
  emtComplianceSummary({
    link: 'https://production.orion.fi/493e39/globalassets/investors/reports-and-presentations/2024/orion-financial-statement-documents-2024.pdf',
    label: '2025 landing page playbook',
    splitText: "link_text",
    content: 'Please see the link_text for more information on the metrics monitoring program'
  }),
  emtComplianceSummary({
    link: 'https://www.google.com/2025',
    label: 'BU Engagement Metrics',
    splitText: "link_text",
    content: 'Please see the link_text for more information on the engagement Metrics & monitoring'
  }),
  emtComplianceSummary({
    link: 'https://en.wikipedia.org/wiki/Orion_(constellation)',
    label: '2025 EMLC',
    splitText: "link_text",
    content: 'Please see the link_text for more information on the Engagement Manangement Lifecycle.'
  })
];

const summary2024 = [
  emtComplianceSummary({
    link: 'https://production.orion.fi/493e39/globalassets/investors/reports-and-presentations/2024/orion-financial-statement-documents-2024.pdf',
    label: '2024 landing page playbook',
    splitText: "link_text",
    content: 'Please see the link_text for more information on the metrics monitoring program'
  }), 
  emtComplianceSummary({
    link: 'https://google.com/2024',
    label: 'BU Engagement Metrics',
    splitText: "link_text",
    content: 'Please see the link_text for more information on the engagement Metrics & monitoring'
  })];

interface LandingSummaryProps {
  yearField: string | number;
}

export default function LandingPageSummary({ yearField }: LandingSummaryProps) {
  switch (String(yearField)) {
    case "2025":
      return <>
        {summary2025.map((item2025, i) => <Fragment  key={i}>
          <p className="flex gap-2"> <FaInfoCircle className="mt-1" />
          {item2025}</p>
        </Fragment>
        )}
      </>
    case "2024":
      return <>
        {summary2024.map((item2024, i) => <Fragment  key={i}>
          <p key={i} className="flex gap-2"> <FaInfoCircle className="mt-1" />{item2024}</p>
        </Fragment>
        )}
      </>
    default:
      return <p>This year no summary</p>
  }
}
