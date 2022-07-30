let divpokemons = document.querySelector('.divContenedorPokemons');
document.body.appendChild(divpokemons);
let divGif = document.querySelector('.divGif');
let charizard = document.querySelector('.fn-img_charizard');
let divLogo = document.querySelector('.div_btns'); 

//________________________________________________________
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
        pintarPokemons(data);
    });
}
let offset = 1;
let limit = 49;
let contadorClicks = 1;


function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset+limit; i++) {
        fetchPokemon(i);        
    }
}
//________________________________________________
function pintarPokemons(pokemon) {

    let card =document.createElement('div');
    card.classList.add('pokemon-block');

    let divImage = document.createElement('div');
    divImage.classList.add('divImage');
    
    let image = document.createElement('img');
    image.classList.add('imagen_pokemon')
    image.src = pokemon.sprites.other.dream_world.front_default;
    divImage.appendChild(image);

    let imageBlob = document.createElement('img');
    imageBlob.classList.add('imagen_pokemon_blob');
    imageBlob.setAttribute("src", 'assets/blob_blanca.png');
    divImage.appendChild(imageBlob);
    let nombrePokemon = document.createElement('p');
    nombrePokemon.classList.add('nombrePokemon');
    nombrePokemon.textContent = `${pokemon.name}`;

    let idPokemon = document.createElement('p');
    idPokemon.classList.add('id_pokemon')
    idPokemon.textContent = `Id: ${pokemon.id.toString().padStart(3,0)}`;
    
    card.appendChild(divImage);
    card.appendChild(nombrePokemon);
    card.appendChild(idPokemon);
    divpokemons.appendChild(card);
}
//_______________________________________________

function crearBotones() {
    let divBtnPag = document.createElement('div');
    divBtnPag.classList.add('btns_paginacion');

    let buttonPrev = document.createElement('button');
    buttonPrev.textContent = "Anterior";
    buttonPrev.classList.add('anterior');
    let buttonNext = document.createElement('button');
    buttonNext.textContent = "Siguiente";
    buttonNext.classList.add('siguiente');

    divBtnPag.appendChild(buttonPrev);
    divBtnPag.appendChild(buttonNext);

    document.body.appendChild(divBtnPag);
    
    buttonPrev.addEventListener("click", () => {
        contadorClicks--;
        offset -= 50;
        quitarAnteriores(divpokemons)
        fetchPokemons(offset, limit);
        if (offset < 49) {
            buttonPrev.remove();
        }
    });
    buttonNext.addEventListener("click", () => {
        contadorClicks++;       
        offset += 50;
        quitarAnteriores(divpokemons)
        fetchPokemons(offset, limit);
        if (offset == 100) {
            buttonNext.remove();
        } 
    });
}//__________________________________________________________
//ESTA FUNCION ES PARA QUE ME CARGUE LOS SIGUIENTE POKEMON BORRANDO LOS ANTERIORES
function quitarAnteriores(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
};

//_______________________________________________________________________
charizard.addEventListener("click", () => {
    divpokemons.innerHTML="";
    fetchPokemons(offset, limit);
    crearBotones();
})
//______________________________________________________________________
