export interface Pokemon {
  id: number;
  name: string;
  sprite: PokemonSprites;
  types: PokemonTypeSlot[];
  height: number;
  weight: number;
  // abilities: PokemonAbility[];
  // moves: PokemonMove[];
  // stats: PokemonStat[];
}

export interface PokemonListItem {
  name: string;
  url: string;
  id: string;
  image: string;
}

export interface PokemonSprites {
  front_default: string | null;
  other: {
    // API uses hyphen, so we need to wrap the key on quotes
    "official-artwork": {
      front_default: string | null;
    };
  };
}

export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
  };
}

// export interface PokemonAbility {
//   slot: number;
//   ability: {
//     name: string;
//   }
// }

// export interface PokemonMove {
//   move: {
//     name: string;
//   }
// }

// export interface PokemonStat {
//   base_stat: number;
//   stat: {
//     name: string;
//   }
// }
