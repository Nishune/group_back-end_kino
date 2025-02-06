(async () => {
  const screeningsIDList = document.querySelector('.screeningsID-list');
  const parts = window.location.pathname.split('/');
  const movieId = parts.length > 2 ? parts[2] : null;
  const API_URL = `/api/screenings/${movieId}`;

  if (!screeningsIDList) {
    return;
  }

  if (!movieId) {
    return;
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP Status Code: ${response.status}`);
    }

    const {data} = await response.json();
   
    if (data.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'För tillfället har vi inga visningar på denna film.';
      li.classList.add('screeningsID-listItem');
      screeningsIDList.append(li);
      return;
    }

    data.forEach((movie) => {
      const date = new Date(movie.start_time);
      const formattedDate = date.toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      const li = document.createElement('li');
      li.textContent = `${movie.room} | ${formattedDate}`;
      li.classList.add('screeningsID-listItem');

      screeningsIDList.append(li);
    });
  } catch (e) {
    console.error(e);
  }
})();
