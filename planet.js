const planetList = document.querySelector("#planetList ul");

async function getPlanetList() {
  let uri = "https://swapi.dev/api/planets";
  const allPlanets = [];

  try {
    while (uri) {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Network error!");
      }
      const data = await response.json();
      allPlanets.push(...data.results);
      uri = data.next;
    }
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
  } catch (error) {
    console.error("Erreur :", error);
  }
}

getPlanetList();
