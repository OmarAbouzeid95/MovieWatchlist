import {apiKey, baseUrl, posterPath, movieGenres} from "./info.js"

let moviesArray = [], localStorageArray = [];
let windowLength = window.innerWidth;
let allowableChars = 0;

if (windowLength < 400){
    allowableChars = 300;
}else if(windowLength < 650){
    allowableChars = 372;
} else allowableChars = 468;

function addMovieListToHtml (data) {

    for (let i= 0; i< data.results.length; i++){
        
        const movieData = {
            title: data.results[i].original_title,
            poster: posterPath.concat(data.results[i].poster_path),
            rating: (data.results[i].vote_average).toFixed(1),
            overview: data.results[i].overview,
            genres: getMovieGenres(data.results[i].genre_ids),
            index: i
        };
        moviesArray.push(movieData);
    };
    

    const htmlContent = moviesArray.map(movie => {
        return `
            <div class="movie-info">
                <img src=${movie.poster} alt="Movie poster not available" class="movie-poster">
                <div class="movie-details">
                    <p class="movie-title">${movie.title} <img src="./icons/rating.svg" alt="#">${movie.rating}</p>
                    <p> ${movie.genres} <div class="addToWatchlist" index = ${movie.index}><img class="add-watchlist" src="./icons/addToWatchlist.svg" alt="#"><button class="watchlist-btn">watchlist</button></div></p>
                    <p index = ${movie.index}>${movie.overview.length > allowableChars ? movie.overview.substring(0,allowableChars-5) + "<a class='read-more'> +Read more...</a>" : movie.overview}</p>
                </div>
            </div>
            <hr>
        `;
    }).join('');

    document.querySelector(".movies-container").innerHTML = htmlContent;
    const watchlistBtns = document.querySelectorAll(".watchlist-btn");
    watchlistBtns.forEach(button => button.addEventListener("click", function watchlist (e){
        console.log(e)
        addToLocalStorage(e.target.parentElement.getAttribute("index"))
        e.target.parentElement.innerHTML = `<p class="done"><img class = "add-icon" src="./icons/done-icon.svg"> Added to watchlist</p>`;
        
    }));
    const addIcons = document.querySelectorAll(".add-watchlist");
    addIcons.forEach(icon => {
        icon.addEventListener("click", function watchlist (e) {
            addToLocalStorage(e.target.parentElement.getAttribute("index"))
            e.target.parentElement.innerHTML = `<p class="done"><img class="add-icon" src="./icons/done-icon.svg"> Added to watchlist</p>`;
        })
    })
    const readMoreBtns = document.querySelectorAll(".read-more");
    readMoreBtns.forEach(button => button.addEventListener("click", (e) => {
        console.log(e)
        const index = e.target.parentElement.getAttribute("index");
        const text = moviesArray[index].overview;
        e.target.parentElement.innerText = text;

    }));
};


async function getSearchedKey (searchKey) {

    const res = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchKey}`)
    const data = await res.json();
    if(data.results.length === 0){
        document.querySelector(".movies-container").innerHTML = `
            <div>
                <p id = "error-message">We're sorry! there are no results for your search "${searchKey}"</p>
            </div>
        `
    }else {
        moviesArray = [];
        addMovieListToHtml(data);
    }
    
};

const getMovieGenres = function (array) {

    let str = "";
    for(let i = 0; i< array.length; i++){
        for(let j = 0; j < movieGenres.length; j++){
            if (movieGenres[j].id === array[i])
                str += `${movieGenres[j].name}, `
        }
    };
    return str.substring(0,str.length-2);
}

const addToLocalStorage = function (index) {

    const movie = moviesArray[index];
    let localStorageWatchlist = localStorage.getItem("watchlist");
    if(localStorageWatchlist){
        localStorageArray = JSON.parse(localStorageWatchlist);
        localStorageArray.unshift(movie);
    }else {
        localStorageArray.push(movie);
    }
    localStorage.setItem("watchlist",JSON.stringify(localStorageArray));
}

export {getSearchedKey, allowableChars};
