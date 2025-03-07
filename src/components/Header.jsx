import { useState } from 'react'
import headerLogo from '../images/header__logo.svg'
import headerSearch from '../images/header__search.png'


function Header() {

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
          />
            <button className="header__search_button">
              <img className="header__search_button-img" src={headerSearch} alt="boton de buscar" />
            </button>
        </div>
        <button className="header__sorprise_button">
          Sorprendeme
        </button>
        <a className="header__link" href="">Acerca del proyecto</a>
      </header>
    </>
  )
}

export default Header
