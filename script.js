// Chelariu Andrei

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const recomandare = document.getElementById('recomandare');

//1 load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}
//2
function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}
//3
function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setare id film
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

// Functia pentru API
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {

            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`); //Apelare API
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>

    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <br>
        <ul class = "movie-misc-info">
            <li class = "year">An aparitie: ${details.Year}</li>
            <br>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <br>
        </ul>
        <p class = "genre"><b>Gen:</b> ${details.Genre}</p>
        <br>
        <p class = "score"><b>Scor: </b>${details.Metascore}</p>
        <br>
        <p class = "plot"><b>Descriere:</b> ${details.Plot}</p>
        <br>
        <p class = "language"><b>Limba:</b> ${details.Language}</p>
        <br>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p> `;


        // Stefan Mancas

    if (details.Metascore >= 80) {
        resultGrid.innerHTML += '<p id="recomandare">Ar trebui să vizionați acest film acum!</p>';
    }
    else {
        resultGrid.innerHTML += '<p id="recomandare">Nu ar trebui să vizionați acest film acum!</p>';
    };
    resultGrid.innerHTML += ' </div>'; 
}
//4
window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});


