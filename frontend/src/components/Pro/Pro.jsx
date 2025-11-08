import React from "react";

const Pro = () => {
  

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const res = await fetch(`${apiUrl}/api/pro/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("حدث خطأ، حاول مرة أخرى");
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-6 py-16 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        {/* تدرج جمالي في الخلفية */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-700/10 to-green-400/10 blur-2xl rounded-3xl -z-10"></div>

        {/* العنوان */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-8">
          Tawla Pro
        </h1>

        {/* الوصف */}
        <p className="text-center text-gray-700 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          خدمة متميزة تمنحك وصولاً مباشرًا إلى أحدث بيانات وتحاليل زيت الزيتون عبر فريق متخصص.
        </p>

        {/* النقاط */}
        <ul className="space-y-4 text-gray-700 text-lg leading-relaxed mb-10 list-disc list-inside">
          <li>
            مكالمات هاتفية دورية لتزويدك بآخر عينات الزيت المتوفرة في قاعدة البيانات.
          </li>
          <li>
            إمكانية الحصول على العينات مباشرة إلى مقر شركتك عبر وكلائنا المعتمدين.
          </li>
          <li>
            إرسال تقارير <strong>PDF</strong> أو <strong>Word</strong> إلى بريدك الإلكتروني.
          </li>
          <li>
            تزويدك بكلمة مرور خاصة لجلسات المزايدة عبر{" "}
            <strong>Zoom</strong> أو <strong>WhatsApp</strong>.
          </li>
        </ul>

        {/* الدعوة للتسجيل */}
        <div className="text-center mb-6">
          <p className="text-gray-700 text-lg">
            اترك بريدك الإلكتروني ليصلك كل جديد أو للحجز في الاشتراك السنوي:
          </p>
        </div>

        {/* نموذج التسجيل */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
        >
          <input
            name="email"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            required
            className="border border-gray-300 rounded-full px-5 py-3 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-800 placeholder-gray-400 shadow-sm"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300"
          >
            إشترك الآن
          </button>
        </form>

        {/* ملاحظة خفيفة */}
        <p className="text-center text-gray-500 text-sm mt-6">
          * سيتم التواصل معك خلال 24 ساعة من إدخال البريد الإلكتروني.
        </p>
      </div>
    </section>
  );
};

export default Pro;
