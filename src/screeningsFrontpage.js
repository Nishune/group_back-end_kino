import fetch from 'node-fetch';

const apiBase = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function fetchScreenings() {
  const res = await fetch(`${apiBase}/screenings?populate=movie`);
  const payload = await res.json();

  return payload.data.map((screening) => ({
    id: screening.id,
    movie: screening.attributes.movie.data.attributes.title,
    start_time: new Date(screening.attributes.start_time),
    room: screening.attributes.room
  }));
}

export function filterScreeningsByDate(screenings, today) {
  if (!today) {
    today = new Date();
  }
  
  const currentDate = new Date(today);

  const dateInFiveDays = new Date(currentDate);
  dateInFiveDays.setDate(currentDate.getDate() + 5);

  screenings = screenings.filter(screening =>
    screening.start_time >= currentDate && screening.start_time <= dateInFiveDays
  );

  return screenings;
}


export function nextTenScreenings(filteredScreenings) {
  const sortedScreenings = filteredScreenings.sort((a, b) => a.start_time - b.start_time);
  const nextTenScreenings = sortedScreenings.slice(0, 10);
  return nextTenScreenings;
}

export async function loadScreenings() {
  const screenings = await fetchScreenings();
  const filteredScreenings = filterScreeningsByDate(screenings);
  const nextScreenings = nextTenScreenings(filteredScreenings);

  return nextScreenings;
}
