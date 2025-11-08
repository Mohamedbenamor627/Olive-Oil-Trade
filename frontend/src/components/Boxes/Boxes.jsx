import React, { useEffect, useState } from "react";

const Boxes = () => {
  const [oils, setOils] = useState([]);
  

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  useEffect(() => {
    fetch(`${apiUrl}/api/oils`)
      .then((res) => res.json())
      .then((data) => setOils(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-10 p-10 ">
      {oils.length > 0 ? (
        oils.map((oil) => (
          <div
            key={oil._id}
            className="w-80 bg-white rounded-2xl shadow-xl p-6 text-center 
                       hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-t-4 border-green-600"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-extrabold text-green-700 mb-2 tracking-wide">
                {oil.type}
              </h2>
              <div className="h-[2px] w-16 bg-green-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold text-gray-800">الكمية:</span>{" "}
                {oil.quantity}
              </p>
              <p className="text-green-700 font-semibold text-xl">
                السعر: {oil.price} <span className="text-base">دينار</span>
              </p>
            </div>

         
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-lg mt-10">لا توجد أنواع زيت مضافة بعد.</p>
      )}
    </div>
  );
};

export default Boxes;
