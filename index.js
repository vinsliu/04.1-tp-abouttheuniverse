const personCount = document.querySelector("#person");
const vehiculeCount = document.querySelector("#vehicule");
const planetCount = document.querySelector("#planet");

async function getDisplayCount(url, element) {
  element.innerText = "Chargement...";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network error !");
    }
    const data = await response.json();
    element.innerText = `${data.count}`;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const counters = [
    { url: "https://swapi.dev/api/people", element: personCount },
    { url: "https://swapi.dev/api/vehicles", element: vehiculeCount },
    { url: "https://swapi.dev/api/planets", element: planetCount },
  ];

  Promise.all(
    counters.map(({ url, element }) => getDisplayCount(url, element))
  ).catch(handleGlobalError);
});

function handleGlobalError(error) {
  console.error("Erreur globale : ", error);
}