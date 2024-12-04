const personCount = document.querySelector("#person");
const vehiculeCount = document.querySelector("#vehicule");
const planetCount = document.querySelector("#planet");

async function allCount() {
  try {
    const response1 = await fetch("https://swapi.dev/api/people");
    if (!response1.ok) {
      throw new Error("Network error !");
    }
    const data1 = await response1.json();
    personCount.innerText = `${data1.count}`;
    const response2 = await fetch("https://swapi.dev/api/vehicles");
    if (!response2.ok) {
      throw new Error("Network error !");
    }
    const data2 = await response2.json();
    vehiculeCount.innerText = `${data2.count}`;
    const response3 = await fetch("https://swapi.dev/api/planets");
    if (!response3.ok) {
      throw new Error("Network error !");
    }
    const data3 = await response3.json();
    planetCount.innerText = `${data3.count}`;
  } catch (error) {
    console.error("Erreur : ", error);
  }
}
allCount();
