const modalURL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/`;

const movieModal = document.getElementById("js-movieModal");
const closeModalButton = document.getElementById("modalClose");

// open modal and render HTML
function openModal(filmId) {
  movieModal.innerHTML = "";
  movieModal.classList.add("modal__open");
  // fetch
  fetch(modalURL + filmId, {
    method: "GET",
    headers: {
      "X-API-KEY": API,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const {
        posterUrlPreview,
        description,
        nameOriginal,
        filmLength,
        year,
        genres,
        webUrl,
      } = data;

      // render
      movieModal.innerHTML = `<div class="modal__card" id="js-modalCard">
      <div class="modal__card-container">
        <div class="card__wrapper">
          <img
            src=${posterUrlPreview}
            alt="poster"
            class="modal-img"
          />
        </div>
        <h2 class="modal__title-block">
          <span class="modal__movie-title">${nameOriginal}</span>
          <span class="modal__movie-year"> ${year}</span>
        </h2>
  
        <div class="modal__info-block">
          <ul class="modal__movie-info">
            <li class="modal__movie-genre">${genres
              .map((elem) => elem.genre)
              .join(",  ")}</li>
              <li class="modal__movie-overview">${description}</li>
            <li class="modal__movie-runtime">Length: ${filmLength} min</li>
            <li class="modal__movie-site">
              Site: <a href=${webUrl} class="movie-site"> ${webUrl}</a>
            </li>
          </ul>
        </div>
      </div>
      <button class="modal__button" id="modalClose">Close</button>
      </div>`;
      // stop scroll
      document.body.classList.add("stop-scrolling");
      // closed modal
      closeModal();
    });
}
// closed modal fnc
const closeModal = () => {
  // button
  const closeButton = document.getElementById("modalClose");
  closeButton.addEventListener("click", removeModalOpen);
  // click empty area
  window.addEventListener("click", (e) => {
    if (e.target === movieModal) {
      removeModalOpen();
    }
  });
  // esq
  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      removeModalOpen();
    }
  });
};
// remove Modal class
const removeModalOpen = () => {
  movieModal.classList.remove("modal__open");
  document.body.classList.remove("stop-scrolling");
};
