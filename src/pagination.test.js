import { expect, test } from '@jest/globals';
import request from 'supertest';
import initialize from './app.js';

test('When makes a request it returns 3 reviews', async () => {

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