import { POKEMON_TYPES, PokemonTypeName } from '@/shared/constants/pokemonTypes'
import { StaticImageData } from 'next/image'
import { removeItemFromList } from '@/shared/utils/arrayUtils'

import bugImg from '../../../../shared/assets/images/bug.png'
import darkImg from '../../../../shared/assets/images/dark.png'
import dragonImg from '../../../../shared/assets/images/dragon.png'
import electricImg from '../../../../shared/assets/images/electric.png'
import fairyImg from '../../../../shared/assets/images/fairy.png'
import fightingImg from '../../../../shared/assets/images/fighting.png'
import fireImg from '../../../../shared/assets/images/fire.png'
import flyingImg from '../../../../shared/assets/images/flying.png'
import ghostImg from '../../../../shared/assets/images/ghost.png'
import grassImg from '../../../../shared/assets/images/grass.png'
import groundImg from '../../../../shared/assets/images/ground.png'
import iceImg from '../../../../shared/assets/images/ice.png'
import normalImg from '../../../../shared/assets/images/normal.png'
import poisonImg from '../../../../shared/assets/images/poison.png'
import psychicImg from '../../../../shared/assets/images/psychic.png'
import rockImg from '../../../../shared/assets/images/rock.png'
import steelImg from '../../../../shared/assets/images/steel.png'
import waterImg from '../../../../shared/assets/images/water.png'

export const typeImages: Record<PokemonTypeName, StaticImageData> = {
  bug: bugImg,
  dark: darkImg,
  dragon: dragonImg,
  electric: electricImg,
  fairy: fairyImg,
  fighting: fightingImg,
  fire: fireImg,
  flying: flyingImg,
  ghost: ghostImg,
  grass: grassImg,
  ground: groundImg,
  ice: iceImg,
  normal: normalImg,
  poison: poisonImg,
  psychic: psychicImg,
  rock: rockImg,
  steel: steelImg,
  water: waterImg,
};

// Type combinations not yet used on a Canon Pokemon
// Would block the user from ever finishing the game
const INVALID_TYPE_COMBINATIONS: [PokemonTypeName, PokemonTypeName][] = [
  ["normal", "ice"],
  ["normal", "bug"],
  ["normal", "rock"],
  ["normal", "steel"],
  ["fairy", "fire"],
  ["fairy", "ground"],
  ["ice", "poison"],
  ["bug", "dragon"],
  ["rock", "ghost"],
];

// Board will always be 3x3
const BOARD_SIZE = 3;

type BoardTypes = {
  rowTypes: PokemonTypeName[];
  columnTypes: PokemonTypeName[];
};

const isTypeCombinationValid = (
  type1: PokemonTypeName,
  type2: PokemonTypeName
): boolean => {
  return !INVALID_TYPE_COMBINATIONS.some(
    ([invalidFirst, invalidSecond]) =>
      (invalidFirst === type1 && invalidSecond === type2) ||
      (invalidSecond === type1 && invalidFirst === type2)
  );
};

const getAllTypes = (): PokemonTypeName[] => Object.keys(POKEMON_TYPES) as PokemonTypeName[];

const pickRandomType = (types: PokemonTypeName[]): PokemonTypeName => {
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};

const getRandomUniqueTypes = (excludeTypes: PokemonTypeName[] = []): PokemonTypeName[] => {
  const available = getAllTypes().filter(type => !excludeTypes.includes(type));

  return Array.from({ length: BOARD_SIZE }).reduce<{
    selected: PokemonTypeName[];
    remaining: PokemonTypeName[];
  }>(
    ({ selected, remaining }) => {
      const picked = pickRandomType(remaining);
      return {
        selected: [...selected, picked],
        remaining: removeItemFromList(remaining, picked),
      };
    },
    { selected: [], remaining: available }
  ).selected;
};

const isBoardValid = (rowTypes: PokemonTypeName[], colTypes: PokemonTypeName[]): boolean =>
  rowTypes.every(rowType =>
    colTypes.every(colType => isTypeCombinationValid(rowType, colType))
  );

const getBoardTypes = (): BoardTypes => {
  const rowTypes = getRandomUniqueTypes();
  const colTypes = getRandomUniqueTypes(rowTypes);

  if (!isBoardValid(rowTypes, colTypes)) return getBoardTypes();

  return { rowTypes, columnTypes: colTypes };
};

export const typeExporter = {
  getBoardTypes,
  typeImages,
};
