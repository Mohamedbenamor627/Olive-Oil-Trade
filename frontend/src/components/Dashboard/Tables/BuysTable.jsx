import React, { useEffect, useState } from "react";
import axios from "axios";

const BuysTable = () => {
  const [buys, setBuys] = useState({});
  const [loading, setLoading] = useState(true);


  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
  // 🟢 جلب الطلبات من السيرفر
 const fetchBuys = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/buy`);
    console.log(res.data); // يمكنك تركه للـ debug
    setBuys(res.data.data || []); // ⚡ هنا
  } catch (error) {
    console.error("❌ خطأ أثناء جلب الطلبات:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBuys();
  }, []);

  // 🗑️ حذف طلب شراء
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;

    try {
      const res = await axios.delete(`${apiUrl}/api/buy/${id}`);
      alert(res.data.message || "تم حذف الطلب بنجاح");
      setBuys((prev) => prev.filter((buy) => buy._id !== id));
    } catch (error) {
      console.error("❌ خطأ في حذف الطلب:", error);
      alert(
        error.response?.data?.message || "حدث خطأ أثناء حذف الطلب أو في الاتصال بالسيرفر"
      );
    }
  };

  // ⏳ حالة التحميل
  if (loading)
    return <p className="text-center text-gray-600 mt-6">جاري التحميل...</p>;

  // 📭 لا توجد طلبات
  if (!buys.length)
    return <p className="text-center text-gray-600 mt-6">لا توجد طلبات شراء</p>;

  // 📋 عرض الجدول
  return (
    <div>
    <h2 className="text-xl font-bold mb-3">طلبات الشراء</h2>
  
    {/* للجوال - بطاقات */}
    <div className="md:hidden space-y-4">
      {buys.map((buy) => (
        <div
          key={buy._id}
          className="border rounded-xl p-4 shadow-sm bg-white"
        >
          <p><span className="font-semibold">العميل:</span> {buy.name}</p>
          <p><span className="font-semibold">رقم الهاتف:</span> {buy.phone}</p>
          <p><span className="font-semibold">المنتج:</span> {buy.type}</p>
          <p><span className="font-semibold">الكمية:</span> {buy.quantity}</p>
          <p><span className="font-semibold">السعر:</span> {buy.amount}</p>
          <p>
            <span className="font-semibold">التاريخ:</span>{" "}
            {new Date(buy.createdAt).toLocaleDateString("ar-EG")}
          </p>
          <button
            onClick={() => handleDelete(buy._id)}
            className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  
    {/* للتابلت والشاشات الكبيرة - جدول */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full border border-gray-300 table-auto">
        <thead className="bg-green-100">
          <tr>
            <th className="border px-4 py-2 text-center">العميل</th>
            <th className="border px-4 py-2 text-center">رقم الهاتف</th>
            <th className="border px-4 py-2 text-center">المنتج</th>
            <th className="border px-4 py-2 text-center">الكمية</th>
            <th className="border px-4 py-2 text-center">السعر</th>
            <th className="border px-4 py-2 text-center">التاريخ</th>
            <th className="border px-4 py-2 text-center">الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {buys.map((buy) => (
            <tr key={buy._id} className="text-center hover:bg-gray-50">
              <td className="border px-4 py-2">{buy.name}</td>
              <td className="border px-4 py-2">{buy.phone}</td>
              <td className="border px-4 py-2">{buy.type}</td>
              <td className="border px-4 py-2">{buy.quantity}</td>
              <td className="border px-4 py-2">{buy.amount}</td>
              <td className="border px-4 py-2">
                {new Date(buy.createdAt).toLocaleDateString("ar-EG")}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(buy._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default BuysTable;
