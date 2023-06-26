const INPUT_ERROR_MESSAGE = 'Напишите название фильма';

const nameMovieNode = document.getElementById('inputNameMovie');
const listMoviesNode = document.getElementById('listMovies');
const serchBtnNode = document.getElementById('serchBtn');

function searchMovie () {
  const nameMovie = nameMovieNode.value;
    if (nameMovie === '') {
      alert(INPUT_ERROR_MESSAGE);
    }
  const movies = fetch(`https://www.omdbapi.com/?s=${nameMovie}&apikey=b9476727`)
    .then(response => response.json())

    .then(data => {
      let movies = data.Search;
      let html = '';

      movies.forEach(e => {
        let movie = e;
        html += `
          <li class='item' id='${movie.imdbID}'>
            <div class='item-poster'>
              <img class='img' src='${movie.Poster}'>
            </div>
            <div class='item-text'>
              <p class='item__title'>${movie.Title}</p>
              <p class='item__year'>${movie.Year}</p>
              <p class='item__type'>${movie.Type}</p>
            </div>
          </li>
        ` 
        listMoviesNode.innerHTML = html;
      });
    });
}

const clearInput = () => {
  nameMovieNode.value = null;
};

serchBtnNode.addEventListener('click', function() {
  searchMovie();
  clearInput();
});

listMoviesNode.addEventListener('click', (e) => {
  const targetItem = e.target;
  if (targetItem.id) {
    console.log(targetItem)
  }
})