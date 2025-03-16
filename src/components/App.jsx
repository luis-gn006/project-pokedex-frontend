import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import '../index.css';
import Header from './Header.jsx';
import Main from './Main.jsx';
import PokemonIndividualCard from "./PokemonIndividualCard.jsx";
import Footer from './Footer.jsx';
import { getAllPokemons, getPokemon } from "../utils/pokeApi.js";

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setSelectedPokemon] = useState(null);
  const [visiblePokemons, setVisiblePokemons] = useState(30);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const pokemonData = await getAllPokemons();
        setPokemons(pokemonData);
        console.log(pokemonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getPokemons();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const result = await getPokemon(searchTerm.toLowerCase());
      setSelectedPokemon(result);
      console.log(result); 
    } catch (error) {
      console.error("No se pudo encontrar el Pokémon", error);
    }
  };

  const handleRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    try {
      const randomPokemon = await getPokemon(randomId);
      console.log(randomPokemon); 
      setSelectedPokemon(randomPokemon);
    } catch (error) {
      console.error("No se pudo obtener el Pokémon aleatorio", error);
    }
  };

  const handleLoadMore = () => {
    setVisiblePokemons((prevVisible) => prevVisible + 32);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    console.log(pokemon)
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="page">
      <Header
              onSearch={handleSearch} 
              onSurprise={handleRandomPokemon}/>
        <Routes>
          <Route
            path="/"
            element={
              <>
                
                <Main 
                pokemons={pokemons.slice(0, visiblePokemons)}
                onCardClick={handlePokemonClick}
              />
              {visiblePokemons < pokemons.length && (
                <button onClick={handleLoadMore}>Cargar más</button> 
              )}
                {pokemon && (
                <PokemonIndividualCard
                  pokemon={pokemon}
                  isOpen={isPopupOpen}
                  onClose={handleClosePopup}
                />
              )}
              </>
            }
          />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
