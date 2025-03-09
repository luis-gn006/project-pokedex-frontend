import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import '../index.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { getAllPokemons, getPokemon } from "../utils/pokeApi.js";

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setSelectedPokemon] = useState(null);

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
      setSelectedPokemon(randomPokemon);
      console.log(randomPokemon); 
    } catch (error) {
      console.error("No se pudo obtener el Pokémon aleatorio", error);
    }
  };

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
              onSearch={handleSearch} 
              onSurprise={handleRandomPokemon}/>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
