import React from "react";
import Logo from "../../assets/Logo.png";
import "../../../src/index.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = () => {
  // نتحقق من حجم الشاشة
  const isLargeScreen = typeof window !== "undefined" && window.innerWidth > 768;

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50 font-serif">
      <div className="items-center px-6">
        <Link to="/">
          <div className="flex justify-around items-center space-x-2">
            <motion.img
              src={Logo}
              alt="Logo"
              className="h-32 w-52 object-contain"
              initial={{ y: -80, opacity: 0, rotate: -20, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              whileHover={
                isLargeScreen
                  ? {
                      rotate: 360,
                      transition: { duration: 1, ease: "easeInOut" },
                    }
                  : {}
              } // ✅ يعمل فقط على الشاشات الكبيرة
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
