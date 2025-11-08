import React, { useEffect, useState } from "react";

const HomeTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // عدد الصفوف في كل صفحة
  

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/dashboard`);
        const result = await res.json();
        if (res.ok) {
          const combined = [
            ...result.data.sells.map((item) => ({ ...item, operation: "بيع" })),
            ...result.data.buys.map((item) => ({ ...item, operation: "شراء" })),
          ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setRows(combined);
        } else {
          console.error("خطأ في جلب البيانات:", result.error);
        }
      } catch (err) {
        console.error("فشل الاتصال بالخادم:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // حساب عدد الصفحات الكلي
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // تحديد الصفوف المعروضة في الصفحة الحالية
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  // تغيير الصفحة
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-6 py-16 bg-gradient-to-b from-green-50 to-white">
      <h2 className="text-4xl font-bold mb-10 text-center text-green-800">
        جدول العروض (بيع وشراء)
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-2xl bg-white border border-gray-200 max-w-5xl mx-auto">
          <table className="min-w-full text-center rounded-2xl overflow-hidden">
            <thead className="bg-gradient-to-r from-green-700 to-green-500 text-white">
              <tr>
                <th className="py-4 px-6 text-lg font-semibold">النوع</th>
                <th className="py-4 px-6 text-lg font-semibold">الكمية</th>
                <th className="py-4 px-6 text-lg font-semibold">نوع العملية</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-4 text-gray-500">
                    لا توجد بيانات حالياً
                  </td>
                </tr>
              ) : (
                currentRows.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`transition-all duration-300 hover:scale-[1.02] ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {item.type}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {item.quantity} {item.unit}
                    </td>
                    <td
                      className={`py-4 px-6 font-semibold ${
                        item.operation === "بيع"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {item.operation}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* أزرار التبديل بين الصفحات */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                السابق
              </button>

              <span className="text-gray-700 font-medium">
                الصفحة {currentPage} من {totalPages}
              </span>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                التالي
              </button>
            </div>
          )}
        </div>
      )}

      <p className="text-center text-gray-500 mt-8 text-sm">
        الأسعار قابلة للتغيير حسب الموسم وجودة الزيت.
      </p>
    </div>
  );
};

export default HomeTable;
