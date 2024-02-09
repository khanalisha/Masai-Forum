import React from "react";
import { Link } from "react-router-dom";

export const Cards = ({ id,media, title }) => {
  return (
    <div class="flex justify-center mb-4">
      <Link to={`/feed/${id}`}>
        <a
          href="#"
          className="flex flex-col items-center cards bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-7xl  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={media}
            alt=""
            className="img"
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <span></span>
          </div>
        </a>
      </Link>
    </div>
  );
};
