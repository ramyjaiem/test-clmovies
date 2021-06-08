import React, { FC } from 'react';

type Props = {};

const About: FC<Props> = (props) => (
  <div className="bg-white rounded-xl p-4 w-10/12 m-auto">
    <h2 className="text-2xl mb-4"> Task:</h2>
    <p className="ml-10">
      You will develop a simple React application in Typescript making use of an
      external API. The API is available here:
      <br />
      <br />
      https://www.themoviedb.org/documentation/api The application should:
      <ul>
        <li>
          Show top 500 movies in TMDB; Display for each movie: image, title,
          current rating, year;{' '}
        </li>
        <li>
          Each of the movies should link to the TMDB listing; You should be able
          to sort in order (ASC / DESC) You will use whatever styling you think
          is best.
        </li>
        <li>
          No design provided, however, you must make sure it looks good in
          desktop and mobile.{' '}
        </li>
        <li>
          Each of the movies needs a “star” icon. Once clicked, it should
          highlight (change the background clior) of the entire row.{' '}
        </li>
        <li>
          Re-clicking the star should de-highlight the row back to original
          state. This setting should persist (cookie/local storage).
        </li>
        <li>
          Youshould provide a link to heroku or some other hosting with a
          functional app. You should provide access to or link to codebase.
        </li>
      </ul>
    </p>
    <h2 className="text-2xl my-10 ml-10"> Ramy Jaiem</h2>
  </div>
);

export default About;
