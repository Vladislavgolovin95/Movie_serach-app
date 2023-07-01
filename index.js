const INPUT_ERROR_MESSAGE = 'Write the name of the movie';
const SEARCH_ERROR_MESSAGE = 'Movies not found 🤷‍♂️';

const nameMovieNode = document.getElementById('inputNameMovie');
const listMoviesNode = document.getElementById('listMovies');
const serchBtnNode = document.getElementById('serchBtn');


function renderMovieList () {
  const nameMovie = nameMovieNode.value;
  if (nameMovie.trim() === '') {
    const errorInputNode = document.createElement("p");
    errorInputNode.classList.add('error');
    errorInputNode.innerText = INPUT_ERROR_MESSAGE;
    listMoviesNode.innerHTML = '';
    listMoviesNode.appendChild(errorInputNode);
    return;
  }
  fetch(`https://www.omdbapi.com/?s=${nameMovie}&apikey=b9476727`)

    .then((response) => {
      
      if (!response.ok) {
        return;
      } 
      return response.json();
    })

    .then((data) => {
      if (!data || !data.Search) {
        const errorSearchNode = document.createElement("p");
        errorSearchNode.classList.add('error');
        errorSearchNode.innerText = SEARCH_ERROR_MESSAGE;
        listMoviesNode.innerHTML = '';
        listMoviesNode.appendChild(errorSearchNode);
        clearInput();
      } else {  
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
      }
    });
}

const clearInput = () => {
  nameMovieNode.value = null;
};

serchBtnNode.addEventListener('click', function() {
  renderMovieList();
  clearInput;
});

listMoviesNode.addEventListener("click", function(event) {
  let target = event.target.closest('.item')
  window.location.href = `movie.html?i=${target.id}`
});