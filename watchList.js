import { allowableChars } from "./api.js";

function getLocalStorageWatchlist () {
    const data = JSON.parse(localStorage.getItem("watchlist"));
    if(data && data.length > 0){
        let htmlData = ""
        let index = 0;
        console.log(data)       
        data.forEach(movie => {
        htmlData += `
        <div class="movie-info">
            <img src=${movie.poster} alt="#" class="movie-poster">
            <div class="movie-details">
                <p class="movie-title">${movie.title} <img src="./icons/rating.svg" alt="Movie poster not available">${movie.rating}</p>
                <p> ${movie.genres} <div class="removeFromWatchlist" index = ${index}><img src="./icons/remove.svg" alt="#"><button  class="remove-watchlist-btn">remove</button></p></div>
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
            <a href="index.html" id="add-movies-link"><img src="./icons/addToWatchlist.svg" alt="#"> Let's add some movies</a>
        </div>`
    };
    const removeBtns = document.querySelectorAll(".remove-watchlist-btn");
    removeBtns.forEach(button => button.addEventListener("click", (e) => {
        const index = e.target.parentElement.getAttribute("index");
        let localStorageArray = JSON.parse(localStorage.getItem("watchlist"));
        localStorageArray.splice(index, 1);
        localStorage.setItem("watchlist",JSON.stringify(localStorageArray));
        getLocalStorageWatchlist();
    }));
    const readMoreBtns = document.querySelectorAll(".read-more");
    readMoreBtns.forEach(button => button.addEventListener("click", (e) => {

        const index = e.target.parentElement.getAttribute("index");
        const text = data[index].overview;
        e.target.parentElement.innerText = text;

    }));
};



getLocalStorageWatchlist();