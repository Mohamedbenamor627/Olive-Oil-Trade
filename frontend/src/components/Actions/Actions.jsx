import React from "react";
import {Link, Links} from "react-router-dom"

const Actions = () => {
  return (
    <div className="flex justify-center gap-6 mb-10">
        <Link to={"/Sell"}>
      <button className="bg-blue-700 text-xl hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
        بيع
      </button>
      </Link>
      <Link to={"/Buy"}>
      <button className="bg-MainColor text-xl hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
        شراء
      </button>
      </Link>
    </div>
  );
};

export default Actions;
