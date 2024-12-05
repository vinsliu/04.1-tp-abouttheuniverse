const allPlanets = []; // Créer un tableau pour stocker les informations

async function getPlanetList() {
  // URL de l'api
  let uri = "https://swapi.dev/api/planets";
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
    // Affiche la liste des planètes
    displayPlanetList(allPlanets);
    // Affiche le nombre de planètes
    document.querySelector(
      "#planetCount"
    ).innerText = `${allPlanets.length} résultat(s)`;
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// Fonction pour afficher la liste des planètes
function displayPlanetList(planets = allPlanets) {
  const planetList = document.querySelector("#planetList ul");
  planetList.innerHTML = planets.map(createPlanetListItem).join("");
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
}

// Fonction pour créer un élément pour chaque planètes
function createPlanetListItem(planet) {
  return `
    <li>
        <a href='#' class='planetLink'>
            <p class='planetName'>${planet.name}</p> <p>${planet.terrain}</p>
        </a>
    </li>
  `;
}

// Fonction pour filtrer la liste
function populationFilter() {
  const popFilter = document.querySelector("#populationFilter").value;
  let filterOn;
  switch (popFilter) {
    case "1":
      filterOn = allPlanets.filter(
        (planet) =>
          parseInt(planet.population) >= 0 &&
          parseInt(planet.population) <= 100000
      );
      break;
    case "2":
      filterOn = allPlanets.filter(
        (planet) =>
          parseInt(planet.population) > 100000 &&
          parseInt(planet.population) <= 100000000
      );
      break;
    case "3":
      filterOn = allPlanets.filter(
        (planet) => parseInt(planet.population) > 100000000
      );
      break;
    default:
      filterOn = allPlanets;
      break;
  }
  displayPlanetList(filterOn);

  document.querySelector(
    "#planetCount"
  ).innerText = `${filterOn.length} résultat(s)`;
}

// Fonction pour afficher les données de la planète sélectionnée
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

// Lancer les scripts après chargement du contenu de la page
document.addEventListener("DOMContentLoaded", () => {
  getPlanetList();
  document
    .querySelector("#populationFilter")
    .addEventListener("change", populationFilter);
});
