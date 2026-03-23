"use client";

import { useState } from "react";
import { useAllPokemon } from "../../hooks/usePokemon";
import { typeExporter, typeImages } from "../../helpers/typeExporter";
import { PokeGridBoard, PokemonType, TypePair } from "../../types/board";
import { PokemonTypeName, POKEMON_TYPES } from "@/shared/constants/pokemonTypes";
import Instructions from "../Instructions";
import TypePill from "../TypePill";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import { PokeGridContainer, PokeGridContent, Title } from "./style"

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const handleCloseModal = () => setShowInstructionsModal(false);

  return (
    <PokeGridContainer>
      <Title>Today's puzzle:</Title>
      <PokeGridContent>
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 4 }, (_, col) => {
            if (row === 0 && col === 0) return <div key="corner" />;
            if (row === 0) return <TypePill key={`col-${col}`} type={board.columnTypes[col - 1]} />;
            if (col === 0) return <TypePill key={`row-${row}`} type={board.rowTypes[row - 1]} />;
            return <p key={`${row}-${col}`}>Selection cell</p>;
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
        onClick={() => setBoard(buildBoard())}
        text="New puzzle"
        textColor="#1d1b1d"
      />
    </PokeGridContainer>
  )
}

export default PokeGrid;
