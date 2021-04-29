
// const url = 'https://api.themoviedb.org/3/movie/550?api_key=5b7c94b78466743c18dd424ce270ca01&language=en-US';
// console.log(url);

//example of image path for Fightclub:
//pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg

// getting Object info for Fight Club: 
// fetch(url)
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (response) {
//         console.log(response);
//     });

const url = new URL(`https://api.themoviedb.org/3/discover/movie`);
// console.log(url)

url.search = new URLSearchParams({
    api_key: `5b7c94b78466743c18dd424ce270ca01`,
    with_original_language: 'en',
    sort_by: `popularity.desc`,
    with_genres: '28',
    'release_date.gte' : '1980-01-01',
    'release_date.lte' : '1989-12-31'
}); 

// console.log(url)

fetch(url)
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (response) {
        console.log(response);
    });


const genreUrl = new URL(`https://api.themoviedb.org/3/genre/movie/list`);

genreUrl.search = new URLSearchParams({
    api_key: `5b7c94b78466743c18dd424ce270ca01`,
});

// console.log(genreUrl)

fetch(genreUrl)
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (response) {
        // console.log(response);
    });


// Movie Title
// Movie Poster
// Discover movies by rating
// Discover movies by decade
    
// Project Pseudocode
// set up namespace

// create init function, within it: 
    // call function to initialize data
    // call function to create selectors
    // call function to addEventListeners


// Function to initialize data:
    // save base URL as variable
    // save API key as a variable
    // create a genreList object 
    // Save Genre ID with corresponding Genre name 
    // Create a decade object
        // Save Greater-than date and Less-than date to decade object

// Get Data from user
    // Function to create selectors:
        // create a selector on the form
        // create a selector on the genre dropdown menu
        // create a selector on the decade dropdown menu
        // create a selector on the (currently empty) .gallery section
    // function to add event listeners:
        // create event listener on form submit
        // create an event listener for any button with an ID of "backButton" that is a child of the body element

// EVENT LISTENER 1: WHEN THE FORM IS SUBMITTED
    // prevent default behaviour when page is submitted (preventDefault)
    // give form + h1 class of noDisplay (sets it to display none)
    // remove the noDisplay class from the "back" button (so it is now visible)
    // save user decade choice and genre choice to variables
    // create an h1 element
    // give the new h1 element text info of the decade + genre 
    // append h1 element to the .gallery seciont

    // grab data from the API
        // create a url object from the base url
        // establish URL search parameters (API key, language, sort-by popularity-descending, user-selected-genre, user-selected-decade)
        // perform a fetch with the constructed search parameters

        
    // process data from API call
        // convert fetch response to JSON data
        // define a function that accepts the JSON data as an argument
            // this will surface our query results object (we will )
            // create an array from the first 6 movie objects in the API response using the slice method (slicing from index 0 to 5)
            // surface poster image, and movie title
                // FOR EACH array item, create an li
                // create an img with src that corresponds to the array item's .poster_path and alt-text that describes the poster as `official poster for the movie ${movie.title}`
                // create an h2 with text content that corresponds to the array item's .title
                // append the h2 and img to the li
                // append the li to the .gallery section

// EVENT LISTENER 2: WHEN BACK BUTTON IS CLICKED
    // set the innerHTML of the .gallery section to an empty string
    // toggle the noDisplay class on the main title and the form element (showing them)
    // toggle the noDisplay on the "back" button, hiding it
           
    
// call init function

// stretch goals:
    // populate genre list directly from the API with an initial call so it's absolutely up to date
    // provide users with movie providers (displayed with logo) to view each movie