import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";

import { BsFillBellFill, BsToggles2, MdLogout, MdSearch } from "../assets/icons";
import { buttonClick } from "../animations";
import { Avatar } from "../assets";
import { setUserNull } from "../context/actions/userActions";

const DBHeader = () => {
  const user = useSelector((state) => state.user);
  const firebaseAuth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      navigate("/login", { replace: true });
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className="w-full flex items-center justify-between gap-3">

      {/* <-- Welcome text --> */}
      <p className="text-2xl font-semibold tracking-wide text-headingColor"><span className="text-orange-500">Welcome</span> to City 
        {user?.name && (
          <span className="block text-base text-gray-500 font-medium tracking-wide">{`Hello ${user?.name}...`}</span>
        )}
      </p>

      {/* <-- Search Input --> */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none outline-none bg-transparent w-32 placeholder:tracking-wider placeholder:text-sm placeholder:font-normal text-sm tracking-wide font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-400 text-lg" />
        </div>

        {/* <-- Notification icon --> */}
        <motion.div
          { ...buttonClick }
          className="w-[36px] h-[36px] rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-lg" />
        </motion.div>

        {/* <-- Profile Img --> */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-[36px] h-[36px] rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.picture ? user?.picture : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* <-- Logout button --> */}
          <motion.div
            { ...buttonClick }
            className="w-[36px] h-[36px] rounded-md shadow-md cursor-pointer bg-lightOverlay backdrop-blur-md flex items-center justify-center"
            onClick={signOut}
          >
            <MdLogout className="text-gray-400 text-lg" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;