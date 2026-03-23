"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllPokemon, getPokemon } from "../api/pokemon";
import type { Pokemon, PokemonListItem } from "../types/pokemon";

export function usePokemon(name: string) {
  return useQuery<Pokemon, Error>({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
    enabled: Boolean(name),
  });
}

export function useAllPokemon() {
  return useQuery<PokemonListItem[], Error>({
    queryKey: ["pokemon"],
    queryFn: () => getAllPokemon(),
  })
}
