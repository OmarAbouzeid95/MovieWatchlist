import { getSearchedKey } from "./api.js";

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", () => {
    if (searchBar.value)
        getSearchedKey(searchBar.value);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        if (searchBar.value)
            getSearchedKey(searchBar.value);
    }
})


