import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text }) => {
  return (
    <button
      disabled={disabled}
      type='submit'
      className="btn bg-red-700 text-white font-bold text-xl py-3 px-6  rounded-xl hover:bg-red-500 shadow-md my-2"
    >
      {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;