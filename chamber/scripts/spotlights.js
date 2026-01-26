async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  const eligible = data.members.filter(
    member => member.membershipLevel >= 2
  );

  const selected = eligible
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const container = document.querySelector("#spotlight-container");
  container.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("section");
    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p>${member.membershipLevel === 3 ? "Gold Member" : "Silver Member"}</p>
    `;
    container.appendChild(card);
  });
}

loadSpotlights();
