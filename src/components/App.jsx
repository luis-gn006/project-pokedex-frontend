import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import '../index.css'
import Header from './Header.jsx'
import { getAllPokemons } from "../utils/pokeApi.js";

function App() {

  const [pokemons, setPokemons] = useState([]);

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

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
