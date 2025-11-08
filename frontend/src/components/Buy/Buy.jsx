import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import OliveImage from "../../assets/pexels-pixabay-33783.jpg"; // أضف صورة مناسبة للعرض

const Buy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    state: "",
    amount: "",
    type: "",
    quantity: "",
    unit: "لتر",
  });

  

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/buy`, formData);
      alert(`✅ تم إرسال الطلب بنجاح:\n${JSON.stringify(res.data.data, null, 2)}`);
      setFormData({
        name: "",
        phone: "",
        state: "",
        amount: "",
        type: "",
        quantity: "",
        unit: "لتر",
      });
    } catch (error) {
      console.error("❌ خطأ:", error);
      alert("حدث خطأ أثناء إرسال الطلب، حاول مجددًا.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen mt-40 px-6 md:px-16 gap-10">
        
        {/* القسم الأيسر: صورة */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={OliveImage}
            alt="زيت الزيتون"
            className="rounded-3xl shadow-xl w-full max-w-lg object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* القسم الأيمن: النموذج */}
        <div className="md:w-1/2 bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg border-t-4 border-green-600">
          <h2 className="text-3xl font-semibold text-center mb-6 text-green-700">
            شراء زيت الزيتون
          </h2>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 text-green-700 font-semibold hover:underline"
          >
            ← الرجوع للخلف
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">الاسم أو اسم الشركة</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
             
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">رقم الهاتف</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
         
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">الولاية</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">المبلغ (بالدينار)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
             
                required
              />
            </div>

            {/* نوع الزيت */}
            <select
  name="type"
  value={formData.type}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
>
  <option value="">-- اختر نوع الزيت --</option>
  <option value="Vierge Extra">Vierge Extra</option>
  <option value="Vierge">Vierge</option>
  <option value="Lampante">Lampante</option>
  <option value="لا أدري">لا أدري</option>
</select>


            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">الكمية</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
              
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">الوحدة</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                >
                  <option value="لتر">لتر</option>
                  <option value="كيلو">كيلو</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              إرسال الطلب
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Buy;
