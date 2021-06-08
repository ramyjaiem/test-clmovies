import { getMovies } from 'api/movies';
import React, { FC, useEffect, useState } from 'react';
import { MovieCard } from 'components/MovieCard';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import useLocalStorage from 'hooks/useLocalStorage';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 1,
    },
  },
};

type Props = {};

type Movie = {
  id: number;
  original_title: string;
};
const Home: FC<Props> = () => {
  // this application state is simple
  // i will use context api or redux for more complex state management
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<number>(0);

  const [favList, setFavList] = useLocalStorage('favList', []);

  const makeFavorite = (id: number) => {
    let newFavList = [...favList, id];
    setFavList(newFavList);
  };

  const removeFavorite = (id: number) => {
    let newFavList = favList.filter((el: number) => el !== id);
    setFavList(newFavList);
  };

  const fetchMovies = async (oldMovies: any) => {
    const topMovies: any = await getMovies(page, oldMovies, sort);
    console.log(topMovies);
    setMovies(topMovies);
  };
  useEffect(() => {
    fetchMovies(movies);
  }, [page]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    fetchMovies([]);
  }, [sort]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="float-right mr-14">
        <button
          className={`px-4 py-2 ${
            !sort ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-800'
          } rounded-xl m-2 w-28 shadow-sm`}
          onClick={() => setSort(0)}
        >
          <span>
            <FaSortAmountDown className="float-left mt-1" />
            DESC
          </span>
        </button>

        <button
          className={`px-4 py-2 ${
            sort ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-800'
          } rounded-xl m-2 w-28 shadow-sm`}
          onClick={() => setSort(1)}
        >
          <FaSortAmountUp className="float-left mt-1" />
          ASC
        </button>
      </div>
      <motion.ul
        className="wrapper"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {movies?.map((movie) => (
          <MovieCard
            movieData={movie}
            makeFavorite={makeFavorite}
            removeFavorite={removeFavorite}
            favList={favList}
          />
        ))}
      </motion.ul>
      <div className="h-32 w-full flex justify-center items-center">
        <button
          className="bg-yellow-500 py-4 px-6 rounded-xl text-white text-lg font-semibold"
          onClick={loadMore}
        >
          LOAD MORE
        </button>
      </div>
    </>
  );
};

export default Home;
