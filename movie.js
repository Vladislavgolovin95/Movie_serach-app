const movieCardNode = document.getElementById('movie-card');
const backBtn = document.getElementById('backBtn');

const params = new URLSearchParams(location.search);
const movieID = params.get('i');

fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=b9476727`)
  .then((response) => { 
    if (!response.ok) { 
      alert('ERROR')
    }
    return response.json(); 
  })
  .then((data) => {
    renderCardMovie(data)
  });
  
function renderCardMovie(movie) {
  movieCardNode.innerHTML = `
    <div class='movie-card-wrapper'>
      <img class="movie-card__img" src="${movie.Poster}">
        <div class='movie-decription'>
          <p class='movie-card__title'>${movie.Title}</p>
          <ul class="movie-card__list">
            <li class="movie-card__list-item">Year: 
              <span class="item-span">${movie.Year}</span> 
            </li>
            <li class="movie-card__list-item">Rating: 
              <span class="item-span">${movie.Rated}</span> 
              </li>     
            <li class="movie-card__list-item">Release date: 
              <span class="item-span">${movie.Released}</span> 
            </li>     
            <li class="movie-card__list-item">Duration: 
              <span class="item-span">${movie.Runtime}</span> 
            </li>     
            <li class="movie-card__list-item">Genre: 
              <span class="item-span">${movie.Genre}</span> 
            </li>     
            <li class="movie-card__list-item">Director: 
              <span class="item-span">${movie.Director}</span> 
            </li>     
            <li class="movie-card__list-item">Scenario: 
              <span class="item-span">${movie.Writer}</span> 
            </li>     
            <li class="movie-card__list-item">Actors: 
              <span class="item-span">${movie.Actors}</span> 
            </li>     
          </ul>
      </div>
    </div>
    <p class="movie-card__intro">${movie.Plot}</p>
  `
}

backBtn.addEventListener('click', function() {
  history.back();
})