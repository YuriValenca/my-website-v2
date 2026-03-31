"use client";

import { useRouter } from "next/navigation";
import { theme } from "@/shared/theme/theme";
import BackIcon from '../../../../../shared/assets/icons/backIcon.svg';
import { HeaderWrapper, ProjectInfo, ProjectName } from "./style";
import Button from "@/shared/components/Button";

const PokeGridHeader = () => {
  const router = useRouter();

  return (
    <HeaderWrapper>
      <div>
        <Button
          text="Home"
          bg="transparent"
          textColor={theme.colors.text.secondary}
          onClick={() => router.push("/")}
          icon={<BackIcon />}
          iconPosition="left"
        />
      </div>

      <ProjectInfo>
        <ProjectName>
          PokéGrid
        </ProjectName>
      </ProjectInfo>

      <div />
    </HeaderWrapper>
  );
};

export default PokeGridHeader;
