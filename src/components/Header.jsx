import { useState } from 'react'
import headerLogo from '../images/header__logo.svg'
import headerSearch from '../images/header__search.png'
import { Link } from "react-router-dom";


function Header({ onSearch}) {

  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    const item = e.target.value;
    setSearchItem(item);
    onSearch(item);
  };

  const handleSearch = () => {
    onSearch(searchItem);
  };

  const handleSorprisme = () => {
    let AleatNum = Math.floor(Math.random() * 151) + 1;
    console.log(AleatNum);
  };

  return (
    <>
      <header className="header">
        <div className="header__container_logo">
          <img src={headerLogo} alt="imagen del logo de Pokemon" className="header__logo" />
        </div>
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
        </div>
        <button className="header__sorprise_button" onClick={handleSorprisme}>
          Sorprendeme
        </button>
        <Link className="header__link" to="/about">
        Acerca del proyecto
        </Link>
      </header>
    </>
  )
}

export default Header
