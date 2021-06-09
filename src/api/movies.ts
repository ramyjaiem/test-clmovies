import axios from 'axios';

// 20 movies for each page ( 500 movies = 25 pages)

const PAGE_LIMIT = 26
export const getMovies = async (page: number, movies: any, sort: number) => {
  let result = movies;
  if (page < PAGE_LIMIT) {
    let newMovies = await axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=faee779d926bf4743b86e6eb6d526323&language=en-US&page=${sort ? PAGE_LIMIT - page : page}`
      )
      .then((res) => res.data.results)
      .catch((err) => console.log(err));
    result = movies.concat(sort? newMovies.reverse() : newMovies);
  } 
  return result;
};
