// DOM
const films = document.querySelector(".films");

baseUrl = "https://api.themoviedb.org/3/";
api_key = "&api_key=2fa8f297328a4293f06805fe0c1b915d";
img_url = "https://image.tmdb.org/t/p/original/";

const api = {
  now_playing: "/movie/now_playing?language=ru",
  soon: "/movie/upcoming?language=ru",
  popular: "/movie/popular?language=ru",
  top_rated: "/movie/top_rated?language=en",
};

async function fetchTopMovie() {
  const res = await fetch(baseUrl + api.top_rated + api_key);
  const data = await res.json();
  console.log(data, "--top--");
  const { results } = data;
  renderMovies(results)
}
fetchTopMovie();

function renderMovies(movie = []) {
  let html = "";
  for (const film of movie) {
    const { poster_path } = film;
    html +=    `
    <div class="film">
                    <img src="${img_url + poster_path}" alt="">
                </div>
    `
  }
  films.innerHTML = html
}
