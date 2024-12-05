// Sélectionner les éléments DOM fréquemment utilisés
const planetListElement = document.querySelector("#planetList ul");
const planetCountElement = document.querySelector("#planetCount");
const moreButton = document.querySelector("#moreBtn");

// Fonction pour récupérer la liste des planètes
async function fetchPlanetList() {
  const allPlanets = [];
  let apiURL = "https://swapi.dev/api/planets";

  try {
    while (apiURL) {
      const response = await fetch(apiURL);
      if (!response.ok)
        throw new Error(`Erreur réseau: ${response.statusText}`);

      const data = await response.json();
      allPlanets.push(...data.results);
      apiURL = data.next;
    }
    return allPlanets;
  } catch (error) {
    console.error("Erreur :", error);
    displayError("Impossible de charger les planètes. Veuillez réessayer.");
    return [];
  }
}

// Afficher la liste des planètes
function displayPlanetList(planets) {
  if (planets.length === 0) {
    displayError("Aucune planète trouvée.");
    return;
  }

  const planetHTML = planets
    .map(
      (planet) => `
      <li>
        <a class="planetLink" data-planet="${planet.name}">
          <p class="planetName">${planet.name}</p>
          <p>${planet.terrain || "Terrain inconnu"}</p>
        </a>
      </li>`
    )
    .join("");
  planetListElement.innerHTML = planetHTML;

  planetCountElement.innerText = `${planets.length} résultat(s)`;

  attachPlanetClickHandlers(planets);
}

// Afficher les détails de la planète sélectionnée
function displayPlanetDetails(planet) {
  const fields = {
    planetName: planet.name,
    population: `Population : ${planet.population || "Inconnu"}`,
    diameter: `Diamètre <br> ${planet.diameter || "Inconnu"}`,
    climate: `Climat <br> ${planet.climate || "Inconnu"}`,
    gravity: `Gravité <br> ${planet.gravity || "Inconnu"}`,
    terrain: `Terrain <br> ${planet.terrain || "Inconnu"}`,
  };

  Object.entries(fields).forEach(([id, value]) => {
    document.querySelector(`#${id}`).innerHTML = value;
  });

  moreButton.style.display = "block";
}

// Attacher les gestionnaires de clics aux boutons
function attachPlanetClickHandlers(planets) {
  const planetLinks = document.querySelectorAll(".planetLink");

  planetLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const planetName = e.currentTarget.dataset.planet;
      const planet = planets.find((p) => p.name === planetName);
      if (planet) {
        displayPlanetDetails(planet);
      } else {
        console.warn(`Planète introuvable : ${planetName}`);
      }
    });
  });
}

// Afficher un message d'erreur à l'utilisateur
function displayError(message) {
  planetListElement.innerHTML = `<li class="error">${message}</li>`;
}

// Fonction principale exécutée au chargement
document.addEventListener("DOMContentLoaded", async () => {
  const planets = await fetchPlanetList();
  displayPlanetList(planets);
});
