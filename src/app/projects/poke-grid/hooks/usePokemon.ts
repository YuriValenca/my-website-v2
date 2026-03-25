"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllPokemon } from "../api/pokemon";
import type { PokemonListItem } from "../types/pokemon";

export function useAllPokemon() {
  return useQuery<PokemonListItem[], Error>({
    queryKey: ["pokemon"],
    queryFn: () => getAllPokemon(),
  })
}
