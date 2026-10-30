import { ReactNode } from "react";
import { SectionHeader, SectionTitle, SectionWrapper } from "./style";

interface DetailSectionProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

const DetailSection = ({ title, actions, children }: DetailSectionProps) => (
  <SectionWrapper>
    <SectionHeader>
      <SectionTitle>{title}</SectionTitle>
      {actions}
    </SectionHeader>
    <hr />
    {children}
  </SectionWrapper>
);

export default DetailSection;
