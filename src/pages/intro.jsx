import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

const ComplainIntro = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish(); // 🔥 important
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="portal-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7 }}
        >
          {/* Scanner Line */}
          <motion.div
            className="scanner-line"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Corners */}
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>

          {/* Title */}
          <div className="center-content">
            <motion.h1
              className="title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              COMPLAIN <span>PORTAL</span>
            </motion.h1>

            <motion.div
              className="underline"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>

          {/* Status */}
          <motion.div
            className="status-text"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            System Check: Authentic_
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComplainIntro;