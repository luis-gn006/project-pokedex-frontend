import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../index.css";
import About from "./About.jsx";
import Loading from "./Loading.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import InfoToolTip from "./InfoToolTips.jsx";
import PokemonIndividualCard from "./PokemonIndividualCard.jsx";
import Footer from "./Footer.jsx";
import { getAllPokemons, getPokemon } from "../utils/pokeApi.js";
import popupCross from "../images/popup__cross.svg";

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setSelectedPokemon] = useState(null);
  const [visiblePokemons, setVisiblePokemons] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        setIsLoading(true);
        const pokemonData = await getAllPokemons();
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemons();
  }, []);

  function playSound(pokemon) {
    const audio = new Audio(pokemon.sound);
    audio.volume = 0.5;
    audio.play();
  }

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const result = await getPokemon(searchTerm.toLowerCase());
      setSelectedPokemon(result);
      playSound(result);
    } catch (error) {
      setInfoErrorPopupOpen(true);
      console.error("No se pudo encontrar el Pokémon", error);
    }
  };

  const handleRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    try {
      const randomPokemon = await getPokemon(randomId);
      setSelectedPokemon(randomPokemon);
      playSound(randomPokemon);
    } catch (error) {
      console.error("No se pudo obtener el Pokémon aleatorio", error);
    }
  };

  const handleLoadMore = () => {
    setVisiblePokemons((prevVisible) => prevVisible + 20);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setInfoErrorPopupOpen(false)
    setSelectedPokemon(null);
  };

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key == "Escape" && handleClosePopup();
    });
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("pokemon__card") || e.target.classList.contains("popup")) {
          handleClosePopup();
      }
  });
  });

  const [isInfoErrorPopupOpen, setInfoErrorPopupOpen] = React.useState(false);

  return (
    <div className="page">
      <Header
              onSearch={handleSearch} 
              onSurprise={handleRandomPokemon}
              pokemons={pokemons}
              />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <Loading />
              ) : (
                <>
                
                <Main 
                pokemons={pokemons.slice(0, visiblePokemons)}
                onCardClick={handlePokemonClick}
              />
              <InfoToolTip
            name={"error"}
            message={"Ups, no pudimos encontrar ese Pokémon. Por favor, verifica que el nombre esté correctamente escrito o que el Pokémon exista."}
            icon={popupCross}
            onClose={handleClosePopup}
            isOpen={isInfoErrorPopupOpen}
            />
              {visiblePokemons < pokemons.length && (
                <button className="main__button" onClick={handleLoadMore}>Cargar más</button> 
              )}
                {pokemon && (
                <PokemonIndividualCard
                  pokemon={pokemon}
                  isOpen={isPopupOpen}
                  onClose={handleClosePopup}
                />
              )}
              </>
              )
              
            }
          />
          <Route
            path="/about"
            element={
              <>
              <About />
              </>
            }
          />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
