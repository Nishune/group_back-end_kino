(async () => {
  if (document.querySelector('.movie-title')) {
    const movieId = window.location.pathname.split('/')[2];
    const res = await fetch(`/api/screenings/${movieId}`);
    const { rating } = await res.json();

    const titleDiv = document.querySelector(".title-div");
    const ratingEl = document.createElement("p");
    ratingEl.classList.add("rating-title");
    ratingEl.innerText = "Betyg: ";

    const star = document.createElement("i");
    star.setAttribute("class", "fa-solid fa-star")

    const ratingNum = document.createElement("p");
    ratingNum.classList.add("rating-num");
    ratingNum.innerText = Math.round(rating * 10) / 10;

    titleDiv.appendChild(ratingEl);
    titleDiv.appendChild(star);
    titleDiv.appendChild(ratingNum);
  }
})();
