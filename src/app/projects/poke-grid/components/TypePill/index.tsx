
import Image from "next/image";
import { PokemonType } from "../../types/board";

interface TypePillProps {
  type: PokemonType;
}

const TypePill = ({ type }: TypePillProps) => {
  return (
    <Image
      src={type.image}
      alt={`${type.name} type`}
      width={100}
      style={{ display: 'block' }}
    />
  );
}

export default TypePill;