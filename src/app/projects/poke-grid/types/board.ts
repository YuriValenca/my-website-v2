import { StaticImageData } from "next/image";
import { PokemonTypeName } from "@/shared/constants/pokemonTypes";

export type PokemonType = {
  name: PokemonTypeName;
  image: StaticImageData;
  color: string;
}

export type TypePair = [PokemonTypeName, PokemonTypeName];

export type PokeGridBoard = {
  rowTypes: PokemonType[];
  columnTypes: PokemonType[];
  cells: TypePair[][];
}
