import { allowableChars } from "./api.js";

function getLocalStorageWatchlist () {
    const data = JSON.parse(localStorage.getItem("watchlist"));
    if(data && data.length > 0){
        let htmlData = ""
        let index = 0;    
        data.forEach(movie => {
        htmlData += `
        <div class="movie-info">
            <img src=${movie.poster} alt="#" class="movie-poster">
            <div class="movie-details">
                <p class="movie-title">${movie.title} <img src="/icons/rating.svg" alt="#">${movie.rating}</p>
                <p> ${movie.genres} <button index = ${index} class="remove-watchlist-btn"><img class="add-icon" src="/icons/remove.svg" alt="#"> remove</button></p>
                <p index = ${index}>${movie.overview.length > allowableChars ? movie.overview.substring(0,allowableChars-5) + "<a class='read-more'> +Read more...</a>" : movie.overview}</p>
            </div>
        </div>
        <hr>
        `;
        index++;
    });
        document.querySelector(".movies-container").innerHTML = htmlData;
    }else {
        document.querySelector(".movies-container").innerHTML = 
        `<div id="explore-div">
            <p>Your movie list looks a little empty..</p>
            <a href="index.html" id="add-movies-link"><img class="add-icon" src="/icons/addToWatchlist.svg" alt="#"> Let's add some movies</a>
        </div>`
    };
    const removeBtns = document.querySelectorAll(".remove-watchlist-btn");
    removeBtns.forEach(button => button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("index");
        let localStorageArray = JSON.parse(localStorage.getItem("watchlist"));
        localStorageArray.splice(index, 1);
        localStorage.setItem("watchlist",JSON.stringify(localStorageArray));
        getLocalStorageWatchlist();
    }));
    const readMoreBtns = document.querySelectorAll(".read-more");
    readMoreBtns.forEach(button => button.addEventListener("click", (e) => {

        const index = e.path[1].attributes.index.value;
        const text = data[index].overview;
        e.path[1].innerText = text;

    }));
};



getLocalStorageWatchlist();