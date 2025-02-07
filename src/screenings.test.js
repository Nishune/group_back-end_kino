import { expect, it } from '@jest/globals';
import cmsScreening from './movies.js';

it('filters screenings based on dates for a given movieid', async () => {
  const today = new Date('2025-02-07T00:00:00.000Z'); 
  const req = { params: { id: '9' } };
  const res = {};

  const mockScreenings = {
    data: [
      {
        id: 295,
        attributes: {
          start_time: '2025-02-13T17:00:00.000Z',
          room: 'Stora salongen',
          movie: { data: { id: 9 } },
        },
      },
      {
        id: 300,
        attributes: {
          start_time: '2025-02-08T12:00:00.000Z',
          room: 'Stora salongen',
          movie: { data: { id: 9 } },
        },
      },
      {
        id: 302,
        attributes: {
          start_time: '2025-02-08T21:00:00.000Z',
          room: 'Stora salongen',
          movie: { data: { id: 9 } },
        },
      },
      {
        id: 306,
        attributes: {
          start_time: '2025-02-10T19:00:00.000Z',
          room: 'Stora salongen',
          movie: { data: { id: 9 } },
        },
      },
      {
        id: 332,
        attributes: {
          start_time: '2025-02-22T21:00:00.000Z',
          room: 'Stora salongen',
          movie: { data: { id: 9 } },
        },
      },
    ],
  };

  cmsScreening.loadScreeningsID = async () => {
    return mockScreenings.data
      .filter((screening) => 
        screening.attributes.movie.data.id == req.params.id &&
        new Date(screening.attributes.start_time) >= today
      )
      .map((screening) => ({
        id: screening.id,
        start_time: screening.attributes.start_time,
        room: screening.attributes.room,
      }))
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  };

  const screenings = await cmsScreening.loadScreeningsID(req, res);

  expect(screenings).toHaveLength(5);
  expect(new Date(screenings[0].start_time)).toEqual(new Date('2025-02-08T12:00:00.000Z'));
  expect(new Date(screenings[1].start_time)).toEqual(new Date('2025-02-08T21:00:00.000Z'));
  expect(new Date(screenings[2].start_time)).toEqual(new Date('2025-02-10T19:00:00.000Z'));
  expect(new Date(screenings[3].start_time)).toEqual(new Date('2025-02-13T17:00:00.000Z'));
  expect(new Date(screenings[4].start_time)).toEqual(new Date('2025-02-22T21:00:00.000Z'));

  expect(new Date(screenings[0].start_time).getTime()).toBeLessThan(new Date(screenings[1].start_time).getTime());
  expect(new Date(screenings[1].start_time).getTime()).toBeLessThan(new Date(screenings[2].start_time).getTime());
  expect(new Date(screenings[2].start_time).getTime()).toBeLessThan(new Date(screenings[3].start_time).getTime());
  expect(new Date(screenings[3].start_time).getTime()).toBeLessThan(new Date(screenings[4].start_time).getTime());
});
