const planetList = document.querySelector("#planetList ul");
const selectedPlanet = document.querySelector("#list li a");

async function getPlanetList() {
  // URL de l'api
  let uri = "https://swapi.dev/api/planets";
  // Créer un tableau pour stocker la liste des planètes
  const allPlanets = [];
  // Effectuer la connexion
  try {
    // Boucle pour récupérer les informations dans chaque pages
    while (uri) {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Network error!");
      }
      const data = await response.json();
      allPlanets.push(...data.results);
      uri = data.next;
    }
    // Affiche les informations pour chaque planètes
    planetList.innerHTML += allPlanets.map(createPlanetListItem).join("");

    document.querySelector(
      "#planetCount"
    ).innerText = `${allPlanets.length} résultat(s)`;

    const planetLink = document.querySelectorAll(".planetLink");
    planetLink.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const planetName = e.target
          .closest("a")
          .querySelector(".planetName").innerText;
        document.querySelector("#moreBtn").style.display = "block";

        const planet = allPlanets.find((p) => p.name === planetName);
        if (planet) {
          getSelectedPlanet(planet);
        }
      });
    });
  } catch (error) {
    console.error("Erreur :", error);
  }
}

function createPlanetListItem(planet) {
  return `
    <li>
        <a href='#' class='planetLink'>
            <p class='planetName'>${planet.name}</p> <p>${planet.terrain}</p>
        </a>
    </li>
  `;
}

function getSelectedPlanet(planet) {
  document.querySelector("#planetName").innerText = `${planet.name}`;
  document.querySelector(
    "#population"
  ).innerHTML = `Population : ${planet.population}`;
  document.querySelector(
    "#diameter"
  ).innerHTML = `Diamètre <br> ${planet.diameter}`;
  document.querySelector(
    "#climate"
  ).innerHTML = `Climat <br> ${planet.climate}`;
  document.querySelector(
    "#gravity"
  ).innerHTML = `Gravité <br> ${planet.gravity}`;
  document.querySelector(
    "#terrain"
  ).innerHTML = `Terrain <br> ${planet.terrain}`;
}

document.addEventListener("DOMContentLoaded", () => {
  getPlanetList();
});
