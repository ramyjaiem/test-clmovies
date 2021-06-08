import React, { FC } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';


const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
type Props = {
  movieData: any;
  favList: [number];
  makeFavorite: (n: number) => void;
  removeFavorite: (n: number) => void;
};

export const MovieCard: FC<Props> = ({
  movieData,
  favList,
  makeFavorite,
  removeFavorite,
}) => {
  return (
    <div key={movieData.id} className="m-5 w-72 cursor-pointer" >
      <motion.img
       variants={item}
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movieData.poster_path}`}
        onClick={() =>
          window.open(
            `https://www.themoviedb.org/movie/${movieData.id}`,
            '_blank'
          )
        }
        alt=" random imgee"
        className="w-full object-cover object-center rounded-lg shadow-md"
      />

      <div className="relative px-3 -mt-16  ">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-baseline"></div>

          <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
            {movieData.title}
          </h4>

          <div className="mt-1">{movieData.release_date}</div>
          <div className="mt-4">
            <span
              className={`text-teal-600 text-xl font-semibold ${
                movieData.vote_average > 8 ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              {`${movieData.vote_average * 10} % `}
            </span>
            <span className="text-sm text-gray-600">
              ( {movieData.vote_count} ratings )
            </span>
            <span className="float-right">
              {favList.includes(movieData.id) ? (
                <FaStar
                  size={24}
                  color="#F59E0B"
                  onClick={() => removeFavorite(movieData.id)}
                />
              ) : (
                <FaRegStar
                  size={24}
                  color="gray"
                  onClick={() => makeFavorite(movieData.id)}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
