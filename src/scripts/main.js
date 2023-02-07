const API = "56549cd5-5b39-43c0-9711-ce763cf43d55";
const URL =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";

const searchNameURL =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const moviesContainer = document.getElementById("js-movies");
const movieForm = document.getElementById("js-header-form");
const movieSearchData = movieForm.querySelector(".header__search");

let movieDataObject = {
  name: "",
  description: "",
  poster: "",
  rating: "",
};

// fetch
const movieFetch = async (url, api) => {
  const movieResponse = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": api,
      "Content-Type": "application/json",
    },
  });
  const movieData = await movieResponse.json();
  // console.log(movieData);

  movieData.films.forEach((filmsDta) => {
    const {
      genres,
      nameEn,
      nameRu,
      posterUrl,
      rating,
      filmId,
      year,
      filmLength,
    } = filmsDta;

    movieDataObject = {
      ...movieDataObject,
      name: nameEn ? nameEn : nameRu,
      description: `${genres.map((elem) => ` ${Object.values(elem)}`)}`,
      poster: posterUrl,
      rating: rating,
      filmId: filmId,
    };

    // render movie
    const movie = document.createElement("div");
    movie.classList.add("movie");
    movie.innerHTML += renderMovieHtml(movieDataObject);
    movie.addEventListener("click", () => {
      // open modal
      openModal(filmId);
      // openModal(posterUrl, nameEn ? nameEn : nameRu, year, genres, filmLength);
    });
    moviesContainer.appendChild(movie);

    // closed modal
  });
};
// render movie list fnc
function renderMovieHtml(params) {
  const { name, description, poster, rating, filmId } = params;

  const render = `<div class="movie-cover__effect">
    <div class="movie-cover__inner" id="movieCoverInner">
      <img
        src=${poster}
        alt="movie"
        class="movie-cover__poster"
      />
    </div>
  </div>
  <div class="movie__info" id="js-movieInfo">
    <div class="movie-card__name" id="js-movieCardName">${name}</div>
    <div class="movie-card__description" id="js-movieCardDescription">
     ${description}
    </div>
    <div class="movie-raiting movie-raiting__${colorChange(
      rating
    )}" id="movieRaiting">
    ${ratingZero(rating)}
    </div>`;
  return render;
}
// zero rating
const ratingZero = (rating) => {
  if (rating == "null") {
    return "0";
  } else return rating;
};
// color raiting change
const colorChange = (rating) => {
  if (rating <= 4 || rating == "null") {
    return "red";
  } else if (rating > 4 && rating <= 7) {
    return "orange";
  } else {
    return "green";
  }
};
// search
movieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let movieInputValue = movieSearchData.value;
  moviesContainer.innerHTML = "";
  if (movieInputValue) {
    movieFetch(`${searchNameURL}${movieInputValue}`, API);
  } else movieFetch(URL, API);
  movieSearchData.value = "";
});
movieFetch(URL, API);
