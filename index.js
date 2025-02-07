import { loadMovie, loadMovies } from './src/movies.js';
import initialize from './src/app.js';
import { getReviews } from './static/loadReviews.js';

const myAPI = {
  loadMovie,
  loadMovies,
  getReviews
};

const app = initialize(myAPI);

app.listen(5080);