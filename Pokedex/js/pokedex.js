const Pcard = document.querySelector('[data-image-card]');
const Pimagen = document.querySelector('[data-P-image]')
const Pnombre = document.querySelector('[data-P-nombre]');
const Pestadisticas = document.querySelector('[data-P-estadisticas]');
const Pmovimientos = document.querySelector('[data-P-movimientos]');
const Ptipo = document.querySelector('[data-P-tipo]');  


const Psearch = event =>{
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => infoP(response))  
        .catch(err => pokemonNoExiste())
}

const infoP = data => {
    const sprite = data.sprites.front_default;
    const { stats, types, moves } = data;
    Pnombre.textContent = data.name;
    Pnombre.style.color = 'black';
    Pimagen.setAttribute('src', sprite);
    renderPtypes(types);
    renderPstats(stats);
    renderPmovimientos(moves);
}

const renderPtypes = types => {
    Ptipo.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        Ptipo.appendChild(typeTextElement);
    });
}

const renderPstats = stats =>{
    Pestadisticas.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        Pestadisticas.appendChild(statElement);
    });
}

const renderPmovimientos = moves => {
    Pmovimientos.innerHTML = '';
    const moveElement = document.createElement("div");
    const moveElementNombre = document.createElement("div");
    let random = Math.floor(Math.random() * moves.length);
    moveElementNombre.textContent = moves[random].move.name;
    moveElement.appendChild(moveElementNombre);
    Pmovimientos.appendChild(moveElement);
}

const pokemonNoExiste = () => {
    alert("Pokemon no encontrado");
    pokemonNombre.innerHTML = ''
    pokemonImg.setAttribute('src', '');
    pokemonId.innerHTML = '';
    pokemonTipos.innerHTML = '';
    pokemonStats.innerHTML = '';
    pokemonMov.innerHTML = '';
}