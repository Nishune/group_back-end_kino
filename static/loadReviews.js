export async function getReviews(cmsReviews, id, page, pageSize) {

  const data = await cmsReviews.fetchReviews(id, page, pageSize);

  const getReviews = {
    reviews: data.data.map(review => ({
      author: review.attributes.author,
      rating: review.attributes.rating,
      comment: review.attributes.comment,
    })),
    pagination: data.meta.pagination
  };

  return getReviews;

}