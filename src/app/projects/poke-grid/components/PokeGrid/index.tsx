"use client";

import { useEffect, useState } from "react";
import { useAllPokemon } from "../../hooks/usePokemon";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { PokemonTypeName, typeExporter, typeImages } from "../../helpers/typeExporter";
import { CellState, PokeGridBoard, PokemonType, TypePair } from "../../types/board";
import { Pokemon, PokemonListItem } from "../../types/pokemon";
import { getPokemon } from "../../api/pokemon";
import Instructions from "../Instructions";
import TypePill from "../TypePill";
import SelectionCell from "../SelectionCell";
import EndGameContent from "../EndGame";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import { PokeGridContainer, PokeGridContent, ScoreWrapper, Title } from "./style"
import { theme } from "@/shared/theme/theme";

const buildPokemonType = (name: PokemonTypeName): PokemonType => ({
  name,
  image: typeImages[name],
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
  const [showModal, setShowModal] = useState({
    instructions: true,
    endGame: false,
  });
  const [board, setBoard] = useState<PokeGridBoard>(() => buildBoard());
  const [cellStates, setCellStates] = useState<CellState[][]>(
    () => Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ status: "empty" })))
  );

  const isMobile = useBreakpoint("md");

  const handleCloseModal = (key: keyof typeof showModal) => setShowModal(prev => ({ ...prev, [key]: false }));
  const handleOpenModal = (key: keyof typeof showModal) => setShowModal(prev => ({ ...prev, [key]: true }));

  const currentScore = cellStates.flat().filter(c => c.status === "correct").length;

  const validateGuess = (pair: TypePair, pokemon: Pokemon): boolean => {
    const guessTypes = pokemon.types.map((slot) => slot.type.name);
    const validate = pair.every(type => guessTypes.includes(type))
    // return validate;
    return true;
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

  useEffect(() => {
    if (currentScore === 9) {
      handleOpenModal("endGame")
    }
  }, [currentScore])

  const rebuildBoard = () => {
    setBoard(buildBoard());
    setCellStates(Array.from({ length: 3 }, () => 
      Array.from({ length: 3 }, () => ({ status: "empty" }))
    ));
  }
  
  const userScore = () => (
    <ScoreWrapper key="user-score" mobile={isMobile}>
      Your score:
      <p key="score"> {currentScore} / 9</p>
    </ScoreWrapper>
  )

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  if (!data) return <p>Something went wrong fetching Pokémon, refresh the page to try again.</p>

  return (
    <PokeGridContainer>
      <Title>Today's puzzle:</Title>
      <PokeGridContent>
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: isMobile ? 4 : 5 }, (_, col) => {            
            if ((row === 0 && col === 0) || (col === 4 && row === 0)) return <div key={`corner-${row}${col}`} />;
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
      {isMobile && userScore()}
      <Button
        bg={theme.colors.neutral.gray100}
        onClick={() => rebuildBoard()}
        text="New puzzle"
        textColor={theme.colors.text.dark}
      />
      <Modal
        isVisible={showModal.instructions}
        onClose={() => handleCloseModal("instructions")}
        width={isMobile ? "90%" : "500px"}
        title="How to play"
      >
        <Instructions
          onButtonClick={() => handleCloseModal("instructions")}
        />
      </Modal>
      <Modal
        isVisible={showModal.endGame}
        onClose={() => handleCloseModal("endGame")}
        width={isMobile ? "90%" : "500px"}
        title="Congratulations! You caught all the Pokemon!"
      >
        <EndGameContent
          onNewGameClick={() => {
            rebuildBoard()
            handleCloseModal("endGame")
          }}
          seeBoardClick={() => handleCloseModal("endGame")}
        />
      </Modal>
    </PokeGridContainer>
  )
}

export default PokeGrid;
