import { describe, test, expect } from '@jest/globals';
import { getReviews } from '../static/loadReviews.js';

describe('Paginated review', () => {

  test('Should return pageSize 5 to limit number of reviews', async () => {

    const cmsReviews = {
      fetchReviews: async () => mockReview({ pageSize: pageSize })
    };

    const pageSize = 4;

    const result = await getReviews(cmsReviews, pageSize);

    expect(result.pagination.pageSize).toBe(4);

  });

  test('Should return page 3', async () => {
    const cmsReviews = {
      fetchReviews: async () => mockReview({ page: page })
    };

    const page = 3;

    const result = await getReviews(cmsReviews, page);

    expect(result.pagination.page).toBe(3);

  })
});

test('Should return sorted data', async () => {
  const cmsReviews = {
    fetchReviews: async () => {
      return {
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
      }
    }
  }

  const result = await getReviews(cmsReviews);

  expect(result.reviews[0]).toHaveProperty('author')
  expect(result.reviews[0]).toHaveProperty('comment')
  expect(result.reviews[0]).toHaveProperty('rating')

});

function mockReview(overrids) {
  return {
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
        pageSize: 2,
        pageCount: 3,
        total: 12,
        ...overrids
      }
    },
  };
}