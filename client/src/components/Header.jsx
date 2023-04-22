import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";

import { Avatar, Logo } from "../assets";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { buttonClick, slideTop } from "../animations";
import { setUserNull } from "../context/actions/userActions";

const Header = () => {
  const user = useSelector((state) => state.user);
  const firebaseAuth = getAuth(app);

  const [isMenu, setIsMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      navigate("/login", { replace: true });
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-8 md:px-15 py-6">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} alt="Logo" className="w-12" />
        <p className="text-xl font-semibold tracking-wide">City</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink to={"/"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink>
          <NavLink to={"/menu"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Menu</NavLink>
          <NavLink to={"/services"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Services</NavLink>
          <NavLink to={"/aboutus"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>About Us</NavLink>
        </ul>

        <motion.div
          { ...buttonClick }
          className="relative cursor-pointer"
        >
          <MdShoppingCart className="text-2xl text-textColor" />
          <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center absolute -top-2 -right-1">
            <p className="text-primary font-medium text-xs">2</p>
          </div>
        </motion.div>

        {user ? (
          <>
            <div className="relative cursor-pointer" onMouseEnter={() => setIsMenu(true)}>
              <div className="w-9 h-9 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                { ...slideTop }
                onMouseLeave={() => setIsMenu(false)}
                className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
              >
                <Link
                  to={"/dashboard/home"}
                  className="hover:text-orange-500 text-[13px] tracking-wide text-textColor"
                >
                  Dashboard
                </Link>

                <Link
                  to={"/profile"}
                  className="hover:text-orange-500 text-[13px] tracking-wide text-textColor"
                >
                  My Profile
                </Link>

                <Link
                  to={"/user-orders"}
                  className="hover:text-orange-500 text-[13px] tracking-wide text-textColor"
                >
                  Orders
                </Link>
                <hr />

                <motion.div
                  { ...buttonClick }
                  className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 gap-2 hover:bg-gray-200"
                  onClick={signOut}
                >
                  <MdLogout className="text-md text-textColor group-hover:text-headingColor" />
                  <p className="text-[13px] text-textColor group-hover:text-headingColor tracking-wide">Sign Out</p>
                </motion.div>
              </motion.div>
              )}

            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.div
                { ...buttonClick }
                className="px-6 py-2 rounded-md shadow-md bg-neutral-100 border hover:brightness-90 hover:shadow-lg transition cursor-pointer text-[15px] tracking-wide"
              >
                Login
              </motion.div>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;