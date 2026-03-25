import { useMemo, useState } from "react";
import { TypePair } from "../../types/board"
import { PokemonListItem } from "../../types/pokemon"
import Modal from "@/shared/components/Modal";
import Input from "@/shared/components/Input";
import { capitalizeString } from "@/shared/utils/stringUtils";
import { PairTypes, SelectionCellModalArea, SolvedPokemonImage, SuggestionItem, SuggestionPokemonImage, SuggestionsInputWrapper, SuggestionsWrapper } from "./style";

const MIN_CHARS = 3;
const NO_RESULTS_MESSAGE = "No Pokémon fits your search";
const WRONG_GUESS_MESSAGE = "This Pokémon doesn't fit these types, try again!";

interface SelectionCellProps {
  allPokemon: PokemonListItem[],
  pair: TypePair,
  onGuess: (pokemon: PokemonListItem) => Promise<boolean>;
  solvedPokemon: PokemonListItem | null;
}

const SelectionCell = ({
  allPokemon,
  pair,
  onGuess,
  solvedPokemon,
}: SelectionCellProps) => {
  const [openSelectionModal, setOpenSelecionModal] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [inputError, setInputError] = useState({ error: false, message: "" });

  const suggestions = useMemo(() => {
    if (userGuess.length < MIN_CHARS) return [];
    return allPokemon.filter(pokemon => pokemon.name.includes(userGuess.toLowerCase()));
  }, [userGuess, allPokemon]);

  const showNoResults = userGuess.length >= MIN_CHARS && suggestions.length === 0;

  const handleCloseModal = () => {
    setOpenSelecionModal(false);
    setUserGuess("");
    setInputError({ error: false, message: "" });
  };

  const handleSelection = async (pokemon: PokemonListItem) => {
    const isCorrect = await onGuess(pokemon);
    if (!isCorrect) {
      setInputError({ error: true, message: WRONG_GUESS_MESSAGE });
    }
    if (isCorrect) handleCloseModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions[0]) {
      handleSelection(suggestions[0]);
    }
  };

  if (solvedPokemon) {
    return (
      <SelectionCellModalArea solved>
        <SolvedPokemonImage
          src={solvedPokemon.image}
          alt={solvedPokemon.name + " image"}
        />
      </SelectionCellModalArea>
    )
  }

  return (
    <SelectionCellModalArea onClick={() => setOpenSelecionModal(true)}>
      <Modal
        position="top"
        isVisible={openSelectionModal}
        onClose={handleCloseModal}
        width="550px"
        title="Make your guess!"
      >
        <PairTypes>
          {pair.map(item => capitalizeString(item)).join("/")}
        </PairTypes>
        <SuggestionsInputWrapper>
          <Input
            onChange={(e) => {
              setUserGuess(e.target.value);
              setInputError({ error: false, message: "" });
            }}
            onKeyDown={handleKeyDown}
            value={userGuess}
            placeholder="Type your guess here"
            error={inputError.error || showNoResults}
            errorMessage={showNoResults ? NO_RESULTS_MESSAGE : inputError.message}
          />
          {suggestions.length > 0 && (
            <SuggestionsWrapper>
              {suggestions.map((pokemon) => (
                <SuggestionItem
                  key={pokemon.id}
                  onClick={() => handleSelection(pokemon)}
                >
                  <SuggestionPokemonImage
                    src={pokemon.image}
                    alt={pokemon.name + " image"}
                  />
                  {capitalizeString(pokemon.name)}
                </SuggestionItem>
              ))}
            </SuggestionsWrapper>
          )}
        </SuggestionsInputWrapper>
      </Modal>
    </SelectionCellModalArea>
  );
};

export default SelectionCell;
