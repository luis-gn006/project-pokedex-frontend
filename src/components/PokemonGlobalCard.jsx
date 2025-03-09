import pokeballImg from '../images/pokemon__global-pokeball.png'

function PokemonGlobalCard({ name, image, id, onClick }) {
    return (
        <div className="pokemon__global">
            <div className="pokemon__global_info">
                <img className='pokemon__global_logo' src={pokeballImg} alt="imagen de pokeball" />
                <h3 className="pokemon__global_number">{`No. ${id}`}</h3>
                <h3 className="pokemon__global_name">{`${name}`}</h3>
            </div>
            <img
                className="pokemon__global_img"
                src={image}
                alt={`${name}-${id}`}
                onClick={onClick}
            />
        </div>
    );
}
    
export default PokemonGlobalCard;