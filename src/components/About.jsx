function About() {
    return (
        <>
            <div className="about">
                <h1 className="about__title">Acerca del proyecto</h1>
                    <h4 className="about__text">
                    Esta página ha sido desarrollada como una Pokédex interactiva para
                    poner en práctica mis habilidades de frontend. El proyecto utiliza
                    la metodología BEM junto con HTML, CSS, JavaScript y React. Además, 
                    está conectada a la API de{' '}
                        <a href="https://pokeapi.co" className="about__link" target="_blank">
                            PokeAPI
                        </a>{' '}
                    para ofrecer información en tiempo real sobre diferentes Pokémon.
                    </h4>
                    <h2 className="about__subtitle">Funciones de la pokédex</h2>
                    <h4 className="about__text">
                    La página cuenta con un diseño responsivo que se adapta desde 320px 
                    hasta 10280px, aunque no presenta problemas en resoluciones mayores. 
                    La barra de búsqueda permite ingresar el nombre o el número de Pokédex 
                    de cualquier Pokémon, además de proporcionar sugerencias basadas en lo que se escribe. 
                    También puedes presionar el botón "¡Sorpréndeme!", el cual mostrará un Pokémon al azar.
                    </ h4>
                    <h4 className="about__text_ending">
                    ¡Espero que disfruten tanto esta página como yo disfruté haciéndola!
                    </h4>
            </div>
        </>
    );
}

export default About;