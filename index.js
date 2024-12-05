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

document.addEventListener("DOMContentLoaded", async function () {
  const personCount = document.querySelector("#person");
  const vehiculeCount = document.querySelector("#vehicule");
  const planetCount = document.querySelector("#planet");

  await getDisplayCount("https://swapi.dev/api/people", personCount);
  await getDisplayCount("https://swapi.dev/api/vehicles", vehiculeCount);
  await getDisplayCount("https://swapi.dev/api/planets", planetCount);
});
