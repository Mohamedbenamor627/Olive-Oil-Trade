import React, { useEffect, useState } from "react";
import axios from "axios";

const SubsTable = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  // 🟢 جلب بيانات الاشتراكات
  const fetchSubs = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/pro/subscriptions");
      setSubs(res.data.data || res.data || []);
    } catch (error) {
      console.error("❌ خطأ أثناء جلب الاشتراكات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  // 🗑️ حذف اشتراك
  const handleDelete = async (id) => {
    if (!window.confirm("هل تريد حذف هذا الاشتراك؟")) return;

    try {
      await axios.delete(`${apiUrl}/api/pro/${id}`);
      setSubs((prev) => prev.filter((sub) => sub._id !== id));
      alert("تم حذف الاشتراك بنجاح");
    } catch (error) {
      console.error("❌ خطأ أثناء الحذف:", error);
      alert(error.response?.data?.message || "حدث خطأ أثناء الحذف");
    }
  };

  // ⏳ حالة التحميل
  if (loading) return <p className="text-center mt-6">جاري تحميل البيانات...</p>;

  // 📭 إذا لا توجد اشتراكات
  if (!subs.length)
    return (
      <p className="text-center text-gray-600 mt-6">لا توجد اشتراكات حالياً</p>
    );

  return (
    <div>
    <h2 className="text-xl font-bold mb-3">اشتراكات Tawla Pro</h2>
  
    {/* للجوال - بطاقات */}
    <div className="md:hidden space-y-4">
      {subs.map((sub) => (
        <div
          key={sub._id}
          className="border rounded-xl p-4 shadow-sm bg-white"
        >
          <p><span className="font-semibold">البريد الإلكتروني:</span> {sub.email}</p>
          <p><span className="font-semibold">تاريخ الإرسال:</span> {new Date(sub.createdAt).toLocaleDateString("ar-EG")}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleDelete(sub._id)}
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
            <th className="border px-4 py-2 text-center">البريد الإلكتروني</th>
            <th className="border px-4 py-2 text-center">تاريخ الإرسال</th>
            <th className="border px-4 py-2 text-center">إجراء</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((sub) => (
            <tr key={sub._id} className="text-center hover:bg-gray-50">
              <td className="border px-4 py-2">{sub.email}</td>
              <td className="border px-4 py-2">{new Date(sub.createdAt).toLocaleDateString("ar-EG")}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(sub._id)}
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

export default SubsTable;
