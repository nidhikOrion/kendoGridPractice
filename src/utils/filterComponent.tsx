import { Fragment, type ChangeEvent } from "react"

interface FilterProps {
    optionsData: string[];
    handleDropdown: (e: ChangeEvent<HTMLSelectElement>) => void
    selectedVal: string | number | undefined;
    labelText: string;
    showSelect?: boolean;
    classNameField?: string
}

export default function FilterComponent({ optionsData = [""], handleDropdown, selectedVal = "", labelText = "Label", showSelect = false, classNameField = "flex" }: FilterProps) {
    return (
        <><div className={classNameField}>
            <p className="p-2 border-2 border-black/20 w-[20rem] rounded-lg min-w-[5rem] font-semibold">{labelText}</p>
            <select name="selectedVal" onChange={handleDropdown} value={selectedVal} className="border border-2  border-black/20 w-[10rem] rounded-lg ml-4 bg-gray-100 min-w-[2.5rem">
                {showSelect && <option value={""}>--Select--</option>}
                {optionsData && optionsData.map((optionVal, i) => <Fragment key={i}>
                    <option value={optionVal}>{optionVal}</option>
                </Fragment>
                )}
            </select>
        </div>
        </>
    )
}
