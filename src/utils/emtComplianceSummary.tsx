import { Fragment } from "react/jsx-runtime";
interface SummaryProps {
    link: string;
    label: string;
    content: string;
    splitText: string
}
export function emtComplianceSummary({ link, label = 'link', content = '', splitText = 'split text' }: SummaryProps) {
    const parts = content.split(splitText);
    return (
        <>
            {parts.map((part, i) => (
                <Fragment key={i}>
                    {part}
                    {i < parts.length - 1 && (
                        <a className="font-bold text-blue-300 no-underline hover:underline" target="_blank" href={link || '#'}>{label}</a>
                    )}
                </Fragment>
            ))}
        </>
    );
}