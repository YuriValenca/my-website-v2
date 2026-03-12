"use client";

import { useAllPokemon } from "../../hooks/usePokemon";
import { PokeGridContainer } from "./style"

const PokeGrid = () => {
  const { data, isLoading, isError } = useAllPokemon();
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  console.log(data)
  return (
    <PokeGridContainer>

    </PokeGridContainer>
  )
}

export default PokeGrid;
