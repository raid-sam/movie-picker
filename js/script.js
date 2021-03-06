// set up namespace

const app = {};

// create init function, within it: 

app.init = () => {
    // call function to initialize data
    app.dataInit();
    // call function to create selectors
    app.createSelectors();
    // call function to addEventListeners
    app.addEventListeners();
};

// Function to initialize data:
app.dataInit = () => {

    // create a genreList object
    // Save Genre ID with corresponding Genre name
    app.genreList = {
        'action': 28,
        'adventure': 12,
        'animation': 16,
        'comedy': 35,
        'crime': 80,
        'documentary': 99,
        'drama': 18,
        'family': 10751,
        'fantasy': 14,
        'history': 36,
        'horror': 27,
        'music': 10402,
        'mystery': 9648,
        'romance': 10749,
        'science-fiction': 878,
        'tv-movie': 10770,
        'thriller': 53,
        'war': 10752,
        'western': 37
    }
    // Create a decade object
    // Save Greater-than date and Less-than date to decade object 
    app.decadeList = {
        '1920s': ['1920-01-01', '1929-12-31'],
        '1930s': ['1930-01-01', '1939-12-31'],
        '1940s': ['1940-01-01', '1949-12-31'],
        '1950s': ['1950-01-01', '1959-12-31'],
        '1960s': ['1960-01-01', '1969-12-31'],
        '1970s': ['1970-01-01', '1979-12-31'],
        '1980s': ['1980-01-01', '1989-12-31'],
        '1990s': ['1990-01-01', '1999-12-31'],
        '2000s': ['2000-01-01', '2009-12-31'],
        '2010s': ['2010-01-01', '2019-12-31'],
        '2020s': ['2020-01-01', '2029-12-31'],
    }
    // Initialize viewMore click tracking property 
    app.viewMoreClicks = 0;
}



// Get Data from user
// Function to create selectors:
app.createSelectors = () => {
    // create a selector on the form
    app.form = document.querySelector('form');
    // create a selector on the genre dropdown menu
    app.genreSelector = document.querySelector('#genre');
    // create a selector on the decade dropdown menu
    app.decadeSelector = document.querySelector('#decade');
    // create a selector on the (currently empty) .gallery section
    app.gallerySectionSelector = document.querySelector('.gallerySection');
    //create a selector on the gallery
    app.gallerySelector = document.querySelector('.gallery');
    //create a selector for the back button
    app.backButtons = document.querySelectorAll('.backButton');
    //create a selector for the 'view more' button
    app.viewMore = document.querySelector('#viewMore')
    //create a selector for the h1
    app.mainTitle = document.querySelector('h1');
    // create a selector for the info text box
    app.infoBox = document.querySelector('.infoBox');
    // create a selector for the in-box info icon
    app.boxIcon = document.querySelector('#boxIcon');
}

// function to add event listeners:
app.addEventListeners = () => {
    // create event listener on form submit
    app.form.addEventListener('submit', (event) => {
        // prevent default behaviour when page is submitted (preventDefault)
        event.preventDefault();
        app.runSearch();
    });
    // create an event listener for any button with an ID of "backButton" that is a child of the body element
    app.backButtons.forEach((button) => {
        button.addEventListener('click', () => {
            app.goBack();
        })
    })
    //create an event listener for the 'view more' button
    app.viewMore.addEventListener('click', () => {
        app.viewMoreMovies();
    })
    // create an event listener for the in-box info icon
    app.boxIcon.addEventListener('click', () => {
        app.closeInfo();
    })
}

// RUN SEARCH: WHEN THE FORM IS SUBMITTED
// declare runSearch function 
app.runSearch = () => {
    // give form class of noDisplay (sets it to display none)
    app.form.classList.toggle('noDisplay');
    // remove the noDisplay class from the "back" button (so it is now visible)
    app.backButtons.forEach((button) => {
        button.classList.toggle('noDisplay');
    });
    //take away class of 'noDisplay' for the 'view more' button
    app.viewMore.classList.toggle('noDisplay');
    // save user decade choice and genre choice to variables
    const userGenre = app.genreSelector.value;
    const userDecade = app.decadeSelector.value;
    // give the new h1 element text info of the decade + genre 
    app.mainTitle.innerHTML = `Most popular ${userGenre} movies of the ${userDecade}.<i class="far fa-question-circle" id="h1Icon"></i>`;

    app.displayIcon();

    // save base URL as variable
    const baseURL = `https://api.themoviedb.org/3/discover/movie`;
    // save API key as a variable
    const apiKey = `5b7c94b78466743c18dd424ce270ca01`;
    // grab data from the API
    // create a url object from the base url
    const url = new URL(baseURL);
    // establish URL search parameters (API key, language, sort-by popularity-descending, user-selected-genre, user-selected-decade)
    url.search = new URLSearchParams({
        api_key: apiKey,
        with_original_language: 'en',
        sort_by: `popularity.desc`,
        with_genres: app.genreList[userGenre],
        'primary_release_date.gte': app.decadeList[userDecade][0],
        'primary_release_date.lte': app.decadeList[userDecade][1]
    });
    // perform a fetch with the constructed search parameters
    fetch(url)
        // process data from API call
        // convert fetch response to JSON data
        .then((response) => {
            return response.json();
        })
        // define a function that accepts the JSON data as an argument
        // this will surface our query results object (we will use this later)
        .then((jsonResponse) => {
            app.topArray(jsonResponse);
        });
}

app.displayIcon = () => {
    // create a selector for the h1 info icon
    app.h1Icon = document.querySelector('#h1Icon');
    // create an event listener for when someone clicks the on-screen info icon
    app.h1Icon.addEventListener('click', () => {
        // When icon is clicked:
        // surface a block of text  by toggling the noDisplay class on the info text box
        app.infoBox.classList.toggle('noDisplay');
        // hide h1 info icon by toggling hiddenIcon class
        app.h1Icon.classList.toggle('hiddenIcon');
    });

}

app.closeInfo = () => {
    // When the in-box info icon is clicked :
    // toggle nodisplay class on the text box (hiding it)
    app.infoBox.classList.toggle('noDisplay');
    // toggle hiddenIcon class on the h1 info icon (showing it)
    app.h1Icon.classList.toggle('hiddenIcon');
}

// create an array from the first 6 movie objects in the API response using the slice method (slicing from index 0 to 6)
app.topArray = (moviesObject) => {
    const moviesArray = moviesObject.results.slice(0, 6);
    //define a second and third array in the topArray function
    app.secondArray = moviesObject.results.slice(6, 12);
    app.thirdArray = moviesObject.results.slice(12, 18);
    app.displayMovies(moviesArray);
}

// define a displayMovies function
app.displayMovies = (moviesArray) => {
    const imageUrl = 'https://image.tmdb.org/t/p/w500';

    // surface poster image, and movie title
    // FOR EACH array item, create an li
    moviesArray.forEach((movie) => {
        // create an img with src that corresponds to the array item's .poster_path and alt-text that describes the poster as `official poster for the movie ${movie.title}`
        const listElement = document.createElement('li');
        const image = document.createElement('img');
        // create an h2 with text content that corresponds to the array item's .title
        const movieHeader = document.createElement('h2');
        image.src = imageUrl + movie.poster_path;
        image.alt = `official poster for the movie ${movie.title}`;
        movieHeader.textContent = `${movie.title}`;
        // append the h2 and img to the li
        listElement.append(image);
        listElement.append(movieHeader);
        // append the li to the .gallery section
        app.gallerySelector.append(listElement);
    });
}

// VIEW MORE MOVIES: WHEN VIEW MORE IS CLICKED
//declare the viewMoreMovies function

app.viewMoreMovies = () => {
    switch (app.viewMoreClicks) {
        case 0: {
            app.displayMovies(app.secondArray);
            app.viewMoreClicks++;
            break;
        }
        case 1: {
            app.displayMovies(app.thirdArray);
            app.viewMore.classList.toggle('noDisplay');
        }
    }
}


// GO BACK: WHEN BACK BUTTON IS CLICKED
// declare goBack function
app.goBack = () => {
    // set the innerHTML of the .gallery section to an empty string
    app.gallerySelector.innerHTML = "";
    // toggle the noDisplay class on the main title and the form element (showing them)
    app.mainTitle.textContent = "Movie Picker";
    // toggle the noDisplay on the "back" button, hiding it
    app.form.classList.toggle('noDisplay');
    app.backButtons.forEach((button) => {
        button.classList.toggle('noDisplay');
    })
    // toggle the noDisplay on the "view more" button, hiding it
    app.viewMore.classList.add('noDisplay');
    //clear the viewMoreClicks counter back to zero
    app.viewMoreClicks = 0;
}


// call init function
app.init();