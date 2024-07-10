// DOM
const comedy = document.querySelector(".comedy-movies");
const newMovies = document.querySelector(".new-movies");
const family = document.querySelector(".family-movies");
const drama = document.querySelector(".drama-movies");
const fantasy = document.querySelector(".fantasy-movies");
const brImage = document.querySelector(".s-image");
const hLinks = document.querySelectorAll(".nav-link")


hLinks.forEach((a, index) => {
  a.addEventListener("click", () => {
    hLinks.forEach((a, i) => {
      if(index === i) {
        a.classList.add("active")
      } else{
        a.classList.remove("active")
      }
    })
  })
})

baseUrl = "https://api.themoviedb.org/3/";
api_key = "&api_key=2fa8f297328a4293f06805fe0c1b915d";
img_url = "https://image.tmdb.org/t/p/original/";

const api = {
  now_playing: "/movie/now_playing?language=ru",
  soon: "/movie/upcoming?language=ru",
  popular: "/movie/popular?language=ru",
  top_rated: "/movie/top_rated?language=en",
};

const genres = {
  35: "Комедия",
  28: "Действие",
  12: "Путешествия",
  16: "Анимация",
  18: "Драма",
  80: "Криминал",
  99: "Документальный фильм",
  36: "Исторический фильм",
  27: "Ужасы",
  9648: "Место преступления",
  878: "Научная фантастика",
  10402: "Музыкальный",
  53: "Триллер",
  10751: "Семья",
  14: "Фэнтэзи",
  37: "Запад",
  10752: "Война",
  10749: "Романтика",
  10770: "ТВ-фильм",
};


async function fetchTopMovie() {
  const res = await fetch(baseUrl + api.top_rated + api_key);
  const data = await res.json();
  console.log(data, "--top--");
  const { results } = data;
  renderMovies(drama, results.slice(12, 20));
  renderMovies(fantasy, results.slice(10, 19));
}
fetchTopMovie();

async function fetchFamilyMovie() {
  const res = await fetch(baseUrl + api.popular + api_key);
  const data = await res.json();
  console.log(data, "---popular---");
  const { results } = data;
  renderMovies(family, results.slice(10, 20));
}
fetchFamilyMovie();

async function fetchNewMovie() {
  const res = await fetch(baseUrl + api.soon + api_key);
  const data = await res.json();
  console.log(data, "---soon---");
  const { results } = data;
  renderMovies(newMovies, results.slice(7, 17));
  renderImgMovie(results.slice(3, 6 ));
}
fetchNewMovie();

async function fetchNowPlaying() {
  const res = await fetch(baseUrl + api.now_playing + api_key);
  const data = await res.json();
  console.log(data, "---nowPlaying");
  const { results } = data;
  renderMovies(comedy, results.slice(10, 20));
}
fetchNowPlaying();

function renderMovies(container, movieArr = []) {
  let html = "";
  for (const film of movieArr) {
    html += `<div class="movie">
        <img src="${img_url + film.poster_path}" alt="" />
      </div>`;
  }
  container.innerHTML = `<div class="movies">${html}</div>`;
}

function renderImgMovie(movie = []) {
  let brImages = "";
  for (const film of movie) {
    const { backdrop_path, title, vote_average, release_date, genre_ids } =
      film;
      const year = release_date.slice(0,4)
      let genreList = ""
      for (const id of genre_ids){
        genreList += genres[id] + ", "
      }
      genreList = genreList.slice(0, -2)
    brImages += `
        <div class="image">
        <img src="${img_url + backdrop_path}" alt="" />
        <div class="info-film">
      <h4>${title}</h4>
      <div class="film-data">
        <div class="rating">${vote_average.toFixed(1)}</div>
        <p class="year">${year}</p>
        <p>${genreList}</p>
      </div>
    </div>
    </div>
        `;
  }
  brImage.innerHTML = brImages;
}
// function renderImgMovie(movie = []) {
//   let brImages = "";
//   for (const film of movie) {
//     const { backdrop_path, title, vote_average, release_date, genre_ids } =
//       film;
//     const year = release_date.slice(0, 4);
//     let genresList = "";
//     for (const id of genre_ids) {
//       genresList += genres[id] + ", ";
//     }
//     // Удалите последнюю запятую
//     genresList = genresList.slice(0, -2);
//     brImages += `
//         <div class="image">
//         <img src="${img_url + backdrop_path}" alt="" />
//         <div class="info-film">
//           <h4>${title}</h4>
//           <div class="film-data">
//             <div class="rating">${vote_average.toFixed(1)}</div>
//             <p class="year">${year}</p>
//             <p>${genresList}</p>
//           </div>
//         </div>
//         </div>
//         `;
//   }
//   brImage.innerHTML = brImages;
// }

