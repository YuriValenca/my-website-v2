import { Pokemon } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon"

async function getAllPokemon(): Promise<Pokemon[]> {
  const res = await fetch(`${BASE_URL}?limit=10000`);

  if (!res.ok) {
    throw new Error (`Failed to fetch pokemon: ${res.status}`)
  }
  return res.json() as Promise<Pokemon[]>;
}

async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/${name}`);

  if (!res.ok) {
    throw new Error (`Failed to fetch pokemon: ${res.status}`)
  }
  return res.json() as Promise<Pokemon>;
}

export {
  getAllPokemon,
  getPokemon,
}
