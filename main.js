document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector('button[type="submit"]')
    .addEventListener("click", function () {
      const pokeName = document.getElementById("name").value.toLowerCase();
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then((response) => {
          if (!response.ok) throw new Error("El pokemón no ha sido encontrado");
          return response.json();
        })
        .then((data) => {
          displayPokemon(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});

//función para mostrar la carta con la descripción del pokemón.
function displayPokemon(pokemon) {
  const pokeDetailDiv = document.querySelector(".poke-detail");
  pokeDetailDiv.innerHTML = `
  <div class="container-poke-info">
  <center><h3>Nombre: ${pokemon.name}</h3></center>
      <br>
      <ul>
      <li>Experiencia base: ${pokemon.base_experience}.</li>
      <li>Altura: ${pokemon.height}.</li>
      <li>Peso: ${pokemon.weight}.</li>
      <li>Habilidades: ${pokemon.abilities
        .map((ability) => ability.ability.name)
        .join(", ")}</li>
        </ul>
      <center><img src="${pokemon.sprites.front_default}" alt="${
    pokemon.name
  }"></center>
      </div>
    `;
}
