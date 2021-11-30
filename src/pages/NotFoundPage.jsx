import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "assets/images/pageNotFound.png";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">

      <img src={PageNotFound} alt=""></img>
      <h1 className="text-6xl text-indigo-900">
        <b>404</b>
      </h1>
      <h1 className="text-4xl text-indigo-900 text-center mb-3">
        <b>OOPS! PAGE NOT FOUND.</b>
      </h1>
      <Link className='text-3xl text-red-700 font-semibold hover:text-white py-1 px-4 border-2 border-red-500 hover:border-transparent rounded-full hover:bg-red-600 transition duration-900 ease-in-out transform hover:-translate-y-1 hover:scale-110' to="/admin/landingAdmin">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;
