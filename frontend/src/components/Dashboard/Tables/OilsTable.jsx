import React, { useEffect, useState } from "react";
import axios from "axios";

const OilsTable = () => {
  const [oils, setOils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newOil, setNewOil] = useState({ type: "", price: "", date: "" });
  const [editId, setEditId] = useState(null);


  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  // 🟢 جلب البيانات من السيرفر
  useEffect(() => {
    const fetchOils = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/oils`);
        setOils(res.data.data);
      } catch (error) {
        console.error("❌ خطأ أثناء جلب الزيوت:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOils();
  }, []);

  // ➕ إضافة أو تحديث نوع زيت
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${apiUrl}/api/oils/${editId}`, newOil);
        alert("✅ تم التعديل بنجاح");
      } else {
        await axios.post(`${apiUrl}/api/oils`, newOil);
        alert("✅ تمت الإضافة بنجاح");
      }

      // تحديث القائمة بعد الإضافة أو التعديل
      const res = await axios.get(`${apiUrl}/api/oils`);
      setOils(res.data.data);

      // إغلاق المودال
      setShowModal(false);
      setNewOil({ type: "", price: "", date: "" });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error("❌ خطأ أثناء الحفظ:", error);
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  // 🗑️ حذف نوع زيت
  const handleDelete = async (id) => {
    if (!window.confirm("هل تريد حذف هذا الزيت؟")) return;
    try {
      await axios.delete(`${apiUrl}/api/oils/${id}`);
      setOils((prev) => prev.filter((oil) => oil._id !== id));
    } catch (error) {
      console.error("❌ خطأ أثناء الحذف:", error);
      alert("فشل في حذف الزيت");
    }
  };

  // ✏️ تعديل نوع زيت
  const handleEdit = (oil) => {
    setNewOil({
      type: oil.type,
      price: oil.price,
      date: oil.date,
    });
    setEditId(oil._id);
    setEditMode(true);
    setShowModal(true);
  };

  if (loading) return <p className="text-center mt-6">جاري تحميل البيانات...</p>;

  return (
    <div>
    <div>
  <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
    <h2 className="text-xl font-bold">أنواع الزيوت</h2>
    <button
      onClick={() => {
        setShowModal(true);
        setEditMode(false);
        setNewOil({ type: "", price: "", date: "" });
      }}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      ➕ إضافة نوع زيت
    </button>
  </div>

  {oils.length === 0 ? (
    <p className="text-center text-gray-600 mt-6">لا توجد أنواع زيوت</p>
  ) : (
    <>
      {/* للجوال - بطاقات */}
      <div className="md:hidden space-y-4">
        {oils.map((oil) => (
          <div
            key={oil._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <p><span className="font-semibold">النوع:</span> {oil.type}</p>
            <p><span className="font-semibold">السعر:</span> {oil.price} د.أ</p>
            <p><span className="font-semibold">التاريخ:</span> {oil.date}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(oil)}
                className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                تعديل
              </button>
              <button
                onClick={() => handleDelete(oil._id)}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
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
              <th className="border px-4 py-2 text-center">النوع</th>
              <th className="border px-4 py-2 text-center">السعر</th>
              <th className="border px-4 py-2 text-center">التاريخ</th>
              <th className="border px-4 py-2 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {oils.map((oil) => (
              <tr key={oil._id} className="text-center hover:bg-gray-50">
                <td className="border px-4 py-2">{oil.type}</td>
                <td className="border px-4 py-2">{oil.price} د.أ</td>
                <td className="border px-4 py-2">  {new Date(oil.date).toLocaleDateString("ar-EG")}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(oil)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mx-1 hover:bg-yellow-600"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(oil._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md mx-1 hover:bg-red-700"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )}
</div>


      {/* مودال الإضافة / التعديل */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md">
            <h2 className="text-center font-bold mb-3">
              {editMode ? "تعديل نوع الزيت" : "إضافة نوع زيت جديد"}
            </h2>
            <form onSubmit={handleAddOrUpdate} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="النوع"
                value={newOil.type}
                onChange={(e) =>
                  setNewOil({ ...newOil, type: e.target.value })
                }
                className="border p-2 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="السعر"
                value={newOil.price}
                onChange={(e) =>
                  setNewOil({ ...newOil, price: e.target.value })
                }
                className="border p-2 rounded-md"
                required
              />





              <input
                type="date"
                placeholder="التاريخ"
                value={newOil.date ? newOil.date.split("T")[0] : ""} 
                onChange={(e) =>
                  setNewOil({ ...newOil, date: e.target.value })
                }
                className="border p-2 rounded-md"
                required
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  {editMode ? "تحديث" : "إضافة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OilsTable;
