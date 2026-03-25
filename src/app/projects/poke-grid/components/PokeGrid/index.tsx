"use client";

import { useState } from "react";
import { useAllPokemon } from "../../hooks/usePokemon";
import { typeExporter, typeImages } from "../../helpers/typeExporter";
import { CellState, PokeGridBoard, PokemonType, TypePair } from "../../types/board";
import { PokemonTypeName, POKEMON_TYPES } from "@/shared/constants/pokemonTypes";
import { Pokemon, PokemonListItem } from "../../types/pokemon";
import Instructions from "../Instructions";
import TypePill from "../TypePill";
import SelectionCell from "../SelectionCell";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import { PokeGridContainer, PokeGridContent, ScoreWrapper, Title } from "./style"
import { getPokemon } from "../../api/pokemon";

const buildPokemonType = (name: PokemonTypeName): PokemonType => ({
  name,
  image: typeImages[name],
  color: POKEMON_TYPES[name],
});

const buildBoard = (): PokeGridBoard => {
  const { rowTypes, columnTypes } = typeExporter.getBoardTypes();
  const cells: TypePair[][] = rowTypes.map(rowType =>
    columnTypes.map(columnType => [rowType, columnType])
  );

  return {
    rowTypes: rowTypes.map(buildPokemonType),
    columnTypes: columnTypes.map(buildPokemonType),
    cells,
  };
}

const PokeGrid = () => {
  const { data, isLoading, isError } = useAllPokemon();
  const [showInstructionsModal, setShowInstructionsModal] = useState(true);
  const [board, setBoard] = useState<PokeGridBoard>(() => buildBoard());
  const [cellStates, setCellStates] = useState<CellState[][]>(
    () => Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ status: "empty" })))
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  if (!data) return <p>Something went wrong fetching Pokémon, refresh the page to try again.</p>

  const handleCloseModal = () => setShowInstructionsModal(false);

  const validateGuess = (pair: TypePair, pokemon: Pokemon): boolean => {
    const guessTypes = pokemon.types.map((slot) => slot.type.name);
    const validate = pair.every(type => guessTypes.includes(type))
    return validate;
  }

  const handleGuess = async (row: number, column: number, pokemon: PokemonListItem) => {
    const pair = board.cells[row][column];
    const pokemonData = await getPokemon(pokemon.url);
    const isCorrect = validateGuess(pair, pokemonData);

    setCellStates(prev => {
      const updated = prev.map(res => [...res]);
      updated[row][column] = { status: isCorrect ? "correct" : "wrong", pokemon }
      return updated;
    });

    return isCorrect;
  }

  const userScore = () => (
    <ScoreWrapper>
      Your score:
      <p key="score">{cellStates.flat().filter(c => c.status === "correct").length} / 9</p>
    </ScoreWrapper>
  )

  return (
    <PokeGridContainer>
      <Title>Today's puzzle:</Title>
      <PokeGridContent>
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => {            
            if ((row === 0 && col === 0) || (col === 4 && row === 0)) return <div key="corner" />;
            if (col === 4 && row === 2) return userScore();
            if (col === 4) return <div key={`empty-${row}`} />;
            
            if (row === 0) return <TypePill key={`col-${col}`} type={board.columnTypes[col - 1]} />;
            if (col === 0) return <TypePill key={`row-${row}`} type={board.rowTypes[row - 1]} />;

            const cell = cellStates[row-1][col-1];
            return (
              <SelectionCell
                key={`${row}-${col}`}
                allPokemon={data}
                pair={board.cells[row-1][col-1]}
                onGuess={(pokemon) => handleGuess(row-1, col-1, pokemon)}
                solvedPokemon={cell.status === "correct" ? cell.pokemon : null}
              />
            )
          })
        )}
      </PokeGridContent>
      <Modal
        isVisible={showInstructionsModal}
        onClose={handleCloseModal}
        width="500px"
      >
        <Instructions
          onButtonClick={() => handleCloseModal()}
        />
      </Modal>
      <Button
        bg="#ebebeb"
          onClick={() => {
          setBoard(buildBoard());
          setCellStates(Array.from({ length: 3 }, () => 
            Array.from({ length: 3 }, () => ({ status: "empty" }))
          ));
        }}
        text="New puzzle"
        textColor="#1d1d1d"
      />
    </PokeGridContainer>
  )
}

export default PokeGrid;
