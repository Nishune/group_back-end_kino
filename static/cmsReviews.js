const api = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';

const cmsReviews = {
  fetchReviews: async (id, page, pageSize) => {

    pageSize = 5;

    const url = (`${api}?filters[verified]=true&filters[movie]=${id}&pagination[pageSize]=${pageSize}&pagination[page]=${page}`);

    const res = await fetch(url)
    const data = await res.json();

    return data;
  }
}
export default cmsReviews;