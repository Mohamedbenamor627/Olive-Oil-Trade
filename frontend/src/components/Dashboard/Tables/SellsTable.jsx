import React, { useEffect, useState } from "react";
import axios from "axios";

const SellsTable = () => {
  const [sells, setSells] = useState([]);
  const [loading, setLoading] = useState(true);
  

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  // 🟢 جلب البيانات
  const fetchSells = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/sell`);
      setSells(res.data || []);
    } catch (error) {
      console.error("❌ خطأ أثناء جلب طلبات البيع:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSells();
  }, []);

  // 🗑️ حذف طلب بيع
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;

    try {
      const res = await axios.delete(`${apiUrl}/api/sell/${id}`);
      alert(res.data.message || "تم حذف الطلب بنجاح");
      setSells((prev) => prev.filter((sell) => sell._id !== id));
    } catch (error) {
      console.error("❌ خطأ في الحذف:", error);
      alert(
        error.response?.data?.message ||
          "حدث خطأ أثناء الحذف أو في الاتصال بالسيرفر"
      );
    }
  };

  if (loading) return <p className="text-center mt-6">جاري تحميل البيانات...</p>;
  if (!sells.length) return <p className="text-center mt-6 text-gray-600">لا توجد طلبات بيع</p>;

  return (
    <div>
    <h2 className="text-xl font-bold mb-3">طلبات البيع</h2>
  
    {/* للجوال - بطاقات */}
    <div className="md:hidden space-y-4">
      {sells.map((sell) => (
        <div
          key={sell._id}
          className="border rounded-xl p-4 shadow-sm bg-white"
        >
          <p><span className="font-semibold">البائع:</span> {sell.name}</p>
          <p><span className="font-semibold">رقم الهاتف:</span> {sell.phone}</p>
          <p><span className="font-semibold">البريد الإلكتروني:</span> {sell.email}</p>
          <p><span className="font-semibold">الولاية:</span> {sell.state}</p>
          <p><span className="font-semibold">المنتج:</span> {sell.type}</p>
          <p><span className="font-semibold">الكمية:</span> {sell.quantity}</p>
          <p><span className="font-semibold">السعر:</span> {sell.price}</p>
          <p><span className="font-semibold">الصورة:</span>  <div className=" px-4 py-2">
  <img
    src={`http://localhost:4001${sell.imageUrl}`}
    alt="لا يوجد صورة"
    className="w-20 h-20 object-cover rounded"
  />
</div></p>
          
          <p><span className="font-semibold">تاريخ الحصد:</span> {sell.harvestYear}</p>
          <p><span className="font-semibold">ملاحظة:</span> {sell.note}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleDelete(sell._id)}
              className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  
    {/* للتابلت والشاشات الكبيرة - جدول */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full border border-gray-300 table-auto">
        <thead className="bg-green-100">
          <tr>
            <th className="border px-4 py-2 text-center">البائع</th>
            <th className="border px-4 py-2 text-center">رقم الهاتف</th>
            <th className="border px-4 py-2 text-center">البريد الإلكتروني</th>
            <th className="border px-4 py-2 text-center">الولاية</th>
            <th className="border px-4 py-2 text-center">المنتج</th>
            <th className="border px-4 py-2 text-center">الكمية</th>
            <th className="border px-4 py-2 text-center">السعر</th>
            <th className="border px-4 py-2 text-center">صورة</th>
            <th className="border px-4 py-2 text-center">تاريخ الحصد</th>
            <th className="border px-4 py-2 text-center">ملاحظة</th>
            <th className="border px-4 py-2 text-center">الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {sells.map((sell) => (
            <tr key={sell._id} className="text-center hover:bg-gray-50">
              <td className="border px-4 py-2">{sell.name}</td>
              <td className="border px-4 py-2">{sell.phone}</td>
              <td className="border px-4 py-2">{sell.email}</td>
              <td className="border px-4 py-2">{sell.state}</td>
              <td className="border px-4 py-2">{sell.type}</td>
              <td className="border px-4 py-2">{sell.quantity}</td>
              <td className="border px-4 py-2">{sell.price}</td>
              <td className="border px-4 py-2">
  <img
    src={`http://localhost:4001${sell.imageUrl}`}
    alt="لا يوجد صورة"
    className="w-20 h-20 object-cover rounded"
  />
</td>

              <td className="border px-4 py-2">{sell.harvestYear}</td>
              <td className="border px-4 py-2">{sell.note}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(sell._id)}
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

export default SellsTable;
