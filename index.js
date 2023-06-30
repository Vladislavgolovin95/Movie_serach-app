const INPUT_ERROR_MESSAGE = 'Напишите название фильма';

const nameMovieNode = document.getElementById('inputNameMovie');
const listMoviesNode = document.getElementById('listMovies');
const serchBtnNode = document.getElementById('serchBtn');


function searchMovie () {
  const nameMovie = nameMovieNode.value;
  if (nameMovie === '') {
    alert(INPUT_ERROR_MESSAGE);
  }
  fetch(`https://www.omdbapi.com/?s=${nameMovie}&apikey=b9476727`)

    .then((response) => {
      
      if (!response.ok) {
        return;
      } 
      return response.json();
    })

    .then((data) => {
      movies = data.Search;
      console.log(movies)
      let html = '';

      movies.forEach(element => {
        let movie = element;
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

listMoviesNode.addEventListener("click", function(event) {
  let target = event.target.closest('.item')
  window.location.href = `movie.html?i=${target.id}`
});