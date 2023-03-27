const TMDB_API_KEY = 'your_tmdb_api_key_here';
const RECOMMENDATIONS_COUNT = 5;
const GENRE_ID = 28; // Change this to the genre ID you want

document.getElementById('recommendBtn').addEventListener('click', async () => {
    const movies = await getMoviesByGenre(GENRE_ID);
    const recommendations = getRandomMovies(movies, RECOMMENDATIONS_COUNT);
    displayMovies(recommendations);
});

async function getMoviesByGenre(genreId) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`);
    const data = await response.json();
    return data.results;
}

function getRandomMovies(movies, count) {
    const randomMovies = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        randomMovies.push(...movies.splice(randomIndex, 1));
    }
    return randomMovies;
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';

    for (const movie of movies) {
        const movieElem = document.createElement('div');
        movieElem.className = 'movie';
        movieElem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        moviesContainer.appendChild(movieElem);
    }
}
