import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";


const Sell = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    harvestYear: "",
    oilType: "لا أدري",
    price: "",
    type: "",
    quantity: "",
    unit: "لتر",
    note: "",
    image: null,
  });

  

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const res = await fetch(`${apiUrl}/api/sell`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ تم إرسال العرض بنجاح!");
        console.log(data);
      } else {
        alert("❌ حدث خطأ أثناء الإرسال");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ فشل الاتصال بالخادم");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen mt-28 md:mt-0">
    <NavBar />
  
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-12 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl px-6 sm:px-10 py-8 w-full max-w-4xl sm:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 border-t-4 border-green-600"
      >
        {/* العنوان */}
        <div className="col-span-1 md:col-span-2 text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-2">
            بيع زيت الزيتون
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            يرجى تعبئة الحقول التالية لتقديم عرضك بدقة
          </p>
        </div>
  
        {/* الاسم */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">الاسم / الشركة</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
  
        {/* الولاية */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">الولاية</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
  
        {/* الهاتف */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">رقم الهاتف</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
  
        {/* الإيميل */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
          />
        </div>
  
        {/* سنة الجني */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">سنة الجني</label>
          <input
            type="number"
            name="harvestYear"
            value={formData.harvestYear}
            onChange={handleChange}
            min="2000"
            max={new Date().getFullYear()}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
  
        {/* نوع الزيت */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">نوع الزيت</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
          >
            <option value="Vierge Extra">Vierge Extra</option>
            <option value="Vierge">Vierge</option>
            <option value="Lampante">Lampante</option>
            <option value="لا أدري">لا أدري</option>
          </select>
        </div>
  
        {/* السعر */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">السعر (دينار)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
  
        {/* الكمية + الوحدة */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">الكمية</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
              required
            />
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
            >
              <option value="لتر">لتر</option>
              <option value="كيلو">كيلو</option>
            </select>
          </div>
        </div>
  
        {/* الملاحظات */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 mb-2">ملاحظات إضافية</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
            placeholder="أدخل أي تفاصيل إضافية هنا..."
          ></textarea>
        </div>
  
        {/* صورة الزيت */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 mb-2">صورة الزيت</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 cursor-pointer focus:ring-2 focus:ring-green-600"
          />
          {formData.image && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="صورة الزيت"
                className="w-40 h-40 object-cover rounded-2xl shadow-lg border border-gray-200"
              />
            </div>
          )}
        </div>
  
        {/* زر الإرسال */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-all duration-300"
          >
            إرسال العرض
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Sell;
