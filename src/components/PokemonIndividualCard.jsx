import closeIcon from "../images/popup__close-icon.svg";
import pokeballImg from "../images/pokemon__global-pokeball.png";
import pokemonWeight from "../images/pokemon__weight.png";
import pokemonHeight from "../images/pokemon__height.png";
import { useState } from "react";

function PokemonIndividualCard({ pokemon, isOpen, onClose }) {
  if (!pokemon) {
    return null;
  }

  const [isImage1, setIsImage1] = useState(true);

  const typesString = pokemon.types
    .map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1))
    .join(", ");

  const weightInKg = (pokemon.weight / 10).toFixed(1);
  const heightInM = (pokemon.height / 10).toFixed(1);

  function playSound() {
    const audio = new Audio(pokemon.sound);
    audio.volume = 0.5;
    audio.play();
  }

  function toggleImage() {
    setIsImage1(!isImage1);
  }

  return (
    <div
      className={`pokemon__card pokemon__card-${pokemon.name} ${isOpen ? "popup__opened" : ""}`}
    >
      <div className="pokemon__card-container">
        <div className="pokemon__card-header">
          <img className="pokemon__card_logo" src={pokeballImg} alt="imagen de pokeball" />
          <h3 className="pokemon__card_number">{`No. ${pokemon.id}`}</h3>
          <h3 className="pokemon__card_name">{`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>
        </div>
        <img
          src={isImage1 ? pokemon.image1 : pokemon.image2}
          alt={`imagen de ${pokemon.name}`}
          className="pokemon__card-image"
          onClick={playSound}
        />
        <button onClick={toggleImage} className="pokemon__card_shiny-button">Shiny</button>
        <img
          src={closeIcon}
          alt="icono de cierre"
          className="pokemon__close-button"
          onClick={onClose}
        />
        <p className="pokemon__card-types">{`${typesString}`}</p>
        <div className="pokemon__card-info">
          <div className="pokemon__weight">
            <img
              src={pokemonWeight}
              alt={`imagen de bascula`}
              className="pokemon__weight-img"
            />
            <p className="pokemon__card-weight">{`${weightInKg} kg`}</p>
          </div>
          <div className="pokemon__height">
            <img
              src={pokemonHeight}
              alt={`imagen de regla`}
              className="pokemon__height-img"
            />
            <p className="pokemon__card-height">{`${heightInM} m`}</p>
          </div>
        </div>
        <ul className="pokemon__card-stats">
          <li>HP: {pokemon.stats.hp || "N/A"}</li>
          <li>Attack: {pokemon.stats.attack || "N/A"}</li>
          <li>Defense: {pokemon.stats.defense || "N/A"}</li>
          <li>Speed: {pokemon.stats.speed || "N/A"}</li>
        </ul>
      </div>
    </div>
  );
}

export default PokemonIndividualCard;