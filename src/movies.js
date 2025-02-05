import fetch from 'node-fetch';
import MarkdownIt from 'markdown-it';

const apiBase = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const md = new MarkdownIt();

function easyObject(api) {
  return {
    id: api.id,
    ...api.attributes,
    intro: md.render(api.attributes.intro || ''),
    imdbId: api.attributes.imdbId,
  };
}

export async function loadMovies() {
  const res = await fetch(apiBase + '/movies');
  const payload = await res.json();
  return payload.data.map(easyObject);
}

export async function loadReviews(movieId) {
  const res = await fetch(`${apiBase}/reviews?filters[movie]=${movieId}`);
  const payload = await res.json();
  return payload.data;
}

export async function loadMovie(id) {
  const res = await fetch(apiBase + '/movies/' + id);
  const payload = await res.json();

  if (!payload.data) {
    throw new Error(`Movie with ${id} not found`);
  }

  return easyObject(payload.data);
}

const cmsScreening = {
  loadScreeningsID: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const ENDPOINT = `https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&filters[movie]=${id}`;
      const today = new Date();
      const response = await fetch(ENDPOINT);
      const data = await response.json();

      if (!data) {
        throw new Error('Could not find any data');
      }

      const screeningsArray = data.data
        .filter((screening) => {
          const screeningStartTime = new Date(screening.attributes.start_time);
          return today <= screeningStartTime;
        })
        .map((screening) => ({
          id: screening.id,
          start_time: screening.attributes.start_time,
          room: screening.attributes.room,
        }));

      return screeningsArray;

    } catch (e) {
      console.error(e);
      return [];
    }
  },
};

export default cmsScreening;

export async function loadReview(id, pageSize, page) {

  const api = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';
  const revURL = `${api}?filters[movie]=${id}&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;

  const response = await fetch(revURL);
  const dataReview = await response.json();

  if (!dataReview) {
    throw new Error(`Review with ${id} not found`);
  }

  return dataReview;
}

export async function getImdbRating(imdbId) {
  const apiKey = 'b9b5e708'; //Min api key
  const apiUrl = `https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error('Kunde inte hämta IMDB-betyg');
    }
    const data = await res.json();
    return parseFloat(data.imdbRating) || 0;
  } catch (error) {
    console.error('Kunde inte hämta IMDB-betyg för filmen', error);
    return 0;
  }
}