import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import BuysTable from "./Tables/BuysTable";
import SellsTable from "./Tables/SellsTable";
import SubsTable from "./Tables/SubsTable";
import OilsTable from "./Tables/OilsTable";

const Dashboard = () => {
  const [activeTable, setActiveTable] = useState("buys");


  return (
    <div className="p-8 mt-40">
      <NavBar />
      <h1 className="text-2xl font-bold mb-6 text-center">لوحة التحكم</h1>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {[
          { key: "buys", label: "طلبات الشراء" },
          { key: "sells", label: "طلبات البيع" },
          { key: "subs", label: "اشتراكات Tawla Pro" },
          { key: "oils", label: "أنواع الزيوت" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTable(key)}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              activeTable === key
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTable === "buys" ? (
        <BuysTable />
      ) : activeTable === "sells" ? (
        <SellsTable />
      ) : activeTable === "subs" ? (
        <SubsTable />
      ) : (
        <OilsTable />
      )}
    </div>
  );
};

export default Dashboard;
