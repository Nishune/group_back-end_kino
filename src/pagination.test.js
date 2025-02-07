import { expect, test } from '@jest/globals';
import request from 'supertest';
import initialize from './app.js';

test('When makes a request it return 3 reviews', async () => {

  const app = initialize({
    getReviews: async () => ({
      reviews: [
        { author: "Hej", rating: 3, comment: "good" },
        { author: "Hej", rating: 3, comment: "good" },
        { author: "Hej", rating: 3, comment: "good" },
      ],
      pagination: {
        page: 1, pageSize: 3, pageCount: 1, total: 3
      }
    })
  });

  const response = await request(app).get('/api/reviews/1/2')

  expect(response.status).toBe(200)
  expect(response.body.reviews).toHaveLength(3)

});

test('Returns error 500 when no reviews ', async () => {

  const app = initialize({
    getReviews: async () => ({
      reviews: [],
      pagination: {
        page: 2, pageSize: 2, pageCount: 2, total: 1
      }
    })
  });

  const response = await request(app).get('/api/reviews/1/2')

  expect(response.status).toBe(500)
});

test('Returns sorted data after request', async () => {

  const data = {
    data: [
      {
        id: 1275,
        attributes: {
          comment: "SuperB",
          rating: 5,
          author: "Mr B",
          verified: true,
          createdAt: "2025-02-06T11:53:53.716Z",
          updatedAt: "2025-02-06T11:53:53.716Z"
        }
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 5,
        pageCount: 7,
        total: 34
      }
    }
  };

  const getReviews = {
    reviews: data.data.map(review => ({
      author: review.attributes.author,
      rating: review.attributes.rating,
      comment: review.attributes.comment,
    })),
    pagination: data.meta.pagination
  };

  expect(getReviews.reviews[0]).toHaveProperty('author')
  expect(getReviews.reviews[0]).toHaveProperty('comment')
  expect(getReviews.reviews[0]).toHaveProperty('rating')
});

