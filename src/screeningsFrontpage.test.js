import { expect, it } from '@jest/globals';
import { filterScreeningsByDate, nextTenScreenings } from './screeningsFrontpage.js';

it('Show screenings of next 5 days', () => {
  const today = new Date(2025, 0, 31);

  const screenings = [
    { movie: 'Encanto', start_time: new Date(2025, 0, 31) },
    { movie: 'Encanto', start_time: new Date(2025, 1, 3) },
    { movie: 'Encanto', start_time: new Date(2025, 1, 7) },
    { movie: 'Training Day', start_time: new Date(2025, 0, 31) },
    { movie: 'Training Day', start_time: new Date(2025, 1, 3) },
    { movie: 'Training Day', start_time: new Date(2025, 1, 7) },
    { movie: 'The Muppets', start_time: new Date(2025, 0, 31) },
    { movie: 'The Muppets', start_time: new Date(2025, 1, 3) },
    { movie: 'The Muppets', start_time: new Date(2025, 1, 7) },
  ];

  const filtered = filterScreeningsByDate(screenings, today);

  expect(filtered).toHaveLength(6);
  expect(filtered).toContainEqual(screenings[0]);
  expect(filtered).not.toContainEqual(screenings[5]);
});

it('Show maximum of 10 screenings sorted by date', () => {
  const screenings = [
    { movie: 'Encanto', start_time: new Date(2025, 0, 31) },
    { movie: 'Encanto', start_time: new Date(2025, 1, 1) },
    { movie: 'Encanto', start_time: new Date(2025, 1, 2) },
    { movie: 'Encanto', start_time: new Date(2025, 1, 3) },
    { movie: 'Encanto', start_time: new Date(2025, 1, 4) },
    { movie: 'Encanto', start_time: new Date(2025, 1, 5) },
    { movie: 'Training Day', start_time: new Date(2025, 0, 31) },
    { movie: 'Training Day', start_time: new Date(2025, 1, 1) },
    { movie: 'Training Day', start_time: new Date(2025, 1, 2) },
    { movie: 'Training Day', start_time: new Date(2025, 1, 3) },
    { movie: 'Training Day', start_time: new Date(2025, 1, 4) },
    { movie: 'Training Day', start_time: new Date(2025, 1, 5) },
    { movie: 'The Muppets', start_time: new Date(2025, 0, 31) },
    { movie: 'The Muppets', start_time: new Date(2025, 1, 1) },
    { movie: 'The Muppets', start_time: new Date(2025, 1, 2) },
    { movie: 'The Muppets', start_time: new Date(2025, 1, 3) },
    { movie: 'The Muppets', start_time: new Date(2025, 1, 4) },
    { movie: 'The Muppets', start_time: new Date(2025, 1, 5) }
  ];

  const nextTenScreeningsResult = nextTenScreenings(screenings);


  expect(nextTenScreeningsResult).toHaveLength(10);
  expect(nextTenScreeningsResult[0].start_time <= nextTenScreeningsResult[1].start_time).toBe(true);
  expect(nextTenScreeningsResult[7].start_time >= nextTenScreeningsResult[6].start_time).toBe(true);
});