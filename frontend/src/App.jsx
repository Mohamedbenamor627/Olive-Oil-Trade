import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home/Home";
import Sell from "./components/Sell/Sell";
import Buy from "./components/Buy/Buy";
import Dashboard from "./components/Dashboard/Dashboard";
import Pro from "./components/Pro/Pro";

// صفحة تسجيل الدخول
const LoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "CauxyzhHiy671€&") { // ضع هنا كلمة المرور
      onLogin(true);
    } else {
      setError("كلمة المرور غير صحيحة!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">تسجيل الدخول</h2>
        <input
          type="password"
          placeholder="أدخل كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 w-full mb-4 rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">دخول</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div dir="rtl">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sell" element={<Sell />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/Pro" element={<Pro />} />

        {/* حماية الداشبورد */}
        <Route
          path="/Dashboard"
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <LoginPage onLogin={setIsLoggedIn} />
            )
          }
        />

        {/* إعادة التوجيه لأي مسار غير موجود */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
