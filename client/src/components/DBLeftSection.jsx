import React from "react";
import { NavLink } from "react-router-dom";

import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="h-full py-6 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">

      {/* <-- Logo --> */}
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} alt="Logo" className="w-12" />
        <p className="text-xl font-semibold tracking-wide">City</p>
      </NavLink>

      <hr />

      {/* <-- Nav links --> */}
      <ul className="flex flex-col gap-4">
        <NavLink to={"/dashboard/home"} className={({isActive}) => isActive ? `${isActiveStyles} px-4 py-2 border-l-4 border-orange-500` : isNotActiveStyles}>Home</NavLink>
        <NavLink to={"/dashboard/orders"} className={({isActive}) => isActive ? `${isActiveStyles} px-4 py-2 border-l-4 border-orange-500` : isNotActiveStyles}>Orders</NavLink>
        <NavLink to={"/dashboard/items"} className={({isActive}) => isActive ? `${isActiveStyles} px-4 py-2 border-l-4 border-orange-500` : isNotActiveStyles}>Items</NavLink>
        <NavLink to={"/dashboard/newItem"} className={({isActive}) => isActive ? `${isActiveStyles} px-4 py-2 border-l-4 border-orange-500` : isNotActiveStyles}>Add New Item</NavLink>
        <NavLink to={"/dashboard/users"} className={({isActive}) => isActive ? `${isActiveStyles} px-4 py-2 border-l-4 border-orange-500` : isNotActiveStyles}>Users</NavLink>
      </ul>

       {/* <-- Help center box --> */}
      <div className="w-full items-center justify-center flex h-225 mt-auto px-2">
        <div className="w-full h-full rounded-md bg-orange-500 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 border bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-semibold text-orange-500">?</p>
          </div>
          <p className="text-lg text-primary font-semibold tracking-wide">Help Center</p>
          <p className="text-sm text-gray-200 text-center tracking-wide">Having trouble in city. Please contact us for more information & queries.</p>
          <p className="px-4 py-2 rounded-full bg-primary text-orange-500 text-sm tracking-wide shadow-md cursor-pointer">Get in touch</p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;