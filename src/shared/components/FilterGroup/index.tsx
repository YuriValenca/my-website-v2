import { ReactNode, useState } from "react";
import BackIcon from "../../assets/icons/backIcon.svg";
import { FilterGroupContent, FilterGroupHeader, FilterGroupWrapper } from "./style";

interface FilterGroupProps {
  title: string;
  children: ReactNode;
  isInitiallyOpen?: boolean;
}

const FilterGroup = ({ title, children, isInitiallyOpen = false }: FilterGroupProps) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <FilterGroupWrapper>
      <FilterGroupHeader isOpen={isOpen} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        {title}
        <BackIcon />
      </FilterGroupHeader>
      {isOpen && <FilterGroupContent>{children}</FilterGroupContent>}
    </FilterGroupWrapper>
  );
};

export default FilterGroup;
