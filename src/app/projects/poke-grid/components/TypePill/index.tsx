import { PokemonType } from "../../types/board";
import { PillImage } from "./style";

interface TypePillProps {
  type: PokemonType;
}

const TypePill = ({ type }: TypePillProps) => {
  return (
    <PillImage
      src={type.image}
      alt={`${type.name} type`}
    />
  );
}

export default TypePill;