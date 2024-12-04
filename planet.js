const planetList = document.querySelector("#planetList ul");

async function getPlanetList() {
  // URL de l'api
  let uri = "https://swapi.dev/api/planets";
  //   Créer un tableau pour stocker la liste des planètes
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
    planetList.innerHTML += allPlanets
      .map(
        (planet) => `
        <li>
            <a href='#'>
                <p>${planet.name}</p> <p>${planet.terrain}</p>
            </a>
        </li>`
      )
      .join("");

    const response = await fetch(uri);
    const data = await response.json();
    document.querySelector(
      "#planetCount"
    ).innerHTML += `${data.count} résultat(s)`;
  } catch (error) {
    console.error("Erreur :", error);
  }
}

async function getSelectedPlanet() {
  let uri = "https://swapi.dev/api/planets";
}

getPlanetList();
