import { ReactNode } from "react";
import { SectionTitle, SectionWrapper } from "./style";

interface DetailSectionProps {
  title: string;
  children: ReactNode;
}

const DetailSection = ({ title, children }: DetailSectionProps) => (
  <SectionWrapper>
    <SectionTitle>{title}</SectionTitle>
    <hr />
    {children}
  </SectionWrapper>
);

export default DetailSection;
