export async function getMovieRating(cmsAdapterRating, movieId) {
  try {
    const reviews = await cmsAdapterRating.loadReviews(movieId);
    const movie = await cmsAdapterRating.loadMovie(movieId);

    if (reviews.length >= 5) {
      const ratings = reviews.map((review) => review.attributes.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return averageRating;
    } else {
      const imdbRating = await cmsAdapterRating.getImdbRating(movie.imdbId);
      return imdbRating;
    }
  } catch (error) {
    console.error(`Kunde inte hämta betyg till ${movieId}:`, error);
    return 0;
  }
}
