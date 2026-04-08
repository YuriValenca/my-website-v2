import { useState } from "react"
import { Option } from "../../../types/screenlog"
import { HeaderOptionWrapper, OptionItem, OptionsList } from "./style"

interface HeaderOptionsProps {
  category: string,
  options: Option[],
}

const HeaderOption = ({
  category,
  options,
}: HeaderOptionsProps) => {
  const [showOptions, setShowOptions] = useState(false);


  return(
    <HeaderOptionWrapper
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {category}
      {showOptions && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem href={option.to} target="_self" key={option.text}>
              {option.text}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </HeaderOptionWrapper>
  )
}

export default HeaderOption;
