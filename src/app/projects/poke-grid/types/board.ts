import { StaticImageData } from "next/image";
import { PokemonListItem } from "./pokemon";
import { PokemonTypeName } from "../helpers/typeExporter";

export type PokemonType = {
  name: PokemonTypeName;
  image: StaticImageData;
}

export type TypePair = [PokemonTypeName, PokemonTypeName];

export type PokeGridBoard = {
  rowTypes: PokemonType[];
  columnTypes: PokemonType[];
  cells: TypePair[][];
}

export type CellState =
  | { status: "empty" }
  | { status: "wrong"; pokemon: PokemonListItem }
  | { status: "correct"; pokemon: PokemonListItem };
