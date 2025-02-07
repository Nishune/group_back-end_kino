import { easyObject } from "./movies.js";

const apiBase = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapterRating = {
  loadMovie: async (movieId) => {
    const res = await fetch(`${apiBase}/movies/${movieId}`);
    const payload = await res.json();
    return easyObject(payload.data);
  },

  loadReviews: async (movieId) => {
    const res = await fetch(`${apiBase}/reviews?filters[verified]=true&filters[movie]=${movieId}`);
    const payload = await res.json();
    return payload.data;
  },

  getImdbRating: async (imdbId) => {
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
  },
};

export default cmsAdapterRating;
