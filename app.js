const formElement = document.querySelector("form")
const textBoxElement = document.querySelector("#search")
const submitBtnElement = document.querySelector("#submit-btn")
const resultsElement = document.querySelector("#gif-results")
const moreBtnElement = document.querySelector(".more-btn")

//parameters required: search term, api key, client key, limit 
const apiKey = "AIzaSyCWdZtElUQlEP3JB-EvQ0c5hgDsyjh9P48"
const clientkey = "my_test_app";
const lmt = 4;

//parameter pos lets us select search results from position[value] where value is a non-zero, non-empty value from next, returned by the API response 
let pos = ""; 

submitBtnElement.addEventListener("click", getResults)

async function getResults(evt) {
    //everytime submit is clicked, remove all the gifs 
    if (evt.target.id == "submit-btn") {
        let gifList = document.querySelectorAll(".gif")
        gifList.forEach((gif) => {
            gif.remove()
        })
    }

    evt.preventDefault(); 
    // searchTerm = evt.target.search.value
    searchTerm = textBoxElement.value 
    
    let url = "https://tenor.googleapis.com/v2/search?q=" + searchTerm + "&key=" +
    apiKey +"&client_key=" + clientkey +  "&limit=" + lmt + "&pos=" + pos;
    
    let response = await fetch(url)
    let responseData = await response.json();
    pos = responseData.next; 
   
    displayResults(responseData)

    //reveal the "Show more GIFs button once everything is loaded"
    moreBtnElement.classList.remove("hidden")
}

function displayResults(responseData) {
    responseData.results.forEach((data) => {resultsElement.innerHTML += `
    <img class="gif" src="${data.media_formats.gif["url"]}" alt="gif" />
    `})
}

//loads more results 
moreBtnElement.addEventListener("click", getResults)

