import { describe, test, expect } from '@jest/globals';
import { getReviews } from '../static/loadReviews.js';

describe('Paginated review', () => {

  test('Should return pageSize 5 to limit number of reviews', async () => {

    const cmsReviews = {
      fetchReviews: async () => mockReview({ pageSize: pageSize })
    };

    const pageSize = 4;

    const result = await getReviews(cmsReviews, pageSize);

    expect(result.pagination.meta.pageSize).toBe(4);

  });

  test('Should return page 3', async () => {
    const cmsReviews = {
      fetchReviews: async () => mockReview({ page: page })
    };

    const page = 3;

    const result = await getReviews(cmsReviews, page);

    expect(result.pagination.meta.page).toBe(3);

  })
});

function mockReview(overrids) {
  return {
    pagination: {
      meta: {
        page: 1,
        pageSize: 2,
        pageCount: 3,
        total: 12,
        ...overrids
      }
    },
  };
}
