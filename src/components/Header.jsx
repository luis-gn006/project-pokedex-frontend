import { useState } from 'react';
import { useEffect } from 'react';
import headerLogo from '../images/header__logo.svg';
import headerSearch from '../images/header__search.png';
import { Link, useLocation } from "react-router-dom";

function Header({ onSearch, onSurprise, pokemons }) {
  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const item = e.target.value;
    setSearchItem(item);

    const filteredSuggestions = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(item.toLowerCase())
    );
    setSuggestions(filteredSuggestions); 
  };

  const handleSearch = () => {
    onSearch(searchItem);
  };

  const handleSurprise = () => {
    onSurprise();
  };

  const handleSuggestionClick = (pokemonName) => {
    setSearchItem(pokemonName);
    onSearch(pokemonName);
    setSuggestions([]);
  };

  const location = useLocation();
  useEffect(() => {}, [location]);

  return (
    <>
      <header className="header">
        <div className="header__container_logo">
          <img src={headerLogo} alt="imagen del logo de Pokemon" className="header__logo" />
        </div>
        {location.pathname == "/" && (
          <>
            <div className="header__container_search">
          <input
            className="header__search_input"
            placeholder="Busca tu pokemon"
            value={searchItem}
            onChange={handleInputChange}
          />
          <button className="header__search_button" onClick={handleSearch}>
            <img className="header__search_button-img" src={headerSearch} alt="boton de buscar" />
          </button>
          {suggestions.length > 0 && (
            <ul className="header__search-suggestions">
              {suggestions.map((pokemon) => (
                <li
                  key={pokemon.name}
                  onClick={() => handleSuggestionClick(pokemon.name)}
                  className='header__search-suggestion'
                >
                  {pokemon.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="header__sorprise_button" onClick={handleSurprise}>
        ¡Sorpréndeme!
        </button>
          <Link className="header__link" to="/about">
          Acerca del proyecto
        </Link>
          </>
        )}
        {location.pathname == "/about" && (
          <Link className="header__link" to="/">
          Pokédex
        </Link>
        )}        
      </header>
    </>
  );
}

export default Header;
