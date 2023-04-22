import React from "react";
import { motion } from "framer-motion";

import { fadeInOut } from "../animations";
import { BsExclamationTriangleFill, FaCheck } from "../assets/icons";

const Alert = ({ type, message }) => {
  if (type === "success") {
    return (
      <motion.div
        { ...fadeInOut }
        className="fixed z-50 -top-0 mt-6 px-4 py-2 rounded-md backdrop-blur-sm bg-gray-100 shadow-lg flex items-center gap-4"
      >
        <FaCheck className="bg-[#34B233] text-white shadow-md w-6 h-6 rounded-md p-1.5" />
        <p className="text-[15px] tracking-wide text-black">{message}</p>
      </motion.div>
    );
  }

  if (type === "warning") {
    return (
      <motion.div
        { ...fadeInOut }
        className="fixed z-50 -top-0 mt-6 px-4 py-2 rounded-md backdrop-blur-sm bg-gray-100 shadow-lg flex items-center gap-3"
      >
        <BsExclamationTriangleFill className="text-[21px] text-[#FFCC00]" />
        <p className="text-[15px] tracking-wide text-black">{message}</p>
      </motion.div>
    );
  }

  if (type === "danger") {
    return (
      <motion.div
        { ...fadeInOut }
        className="fixed z-50 -top-0 mt-6 px-4 py-2 rounded-md backdrop-blur-sm bg-gray-100 shadow-lg flex items-center gap-4"
      >
        {/* <FaCheck className="text-xl text-green-500" /> */}
        <p className="text-[16px]">❌</p>
        <p className="text-[15px] tracking-wide text-black">{message}</p>
      </motion.div>
    );
  }

  if (type === "info") {
    return (
      <motion.div
        { ...fadeInOut }
        className="fixed z-50 -top-0 mt-6 px-4 py-2 rounded-md backdrop-blur-sm bg-gray-100 shadow-lg flex items-center gap-4"
      >
        {/* <FaCheck className="text-xl text-green-500" /> */}
        <p className="text-[16px]">ℹ️</p>
        <p className="text-[15px] tracking-wide text-black">{message}</p>
      </motion.div>
    );
  }
};

export default Alert;