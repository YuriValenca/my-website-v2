"use client";

import ScreenlogHeader from "./(components)/Header";
import { ScreenlogLayout } from "./layout-style";

interface ScreenlogLayoutProps {
  children: React.ReactNode;
}

const ScreenlogLayoutPage = ({ children }: ScreenlogLayoutProps) => {
  return (
    <ScreenlogLayout>
      <ScreenlogHeader />
      {children}
    </ScreenlogLayout>
  );
};

export default ScreenlogLayoutPage;
