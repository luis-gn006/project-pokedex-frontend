import React from "react";
import PokemonGlobalCard from "./PokemonGlobalCard";

function Main({ pokemons, onCardClick }) {
    return (
        <>
            <div className="main">
                {pokemons.map((pokemon, index) => (
                    <PokemonGlobalCard
                    key={index}
                    id={pokemon.id}
                    name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    image={pokemon.image1}
                    sound={pokemon.sound}
                    stats={pokemon.stats}
                    onDoubleClick={() => onCardClick(pokemon)}
                    />
                ))}
            </div>
        </>
    );
}

export default Main;