"use client";

import { usePathname, useRouter } from "next/navigation";
import { theme } from "@/shared/theme/theme";
import Button from "../Button";
import BackIcon from '../../assets/icons/backIcon.svg';
import { HeaderWrapper, ProjectInfo, ProjectName } from "./style";

const PROJECT_META: Record<string, { name: string; description: string }> = {
  "/projects/poke-grid": {
    name: "PokéGrid",
    description: "Find a Pokémon that matches both types",
  },
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const projectMeta = PROJECT_META[pathname];

  return (
    <HeaderWrapper>
      <div>
        {!isHome && (
          <Button
            text="Home"
            bg="transparent"
            textColor={theme.colors.text.secondary}
            onClick={() => router.push("/")}
            icon={<BackIcon />}
            iconPosition="left"
          />
        )}
      </div>

      <ProjectInfo>
        <ProjectName>
          {projectMeta ? projectMeta.name : "Yuri Valença"}
        </ProjectName>
      </ProjectInfo>

      <div />
    </HeaderWrapper>
  );
};

export default Header;
