async function fetchFrontpageScreeningsData() {
  const response = await fetch("/api/screenings");
  const screenings = await response.json();

  const frontpageScreeningsList = document.querySelector(".screenings-list");

  if (screenings.length === 0) {
    frontpageScreeningsList.innerHTML = "<li>Inga visningar tillgängliga just nu.</li>";
    return;
  }

  screenings.forEach(screening => {
    const listItem = document.createElement("li");
    const formattedDate = new Date(screening.start_time).toLocaleString([], { 
      dateStyle: "short", 
      timeStyle: "short" 
    });

    listItem.innerHTML = `
      <strong>${screening.movie}</strong><br>
      ${formattedDate} | ${screening.room}
    `;

    frontpageScreeningsList.appendChild(listItem);
  });
}

fetchFrontpageScreeningsData();