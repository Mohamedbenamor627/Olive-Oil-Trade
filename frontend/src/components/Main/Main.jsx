import React from "react";
import videoMain from "../../assets/Main.mp4";
import { Link } from "react-router-dom";

const Video = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <section className="w-full flex flex-col items-center justify-center mt-11">
      {/* الفيديو يأخذ كامل العرض */}
      <div className="relative w-full h-[100vh] overflow-hidden">
  <video
    src={videoMain}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full  transform  transition-transform duration-[4000ms] hover:scale-110"
  />
   <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>


</div>


      {/* قسم about */}
      <div
  id="about"
  className="w-fit bg-gradient-to-b from-green-50 px-8 md:px-20 mx-5 text-center rounded-2xl shadow-lg my-28 py-10"
>
  <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 leading-tight">
    اكتشف جمال الزيتون الطبيعي
  </h1>

  <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto md:mx-0">
  نحن نؤمن ان كل حبة زيتون تحمل قصة ارض مباركة
  <br />
  هدفنا جمع الفلاحين و التجار على طاولة واحدة ،حيث يعرض الفلاح زيته و يشتريه التاجر صاحب أفضل سعر 
  </p>

  <div className="flex flex-wrap justify-center gap-4">
    <Link to="/Pro">
    <button
    
      className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300"
    >
      VIP
    </button>
    </Link>

    <button
      onClick={() => scrollToBottom()}
      className="px-8 py-3 border-2 border-green-600 text-green-700 font-semibold rounded-full shadow-md hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-300"
    >
      تعرف أكثر
    </button>
  </div>
</div>

    </section>
  );
};

export default Video;
